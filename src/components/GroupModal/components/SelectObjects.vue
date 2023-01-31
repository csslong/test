<!--
 * @Descripttion: 选择征集对象
 * @version: 
 * @Author: lulongbin
 * @Date: 2022-7-11 09:40:04
 * @LastEditors: lulongbin
 * @LastEditTime: 2022-7-11 09:40:06
-->

<template>
  <div class="selectObjects">
    <a-menu style="width: 125px" mode="inline">
      <a-menu-item key="1" @click='titleClick'>
        <span>平台用户</span>
      </a-menu-item>

      <a-menu-item key="2" @click='titleClick'>
        <span>人大代表</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
    methods:{
        titleClick(val){
            console.log('标题',val);
        }
    }
};
</script>

<style lang="scss" scoped>
.selectObjects {
    height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  margin-right: 10px;
}
</style>
