<template>
  <div class="detail">
    <div class="topBtn">
      <a-button @click="() => $router.back()">返回</a-button>&nbsp;
      <a-button>重置</a-button>&nbsp;
      <a-button style="background-color: #d10016; color: #fff" @click="onCommit"
        >保存</a-button
      >
    </div>

    <div class="form">
      <a-form-model
        ref="form"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        v-show="pageStatus == 1"
        :model="form"
      >
        <a-row>
          <a-col :span="20">
            <a-form-model-item
              prop="submissionName"
              label="立法项目名称"
              :label-col="{ span: 2 }"
              :wrapper-col="{ span: 22 }"
            >
              <a-input
                style="width: 100%"
                v-model="form.submissionName"
                placeholder="请填写立法项目名称"
              />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="10">
            <a-form-model-item
              required
              prop="type"
              label="项目类型"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-radio-group v-model="form.type">
                <a-radio v-for="item in itemTypeRadio" :key="item.radio" :value="item.value">{{item.radio}}</a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-col>
          <a-col :span="10">
            <a-form-model-item
              required
              prop="classification"
              label="项目分类"
              :label-col="{ span: 4, offset: 2 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-select
                placeholder="请选择项目分类"
                style="width: 100%"
                v-model="form.classification"
              >
                <a-select-option
                  v-for="item in ItemDict"
                  :value="item.dictValue"
                  :key="item.dictCode"
                >
                  {{item.dictLabel}}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="10">
            <a-form-model-item
              required
              prop="formulationForm"
              label="制定形式"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-select
                placeholder="请选择"
                style="width: 100%"
                v-model="form.formulationForm"
              >
                <a-select-option
                  v-for="item in DevelopFormDict"
                  :value="item.dictValue"
                  :key="item.dictCode"
                >
                  {{item.dictLabel}}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="10">
            <a-form-model-item
              class="a"
              label="拟报请自治区人民政府审查时间"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-date-picker
                style="width: 100%"
                valueFormat="YYYY-MM-DD"
                @change="(val, str) => (form.reviewTime = str)"
                v-model="form.reviewTime"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="10">
            <a-form-model-item
              class="a"
              required
              label="拟报请自治区人大常委会审议时间"
              :label-col="{ span: 4, offset: 2 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-date-picker
                style="width: 100%"
                valueFormat="YYYY-MM-DD"
                @change="(val, str) => (form.considerationTime = str)"
                v-model="form.considerationTime"
              />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="10">
            <a-form-model-item
              label="起草单位"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 18 }"
              prop="draftName"
            >
              <a-input
                style="width: 100%"
                placeholder="请填写起草单位全称"
                v-model="form.draftName"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="10">
            <a-form-model-item
              required
              label="主管领导"
              :label-col="{ span: 4, offset: 2 }"
              :wrapper-col="{ span: 18 }"
              prop="leaderInChargeName"
            >
              <a-input
                style="width: 100%"
                placeholder="请填写"
                v-model="form.leaderInChargeName"
              />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="10">
            <a-form-model-item
              required
              label="主管领导职务"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 18 }"
              prop="supervisorPositionName"
            >
              <a-input
                style="width: 100%"
                placeholder="请填写"
                v-model="form.supervisorPositionName"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="10">
            <a-form-model-item
              class="a"
              required
              prop="leaderInChargePhone"
              label="主管领导联系方式"
              :label-col="{ span: 4, offset: 2 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input
                style="width: 100%"
                placeholder="请填写"
                v-model="form.leaderInChargePhone"
              />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="10">
            <a-form-model-item
              required
              label="起草负责人"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 18 }"
              prop="draftingDirector"
            >
              <a-input
                style="width: 100%"
                placeholder="请填写起草负责人姓名"
                v-model="form.draftingDirector"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="10">
            <a-form-model-item
              class="a"
              required
              prop="draftingDirectorPhone"
              label="起草负责人联系方式"
              :label-col="{ span: 4, offset: 2 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input
                style="width: 100%"
                placeholder="请填写"
                v-model="form.draftingDirectorPhone"
              />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="20">
            <a-form-model-item
              class="a"
              prop="feasibilityTxt"
              label="立法的必要性和可行性"
              :label-col="{ span: 2 }"
              :wrapper-col="{ span: 22 }"
            >
              <a-textarea
                placeholder="请输入"
                :rows="4"
                v-model="form.feasibilityTxt"
              />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="20">
            <a-form-model-item
              class="a"
              prop="legislativeBasis"
              label="立法依据"
              :label-col="{ span: 2 }"
              :wrapper-col="{ span: 22 }"
            >
              <a-textarea
                placeholder="请输入"
                :rows="4"
                v-model="form.legislativeBasis"
              />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="20">
            <a-form-model-item
              class="a"
              prop="mainSystemTxt"
              label="拟解决的主要问题和拟确立的主要制度"
              :label-col="{ span: 2 }"
              :wrapper-col="{ span: 22 }"
            >
              <a-textarea
                placeholder="请输入"
                :rows="4"
                v-model="form.mainSystemTxt"
              />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="20">
            <a-form-model-item
              class="a"
              label="起草的工作情况和工作计划"
              :label-col="{ span: 2 }"
              :wrapper-col="{ span: 22 }"
              prop="workPlan"
            >
              <a-textarea
                placeholder="请输入"
                :rows="4"
                v-model="form.workPlan"
              />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="20">
            <a-form-model-item :label-col="{ span: 2 }" label="相关附件">
              <a-upload
                name="file"
                accept=".doc, .docx"
                :file-list="fileList"
                :multiple="false"
                :headers="headers"
                :remove="handleRemove"
                :before-upload="beforeUpload"
                @change="change"
                @preview="preview"
              >
                <a-button> <a-icon type="upload" /> 上传文件 </a-button>
              </a-upload>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import {addOutSidePlan, getItemDict, DevelopFormDict,Detail, Modify} from "@/api/plan.js";
export default {
  name: "detail",
  data() {
    return {
      form: {
        session: undefined,
        formulationForm: undefined,
        classification: undefined,
        type: "1",
        // considerationTime: null,
        // reviewTime: null
      },
      pageStatus: 1, //1.新增

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

      // 上传文件相关
      fileList: [], // 上传的列表
      headers: {
        authorization: "authorization-text",
      },
    };
  },
  methods: {
    //选择日期
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    // 下载已上传的附件
    async preview(file) {
      if (!file.fileId) {
        return this.$message.warning("不能下载提交前的附件");
      }

      const res = await downloadFileApi({
        module: "xj-legislation",
        id: file.fileId,
      });
      console.log("file", file);
      console.log("res", res);
      // 把文件流转换成下载地址
      const url = window.URL.createObjectURL(res);
      // 创建一个超链接元素,触发下载文件
      const a = document.createElement("a");
      /* const fileName = decodeURI(
        res.headers["content-disposition"].split("filename=")[1]
      ); */
      const fileName = file.name;
      a.style.display = "none";
      a.href = url;
      document.body.appendChild(a);
      a.download = fileName;
      a.click();
      document.body.removeChild(a); // 销毁元素
    },
    change(val) {
      console.log("val", val);
      this.$emit("update:fileList", [val]);
    },

    //保存
    async onCommit() {
      // console.log(this.form)
      // const res = await addOutSidePlan(this.form);
      // console.log('res');
      // await this.$refs.form.validate();
      // await addOutSidePlan(this.form);
      // this.$router.go(-1);
      if(this.form.id) {
        //有id时是修改
        await Modify(this.form)
      } else {
        //新增
        await addOutSidePlan(this.form);
      }
      this.$router.go(-1);
    },

    // 关闭
    handleRemove() {
      this.selectCompiledId = null;
      this.fileList = [];
    },
    // 上传之前
    beforeUpload(file) {
      this.fileList = [file];
      return false;
    },

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

    //详情
    async getDetail() {
      // console.log(this.$route.query.id)
      if(this.$route.query.id) {
        const res = await Detail(this.$route.query.id)
        // console.log(res)
        this.form = res.data.data || {};
      }     
    }
  },
  created() {
    this.init();
    this.getDetail();
  }
};
</script>

<style lang="scss" scoped>
::v-deep .a .ant-form-item-label {
  line-height: 20px;
  text-align: left;
  display: flex;
  justify-content: flex-end;
  white-space: pre-line;
}
.detail {
  padding: 20px;
  .topBtn {
    margin: 0 0 20px 20px;
  }
}
</style>