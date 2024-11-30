<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="7" xl="5">
                <v-card class="pa-4 text-left" color="grey-lighten-4">
                    <v-card-item>
                        <span class="detail">Name</span>: {{ name }} <br>
                        <span class="detail">Email</span>: {{ email }} <br>
                        <span class="detail">Role</span>: {{ role }}
                    </v-card-item>
                    <v-card-action>
                        <v-row justify="space-between" class="mx-4">
                            <v-col cols="auto">
                                <v-btn to="/change-password" color="primary">Change Password</v-btn>
                            </v-col>
                            <v-col cols="auto">
                                <v-btn to="/edit-profile" color="success">Edit Profile</v-btn>
                            </v-col>
                            <v-col cols="auto">
                                <v-btn @click="logout" color="error">Logout</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-action>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { removeUserDetail } from '../../utils/UserApi';

export default {
    name: "Profile",
    data(){
        return{
            name: '',
            email: '',
            role: ''
        }
    },
    mounted(){
        this.name = localStorage.getItem('name')
        this.email = localStorage.getItem('email')
        this.role = localStorage.getItem('role')
    },
    methods: {
        logout(){
            removeUserDetail()
            window.location.replace('/')
        }
    }
}
</script>

<style>
</style>