<template>
  <v-container>
        <v-row>
          <v-col
            v-for="n in crypto"
            :key="n"
            cols="4"
          >
            <v-card id="cryptoContainer" height="70">
              <div><img :src="n.image ? `http://localhost:3000/uploads/${n.image}` : 'http://localhost:3000/uploads/CRYPTO.png'" alt="Crypto"></div>
              <div class="mt-2">
                <span class="details"><span class="detail">Name</span>: {{ n.name }}</span>
                <span class="details"><span class="detail">Price</span>: {{ n.price }}</span>
              </div>
            </v-card>
          </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { io } from 'socket.io-client';

export default {
  name: 'HomeView',
  data(){
    return{
      crypto: []
    }
  },
  async mounted(){
    const socket = io("http://localhost:3000")

    socket.on("connect" ,() => {
      console.log("connected")
    })

    socket.on("cryptoData" ,(data) => {
      if(data !== "fail"){
        this.crypto = data
      }
    })
  }
}
</script>

<style>
img{
  height: 50px;
  margin-top: 7px;
}
#cryptoContainer{
  display: flex;
  justify-content: space-around;
  text-align: left;
  box-shadow: 5px 5px 10px gray;
}

.details{
  display: block;
}
.detail{
  font-weight: bold;
}
</style>
