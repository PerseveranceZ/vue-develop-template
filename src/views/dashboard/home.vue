<template >
    <v-ons-page>
        <v-ons-list>
    
        <v-ons-list-header>store</v-ons-list-header>
        <v-ons-list-item>异步请求返回数据：{{userinfoGetter}}</v-ons-list-item>
        <br />
        <v-ons-list-header>api</v-ons-list-header>
        <v-ons-list-item @click="fetchMock" modifier="chevron" tappable>请求 $api['user/info']</v-ons-list-item>
        <br />
        <v-ons-list-header>const</v-ons-list-header>
        <v-ons-list-item expandable :expanded.sync="isExpanded">
            查看 $const['OTHER/MENU']
            <pre v-highlightjs="JSON.stringify($const['OTHER/MENU'], null, 2)" class="expandable-content"><code class="json"></code></pre>
        </v-ons-list-item>

       <!--  <v-ons-list-header>Tappable / Ripple</v-ons-list-header>
        <v-ons-list-item tappable>Tap me</v-ons-list-item>

        <v-ons-list-header>Chevron</v-ons-list-header>
        <v-ons-list-item modifier="chevron" tappable>Chevron</v-ons-list-item>

        <v-ons-list-header>Icons</v-ons-list-header>
        <v-ons-list-item>
            <div class="left">
            <v-ons-icon icon="md-face" class="list-item__icon"></v-ons-icon>
            </div>
            <div class="center">
            Icon
            </div>
        </v-ons-list-item>

        <v-ons-list-header>Switch</v-ons-list-header>
        <v-ons-list-item>
            <div class="center">
            Turn it on
            </div>
            <div class="right">
            <v-ons-switch></v-ons-switch>
            </div>
        </v-ons-list-item>

        <v-ons-list-header>Switch and icon</v-ons-list-header>
        <v-ons-list-item>
            <div class="left">
            <v-ons-icon icon="md-face" class="list-item__icon"></v-ons-icon>
            </div>
            <div class="center">
            Icon and switch
            </div>
            <div class="right">
            <v-ons-switch></v-ons-switch>
            </div>
        </v-ons-list-item> -->
        </v-ons-list>

        <br />

        <v-ons-list modifier="inset">
        <v-ons-list-header>about me</v-ons-list-header>
        <v-ons-list-item>
            <div class="left">
            <img class="list-item__thumbnail" src="http://placekitten.com/g/40/40">
            </div>
            <div class="center">
            <span class="list-item__title">Zero</span><span class="list-item__subtitle">Front-End</span>
            </div>
        </v-ons-list-item> 
        </v-ons-list>       


        <br />
    </v-ons-page>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        name: 'home',
        props: ['myProp'],
        computed: {
            ...mapGetters(['userinfoGetter'])
        },
        data() {
            return {
                isExpanded: false,
                carouselIndex: 0,
                items: {
                    BLUE: '#085078',
                    DARK: '#373B44',
                    ORANGE: '#D38312'
                },
                dots: {
                    textAlign: 'center',
                    fontSize: '30px',
                    color: '#fff',
                    position: 'absolute',
                    bottom: '40px',
                    left: 0,
                    right: 0
                }
            }
        },
        methods: {
            fetchMock() {
                this.$api['user/info']().then(resData => {
                    console.log(resData)
                })
            }
        }        
    }
</script>
