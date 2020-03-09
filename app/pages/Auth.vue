<template>
  <Page
    actionBarHidden="true"
    :androidStatusBarBackground="bgColor"
    @loaded="onLoaded"
    @navigatingFrom="onNavigatingFrom"
  >
    <RadSideDrawer ref="drawer" gesturesEnabled="false">
      <Sidebar ~drawerContent></Sidebar>

      <GridLayout ~mainContent rows="1*, auto, auto, auto, auto, 1*" columns="1*, 10*, 1*">
        <Image row="0" col="1" src="~/assets/images/btl-logo.png"></Image>

        <TextField
          row="1"
          col="1"
          hint="Логин"
          ref="usernameField"
          :text="username"
          @textChange="onTextChange('username', $event)"
        />
        <TextField
          row="2"
          col="1"
          hint="Пароль"
          ref="passwordField"
          :text="password"
          @textChange="onTextChange('password', $event)"
          secure="true"
          returnKeyType="go"
          @returnPress="logInAttempt"
        />
        <Button row="3" col="1" text="Войти >" @tap="logInAttempt"></Button>
        <Label
          row="4"
          col="1"
          v-show="authError && authError.message"
          textWrap="true"
          class="error"
        >
          <FormattedString>
            <span :text="authError.message"></span>
          </FormattedString>
        </Label>
      </GridLayout>
    </RadSideDrawer>
  </Page>
</template>

<script >
import * as application from 'tns-core-modules/application'
import { mapGetters } from 'vuex'

import Sidebar from '../components/Sidebar'


export default {
  components: { Sidebar },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  computed: {
    ...mapGetters({
      authError: 'Auth/authError',
      authToken: 'Auth/authToken',
      activePage: 'activePage',
      bgColor: 'bgColor',
    }),
  },
  methods: {
    onLoaded() {
      application.on(application.suspendEvent, this.onSuspend)
    },
    onNavigatingFrom() {
      application.off(application.suspendEvent, this.onSuspend)
      application.off(application.resumeEvent, this.onResume)
    },
    onSuspend(args) {
      this.$store.commit('Auth/clearErrors')
      application.off(application.suspendEvent, this.onSuspend)
      application.on(application.resumeEvent, this.onResume)
    },
    onResume(args) {
      application.off(application.resumeEvent, this.onResume)
    },
    onTextChange(type, { value }) {
      this[type] = value
      this.$store.commit('Auth/clearErrors')
    },
    async logInAttempt() {
      await this.$store.dispatch('Auth/logInAttempt', {
        username: this.username,
        password: this.password,
      })

      if (this.authToken) {
        this.username = ''
        this.password = ''

        const { default: EntryPoint } = await import('./EntryPoint.vue')
        this.$navigateTo(EntryPoint)
      }
    },
  },
}
</script>

<style scoped>
Page {
  color: #2b71b1;
  background-color: #f0f0f0;
}

.error {
  color: rgb(224, 108, 117);
  text-align: center;
}
</style>
