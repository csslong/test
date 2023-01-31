<template>
  <div class="layout">
    办理详情页
    <div class="layout-top">
      <div style="display: flex;align-items: center;">
        <div class="mouse" @click="onChange('collection')">
          <div class="valueType active">
            <div class="minRadio activeRadio"></div>
          </div>
          <span class="valueText activeText">意见征集</span>
        </div>
        <div :class="taskState>1?'line lineActive':'line'"></div>
      </div>
      
      <div style="display: flex;align-items: center;">
        <div :class="taskState>=3?'mouse':'mouseNoClick'">
          <div :class="taskState>=2?'mouse':'disabled'" @click="onChange('assessment')">
            <div :class="taskState>=2?'valueType active':'valueType'">
              <div :class="taskState>=2?'minRadio activeRadio':'minRadio'"></div>
            </div>
            <span :class="taskState>=2?'valueText activeText':'valueText'">论证评估</span>
          </div>
        </div>
        <div :class="taskState>2?'line lineActive':'line'"></div>
      </div>


      <div :class="taskState>=3?'mouse':'mouseNoClick'">
        <div :class="taskState>=3?'mouse':'disabled'" @click="onChange('result')">
          <div :class="taskState>=3?'valueType active':'valueType'">
            <div :class="taskState>=3?'minRadio activeRadio':'minRadio'"></div>
          </div>
          <span :class="taskState>=3?'valueText activeText':'valueText'">结果发布</span>
        </div>    
      </div>
    </div>

    <!-- 动态组件 -->
    <component :is="comName"></component>
  </div>
</template>

<script>
import assessment from './components/assessment.vue'
import collection from './components/collection.vue'
import result from './components/result.vue'
export default {
  name: 'taskAdminDetail',
  data() {
    return {
      //当前动态组件的名称
      comName: 'collection',
      //控制流程显示的状态值
      taskState: 1
    }
  },
  created() {
    this.getRouter();
  },
  methods: {
    //切换流程节点
    onChange(record) {
      // console.log(record);
      this.comName = record;
    },

    //获取路由传递的参数,渲染流程组件
    getRouter() {
      // console.log(this.$route.query.state)
      this.taskState = this.$route.query.state;
      if(this.taskState==2) {
        this.comName = 'assessment';
      }
      if(this.taskState==3) {
        this.comName = 'result';
      }
    }
  },
  components: {
    assessment,
    collection,
    result
  },
}
</script>

<style lang="scss" scoped>
.layout {
  padding: 20px;
  .layout-top {
    display: flex;
    justify-content: center;
    padding: 50px 0;
    align-items: center;
    // margin-bottom: 20px;

    //不可点击状态
    .disabled {
      pointer-events: none; 
    }
    //鼠标显示手
    .mouse {
      cursor: pointer;
    }
    //鼠标显示不可点击
    .mouseNoClick {
      cursor: not-allowed;
    }
    .valueType {
      height: 40px;
      width: 40px;
      border: 2px solid #cccccc;
      border-radius: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      .minRadio {
        width: 20px;
        height: 20px;
        border-radius: 50px;
        background-color: #cccccc;
      }
      .activeRadio {
        background-color: red;
      }
    }
    .active {
      border: 2px solid red;
    }
    
    .valueText {
      text-align: center;
    }
    .activeText {
      color: red;
    }
    .line {
      width: calc(20vw);
      height: 2px;
      background: #cccccc;
      margin: 0 10px 20px 10px;
    }
    .lineActive {
      background: red;
    }
    
  }
}
</style>