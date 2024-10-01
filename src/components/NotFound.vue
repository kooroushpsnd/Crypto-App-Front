<template>
    <div class="boxnotfound">
        <div class="notfound">
            {{ errorMessage }} Does Not Exists
        </div>
        <div class="routerlink"><router-link to="/" id="link">Go To Home Page</router-link></div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Block from '../../../Vue Projects/reaction-timer/src/components/Block.vue';

export default defineComponent({
  components: { Block },
    name:"NotFound",
    computed: {
        errorMessage(){
            return this.$route.params.pathMatch[0]
        }
    }
})
</script>

<style>
.boxnotfound{
    display: flex;
    justify-content: space-between;
}
.notfound{
    background: #0b6dff;
    border: 0;
    padding: 10px 20px;
    color: white;
    border-radius: 20px;
    max-width: 420px;
    margin-right: auto;
    margin-left: auto;
}
.routerlink{
    background: #0b6dff;
    border: 0;
    padding: 10px 20px;
    border-radius: 20px;
    max-width: 420px;
}
#link{
    color: white;
    text-decoration: none;
}
#link:hover{
    color: black;
}
</style>