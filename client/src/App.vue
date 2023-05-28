<template>
    <div>
        <div class="hamburger" :class="{ 'is-active': menuOpen }" @click="menuOpen = !menuOpen">
            <img src="/assets/userun.png" class="bot-avatar" alt="User Icon" />
            <!-- <span></span>
        <span></span>
        <span></span>-->
        </div>
        <div class="menu" :class="{ 'is-active': menuOpen }">
        <h3 class="Bots_ListH">Profile</h3>
        <ul v-if="user" style="padding: 20px;">
          <li><a href="#">Profile</a></li>
          <li><a href="#">Logout</a></li>
        </ul>
        <ul v-else style="padding: 20px;">
          <li>
            <router-link to="/auth/login">Login</router-link>
          </li>
        </ul>
        <h3 class="Bots_ListH">Bots List</h3>
        <ul style="padding: 20px;">
            <li v-for="(bot, index) in bots" :key="index"
               :class="{current: currentBotIndex === index}"
                @click="selectBot(index)">
                <div class="bot-avatar">
                    <img :src="bot.avatar" alt="bot avatar"/>
                    <h6 style="white-space: nowrap; color:beige;">{{ bot.name }}</h6>
                </div>
            </li>
        </ul>
      </div>
      <router-view/>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Header',
    components: {
         //UserDropdown
    },
    data() {
        return {
            user: null,
            content: '',
            records: [], // chat record
            //typedText: ''
            currentBotIndex: 0,
            bots: [],
            menuOpen: false,
            userOpen: true
        }
    },
    computed: {
    },
    mounted: async function () {
        //await this.$store.dispatch('fetchBots');
        this.user = this.$store.state.user;
        this.bots = this.$store.state.bots;
        this.currentBotIndex = this.$store.state.currentBotIndex
        
    },
    methods: {
        selectBot (index) {
            console.log("index", index)
            //this.$store.commit('SET_CURRENT_BOT', index)
        }
    },
}
</script>

<style scoped>
.Bots_ListH{
    color: #e4e4e4;
}
/* Styling for the hamburger icon */
.hamburger {
    position: fixed;
    top: 15px;
    right: 36px;
    display:block;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 24px;
    cursor: pointer;
    z-index: 100;
  }
  
  .hamburger span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: #696969;
    transition: all 0.3s ease-in-out;
  }
  
  .hamburger.is-active span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  
  .hamburger.is-active span:nth-child(2) {
    opacity: 0;
  }
  
  .hamburger.is-active span:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
  
  /* Styling for the menu */
  .menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
    background-color: #404258;
    padding: 2.5em;
    transition: transform 0.3s ease-in-out;
    transform: translateX(100%);
    z-index: 99;
  }
  
  .menu.is-active {
    transform: translateX(0);
  }
  
  .menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .menu li {
    margin-bottom: 1em;
  }
  
  .menu a {
    color: #e4e4e4;
    text-decoration: none;
  }
.bot-avatar {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
}
.bot-avatar img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    float: left;
    border-radius: 100%;
    margin-right: 10px;
}
.menu li.current {
    background-color: #2B3A55;
}
@media screen and (max-width:768px) {
    .top{
        left: 0%
    }
    /*.hamburger{
        display: flex;
    }*/
}
</style>
