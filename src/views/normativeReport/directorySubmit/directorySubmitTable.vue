<template>  
  <div class="main">

    <!-- 内容 -->
    <div class="content">
      <div class="content-top">规范性文件报备 / 文件报备(自治区)</div>
      <div class="content-main">
        <div class="content-main-left">
          <a-button class="ant-btn" @click="add()">新增</a-button>
        </div>
        <div class="content-main-right">
          <!-- <a-input-search placeholder="请输入标题" style="width: 200px;" /> -->
          <span style="font-size:16px;color: rgba(0, 0, 0, 0.85);">年度：</span>
          <a-select allow-clear placeholder="请选择" style="width: 200px">
            <a-select-option value="1">1</a-select-option>
            <a-select-option value="2">2</a-select-option>
            <a-select-option value="3">3</a-select-option>
          </a-select>
          <a-button class="ant-btn1">搜索</a-button>

          <!-- 高级搜索 -->
          <!-- <a-popover trigger="click" placement="bottomRight">
            <template slot="content">
              <div class="hight-level-search_box">
                <a-form>
                  <a-row :gutter="24">
                    <a-col :span="8">
                      <a-form-model-item
                        label="文件名称:" 
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 12 }"  
                      >
                        <a-input class="ant-input1" allow-clear placeholder="请输入" />
                      </a-form-model-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-model-item
                        label="制定机关:" 
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 12 }"    
                      >
                        <a-input class="ant-input1" allow-clear placeholder="请输入" />
                      </a-form-model-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-model-item
                        label="文件类型:"
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 12}"     
                      >
                        <a-select allow-clear placeholder="请选择" style="width: 200px">
                          <a-select-option value="1">1</a-select-option>
                          <a-select-option value="2">2</a-select-option>
                          <a-select-option value="3">3</a-select-option>
                        </a-select>
                      </a-form-model-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="24">
                    <a-col :span="8">
                      <a-form-model-item
                        label="备案报告文号:" 
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 12 }"  
                      >
                        <a-input class="ant-input1" allow-clear placeholder="请输入" />
                      </a-form-model-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-model-item
                        label="报备单位:" 
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 12 }"    
                      >
                        <a-input class="ant-input1" allow-clear placeholder="请输入" />
                      </a-form-model-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-model-item
                        label="制定形式:"
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 12 }"     
                      >
                        <a-select allow-clear placeholder="请选择" style="width: 200px">
                          <a-select-option value="1">1</a-select-option>
                          <a-select-option value="2">2</a-select-option>
                          <a-select-option value="3">3</a-select-option>
                        </a-select>
                      </a-form-model-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="24">
                    <a-col :span="8">
                      <a-form-model-item
                        label="年度:"
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 12 }"     
                      >
                        <a-select allow-clear placeholder="请选择" style="width: 200px">
                          <a-select-option value="1">1</a-select-option>
                          <a-select-option value="2">2</a-select-option>
                          <a-select-option value="3">3</a-select-option>
                        </a-select>
                      </a-form-model-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-model-item
                        label="报备情况:"
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 12 }"     
                      >
                        <a-select allow-clear placeholder="请选择" style="width: 200px">
                          <a-select-option value="1">1</a-select-option>
                          <a-select-option value="2">2</a-select-option>
                          <a-select-option value="3">3</a-select-option>
                        </a-select>
                      </a-form-model-item>
                    </a-col>
                  </a-row>
                </a-form>
              </div>
            </template>
            <a-button>
              高级搜索
            </a-button>
          </a-popover> -->
        </div>
      </div>

      <!-- 表格 -->
      <div class="report-table">
        <div>
          <span style="margin-left: 8px">
            <template v-if="hasSelected">
              {{ `Selected ${selectedRowKeys.length} items` }}
            </template>
          </span>
        </div>
        <a-table
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          :columns="columns"
          :data-source="SourceList"
          :pagination="false"
        >
          <!-- 插槽去拼接字符串 -->
          <template slot="action" slot-scope="text, record">
            <span>{{record.annual+'年'}}</span>
          </template>
          <span slot="operation" slot-scope="text, record">
            <a
              v-for="(item, index) of btnVisible(record)"
              :key="item"
              @click="handleBtn(item, record)"
            >
              {{ item }}
              <a-divider type="vertical" v-if="index + 1 !== btnVisible(record).length" />
            </a>
          </span>
        </a-table>
      </div>

      <!-- 分页器 -->
      <div class="page">
        <a-pagination
          show-size-changer
          :default-current="1"
          :total="100"
          @showSizeChange="onShowSizeChange"
        />
      </div>
            
    </div>
  </div>
</template>

<script>

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    width: "5%",
    ellipsis: true,
    align: "center",
    customRender: (text, record, index) => `${index + 1}`,
  },
  {
    title: '报送年度',
    dataIndex: 'annual',
    ellipsis: true,
    align: "center",
    scopedSlots: {customRender: "action"}
  },
  {
    title: '报送单位名称',
    ellipsis: true,
    align: "center",
    dataIndex: 'unitName',
  },
  {
    title: '报送时间',
    ellipsis: true,
    align: "center",
    dataIndex: 'submitDay',
  },
  {
    title: '文件数量',
    dataIndex: 'fileNum',
  },
  {
    title: '状态',
    ellipsis: true,
    align: "center",
    dataIndex: 'state',
  },
  {
    title: '操作',
    key: 'operation',
    ellipsis: true,
    align: "center",
    // fixed: 'right',
    width: 200,
    scopedSlots: { customRender: 'operation' },
  },
];
export default {
  name: "directorySubmitTable",
  data() {
    return {
      pageSize: 10,
      current: 1,
      selectedRowKeys: [], 
      columns,
      rootSubmenuKeys: ['sub1', 'sub2'],
      openKeys: ['sub1'],
      SourceList: [
        {
          annual: '2022',
          unitName: '伊犁哈萨克自治州人民政府',
          submitDay: '2022-10-31',
          fileNum: '2件',
          state: '已报送',
          taskStatus: '1',
          key: 1,
        },
        {
          annual: '2022',
          unitName: '伊犁哈萨克自治州人民政府',
          submitDay: '2022-10-31',
          fileNum: '2件',
          state: '已报送',
          taskStatus: '2',
          key: 2,
        },
        {
          annual: '2020',
          unitName: '伊犁哈萨克自治州人民政府',
          submitDay: '2022-10-31',
          fileNum: '2件',
          state: '已报送',
          taskStatus: '3',
          key: 3,
        },
        {
          annual: '2019',
          unitName: '伊犁哈萨克自治州人民政府',
          submitDay: '2022-10-31',
          fileNum: '2件',
          state: '已报送',
          taskStatus: '4',
          key: 4,
        },
        {
          annual: '2018',
          unitName: '伊犁哈萨克自治州人民政府',
          submitDay: '2022-10-31',
          fileNum: '3件',
          state: '已报送',
          taskStatus: '5',
          key: 5,
        },
      ],
      // 按钮列表
      btnList: [
        {
          state: '1', // 起草
          permission: ['编辑', '删除'],
        },
        {
          state: '2', // 锁定
          permission: ['申请撤回'],
        },
        {
          state: '3', // 归档
          permission: ['查看'],
        },
        {
          state: '4', // 归档
          permission: ['报送'],
        },
        {
          state: '5', // 归档
          permission: ['撤回'],
        },
      ],
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  methods: {
    start() {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    // 点击操作按钮
    handleBtn(btn, record) {
      let fnObj = {
        查看: this.checkLaw,
        编辑: this.editLaw,
        锁定: this.lockLaw,
        解锁: this.unLockLaw,
        归档: this.archiveLaw,
        删除: this.delLaw,
      };
      fnObj[btn](record);
    },
    // 根据状态权限__显示不同的按钮
    btnVisible(row) {
      const obj = this.btnList.filter(item => item.state === row.taskStatus);
      if (obj.length > 0) {
        return obj[0].permission;
      }
    },

    //点击切换页码
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
    },

    //打开下拉菜单
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },

    //新增
    add() {
      this.$router.push({path: '/main/directorySubmitForm'})
    },
  },
};
</script>

<style lang="scss" scoped>
/*用伪类元素after清除浮动样式*/
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

::v-deep.ant-input1{
  width: 200px;
}
//深度修改antdv的input宽度
// ::v-deep .ant-input{
//   width: 240px;
// }

.main {
  height: 900px;
  background-color: #f0f2f5;
  display: flex;
  
  .content {
    width: 1770px;
    height: 800px;
    background-color: #fff;
    overflow: auto;
    // margin-left: 30px;
    // position: absolute;
    // right: 20px;
    // top: 0;
    // margin-bottom: 50px;
    .content-top {
      background-color: #f0f2f5;
      height: 50px;
      line-height: 50px;
    }
    .content-main {
      margin-top: 20px;
      height:50px;
      line-height: 50px;
      // border: 1px solid blue;
      justify-content: space-between;
      display: flex;
      .content-main-left {
        .ant-btn {
          background-color: rgba(220, 36, 28, 1);
          color: #fff;
          margin: 0 20px;
        }
        span {
          font-size: 14px;
          margin-right: 20px;
        }
      }
      .content-main-right {
        margin-right: 20px;
        .ant-btn1 {
          background-color: rgba(220, 36, 28, 1);
          color: #fff;
          margin: 0 20px;
        }
        .hight-level-search_box {

        }
      }
    }
    .report-table {
      // width: 1700px;
      margin: 0px 20px;
    }
  }

  .page {
    justify-content: end;
    display: flex;
    margin-right: 25px;
  }
}
</style>