<script>
  import {mapState} from 'vuex'
  import TopMeun from './components/TopMeun'
  export default {
    components: {
      TopMeun
    },
    computed: {
      ...mapState({
        userStore: state => state.userStore
      })
    },
    created () {
      console.log('I am Esd')
      const userObj = JSON.parse(window.localStorage.getItem('authUser'))
      this.$store.dispatch('setUserObject', userObj)
    }
  }
</script>
<template>
  <div>
    <top-meun></top-meun>
    <router-view></router-view>
  </div>
</template>


<style lang="sass">
  @import './assets/css/bootstrap.css'
</style>
