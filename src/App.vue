<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <VListItem>
        <VListItemContent>
          <VListItemTitle>
            Kooroush Pasandideh
          </VListItemTitle>
        </VListItemContent>
      </VListItem>
      <v-divider></v-divider>
      <VList density="compact">
      <VListItem
        v-for="(item, i) in filteredItems"
        :key="i"
        :value="item"
        :to="item.link"
        color="primary"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <VListItemTitle v-text="item.title"></VListItemTitle>
      </VListItem>
    </VList>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title class="font-weight-bold">Crypto World</v-app-bar-title>

      <v-btn icon @click="changeTheme">
        <v-icon :icon="darktheme?'mdi-weather-night':'mdi-weather-sunny'"></v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-expand-x-transition>
        <router-view></router-view>
      </v-expand-x-transition>
    </v-main>
  </v-app>
</template>

<script>
import { useTheme } from 'vuetify/lib/framework.mjs';

export default {
  data(){
    return{
      user: {
        loggedIn: Boolean(localStorage.getItem('token')),
        role: localStorage.getItem('role')
      },
      drawer: null,
      items: [
        { title: 'Home' ,icon: 'mdi-home' ,link: "/" },
        { title: 'Registration' ,icon: 'mdi-account' ,link: "/signup" ,requiresGuest: true},
        { title: 'Profile' ,icon: 'mdi-login' ,link: "/profile" ,requiresLogged: true},
        { title: 'Add Crypto' ,icon: 'mdi-note-plus' ,link: "/add-crypto" ,requiresAdmin: true},
        { title: 'Remove Crypto' ,icon: 'mdi-note-remove' ,link: "/remove-crypto" ,requiresAdmin: true},
        { title: 'All Users' ,icon: 'mdi-circle' ,link: "/all-users" ,requiresAdmin: true},
        { title: 'About', icon: 'mdi-help-box' ,link: "/about"},
      ],
      darktheme: true,
      theme: useTheme()
    }
  },
  methods: {
    changeTheme(){
      this.darktheme = !this.darktheme
      this.theme.global.name = this.darktheme ? "light":"dark"
    }
  },
  computed: {
    filteredItems(){
      return this.items.filter((item) => {
        if(item.requiresAdmin && this.user.role !== 'admin'){
          return false
        }
        if(item.requiresGuest && this.user.loggedIn){
          return false
        }
        if(item.requiresLogged && !this.user.loggedIn){
          return false
        }
        return true
      })
    }
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}
body {
  background: #30353F;
}


</style>
