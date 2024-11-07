const User=require("../models/user-model")
const userLoginValidation={
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

}
module.exports=userLoginValidation