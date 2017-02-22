<script>
  import {loginUrl, userUrl, getHeader} from './../config'
  import {clientId, clientSecret} from './../env'
  import {mapState} from 'vuex'
  import Notifications from 'vue-notifications'
  export default {
    computed: {
      ...mapState({
        userStore: state => state.userStore
      })
    },
    data () {
      return {
        login: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      handleLoginFormSubmit () {
        const postData = {
          grant_type: 'password',
          client_id: clientId,
          client_secret: clientSecret,
          username: this.login.email,
          password: this.login.password,
          scope: ''
        }
        const authUser = {}
        this.$http.post(loginUrl, postData)
          .then(response => {
            if (response.status === 200) {
              console.log('oauth token', response)
              authUser.access_token = response.data.access_token
              authUser.refresh_token = response.data.refresh_token
              window.localStorage.setItem('authUser', JSON.stringify(authUser))
              this.$http.get(userUrl, {headers: getHeader()})
                .then(response => {
                  console.log('user Object', response)
                  authUser.email = response.body.email
                  authUser.name = response.body.name
                  authUser.password = response.body.password
                  window.localStorage.setItem('authUser', JSON.stringify(authUser))
                  Notifications.success({message: '欢迎回来', timeout: 1200})
                  this.$store.dispatch('setUserObject', authUser)
                  this.$router.push({ path: 'dashboard' })
                })
            }
          }, response => {
            Notifications.error({message: '用户名或者密码错误！'})
          })
      }
    }
  }
</script>

<template>
<div class="wrapper" id="home-wrapper">

    <section class="login">
      <div class="row">
        <div class="col-md-6 col-md-push-3">
          <div class="panel panel-default">
            <div class="panel panel-heading">Login</div>
            <div class="panel-body">
                <form v-on:submit.prevent="handleLoginFormSubmit()">
                  <div class="form-group">
                    <label>Email address</label>
                    <input
                      class="form-control"
                      placeholder="Enter your email address"
                      type="text"
                      v-model="login.email"
                      required
                      >
                  </div>

                  <div class="form-group">
                    <label>Password</label>
                    <input
                      class="form-control"
                      placeholder="Enter your password"
                      type="password"
                      v-model="login.password"
                      required
                      >
                  </div>

                  <button class="btn btn-primary">Login</div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="sass">
  #login-wrapper
    margin-top : 50px;
  </style>
