<template>
  <div class="content">
    <div class="topBtn">
      <a-button @click="() => $router.back()">返回</a-button>&nbsp;
      <a-button @click="form={}">重置</a-button>&nbsp;
      <a-button class="btn-a" @click="add('0')">保存</a-button>&nbsp;
      <a-button class="btn-a" @click="add('1')">提交</a-button>
    </div>
    <div class="form">
      <a-form-model
        :model="form"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
      >
        <a-row>
          <a-col :span="12">
            <a-form-model-item
              prop="title"
              label="标题"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-input
                style="width: 100%"
                v-model="form.title"
                placeholder="请填写标题"
              />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-model-item
              prop="solicitationType"
              label="征集类型"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-select v-model="form.solicitationType">
                <a-select-option
                  v-for="item in collectTypeDict"
                  :value="item.dictValue"
                  :key="item.dictCode"
                  >{{ item.dictLabel }}</a-select-option
                >
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-model-item
              prop="solicitationUnit"
              label="征集单位"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-input
                style="width: 100%"
                v-model="form.solicitationUnit"
                placeholder="请填写征集单位名称"
              />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="6">
            <a-form-model-item
              prop="startDate"
              label="开始时间"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-date-picker
                style="width: 100%"
                valueFormat="YYYY-MM-DD"
                @change="(val, str) => (form.startDate = str)"
                v-model="form.startDate"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item
              prop="endDate"
              label="结束时间"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-date-picker
                style="width: 100%"
                valueFormat="YYYY-MM-DD"
                @change="(val, str) => (form.endDate = str)"
                v-model="form.endDate"
              />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="6">
            <a-form-model-item
              prop="contacts"
              label="联系人"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input
                style="width: 100%"
                v-model="form.contacts"
                placeholder="请填写联系人"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item
              prop="contactsPhone"
              label="联系方式"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input
                style="width: 100%"
                v-model="form.contactsPhone"
                placeholder="请填写联系方式"
              />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="6">
            <a-form-model-item
              prop="user"
              label="征集函"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-radio-group v-model="value">
                <a-radio value="模板">模板</a-radio>
                <a-radio value="上传文件">上传文件</a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item
              prop="phone"
              :wrapper-col="{ span: 16, offset: 8 }"
            >
              <a-select>
                <a-select-option value="1">模板</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24">
            <a-form-model-item
              prop="context"
              :wrapper-col="{ span: 16, offset: 2 }"
            >
              <VueEditor v-model="form.context" />
              <a-button class="btn-b">下载</a-button>
              <a-button class="btn-a">预览</a-button>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-model-item
              prop="collectionChannels"
              label="征集渠道"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-radio-group v-model="form.collectionChannels">
                <a-radio value="1">人大网</a-radio>
                <a-radio value="2">平台</a-radio>
              </a-radio-group>
              <a-button class="btn-a" @click="showModal">选择人员</a-button>
              <a-modal
                :centered="true"
                v-model="visible"
                title="添加小组成员"
                @ok="handleOk"
                :width="950"
              >
                <div class="faterBox">
                  <div class="left">
                    <div class="search">
                      <a-form-model layout="inline" :model="formInline">
                        <a-form-model-item label="用户名">
                          <a-input style="width:130px;vertical-align: middle;" v-model.trim="formInline.userName" placeholder="请输入"> </a-input>
                        </a-form-model-item>
                        <a-form-model-item label="部门">
                          <a-tree-select
                            style="width: 200px;vertical-align: middle;"
                            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                            :tree-data="deptOptions"
                            :replaceFields="replaceFields"
                            tree-default-expand-all
                            placeholder="请选择"
                            @select="onSelect"
                          >
                          </a-tree-select>
                        </a-form-model-item>

                        <a-form-model-item>
                          <a-button type="primary" style="vertical-align: middle;">查询</a-button>
                        </a-form-model-item>
                      </a-form-model>
                    </div>
                    <!-- 表格 -->
                    <div class="table">
                      <a-table
                        :pagination="false"
                        :row-selection="rowSelection"
                        :columns="columns"
                        :data-source="dataSource"
                        :scroll="{ y: 292 }"
                        rowKey="userId"
                      >
                      </a-table>
                    </div>

                    <!-- 分页器 -->
                    <a-pagination
                      class="ant-table-pagination"
                      show-size-changer
                      :current="formInline.pageNum"
                      :total="total"
                      :page-size="formInline.pageSize"
                      :showTotal="total => `共 ${total} 条`"
                      @change="onPageNum"
                      @showSizeChange="onPageSize"
                    />
                  </div>
                  <div class="right">
                    <div class="top">
                      <span>已选人员</span>
                      <span>{{ selectedList.length }}人</span>
                    </div>
                    <!-- 下 -->
                    <div class="bottom">
                      <ul>
                        <li v-for="item in selectedList" :key="item.userId">
                          {{ item.nickName }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </a-modal>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
  </div>
</template>

<script>
//富文本编辑器
import { VueEditor } from "vue2-editor";
import { collectTypeDict,Detail,addLegislationCollect,editLegislationCollect,treeselect,listUser } from "@/api/legislationCollect";
let personData = []; // 非响应式数据,存放组员
let editKey = [];
export default {
  name: "legislationCollectDetail",
  components: {
    VueEditor,
  },
  data() {
    return {
      form: {},
      total: undefined,
      formInline: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phoneNumber: undefined,
        status: undefined,
        deptId: undefined,
      },
      visible: true,
      //征集类型字典
      collectTypeDict: undefined,
      value: "模板", // 征集函v-model
      // 部门树
      deptOptions: [],
      replaceFields: {
        children: 'children',
        title: 'label',
        key: 'id',
        value: 'id',
      },
      //表头
      columns: [
        {
          title: '用户名',
          dataIndex: 'userName',
          align: 'center',
        },
        {
          title: '姓名',
          dataIndex: 'nickName',
          align: 'center',
        },
        {
          title: '部门',
          align: 'center',
          dataIndex: 'dept.deptName',
        },
        {
          title: '联系方式',
          align: 'center',
          dataIndex: 'phoneNumber',
        },
      ],
      //表数据
      //   表格
      dataSource: [],
      // 已选中成员
      selectedList: [],
      selectedSon: [],
    };
  },
  computed: {
    // 小组成员单选框
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          /*  console.log(
            // 显示index
            // `selectedRowKeys: ${selectedRowKeys}`,
            // 显示勾选中数据
            'selectedRows: ',
            selectedRows
          ) */
          this.selectedSon = selectedRows;
          this.selectedList = [...editKey, ...this.selectedSon];
          console.log('已选', this.selectedList)
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          },
        }),
      };
    },
  },
  methods: {
    //选择人员弹窗
    showModal() {
      this.visible = true;
    },
    //选择人员框点击确定
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },

    // 获取部门树,下拉菜单
    async getDeptOptions() {
      treeselect().then(response => {
        // console.log(response,'ces')
        this.deptOptions = response.data.data;
      });
    },
    // 点击部门下拉菜单
    onSelect(data) {
      // console.log("下拉", data);
      this.formInline.deptId = data;
    },
    // 获取用户列表并渲染
    async getUserList() {
      const data = await listUser(this.formInline);
      console.log(data)
      this.total = data.data.total;
      // personData = rows;
      // 渲染过滤后的列表
      this.dataSource = data.data.rows;
      // console.log('用户列表', this.data)
    },
    // 点击分页器
    onPageNum(data) {
      this.formInline.pageNum = data;
      this.getUserList();
    },
    // 点击分页器每页显示条数
    onPageSize(current, pageSize) {
      // console.log("分页器", current, pageSize);
      this.formInline.pageSize = pageSize;
      this.getUserList();
    },

    //获取征集类型字典
    async init() {
      const { data } = await collectTypeDict();
      // console.log(data);
      this.collectTypeDict = data.data || [];
    },
    //详情
    async getDetail() {
      // console.log(this.$route.query.id)
      if(this.$route.query.id) {
        const res = await Detail(this.$route.query.id)
        console.log(res)
        this.form = res.data.data || {};
      }     
    },

    //新增或保存
    async add(type) {
      this.form.state = type;
      //有id是编辑
      if(this.form.id) {
        await editLegislationCollect(this.form)
      } else {
        //没id是新增
        await addLegislationCollect(this.form);
      }
      this.$router.go(-1);
    },

    // 修改数据key
    setKey(data) {
      editKey = data.map(item => {
        return {
          nickName: item.personName,
          phoneNumber: item.personPhone,
          userId: item.userId,
          dept: {
            deptName: item.personDept,
          },
        };
      });
      this.selectedList = [...editKey];
    },
  },
  
  created() {
    this.init();
    this.getDetail();
    this.getDeptOptions();
    this.getUserList();
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 30px;
  .topBtn {
    margin-bottom: 20px;
  }
  .btn-a {
    background: rgb(220, 36, 28);
    color: #fff;
    border: 1px solid rgb(220, 36, 28);
  }
  .btn-b {
    background-color: rgb(255, 141, 26);
    border: rgb(255, 141, 26);
    color: #fff;
    margin-right: 10px;
  }
}

.faterBox {
  display: flex;
  .left {
    width: 580px;
    // height: 300px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin-right: 20px;
    .search {
      margin-left: 20px;
    }
  }
  .right {
    width: 300px;
    // height: 300px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    .top {
      display: flex;
      justify-content: space-between;
      padding: 0 6px 0 8px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      height: 46px;
      line-height: 46px;
    }
    .bottom {
      ul {
        padding: 13px 0 0 12px;
        li {
          list-style-type: none;
          font-size: 20px;
        }
      }
    }
  }
}
</style>