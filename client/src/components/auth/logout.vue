<template>
    <dev>

    </dev>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    name: 'LogOut',
    data() {
        return {
            name: "",
        }
    },
   async mounted() {
       const logot =  await this.$store.dispatch('logout')
       if(logot){
        Toast("Logged out successfully");
        setTimeout(() => {
            window.location = "/auth/login"
        },1500)
          
       }else{
          Toast("Something went wrong, please try again");
       }
        
  }


}
</script>