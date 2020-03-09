<template>
  <Page @loaded="startNavigation" actionBarHidden="true" :androidStatusBarBackground="bgColor"></Page>
</template>

<script >
import { mapGetters } from 'vuex'

export default {
  data: () => ({}),
  computed: {
    ...mapGetters({
      authToken: 'Auth/authToken',
      activePage: 'activePage',
      bgColor: 'bgColor',
    }),
  },
  methods: {
    async startNavigation() {
      const unauthenticated = !this.authToken
      if (unauthenticated) {
        console.info('[EntryPoint/startNavigation] redirect: Auth')
        const { default: Auth } = await import('./Auth.vue')
        this.$navigateTo(Auth)
      }
      else {
        // check if AP and City are chosen
        if (this.activePage) {
          console.info('[EntryPoint/startNavigation] redirect: activePage', this.activePage.__file)
          this.$navigateTo(this.activePage)
        }
        else {
          console.info('[EntryPoint/startNavigation] redirect: CreateReport')
          const { default: CreateReport } = await import('./CreateReport.vue')
          this.$root.gracefullyNavigateTo(CreateReport)
        }
      }
    },
  },
}
</script>

<style scoped>
Page {
  color: #53ba82;
  background-color: #2b71b1;
}
</style>
