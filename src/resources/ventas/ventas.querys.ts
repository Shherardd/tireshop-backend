/*CREATE TABLE `factura` (
    `id` int NOT NULL AUTO_INCREMENT,
    `folio` varchar(50) DEFAULT NULL,
    `cliente_id` int NOT NULL,
    `tipo_pago` varchar(100) DEFAULT NULL,
    `monto_total` double(18,4) NOT NULL,
    `monto_pagado` double(18,4) DEFAULT NULL,
    `nombre_banco` varchar(100) DEFAULT NULL,
    `cuenta_banco` varchar(100) DEFAULT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `usuario_id` int DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  */

export const INSERT_FACTURA = `INSERT INTO factura (folio, cliente_id, tipo_pago, monto_total, monto_pagado, nombre_banco, cuenta_banco, usuario_id) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)`;
