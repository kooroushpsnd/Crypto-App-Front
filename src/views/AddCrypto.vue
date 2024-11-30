<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="5">
                <v-card v-if="error" class="pa-4 mb-4" :color="error === 'successful' ? 'green-lighten-4' : 'red-lighten-4'">{{ error }}</v-card>
                <v-card class="pa-4" color="grey-lighten-4">
                    <v-card-title class="text-center">Create Crypto Currency Detail</v-card-title>
                    <v-card-item>
                            <v-form @submit.prevent="submit" enctype="multipart/form-data">
                                <v-text-field v-model="form.name" label="Name" append-inner-icon="mdi-bitcoin" :rules="[rules.required]"></v-text-field>
                                <v-file-input @change="selectFile" label="Picture" show-size counter multiple append-inner-icon="mdi-image"></v-file-input>
                                <v-btn class="mt-2" type="submit" block color="red-darken-2">
                                    <v-progress-circular indeterminate v-if="isLoading"></v-progress-circular>
                                    <span v-else>Create</span>
                                </v-btn>
                            </v-form>
                    </v-card-item>
                    <v-card-action>
                        <div class="mx-4">
                            <v-btn to="/remove-crypto" block color=primary>Remove Crypto</v-btn>
                        </div>
                    </v-card-action>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { createCrypto } from '../../utils/CryptoApi';

    const form = ref({
        name: ''
    })

    const picture = ref<string | File>('')
    const error = ref('')
    const isLoading = ref(false)

    async function submit(){
        const formData = new FormData()
        formData.append("image" ,picture.value)
        formData.append("name" ,form.value.name)
        isLoading.value = true
        const res = await createCrypto(formData ,localStorage.getItem('token')!)
        if(res == "wrong Crypto Name or Price" || res == "the crypto already exist") error.value = res
        else error.value = "successful"

        form.value = {name: ""}
        picture.value = ''
        isLoading.value = false
    }

    function selectFile(event: Event){
        const target = event.target as HTMLInputElement;
        const file = target.files
        if (file && file.length > 0) {
            picture.value = file[0];
        } else {
            picture.value = '';
        }
    }

    const rules = {
        required: (value: string) => !!value || 'Required.'
    }
</script>