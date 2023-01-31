<template>
  <!-- 论证评估表单 -->
  <div>
    <div style="margin-bottom: 20px">
      <a-button class="btnHover" @click="() => $router.back()">返回</a-button>&nbsp;&nbsp;
      <a-button class="btn">保存</a-button>&nbsp;&nbsp;
      <a-button class="btn">提交</a-button>
    </div>
    论证评估
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.btn {
  color: #fff;
  background: red
}
.btn:hover {
  border: 1px solid red;
}
.btnHover:hover {
  border: 1px solid red;
  color: red;
}
</style>