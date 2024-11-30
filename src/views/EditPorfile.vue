<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="4">
                <v-card v-if="error" class="pa-4 mb-4" :color="error === 'successful' ? 'green-lighten-4' : 'red-lighten-4'">{{ error }}</v-card>
                <v-card class="pa-4" color="grey-lighten-4">
                    <v-card-title class="text-center">Edit Profile</v-card-title>
                    <v-card-item>
                            <v-form @submit.prevent="submit">
                                <v-text-field v-model="form.name" label="Name" append-inner-icon="mdi-account"></v-text-field>
                                <v-text-field v-model="form.email" label="Email" append-inner-icon="mdi-email" :rules="[rules.email]"></v-text-field>
                                <v-btn class="mt-2" type="submit" block color="red-darken-2">
                                    <v-progress-circular indeterminate v-if="isLoading"></v-progress-circular>
                                    <span v-else>Update</span>
                                </v-btn>
                            </v-form>
                    </v-card-item>
                    <v-card-action>
                        <div class="mx-4">
                            <v-btn to="/profile" block color=primary>Profile</v-btn>
                        </div>
                    </v-card-action>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { updateUser } from '../../utils/UserApi';
import { ref } from 'vue';

    const form = ref({
        name: "",
        email: ""
    })

    const error = ref('')

    const isLoading = ref(false)

    async function submit(){
        if(form.value.name.trim() || form.value.email.trim()){
            isLoading.value = true
            const res = await updateUser(form.value ,localStorage.getItem("token")!)
            if(!res.name.trim() && !res.email.trim()) error.value = "Please insert something to update"
            else {
                error.value = "successful"
                if(form.value.name.trim()) localStorage.setItem("name" ,form.value.name.trim())
                if(form.value.email.trim()) localStorage.setItem("email" ,form.value.email.trim())
            }
            isLoading.value = false
        }else{
            error.value = "Please insert something to update"
        }
    }

    const rules = {
        email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
        }
    }
</script>