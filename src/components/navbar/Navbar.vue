<template>
  <div class="root">
    <md-toolbar>
      <h2 class="md-title" style="flex: 1">Бювети Києва</h2>
      
     
      <md-button @click.native="navigate('home')">Головна</md-button>
        <md-button @click.native="navigate('contacts')">Контакти</md-button>
          <md-button @click.native="openAboutDialog">Опис</md-button>
      <md-button @click.native="navigate('database')" v-if="isAuthenticated">База даних</md-button>
      <md-button v-if="isAuthenticated" class="md-icon-button" @click.native="logoff">
        <md-icon>exit_to_app</md-icon>
      </md-button>

      <md-button v-if="!isAuthenticated" class="md-icon-button" @click.native="openLoginDialog">
        <md-icon>account_box</md-icon>
      </md-button>
    </md-toolbar>


    <md-dialog ref="loginDialog">
      <form novalidate @submit.stop.prevent="login">
        <md-dialog-title>
          Увійти
        </md-dialog-title>

        <md-dialog-content>

          <md-input-container>
            <label>Ім'я</label>
            <md-input required v-model="user.name"></md-input>
          </md-input-container>

          <md-input-container>
            <label>Пароль</label>
            <md-input type="password" required v-model="user.password"></md-input>
          </md-input-container>

          <div class="error" v-show="message">
            <md-icon>
              warning
            </md-icon>
            <span class="message">{{message}}</span>
          </div>

        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-primary" @click.native="closeLoginDialog">Cancel</md-button>
          <md-button :disabled="!formValidation" class="md-primary" @keyup.enter="login" @click.native="login">Login</md-button>
        </md-dialog-actions>
      </form>
    </md-dialog>


     <md-dialog ref="about">
      
        <md-dialog-title>
          Хто зробив
        </md-dialog-title>

        <md-dialog-content>

         Гавриленко Денис Євгенович, ТМ-32

        </md-dialog-content>

     
      
    </md-dialog>
  </div>
</template>

<script src="./navbar.js"></script>

<style lang="less" scoped src="./navbar.less"></style>