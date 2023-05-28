import express, { Express, Request, Response } from "express";
const router = express.Router();
import { sign } from 'jsonwebtoken'
const createError = require('http-errors')
import bcrypt from "bcrypt";
import { config } from "../config/config";
import { INSTAND_USER } from "../model/instant _user";
/* GET home page. */
router.get('/', async function (req: any, res: Response, next: any) {
    try {
        const user = new INSTAND_USER({
            fullName: "seng YANG",
            email: "eeyboa5@gmail.com",
            type: 0,
            pass: "12345678"
        });
        await user.save();

        res.status(200).json({
            status: 200,
            mss: "Hello, world",
            data: req.auth
        })

    } catch (e) {
        return next(createError(401, 'Unauthorized!'))
    }
});

router.post('/login', async function (req: Request, res: Response, next: any) {
    try {
        const { username, password } = req.body;
        if (!(username && password)) {
            return next(createError(411, 'LengthRequired!'))
        }
        const pass = await bcrypt.hash(password, 10);
        const token = sign({
            data: {
                username: username,
                password: pass
            }
        }, config.private_key, { expiresIn: 60 });

        res.status(200).json({
            status: 200,
            mss: "Hello, world",
            data: { username, token }
        })
    } catch (e) {
        return next(createError(401, 'Unauthorized!'))
    }
});

export default router;
