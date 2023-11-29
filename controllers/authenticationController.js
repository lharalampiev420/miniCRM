import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";

class Authentication {
  login = async function (req, res, next) {
    try {
      // Setup needed data
      const { email, password } = req.body;
      const wrongInput = "Please provide email and password !";
      // const userNotFound = "User was not found with the given input !";
      const wrongData = "Wrong password or email !";

      //Check if email and password are given
      if (!email || !password)
        return res.status(401).json({ loginStatus: "fail", wrongInput });

      //Try to retrieve the user from the database
      const user = await User.findOne({ email }).select("+password");

      // Check if email is correct and user is found
      if (!user)
        return res.status(401).json({ loginStatus: "fail", wrongData });

      // Compare given password with the actual
      const correctPassword = await user.comparePassword(password);

      // Check if password is correct
      if (!correctPassword)
        return res.status(401).json({ loginStatus: "fail", wrongData });

      // Sign JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });

      // Send cookie
      // Convert JWT_COOKIE_EXPIRATION to miliseconds
      const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true,
      };

      res.cookie("jwt", token, cookieOptions);

      //Remove password field from user
      user.password = undefined;

      res.status(200).json({
        loginStatus: "success",
        token,
        user,
      });
    } catch (error) {
      res.status(400).json({ loginStatus: "fail", catch: "yes" });
    }
  };

  createUser = async function (req, res, next) {
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        position: req.body.position,
        role: req.body.role,
        company: req.body.company,
      });

      //Remove user password from output
      user.password = undefined;

      res.status(201).json({ signupStatus: "success", user });
    } catch (error) {
      res.status(400).json({ signupStatus: "fail", message: error.message });
    }
  };

  protect = async function (req, res, next) {
    try {
      // Retrieve token
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        [, token] = req.headers.authorization.split(" ");
      } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
      }

      // Check if token exists
      if (!token) return res.status(400).render("errorView");

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);

      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({ status: "fail", message: error });
    }
  };

  restrictTo = function (...roles) {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res
          .status(401)
          .json({ status: "fail", message: "You dont have permission !" });
      }
      next();
    };
  };

  logout = async (req, res, next) => {
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 500),
      httpOnly: true,
      secure: true,
    });
    res.status(200).json({ status: "success" });
  };
}

export default new Authentication();
