<template>
    <div>
        <a-form
            class="p-2"
            :class="fadein"
            :model="formData"
            :rules="formRules"
            ref="a-formRef"
            @keypress.enter="handleLogin"
        >
            <a-form-item name="account" :class="fadein">
            <a-input size="large" v-model:value="formData.account" placeholder="请输入账号" />
            </a-form-item>
            <a-form-item name="password" :class="fadein">
            <a-input
                size="large"
                visibilityToggle
                v-model:value="formData.password"
                placeholder="请输入密码"
            />
            </a-form-item>

            <a-row :class="fadein">
            <a-col :span="12">
                <a-form-item>
                <!-- No logic, you need to deal with it yourself -->
                <a-checkbox v-model:checked="rememberMe" size="small">
                    记住我
                </a-checkbox>
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item :style="{ 'text-align': 'right' }">
                <!-- No logic, you need to deal with it yourself -->
                <a-button type="link" size="small" @click="setLoginState()">
                    忘记密码
                </a-button>
                </a-form-item>
            </a-col>
            </a-row>

            <a-form-item :class="fadein">
                <a-button type="primary" size="large" block @click="handleLogin" :loading="loading">
                    登录
                </a-button>
            </a-form-item>

        </a-form>
    </div>
</template>
<script>
import { defineComponent, reactive, toRefs  } from 'vue';
// import { store  } from '@/store';
import { user  } from '@/store/modules/user';

export default defineComponent({
    components: {},
    setup() {
        let data = reactive({
            loading: false,
            rememberMe: false,
            // verifyCodePath:"/api/lading" + data.verifyCodeBasePath + "?t=" + new Date().getTime(),
            // verifyCodeBasePath:'',
            formData:{
                account: "",
                password: "",
                // code: "",
            },
            // imgSrc:"",
            formRules:{
                account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            }
        })
        const fadein = 'animate__animated animate__fadeInRight'
        function setLoginState(){

        }
        function handleLogin(){
            // store._modules.root._rawModule.modules.user.dispatch('login')
            user.dispatch('login')
        }
        return {
            ...toRefs(data),
            setLoginState,
            handleLogin,
            fadein
        }
    },
});
</script>
<style scoped>

</style>