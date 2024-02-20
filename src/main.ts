import { createApp } from 'vue'
import App from './App.vue'
import Phone from './components/Phone.vue'

import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.js'

const app = createApp(App)

app.use(bootstrap)
app.component('Phone', Phone)
app.mount('#app')


// import router from './router'

// const app = createApp(App)

// app.use(router)
// app.mount('#app')
// Vue.use(BootstrapVue)