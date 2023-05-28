import axios from 'axios';
import { config } from '../config/index'

const AxiosMixin = {
  created() {
    this.axios = axios.create({
      // Set up axios options here, such as a base URL
      baseURL: config.BASE_URL,
    });
  },
};

const VueAxios = {
  install(Vue) {
    Vue.mixin(AxiosMixin);
  },
};

export default VueAxios;