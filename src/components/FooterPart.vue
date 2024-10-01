<template>
    <div class="footer">
      <div class="content">
        <span class="Topic">Creator</span> = <span class="name">{{ name }}</span>
      </div>
      <div class="content">
        <span class="Topic">GitHub</span> = <a :href="url">{{ github }}</a>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent ({
    name: "Footer",
    data(){
        return{
            name: "Kooroush Pasandideh",
            github: "kooroushpsnd",
            url: 'https://github.com/kooroushpsnd/Crypto-App-front'
        }
    }
  })
  </script>
  
  <style scoped>
    .footer {
      display: flex;
      margin-top: auto;
      margin-bottom: 1px;
      color: #242222;
      font-size: 25px;
    }
  
    .content {
      border: 2px solid black;
      background-color: #7699f0;
      padding: 20px;
      border-radius: 20px;
      width: 50%;
    }
    .Topic{
      font-weight: bold;
      color: #1f50ce;
    }
  
    .content a {
      color: #000000;
      text-decoration: none;
    }
    .content a:hover{
        color: rgb(255, 255, 255);
    }
  </style>