<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="4">
                <v-card v-if="error" class="pa-4 mb-4" :color="error === 'successful' ? 'green-lighten-4' : 'red-lighten-4'">{{ error }}</v-card>
                <v-card class="pa-4" color="grey-lighten-4">
                    <v-card-title class="text-center">Login Here</v-card-title>
                    <v-card-item>
                            <v-form @submit.prevent="submit">
                                <v-text-field v-model="form.email" label="Email" append-inner-icon="mdi-email" :rules="[rules.required, rules.email]"></v-text-field>
                                <v-text-field type="password" v-model="form.password" label="Password" append-inner-icon="mdi-key" :rules="[rules.required]"></v-text-field>
                                <v-btn class="mt-2" type="submit" block color="red-darken-2">
                                    <v-progress-circular indeterminate v-if="isLoading"></v-progress-circular>
                                    <span v-else>Submit</span>
                                </v-btn>
                            </v-form>
                    </v-card-item>
                    <v-card-action>
                        <div class="mx-4">
                            <v-btn to="/signup" block color=primary>Sign up</v-btn>
                        </div>
                    </v-card-action>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Login, removeUserDetail, setUserDetail } from '../../utils/UserApi';

    const form = ref({
        email: "",
        password: ""
    })

    const isLoading = ref(false)
    const error = ref("")

    async function submit(){
        if(!form.value.email || !form.value.password){
            error.value = "Provide email and password"
            return
        }

        isLoading.value = true

        const res = await Login(form.value)
        if(typeof res == "string"){
            error.value = res
            removeUserDetail()
            isLoading.value = false
        }
        else{
            setUserDetail(res)
            error.value = 'successful'
            isLoading.value = false
            setInterval(() => {
                window.location.replace('/')
            }, 1000);
        }
    }

    const rules = {
        required: (value:string) => !!value || 'Required.',
        email: (value: string) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
    }
</script>