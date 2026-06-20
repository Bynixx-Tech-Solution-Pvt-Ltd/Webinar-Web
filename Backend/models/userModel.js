const pool = require('../config/db');

// Find user by email
async function findByEmail(email) {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0];
}

// Create a new user (returns id, role)
async function createUser({ name, email, password_hash, role = 'student' }) {
  const { rows } = await pool.query(
    `INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, role`,
    [name || email, email, password_hash, role]
  );
  return rows[0];
}

module.exports = { findByEmail, createUser };
