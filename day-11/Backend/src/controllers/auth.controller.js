const userModel = require("../model/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//User Register controller
async function registerController(req, res) {
  const { userName, email, password, bio, profileImage } = req.body;


  //Check if user already exist either emailId or userName
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ userName }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message:
        isUserAlreadyExists.email === email
          ? "Email already exists"
          : " User already exists",
    });
  }

  //Create hash format passowrd and save into DB
  const hash = await bcrypt.hash(password, 10); //10: salt

  //create user and save into  DB
  const user = await userModel.create({
    userName,
    password: hash,
    email,
    bio,
    profileImage,
  });

  //create Token & sign
  const token = jwt.sign(
    {
      id: user._id,
      userName: user.userName,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }, //Token expire validity
  );

  res.cookie("Token", token); //response cookie and save into cookie storage

  res.status(201).json({
    message: "User registered successfully",
    user: {
      userName: user.userName,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

//User Login controller
async function loginController(req, res) {
  const { email, userName, password } = req.body;

  //Two conditions to login:
  //condition 1: userName, password
  //condition 2: email, password

  const user = await userModel.findOne({
    $or: [
      {
        userName: userName,
      },
      {
        email: email,
      },
    ],
  });

  //check userName/email already exist or not
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  //Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Password invalid",
    });
  }

  //To create token & sign
  const token = jwt.sign(
    {
      id: user._id,
      userName: user.userName,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  //cookie save into cookie storage area
  res.cookie("Token", token);

  //send res to the user
  res.status(200).json({
    message: " User logged in successfully",
    user: {
      userName: user.userName,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

async function getMeController() {

  const userId = req.user.id

  const user = await userModel.findById(userId) 

  res.status(200).json({
    user: {
      userName: user.userName,
      email: user.email,
      bio: user.nio,
      profileImage: user.profileImage
    }
  })

}
module.exports = {
  registerController,
  loginController,
  getMeController
};
