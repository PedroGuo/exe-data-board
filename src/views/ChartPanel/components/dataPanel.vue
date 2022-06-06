<template>
  <div>
    <el-form label-position="top" class="panel" style="text-align:left;">
      <el-form-item v-show="dataSrcVisible" :label="$t('common.dataSource')+':'">
        <el-select v-model="selectedBase" size="mini" filterable :placeholder="$t('dataSource.sourcePlaceholder')" style="width:200px;" clearable @change="handleBaseChange">
          <el-option v-for="item in baseList" :key="item.id" :label="item.title" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-show="dataSrcVisible" v-model="selectedTable" :disabled="!selectedBase" size="mini" filterable :placeholder="$t('dataSource.tablePlaceholder')" style="width:200px;" clearable @change="handleDataSrcChange">
          <el-option v-for="item in tableList" :key="item.id" :label="item.title" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item v-show="!dataSrcVisible" :label="$t('dataSource.table')+':'">
        <span style="font-size: 12px;margin-right: 5px;">{{ selectedBaseName }}/{{ selectedTableName }}</span>
        <el-button type="text" size="mini" @click="editDataSrc">
          {{ $t('common.edit') }}
        </el-button>
      </el-form-item>
      <el-form-item :label="$t('dataSource.fields')+':'">
        <draggable v-model="tableSchema" v-loading="schemaLoading" :group="{name: 'col',pull: 'clone', put: false}" :move="handleMove">
          <div v-for="col in tableSchema" :key="col.id" class="drag-list-item">
            <i class="el-icon-rank" style="font-size: 12px;color:#409EFF;" />
            {{ col.title }}
          </div>
        </draggable>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { sourceList, linkedTablesByBase, getTableColumns } from '@/api/source'
import draggable from 'vuedraggable'
// import exeSql from '@/api/exeSql'

export default {
  components: { draggable },
  props: {
    resultLoading: {
      default: false
    },
    dataSrc: {
      requred: true
    }
  },
  data() {
    return {
      schemaLoading: false,
      baseList: [],
      tableList: [],
      selectedTable: undefined,
      tableSchema: undefined,
      dataSrcVisible: this.$route.params.id === 'create',
      existWarning: null,
      selectedBase: undefined
    }
  },
  computed: {
    caculCols() {
      return this.$store.state.chart.caculCols
    },
    dimensions() {
      return this.$store.state.chart.dimensions
    },
    allSelected() {
      return this.dimensions.concat(this.caculCols)
    },
    selectedBaseName() {
      const selectedBase = this.baseList.find(item => item.id === this.selectedBase)
      if (!selectedBase) return ''
      return selectedBase.title
    },
    selectedTableName() {
      const selectedTable = this.tableList.find(item => item.id === this.selectedTable)
      if (!selectedTable) return ''
      return selectedTable.title
    }
  },
  created() {
    this.getBaseList()
  },
  methods: {
    async getBaseList() {
      const { list } = await sourceList()
      this.baseList = list
    },
    initWithDataSrc(dataSrc) {
      if (dataSrc) {
        this.selectedTable = dataSrc.table
        this.selectedBase = dataSrc.source_id
        this.fetchTables()
        this.fetchSchema()
      } else {
        this.selectedTable = ''
        this.selectedBase = ''
        this.tableSchema = []
        this.dataSrcVisible = true
      }
    },
    editDataSrc() {
      this.dataSrcVisible = true
      this.selectedTable = undefined
    },
    handleBaseChange() {
      this.fetchTables()
    },
    async fetchTables() {
      const { list } = await linkedTablesByBase(this.selectedBase)
      this.tableList = list
    },
    handleDataSrcChange() {
      this.dataSrcVisible = false
      this.fetchSchema()
      this.$store.commit('chart/SET_ALL_COLS', [])
      this.$emit('change', {
        sourceId: this.selectedBase,
        sourceName: this.selectedBaseName,
        tableId: this.selectedTable,
        tableName: this.selectedTableName
      })
    },

    async fetchSchema() {
      if (!this.selectedTable) {
        this.tableSchema = []
        return
      }
      this.schemaLoading = true
      const { columns } = await getTableColumns(this.selectedTable)
      this.schemaLoading = false
      this.tableSchema = columns
      this.$store.commit('chart/SET_ALL_COLS', this.tableSchema)
    },
    handleMove(evt, originalEvent) {
      if (this.allSelected.find(item => item.id === evt.draggedContext.element.id)) {
        if (!this.existWarning) {
          this.existWarning = this.$message({
            type: 'warning',
            message: this.$t('chart.fieldExisted'),
            onClose: (instance) => {
              this.existWarning = null
            }
          })
        }
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.panel {
  /deep/ .el-form-item__label {
    line-height: initial;
  }
   /deep/ .el-form-item__content {
    line-height: initial;
  }
}
.drag-list-item {
  line-height: 1.5;
  font-size: 14px;
  color:#606266;
  cursor: -webkit-grab;
}
</style>
