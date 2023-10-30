import { Injectable, Inject } from '@nestjs/common';
import {
  CreateProductoDto,
  CreateProductoDtoSchema,
} from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import {
  SELECT_PRODUCTOS,
  INSERT_PRODUCTO,
  SELECT_PRODUCTO_BY_ID,
  DELETE_PRODUCTO,
} from './productos.querys';
import { Connection } from 'mysql2/promise';
import { MYSQL_CONNECTION } from 'src/constants';
import ApiResponse from 'src/shared/api-response';

@Injectable()
export class ProductosService {
  constructor(
    @Inject(MYSQL_CONNECTION) private readonly connection: Connection,
  ) {}
  async create(createProductoDto: CreateProductoDto) {
    try {
      const validatedData = CreateProductoDtoSchema.parse(createProductoDto);

      const query = INSERT_PRODUCTO;

      const searchStringRaw = `${validatedData.medida}${validatedData.rin}`;
      const searchStringClean = searchStringRaw.replace(
        /[ /rR.,;:?¿¡!\-_(){}\[\]<>*&%$#"'\|~^´¨`+=]/g,
        '',
      );

      const [result] = await this.connection.execute(query, [
        validatedData.categoria_id,
        validatedData.descripcion,
        validatedData.detalle,
        validatedData.medida,
        validatedData.rin,
        validatedData.marca,
        validatedData.modelo,
        validatedData.existencia,
        validatedData.precio_unitario,
        validatedData.precio_descuento,
        searchStringClean,
      ]);

      return ApiResponse.created('Producto creado', result);
    } catch (error) {
      return ApiResponse.error(error, 400);
    }
  }

  async findAll() {
    try {
      const [rows] = await this.connection.execute(SELECT_PRODUCTOS);
      return ApiResponse.success('done', rows);
    } catch (error) {
      return ApiResponse.error(error, 400);
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.connection.execute(SELECT_PRODUCTO_BY_ID, [id]);
      return ApiResponse.success('done', res[0]);
    } catch (error) {
      return ApiResponse.error(error, 400);
    }
  }

  async findByCategoria(id: number) {
    try {
      const query = `SELECT * FROM producto WHERE categoria_id = ?`;
      const [rows] = await this.connection.execute(query, [id]);
      return ApiResponse.success('done', rows);
    } catch (error) {
      return ApiResponse.error(error, 400);
    }
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto` + updateProductoDto;
  }

  async remove(id: number) {
    try {
      const res = await this.connection.execute(DELETE_PRODUCTO, [id]);
      return ApiResponse.success('done', res[0]);
    } catch (error) {
      return ApiResponse.error(error, 400);
    }
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
