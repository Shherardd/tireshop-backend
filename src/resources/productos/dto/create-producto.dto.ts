import { z } from 'zod';

/**
 * CREATE TABLE `producto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categoria_id` int DEFAULT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `medida` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `rin` int DEFAULT NULL,
  `marca` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `existencia` int DEFAULT NULL,
  `precio_unitario` int DEFAULT NULL,
  `precio_descuento` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
 */

export const CreateProductoDtoSchema = z.object({
  categoria_id: z.number(),
  descripcion: z.string(),
  medida: z.string(),
  rin: z.number(),
  marca: z.string(),
  existencia: z.number(),
  precio_unitario: z.number(),
  precio_descuento: z.number(),
});

export class CreateProductoDto {
  categoria_id: number;
  descripcion: string;
  medida: string;
  rin: number;
  marca: string;
  existencia: number;
  precio_unitario: number;
  precio_descuento: number;
}

/** JSON Body resquest */

/**
 * {
    "categoria_id": 1,
    "descripcion": "Llanta 1",
    "medida": "1",
    "rin": 1,
    "marca": "1",
    "existencia": 1,
    "precio_unitario": 1,
    "precio_descuento": 1
}
 */
