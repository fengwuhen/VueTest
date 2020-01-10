<template>
  <div>
    <div style="float:left;width:200px;">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText">
      </el-input>

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
        lazy
      >
      </el-tree>
    </div>
    <div></div>
  </div>
</template>
<script>
import api from "../../api/dict";

export default {
  data() {
    return {};
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ id: 0, name: "字典管理" }]);
      } else if (node.level > 0) {
        this.handleNodeData(node.data.id, resolve);
      }
    },
    handleNodeData(id, resolve) {
      api.lazy(id, "").then(res => {
        if (res.code == 0) {
          return resolve(res.data);
        } else {
          return resolve([]);
        }
      });
    }
  },

  data() {
    return {
      filterText: "",
      defaultProps: {
        children: "children",
        label: "name",
        isLeaf: "leaf"
      }
    };
  }
};
</script>
