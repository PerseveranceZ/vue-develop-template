<template>
    <div>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <!-- <Ads></Ads> -->
    </div>
</template>

<script>
import { mapActions } from 'vuex'

import Ads from 'Views/common/ads'

export default {
    components: {
        Ads
    },
    methods: {
        ...mapActions(['getUserInfo']),
        bindEvent() {
            GLOBAL.vbus.$on('business.response.incorrect', (resData) => {
                // ... code 不为 0，业务不正确处理
            })
            // 自行触发
            GLOBAL.vbus.$on('ajax.request.error', (resData) => {
            })
            GLOBAL.vbus.$on('ajax.response.error', (resData) => {
            })
        },
        init() {
            this.getUserInfo()
            
        }
    },
    created() {
        this.init()
        this.bindEvent()
    }
}
</script>
<style>
@import './assets/style/index.scss';
</style>

