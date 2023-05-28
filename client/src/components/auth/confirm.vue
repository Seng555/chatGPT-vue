<template>
  <div class="login">
    <div class="login-form">
      <h2 class="login-title">Confirm</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Code 6 digit from E-mail:</label>
          <input type="text" id="username" v-model="code" :class="{'is-invalid': submitted && !code}" />
          <div v-if="submitted && !code" class="invalid-feedback">Code is required</div>
        </div>
        <div class="form-group">
          <div v-if="submitted && errMass.length" class="invalid-feedback">{{ errMass }}</div>
        </div>
        <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
          <div class="loading-icon" v-if="isLoading"></div>
          <span v-else>Confirm</span> 
        </button>
      </form>
      <p class="login-register">Don't have an account? <router-link :to="{ name: 'Register' }">Register here</router-link></p>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name:'LoginPage',
  data() {
    return {
      code: '',
      submitted: false,
      isLoading: false,
      errMass: "",
      token:""
    }
  },
  methods: {
   async handleSubmit() {
      this.submitted = true
      if (!this.code) {
        return
      }
      const response =  await this.$store.dispatch('confirm', {
        token: this.token, code: this.code
      });
      if(response.status == 200) {
        //console.log("response444", response.data)
        this.submitted = false;
        this.errMass = ""
        this.isLoading = false;
        Toast(response.data.mss);
        setTimeout(() => {
          this.$router.push(`/auth/login`)
        }, 1000)
      }else{
        this.errMass = response.data.mss || "Request error!, Please try again"
        this.isLoading = true;
        this.isLoading = false;
        Toast(this.errMass);
        //setTimeout(() => {})
      }
      
      // handle login logic here
    }
  },
  computed: {
  },
  mounted() {
    // Get the query parameters from the current URL
    const queryParams = this.$route.query
    if(!queryParams.token){
      this.$router.push(`/auth/login`)
    }
    this.token = queryParams.token
    //console.log("queryParams", this.token )
  }
}
</script>

<style scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-form {
  max-width: 400px;
  width: 100%;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-title {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.btn-primary {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn-primary:hover {
  background-color: #0069d9;
}

.invalid-feedback {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.login-register {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
}

.loading-icon {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #3498db;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    animation: spin 1s linear infinite;
    justify-content: center;
    align-items: center;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
