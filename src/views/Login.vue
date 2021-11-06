<template>
  <div class="login">
    <div class="logo">
      <img src="@/assets/logo.png">
    </div>
    <div class="login-from">
      <input
        type="text"
        placeholder="手机号"
      >
      <input
        type="password"
        placeholder="验证码"
      >
    </div>
    <button>登录</button>
  </div>
</template>
<script>
export default {
  beforeMount () {
    this.$store.commit('SET_IS_HIDDEN_TABBAR', false)
  },
  destroyed () {
    this.$store.commit('SET_IS_SHOW_TABBAR', true)
  }
}
</script>
<style lang="scss" scoped>

.login {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-flow: column nowrap;
  justify-content: start;
  align-items: center;

  .logo {
    width: 200px;
    height: 240px;
    margin-top: 200px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .login-from {
    box-sizing: border-box;
    width: 80%;
    height: 250px;
    margin: 50px 0;

    input {
      width: 100%;
      height: 100px;
      outline: none;
      border: none;
      margin-bottom: 30px;
    }
  }

  button {
    width: 80%;
    height: 80px;
    color: #eee;
    font-size: 34px;
    border-radius: 8px;
    background-color: tomato;
    border: 1px solid tomato;
  }
}
</style>
