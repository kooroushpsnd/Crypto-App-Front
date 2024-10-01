<template>
    <form id="startup" @submit.prevent="login" v-if="error.length == 0">
        <label>Email:</label>
        <input type="email" required v-model="email">
        <label>Password:</label>
        <input type="password" required v-model="password">
        
        <div class="submit">
            <button class="create">Create an Account</button>
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
            email: '',
            password: '',
            error: ""
        }
    },
    methods: {
        async login(){
            try {
                const response = await axios.post('http://localhost:3000/users/login', {
                    email: this.email,
                    password: this.password
                });

                if(response.status === 200) {
                    const token = response.data.token;
                    localStorage.setItem('token', token);
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
    
</style>