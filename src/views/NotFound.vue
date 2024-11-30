<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="6">
                <v-card class="pa-4 mb-4" :color="'red-lighten-4'">
                    <h2>404 - Page Not Found</h2>
                    <p>The requested URL: <strong>{{ $route.fullPath }}</strong> was not found.</p>
                    <router-link to="/">Go to Home</router-link>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
