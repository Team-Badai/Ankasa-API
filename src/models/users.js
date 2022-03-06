const connection = require("../config/dbConfig");

const signUp = (data) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO users SET ?`;
    connection.query(sql, data, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const findUserEmail = (fullname, email) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT email FROM users WHERE fullname = ? AND email = ?`;
    connection.query(sql, [fullname, email], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const updateVerifiedUser = (fullname, email) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE users SET status = 1 WHERE fullname = ? AND email = ?`;
    connection.query(sql, [fullname, email], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const login = (data) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT fullname, email, password, status, id_roles FROM users WHERE email = ?`;
    connection.query(sql, data.email, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const findUserEmailLogin = (email) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT email from users WHERE email = ?`;
    connection.query(sql, email, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getStatusByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, id_role, status FROM users WHERE email = ?`;
    connection.query(sql, email, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const resetUserPassword = (password, email, id) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE users SET password = ? WHERE email = ? AND id = ?`;
    connection.query(sql, [password, email, id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getDetailsUser = (email, role) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT users.id, users.id_role, users.fullname, users.email, users.phone_number, users.city, users.address, users.post_code, users.profile_picture, users.created_at, users.updated_at FROM users WHERE email = ? AND id_role = ?`;
    connection.query(sql, [email, role], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const updateDetailsUser = (data, email, status, role) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE users SET ? WHERE email = ? AND status = ? AND id_role = ?`;
    connection.query(sql, [data, email, status, role], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const updateProfilePicture = (email, role, profile_picture) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE users SET profile_picture = ? WHERE email = ? AND id_role = ?`;
    connection.query(sql, [profile_picture, email, role], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getAllUsers = ({ sort, order, limit, offset }) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT users.id, users.id_role, users.fullname, users.email, users.phone_number, users.city, users.address, users.post_code, users.profile_picture, users.created_at, users.updated_at FROM users ORDER BY ?? ${order} LIMIT ? OFFSET ?`;
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

// user model for booking process
const getUserIdByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id FROM users WHERE email = ?`
    connection.query(sql, id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  })
}

module.exports = {
  signUp,
  findUserEmail,
  updateVerifiedUser,
  login,
  findUserEmailLogin,
  getStatusByEmail,
  resetUserPassword,
  updateDetailsUser,
  updateProfilePicture,
  getAllUsers,
  calculateAccounts,
  getDetailsUser,
  getUserIdByEmail,
  deleteAccount
};
