<template >
    <v-ons-page>
        <p style="text-align: center">
        Welcome home.<br><br> {{myProp}}
        </p>
    </v-ons-page>
</template>
<script>
    export default {
        name: 'home',
        props: ['myProp']
    }
</script>
