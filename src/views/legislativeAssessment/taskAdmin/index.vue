<template>
  <div class="layout">
    <div class="top">
      <span>任务名称：</span>
      <a-input style="width:260px;" placeholder="请输入任务名称"></a-input>&nbsp;&nbsp;
      <a-button style="background:rgb(220, 36, 28);color:#fff;"><a-icon type="monitor" />查询</a-button>&nbsp;&nbsp;
      <a-button style="color:#666;"><a-icon type="reload" />重置</a-button>
    </div>
    <div>
      <a-button style="background:rgb(220, 36, 28);color:#fff;"><a-icon type="plus" />新建任务</a-button>
    </div>

    <!-- 表格 -->
    <div class="table">
      <a-table
        :row-key="record => record.id"
        :columns="columns"
        :loading="loading"
        :data-source="dataSource"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <!-- 操作按钮 -->
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
import {getTaskAdminList} from '@/api/taskAdmin.js';
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    width: "8%",
    ellipsis: true,
    align: "center",
    // customRender: (text, record, index) => `${index + 1}`,
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '任务名称',
    ellipsis: true,
    align: "center",
    dataIndex: 'taskName',
  },
  {
    title: '评估单位',
    ellipsis: true,
    align: "center",
    dataIndex: 'depName',
  },
  {
    title: '开始时间',
    ellipsis: true,
    align: "center",
    dataIndex: 'startTime',
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
    title: '操作',
    ellipsis: true,
    align: "center",
    // fixed: 'right',
    width: 200,
    scopedSlots: { customRender: 'operation' },
  },
];
export default {
  name: 'taskAdmin',
  data() {
    return {
      columns,
      loading: false,
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
      btnList: [
        {
          state: '0', // 保存
          permission: ['编辑', '删除'],
        },
        {
          state: '1', // 意见征集
          permission: ['办理', '删除'],
        },
        {
          state: '2', // 论证评估
          permission: ['办理'],
        },
        {
          state: '3', // 结果发布
          permission: ['办理'],
        },
        {
          state: '9', // 办结
          permission: ['查看'],
        },
      ],
    }
  },
  methods: {
    async findList() {
      const {data} = await getTaskAdminList({
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
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
    // 根据状态权限__显示不同的按钮
    btnVisible(row) {
      // console.log(row,'row')
      const obj = this.btnList.filter(item => item.state === row.state);
      if (obj.length > 0) {
        return obj[0].permission;
      }
    },
    // 点击操作按钮
    handleBtn(btn, record) {
      let fnObj = {
        编辑: this.edit,
        查看: this.checkLaw,
        办理: this.handle,
        删除: this.delLaw,
      };
      fnObj[btn](record);
    },
    //点击按钮进入办理页面
    handle(e) {
      // console.log(e);
      this.$router.push({
        path: 'taskAdminDetail',
        query: e
      })
    }
  },
  created() {
    this.findList();
  },
}
</script>

<style lang="scss" scoped>
.layout {
  padding: 20px;
  .top {
    display: flex;
    height: 32px;
    line-height: 32px;
    margin-bottom: 30px;
    span {
      font-size: 16px;
    }
  }
  .table {
    margin-top: 20px;
  }
}
</style>