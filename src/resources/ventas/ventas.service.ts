import { Injectable, Inject } from '@nestjs/common';
import { CreateVentaDto, CreateVentaDtoSchema } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { POS_PRINTER } from 'src/constants';
import { ThermalPrinter } from 'node-thermal-printer';
import { Connection } from 'mysql2/promise';
import { MYSQL_CONNECTION } from 'src/constants';
import { INSERT_FACTURA } from './ventas.querys';
import ApiResponse from 'src/shared/api-response';

@Injectable()
export class VentasService {
  private cantidadColSize = 5;
  private descripcionColSize = 21;
  private precioUnitarioColSize = 11;
  private subtotalColSize = 11;

  constructor(
    @Inject(MYSQL_CONNECTION) private readonly connection: Connection,
    @Inject(POS_PRINTER) private readonly printer: ThermalPrinter,
  ) {}

  async create(createVentaDto: CreateVentaDto) {
    try {
      const validatedVentaDto = CreateVentaDtoSchema.parse(createVentaDto);
      const res = await this.printTicketTest(createVentaDto);
      console.log(res);

      await this.connection.beginTransaction();
      //Generar folio factura
      createVentaDto.factura.folio = this.generarFolio();
      //Recuperar folio factura
      await this.connection.execute(INSERT_FACTURA, [
        createVentaDto.factura.folio,
        validatedVentaDto.factura.cliente_id,
        validatedVentaDto.factura.tipo_pago,
        validatedVentaDto.factura.monto_total,
        validatedVentaDto.factura.monto_pagado,
        validatedVentaDto.factura.nombre_banco,
        validatedVentaDto.factura.cuenta_banco,
        validatedVentaDto.factura.usuario_id,
      ]);

      await this.connection.rollback();

      //Guardar venta en base de datos

      //Actualizar existencia de productos

      return ApiResponse.created('Venta Generada', validatedVentaDto);
    } catch (error) {
      return ApiResponse.error(error, 400);
    }
  }
  async printTicketTest(detalle: CreateVentaDto) {
    const maxWidth = 48;

    const address = 'Av. Hidalgo #4, Barrio Nuevo';
    const city = 'Tonalá, Chis. Mx.';

    console.log(city);
    console.log(address);

    const date = new Date();
    const dateStr = date.toLocaleDateString();
    const timeStr = date.toLocaleTimeString();
    console.log(dateStr + ' ' + timeStr);

    console.log('RECIBO DE COMPRA');

    console.log(this.getTicketHeaders());

    const formattedRows = this.getTicketBody(detalle);

    formattedRows.forEach((row) => console.log(row));

    const iva = `IVA: $${detalle.resumen.iva}`;
    const ivaPad = iva.padStart(maxWidth, ' ');
    console.log(ivaPad);

    const subtotal = `Subtotal: $${detalle.resumen.subtotal}`;
    const subtotalPad = subtotal.padStart(maxWidth, ' ');
    console.log(subtotalPad);

    const total = `Total: $${detalle.resumen.total}`;
    const totalPad = total.padStart(maxWidth, ' ');
    console.log(totalPad);

    console.log('Gracias por su compra');
  }

  getTicketBody(detalle: CreateVentaDto) {
    const formattedRows = detalle.productos.map((el) => {
      const item1 = el.cantidad.toString().padEnd(this.cantidadColSize, ' ');
      const item2 = el.descripcion
        .padEnd(this.descripcionColSize, '.')
        .substring(0, 21);
      const item3 = `$${el.precio_unitario.toFixed(2)}`.padStart(
        this.precioUnitarioColSize,
        '.',
      );
      const item4 = `$${el.subtotal.toFixed(2)}`.padStart(
        this.subtotalColSize,
        ' ',
      );

      return item1 + item2 + item3 + item4;
    });

    return formattedRows;
  }

  getTicketHeaders() {
    const cantidadHeader = 'Cant.';
    const descripcionHeader = 'Descripción';
    const precioUnitarioHeader = 'P.Unit';
    const subtotalHeader = 'Subtotal';

    const cantidadHeaderPad = cantidadHeader.padEnd(
      this.cantidadColSize,
      ' '.repeat(this.cantidadColSize),
    );
    const descripcionHeaderPad = descripcionHeader.padEnd(
      this.descripcionColSize,
      ' '.repeat(this.descripcionColSize),
    );
    const precioUnitarioHeaderPad = precioUnitarioHeader.padStart(
      this.precioUnitarioColSize,
      ' '.repeat(this.precioUnitarioColSize),
    );
    const subtotalHeaderPad = subtotalHeader.padStart(
      this.subtotalColSize,
      ' '.repeat(this.subtotalColSize),
    );
    return (
      cantidadHeaderPad +
      descripcionHeaderPad +
      precioUnitarioHeaderPad +
      subtotalHeaderPad
    );
  }

  async printTicket(detalle: CreateVentaDto) {
    this.printer.alignCenter();
    this.printer.println(``);
    /*this.printer.println(`MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMW`);
    this.printer.println(`================= MULTILLANTAS =================`);
    this.printer.println(`MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMW`);*/
    //const imagePath = path.join(__dirname, 'logo.png');
    await this.printer.printImage(
      'C:\\Users\\PC\\app\\tireshop-backend\\public\\assets\\logo2.png',
    );
    this.printer.alignCenter();

    const maxWidth = 48;

    const address = 'Av. Hidalgo #4, Barrio Nuevo';
    const website = 'www.multillantasdetonala.com';
    const city = 'Tonalá, Chis. Mx.';

    this.printer.println(city);
    this.printer.println(address);
    this.printer.println(website);

    const date = new Date();
    const dateStr = date.toLocaleDateString();
    const timeStr = date.toLocaleTimeString();
    this.printer.println(dateStr + ' ' + timeStr);

    this.printer.drawLine();
    this.printer.setTextDoubleWidth();
    this.printer.println('RECIBO DE COMPRA');
    this.printer.setTextNormal();
    this.printer.drawLine();

    this.printer.println(this.getTicketHeaders());

    const formattedRows = this.getTicketBody(detalle);

    formattedRows.forEach((row) => this.printer.println(row));
    this.printer.drawLine();

    const iva = `IVA: $${detalle.resumen.iva}`;
    const ivaPad = iva.padStart(maxWidth, ' ');
    this.printer.println(ivaPad);

    const subtotal = `Subtotal: $${detalle.resumen.subtotal}`;
    const subtotalPad = subtotal.padStart(maxWidth, ' ');
    this.printer.println(subtotalPad);

    const total = `Total: $${detalle.resumen.total}`;
    const totalPad = total.padStart(maxWidth, ' ');
    this.printer.println(totalPad);
    this.printer.drawLine();

    this.printer.println(`Folio:${detalle.factura.cliente_id}`);
    this.printer.println('¡Gracias por su compra!');

    this.printer.cut();

    try {
      const res = await this.printer.execute();
      this.printer.beep();
      this.printer.clear();
      return 'Venta creada' + res;
    } catch (error) {
      this.printer.clear();
      return 'Error al imprimir' + error;
    }
  }

  generarFolio() {
    const fechaActual = new Date();

    const ano = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0
    const dia = fechaActual.getDate();
    const minutosDelDia =
      fechaActual.getHours() * 60 + fechaActual.getMinutes();

    // Formatear como cadena con ceros a la izquierda si es necesario
    const folio = `${ano}${this.rellenarCeros(mes)}${this.rellenarCeros(
      dia,
    )}${this.rellenarCeros(minutosDelDia)}`;

    return folio;
  }

  // Función para rellenar con ceros a la izquierda si el número es menor a 10
  rellenarCeros(numero) {
    return numero < 10 ? `0${numero}` : `${numero}`;
  }

  findAll() {
    return `This action returns all ventas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} venta`;
  }

  update(id: number, updateVentaDto: UpdateVentaDto) {
    console.log(updateVentaDto);
    return `This action updates a #${id} venta`;
  }

  remove(id: number) {
    return `This action removes a #${id} venta`;
  }
}
