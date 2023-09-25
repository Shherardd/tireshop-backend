import { Injectable, Inject } from '@nestjs/common';
import {
  CreateClienteDto,
  CreateClienteDtoSchema,
} from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Connection } from 'mysql2/promise';
import { MYSQL_CONNECTION } from '../../constants';
import {
  INSERT_CLIENTE,
  SELECT_CLIENTE_BY_ID,
  UPDATE_CLIENTE,
  DELETE_CLIENTE,
} from './clientes.querys';
import ApiResponse from 'src/shared/api-response';

@Injectable()
export class ClientesService {
  constructor(
    @Inject(MYSQL_CONNECTION) private readonly connection: Connection,
  ) {}
  async create(createClienteDto: CreateClienteDto) {
    try {
      const validatedData = CreateClienteDtoSchema.parse(createClienteDto);

      const query = INSERT_CLIENTE;

      const [result] = await this.connection.execute(query, [
        validatedData.nombre,
        validatedData.apellido,
        validatedData.rfc,
        validatedData.telefono_1,
        validatedData.telefono_2,
        validatedData.direccion,
        validatedData.ciudad,
        validatedData.estado,
        validatedData.pais,
        validatedData.fecha_nacimiento,
        validatedData.email,
      ]);

      return ApiResponse.created('Cliente creado', result);
    } catch (error) {
      return ApiResponse.error(error, 400);
    }
  }

  async findAll() {
    try {
      const res = await this.connection.execute('SELECT * FROM cliente');
      return ApiResponse.success('done', res[0]);
    } catch (error) {
      return ApiResponse.error(error, 400);
    }
  }

  async findOne(id: number) {
    try {
      console.log('id', id);
      const res = await this.connection.execute(SELECT_CLIENTE_BY_ID, [id]);
      console.log('res', res);
      return ApiResponse.success('done', res[0]);
    } catch (error) {
      return ApiResponse.error(error, 400);
    }
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    try {
      const {
        nombre,
        apellido,
        rfc,
        telefono_1,
        telefono_2,
        direccion,
        ciudad,
        estado,
        pais,
        fecha_nacimiento,
        email,
      } = updateClienteDto;
      const queryParams = [
        nombre,
        apellido,
        rfc,
        telefono_1,
        telefono_2,
        direccion,
        ciudad,
        estado,
        pais,
        fecha_nacimiento,
        email,
        id,
      ];
      const res = await this.connection.execute(UPDATE_CLIENTE, queryParams);
      return ApiResponse.success('done', res[0]);
    } catch (error) {
      console.log('error', error);
      return ApiResponse.error(error, 400);
    }
  }

  async remove(id: number) {
    try {
      const res = await this.connection.execute(DELETE_CLIENTE, [id]);
      return ApiResponse.success('done', res[0]);
    } catch (error) {
      return ApiResponse.error(error, 400);
    }
  }
}
