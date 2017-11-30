<template >
    <v-ons-page>
        <v-ons-carousel auto-scroll
            :index.sync="carouselIndex" auto-scroll-ratio="0.5"
            >
            <v-ons-carousel-item v-for="(value, key) in items" :key="key" :style="{backgroundColor: value}">
                <div style="height: 200px;text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">{{key}}</div>
            </v-ons-carousel-item>
            </v-ons-carousel>

            <div :style="dots">
            <span :index="dotIndex - 1" v-for="dotIndex in Object.keys(items).length" :key="dotIndex" style="cursor: pointer" @click="carouselIndex = dotIndex - 1">
                {{ carouselIndex === dotIndex - 1 ? '\u25CF' : '\u25CB' }}
            </span>
            </div>

        <v-ons-list>

        <v-ons-list-header>Default</v-ons-list-header>
        <v-ons-list-item>Item A</v-ons-list-item>
        <v-ons-list-item>Item B</v-ons-list-item>

        <v-ons-list-header>Tappable / Ripple</v-ons-list-header>
        <v-ons-list-item tappable>Tap me</v-ons-list-item>

        <v-ons-list-header>Chevron</v-ons-list-header>
        <v-ons-list-item modifier="chevron" tappable>Chevron</v-ons-list-item>

        <v-ons-list-header>Thumbnails and titles</v-ons-list-header>
        <v-ons-list-item>
            <div class="left">
            <img class="list-item__thumbnail" src="http://placekitten.com/g/40/40">
            </div>
            <div class="center">
            <span class="list-item__title">Cutest kitty</span><span class="list-item__subtitle">On the Internet</span>
            </div>
        </v-ons-list-item>

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
        </v-ons-list-item>

        <v-ons-list-header>No divider</v-ons-list-header>
        <v-ons-list-item modifier="nodivider">Item A</v-ons-list-item>
        <v-ons-list-item modifier="nodivider">Item B</v-ons-list-item>

        <v-ons-list-header>Long divider</v-ons-list-header>
        <v-ons-list-item modifier="longdivider">Item A</v-ons-list-item>
        <v-ons-list-item modifier="longdivider">Item B</v-ons-list-item>
        </v-ons-list>

        <br />

        <v-ons-list modifier="inset">
        <v-ons-list-header>Inset list</v-ons-list-header>
        <v-ons-list-item modifier="longdivider">Item A</v-ons-list-item>
        <v-ons-list-item modifier="longdivider">Item B</v-ons-list-item>
        </v-ons-list>

        <br />
    </v-ons-page>
</template>
<script>
    export default {
        name: 'home',
        props: ['myProp'],
        data() {
        return {
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
        }
    }
</script>
