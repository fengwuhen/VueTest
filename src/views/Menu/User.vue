<template>
  <div class="container" style="width:100%;">
    <!--工具栏-->
    <div class="toolbar" style="float:left; padding-top:10px;">
      <el-form :inline="true" :model="filters" size="small">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="用户名"></el-input>
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
      width="40%"
      :visible.sync="editDialogVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="dataForm"
        label-width="80px"
        :rules="dataFormRules"
        size="small"
        ref="dataForm"
      >
        <el-form-item label="ID" prop="id">
          <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="dataForm.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="dataForm.password" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="username">
          <el-input v-model="dataForm.username" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VTable from "../../components/Views/VTable";
import api from "../../api/user";
import qs from "qs";

export default {
  components: {
    VTable
  },
  data() {
    return {
      filters: {
        name: ""
      },
      columns: [
        { prop: "id", label: "ID", minWidth: 150 },
        { prop: "account", label: "账号", minWidth: 120 },
        { prop: "password", label: "密码", minWidth: 120 },
        { prop: "username", label: "名称", minWidth: 120 }
      ],
      pageRequest: { pageNum: 1, pageSize: 10 },
      pageResult: {},
      operation: false, // true:新增, false:编辑
      editDialogVisible: false, // 新增编辑界面是否显示
      editLoading: false,
      dataFormRules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }]
      },
      // 新增编辑界面数据
      dataForm: {
        id: 0,
        account: "",
        password: "",
        username: ""
      }
    };
  },
  methods: {
    // 获取分页数据
    findPage: function(data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      api
        .list(
          this.pageRequest.pageSize,
          this.pageRequest.pageNum,
          this.filters.name
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
            request
              .then(res => {
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
              })
              .catch(err => {
                this.editLoading = false;
              });
          });
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped></style>
