// Import and use Vuex
import Vuex from 'vuex'
import Vue from 'vue'
import util from '@/common/util'
import axios from 'axios'
import { config } from '../config/index'
axios.defaults.baseURL = config.BASE_URL

Vue.use(Vuex)
// actions in the corresponding component
const actions = {
    async login(context, { email, password }) {
        try {
            const data = {
                email,
                password
            }
            console.log("data1", data)
            const response = await axios.post('/auth', data)
            //console.log("response1", response)
            context.commit('', data)
            return response
        } catch (error) {
            //console.log("Err11111", error.response)
            return error.response
        }
    },
    // before the chat, use `bots.json` to load bot_name and init_prompt
    async fetchBots (context) {
        try {
            const response = await fetch('bots.json')
            const data = await response.json()
            //console.log("data", data)
            context.commit('INIT_BOTS', data)
        } catch (error) {
            console.error(error)
        }
    },
    async register(context, { username, password, c_password }) {
        try {
            const data = {
                username,
                password,
                c_password
            }
            console.log("data1", data)
            const response = await axios.post('/auth/register', data)
            //console.log("response1", response)
            context.commit('', data)
            return response
        } catch (error) {
            //console.log("Err11111", error.response)
            return error.response
        }
    },
    async confirm(context, { token, code }) {
        try {
            const data = {
                token: "bearer " + token,
                code
            }
            //console.log("data1", data)
            const response = await axios.post('/auth/register_confirm', data)
            //console.log("response1", response)
            context.commit('', data)
            return response
        } catch (error) {
            console.log("Err11111", error.response)
            return error.response
        }
    },
    async saveToken(context, { token, user }) {
        try {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user))
            return token
        } catch (error) {
            console.log("Err11111", error)
            return error
        }
    },
    async logout(context) {
        try {
            context.commit('', {})
            localStorage.clear()
            return true
        } catch (error) {
            console.log("Err11111", error)
            return false
        }
    }
}

// manipulating data in `state`
const mutations = {
    SEND_MESSAGE (state, payload) {
        // console.log('SEND_MESSAGE in mutations is called.')
        // bot to user
        if (payload.receiver === 'user') {
            for (let bot of state.bots) {
                if (bot.name === payload.sender) {
                    bot.messages.push({
                        content: payload.content,
                        sender: payload.sender,
                        receiver: payload.receiver,
                        time: payload.time,
                    })
                }
            }
            return
        }

        // user to bot
        for (let bot of state.bots) {
            if (bot.name === payload.receiver) {
                bot.messages.push({
                    content: payload.content,
                    sender: payload.sender,
                    receiver: payload.receiver,
                    time: payload.time,
                })
            }
        }

    },

    SET_CURRENT_BOT (state, value) {
        // console.log('SET_CURRENT_BOT in mutation is called.')
        state.currentBotIndex = value
    },

    // before the chat, use `bots.json` to load bot_name and init_prompt
    INIT_BOTS: function (state, value) {
        for (let bot_name in value) {
            console.log("bot_name",  bot_name)
            let init_prompt = value[bot_name].description
            //state.bots = [];
            state.bots.push({
                name: value[bot_name].name,
                model: value[bot_name].model,
                avatar: 'assets/' + Math.floor(Math.random() * 10) + '.png',
                init_prompt: init_prompt,
                readme: value[bot_name].readme,
                messages: []
            })
        }
        //console.log("init bots are: ",state.bots[0].model)
        // before chat to the bot, send the init_prompt to the bot
        for (let bot of state.bots) {
            //console.log('send init prompt to ', bot.name)
            // user send init prompts of all bots
            this.commit('SEND_MESSAGE', {
                content: bot.init_prompt,
                sender: bot.name,
                receiver: 'user',
                time: util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss')
            })
        }
    }
}


// Storing data
const state = {
    user:localStorage.getItem('user'),
    token:localStorage.getItem('token'),
    currentBotIndex: 0,
    bots: [],
}
// Create and export Store
export default new Vuex.Store({
    actions: actions,
    mutations: mutations,
    state: state
})

