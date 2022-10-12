import { User } from '../models/User.js'
import jwt from "jsonwebtoken";
import bycrypt from "bcryptjs"




export const userSignup= (req, res) => {
    let status="user"
 
 const {email,password}= req.body
 User.findOne({ email: email })
  
      .then((saveUser) => {
          if (saveUser) {
              return res.status(422).json({ message: 'already registered' })
          }
              bycrypt.hash(password, 12)
              .then((hashedpassword) => {
                const  Data={...req.body,password:hashedpassword,status}
                  const user = new User(
                      Data
                  )
                  user.save()
                      .then(user => {
                          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
                          const userDetail ={...user,...user.password=undefined}
                          res.json({ message: "register successfully",token,user:userDetail._doc })
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
    return res.status(422).send({ error: "email not register" });
  }
  bycrypt.compare(password, user.password)
  .then(doMatch => {
      if (doMatch) {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
          const userDetail ={...user,...user.password=undefined}
          res.json({ message: "Successfull Login", token, user:userDetail._doc})
      } else {
          return res.status(422).json({ error: 'invalid password' })
      }
  })
}


  export const userSocialLogin= (req, res) => {
      let status="user"
   const {email}= req.body
   User.findOne({ email: email })
    
        .then((saveUser) => {
            if (saveUser) {
                const token = jwt.sign({ _id: saveUser._id }, process.env.JWT_SECRET)
                const userDetail ={...saveUser}
             return   res.json({ message: "login successfully",token,user:userDetail._doc })
            }
                
                  const  Data={...req.body,status}
                    const user = new User(
                        Data
                    )
                    user.save()
                        .then(user => {
                            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
                            const userDetail ={...user}
                            res.json({ message: "register successfully",token,user:userDetail._doc })
                        }).catch((err) => {
                            console.log(err)
                        })
            
        }).catch((err) => {
            console.log(err)
        })
  
  }