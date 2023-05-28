import { Configuration, OpenAIApi } from "openai"
import express, { Express, Request, Response } from "express";
const router = express.Router();
import createError from 'http-errors';
//import mongoose, { MongooseOptions } from 'mongoose';
import { config } from "../config/config";
    /* GET home page. */
    router.post('/get', async function (req: Request, res: Response, next: any) {
      setImmediate(async () => {
        try {
          const content = req.body.content;
          const bot_model = req.body.bot_model
         // console.log("req.body", req.body);
          //return
          const configuration = new Configuration({
            apiKey: config.chat_gpt_api_key,
          });
          // [{role: "user", content: content}]
          const openai = new OpenAIApi(configuration);
          const completion = await openai.createChatCompletion({
            model: bot_model,
            messages: content,
            temperature: 0.7,
            max_tokens: 1500,
            top_p: 1,
            frequency_penalty: 2,
            presence_penalty: 2
          });
          //console.log(completion.data.choices[0].message?.content);
          // const text:any = completion.data.choices[0].message?.content
          // const myArray = text.split("\n");
          //console.log(myArray)
          return res.status(200).json({
            status: true,
            mss: "Done",
            data: {
              mss: completion.data.choices[0].message,
              created: completion.data.created
            }
          })
        } catch (e) {
          console.log(e);
          return next(createError(500, 'Internal Server Error'))
        }
      })
    });

export default router;
