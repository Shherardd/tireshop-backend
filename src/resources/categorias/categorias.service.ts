import { Injectable, Inject } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Connection } from 'mysql2/promise';
import { MYSQL_CONNECTION } from 'src/constants';
import ApiResponse from 'src/shared/api-response';

@Injectable()
export class CategoriasService {
  constructor(
    @Inject(MYSQL_CONNECTION) private readonly connection: Connection,
  ) {}
  create(createCategoriaDto: CreateCategoriaDto) {
    return 'This action adds a new categoria';
  }

  async findAll() {
    try {
      /* Prepared stmt
      const stmt = await this.connection.prepare(
        'SELECT * FROM categoria where id = ?',
      );
      const res = await stmt.execute([2]);*/

      const res = await this.connection.execute('SELECT * FROM categoria');

      return ApiResponse.success('done', res[0]);
    } catch (error) {
      return ApiResponse.error(error, 400);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} categoria`;
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoria`;
  }
}
