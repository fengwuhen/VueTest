<template>
  <div>
    <!--表格栏-->
    <el-table
      :data="data.list"
      stripe
      border
      highlight-current-row
      @selection-change="selectionChange"
      :v-loading="loading"
      :max-height="maxHeight"
      :size="size"
      style="width:100%;"
    >
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column
        v-for="column in columns"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :min-width="column.minWidth"
        :sortable="column.sortable"
        :fixed="column.fixed"
        :key="column.prop"
        :align="column.align || 'center'"
        :type="column.type"
        :formatter="column.formatter"
      >
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button :size="size" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            :size="size"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--分页栏-->
    <div class="toolbar" style="padding:10px;">
      <el-button
        :size="size"
        type="danger"
        @click="handleBatchDelete()"
        :disabled="this.selections.length === 0"
        style="float:left;"
        >批量删除</el-button
      >

      <el-pagination
        layout="total, sizes,prev, pager, next, jumper"
        @current-change="refreshPageRequest"
        @size-change="sizePageRequest"
        :current-page="pageRequest.pageNum"
        :page-size="pageRequest.pageSize"
        :total="data.total"
        style="float:right;"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "VTable",
  props: {
    columns: Array, // 表格列配置
    data: Object, // 表格分页数据
    size: {
      // 尺寸样式
      type: String,
      default: "mini"
    },
    maxHeight: {
      // 表格最大高度
      type: Number,
      default: 460
    }
  },
  data() {
    return {
      // 分页信息
      pageRequest: {
        pageNum: 1,
        pageSize: 10
      },
      loading: false, // 加载标识
      selections: [] // 列表选中列
    };
  },
  methods: {
    // 分页查询
    findPage: function() {
      this.$emit("findPage", { pageRequest: this.pageRequest });
    },
    // 选择切换
    selectionChange: function(selections) {
      this.selections = selections;
    },
    // 换页刷新
    refreshPageRequest: function(pageNum) {
      this.pageRequest.pageNum = pageNum;
      this.findPage();
    },
    sizePageRequest: function(pageSize) {
      this.pageRequest.pageSize = pageSize;
      this.findPage();
    },
    // 编辑
    handleEdit: function(index, row) {
      this.$emit("handleEdit", { index: index, row: row });
    },
    // 删除
    handleDelete: function(index, row) {
      this.delete(row.id);
    },
    // 批量删除
    handleBatchDelete: function() {
      let ids = this.selections.map(item => item.id).toString();
      this.delete(ids);
    },
    // 删除操作
    delete: function(ids) {
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          let callback = res => {
            this.$message({ message: "删除成功！", type: "success" });
            this.findPage();
          };
          let failback = res => {
            this.$message({ message: "删除失败！", type: "error" });
          };
          this.$emit("handleDelete", {
            params: { ids: ids },
            callback: callback,
            failback: failback
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.refreshPageRequest(1);
  }
};
</script>

<style scoped></style>
