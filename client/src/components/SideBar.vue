<template>
    <div class="sidebar">
        <h2 class="Bots_ListH">Bots List</h2>
        <ul class="bot-list">
            <li v-for="(bot, index) in bots" :key="index"
                :class="{current: currentBotIndex === index}"
                @click="selectBot(index)">
                <div class="bot-avatar">
                    <img :src="bot.avatar" alt="bot avatar"/>
                    <h6 style="white-space: nowrap; color:beige;">{{ bot.name }}</h6>
                </div>
                <div class="bot-info">
                    <p class="last-message">{{ bot.readme }}</p>
                    <p class="chat-time">{{ bot.messages[bot.messages.length - 1].time }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'SideBar',
    computed: {
        bots () {
            return this.$store.state.bots
        },
        currentBotIndex () {
            return this.$store.state.currentBotIndex
        }
    },
    methods: {
        selectBot (index) {
            this.$store.commit('SET_CURRENT_BOT', index)
        },
    },
    // before the chat, use `bots.json` to load bot_name and init_prompt
    
}
</script>

<style scoped>
.Bots_ListH{
    color:#e6e6e6;
}
.sidebar {
    position: absolute;
    width: 20%;
    background-color: #404258;
    top: 0;
    left: 0;
    height: 100%;
    overflow-y: auto;
}
.bot-list {
    list-style: none;
    margin: 0;
    padding: 5px;
    height: 100%; /* adjust this value to fit your layout */
    overflow-y: auto;
    background-color: #6B728E;
}

.sidebar h2 {
    margin-top: 0;
}
.sidebar li {
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
}
.sidebar li.current {
    background-color: #2B3A55;
}
.bot-avatar {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.bot-avatar img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    float: left;
    border-radius: 100%;
    margin-right: 10px;
}
.bot-info {
    flex: 1;
}
.bot-info h3 {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
}

.last-message {
    font-size: 14px;
    margin: 5px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color:#e6e6e6;
}

.chat-time {
    font-size: 12px;
    color: #888;
    margin: 0;
}
@media screen and (max-width:768px) {
    .sidebar{
        display: none;
    }
}
</style>
