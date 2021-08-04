"use strict";

import Vue from 'vue';
import axios from "axios";
import router from '../router'
import {
    Message
} from 'element-ui'; //引入elm组件


let config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    timeout: 10 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};
export const _axios = axios.create(config);

// 添加请求拦截器
_axios.interceptors.request.use(config => { // 在发送请求之前做些什么
    return config;
}, err => { // 对请求错误做些什么
    return Promise.reject(err);
});

// 添加响应拦截器
_axios.interceptors.response.use(res => { // 对响应数据做点什么
    // console.log(res)
    if (res.data.code && res.data.code != 200) {
        Message.error(res.data.msg);
        return;
    }
    return res.data;
}, err => { // 对响应错误做点什么

    if (err.message.includes('timeout') || err.response.status == 502) {
        router.push({
            path: '/500',
            query: {
                redirect: router.currentRoute.query.redirect ? router.currentRoute.query.redirect : router.currentRoute.fullPath
            }
        })
    }
    if (err.response.data.code && err.response.data.code != 200) {
        Message.error(err.response.data.msg);
    }
    return Promise.reject(err);
});

Vue.prototype.$axios = _axios;