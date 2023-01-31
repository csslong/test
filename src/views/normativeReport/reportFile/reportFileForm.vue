<template>
  <div class="detail">
    <!-- 顶部按钮 -->
    <div class="top-btn">
      <a-button class="a-btn" style="color: rgba(153, 153, 153, 1)"
        >重置</a-button
      >&nbsp;
      <a-button
        @click="() => $router.back()"
        class="a-btn"
        style="color: rgba(153, 153, 153, 1)"
        >返回</a-button
      >&nbsp;
      <a-button
        class="a-btn"
        style="background-color: rgba(220, 36, 28, 1); color: #fff"
        >保存</a-button
      >&nbsp;
      <a-button
        class="a-btn"
        style="background-color: rgba(220, 36, 28, 1); color: #fff"
        >提交</a-button
      >&nbsp;
    </div>

    <!-- form表单 -->
    <div class="form">
      <a-form-model
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        v-show="pageStatus == 1"
      >
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="备案编号" :label-col="{ span: 4 }">
              <a-input placeholder="请输入备案编号"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="文件名称" :label-col="{ span: 4 }">
              <a-input placeholder="请输入规范性文件名称"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="制定机关" :label-col="{ span: 4 }">
              <a-input placeholder="请填写机关全称"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24">
            <a-form-model-item
              label="文件类型"
              :label-col="{ span: 2 }"
              :wrapper-col="{ span: 22 }"
            >
              <a-radio-group>
                <a-radio value="1">自治区政府</a-radio>
                <a-radio value="2"
                  >自治区政府决定、命令、规定、细则、办法、意见、措施等</a-radio
                >
                <a-radio value="3">州（市）人大及其常委会决议、决定</a-radio>
                <a-radio value="4">州（市）政府规章</a-radio>
                <a-radio value="5">监察委文件</a-radio>
                <a-radio value="6">两院文件</a-radio>
                <a-radio value="7">其他规范性文件</a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="6">
            <a-form-model-item
              label="制定形式"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-radio-group>
                <a-radio value="1">制定</a-radio>
                <a-radio value="2">修改</a-radio>
                <a-radio value="3">废止</a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item
              label="关联文件"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-button style="background-color: rgba(220, 36, 28, 1); color: #fff">选择文件</a-button>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="报备单位" :label-col="{span:4}">
              <a-input placeholder="请输入报备单位全称"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="6">
            <a-form-model-item label="备案报告文号" :label-col="{span:8}" :wrapper-col="{span:16}">
              <a-input placeholder="请输入备案报告文号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="通过日期" :label-col="{span:8}" :wrapper-col="{span:16}">
              <a-date-picker style="width:100%;"  format="YYYY-MM-DD" @change="onChange" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="6">
            <a-form-model-item label="公布日期" :label-col="{span:8}" :wrapper-col="{span:16}">
              <a-date-picker style="width:100%;" format="YYYY-MM-DD" @change="onChange" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="施行日期" :label-col="{span:8}" :wrapper-col="{span:16}">
              <a-date-picker style="width:100%;" format="YYYY-MM-DD" @change="onChange" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="6">
            <a-form-model-item label="提交人" :label-col="{span:8}" :wrapper-col="{span:16}">
              <a-input placeholder="请输入提交人姓名" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="联系方式" :label-col="{span:8}" :wrapper-col="{span:16}">
              <a-input placeholder="请输入联系方式" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24">
            <a-form-model-item
              label="附件信息"
              :label-col="{ span: 2 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-upload
                name="file"
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :headers="headers"
                @change="handleChange"
              >
                <a-button style="background-color:rgba(220, 36, 28, 1);color:#fff;"> 一键上传 </a-button>
              </a-upload>

              <!-- 备案报告文件上传 -->
              <div class="fileBox">
                <div class="fileBox-one" style="border-right:1px solid #d9d9d9;">备案报告</div>
                <div class="fileBox-two">
                  <div style="height:54px;border-right:1px solid #d9d9d9;border-bottom:1px solid #d9d9d9;">word文档</div>
                  <div style="height:54px; border-right:1px solid #d9d9d9;">pdf文档</div>
                </div>
                <div class="fileBox-three">
                  <div style="height:54px;line-height:54px;border-bottom:1px solid #d9d9d9;">
                    <a-upload
                      name="file"
                      :multiple="true"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      :headers="headers"
                      @change="handleChange"
                    >
                      <a-button  style="margin-left:20px;background-color:rgba(220, 36, 28, 1);color:#fff;"> DOC上传 </a-button>
                    </a-upload>
                  </div>
                  <div style="height:54px;">
                    <a-upload
                      name="file"
                      :multiple="true"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      :headers="headers"
                      @change="handleChange"
                    >
                      <a-button  style="margin-left:20px;background-color:rgba(220, 36, 28, 1);color:#fff;"> PDF上传 </a-button>
                    </a-upload>
                  </div>
                </div>
              </div>

              <!-- 政府令上传 -->
              <div class="fileBox">
                <div class="fileBox-one" style="border-right:1px solid #d9d9d9;">政府令</div>
                <div class="fileBox-two">
                  <div style="height:54px;border-right:1px solid #d9d9d9;border-bottom:1px solid #d9d9d9;">word文档</div>
                  <div style="height:54px; border-right:1px solid #d9d9d9;">pdf文档</div>
                </div>
                <div class="fileBox-three">
                  <div style="height:54px;line-height:54px;border-bottom:1px solid #d9d9d9;">
                    <a-upload
                      name="file"
                      :multiple="true"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      :headers="headers"
                      @change="handleChange"
                    >
                      <a-button  style="margin-left:20px;background-color:rgba(220, 36, 28, 1);color:#fff;"> DOC上传 </a-button>
                    </a-upload>
                  </div>
                  <div style="height:54px;">
                    <a-upload
                      name="file"
                      :multiple="true"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      :headers="headers"
                      @change="handleChange"
                    >
                      <a-button  style="margin-left:20px;background-color:rgba(220, 36, 28, 1);color:#fff;"> PDF上传 </a-button>
                    </a-upload>
                  </div>
                </div>
              </div>

              <!-- 文本上传 -->
              <div class="fileBox">
                <div class="fileBox-one" style="border-right:1px solid #d9d9d9;">文本</div>
                <div class="fileBox-two">
                  <div style="height:54px;border-right:1px solid #d9d9d9;border-bottom:1px solid #d9d9d9;">word文档</div>
                  <div style="height:54px; border-right:1px solid #d9d9d9;">pdf文档</div>
                </div>
                <div class="fileBox-three">
                  <div style="height:54px;line-height:54px;border-bottom:1px solid #d9d9d9;">
                    <a-upload
                      name="file"
                      :multiple="true"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      :headers="headers"
                      @change="handleChange"
                    >
                      <a-button  style="margin-left:20px;background-color:rgba(220, 36, 28, 1);color:#fff;"> DOC上传 </a-button>
                    </a-upload>
                  </div>
                  <div style="height:54px;">
                    <a-upload
                      name="file"
                      :multiple="true"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      :headers="headers"
                      @change="handleChange"
                    >
                      <a-button  style="margin-left:20px;background-color:rgba(220, 36, 28, 1);color:#fff;"> PDF上传 </a-button>
                    </a-upload>
                  </div>
                </div>
              </div>

              <!-- 说明 -->
              <div class="fileBox">
                <div class="fileBox-one" style="border-right:1px solid #d9d9d9;">说明</div>
                <div class="fileBox-two">
                  <div style="height:54px;border-right:1px solid #d9d9d9;border-bottom:1px solid #d9d9d9;">word文档</div>
                  <div style="height:54px; border-right:1px solid #d9d9d9;">pdf文档</div>
                </div>
                <div class="fileBox-three">
                  <div style="height:54px;line-height:54px;border-bottom:1px solid #d9d9d9;">
                    <a-upload
                      name="file"
                      :multiple="true"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      :headers="headers"
                      @change="handleChange"
                    >
                      <a-button  style="margin-left:20px;background-color:rgba(220, 36, 28, 1);color:#fff;"> DOC上传 </a-button>
                    </a-upload>
                  </div>
                  <div style="height:54px;">
                    <a-upload
                      name="file"
                      :multiple="true"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      :headers="headers"
                      @change="handleChange"
                    >
                      <a-button  style="margin-left:20px;background-color:rgba(220, 36, 28, 1);color:#fff;"> PDF上传 </a-button>
                    </a-upload>
                  </div>
                </div>
              </div>
              
              <!-- 其他上传 -->
              <div class="fileBox">
                <div class="fileBox-one" style="border-right:1px solid #d9d9d9;">其他</div>
                <div class="fileBox-two">
                  <div style="height:54px;border-right:1px solid #d9d9d9;border-bottom:1px solid #d9d9d9;">word文档</div>
                  <div style="height:54px; border-right:1px solid #d9d9d9;">pdf文档</div>
                </div>
                <div class="fileBox-three">
                  <div style="height:54px;line-height:54px;border-bottom:1px solid #d9d9d9;">
                    <a-upload
                      name="file"
                      :multiple="true"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      :headers="headers"
                      @change="handleChange"
                    >
                      <a-button  style="margin-left:20px;background-color:rgba(220, 36, 28, 1);color:#fff;"> DOC上传 </a-button>
                    </a-upload>
                  </div>
                  <div style="height:54px;">
                    <a-upload
                      name="file"
                      :multiple="true"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      :headers="headers"
                      @change="handleChange"
                    >
                      <a-button  style="margin-left:20px;background-color:rgba(220, 36, 28, 1);color:#fff;"> PDF上传 </a-button>
                    </a-upload>
                  </div>
                </div>
              </div>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  name: "reportFileForm",
  data() {
    return {
      pageStatus: 1, //1.新增
    };
  },
  methods: {
    //选择日期
    onChange(date, dateString) {
      console.log(date, dateString);
    },

    //文件上传
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  padding: 20px;
  .top-btn {
    margin: 0 0 13px 46px;
  }

  //文件上传盒子
  .fileBox {
    border:1px solid #d9d9d9;
    height:108px;
    margin-top:10px;
    display: flex;
    .fileBox-one {
      width:20%;
      height:108px;
      // border:1px solid #d9d9d9;
      text-align:center;
      line-height:108px;
    }
    .fileBox-two {
      height:50%;
      width:20%;
      text-align:center;
      line-height: 54px;
    }
    .fileBox-three {
      height:50%;
      width:60%;
      line-height: 54px;
    }
  }
}
</style>
