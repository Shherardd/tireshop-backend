import { Injectable, Inject } from '@nestjs/common';
import { CreateVentaDto, CreateVentaDtoSchema } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { POS_PRINTER } from 'src/constants';
import { ThermalPrinter } from 'node-thermal-printer';
import ApiResponse from 'src/shared/api-response';
//import * as path from 'path';

@Injectable()
export class VentasService {
  constructor(@Inject(POS_PRINTER) private readonly printer: ThermalPrinter) {}

  async create(createVentaDto: CreateVentaDto) {
    try {
      const validatedVentaDto = CreateVentaDtoSchema.parse(createVentaDto);
      const res = await this.printTicketTest(createVentaDto);
      console.log(res);

      return ApiResponse.created('Venta Generada', validatedVentaDto);
    } catch (error) {
      return ApiResponse.error(error, 400);
    }
  }
  async printTicketTest(detalle: CreateVentaDto) {
    console.log(`Cant.  Descripción                         Precio Unit.  Subtotal`);
  
    const formattedRows = detalle.productos.map(el => {
      const maxLength = Math.max(
        el.cantidad.toString().length,
        el.descripcion.length,
        el.precio_unitario.toString().length,
        el.subtotal.toString().length,
      );
  
      const item1 = el.cantidad.toString().padEnd(maxLength, ' ');
      const item2 = el.descripcion.padEnd(maxLength, ' ');
      const item3 = `$${el.precio_unitario.toFixed(2)}`.padEnd(maxLength, ' ');
      const item4 = `$${el.subtotal.toFixed(2)}`.padEnd(maxLength, ' ');
  
      return item1 + item2 + item3 + item4;
    });
  
    formattedRows.forEach(row => console.log(row));
  }

  async printTicket(detalle: CreateVentaDto) {
    this.printer.alignCenter();
    this.printer.println(``);
    /*this.printer.println(`MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMW`);
    this.printer.println(`================= MULTILLANTAS =================`);
    this.printer.println(`MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMW`);*/
    //const imagePath = path.join(__dirname, 'logo.png');
    /*await this.printer.printImage(
      'C:\\Users\\PC\\app\\tireshop-backend\\public\\assets\\logo2.png',
    );*/
    this.printer.alignRight();
    //this.printer.println(`MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMW`);
    this.printer.println(`cant.  producto                            total`);
    detalle.productos.forEach((el) => {
      const maxLength = Math.max(
        el.cantidad.toString().length,
        el.descripcion.length,
        el.precio_unitario.toString().length,
        el.subtotal.toString().length,
      );

      const item1 = el.cantidad.toString().padEnd(maxLength, ' ');
      const item2 = el.descripcion.padEnd(maxLength, ' ');
      const item3 = el.precio_unitario.toString().padEnd(maxLength, ' ');
      const item4 = el.subtotal.toString().padEnd(maxLength, ' ');

      this.printer.println(item1+ item2+ item3+item4
        
        //`${el.cantidad}. ${el.descripcion} ..... ${el.precio_unitario} ${el.subtotal}`,
      );
    });

    //this.printer.table([el.cantidad, el.descripcion, el.precio_unitario, el.subtotal]);
    this.printer.println(``);
    this.printer.println(`Total: ${detalle.resumen.total}`);
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
