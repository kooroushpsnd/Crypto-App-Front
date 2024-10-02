<template>
  <div class="content">
    <div class="data" v-for="data in crypto" :key="data.name">
      <div class="image" ><img :src="getImage(data.name)" alt="crypto image"></div>
      <span id="name">{{ data.name }}</span> : <span id="price">{{ Math.floor(data.price) }} Tooman</span>
      <button class="add" v-if="showauth" @click="removeCrypto(data.name)">-</button>
    </div>
    <form class="data" v-if="showauth" @submit.prevent>
      <input type="text" required v-model="name">
      <button class="add" @click="addCrypto">+</button>
    </form>
  </div>
</template>
  
<script>
import axios from 'axios';
import { io } from 'socket.io-client';
import { defineComponent } from 'vue';

export default defineComponent ({
  name : "Main",
  props:['showauth'],
  data(){
    return{
      crypto : [],
      name: ''
    }
  },
  mounted(){
    const socket = io('http://localhost:3000')

    socket.on("connect" ,() => {
      console.log("connected")
    })

    socket.on("cryptoData" ,(data) => {
      if(data !== "fail"){
        this.crypto = data
      }
    })
  },
  methods: {
    getImage(CryptoName){
      try{
        return require(`../assets/${CryptoName}.png`)
      }catch(err){
        return require(`../assets/BTC.png`)
      }
    },
    async addCrypto(){
      try{
        const response = await axios.post('http://localhost:3000/crypto' ,{name: this.name} ,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if(response.status == 201){
        this.crypto.push(response.data.crypto)
        window.location.reload()
      }
      }catch(err){
        console.log(err)
      }
    },
    async removeCrypto(CryptoName){
      try{
        const response = await axios.delete(`http://localhost:3000/crypto/${CryptoName}` ,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if(response.status == 204){
        window.location.reload()
      }
      }catch(err){
          console.log(err)
      }
    }
  }
})
</script>
  
<style scoped>
.content{
  display: flex;
  gap: 10px;
  margin-top: 180px;
  justify-content: center;
  flex-wrap: wrap;
}
.data {
  background-color: #3A6FF8;
  font-size: 30px;
  border: 2px solid rgb(0, 0, 0);
  border-radius: 10px;
  height: 40px;
  padding: 20px;
  display: inline-flex;
  align-items: center;
}

#name {
  font-weight: bold;
}

#price {
  color: #f6efd1;
}

img {
  widows: 50px;
  height: 50px;
}

.image{
  margin-right: 10px;
  display: inline-flex;
}

.add{
  cursor: pointer;
  color: rgb(255, 255, 255);
  margin-left: 15px;
  background-color: rgb(0, 0, 0);
  border-radius: 15px;
  width: 35px;
  height: 35px;
  font-size: 23px;
  align-content: center;
  justify-content: center;
}
input{
  border-radius: 20px;
  border: 2px solid black;
}
</style>