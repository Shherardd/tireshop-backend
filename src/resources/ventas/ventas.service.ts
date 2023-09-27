import { Injectable, Inject } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { POS_PRINTER } from 'src/constants';
import { ThermalPrinter } from 'node-thermal-printer';

@Injectable()
export class VentasService {
  constructor(@Inject(POS_PRINTER) private readonly printer: ThermalPrinter) {}

  async create(createVentaDto: CreateVentaDto) {
    this.printer.alignCenter();
    this.printer.println(`================= MULTILLANTAS =================`);
    this.printer.println(`MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMW`);
    this.printer.cut();

    try {
      await this.printer.execute();
    } catch (error) {
      return 'Error al imprimir';
    }
    return 'Venta creada';
  }

  findAll() {
    return `This action returns all ventas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} venta`;
  }

  update(id: number, updateVentaDto: UpdateVentaDto) {
    return `This action updates a #${id} venta`;
  }

  remove(id: number) {
    return `This action removes a #${id} venta`;
  }
}
