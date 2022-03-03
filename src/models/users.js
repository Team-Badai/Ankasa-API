const connection = require("../config/dbConfig");

const createNewAccount = (account) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO users SET ?`;
    connection.query(sql, account, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const searchAccount = (email) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    connection.query(sql, email, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getAllAccounts = ({ sort, order, limit, offset }) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT users.id, users.role, users.fullname, users.email, users.phone_number, users.city, users.address, users.post_code, users.profile_picture, users.created_at, users.updated_at FROM users ORDER BY ?? ${order} LIMIT ? OFFSET ?`;
    connection.query(sql, [sort, limit, offset], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const calculateAccounts = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT COUNT(*) AS total FROM users`;
    connection.query(sql, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getDetailsAccount = (email) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT users.id, users.role, users.fullname, users.email, users.phone_number, users.city, users.address, users.post_code, users.profile_picture, users.created_at, users.updated_at FROM users WHERE email = ?`;
    connection.query(sql, email, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const deleteAccount = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM users WHERE id = ?`;
    connection.query(sql, id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

module.exports = {
  createNewAccount,
  searchAccount,
  getAllAccounts,
  calculateAccounts,
  getDetailsAccount,
  deleteAccount
};
