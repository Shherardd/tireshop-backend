export const INSERT_PRODUCTO = `INSERT INTO producto (.......) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

export const SELECT_PRODUCTOS = `SELECT * FROM producto`;

export const SELECT_PRODUCTO_BY_ID = `SELECT * FROM producto WHERE id = ?`;

export const UPDATE_PRODUCTO = `UPDATE producto SET ...... WHERE id = ?`;

export const DELETE_PRODUCTO = `DELETE FROM producto WHERE id = ?`;
