<template>
  <div class="container" style="width:100%;">
    <!--工具栏-->
    <div class="toolbar" style="float:left; padding-top:10px;">
      <el-form :inline="true" :model="filters" size="small">
        <el-form-item>
          <el-input v-model="filters.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="findPage(null)">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格内容栏-->
    <v-table
      :data="pageResult"
      :columns="columns"
      @findPage="findPage"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
    ></v-table>
    <!--新增编辑界面-->
    <el-dialog
      :title="operation ? '新增' : '编辑'"
      width="70%"
      :visible.sync="editDialogVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="dataForm"
        label-width="80px"
        size="small"
        :rules="dataFormRules"
        ref="dataForm"
      >
        <el-form-item label="ID" prop="id" style="display:none;">
          <el-input
            v-model="dataForm.id"
            :disabled="true"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="dataForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="作者" prop="author">
              <el-input
                v-model="dataForm.author"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="来源" prop="source">
              <el-input
                v-model="dataForm.source"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="栏目" prop="sectionid">
              <el-select
                v-model="dataForm.sectionname"
                @change="currentSelect"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="置顶" prop="istop">
              <el-switch
                v-model="dataForm.istop"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="1"
                inactive-value="0"
                active-text="开启"
                inactive-text="关闭"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="摘要" prop="summary">
          <el-input
            v-model="dataForm.summary"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入摘要"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <tinymce-editor
            ref="editor"
            v-model="dataForm.content"
          ></tinymce-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editDialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click.native="editSubmit"
          :loading="editLoading"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VTable from "../../components/Views/VTable";
import api from "../../api/news";
import qs from "qs";
import dateUtils from "../../lib/times";
import TinymceEditor from "../../components/Views/VEditor";

export default {
  components: {
    VTable,
    TinymceEditor
  },
  data() {
    return {
      options: [],
      filters: {
        title: ""
      },
      columns: [
        // { prop: "id", label: "ID", minWidth: 150 },
        { prop: "title", label: "标题", minWidth: 120 },
        { prop: "author", label: "作者", minWidth: 120 },
        { prop: "source", label: "来源", minWidth: 120 },
        { prop: "sectionname", label: "栏目", minWidth: 120 },
        { prop: "summary", label: "摘要", minWidth: 120 },
        {
          prop: "updatetime",
          label: "更新时间",
          minWidth: 120,
          formatter: this.formatTime
        }
      ],
      pageRequest: { pageNum: 1, pageSize: 10 },
      pageResult: {},
      operation: false, // true:新增, false:编辑
      editDialogVisible: false, // 新增编辑界面是否显示
      editLoading: false,
      dataFormRules: {
        title: [{ required: true, message: "请输入用户名", trigger: "blur" }]
      },
      // 新增编辑界面数据
      dataForm: {
        id: 0,
        title: "",
        author: "",
        source: "",
        sectionid: "",
        sectionname: "",
        istop: "",
        type: "",
        summary: "",
        content: "",
        orden: "",
        createcode: ""
      }
    };
  },
  methods: {
    currentSelect(select) {
      this.dataForm.sectionid = select.id;
      this.dataForm.sectionname = select.name;
    },
    formatTime(row, column, cellValue, index) {
      return dateUtils.dateFtt(cellValue);
    },
    // 获取分页数据
    findPage: function(data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      api
        .list(
          this.pageRequest.pageSize,
          this.pageRequest.pageNum,
          this.filters.title
        )
        .then(res => {
          if (res.code == 0) {
            this.pageResult = res.data;
          } else {
            this.$message({ message: "获取数据失败！", type: "error" });
          }
        });
    },
    // 批量删除
    handleDelete: function(data) {
      api.destroy(qs.stringify(data.params)).then(res => {
        if (res.code == 0) {
          data.callback();
        } else {
          data.failback();
        }
      });
    },
    // 显示新增界面
    handleAdd: function() {
      this.editDialogVisible = true;
      this.operation = true;
      this.dataForm = {
        id: 0,
        title: "",
        author: "",
        source: "",
        sectionid: "",
        sectionname: "",
        istop: "",
        type: "",
        summary: "",
        content: "",
        orden: "",
        createcode: ""
      };
    },
    // 显示编辑界面
    handleEdit: function(params) {
      this.editDialogVisible = true;
      this.operation = false;
      this.dataForm = Object.assign({}, params.row);
    },
    // 编辑
    editSubmit: function() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let params = qs.stringify(Object.assign({}, this.dataForm));
            let request = this.operation
              ? api.create(params)
              : api.update(params);
            request.then(res => {
              if (res.code == 0) {
                this.editLoading = false;
                this.$message({ message: "提交成功！", type: "success" });
                this.$refs["dataForm"].resetFields();
                this.editDialogVisible = false;
                this.findPage(null);
              } else {
                this.editLoading = false;
                this.$message({
                  message: "提交失败！" + res.msg,
                  type: "error"
                });
              }
            });
          });
        }
      });
    },
    getNewsType() {
      api.getType("NewsType").then(res => {
        if (res.code == 0) {
          this.options = res.data;
        } else {
        }
      });
    }
  },
  mounted() {
    this.getNewsType();
  }
};
</script>

<style scoped></style>
