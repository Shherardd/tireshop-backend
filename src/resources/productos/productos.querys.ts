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

export const INSERT_PRODUCTO = `INSERT INTO producto (categoria_id, descripcion, detalle, medida, rin, marca, modelo, existencia, precio_unitario, precio_descuento, busqueda) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

export const SELECT_PRODUCTOS = `SELECT * FROM producto where activo = 1`;

export const SELECT_PRODUCTO_BY_ID = `SELECT * FROM producto WHERE id = ?`;

export const UPDATE_PRODUCTO = `UPDATE producto SET categoria_id = ?, descripcion = ?, medida = ?, rin = ?, marca = ?, existencia = ?, precio_unitario = ?, precio_descuento = ? WHERE id = ?`;

export const DELETE_PRODUCTO = `DELETE FROM producto WHERE id = ?`;

export const SELECT_PRODUCTOS_BY_CATEGORIA = `SELECT * FROM producto WHERE categoria_id = ?`;
