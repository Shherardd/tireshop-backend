import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { DatabaseModule } from '../../modules/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
