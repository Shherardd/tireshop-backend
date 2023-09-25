export const INSERT_CLIENTE = `INSERT INTO cliente (nombre, apellido, rfc, telefono_1, telefono_2, direccion, ciudad, estado, pais,
fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

export const SELECT_CLIENTES = `SELECT * FROM cliente`;

export const SELECT_CLIENTE_BY_ID = `SELECT * FROM cliente WHERE id = ?`;

export const UPDATE_CLIENTE = `UPDATE cliente SET nombre = ?, apellido = ?, rfc = ?, telefono_1 = ?, telefono_2 = ?, direccion = ?,
ciudad = ?, estado = ?, pais = ?, fecha_nacimiento = ?, email = ? WHERE id = ?`;

export const DELETE_CLIENTE = `DELETE FROM cliente WHERE id = ?`;
