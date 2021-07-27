<template>
    <div class="h-full login-container">
        
        <div class="logo">
            <logo />
        </div>
           
        <div class="form">
            <LoginTitle :FormTitle="title" class="animate__animated animate__fadeInRight"/>
            <LoginForm />
        </div>
    </div>
</template>
<script>
import { defineComponent, onMounted,  ref } from 'vue';
import  logo  from '@/components/logo/logo.vue';
import LoginForm from './loginForm.vue';
import LoginTitle from './loginTitle.vue';
export default defineComponent({
    components: {
        LoginForm,
        LoginTitle,
        logo
    },
    setup() {
        onMounted(()=>{
            
        })
        const title = ref()
        title.value='登录'
        return {
            title
        }
    },
});
</script>
<style scoped>
.login-container{
    display: flex;
    flex-direction: column;
    background: url('../../../assets/turntable.jpg') no-repeat 100% 100%;
}
.logo{
    width: 400px;
    margin: 3%;
}
.form{
    width: 400px;
    padding: 60px 30px;
    border-radius: 10px;
    background: rgba(235, 235, 235, 0.8);
    box-shadow: -10px -10px 20px rgba(0, 0, 0, 0.3);
    position: absolute;
    right: 20%;
    top: 30%;
}
</style>