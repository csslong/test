<template>
  <div style="width: 256px">
    
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['sub1']"
      mode="inline"
      :inline-collapsed="collapsed"
    >
      <!-- 有子菜单 -->
      <a-sub-menu :key="item.key" v-for="item in hasChildren">
        <span slot="title"><a-icon :type="item.icon" /><span>{{item.label}}</span></span>
        <a-menu-item @click="clickMenu(subItem)"  v-for="subItem in item.children" :key="subItem.path">
          {{subItem.label}}
        </a-menu-item>
      </a-sub-menu>

      <!-- 无子菜单 -->
      <a-menu-item @click="clickMenu(item)"  v-for="item in noChildren" :key="item.path">
        <a-icon type="pie-chart" />
        <span>{{item.label}}</span>
      </a-menu-item>
         
    </a-menu>
  </div>

</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      collapsed: false,
      //菜单列表
      menu: [     
        {
          label: "规范性文件报备",
          icon: "folder",
          // path: '/home',
          
          children: [
            {
              path: "reportFileTable",
              name: "reportFileTable",
              label: "文件报备",
              icon: "menu",
            },
            {
              path: "directorySubmitTable",
              name: "directorySubmitTable",
              label: "目录报送",
              icon: "menu",        
            },
            {
              path: "test",
              name: "test",
              label: "测试",
              icon: "menu",
            },
            
          ],
        },
        {
          // path: "//",
          // name: "file",
          label: "年度立法计划",
          icon: "form",
          key: 'sub1',
          // url: "UserManage/UserManage",
          children: [
            {
              path: "outSidePlan",
              name: "outSidePlan",
              label: "规划外项目",
              icon: "menu",
            },
            {
              path: "legislationCollect",
              name: "legislationCollect",
              label: "立法计划项目报送",
              icon: "menu",
            },
            {
              path: "planManage",
              name: "planManage",
              label: "立法计划管理",
              icon: "menu",
            },
          ]
        },
        {
          label: "立法评估",
          icon: "trophy",
          // key: 'sub1',
          children: [
            {
              path: "taskAdmin",
              name: "taskAdmin",
              label: "评估任务管理",
              icon: "menu",
            },
          ]
        }
      ],
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },

    //点击菜单路由跳转
    clickMenu(item) {
      // console.log(item)
      this.$router.push({
        name: item.name
      })
    }
  },
  computed: {
    //无子菜单
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    //有子菜单
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
  },
}
</script>

<style lang="scss" scoped>
.ant-menu {
  height: 100vh;
  border: none;
}
</style>