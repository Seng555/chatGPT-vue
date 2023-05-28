//require('dotenv').config();
const private_key="DFJSGNIKDNVKJNNDSJBNFGHSBBSDJGBSDHBFSDBNFHBSHB"
const chat_gpt_api_key="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"
const MOGO_URL="mongodb://139.180.187.31:56016/chatGPT"

export const config = {
    "private_key": private_key,
    "PORT": process.env.env_PORT,
    "chat_gpt_api_key": chat_gpt_api_key,
    "MOGO_URL": MOGO_URL
}