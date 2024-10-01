<template>
  <div id="all">
    <HeaderPart :showauth="auth" />
    <MainPart :showauth="admin"/>
    <FooterPart />
  </div>
</template>

<script>
import { getRole } from "../../utils/functions"
import FooterPart from '../components/FooterPart.vue';
import HeaderPart from '../components/HeaderPart.vue';
import MainPart from '../components/MainPart.vue';


export default {
  name: 'HomeView',
  components: {HeaderPart ,MainPart ,FooterPart},
  data(){
    return{
      auth: true,
      admin: false
    }
  },
  async beforeMount(){
    const loggedIn = localStorage.getItem('token')
    const isAdmin = localStorage.getItem('role')
    if(loggedIn){
      this.auth = false
      await getRole(loggedIn)
    }
    if(isAdmin == 'admin'){
      this.admin = true
    }
  }
}
</script>

<style>
#all {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
