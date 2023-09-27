import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { PrinterModule } from 'src/modules/printer/printer.module';

@Module({
  imports: [PrinterModule],
  controllers: [VentasController],
  providers: [VentasService],
})
export class VentasModule {}
