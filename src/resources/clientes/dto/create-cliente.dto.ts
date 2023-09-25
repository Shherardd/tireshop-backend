import { z } from 'zod';

export const CreateClienteDtoSchema = z.object({
  nombre: z.string(),
  apellido: z.string(),
  rfc: z.string(),
  telefono_1: z.string(),
  telefono_2: z.string(),
  direccion: z.string(),
  ciudad: z.string(),
  estado: z.string(),
  pais: z.string(),
  fecha_nacimiento: z.string(),
  email: z.string(),
});

export class CreateClienteDto {
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
