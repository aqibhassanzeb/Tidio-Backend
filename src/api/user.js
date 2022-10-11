import { User } from '../models/User.js'
import jwt from "jsonwebtoken";
import bycrypt from "bcryptjs"




export const userSignup= (req, res) => {
    let status="user"
  const { email, password,name } = req.body
  if (!status || !email || !password || !name) {
      return res.status(422).json({ error: "please fill all field " })
  }
  User.findOne({ email: email })
      .then((saveUser) => {
          if (saveUser) {
              return res.status(422).json({ message: 'this is already registered' })
          }
              bycrypt.hash(password, 12)
              .then((hashedpassword) => {

                  const user = new User({
                      status,
                      email,
                      password: hashedpassword,
                    name,
                  })
                  user.save()
                      .then(user => {
                          res.json({ message: "register successfully" })
                      }).catch((err) => {
                          console.log(err)
                      })
              })
      }).catch((err) => {
          console.log(err)
      })

}

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" })
}
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }
  bycrypt.compare(password, user.password)
  .then(doMatch => {
      if (doMatch) {
          // res.json({message:"successfully signin"})
          // console.log(doMatch ,savedUser._id,JWT__SECRE)
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
          // console.log(token)
          const { _id, status, email } = user
          res.json({ message: "Successfull Login", token, user: { _id, email, status, } })
      } else {
          return res.status(422).json({ error: 'invalid email or password' })
      }
  })
}

