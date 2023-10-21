import { Injectable, Inject } from '@nestjs/common';
import { CreateVentaDto, CreateVentaDtoSchema } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { POS_PRINTER } from 'src/constants';
import { ThermalPrinter } from 'node-thermal-printer';
import ApiResponse from 'src/shared/api-response';

@Injectable()
export class VentasService {
  constructor(@Inject(POS_PRINTER) private readonly printer: ThermalPrinter) {}

  async create(createVentaDto: CreateVentaDto) {
    try {
      const validatedVentaDto = CreateVentaDtoSchema.parse(createVentaDto);
      const res = await this.printTicket();
      console.log(res);

      return ApiResponse.created('Venta Generada', validatedVentaDto);
    } catch (error) {
      return ApiResponse.error(error, 400);
    }
  }

  async printTicket() {
    this.printer.alignCenter();
    this.printer.println(`================= MULTILLANTAS =================`);
    this.printer.println(`MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMW`);
    this.printer.cut();

    try {
      const res = await this.printer.execute();
      return 'Venta creada' + res;
    } catch (error) {
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
