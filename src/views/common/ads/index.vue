<template>
<transition name="fade" mode="out-in">
  <v-ons-page v-if="adsShow">
    <v-ons-carousel fullscreen swipeable auto-scroll overscrollable
      :index.sync="carouselIndex"
    >
      <v-ons-carousel-item v-for="(value, key) in items" :key="key" :style="{backgroundColor: value}">
      </v-ons-carousel-item>
    </v-ons-carousel>

    <transition name="fade" enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
        <div :style="dots" v-if="carouselIndex !== allIndex">
            <span :index="dotIndex - 1" v-for="dotIndex in Object.keys(items).length" :key="dotIndex" style="cursor: pointer" @click="carouselIndex = dotIndex - 1">
                {{ carouselIndex === dotIndex - 1 ? '\u25CF' : '\u25CB' }}
            </span>
            <p>{{userinfoGetter}}</p>
        </div>
    </transition>
    <transition name="fade" enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
        <div :style="dots" v-if="carouselIndex === allIndex">
            <v-ons-row>
                <v-ons-col width="100%" style="text-align: center" vertical-align="center">
                    <v-ons-button modifier="quiet" style="margin: 6px 0; color: white;" @click="close">Quiet</v-ons-button>
                </v-ons-col>
            </v-ons-row>
        </div>
    </transition>
  </v-ons-page>
</transition>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
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
                },
                adsShow: true
            }
        },
        computed: {
            ...mapGetters(['userinfoGetter']),
            allIndex () {
                return Object.keys(this.items).length - 1
            }
        },
        methods: {
            close() {
                this.adsShow = false
            }
        }
    }
</script>