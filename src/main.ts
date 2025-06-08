import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// require('dotenv').config();
// import express from 'express';
// const expressApp = express();
//
// import Spotify from 'spotify-api-node';
//


const app = createApp(App)

app.use(router)

app.mount('#app')
