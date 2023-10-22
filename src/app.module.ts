import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './resources/clientes/clientes.module';
import { DatabaseModule } from './modules/database/database.module';
import { ProductosModule } from './resources/productos/productos.module';
import { PrinterModule } from './modules/printer/printer.module';
import { VentasModule } from './resources/ventas/ventas.module';
import { CategoriasModule } from './resources/categorias/categorias.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientesModule,
    DatabaseModule,
    ProductosModule,
    PrinterModule,
    VentasModule,
    CategoriasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
