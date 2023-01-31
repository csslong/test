<template>
  <div class="plan">
    <div class="topBtn">
      <div class="topBtn-left">
        <div>
          <a-button style="color:#fff;background-color:#d10016"  @click="showModal">
            导入项目
          </a-button>&nbsp;&nbsp;
          <a-modal
            title="导入项目"
            :visible="visible"
            ok-text="确认"
            cancel-text="取消"
            @cancel="fileList = []"

          >
            <template slot="footer">
              <a-button key="back" @click="handleCancel">
                取消
              </a-button>
              <a-button key="submit" style="color:#fff;background-color:#d10016" :loading="loading" @click="onModalOk">
                确认
              </a-button>
            </template>
            
            <!-- 导入表单 -->
            <a-form-model-item
              label="本地上传"
              :labelCol="{ span: 10 }"
              :wrapperCol="{ span: 12 }"
            >
              <a-upload
                name="file"
                accept=".doc, .docx,.xlsx"
                :file-list="fileList"
                :multiple="false"
                :headers="headers"
                :remove="handleRemove"
                :before-upload="beforeUpload"
              >
                <a-button> <a-icon type="upload" /> 上传文件 </a-button>
              </a-upload>
            </a-form-model-item>
          </a-modal>
        </div>
        <div>
          <a-button style="color:#fff;background-color:#d10016" @click="add">添加项目</a-button>
        </div>
      </div>
      <div class="topBtn-right">
        <a-input-search v-model="search.submissionName" placeholder="请输入标题" style="width: 200px;vertical-align: middle;" />&nbsp;
        <a-button style="vertical-align: middle;background-color:#d10016;color:#fff;" class="ant-btn1" @click="findList">搜索</a-button>&nbsp;

        
        
        <!-- 高级搜索 -->
         <a-popover placement="bottomRight" v-model="visibleSearch" trigger="click">
            <div slot="content" class="content-screen">
              <a-form-model :form="searchForm">
                <a-row :gutter="24">
                  <a-col :span="8">
                    <a-form-model-item
                      label="项目类型" 
                      :label-col="{ span: 8 }"
                      :wrapper-col="{ span: 12 }"  
                    >
                      <a-select v-model="searchForm.type" allow-clear placeholder="请选择" style="width: 180px">
                        <a-select-option v-for="item in itemTypeRadio" :key="item.radio" :value="item.value">{{item.radio}}</a-select-option>
                        <!-- <a-select-option value="2">第二类项目</a-select-option>
                        <a-select-option value="3">第三类项目</a-select-option> -->
                      </a-select>
                    </a-form-model-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-model-item
                      label="制定形式" 
                      :label-col="{ span: 8 }"
                      :wrapper-col="{ span: 12 }"    
                    >
                      <a-select v-model="searchForm.formulationForm" allow-clear placeholder="请选择" style="width: 180px">
                        <a-select-option
                          v-for="item in DevelopFormDict"
                          :value="item.dictValue"
                          :key="item.dictCode"
                        >{{item.dictLabel}}</a-select-option>
                        <!-- <a-select-option value="2">修改</a-select-option>
                        <a-select-option value="3">废止</a-select-option> -->
                      </a-select>
                    </a-form-model-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-model-item
                      label="项目分类:"
                      :label-col="{ span: 8 }"
                      :wrapper-col="{ span: 12}"     
                    >
                      <a-select v-model="searchForm.classification" allow-clear placeholder="请选择" style="width: 180px">
                        <a-select-option
                          v-for="item in ItemDict"
                          :value="item.dictValue"
                          :key="item.dictCode"
                        >{{item.dictLabel}}</a-select-option>
                        <!-- <a-select-option value="2">政治建设方面</a-select-option>
                        <a-select-option value="3">文化建设方面</a-select-option>
                        <a-select-option value="3">社会建设方面</a-select-option>
                        <a-select-option value="3">生态文明建设方面</a-select-option> -->
                      </a-select>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row :gutter="24">
                  <a-col :span="8">
                    <a-form-model-item
                      label="起草单位:" 
                      :label-col="{ span: 8 }"
                      :wrapper-col="{ span: 12 }"  
                    >
                      <a-input v-model="searchForm.draftName" class="ant-input1" style="width:180px;" allow-clear placeholder="请输入" />
                    </a-form-model-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-model-item
                      label="状态:" 
                      :label-col="{ span: 8 }"
                      :wrapper-col="{ span: 12 }"    
                    >
                      <a-select allow-clear placeholder="请选择" style="width: 180px">
                        <a-select-option value="1">保存</a-select-option>
                        <a-select-option value="2">列入计划</a-select-option>
                        <a-select-option value="3">列入规划</a-select-option>
                        <a-select-option value="3">起草</a-select-option>
                        <a-select-option value="3">通过</a-select-option>
                      </a-select>
                    </a-form-model-item>
                  </a-col>     
                </a-row>
              </a-form-model>
              <div style="text-align: right">
                <a-button type="primary" @click="findList()" style="border:#d10016;;background-color:#d10016;color:#fff;"
                  >搜索</a-button
                >
                <a-button
                  @click="
                    searchForm = {};
                    findList();
                  "
                  >重置</a-button
                >
              </div>
            </div>
          <a-button style="vertical-align: middle;background-color:#d10016;color:#fff;">高级搜索</a-button>
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
        :row-key="record => record.id"
        :columns="columns"
        :loading="loading"
        :data-source="dataSource"
        :pagination="pagination"
        @change="handleTableChange"
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

  </div>
</template>

<script>
import { getPlanList, importItem, Delete,getItemDict, DevelopFormDict } from '@/api/plan.js';
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
    title: '项目类型',
    ellipsis: true,
    align: "center",
    dataIndex: 'typeName',
  },
  {
    title: '项目分类',
    ellipsis: true,
    align: "center",
    dataIndex: 'classificationName',
  },
  {
    title: '项目名称',
    ellipsis: true,
    align: "center",
    dataIndex: 'submissionName',
  },
  {
    title: '制定形式',
    ellipsis: true,
    align: "center",
    dataIndex: 'formulationFormName',
  },
  {
    title: '起草单位',
    ellipsis: true,
    align: "center",
    dataIndex: 'draftName',
  },
  {
    title: '状态',
    ellipsis: true,
    align: "center",
    dataIndex: 'stateName',
  },
  {
    title: '操作',
    ellipsis: true,
    align: "center",
    // fixed: 'right',
    width: 200,
    scopedSlots: { customRender: 'operation' },
  },
];
export default {
  name: 'outSidePlan',
  data() {
    return {
      search: {},
      form: {},
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      columns,
      loading: false,  //表格加载标记，数据载入完毕设为false
      selectedRowKeys: [],
      dataSource: [],
      pagination: {
        // 分页配置器
        pageSize: 10, // 一页的数据限制
        current: 1, // 当前页
        total: 0, // 总数
        pageSizeOptions: ['10', '20', '30', '50'],
        showSizeChanger: true, //是否可以改变 pageSize
        hideOnSinglePage: false, // 只有一页时是否隐藏分页器
        showQuickJumper: true, // 是否可以快速跳转至某页
        position: "bottom",
        "show-total": (total) => {
          return `共 ${total} 条`;
        },
      },
      //上传
      fileList: [], // 上传的列表
      headers: {
        authorization: 'authorization-text',
      },
      // 按钮列表
      btnList: [
        {
          state: '0', // 起草
          permission: ['编辑', '删除'],
        },
        {
          state: '1', // 锁定
          permission: ['编辑', '删除'],
        },
        {
          state: '2', // 归档
          permission: ['查看'],
        },
        {
          state: '6', // 归档
          permission: ['查看'],
        },
        {
          state: '7', // 归档
          permission: ['查看'],
        },
      ],

      //   项目类型单选框
      itemTypeRadio: [
        {
          radio: "第一类项目",
          value: "1",
          content: "条件比较成熟、任期内拟提请审议的法规草案",
        },
        {
          radio: "第二类项目",
          value: "2",
          content: "需要抓紧工作、条件成熟时提请审议的法规草案",
        },
        {
          radio: "第三类项目",
          value: "3",
          content: "立法条件尚不完全具备、需要继续研究论证的立法项目",
        },
      ],
      // 字典
      ItemDict: undefined, // 项目分类字典
      DevelopFormDict: undefined, // 制定形式字典
      //高级搜索表单
      searchForm: {},
      //高级搜索表单隐藏
      visibleSearch: false,
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  created() {
    this.findList();
    this.init();
  },
  methods: {
    //获取计划列表
    async findList() {
      this.visibleSearch = false;
      const {data} = await getPlanList({
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.current,
        ...this.search,
        ...this.searchForm,
      });
      console.log(data);
      this.dataSource = data.data.rows;
      this.loading = false;
      this.pagination.total = data.data.total;
    },
    //点击跳转某页
    handleTableChange(item) {
      console.log(item)
      this.pagination.current = item.current;
      this.pagination.pageSize = item.pageSize;
      this.findList();
    },
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
      const obj = this.btnList.filter(item => item.state === row.state);
      if (obj.length > 0) {
        return obj[0].permission;
      }
    },


    //添加项目
    add() {
      this.$router.push({path: '/main/planDetail'});
    },

    //导入项目弹框
    showModal() {
      this.visible = true;
    },
    // 导入弹窗确定按钮
    onModalOk() {
      this.handleUpload();

      // this.isShowImportModel = false;
      this.fileList = [];
      this.visible = false;
    },
    // 上传之前
    beforeUpload(file) {
      // console.log("file", file);
      this.fileList = [file];
      return false;
    },
    /** 导入excel */
    handleUpload() {
      const file = this.fileList[0];
      // console.log(this.upload)
      this.upload.checkFileMd5(
        file,
        "/legislation",
        "xj-legislation",
        async (res) => {
          // 关闭后刷新列表
          let params = { selectCompiledId: this.selectCompiledId };
          Object.assign(params, res);
          // console.log('ces')
          // this.$emit("ok", params);
          await importItem({
            fileId: params.id,
            model: params.module,
          });
          this.findList();
          this.$message.success("文件上传成功");
        },
        (err) => {
          // this.$emit("error", err);
          // console.log('err')
          this.$message.error("文件上传失败");
        }
      );
    },

    // 关闭
    handleRemove() {
      this.selectCompiledId = null;
      this.fileList = [];
      this.visible = false;
    },
    handleCancel() {
      this.selectCompiledId = null;
      this.fileList = [];
      this.visible = false;
    },

    //编辑按钮
    editLaw(record) {
      // console.log("编辑按钮", record);
      this.$router.push(`/main/planDetail?id=${record.id}`);
    },
    
    //删除按钮
    delLaw(record) {
      // await Delete(record.id)
      // this.findList();
      // this.$message.success('删除成功')
      const that = this;
      this.$confirm({
        title: '是否确认删除?',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          Delete(record.id).then(res => {
            // console.log(this,'this')
            // this.findList(); 报未定义   因为this在confirm未定义
            that.findList();
            that.$message.success('删除成功！');
          });
        },
        onCancel() {
          
        },
      });
    },

    //查看按钮
    checkLaw(record) {
      // console.log(record)
      this.$router.push(`/main/planDetail?id=${record.id}`);
    },

    //高级搜索字典初始化
    // 初始化
    async init() {
      // console.log("字典", await getItemDict());
      // 项目分类
      let data = undefined;
      data = await getItemDict();
      // console.log(data,'第一')
      this.ItemDict = data.data.data || [];
      // 制定形式
      data = await DevelopFormDict();
      // console.log(data,'第二个data')
      this.DevelopFormDict = data.data.data || [];
    },

  },
}
</script>

<style lang="scss" scoped>
.plan {
  padding: 20px;
  .topBtn {
    display: flex;
    justify-content: space-between;
    .topBtn-left {
      display: flex;
    }
    .content-screen {
      width: 1000px !important;
      padding: 25px;
      box-sizing: border-box;
      overflow: auto;
    }
  }
}
</style>