<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                <!-- <v-ons-icon icon="ion-navicon, material: md-menu"></v-ons-icon> -->
                </v-ons-toolbar-button>
            </div>
            <div class="center">{{ title }}</div>
        </v-ons-toolbar>

        <v-ons-tabbar swipeable position="auto"
        :tabs="tabs"
        :visible="true"
        :index.sync="activeIndex"
        >
        </v-ons-tabbar>
    </v-ons-page>
</template>

<script>


import Home from './dashboard/home'
import News from './dashboard/news'
export default {
  data() {
    return {
      activeIndex: 0,
      tabs: [
        {
          icon: this.md() ? null : 'ion-home',
          label: 'Home',
          page: Home,
          props: {
            myProp: 'This is a page prop!'
          },
          key: "homePage"
        },
        {
          icon: this.md() ? null : 'ion-ios-bell',
          label: 'News',
          page: News,
          badge: 7,
          key: "newsPage"
        }
      ]
    };
  },
  methods: {
    md() {
      return this.$ons.platform.isAndroid();
    }
  },
  computed: {
    title() {
      return this.tabs[this.activeIndex].label;
    }
  }
}
</script>
