<template>
    <v-container>
        <v-row>
          <v-col
            v-for="user in users"
            :key="user.name"
            cols="4"
            xl="3"
          >
            <v-card id="userContainer" height="150">
              <div>
                <span class="details"><span class="detail">Id</span>: {{ user._id }}</span>
                <span class="details"><span class="detail">Name</span>: {{ user.name }}</span>
                <span class="details"><span class="detail">Email</span>: {{ user.email }}</span>
                <span class="details"><span class="detail">Role</span>: {{ user.role }}</span>
                <button id="removeUser" @click="removeUser(user._id)">Remove User</button>
              </div>
            </v-card>
          </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { getAllUsers ,deleteUser } from '../../utils/UserApi';

export default {
    name:"UserControllPage",
    data(){
        return{
            token: '',
            users: [],
            error: ''
        }
    },
    async mounted(){
        try {
            this.token = localStorage.getItem('token')
            const response = await getAllUsers(this.token)
            this.users = response.data.users
            }
            catch(err){
                this.error = err.message
            }
    },
    methods: {
        async removeUser(id){
            try{
                await deleteUser(id ,this.token)
                this.users = this.users.filter(user => user._id !== id);
            }catch(err){
                this.error = err.message
            }
        }
    }
}
</script>

<style>
#userContainer{
    display: flex;
    text-align: left;
    padding: 10px;
    box-shadow: 5px 5px 10px gray;
}
#removeUser{
    background-color: red;
    border-radius: 10px;
    padding: 5px;
    margin-top: 5px;
    font-weight: bolder;
}
</style>