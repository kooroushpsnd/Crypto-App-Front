<template>
    <form id="startup" method="POST" @submit.prevent v-if="error.length == 0">
        <label>Name:</label>
        <input type="text" required v-model="name">
        <label>Email:</label>
        <input type="email" required v-model="email">
        <label>Password:</label>
        <input type="password" required v-model="password">
        <label>PasswordConfirm:</label>
        <input type="password" required v-model="passwordConfirm">

        <div class="submit">
            <button class="create" @click="signup">Create an Account</button>
        </div>
    </form>
    <div class="error" v-if="error.length > 0">{{ error }}</div>
</template>
  
<script>
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
    data(){
        return{
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            error: ''
        }
    },
    methods:{
        async signup(){
            try {
                const response = await axios.post('http://localhost:3000/users/signup', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    passwordConfirm: this.passwordConfirm
                });

                if(response.status === 201) {
                    const token = response.data.token;
                    const _id = response.data.data._id
                    localStorage.setItem('token', token);
                    localStorage.setItem('name' ,this.name)
                    localStorage.setItem('email' ,this.email)
                    localStorage.setItem('_id' , _id)
                    this.$router.push('/')
                }
            }
            catch(err){
                this.error = err.message
            }
        }
    }
})
</script>
  
<style>
    #startup{
        max-width: 420px;
        margin: 30px auto;
        background-color: white;
        text-align: left;
        padding: 40px;
        border-radius: 10px;
    }
    label{
        color: #aaa;
        display: inline-block;
        margin: 25px 0 15px;
        font-size: 0.6em;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: bold;
    }
    input{
        display: block;
        padding: 10px 6px;
        width: 100%;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #ddd;
        color: #555;
    }
    .create {
        background: #0b6dff;
        border: 0;
        padding: 10px 20px;
        margin-top: 20px;
        color: white;
        border-radius: 20px;
    }
    .submit {
        text-align: center;
    }
    .error{
        display: flex;
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
        background: #0b6dff;
        border: 0;
        padding: 10px 20px;
        margin-top: 20px;
        color: white;
        border-radius: 20px;
        max-width: 420px;
    }
</style>