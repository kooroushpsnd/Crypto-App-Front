<template>
    <div class="box">
        <div class="profile1">
            <div class="info"><span>Name :</span> {{ name }}</div>
            <div class="info"><span>Email :</span> {{ email }}</div>
            <div class="info"><span>Role :</span> {{ role }}</div>
        </div>
        <div class="profile2">
            <button class="mydata" @click="this.value = 'forgot'">Forgot password</button>
            <button class="mydata" @click="this.value = 'reset'">Reset password</button>
            <button class="mydata" @click="this.value = 'update'">Update My Info</button>
        </div>
        <div class="profile1" v-if="value == 'update'">
            <form id="update" @submit.prevent>
                <label>Name :</label>
                <input type="text" v-model="newName">
                <label>Email :</label>
                <input type="email" v-model="newEmail">

                <div class="submit">
                    <button class="create" @click="update">Submit</button>
                </div>
            </form>
        </div>
        <div class="profile1" v-if="value == 'reset'">
            <form id="update" @submit.prevent>
                <label>Password :</label>
                <input type="password" v-model="password" required>
                <label>PasswordConfirm :</label>
                <input type="password" v-model="passwordConfirm" required>
                <label>Token :</label>
                <input type="text" v-model="resetToken" required>

                <div class="submit">
                    <button class="create" @click="reset">Submit</button>
                </div>
            </form>
        </div>
        <div class="profile1" v-if="value == 'forgot'">
            <form id="update" @submit.prevent>
                <label>Email :</label>
                <input type="email" v-model="newEmail">

                <div class="submit">
                    <button class="create" @click="forgot">Submit</button>
                </div>
            </form>
        </div>
        <div class="error" v-if="error.length > 0">{{ error }}</div>
    </div>
</template>

<script>
import axios from 'axios';
import { getRole } from '../../utils/functions'
export default {
    name: "Profile",
    data(){
        return{
            name: '',
            newName: '',
            email: '',
            newEmail: '',
            role: '',
            value: '',
            password: '',
            passwordConfirm: '',
            error: '',
            resetToken: ''
        }
    },
    async beforeMount(){
        await getRole(localStorage.getItem('token'))
        this.name = localStorage.getItem('name')
        this.email = localStorage.getItem('email')
        this.role = localStorage.getItem('role')
    },
    methods: {
        async update(){
            const body = {}
            if (this.newName.length > 0) body["name"] = this.newName
            if (this.newEmail.length > 0) body["email"] = this.newEmail
            try{
                const response = await axios.patch(`http://localhost:3000/users/updateMe` ,body ,{
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
                })
                if (response.status == 200){
                    window.location.reload()
                }
            }catch(err){
                this.error = err.message
            }
        },
        async reset(){
            const body = {}
            if (this.password.length > 0 && this.passwordConfirm.length > 0){
                body['password'] = this.password
                body['passwordConfirm'] = this.passwordConfirm
            }
            try{
                const response = await axios.patch(`http://localhost:3000/users/resetPassword/:${this.resetToken}` ,body)
                if (response.status == 200){
                    window.location.reload()
                    alert("password has changed")
                }
            }catch(err){
                this.error = err.message
            }
        },
        async forgot(){
            const body = {}
            if (this.newEmail.length > 0) body["email"] = this.newEmail
            try{
                const response = await axios.post(`http://localhost:3000/users/forgotPassword` ,body)
                if (response.status == 200){
                    window.location.reload()
                    alert("check your Email address and use the Token for reseting your password")
                }
            }catch(err){
                this.error = err.message
            }
        }
    }
}
</script>

<style>
#update{
    max-width: 420px;
    margin: 30px auto;
    background-color: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
}
.profile2{
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 20px;
    background-color: #3A6FF8; ;
    display: flex;
    padding: 20px;
    border: 2px solid rgb(0, 0, 0);
    justify-content: space-between;
    color: white;
}
.mydata{
    background-color: white;
    border: 1px solid black;
    border-radius: 20px;
    padding: 10px;
    font-weight: bold;
    cursor: pointer;
}
.mydata:hover{
    background-color: rgb(245, 163, 41);
}
.box{
    margin-top: 130px;
}
.profile1{
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 20px;
    background-color: #3A6FF8; ;
    display: flex;
    padding: 20px;
    border: 2px solid rgb(0, 0, 0);
    flex-direction: column;
    align-items: start;
    color: white;
}
.info{
    font-weight: bold;
    font-size: 20px;
    padding: 5px;
}
</style>