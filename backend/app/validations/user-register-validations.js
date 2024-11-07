const User=require("../models/user-model")


const userRegisterValidation = {
    firstname: {
      exists: {
        errorMessage: "First name is required",
      },
      notEmpty: {
        errorMessage: "First name cannot be empty",
      },
    },
    lastname: {
      exists: {
        errorMessage: "Last name is required",
      },
      notEmpty: {
        errorMessage: "Last name cannot be empty",
      },
    },
    email: {
      exists: {
        errorMessage: "Email is required",
      },
      isEmail: {
        errorMessage: "Must be a valid email",
      },
    },
    password: {
      exists: {
        errorMessage: "Password is required",
      },
      isLength: {
        options: { min: 6 },
        errorMessage: "Password should be at least 6 characters",
      },
    },
  };
  
  module.exports = userRegisterValidation;
  