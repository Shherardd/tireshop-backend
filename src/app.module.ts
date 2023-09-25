import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './resources/clientes/clientes.module';
import { DatabaseModule } from './modules/database/database.module';
import { ProductosModule } from './resources/productos/productos.module';

@Module({
  imports: [ClientesModule, DatabaseModule, ProductosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
