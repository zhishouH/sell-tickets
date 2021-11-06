<template>
  <div>
    <div class="center-info">
      <div class="login">
        <div class="avatar iconfont icon-mine"></div>
        <p @click="handleClickLogin()">立即登录</p>
      </div>
    </div>
    <div class="center-order-tab">
      <div>
        <span class="span-film iconfont icon-065chakandingdan"></span>
        <p class="order">电影订单</p>
      </div>
      <div>
        <span class="span-commodity iconfont icon-dingdan"></span>
        <p class="order">商品订单</p>
      </div>
    </div>
    <div class="center-set">
      <div>
        <span class="iconfont icon-quan"></span>
        <p class="quan">卖座券</p>
        <span class="iconfont icon-icon-test5"></span>
      </div>
      <div>
        <span class="set-icon iconfont icon-hongbao"></span>
        <p class="quan">组合红包</p>
        <span class="iconfont icon-icon-test5"></span>
      </div>
      <div>
        <span class="set-icon iconfont icon-zhanghuyue"></span>
        <p class="quan">余额</p>
        <span class="iconfont icon-icon-test5"></span>
      </div>
      <div>
        <span class="set-icon iconfont icon-31shezhi"></span>
        <p class="quan">设置</p>
        <span class="iconfont icon-icon-test5"></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleClickLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.center-info {
  position: relative;
  width: 100%;
  height: 350px;
  background: url('../assets/centerbj.png')  no-repeat top left;
  background-size: 100% 350px;

  .login {
    position: absolute;
    top: 140px;
    left: 80px;
    width: 300px;
    height: 120px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: start;
    align-items: center;

    .avatar {
      box-sizing: border-box;
      width: 120px;
      height: 120px;
      line-height: 110px;
      text-align: center;
      font-size: 70px;
      border-radius: 50%;
      border: 4px solid #eee;
      color: #eee;
    }

    p {
      font-size: 30px;
      color: #eee;
      margin-left: 30px;
    }
  }
}

.center-order-tab {
  width: 100%;
  height: 120px;
  background-color: #fff;
  padding-top: 40px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;

  div {
    width: 200px;
    height: 120px;
    text-align: center;

    .span-film {
      font-size: 60px;
      color: rgb(255, 200, 47);
    }

    .span-commodity {
      font-size: 60px;
      color: rgb(199, 219, 96);
    }

    .order {
      margin-top: 4px;
      font-size: 26px;
      color: #999;
    }
  }
}

.center-set {
  box-sizing: border-box;
  width: 100%;
  height: 400px;
  margin-top: 20px;
  padding: 0 20px;
  background-color: #fff;

  div {
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    line-height: 100px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    border-bottom: 1px solid #f5f5f5;

    .icon-quan {
      font-size: 40px;
      color: rgb(255, 190, 172);
    }

    .icon-hongbao {
      font-size: 40px;
      color: rgb(197, 177, 143);
    }

    .icon-zhanghuyue {
      font-size: 40px;
      color: rgb(255, 210, 134);
    }

    .icon-31shezhi {
      font-size: 40px;
      color: rgb(192, 209, 99);
    }

    .quan {
      width: 80%;
      font-size: 30px;
      text-align: left;
    }
  }
}

</style>
