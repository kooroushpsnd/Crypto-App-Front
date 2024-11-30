<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="4">
                <v-card v-if="error" class="pa-4 mb-4" :color="error === 'successful' ? 'green-lighten-4' : 'red-lighten-4'">{{ error }}</v-card>
                <v-card class="pa-4" color="grey-lighten-4">
                    <v-card-title class="text-center">Update Password</v-card-title>
                    <v-card-item>
                            <v-form @submit.prevent="submit">
                                <v-text-field v-model="form.passwordCurrent" type="password" label="PasswordCurrent" append-inner-icon="mdi-lock" :rules="[rules.required]"></v-text-field>
                                <v-text-field v-model="form.password" type="password" label="Password" append-inner-icon="mdi-key" :rules="[rules.required]"></v-text-field>
                                <v-text-field v-model="form.passwordConfirm" type="password" label="PasswordConfirm" append-inner-icon="mdi-key" :rules="[rules.required]"></v-text-field>
                                <v-btn class="mt-2" type="submit" block color="red-darken-2">
                                    <v-progress-circular indeterminate v-if="isLoading"></v-progress-circular>
                                    <span v-else>Update Password</span>
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
import { ChangePassword } from '../../utils/UserApi';
import { ref } from 'vue';

    const form = ref({
        passwordCurrent: "",
        password: "",
        passwordConfirm: ""
    })

    const error = ref('')
    const isLoading = ref(false)

    async function submit(){
        if(form.value.password && form.value.passwordConfirm && form.value.passwordCurrent){
            isLoading.value = true
            const res = await ChangePassword(form.value ,localStorage.getItem('token')!)
            if(typeof res == "string") return error.value = res ,isLoading.value = false
            else error.value = "successful" ,localStorage.setItem('token' ,res.token)
            isLoading.value = false

        }else{
            error.value = "Please insert your password"
        }
    }

    const rules = {
        required: value => !!value || 'Required.'
    }
</script>