<template>
  <StackLayout backgroundColor="#ffffff">
    <Label class="drawer-header" text="BTL Prof" />

    <Button
      v-if="authToken"
      class="primary"
      text="Выбрать АП"
      row="3"
      col="0"
      @tap="navigateToChooseAP"
    ></Button>
    <Button
      v-if="authToken"
      class="primary"
      text="Выбрать город"
      row="4"
      col="0"
      @tap="navigateToChooseCity"
    ></Button>
    <Button
      v-if="authToken"
      class="primary"
      text="Составить отчёт"
      row="2"
      col="0"
      @tap="navigateToCreateReport"
    ></Button>

    <Button v-if="authToken" class="primary" text="Auth" row="2" col="0" @tap="navigateToAuth"></Button>
    <Button v-if="authToken" class="primary" text="Завершить работу" row="4" col="0" @tap="logOut"></Button>
  </StackLayout>
</template>

<script >
import { mapGetters } from 'vuex'


export default {
  data: () => ({}),
  computed: {
    ...mapGetters({
      authToken: 'Auth/authToken',
    }),
  },
  methods: {
    /**
     * All these seemengly redundant "navigateToPage" methods are here because of the webpack limitation,
     * because of which you cannot dynamically import a module via variable,
     * but you still can dynamically import a module via literal string, so I did here.
     * 
     * It also seems not possible to statically import all of the pages here,
     * because this module (Sidebar) is being required in all of them, so we have an uncertain race condition.
     */
    async navigateToAuth() {
      const { default: Page } = await import('../pages/Auth.vue')
      this.$navigateTo(Page)
    },
    async navigateToChooseAP() {
      const { default: Page } = await import('../pages/ChooseAP.vue')
      this.$root.gracefullyNavigateTo(Page)
    },
    async navigateToChooseCity() {
      const { default: Page } = await import('../pages/ChooseCity.vue')
      this.$root.gracefullyNavigateTo(Page)
    },
    async navigateToCreateReport() {
      const { default: Page } = await import('../pages/CreateReport.vue')
      this.$root.gracefullyNavigateTo(Page)
    },
    logOut() {
      this.$store.commit('setActivePage', null)
      this.$store.commit('Auth/logOut')
      this.navigateToAuth()
    },
  },
}
</script>

<style lang="less" scoped>
button {
  background-color: #2b71b1;
  background-color: #ff0000;
  color: #53ba82;
  background-color: #fafafa;
}

.drawer-header {
  padding: 42 16 16 16;
  margin-bottom: 16;
  background-color: #53ba82;
  background-color: #2b71b1;
  color: #ffffff;
  font-size: 24;
}

.drawer-item {
  padding: 8 16;
  color: #333333;
  font-size: 16;
}
</style>
