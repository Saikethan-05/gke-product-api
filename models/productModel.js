// models/productModel.js
const pool = require('../db');

const Product = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM "Product" ORDER BY id ASC');
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query('SELECT * FROM "Product" WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async ({ name, description, price, quantity }) => {
    const result = await pool.query(
      `INSERT INTO "Product" (name, description, price, quantity, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       RETURNING *`,
      [name, description, price, quantity]
    );
    return result.rows[0];
  },

  update: async (id, { name, description, price, quantity }) => {
    const result = await pool.query(
      `UPDATE "Product"
       SET name=$1, description=$2, price=$3, quantity=$4, updated_at=NOW()
       WHERE id=$5 RETURNING *`,
      [name, description, price, quantity, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await pool.query('DELETE FROM "Product" WHERE id=$1', [id]);
    return result.rowCount > 0;
  },
};

module.exports = Product;
