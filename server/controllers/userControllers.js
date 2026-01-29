import User from "../model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import admin from "firebase-admin";
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "user is not register, plase register and login",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "password is not match",
      });
    }
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,

      {
        expiresIn: "1d",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    res.status(200).json({
      message: "login successfull",
    });
  } catch (error) {
    return res.status(500).json({
      message: "saver error",
      error: error.message,
    });
  }
};

export const verify = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ authenticated: false, message: "unauthorize" });
    }

    return res.status(200).json({
      authenticated: true,
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { name, password, email } = req.body; //fatch data

    const user = await User.findOne({ email }); // check if user is already register
    if (user) {
      return res.status(409).json({
        message: "User is already register plase login",
      });
    }
    const hashedPasword = await bcrypt.hash(password, 12); // password hashed

    const newUser = await User.create({ name, password: hashedPasword, email }); //register newUser
    res.status(201).json({
      data: newUser,
      massage: "successfully registered",
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "ID token is required" });
    }
    // Verify Google token
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    let user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      user = await User.create({
        name: decodedToken.name,
        email: decodedToken.email,
        password: crypto.randomUUID(),
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    // Set cookie (15 days)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      secure: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      authenticated: true,
      id: user._id,
      email: user.email,
      name: user.name,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    return res.status(401).json({ message: "Google authentication failed" });
  }
};
