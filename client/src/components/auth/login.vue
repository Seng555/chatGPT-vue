<template>
  <div class="login">
    <div class="login-form">
      <h2 class="login-title">Login</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">E-mail:</label>
          <input type="text" id="username" v-model="username" :class="{ 'is-invalid': submitted && !username }" />
          <div v-if="submitted && !username" class="invalid-feedback">Email is required</div>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" :class="{ 'is-invalid': submitted && !password }" />
          <div v-if="submitted && !password" class="invalid-feedback">Password is required</div>
        </div>
        <div class="form-group">
          <div v-if="submitted && errMss.length" class="invalid-feedback">{{ errMss }}</div>
        </div>
        <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
          <div class="loading-icon" v-if="isLoading"></div>
          <span v-else>Login</span>
        </button>
      </form>
      <p class="login-register">Don't have an account? <router-link :to="{ name: 'Register' }">Register here</router-link></p>
      <p class="login-register"><router-link :to="{ name: 'Home' }">Home</router-link></p>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      submitted: false,
      isLoading: false,
      errMss: ""
    }
  },
  methods: {
    async handleSubmit() {
      this.submitted = true
      if (!this.username || !this.password) {
        return
      }
      //console.log("this.isValidEmail", this.isValidEmail)
      if (!this.isValidEmail) {
        this.errMass = "Please enter a valid email";
        return
      }

      const response = await this.$store.dispatch('login', {
        email: this.username, password: this.password
      });
      //console.log("response.status", response.status)
      if (response.status == 200) {
        //console.log("response444", response.data)
        this.submitted = false;
        this.errMss = ""
        this.isLoading = false;
        await this.$store.dispatch('saveToken', {
          token: response.data.data.token,
          user:  response.data.data.user
        });
        Toast(response.data.mss);
        setTimeout(() => {
            //this.$router.push(`/`)
            window.location = "/";
          }, 1000)
      } else {
        this.errMss = response.data.mss || "Request error!, Please try again"
        this.isLoading = false;
        Toast(this.errMss);
        //setTimeout(() => {})
      }

      // handle login logic here
    }
  },
  computed: {
    isValidEmail() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.username)
    }
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
