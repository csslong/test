<template>
  <div class="content">
    <div class="topBtn">
      <div class="l-btn">
        <a-button @click="add()" style="background:rgb(220, 36, 28);color:#fff;border: 1px solid rgb(220, 36, 28);margin-left:10px;">发送通知</a-button>
      </div>
      <div class="r-btn">
        <a-input placeholder="请输入" style="width:240px;"/>
        <a-button style="background:rgb(220, 36, 28);color:#fff;border: 1px solid rgb(220, 36, 28);margin-left:10px;">搜索</a-button>
      </div>
    </div>
    <div class="table">
      <!-- <div style="margin-bottom: 16px">
        <span style="margin-left: 8px">
          <template v-if="hasSelected">
            {{ `Selected ${selectedRowKeys.length} items` }}
          </template>
        </span>
      </div> -->
      <a-table
        :columns="columns"
        :data-source="SourceList"
        :pagination="pagination"
        :row-key="record => record.id"
        :loading="loading"
        @change="handleTableChange"
      >
        <template slot="feedbackNumberSuccess" slot-scope="index, text">
          {{ text.feedbackNumberSuccess ? text.feedbackNumberSuccess : 0 }} /
          {{ text.feedbackNumber ? text.feedbackNumber : 0 }}
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
        <span
          slot="num"
          slot-scope="text, record, index"
        >
          {{(pagination.current-1)*pagination.pageSize+parseInt(index)+1}}
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import {legislationCollectList,Delete} from '@/api/legislationCollect'
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    width: "5%",
    ellipsis: true,
    align: "center",
    // customRender: (text, record, index) => `${index + 1}`,
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '标题',
    dataIndex: 'title',
    ellipsis: true,
    align: "center",
  },
  {
    title: '开始日期',
    ellipsis: true,
    align: "center",
    dataIndex: 'startDate',
  },
  {
    title: '结束日期',
    dataIndex: 'endDate',
  },
  {
    title: '创建人',
    ellipsis: true,
    align: "center",
    dataIndex: 'createByName',
  },
  {
    title: '状态',
    ellipsis: true,
    align: "center",
    dataIndex: 'stateName',
  },
  {
    title: '反馈情况',
    ellipsis: true,
    align: "center",
    dataIndex: "feedbackNumberSuccess",
    scopedSlots: { customRender: "feedbackNumberSuccess" },
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
  name: 'legislationCollect',
  data() {
    return {
      selectedRowKeys: [],
      columns,
      SourceList: [],
      loading: false,  //表格加载标记，数据载入完毕设为false
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
      // 按钮列表
      btnList: [
        {
          state: '0', // 起草
          permission: ['编辑', '删除'],
        },
        {
          state: '1', // 锁定
          permission: ['查看项目'],
        },
        {
          state: '9', // 归档
          permission: ['查看项目'],
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
    // hasSelected() {
    //   return this.selectedRowKeys.length > 0;
    // },
  },
  created() {
    this.findList();
  },
  methods: {
    //点击跳转某页
    handleTableChange(item) {
      console.log(item)
      this.pagination.current = item.current;
      this.pagination.pageSize = item.pageSize;
      this.findList();
    },
    // start() {
    //   this.loading = true;
    //   // ajax request after empty completing
    //   setTimeout(() => {
    //     this.loading = false;
    //     this.selectedRowKeys = [];
    //   }, 1000);
    // },
    // onSelectChange(selectedRowKeys) {
    //   console.log('selectedRowKeys changed: ', selectedRowKeys);
    //   this.selectedRowKeys = selectedRowKeys;
    // },
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
    //发送通知进入新增页面
    add() {
      this.$router.push({path: '/main/legislationCollectDetail'});
    },

    //点击编辑按钮
    editLaw(record) {
      console.log(record);
      this.$router.push(`/main/legislationCollectDetail?id=${record.id}`);
    },
    //点击删除按钮
    delLaw(record) {
      // console.log('删除',record)
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
          that.$message.error('取消删除！');
        },
      });
    },
    //列表数据
    async findList() {
      const {data} = await legislationCollectList({
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.current,
      });
      console.log(data);
      this.SourceList = data.data.rows || [];
      this.loading = false;
      this.pagination.total = data.data.total;
    },
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 30px;
  .topBtn {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .r-btn {
      display: flex;
    }
  }
}
</style>