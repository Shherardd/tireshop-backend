import { Injectable, Inject } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { SELECT_PRODUCTOS } from './productos.querys';
import { Connection } from 'mysql2/promise';
import { MYSQL_CONNECTION } from 'src/constants';
import ApiResponse from 'src/shared/api-response';

@Injectable()
export class ProductosService {
  constructor(
    @Inject(MYSQL_CONNECTION) private readonly connection: Connection,
  ) {}
  create(createProductoDto: CreateProductoDto) {
    return 'This action adds a new producto' + createProductoDto;
  }

  async findAll() {
    try {
      const [rows] = await this.connection.execute(SELECT_PRODUCTOS);
      return ApiResponse.success('done', rows);
    } catch (error) {
      return ApiResponse.error(error, 400);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto` + updateProductoDto;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }

  async deactivate(id: number) {
    try {
      await this.connection.beginTransaction();
      const query = `UPDATE producto SET activo = 0 WHERE id = ?`;
      const [result] = await this.connection.execute(query, [id]);
      await this.connection.commit();
      return ApiResponse.success('done', result);
    } catch (error) {
      await this.connection.rollback();
      return ApiResponse.error(error, 400);
    }
  }
}
