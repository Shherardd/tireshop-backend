import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { PrinterModule } from 'src/modules/printer/printer.module';
import { DatabaseModule } from 'src/modules/database/database.module';

@Module({
  imports: [PrinterModule, DatabaseModule],
  controllers: [VentasController],
  providers: [VentasService],
})
export class VentasModule {}
