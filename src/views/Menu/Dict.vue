<template>
  <el-row :gutter="10">
    <el-col :span="5">
      <div class="grid-content bg-purple" style="padding-top:10px;">
        <!--字典树栏-->
        <el-input size="small" placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-tree
          class="filter-tree"
          :load="loadNode"
          node-key="id"
          :default-expanded-keys="[0]"
          :props="defaultProps"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          :highlight-current="true"
          ref="tree"
          @node-click="handleNodeClick"
          lazy
        ></el-tree>
      </div>
    </el-col>
    <el-col :span="19">
      <div class="grid-content bg-purple-light">
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
            <el-form-item label="名称" prop="name">
              <el-input v-model="dataForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="编号" prop="code">
              <el-input v-model="dataForm.code" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-select v-model="dataForm.type" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="可见" prop="visible">
              <el-switch
                v-model="dataForm.visible"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="0"
                inactive-value="1"
                active-text="可见"
                inactive-text="隐藏"
              ></el-switch>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="dataForm.remark"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入备注"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="editDialogVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
          </div>
        </el-dialog>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import api from "../../api/dict";
import VTable from "../../components/Views/VTable";
import qs from "qs";

export default {
  data() {
    return {
      options: [
        {
          value: "0",
          label: "类型"
        },
        {
          value: "1",
          label: "条目"
        }
      ],
      filterText: "",
      defaultProps: {
        children: "children",
        label: "name",
        isLeaf: "leaf"
      },
      filters: {
        name: "",
        parentid: "0"
      },
      columns: [
        { prop: "code", label: "编号", minWidth: 150 },
        { prop: "name", label: "名称", minWidth: 120 },
        {
          prop: "type",
          label: "类型",
          minWidth: 120,
          formatter: function(row, column, cellValue, index) {
            return cellValue === "0" ? "类别" : "条目";
          }
        },
        {
          prop: "visible",
          label: "可见",
          minWidth: 120,
          formatter: function(row, column, cellValue, index) {
            return cellValue === "0" ? "可见" : "隐藏";
          }
        }
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
        name: "",
        code: "",
        type: "",
        parentid: "0",
        remark: "",
        visible: ""
      }
    };
  },
  components: {
    VTable
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ id: 0, name: "字典管理" }]);
      } else if (node.level > 0) {
        this.handleNodeData(node.data.id, resolve);
      }
    },
    handleNodeClick(data, node) {
      this.filters.parentid = data.id;
      node.expand();
      this.findPage(null);
    },
    handleNodeData(id, resolve) {
      this.filters.parentid = id;
      this.findPage(null);
      api.lazy(id, "0", "").then(res => {
        if (res.code == 0) {
          return resolve(res.data);
        } else {
          return resolve([]);
        }
      });
    },
    // 刷新树节点
    refreshNodeBy(id) {
      let node = this.$refs.tree.getNode(id); // 通过节点id找到对应树节点对象
      node.loaded = false;
      node.expand(); // 主动调用展开节点方法，重新查询该节点下的所有子节点
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
          this.filters.parentid,
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
          this.refreshNodeBy(this.filters.parentid);
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
        name: "",
        code: "",
        type: "",
        parentid: this.filters.parentid,
        remark: "",
        visible: ""
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
                let id = this.dataForm.parentid;
                this.$refs["dataForm"].resetFields();
                this.editDialogVisible = false;

                this.refreshNodeBy(id);
                // this.findPage(null);
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
    }
  }
};
</script>
