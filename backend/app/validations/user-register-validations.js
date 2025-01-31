const User=require("../models/user-model")


const userSchemaValidation = {
  name: {
    exists: {
      errorMessage: "Name is required",
    },
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
  },
  email: {
    exists: {
      errorMessage: "Email is required",
    },
    isEmail: {
      errorMessage: "Must be a valid email",
    },
    custom: {
      options: async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error("Email is already in use");
        }
        return true;
      },
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

module.exports = userSchemaValidation;
