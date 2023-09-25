import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  nombre: string;
  apellido: string;
  rfc: string;
  telefono_1: string;
  telefono_2: string;
  direccion: string;
  ciudad: string;
  estado: string;
  pais: string;
  fecha_nacimiento: string;
  email: string;
}
