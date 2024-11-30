<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="5" xl="3">
                <v-card v-if="error" class="pa-4 mb-4" :color="error === 'successful' ? 'green-lighten-4' : 'red-lighten-4'">{{ error }}</v-card>
                <v-card class="pa-4" color="grey-lighten-4">
                    <v-card-title class="text-center">Sign up Here</v-card-title>
                    <v-card-item>
                            <v-form @submit.prevent="submit">
                                <v-text-field :rules="[rules.required]" v-model="form.name" label="Name" append-inner-icon="mdi-account"></v-text-field>
                                <v-text-field :rules="[rules.required ,rules.email]" v-model="form.email" label="Email" append-inner-icon="mdi-email"></v-text-field>
                                <v-text-field :rules="[rules.required]" type="password" v-model="form.password" label="Password" append-inner-icon="mdi-key"></v-text-field>
                                <v-text-field :rules="[rules.required]" type="password" v-model="form.passwordConfirm" label="PasswordConfirm" append-inner-icon="mdi-lock"></v-text-field>
                                <v-btn class="mt-2" type="submit" block color="red-darken-2">Submit</v-btn>
                            </v-form>
                    </v-card-item>
                    <v-card-action>
                        <div class="mx-4">
                            <v-btn to="/login" block color=primary>Login</v-btn>
                        </div>
                    </v-card-action>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { setUserDetail, Signup } from '../../utils/UserApi'

    const form = ref({
        name: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    const isLoading = ref(false)
    const error = ref("")

    async function submit(){
        if(!form.value.name || !form.value.email || !form.value.password || !form.value.passwordConfirm){
            error.value = "Please Provide All Inforamtion"
            return
        }

        isLoading.value = true
        const res = await Signup(form.value)
        if(typeof res == "string"){
            if(res[0] == "E") return error.value = "this Email already exist"
            error.value = res
        }else{
            setUserDetail(res)
            error.value = 'successful'
            setInterval(() => {
                window.location.replace('/')
            }, 1000);
        }
    }

    const rules = {
        required: (value: string) => !!value || 'Required.',
        email: (value: string) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
    }
</script>