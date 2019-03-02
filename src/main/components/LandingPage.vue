<template>
  <div>
    <h1>车站值班员电子卡控表</h1>
    <el-button type="primary" icon="el-icon-edit" @click="add">新增车次</el-button>
   <el-table
      :data="tableData"
      border
      :row-class-name="tableRowClassName"
      height="600">
      <el-table-column
        type="index"
        fixed
        width="50">
      </el-table-column>
      <el-table-column
        prop="trainNum"
        label="车次"
        width="50"
        align="center"
       >
      </el-table-column>
      <el-table-column
        prop="type"
        label="机车类型"
        width="100"
        align="center"
       >
      </el-table-column>
      <el-table-column
        label="机车号"
        align="center"
       >
          <el-table-column
            prop="motorNumOne"
            label="1位机车号"
            align="center"
            width="150"
          >

          </el-table-column>
          <el-table-column
            prop="motorNumTwo"
            label="2位机车号"
            align="center"
            width="150"
          >

          </el-table-column>
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        width="150"
        label="司机姓名">
      </el-table-column>
      <el-table-column
        label="防溜措施"
        width="300"
        align="center" >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.antRunning"
            @change="()=>{handleChange(scope.row)}"
            inactive-text="未完成"
            active-text="撤除完毕">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
          label="列尾装置"
          width="300"
          align="center" >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.liewei"
            @change="()=>{handleChange(scope.row)}"
            inactive-text="未完成"
            active-text="安装完毕">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
          label="列车编组顺序表"
          width="300"
          align="center" >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.sort"
            @change="()=>{handleChange(scope.row)}"
            inactive-text="未完成"
            active-text="交付完毕">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="站调"
        width="300"
        align="center" >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.zhandiao"
            @change="()=>{handleChange(scope.row)}"
            inactive-text="未完成"
            active-text="汇报完毕">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="删除"
        width="100"
        align="center"
       >
        <template slot-scope="scope">
          <el-button type="primary" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
        <el-dialog title="新增车次详情" :visible.sync="modalPop" width="60%" :before-close='cancelEdit' :close-on-click-modal='false'>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="车次">
              <el-input  v-model="form.trainNum" placeholder="请输入车次" width="50%"></el-input>
            </el-form-item>
            <el-form-item label="1位机车号">
              <el-input  v-model="form.motorNumOne" placeholder="请输入机车号" width="50%"></el-input>
            </el-form-item>
            <el-form-item label="2位机车号">
              <el-input  v-model="form.motorNumTwo" placeholder="请输入机车号" width="50%"></el-input>
            </el-form-item>
            <el-form-item label="司机姓名">
              <el-input  v-model="form.name" placeholder="请输入内部司机姓名"></el-input>
            </el-form-item>
            <el-form-item label="机车类型">

              <el-select v-model="form.type" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit">确 定</el-button>
          </div>
        </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'
  export default {
    data () {
      return {
        modalPop: false,
        form: {
          trainNum: '',
          motorNum: '',
          name: '',
          type: '',
        },
        tableData: [],
        options:[{
          value: 'DF4',
          label: 'DF4'
        },{
          value: 'DF4B',
          label: 'DF4B'
        },{
          value: 'DF7',
          label: 'DF7'
        },{
          value: 'DF8B',
          label: 'DF8B'
        },{
          value: 'HxD2c',
          label: 'HxD2c'
        },{
          value: 'HxD3c',
          label: 'HxD3c'
        },{
          value: 'ss4',
          label: 'ss4'
        }]

      }
    },
    watch: {
      modalPop(newVal, oldVal) {
        console.log(newVal, 'newVal')
        if(newVal) {
          this.form.trainNum = ''
          this.form.motorNumOne = ''
          this.form.motorNumTwo = ''
          this.form.name = ''
          this.form.type = ''
        }
      }
    },
    methods: {
      handleChange(val){
        console.log(val, val._id,'handleChange')
        this.$db.tableData.update({ _id: val._id }, val, {}, function (err, numReplaced) {
        })
      },
      add(){
        this.modalPop = true
      },
      cancelEdit(){
        this.modalPop = false
      },
      submit(){
        let that = this
        this.$db.tableData.insert({time: moment().valueOf(), ...this.form}, function(err, newDoc){
          if(!err) {
              that.init()
          }
        })
        this.modalPop = false
      },
      handleDel(item) {
        let that = this
        console.log(item, 'item')
        this.$db.tableData.remove({ _id: item._id }, {}, function(err, numReplaced){
          if(err) {
            console.log(err, 'err')
          }
          console.log(`delete ${numReplaced} item`)
          that.init()
        })
      },
      init(){
        this.$db.tableData.loadDatabase()
        this.$db.tableData.find({},
          (err, docs)=> {
              if(docs && docs.length >= 0){
                  this.tableData = _.sortBy(docs, ['name','time']);
              }
          });
      },
      tableRowClassName({row, rowIndex}){
        console.log(row, rowIndex, 'row')
        if( row.antRunning &&
            row.liewei &&
            row.sort &&
            row.zhandiao) {
            return 'success-row';
        }
        return '';
      }

    },
    created(){
      this.init()
    }
  }
</script>

<style>
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }



  h1 {
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;
  }
  .el-table .success-row {
    background: oldlace;
  }
</style>
