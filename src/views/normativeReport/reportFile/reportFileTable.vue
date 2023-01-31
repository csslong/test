<template>  
  <div class="main">
  
    <!-- 内容 -->
    <div class="content">
      <div class="content-top">规范性文件报备 / 文件报备(自治区)</div>
      <div class="content-main">
        <div class="content-main-left">
          <a-button class="ant-btn" @click="add()">电子报备</a-button>
          <span>快速查询:</span>
          <a-checkbox-group>
            <a-checkbox value='1'>全部</a-checkbox>
            <a-checkbox value='2'>未提交</a-checkbox>
            <a-checkbox value='3'>已提交</a-checkbox>
            <a-checkbox value='4'>已登记</a-checkbox>
          </a-checkbox-group>
        </div>
        <div class="content-main-right">
          <a-input-search placeholder="请输入标题" style="width: 200px;" />
          <a-button class="ant-btn1">搜索</a-button>

          <!-- 高级搜索 -->
          <a-popover trigger="click" placement="bottomRight">
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
          </a-popover>
        </div>
      </div>

      <!-- 表格 -->
      <div class="report-table">
        <div style="margin-bottom: 16px">
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
    ellipsis: true,
    align: "center",
    dataIndex: 'index',
    width: "5%",
    customRender: (text, record, index) => `${index + 1}`,
  },
  {
    title: '预警',
    ellipsis: true,
    align: "center",
    dataIndex: 'warning',
  },
  {
    title: '文件名称',
    ellipsis: true,
    align: "center",
    dataIndex: 'filename',
  },
  {
    title: '制定机关',
    ellipsis: true,
    align: "center",
    dataIndex: 'organ',
  },
  {
    title: '报备人',
    ellipsis: true,
    align: "center",
    dataIndex: 'name',
  },
  {
    title: '文件类型',
    ellipsis: true,
    align: "center",
    dataIndex: 'filetype',
  },
  {
    title: '制定形式',
    ellipsis: true,
    align: "center",
    dataIndex: 'develop',
  },
  {
    title: '公布日期',
    ellipsis: true,
    align: "center",
    dataIndex: 'publishedDay',
  },
  {
    title: '报备日期',
    ellipsis: true,
    align: "center",
    dataIndex: 'reportedDay',
  },
  {
    title: '报备情况',
    ellipsis: true,
    align: "center",
    dataIndex: 'reportedSituation',
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
  name: "reportFileTable",
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
          warning: '测试',
          filename: '克拉玛依市行政执法监督办法',
          organ: '新疆维吾尔自治区人大常委会',
          name: '张三三',
          filetype: '自治区政府规章',
          develop: '制定',
          publishedDay: '2022-7-26',
          reportedDay: '2022-7-26',
          reportedSituation: '未提交',
          key: 'one',
          taskStatus: '1',
        },
        {
          warning: '测试',
          filename: '克拉玛依市行政执法监督办法',
          organ: '新疆维吾尔自治区人大常委会',
          name: '张三三',
          filetype: '自治区政府规章',
          develop: '制定',
          publishedDay: '2022-7-26',
          reportedDay: '2022-7-26',
          reportedSituation: '未提交',
          key: 'two',
          taskStatus: '2',
        },
        {
          warning: '测试',
          filename: '克拉玛依市行政执法监督办法',
          organ: '新疆维吾尔自治区人大常委会',
          name: '张三三',
          filetype: '自治区政府规章',
          develop: '制定',
          publishedDay: '2022-7-26',
          reportedDay: '2022-7-26',
          reportedSituation: '未提交',
          key: 'three',
          taskStatus: '1',
        },
        {
          warning: '测试',
          filename: '克拉玛依市行政执法监督办法',
          organ: '新疆维吾尔自治区人大常委会',
          name: '张三三',
          filetype: '自治区政府规章',
          develop: '制定',
          publishedDay: '2022-7-26',
          reportedDay: '2022-7-26',
          reportedSituation: '未提交',
          key: 'four',
          taskStatus: '3',
        },
        {
          warning: '测试',
          filename: '克拉玛依市行政执法监督办法',
          organ: '新疆维吾尔自治区人大常委会',
          name: '张三三',
          filetype: '自治区政府规章',
          develop: '制定',
          publishedDay: '2022-7-26',
          reportedDay: '2022-7-26',
          reportedSituation: '未提交',
          key: 'five',
          taskStatus: '3',
        }
      ],
      // 按钮列表
      btnList: [
        {
          state: '1', // 起草
          permission: ['编辑', '删除'],
        },
        {
          state: '2', // 锁定
          permission: ['删除', '申请撤回'],
        },
        {
          state: '3', // 归档
          permission: ['查看'],
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

    //电子报备
    add() {
      this.$router.push({path:'/main/reportFileForm'})
    }
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
  height: 1000px;
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
      margin: 5px 20px;
    }
  }

  .page {
    justify-content: end;
    display: flex;
    margin-right: 25px;
  }
}

</style>