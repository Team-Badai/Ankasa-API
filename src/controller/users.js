const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const commonHelper = require("../helper/common");
const userQuery = require("../models/users");

// User's Authentication
const signUp = async (req, res, next) => {
  try {
    const { fullName, email, password, requisite } = req.body;
    const userId = uuidv4();
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await userQuery.searchAccount(email);
    if (user.length > 0) {
      return next({ status: 403, message: "This account is already exist!" });
    }
    if (requisite === "") {
      return next({
        status: 403,
        message: "Accept terms and condition should be checked."
      });
    }
    const account = {
      id: userId,
      fullname: fullName,
      email: email,
      password: hashedPassword
    };
    const payload = {
      id: account.id,
      name: account.fullname,
      email: account.email
    };
    const result = await userModels.createNewAccount(account);
    const token = commonHelper.generateToken(payload);
    commonHelper.response(
      res,
      payload,
      200,
      `Registration Success! New account with email: ${account.email} has been created.`
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const [account] = await userModels.searchAccount(email);
    if (!account) {
      return next({
        status: 403,
        message: "Please check your email or password!"
      });
    }
    const checkPassword = await bcrypt.compare(password, account.password);
    if (!checkPassword) {
      return next({
        status: 403,
        message: "Please check your email or password!"
      });
    }
    const payload = {
      id: account.id,
      email: account.email,
      role: account.role
    };
    const token = commonHelper.generateToken(payload);
    payload.token = token;
    commonHelper.response(
      res,
      payload,
      200,
      `Account with email: ${account.email} successfully login!`
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const getProfile = async (req, res, next) => {
  try {
    const { email } = req.decoded;
    const [account] = await userQuery.getDetailsAccount(email);
    standardResponse.responses(
      res,
      account,
      200,
      `Profile with email: ${email} successfully requested!`
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

// Admin's Authorization
const getAllAccounts = async (req, res, next) => {
  try {
    const sort = req.query.sort || "created_at";
    const order = req.query.order || "desc";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const offset = (page - 1) * limit;
    const result = await userQuery.getAllAccounts({
      sort,
      order,
      limit,
      offset
    });
    const calcResult = await userQuery.calculateAccounts();
    const { total } = calcResult[0];
    standardResponse.responses(
      res,
      result,
      200,
      `Data requests success! Total accounts: ${total}`,
      {
        currentPage: page,
        limit: limit,
        totalAccount: total,
        totalPage: Math.ceil(total / limit)
      }
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const result = await userQuery.deleteAccount(userId);
    standardResponse.responses(
      res,
      null,
      200,
      `Account with id: ${userId} has been deleted.`
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

module.exports = {
  signUp,
  login,
  getProfile,
  getAllAccounts,
  deleteAccount
};
