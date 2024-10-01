<template>
    <div class="users" v-for="user in userss" :key="user.id">
        <div class="user">
            <div id="id"><span>id :</span> {{ user._id }}</div>
            <div id="name"><span>Name :</span> {{ user.name }}</div>
            <div id="email"><span>Email :</span> {{ user.email }}</div>
            <div id="role"><span>role :</span> {{ user.role }}</div>
        </div>
    </div>
    <div class="error" v-if="error.length > 0">{{ error }}</div>
</template>

<script>
import axios from 'axios';
import { getRole } from '../../utils/functions';

export default {
    name:"UserControllPage",
    data(){
        return{
            userss: [],
            error: ''
        }
    },
    async beforeRouteEnter(){
        await getRole(localStorage.getItem('token'))
    },
    async mounted(){
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get('http://localhost:3000/users' ,{
                headers : {Authorization : `Bearer ${token}`}
            });

            if(response.status === 200) {
                const users = response.data.data
                this.userss = {...users.users}
            }}
            catch(err){
                this.error = err.message
            }
        }
}
</script>

<style>
.users{
    display: inline-block;
    margin: 10px;
}
.user{
    background-color: #3A6FF8;
    margin-top: 30px;
    font-size: 25px;
    border: 2px solid rgb(0, 0, 0);
    border-radius: 10px;
    padding: 20px;
    color: aliceblue;
}
span {
   font-weight: bold;
   color: black;
}
</style>