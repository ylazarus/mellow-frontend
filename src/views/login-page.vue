
<template>
  <section class="login-page-container">
    <h1>Welcome, please log in or sign up!</h1>
    <router-link to="/board">WorkSpace</router-link>|
    <router-link to="/about">About</router-link>

    <button v-if="loggedinUser" @click="doLogout">Logout {{ loggedinUser.username }}</button>
    <br />
    <router-link to="/board" v-if="loggedinUser">To WorkSpace</router-link>
    <section v-else>
      <form v-if="isSignIn" @submit.prevent="doLogin">
        <input type="text" v-model="loginCred.username" placeholder="Enter username" />
        <input type="text" v-model="loginCred.password" placeholder="Enter password" />
        <button>Login</button>
      </form>
      <button @click="toggleLoginSignUp">{{ loginSignUpButton }}</button>
      <br />
      <form v-if="!isSignIn" @submit.prevent="doSignup">
        <input type="text" v-model="signupCred.fullname" placeholder="Enter your full name" />
        <input type="text" v-model="signupCred.username" placeholder="Enter username" />
        <input type="text" v-model="signupCred.password" placeholder="Enter password" />
        <button>Login</button>
      </form>
      <h3>Guest Login:</h3>
      <button @click="guestLogin">Login as Guest</button>
    </section>
  </section>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      loginCred: { username: "", password: "" },
      signupCred: { fullname: "", username: "", password: "" },
      isSignIn: true,
      msg: "",
    };
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    loginSignUpButton() {
      return (this.isSignIn) ? 'Or Sign Up' : 'Back To Login'
    }
  },
  created() {
    this.loadUsers()
  },
  methods: {
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = "Please enter username/password";
        return;
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred });
        this.$router.push("/board");
      } catch (err) {
        this.msg = "Failed to login";
      }
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
    },
    async doSignup() {
      if (
        !this.signupCred.fullname ||
        !this.signupCred.password ||
        !this.signupCred.username
      ) {
        this.msg = "Please fill out all of the form details";
        return;
      }
      try {
        await this.$store.dispatch({
          type: "signup",
          userCred: this.signupCred,
        });
        this.$router.push("/board");
      } catch (err) {
        this.msg = "Failed to sign up new user";
      }
    },
    toggleLoginSignUp() {
      this.isSignIn = !this.isSignIn
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: "removeUser", userId });
        this.msg = "User removed";
      } catch (err) {
        this.msg = "Failed to remove user";
      }
    },
    async guestLogin() {
      try {
        await this.$store.dispatch({
          type: "login",
          userCred: { username: "Guest", password: "123" },
        });
        this.$router.push("/board");
      } catch (err) {
        console.log(err);
        this.msg = "Failed to do guest login";
      }
    },
    loadUsers() {
      this.$store.dispatch({ type: "loadUsers" });
    },
  },
};
</script>