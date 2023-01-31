<template>
  <div class="detail">
    <div class="top-btn">
      <a-button @click="() => $router.back()">返回</a-button>&nbsp;
      <a-button
        style="color: #fff; background: rgba(220, 36, 28, 1)"
        >保存</a-button
      >&nbsp;
      <a-button
        style="color: #fff; background: rgba(220, 36, 28, 1)"
        >提交</a-button
      >
    </div>
    <div class="form">
      <a-form-model
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        v-show="pageStatus == 1"
      >
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="填报单位" :label-col="{ span: 4 }">
              <a-input placeholder="请填写填报机关全称"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="6">
            <a-form-model-item
              label="提交人"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input placeholder="请输入提交人姓名"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item
              label="年度"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-select placeholder="请选择年度">
                <a-select-option value="1">2022</a-select-option>
                <a-select-option value="2">2021</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="6">
            <a-form-model-item
              label="手机号码"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input placeholder="请输入手机号码"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item
              label="联系电话"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input placeholder="请输入联系电话"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="6">
            <a-form-model-item
              label="传真"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input placeholder="请输入传真拨号"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item
              label="电子邮箱"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input placeholder="请输入电子邮箱"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="应报总数" :label-col="{ span: 4 }">
              <a-input placeholder="请输入应报总数"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="附件" :label-col="{ span: 4 }">
              <a-upload
                name="file"
                :before-upload="beforeUpload"
                :remove="handleRemove"
                :showUploadList="false"
                accept="application/msword,.doc,.docx"
              >
                <a-button type="default">
                  <a-icon type="plus" /> 上传文件
                </a-button>
              </a-upload>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="登记情况" :label-col="{ span: 4 }">
              <a-radio-group>
                <a-radio value="1"> 予以登记 </a-radio>
                <a-radio value="2"> 暂缓登记 </a-radio>
                <a-radio value="3"> 不予登记 </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="登记说明" :label-col="{ span: 4 }">
              <a-textarea placeholder="请输入登记说明" :rows="4" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="报送文件" :label-col="{ span: 4 }">
              <a-button style="color: #fff; background: rgba(220, 36, 28, 1)"
                >报送文件选择</a-button
              >
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>

      <!-- 表格内容 -->
      <a-table
        :rowKey="(record) => record.id"
        :data-source="dataSource"
        :columns="columns"
        :loading="loading"
        :pagination="pagination"
      >
        <template slot="action" slot-scope="text, record">
          <a href="">移除</a>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "directorySubmitForm",
  data() {
    return {
      pageStatus: 1, //1.新增

      loading: false,  //表格加载标记，数据载入完毕设为false
      columns: [
        {
          title: "序号",
          width: 70,
          align: "center",
          customRender: (text, record, index) => `${index + 1}`,
        },
        {
          title: "法规名称",
          dataIndex: "",
          //   scopedSlots: { customRender: "creator" },
          align: "center",
        },
        {
          title: "制定机关",
          dataIndex: "",
          //   scopedSlots: { customRender: "creator" },
          align: "center",
        },
        {
          title: "报备人",
          dataIndex: "",
          width: 100,
          //   scopedSlots: { customRender: "creator" },
          align: "center",
        },
        {
          title: "报备时间",
          dataIndex: "",
          width: 100,
          //   scopedSlots: { customRender: "creator" },
          align: "center",
        },
        {
          title: "文件类型",
          dataIndex: "",
          width: 100,
          //   scopedSlots: { customRender: "creator" },
          align: "center",
        },
        {
          title: "制定类型",
          dataIndex: "",
          width: 100,
          //   scopedSlots: { customRender: "creator" },
          align: "center",
        },
        {
          title: "备案报告文号",
          dataIndex: "",
          width: 200,
          //   scopedSlots: { customRender: "creator" },
          align: "center",
        },
        {
          title: "操作",
          dataIndex: "",
          width: 100,
          scopedSlots: { customRender: "action" },
          align: "center",
        },
      ],
      dataSource: [{}, {}, {}, {}, {}],
      pagination: {
        // 分页配置器
        pageSize: 10, // 一页的数据限制
        current: 1, // 当前页
        total: 0, // 总数
        showSizeChanger: true, //是否可以改变 pageSize
        hideOnSinglePage: false, // 只有一页时是否隐藏分页器
        showQuickJumper: true, // 是否可以快速跳转至某页
        position: "bottom",
        "show-total": (total) => {
          return `共 ${total} 条`;
        },
      },
    };
  },
  methods: {
    beforeUpload() {},
    handleRemove() {},
  },
};
</script>

<style lang="scss" scoped>
.detail {
  padding: 20px;
  .top-btn {
    margin: 0 0 13px 46px;
  }
}
</style>