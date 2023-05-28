import express, { Express, Request, Response } from "express";
const router = express.Router();
import createError from 'http-errors';
import { INSTAND_USER } from "../model/instant _user";
import bcrypt from 'bcrypt';
import { config } from "../config/config";
import { sign, verify } from 'jsonwebtoken'
import { mail, mail_admin } from "../util/mail_config"
/* GET home page. */
router.post('/', async function (req: Request, res: Response, next: any) {
  setImmediate(async () => {
    try {
      const { email, password } = req.body;
      // Check if user already exists
      const existingUser = await INSTAND_USER.findOne({ email: email.toLowerCase() });
      if (!existingUser) {
        return next(createError(400, 'Email incorrect!'))
      }
      // Hash password using bcrypt
      const hashedPassword = await bcrypt.compare(password, existingUser.pass);
      if(!hashedPassword){
        return next(createError(400, 'Password incorrect!'))
      }
      const token = sign({ id: existingUser._id }, config.private_key, { expiresIn: '1M' })
      const user = {
        name: existingUser.fullName,
        phone: existingUser.phone,
        email: existingUser.email
      }
      res.status(200).json({
        status: true,
        mss: "User Login successfully",
        data: {
          token,
          user
        }
      })
    } catch (e) {
      return next(createError(500, 'Internal Server Error'))
    }
  })
});

router.post('/register', async function (req: Request, res: Response, next: any) {
  setImmediate(async () => {
    try {
      const { username, password, c_password } = req.body;
      if (password != c_password) return next(createError(400, 'Password mismatch!'))
      // Check if user already exists
      const existingUser = await INSTAND_USER.findOne({ email: username.toLowerCase() });
      if (existingUser) {
        return next(createError(400, 'User already exists'))
      }
      // Hash password using bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      // Create new user and save to database
      const randomNumber = Math.floor(Math.random() * 900000) + 100000;
      const token = sign({ email: username.toLowerCase() }, config.private_key, { expiresIn: '1h' })
      const newUser = new INSTAND_USER({ type: 1, email: username.toLowerCase(), pass: hashedPassword, code: randomNumber, token: token });
      await newUser.save();

      res.status(200).json({
        status: true,
        mss: "User created successfully",
        data: {
          token
        }
      })
      let mailOptions = {
        from: `"Updoun bot" <${mail_admin}>`, // sender address
        to: username, // list of receivers
        subject: 'Confirm code ✔', // Subject line
        text: 'Confirm code', // plain text body
        html: `<b>Your register confirm code: ${randomNumber}</b>` // html body
      };
      let info = await mail.sendMail(mailOptions);
      return console.log('Message sent: %s', info.messageId);
    } catch (e) {
      console.log("eeeeeeeeeeee", e);
      return next(createError(500, 'Internal Server Error'))
    }
  })
});

router.post('/register_confirm', async function (req: Request, res: Response, next: any) {
  setImmediate(async () => {
    try {
      const { token, code } = req.body;
      console.log('Token: ', token, "code: ", code);
      if (!token || !code) return next(createError(400, 'Token and code are required!'))
      const [bearer, tokens] = token.split(' ')
      const decoded:any = verify(tokens, config.private_key);
      console.log('Decoded: ', decoded)
      // Check if user already exists
      const existingUser = await INSTAND_USER.findOne({ email: decoded.email, code: parseInt(code) });
      if (!existingUser) {
        console.log('User not found!')
        return next(createError(400, 'Code invalid!'))
      }
      if(existingUser.isActive == true) {
        return next(createError(400, 'This user already active!'))
      }
      // Hash password using bcrypt
      const userUpdate =   await INSTAND_USER.updateOne({ email: decoded.email, code: parseInt(code) }, { $set: { code: 0, isActive: true } })
      console.log("userUpdate", userUpdate)
      if(userUpdate.modifiedCount > 0){
        return res.status(200).json({
          status: true,
          mss: "User registered successfully",
          data: {}
        })
      }else{
        return next(createError(400, 'Something went wrong! Please try again'))
      }
      
    } catch (e) {
      console.log("eeeeeeeeeeee", e);
      return next(createError(500, 'Internal Server Error'))
    }
  })
});
export default router;
