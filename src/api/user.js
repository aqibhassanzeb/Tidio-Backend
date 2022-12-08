import { User } from '../models/User.js'
import { subUser } from '../models/subUser.js'
import jwt from "jsonwebtoken";
import bycrypt from "bcryptjs"
import crypto from "crypto"
import nodemailer from "nodemailer"
import { chatBot } from '../models/chatbot.js';
import newChat from '../models/subUserchatModal.js';
import chatBotSet from '../models/chatbotSetting.js';


// email sending method 

const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: "workspatron@gmail.com", pass: "mhoumpxfstzptawc" }, from: "workspatron@gmail.com" })
transporter.verify((err, succ) => {
    if (err) {
        console.log(err);
    } else if (succ) {
        console.log("Mail Service Connected");
    }
});


// signup without valid email 

export const userSignup = (req, res) => {
    let status = "user"

    const { email, password } = req.body
    User.findOne({ email: email })

        .then((saveUser) => {
            if (saveUser) {
                return res.status(422).json({ message: 'already registered' })
            }
            bycrypt.hash(password, 12)
                .then((hashedpassword) => {
                    const Data = { ...req.body, password: hashedpassword, status }
                    const user = new User(
                        Data
                    )
                    user.save()
                        .then(user => {
                            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
                            const userDetail = { ...user, ...user.password = undefined }
                            res.json({ message: "register successfully", token, user: userDetail._doc })
                        }).catch((err) => {
                            console.log(err)
                        })
                })
        }).catch((err) => {
            console.log(err)
        })

}

// user login

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
                const userDetail = { ...user, ...user.password = undefined }
                res.json({ message: "Successfull Login", token, user: userDetail._doc })
            } else {
                return res.status(422).json({ error: 'invalid password' })
            }
        })
}

// social login

export const userSocialLogin = (req, res) => {
    let status = "user"
    subUser.findOne({ email: email })

        .then((saveUser) => {
            if (saveUser) {
                const token = jwt.sign({ _id: saveUser._id }, process.env.JWT_SECRET)
                const userDetail = { ...saveUser }
                return res.json({ message: "login successfully", token, user: userDetail._doc })
            }

            const Data = { ...req.body, status }
            const user = new User(
                Data
            )
            user.save()
                .then(user => {
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
                    const userDetail = { ...user }
                    res.json({ message: "register successfully", token, user: userDetail._doc })
                }).catch((err) => {
                    console.log(err)
                })

        }).catch((err) => {
            console.log(err)
        })

}

// valid email register 

export const ValidEmailRegister = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "please add email or password" })
    }
    try {
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User with this email already exists." })
        }
        const token = jwt.sign(req.body, process.env.JWT_SECRET, { expiresIn: '30min' })
        const link = `${process.env.LINK}/token/${token}`;
        transporter.sendMail({
            to: email,
            from: "no-reply-www.brianspk.com",
            subject: "Verify Email",
            html: `
            <h1>Tidio-Chat</h1>
        <p>You requested for Verify Email</p>
        <h5>click on link <a href="${link}">signup</a> to Verify Email</h5>
        `
        })

        res.status(200).json({ message: "Account Verification Link Send To Ur Account" })

    } catch {
        res.send("An error occured");
        console.log(error);
    }
}

// token verification 

export const tokenSignUp = (req, res) => {
    const { token } = req.params
    let status = "user"
    let secret = process.env.JWT_SECRET
    if (token) {
        jwt.verify(token, secret, async function (err, decodedToken) {
            if (err) {
                return res.status(400).json({ message: "token is invalid or expired" })
            }
            const { email, password } = decodedToken

            const userRegister = await User.findOne({ email });
            if (userRegister) {
                return res.send({ message: "this user is already registered" })
            }
            bycrypt.hash(password, 12)
                .then((hashedpassword) => {
                    const Data = { ...decodedToken, password: hashedpassword, status }
                    const userData = new User(
                        Data
                    )
                    userData.save()
                        .then(user => {
                            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
                            const userDetail = { ...user, ...user.password = undefined }
                            res.json({ message: "register successfully", token, user: userDetail._doc })
                        }).catch((err) => {
                            console.log(err)
                        })
                })
        })
    }
}

//   forgot password 

export const forgotPass = (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(422).json({ error: "applicant do not exist with this email" })
                }
                user.resetToken = token
                user.expireToken = Date.now() + 3600000
                user.save().then((result) => {
                    transporter.sendMail({
                        to: user.email,
                        from: "no-reply-www.brianspk.com",
                        subject: "password reset",
                        html: `
                        <h1>Tidio-Chat</h1>
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="${process.env.LINK}reset-pass/${token}">link</a> to reset password</h5>
                    `
                    })
                    res.json({ message: "check your email" })
                })

            })
    })
}

// new password 

export const newPass = (req, res) => {
    const d = new Date();
    let time = d.getTime();
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })

        .then(user => {
            console.log("user :", user)
            if (!user) {
                return res.status(422).json({ error: "Try again session expired" })
            }
            bycrypt.hash(newPassword, 12).then(hashedpassword => {
                user.password = hashedpassword
                user.resetToken = undefined
                user.expireToken = undefined
                user.save().then((saveduser) => {
                    res.json({ message: "password updated success" })
                })
            })
        }).catch(err => {
            console.log(err)
        })
}

// password change 

export const changePass = async (req, res) => {

    const { oldPass, newPass, _id } = req.body
    if (!oldPass || !newPass || !_id) {
        return res.status(440).json({ error: "field is required" })
    }
    let user = await User.findById({ _id })
    if (!user) {
        return res.status(422).send({ error: "user not found" });
    }
    bycrypt.compare(oldPass, user.password)
        .then(doMatch => {
            if (doMatch) {
                bycrypt.hash(newPass, 12)
                    .then((hashedpassword) => {
                        User.findByIdAndUpdate({ _id }, { password: hashedpassword }).then(result => {
                            res.json({ message: "Successfull updated password" })
                        })
                    })
            } else {
                return res.status(422).json({ error: 'current password not match' })
            }
        }).catch(err => {
            console.log(err)
        })
}


// user update 

export const userUpdate = (req, res) => {
    if (!req.params._id) {
        return res.status(440).json("id is required")
    }
    const { name, imageUrl, region, language } = req.body
    let payload = {
        name,
        region,
        language,
        imageUrl: req.file ? req.file.filename : undefined,
    }
    User.findByIdAndUpdate(req.params, payload)
        .then(user => {
            User.findById(req.params).then(resp => {
                const userDetail = { ...resp, ...resp.password = undefined }
                res.json({ message: "update successfully", user: userDetail._doc })
            })
        }).catch(err => {
            console.log(err)
        })
}


// sub user portion 


export const subUserCreate = (req, res) => {
    const { name, createdby } = req.body
    if (!name) {
        return res.status(422).json({ message: "name is required" })
    }
    chatBot.find({ $and: [{ name: name }, { createdby: createdby }] })

        .then((saveUser) => {
            if (saveUser.length > 0) {
                return res.status(422).json({ message: 'already registered' })
            }
            const user = new chatBot(req.body)
            user.save()
                .then(user => {
                    res.json({ message: "created successfully", user })
                }).catch((err) => {
                    console.log(err)
                })
        }).catch((err) => {
            console.log(err)
        })

}

// fetch subuser api

export const subUserfetch = (req, res) => {
    if (!req.params._id) {
        return res.status(422).json({ message: "id required" })
    }
    const id = req.params._id
    chatBot.find({ createdby: id })

        .then((saveUser) => {
            res.json({ saveUser })
        }).catch((err) => {
            console.log(err)
        })

}

// delete subuser api

export const subUserDelete = (req, res) => {
    if (!req.params._id) {
        return res.status(422).json({ message: "id required" })
    }
    const id = req.params._id
    chatBot.findOneAndDelete({ _id: id })
        .then((saveUser) => {
            res.json({ message: "deleted successfully" })
        }).catch((err) => {
            console.log(err)
        })

}

// fetch subuser enable contact
export const subUserfetchContact = (req, res) => {
    if (!req.params._id) {
        return res.status(422).json({ message: "id required" })
    }
    const id = req.params._id
    newChat.find({
        $and: [
            { chatEnable: true }, { Admin: id }
        ]
    })
        .populate("subUser", "email")
        .sort({ updatedAt: -1 })
        .then((saveUser) => {
            res.json({ saveUser })
        }).catch((err) => {
            console.log(err)
        })

}

// delete chat of subuser
export const subUserchatDelete = (req, res) => {
    if (!req.params._id) {
        return res.status(422).json({ message: "id required" })
    }
    const id = req.params._id
    newChat.findOneAndUpdate({ _id: id }, { chatEnable: false })
        .then((saveUser) => {
            res.json({ message: "deleted successfully" })
        }).catch((err) => {
            console.log(err)
        })

}

//    setting for chatBot

export const chatbotSetting = (req, res) => {
    const _id = req.body._id
    chatBotSet.findOne({ _id })
        .then((saveUser) => {
            if (!saveUser) {
                const chatbotset = new chatBotSet(req.body)
                chatbotset.save()
                    .then(chatbot => {
                        res.json({ message: "created successfully", chatbot })
                    })
                return
            }
            chatBotSet.findOneAndUpdate({ _id }, req.body)
                .then(chatbot => {
                    res.json({ message: "updated successfully" })
                }).catch((err) => {
                    console.log(err)
                })
        }).catch((err) => {
            console.log(err)
        })

}

// fetch api for chatbot setting 
export const chatbotSettingfetch = (req, res) => {
    if (!req.params._id || req.params._id == undefined) {
        return res.status(422).json({ message: "id required" })
    }
    const id = req.params._id
    chatBotSet.find({ createdby: id })

        .then((setting) => {
            res.json(setting)
        }).catch((err) => {
            console.log(err)
        })

}