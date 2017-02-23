<script>
  import {loginUrl, getHeaderClient, registerUrl} from './../config'
  import {clientId, clientSecret} from './../env'
  import Notifications from 'vue-notifications'
  export default {
    data () {
      return {
        register: {
          email: '',
          password: '',
          password_confirmation: '',
          name: ''
        }
      }
    },
    methods: {
      handleRegisterFormSubmit () {
        const postData = {
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
          scope: ''
        }
        const postDataRegister = {
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
          email: this.register.email,
          password: this.register.password,
          password_confirmation: this.register.password_confirmation,
          name: this.register.name,
          scope: ''
        }
        const clientAuth = {}
        this.$http.post(loginUrl, postData)
          .then(response => {
            if (response.status === 200) {
              clientAuth.access_token = response.data.access_token
              window.localStorage.setItem('clientAuth', JSON.stringify(clientAuth))
              this.$http.post(registerUrl,
                postDataRegister, {headers: getHeaderClient()})
                .then(response => {
                  if (response.status === 200) {
                    Notifications.success({message: '成功注册'})
                  }
                }, response => {
                  var validatorEmail = ''
                  if (response.body.email) {
                    validatorEmail = response.body.email
                  }
                  var validatorpassword = ''
                  if (response.body.password) {
                    validatorpassword = response.body.password
                  }
                  const validators = validatorEmail + validatorpassword
                  Notifications.warn({message: validators, timeout: 15000})
                })
            }
          }, response => {
            Notifications.error({message: '系统有炸弹，拆弹中…………'})
          })
      }

    }
  }
</script>
<template>
  <div class="container">
   <div class="row">
       <div class="col-md-8 col-md-offset-2">
           <div class="panel panel-default">
               <div class="panel-heading">Register</div>
               <div class="panel-body">
                   <form v-on:submit.prevent="handleRegisterFormSubmit()">
                       <div class="form-group">
                           <label>Name</label>
                           <input
                              class="form-control"
                              placeholder="Enter your name"
                              type="text"
                              v-model="register.name"
                              required
                              >
                       </div>

                       <div class="form-group">
                           <label>E-Mail Address</label>
                           <input
                              class="form-control"
                              placeholder="Enter your email address"
                              type="text"
                              v-model="register.email"
                              required
                              >
                       </div>

                       <div class="form-group ">
                           <label >Password</label>
                               <input
                                  class="form-control"
                                  placeholder="Enter your password"
                                  type="password"
                                  v-model="register.password"
                                  required
                                  >
                       </div>

                       <div class="form-group">
                           <label>Confirm Password</label>
                               <input
                                  class="form-control"
                                  placeholder="Enter your password confirmation"
                                  type="password"
                                  v-model="register.password_confirmation"
                                  required
                                  >
                       </div>

                       <div class="form-group">
                           <div class="col-md-6 col-md-offset-4">
                               <button type="submit" class="btn btn-primary">
                                   Register
                               </button>
                           </div>
                       </div>
                   </form>
               </div>
           </div>
       </div>
   </div>
</div>
</template>

<style lang="sass">
  #login-wrapper
    margin-top: 50px
</style>
