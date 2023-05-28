//require('dotenv').config();
const private_key="SERVER_PRIVATE_KEY"
const chat_gpt_api_key="CHAT_GPT_API_KEY"
const MOGO_URL="mongodb_URL"

export const config = {
    "private_key": private_key,
    "PORT": process.env.env_PORT,
    "chat_gpt_api_key": chat_gpt_api_key,
    "MOGO_URL": MOGO_URL
}
