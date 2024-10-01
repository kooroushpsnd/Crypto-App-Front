<template>
<div id="header">
    <div class="button auth" v-if="!showauth" @click="profile">
        My Profile
    </div>
    <div class="button" v-if="showauth">
        <a href="/signup" class="auth">SignUp</a>
    </div>
    <div class="content">
        <span class="logo"><ion-icon size="large" name="diamond-outline"></ion-icon></span>
        <p class="welcome">Welcome To {{ name }}</p>
        <span class="logo"><ion-icon size="large" name="diamond-outline"></ion-icon></span>
    </div>
    <div class="button" v-if="showauth">
        <a href="/login" class="auth">Login</a>
    </div>
    <div class="button auth" v-if="!showauth" @click="signout">
        Signout
    </div>
</div>
</template>
  
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    data(){
        return{
            name: "Crypto World"
        }
    },
    props:['showauth'],
    methods: {
        signout(){
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            localStorage.removeItem('name')
            localStorage.removeItem('email')
            window.location.reload()
        },
        profile(){
            this.$router.push('/profile')
        }
    }
})
</script>
  
<style scoped>
#header{
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    font-size: 20px;
    color: #f6efd1;
    align-items: center;
}

.button{
    background-color:#7699f0;
    height: 60px;
    border-radius: 20px;
    width: 7%;
    align-content: center;
    margin-right: 5px;
    border: 2px solid rgb(10, 10, 10);
}

.auth{
    color:#f6efd1;
    text-decoration: none;
}
.auth:hover{
    color: #000000;
    cursor: pointer;
}
.content{
    display: flex;
    justify-content: center;
    background-color:#7699f0;
    width: 40%;
    height: 60px;
    border-radius: 20px;
    border: 2px solid rgb(10, 10, 10);
    margin-left: auto;
    margin-right: auto;
}
.welcome {
    margin-right:10px;
    margin-left: 10px;
}
.logo{
    top:15px;
    position: relative;
    color: rgb(0, 0, 0);
}
</style>