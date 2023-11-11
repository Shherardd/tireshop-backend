import { z } from 'zod';

/*
CREATE TABLE `venta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `factura_id` int DEFAULT NULL,
  `producto_id` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `precio_unitario` double(18,4) DEFAULT NULL,
  `subtotal` double(18,4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
*/

const VentaFactura = z.object({
  cliente_id: z.number(),
  cuenta_banco: z.string(),
  monto_pagado: z.number(),
  monto_total: z.number(),
  nombre_banco: z.string(),
  tipo_pago: z.string(),
  usuario_id: z.number(),
});

const VentaProducto = z.object({
  id: z.number(),
  categoria_id: z.number(),
  descripcion: z.string(),
  medida: z.string(),
  rin: z.number(),
  marca: z.string(),
  existencia: z.number(),
  precio_unitario: z.number(),
  precio_descuento: z.number(),
  activo: z.number(),
});

const VentaProductos = z.object({
  id: z.number(),
  producto: VentaProducto,
  descripcion: z.string(),
  cantidad: z.number(),
  precio_unitario: z.number(),
  subtotal: z.number(),
});

const VentaResumen = z.object({
  subtotal: z.number(),
  iva: z.number(),
  total: z.number(),
  efectivo: z.number(),
  cambio: z.number(),
});

export const CreateVentaDtoSchema = z.object({
  factura: VentaFactura,
  productos: z.array(VentaProductos),
  resumen: VentaResumen,
});

class VentaFacturaDto {
  cliente_id: number;
  cuenta_banco: string;
  monto_pagado: number;
  monto_total: number;
  nombre_banco: string;
  tipo_pago: string;
  usuario_id: number;
  folio: string;
}

class VentaProductoDto {
  id: number;
  categoria_id: number;
  descripcion: string;
  medida: string;
  rin: number;
  marca: string;
  existencia: number;
  precio_unitario: number;
  precio_descuento: number;
  activo: number;
}

class VentaProductosDto {
  id: number;
  producto: VentaProductoDto;
  descripcion: string;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

class VentaResumenDto {
  subtotal: number;
  iva: number;
  total: number;
  efectivo: number;
  cambio: number;
}

export class CreateVentaDto {
  factura: VentaFacturaDto;
  productos: VentaProductosDto[];
  resumen: VentaResumenDto;
}

/** JSON Body resquest */

/**
 * {
}
 */
