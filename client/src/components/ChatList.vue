<template>
    <div>
        <Header></Header>
        <section ref="messagesRef" class="chatList">
            <div class="reame-infos">
                <h1 style="font-size: 2.5rem; color: #fff; text-align: center;">I'm Updoun</h1>
                <p style="font-size: 1.2rem; line-height: 1.5; color: #fff;">Welcome to the Updoun bot from ChatGPT. this
                    bot can help anything you want to know, Everything is use for free now</p>
                <p style="font-size: 1.2rem; line-height: 1.5; color: #fff;">Develop by:</p>
                <pre style="background-color:  #fff;font-size: 2vw; border-radius: 5px; width: 50%; padding: 10px; box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);"><code style="font-size: 1rem;"><a href="https://www.facebook.com/LFXtrader" target="_blank">Seng55</a></code></pre>
                <p style="font-size: 1.2rem; line-height: 1.5; color: #fff;">If this can help you and please feed the coffee
                    to encourage the team to continue development</p>
                <p style="font-size: 1.2rem; line-height: 1.5; color: #fff;">ຖ້າສິ່ງນີ້ສາມາດຊ່ວຍທ່ານໄດ້ ແລະ ຖືກໃຈ
                    ລ້ຽງກາແຟເພື່ອເປັນກຳລັງໃຈໃຫ້ທິມງານພັດທະນາຕໍ່ໄປ</p>
                <pre
                    style="background-color: #fff; border-radius: 5px; width: 98%; padding: 10px; box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);"><code style="font-size: 1rem;">BCEL: 
    160-1200-00893089-001
    ERC20 Or BEP20: 
    0x283741ecaBd154a9315b20f530E3E9a87a629AdE</code></pre>
            </div>


            <ul ref="massList">
            </ul>

            <!--<ul>
                <div v-for="(message, index) in bots[currentBotIndex].messages" :key="index">
                    <li v-if="message.sender === 'user'" class="chat-user">
                        <div class="chat-img"><img src="assets/user.png"></div>
                        <div class="time"><cite>{{ message.sender }}<i>{{ message.time }}</i></cite></div>
                        <div class="chat-content" style="white-space: pre-wrap;" v-text="message.content"></div>
                    </li>
                    <li v-if="message.sender !== 'user'" class="chat-others">
                        <div class="chat-img"><img :src="bots[currentBotIndex].avatar"></div>
                        <div class="time"><cite>{{ message.sender }}<i>{{ message.time }}</i></cite></div>
                        <div class="chat-content" style="white-space: pre-wrap;" v-text="
                            animateText(message.content)
                        ">
                        </div>
                    </li>
                </div>
            </ul>-->
        </section>
        <!--<section class="loading-section" v-if="isLoading">
            <div>
                <div class="loading-icon"></div>
            </div>
        </section>-->
        <section class="foot">
            <!--<mt-field id="txtContent" v-model="content" class="con"   placeholder="Please enter your prompt...">
            </mt-field>-->
            <div class="input-wrapper">
                <input type="text" id="txtContent" ref="myInputRef" class="input-text" v-model="content"
                    @keydown.enter="sendMsg" placeholder="Please enter your prompt...">
            </div>
            <button class="btn btn-send" :disabled="isLoading" v-on:click="sendMsg">
                <div class="loading-icon" v-if="isLoading"></div>
                <!--<span v-if="!isLoading">Send</span>-->
                <img v-if="!isLoading" src="assets/send.png" alt="Image">
            </button>
        </section>
    </div>
</template>

<script>
import util from '../common/util'
import { Toast } from 'mint-ui'
//import axios from 'axios'
import Header from './Header.vue'

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'ChatList',
    components: {
        Header
    },
    data() {
        return {
            content: '',
            firstmss: false,
            records: [], // chat record
            //typedText: ''
            currentBotIndex: 0,
            bots: [],
            typedText: "",
            isLoading: false,
            incode: false,
            user: "",

        }
    },
    computed: {
    },
    methods: {
        sendMsg: async function () {
            // save user's message
            if (this.content == '') {
                Toast('Please enter your prompt.')
                return
            }
            if (this.isLoading) {
                return
            }
            this.isLoading = true;
            /*
            this.$store.commit('SEND_MESSAGE', {
                content: this.content,
                sender: 'user',
                receiver: this.bots[this.currentBotIndex].name,
                time: util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss')
            })
            */
            const user = this.user
            let name = "user"
            if (user) {
                name = user.name
            }
            //console.log("this.user", this.user)
            if (!this.firstmss) {
                let ul = this.$refs.massList;
                let div = document.createElement("div")
                div.id = Date.now()
                let li = document.createElement("li");
                li.className = "chat-user";
                li.innerHTML = `
                        <div class="chat-img"><img src="assets/user.png"></div>
                        <div class="time"><cite>${name}<i>${util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss')}</i></cite></div>
                        <div class="chat-content" style="white-space: pre-wrap;">${this.content}</div>
              `;
                div.appendChild(li)
                ul.appendChild(div);
            }
            // Make the dialog box go to the bottom
            // Maybe it is Duplicate
            this.$nextTick(() => {
                this.$refs.messagesRef.scrollTop = this.$refs.messagesRef.scrollHeight
            })
            // add user mss to record
            const UserData = {
                role: "user",
                content: this.content
            }

            this.records.push(UserData)  //[`${this.bots[this.currentBotIndex].model}`].push(UserData)
            // make a request to server
            //console.log("this.records", this.records)  
            const param = {
                'bot_model': this.bots[this.currentBotIndex].model,
                'content': this.records,
            }
            // Make a POST request to the API using axios
            this.axios.post('/chatgpt/get', param)
                .then(response => {
                    this.firstmss = false;
                    // Handle the response data
                    //console.log('New post created:', response.data);
                    const mss = response.data.data.mss.content
                    const id = response.data.data.created;
                    const allmss = response.data.data.allmss;
                    // add to all masses
                    const systemData =
                    {
                        role: "system",
                        content: mss
                    }

                    this.records.push(systemData)
                    this.setmsstoclient(id, mss, allmss)

                    //this.scrollToBottom();
                    //this.focusTxtContent();
                    /*
                    this.$store.commit('SEND_MESSAGE', {
                        content: answer,
                        sender: this.bots[this.currentBotIndex].name,
                        receiver: 'user',
                        time: util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss')
                    })*/
                })
                .catch((e) => {
                    this.isLoading = false;
                    console.log(e)
                    Toast('Something went wrong, please try again')
                    return
                });

            this.content = ''
        },
        setmsstoclient: async function (id, mss) {
            let ul = this.$refs.massList;
            let div = document.createElement("div");
            div.id = id;
            let li = document.createElement("li");
            li.className = "chat-others";
            li.innerHTML = `
                        <div class="chat-img"><img src="${this.bots[this.currentBotIndex].avatar}"></div>
                        <div class="time-other"><cite>${this.bots[this.currentBotIndex].name}<i>${util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss')}</i></cite></div>
                        <div class="chat-content chat-${id}" style="white-space: pre-wrap;">
                        
                        </div>
                    `;
            div.appendChild(li)
            ul.appendChild(div);

            /* <p>Hello</p>
                  <div class="code-box">
                          sdfiggg sdhfh dhsfgh
                  </div>*/

            const chat_content = document.getElementsByClassName("chat-" + id)[0];
            //console.log(chat_content.textContent)
            let index = 0
            const setInterID = await setInterval(() => {
                if (mss.length > 0) {
                    chat_content.textContent = mss.slice(0, index)
                }
                //console.log(chat_content.textContent)
                index += 1
                this.scrollToBottom();
                if (index > mss.length) {
                    this.isLoading = false;
                    clearInterval(setInterID);
                    //this.typedText = "";
                }
            }, 20)

            /* for (const ms of allmss) {
              
                 //console.log("Helllllllll")
                 if(ms == '```'){
                     if(this.incode){ this.incode = false}
                     else{
                         this.incode = true
                     }
                 }
 
                 if (this.incode) {
                     console.log("msssss Codessssss")
                     const div = document.createElement('div');
                     div.className = "code-box"
                     div.textContent = ms
                     chat_content.appendChild(div);
                     
                     /*const setInterID = await setInterval(() => {
                         if (ms.length > 0) {
                             div.textContent = ms.slice(0, index)
                         }
                         index += 1
                         if (index > ms.length) {
                             clearInterval(setInterID);
                             index = 0;
                             //this.typedText = "";
                         }
                     }, 20)
                     this.incode = false
                 } else {
                     //this.incode = false
                     console.log("msssss Notcodessssss")
                     const paragraph = document.createElement('p');
                     paragraph.textContent = ms
                     chat_content.appendChild(paragraph);
                     
                     /*const setInterID = await setInterval(() => {
                         if (ms.length > 0) {
                             paragraph.textContent = ms.slice(0, index)
                         }
                         index += 1
                        // console.log("sddddddddddddd", ms.length)
                         if (index > ms.length) {
                             clearInterval(setInterID);
                             index = 0;
                             //this.typedText = "";
                         }
                     }, 20)
 
                 }
             }*/

        },
        // focus the input box
        focusTxtContent: function () {
            document.querySelector('#txtContent').focus()
        },
        // Scroll bar scrolls to the bottom
        scrollToBottom: function () {
            // setTimeout(function () {
            const tempChatList = document.getElementsByClassName('chatList')[0]
            tempChatList.scrollTop = tempChatList.scrollHeight
            // }, 100)
        },
        addMessage() {
            //console.log("this.bots", this.bots)
            //console.log("this.bots[this.currentBotIndex]", this.bots[this.currentBotIndex].init_prompt)
            const infos = this.bots[this.currentBotIndex]
            const mss = infos.init_prompt;

            const ul = this.$refs.massList;
            const div = document.createElement("div")
            div.id = this.currentBotIndex
            const li = document.createElement("li");
            li.className = "chat-others";
            li.innerHTML = `
                <div class="chat-img"><img src="${infos.avatar}"></div>
                <div class="time-other"><cite>${infos.name}<i>${util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss')}</i></cite></div>
                <div class="chat-content chat-${this.currentBotIndex}"  style="white-space: pre-wrap;"></div>
              `;
            div.appendChild(li)
            ul.appendChild(div);

            // <code class="code"></code>

            const chat_content = document.getElementsByClassName("chat-" + this.currentBotIndex)[0];
            //console.log(chat_content.textContent)
            let index = 0
            const setInterID = setInterval(() => {
                if (mss.length > 0) {
                    chat_content.textContent = mss.slice(0, index)
                }
                //console.log(chat_content.textContent)
                index += 1
                if (index > mss.length) {
                    clearInterval(setInterID);
                    //this.typedText = "";
                }
            }, 32)


        }

    },
    mounted: async function () {
        //console.log("this.$store.state.bots", this.$store.state.token)
        this.user = JSON.parse(await this.$store.state.user);
        this.$refs.myInputRef.focus();
        await this.$store.dispatch('fetchBots');
        this.bots = this.$store.state.bots;
        this.currentBotIndex = this.$store.state.currentBotIndex;
        //this.scrollToBottom()
        this.focusTxtContent()
        await this.addMessage()
        //this.sendMsg()
    }
}
</script>
<style>
.chatList {
    position: absolute;
    top: 48px;
    bottom: 48px;
    left: 17%;
    right: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 20px;
}

.chatList ul {
    min-height: 300px;
}

.chatList ul .chat-user {
    text-align: right;
    padding-left: 0;
    padding-right: 60px;
}

.chatList ul .chat-others {
    text-align: left;
    padding-left: 60px;
    padding-right: 0;
}

.chatList ul li {
    position: relative;
    margin-bottom: 10px;
    padding-left: 60px;
    min-height: 68px;
    list-style-type: none;
}

.chat-user .chat-img {
    left: auto;
    right: 3px;
}

.chat-others .chat-img {
    left: 40px;
    right: auto;
}

.chat-img {
    position: absolute;
    left: 40px;
}

.chat-content,
.chat-img {
    display: inline-block;
    vertical-align: top;
    /*font-size: 14px;*/
}

.chat-img img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
}

.time-other {
    margin-left: 30px;
}

.time {
    width: 100%;
}

cite {
    left: auto;
    right: 60px;
    text-align: right;
}

cite {
    font-style: normal;
    line-height: 24px;
    font-size: 12px;
    white-space: nowrap;
    color: #999;
    text-align: left;
}

cite i {
    font-style: normal;
    padding-left: 5px;
    padding-right: 5px;
    font-size: 12px;
}

.chat-user .chat-content {
    margin-left: 0;
    text-align: left;
    background-color: #5a5a5a;
    color: #fff;
}

.chat-others .chat-content {
    margin-left: 20px;
    text-align: left;
    background-color: #2b323c;
    /*background-color: #2b323c;*/
    color: #fff;
}

.chat-content {
    position: relative;
    line-height: 22px;
    /*margin-top: 25px;*/
    padding: 10px 15px;
    background-color: #eee;
    border-radius: 3px;
    color: #333;
    word-break: break-all;
    max-width: 462px \9;
}

.chat-content,
.chat-img {
    display: inline-block;
    vertical-align: top;
    font-size: 18px;
}

.chat-content img {
    max-width: 100%;
    vertical-align: middle;
}

/*.chat-img {
    position: absolute;
    left: 3px;
}*/

.chat-content:after {
    content: '';
    position: absolute;
    left: -10px;
    top: 15px;
    width: 0;
    height: 0;
    border-style: solid dashed dashed;
    border-color: #eee transparent transparent;
    overflow: hidden;
    border-width: 10px;
}

.chat-user .chat-content:after {
    left: auto;
    right: -10px;
    border-top-color: #33DF83;
}

.chat-others .chat-content:after {
    left: -10px;
    right: auto;
    border-top-color: #33DF83;
}

.input-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.foot {
    width: 80%;
    min-height: 48px;
    position: fixed;
    bottom: 2%;
    right: 0px;
    background-color: transparent;
    color: #ffffff;
}

.input-text {
    width: 90%;
    min-height: 40px;
    position: fixed;
    bottom: 2%;
    background-color: #555;
    color: #ffffff;
    font-family: 'Roboto', 'Noto Sans Lao', sans-serif;
}

.input-text::placeholder {
    color: #cccccc;
    /* set the color of the placeholder text */
}

.foot .input-text {
    position: absolute;
    right: 0px;
    padding: 5px;
    border: none;
    border-radius: 25px;
    box-shadow: 1px 0 0 1px #eee transparent transparent;
    font-size: 16px;
    color: #ffffff;
    background-color: #eee transparent transparent;
}

.btn {
    display: inline-block;
    /* vertical-align:middle;*/
    font-size: 30px;
    line-height: 20px;
    margin-left: 5px;
    padding: 0 6px;
    background-color: #474E68;
    color: #fff;
    border-radius: 1px;
    font-family: 'Roboto', 'Noto Sans Lao', sans-serif;
}

.btn-send {
    position: absolute;
    right: 10px;
    padding: 3px;
    border: none;
    border-radius: 15px;
    box-shadow: 0 0 0 2px #ddd;
    font-size: 16px;
    color: rgb(255, 255, 255);

}

.code-box {
    background-color: #000000;
    padding: 10px;
}

.loading-section {
    position: absolute;
    top: 50%;
    bottom: 0;
    left: 50%;
    right: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 20px;
}

.loading-icon {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #3498db;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    animation: spin 1s linear infinite;
    justify-content: center;
    align-items: center;
}

.reame-infos {
    background-color: rgb(55, 54, 54);
    left: 5%;
    position: relative;
    width: 90%;
    border-radius: 10px;
    padding: 20px;
    box-shadow: rgba(227, 225, 225, 0.5) 0px 0px 10px 0px;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@media screen and (max-width:768px) {
    .chatList {
        left: 0%
    }

    .chat-others {
        padding-left: 0px;
    }

    .chat-img {
        left: 0px;
    }

    .foot {
        width: 100%;
    }
    .reame-infos{
        left: 0%;
    }
}</style>
