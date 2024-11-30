<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="5">
                <v-card class="pa-4" color="grey-lighten-4">
                    <v-card v-if="error" class="pa-4 mb-4" :color="error === 'successful' ? 'green-lighten-4' : 'red-lighten-4'">{{ error }}</v-card>
                    <v-card-title class="text-center">Remoce Crypto Currency Detail</v-card-title>
                    <v-card-item>
                            <v-form @submit.prevent="submit">
                                <v-text-field v-model="name" label="Name" append-inner-icon="mdi-bitcoin" :rules="[rules.required]"></v-text-field>
                                <v-btn class="mt-2" type="submit" block color="red-darken-2">
                                    <v-progress-circular indeterminate v-if="isLoading"></v-progress-circular>
                                    <span v-else>Remove</span>
                                </v-btn>
                            </v-form>
                    </v-card-item>
                    <v-card-action>
                        <div class="mx-4">
                            <v-btn to="/add-crypto" block color=primary>Create Crypto</v-btn>
                        </div>
                    </v-card-action>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { removeCrypto } from '../../utils/CryptoApi'

    const name = ref('')
    const error = ref('')

    const isLoading = ref(false)

    async function submit(){
        isLoading.value = true
        const res = await removeCrypto(name.value ,localStorage.getItem('token')!)
        if(res == "no Crypto found") error.value = `${res} called ${name.value}`
        else error.value = "successful"

        name.value = ''
        isLoading.value = false
    }

    const rules = {
        required: (value:string) => !!value || 'Required.'
    }
</script>