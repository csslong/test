<template>
  <div class="header">
    <div class="header-one">
      <div class="header-one-left">
        <img src="https://img.js.design/assets/img/62c7d1cd7d43e163be7346a9.png" alt="" width="32px" height="32px">
        <span style="margin-left: 15px;">智慧立法工作平台</span>
      </div>
      <div class="header-one-right">
        <div class="a">1</div>
        <div class="b">2</div>
        <div class="c">
          <img src="@/assets/user.jpg" alt="">
          <span>管理员</span>
        </div>
      </div>
    </div>
    <div class="header-two">
      <ul class="clearfix">
        <li><a><i>1</i>全流程管理</a></li>
        <li><a><i>2</i>智能辅助</a></li>
        <li><a><i>3</i>备案审查</a></li>
        <li><a><i>4</i>基础支撑</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="scss" scoped>

.header {
  background-color: #fff;
  .header-one {
    height: 48px;
    width: 100%;
    // border: 1px solid red;
    justify-content: space-between;
    align-items: center;
    display: flex;
    .header-one-left {
      margin-left: 24px;
      height: 32px;
    }
    .header-one-right {
      margin-right: 24px;
      height: 24px;
      // width: 300px;
      border: 1px solid blue;
      display: flex;
      align-items: center;
      .a {
        width: 20px;
        height: 20px;
        border: 1px solid red;
      }
      .b {
        width: 20px;
        height: 20px;
        border: 1px solid red;
        margin-left: 10px;
      }
      .c {
        width: 80px;
        height: 20px;
        // border: 1px solid red;
        margin-left: 10px;
        display: flex;
        align-items: center;
        img {
          width: 20px;
          height: 20px;
          // background-color: blue;
          margin-right: 10px;
          border-radius: 50%;
        }
      }
    }
  }
  .header-two {
    height: 48px;
    background: rgba(220, 36, 28, 1);
    // align-items: center;
    line-height: 48px;
    // display: flex;
    ul {
      list-style: none;
      // border: 1px solid blue;
      display: block;
      li {
        float: left;
        // border: 1px solid blue;
        
        a {
          list-style: none;
          display: block;
          color: #fff;
          padding: 0px 20px;
          i {
            font-style: normal;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>