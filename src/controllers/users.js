const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const commonHelper = require("../helper/common");
const userQuery = require("../models/users");

// User's Authentication
const signUp = async (req, res, next) => {
  try {
    const { fullname, email, password, requisite } = req.body;
    const userId = uuidv4();
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const signupData = {
      id: userId,
      fullname: fullname,
      email: email,
      password: hashedPassword
    };
    const findEmail = await userQuery.findUserEmail(fullname, email);
    if (findEmail.length === 0) {
      const newUser = await userQuery.signUp(signupData);
      console.log(newUser);
      if (newUser.affectedRows > 0) {
        const results = {
          newUser: newUser
        };
        const payload = {
          fullname: fullname,
          email: email
        };
        const token = commonHelper.generateToken(payload);
        payload.token = token;
        commonHelper.response(
          res,
          `Pending`,
          200,
          `Please check your email, a verification email has been send to verfity your email`
        );
        commonHelper.sendEmailVerification(email, token);
      }
    } else {
      return next({
        status: 403,
        message:
          "Email is already existed. Please choose another email to signup."
      });
    }
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = {
      email: email,
      password: password
    };
    const findEmailUser = await userQuery.findUserEmailLogin(email);
    if (findEmailUser.length === 0) {
      commonHelper.response(
        res,
        `Login Failed`,
        500,
        `Sorry, We cannot find your email! Please try again.`
      );
    } else if (findEmailUser[0].email === data.email) {
      const [userLogin] = await userQuery.login(data);
      console.log(userLogin);
      if (userLogin.status === 1) {
        const checkPassword = await bcrypt.compare(
          data.password,
          userLogin.password
        );
        if (checkPassword) {
          const payload = {
            email: userLogin.email,
            role: userLogin.role_name,
            status: userLogin.status
          };
          const token = commonHelper.generateToken(payload);
          payload.token = token;
          commonHelper.response(
            res,
            payload,
            200,
            `Login is Successful! Welcome back ${userLogin.fullname}`
          );
        } else {
          commonHelper.response(
            res,
            `Login Failed`,
            500,
            `Sorry, your password is wrong! Please try again.`
          );
        }
      } else {
        commonHelper.response(
          res,
          `Login Failed`,
          500,
          `Sorry, your account is not yet activated.`
        );
      }
    }
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const resetPasswordEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const payload = {
      email: email
    };
    console.log(email);
    if (email === "" || email === undefined) {
      return next({ status: 403, message: "Please input your email!" });
    }
    const token = commonHelper.generateToken(payload);
    commonHelper.response(
      res,
      `Pending`,
      200,
      `Please check your email, a verification email has been send to reset your password`
    );
    commonHelper.sendEmailResetPasswordVerification(email, token);
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email } = req.decoded;
    const { password } = req.body;
    const [user] = await userQuery.getStatusByEmail(email);
    if (user.status === 1 && user.role_name === "user") {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const result = await userQuery.resetUserPassword(
        hashedPassword,
        email,
        user.id
      );
      commonHelper.response(
        res,
        result,
        200,
        `User ${email} successfully reset password!`
      );
    } else {
      commonHelper.response(
        res,
        `Login Failed`,
        500,
        `Sorry, your account is not yet activated.`
      );
    }
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

// User's Profile
const getProfile = async (req, res, next) => {
  try {
    const { email, status } = req.decoded;
    if (status === 1) {
      const [account] = await userQuery.getDetailsUser(email);
      commonHelper.response(
        res,
        account,
        200,
        `Profile with email: ${email} successfully requested!`
      );
    } else {
      next({
        status: 500,
        message: "Your account is not activated yet. Please verify your email!"
      });
    }
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { status } = req.decoded;
    const { email, phone_number, fullname, city, address, post_code } =
      req.body;
    const updatedAt = new Date();
    const userData = {
      email: email,
      phone_number: phone_number,
      fullname: fullname,
      city: city,
      address: address,
      post_code: post_code,
      updated_at: updatedAt
    };
    if (status === 1) {
      const result = await userQuery.updateDetailsUser(userData, email, status);
      commonHelper.response(
        res,
        userData,
        200,
        `User ${email} is successfully updated`,
        null
      );
    } else {
      next({
        status: 500,
        message: "Your account is not activated yet. Please verify your email!"
      });
    }
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const updateProfilePicture = async (req, res, next) => {
  try {
    const { email, status } = req.decoded;
    const fileName = req.file.filename;
    const profile_picture = `${process.env.BASE_URL}/file/${fileName}`;
    const updatedAt = new Date();
    if (status === 1) {
      const result = await userQuery.updateProfilePicture(
        email,
        profile_picture
      );
      const profilePictureData = {
        email: email,
        profile_picture: profile_picture,
        updated_at: updatedAt
      };
      commonHelper.response(
        res,
        profilePictureData,
        200,
        `User ${email}'s profile picture is successfully updated.`,
        null
      );
    } else {
      next({
        status: 500,
        message: "Your account is not activated yet. Please verify your email!"
      });
    }
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

// Admin's Authorization
const getAllUsers = async (req, res, next) => {
  try {
    const sort = req.query.sort || "created_at";
    const order = req.query.order || "desc";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const offset = (page - 1) * limit;
    const result = await userQuery.getAllUsers({
      sort,
      order,
      limit,
      offset
    });
    const calcResult = await userQuery.calculateAccounts();
    const { total } = calcResult[0];
    commonHelper.response(
      res,
      result,
      200,
      `Data requests success! Total accounts: ${total}`,
      null,
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
    commonHelper.response(
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
  resetPasswordEmail,
  resetPassword,
  getProfile,
  updateProfile,
  updateProfilePicture,
  getAllUsers,
  deleteAccount
};
