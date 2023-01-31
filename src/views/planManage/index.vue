<template>
  <div class="planManage">
    <div class="topBtn">
      <div class="left-btn">
        <a-button style="width:80px;color:#fff;background-color:#d10016">新建</a-button>
      </div>
      <div class="right-btn">
        <a-input></a-input>&nbsp;&nbsp;
        <a-button style="width:80px;color:#fff;background-color:#d10016">搜索</a-button>
      </div>
    </div>

    <!-- 表格 -->
    <div>
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
import {getManageList} from '@/api/planManage'
//表头
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    width: "10%",
    ellipsis: true,
    align: "center",
    // customRender: (text, record, index) => `${index + 1}`,
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '标题',
    ellipsis: true,
    align: "center",
    dataIndex: 'title',
  },
  {
    title: '创建人',
    ellipsis: true,
    align: "center",
    dataIndex: 'createByName',
  },
  {
    title: '创建时间',
    ellipsis: true,
    align: "center",
    dataIndex: 'createTime',
  },
  {
    title: '当前环节',
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
  name: 'planManage',
  data() {
    return {
      columns,
      loading: false,  //表格加载标记，数据载入完毕设为false
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
      // 按钮列表
      btnList: [
        {
          state: '0', // 草案
          permission: ['办理', '删除'],
        },
        {
          state: '1', // 草案意见征集
          permission: ['办理'],
        },
        {
          state: '2', // 审议
          permission: ['办理'],
        },
        {
          state: '3', // 向社会公开
          permission: ['查办理'],
        },
        {
          state: '9', // 办结
          permission: ['查看'],
        },
      ],
    }
  },
  methods: {
    //获取立法计划管理列表
    async findList() {
      const {data} = await getManageList({
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
    // 点击操作按钮
    handleBtn(btn, record) {
      let fnObj = {
        查看: this.checkLaw,
        办理: this.handle,
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
  },
  created() {
    this.findList();
  }
}
</script>

<style lang="scss" scoped>
.planManage {
  padding: 20px;
  .topBtn {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .right-btn {
      display: flex;
    }
  }
}
</style>