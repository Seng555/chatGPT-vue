<template>
    <div class="app">
        <SideBar></SideBar>
        <ChatList></ChatList>
    </div>
</template>

<script>

import SideBar from '@/components/SideBar.vue'
import ChatList from '@/components/ChatList.vue'

export default {
    name: 'app',
    components: {
    ChatList,
       SideBar
    }
}
</script>

<style>
*{
    padding: 0;
    margin: 0;
}
body{
    font-family: 'Roboto','Noto Sans Lao', sans-serif;
}
.app {
    display: flex;
    padding: 0;
    height: 100vh;
    background-color: #474E68;
    justify-content: space-around;
}



@media screen and (max-width:768px) {
    .app{
        flex-direction: column;
    }
}
</style>
