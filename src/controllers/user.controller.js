import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import OTP from '../models/otp.model.js';
import { generateToken } from '../utils/jwt.util.js';
import ApiError from '../utils/ApiError.util.js';

export const checkEmailNotExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new ApiError(400, 'User', 'User already exists');
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const checkEmailExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findByEmail(email);
    if (!existingUser) {
      throw new ApiError(400, 'User', 'User does not exist');
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // check if email is otp verified before signup
    const otpRecord = await OTP.findOTPByEmail(email);
    if (!otpRecord || !otpRecord.verified) {
      return res.status(400).json({ message: 'Email not verified' });
    }
    // check if otp verified is expired
    const updatedAtLocal = new Date(otpRecord.updated_at);
    updatedAtLocal.setMinutes(updatedAtLocal.getMinutes() - new Date().getTimezoneOffset());
    if (new Date() - updatedAtLocal > 5 * 60 * 1000) {
      return res.status(400).json({ message: 'Session expired, please retry the signup process' });
    }

    // hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    delete user.password;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    const existingUser = await User.findByEmail(email);
    if (!existingUser) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // hash password and update user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.updatePassword(email, hashedPassword);
    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userProfileRecord = await User.findByEmail(email);
    if (!userProfileRecord) {
      throw new ApiError(401, 'User', 'User does not exist with this email. Please register first.');
    }

    const isPasswordValid = await bcrypt.compare(password, userProfileRecord.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    delete userProfileRecord.password;
    const secretToken = generateToken(userProfileRecord);

    res.cookie('auth', secretToken, { httpOnly: true }).json({
      message: 'User logged in', user: userProfileRecord, success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const readUser = async (req, res, next) => {
  try {
    const { email } = req.user;
    const userProfileRecord = await User.findByEmail(email);
    if (!userProfileRecord) {
      throw new ApiError(404, 'User', 'User not found');
    }

    delete userProfileRecord.password;
    res.status(200).json({ user: userProfileRecord, message: 'User found', success: true });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res.clearCookie('auth').json({ message: 'User logged out', success: true });
};