<!--
 * @Descripttion: 邀请成员弹窗工具
 * @version: 
 * @Author: lulongbin
 * @Date: 
 * @LastEditors: yuweiyuan
 * @LastEditTime: 2022-07-18 16:38:46
-->

<!--
 * @selectedFather: 列表数据,传数组
 * @selectObjects: 是否显示最左边的征集对象列表,默认为false
-->

<template>
  <div>
    <a-modal
      title="添加小组成员"
      :dialog-style="{ top: '165px' }"
      :visible="showModal"
      :width="950"
      @ok="onOk"
      @cancel="setShowModal(false), setKey(selectedFather)"
      :destroyOnClose="true"
    >
      <div class="faterBox">
        <!-- 新加功能,选择征集对象 -->
        <div class="SelectObjects" v-if="selectObjects">
          <SelectObjects></SelectObjects>
        </div>

        <!-- 左 -->
        <div class="left">
          <!-- 条件搜索 -->
          <div class="search">
            <a-form-model layout="inline" :model="formInline">
              <a-form-model-item label="用户名">
                <a-input v-model.trim="formInline.userName" placeholder="请输入"> </a-input>
              </a-form-model-item>
              <a-form-model-item label="部门">
                <!-- 下拉 -->
                <a-tree-select
                  style="width: 120px"
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
                <a-button type="primary" @click="onSearch"> 查询 </a-button>
              </a-form-model-item>
            </a-form-model>
          </div>
          <!-- 表格 -->
          <div class="table">
            <a-table
              :pagination="false"
              :row-selection="rowSelection"
              :columns="columns"
              :data-source="data"
              :scroll="{ y: 292 }"
              rowKey="userId"
            >
            </a-table>
          </div>
          <!-- 分页器 -->
          <!-- 分页 -->
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
        <!-- 右 -->
        <div class="right">
          <!-- 上 -->
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
  </div>
</template>
<script>
import { listUser } from '@/api/user';
import { treeselect } from '@/api/dept';
import SelectObjects from './components/SelectObjects.vue';
let personData = []; // 非响应式数据,存放组员
let editKey = [];
export default {
  props: {
    // 起草任务成员列表数据
    selectedFather: {
      type: Array,
      required: true,
    },
    // 是否显示选择征集对象
    selectObjects: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    SelectObjects, // 选择征集对象
  },
  data() {
    return {
      total: undefined,
      showModal: false,
      //   表格
      data: [],
      searchData: [], // 查询结果
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
      // 已选中成员
      selectedList: [],
      selectedSon: [],
      //  用户列表参数- 做搜索
      formInline: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phoneNumber: undefined,
        status: undefined,
        deptId: undefined,
      },
      // 部门树
      deptOptions: [],
      replaceFields: {
        children: 'children',
        title: 'label',
        key: 'id',
        value: 'id',
      },
    };
  },

  methods: {
    deWeight(arr1, arr2) {
      return arr1.filter(v => arr2.every(val => val.userId != v.userId));
    },

    // 确认按钮
    async onOk() {
      // 把数据传到父组件
      this.$emit('onOk', this.selectedList);
      // console.log(168,this.selectedList);
      this.setShowModal(false);
    },

    // 查询按钮
    onSearch() {
      this.getUserList();
    },

    // 点击分页器
    onPageNum(data) {
      // console.log('分页器',data);
      this.formInline.pageNum = data;
      this.getUserList();
    },
    // 点击分页器每页显示条数
    onPageSize(current, pageSize) {
      // console.log("分页器", current, pageSize);
      this.formInline.pageSize = pageSize;
      this.getUserList();
    },

    // 点击下拉菜单
    onSelect(data) {
      // console.log("下拉", data);
      this.formInline.deptId = data;
    },

    // 获取用户列表并渲染
    async getUserList() {
      const { total, rows } = await listUser(this.formInline);
      this.total = total;
      personData = rows;
      // 渲染过滤后的列表
      this.data = this.deWeight(personData, this.selectedFather);
      // console.log('用户列表', this.data)
    },
    // 获取部门树,下拉菜单
    async getDeptOptions() {
      treeselect().then(response => {
        this.deptOptions = response.data;
      });
    },

    setShowModal(showModal) {
      this.showModal = showModal;
      this.$emit('onCancel');
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
          // console.log('已选', this.selectedList)
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
  watch: {
    selectedFather: {
      handler(newVal, oldVal) {
        // 修改key
        // console.log(253, newVal, oldVal)
        this.setKey(newVal);
        this.data = this.deWeight(personData, this.selectedFather);
        // console.log('修改key', this.selectedList, editKey)
      },
      immediate: true,
      // deep: true
    },
  },
  created() {
    this.getUserList();
    this.getDeptOptions();
  },
};
</script>
<style lang="scss" scoped>
.faterBox {
  margin-bottom: 56px;
  display: flex;
  .left,
  .right {
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 2px;
    height: 394px;
  }
  .left {
    flex: 1;
    margin: 0 10px 0 0;
    // overflow: auto;
    .search {
      margin: 3px 0 3px 20px;
    }

    .table {
      height: 336px;
    }
  }
  .right {
    width: 176px;
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
        }
      }
    }
  }
}
</style>
