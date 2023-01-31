<template>
  <div class="home">
    <a-layout>
      <a-layout-header>
        <Header />
      </a-layout-header>
      <a-layout>
        <a-layout-sider style="min-width: 256px;">
          <Menu />
        </a-layout-sider>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>   
  </div>  
</template>

<script>
import Header from '@/components/Header'
import Menu from '@/components/Menu'
export default {
  name: "Home",
  components: {
      Header,
      Menu,
  },
};
</script>

<style lang="scss" scoped>
::v-deep .ant-layout-header {
  padding: 0;
  // margin: 0;
  height: 96px;
  line-height: 100%;
}
::v-deep .ant-layout-sider {

  margin-right: 20px;
  background-color: #fff;

}
::v-deep .ant-layout-content {
  margin-top: 20px;
  background-color: #fff;
  /*  padding: 20px; */
}
.home{
  background-color: #f0f2f5;
}
</style>