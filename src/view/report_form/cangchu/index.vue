<template>
  <div>
    <vHeader :headListx='headListx' :index="0"  ></vHeader>
    <div ref="cangchu" class="cangchu">

        <div ref="cangchu_top" class="cangchu-top">
            <p class="search-p">
                <span >数据类型：</span>
                
                <el-select multiple clearable collapse-tags v-model="search.typearray" size="mini" class="input-class" placeholder="请选择数据类型">
                    <el-option
                      v-for="item in getout_coming_report"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                    </el-option>
                </el-select>
            </p>
            <p class="search-p">
                <span >录入日期：</span>
                <el-date-picker
                  v-model="search.Date"
                  size="mini" class="input-class" 
                  type="date"
                  placeholder="录入日期">
                </el-date-picker>
            </p>
            <p class="search-p">
                <span >出库原因：</span>
                <el-input size="mini" class="input-class" v-model="search.outReason" placeholder="请输入出库原因"></el-input>
            </p>
            <p class="search-p">
                <span >款号：</span>
                <el-input size="mini" class="input-class" v-model="search.wareId" placeholder="请输入款号"></el-input>
            </p>
            <p class="search-p">
                <span >操作要求：</span>
                <el-input size="mini" class="input-class" v-model="search.remark" placeholder="请输入操作要求"></el-input>
            </p>
            
            <p class="search-p">
                <span >编号：</span>
                <el-input size="mini" class="input-class" v-model="search.id" placeholder="请输入编号"></el-input>
            </p>
            <p class="search-p">
                <span >执行日期：</span>
                <el-date-picker
                  v-model="search.doDate"
                  size="mini" class="input-class" 
                  type="date"
                  placeholder="执行日期">
                </el-date-picker>
            </p>
            <!--<p class="search-p">
                <span >二次执行日期：</span>

                <el-date-picker
                  v-model="search.nextDoDate"
                  size="mini" class="input-class" 
                  type="date"
                  placeholder="二次执行日期">
                </el-date-picker>
            </p>-->
            <p class="search-p">
                <span >入库原因：</span>
                <el-input size="mini" class="input-class" v-model="search.incomingReason" placeholder="请输入入库原因"></el-input>
            </p>
            <p class="search-p">
                <span >颜色：</span>
                <el-input size="mini" class="input-class" v-model="search.color" placeholder="请输入颜色"></el-input>
            </p>
            <p class="search-p">
                <span >供应链/工厂：</span>
                <el-input size="mini" class="input-class" v-model="search.supply" placeholder="请输入供应链/工厂"></el-input>
            </p>
            <p class="search-p">
                <span >是否结款：</span>

                <el-select clearable v-model="search.isMoney" size="mini" class="input-class" placeholder="请选择是否结款">
                    <el-option
                      v-for="item in isMoneyselect"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
            </p>
            <p class="search-p">
                <span >是否完结：</span>

                <el-select clearable v-model="search.isFinal" size="mini" class="input-class" placeholder="请选择是否完结">
                    <el-option
                      v-for="item in isMoneyselect"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
            </p>
            <p class="search-p">
                <el-button v-if="isInArray(12)" size="mini" @click="editfirststep" type="primary">新增</el-button>

                <el-button size="mini" @click="pagetwo = !pagetwo" type="primary">显示剩余页面</el-button>
            </p>

            <p style="position: relative;">
                

                <el-button @click="select_reports" size="mini" style="margin-bottom: 20px" type="primary">搜索</el-button>

              <el-button @click="clearsearch" size="mini" style="margin-left: 20px;margin-bottom: 20px" type="primary">重置</el-button>

              <el-button size="mini" @click="exportcus" style="margin-left: 20px;margin-bottom: 20px" type="primary">导出</el-button>

              <el-button v-if="isInArray(12)" :disabled="uploadflag" size="mini" style="margin-left: 20px;margin-bottom: 20px" type="primary">{{uploadflag?'上传中': '上传'}}</el-button>
              <input v-if="isInArray(12)" type="file" class="inpucus cursor" @change="tirggerFile($event)" />
            </p>



        </div>  
        <div :style="{height: table_height+'px'}" class="table-wrap">
                <el-table
                :data="tableData"
                :height="table_height - 40"
                style="width: 100%">
                
                    <el-table-column label="企划部信息录入">
                    <el-table-column
                      prop="id"
                      label="编号"
                      width="50"
                      >
                      
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="数据类型"
                      width="100"
                      >
                      <template slot-scope="scope">
                            {{filterstatus(scope.row.type)}}
                      </template>
                      
                    </el-table-column>
                    <el-table-column
                      prop="beginTime"
                      label="录入日期"
                      width="100"
                      >
                        <template slot-scope="scope">
                            {{scope.row.beginTime ? fmtDate(scope.row.beginTime) : ''}}
                        </template>
                      
                    </el-table-column>
                    <el-table-column
                      prop="supply"
                      label="供应链/工厂"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="wareId"
                      label="款号"
                      width="130"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="color"
                      label="颜色"
                      width="70"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="luckyBag"
                      label="福袋配比"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="s"
                      label="s"
                      width="70"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="m"
                      label="m"
                      width="70"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="l"
                      label="l"
                      width="70"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="xl"
                      label="xl"
                      width="70"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="j"
                      label="j"
                      width="70"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="remark"
                      label="操作要求"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="reason"
                      label="出库原因"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="memo"
                      label="备注"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="amount2"
                      label="操作">

                        <template slot-scope="scope">
                          <el-button
                          size="mini"
                          type="primary"
                          v-if="!scope.row.firstClose && isInArray(12)"
                          @click="editfirststep(scope.row)">编辑</el-button>
                          
                        </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column label="仓储部执行信息录入">
                  
                    <el-table-column
                      prop="checkTime"
                      label="执行日期"
                      width="100"
                      >
                        <template slot-scope="scope">
                            {{scope.row.checkTime ? fmtDate(scope.row.checkTime) : ''}}
                        </template>
                      
                    </el-table-column>
                    <el-table-column
                      prop="checkWareId"
                      label="款号"
                      width="130"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="checkColor"
                      label="颜色"
                      width="80"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="s1"
                      label="s"
                      width="70"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="m1"
                      label="m"
                      width="70"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="l1"
                      label="l"
                      width="70"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="xl1"
                      label="xl"
                      width="70"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="j1"
                      label="j"
                      width="70"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="isFinish"
                      label="是否完结"
                      >
                      <template slot-scope="scope">
                          <span v-if="scope.row.isFinish==1">是</span>
                          <span v-if="scope.row.isFinish==2">否</span>
                          <span v-if="!scope.row.isFinish">{{scope.row.isFinish}}</span>
                      </template>

                    </el-table-column>
                    <el-table-column
                      prop="checkMemo"
                      label="备注"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="amount2"
                      label="操作">

                        <template slot-scope="scope">
                          <el-button
                          size="mini"
                          type="primary"
                          v-if="!scope.row.secondClose && isInArray(13)"
                          @click="editsecondstep(scope.row)">编辑</el-button>
                          
                        </template>
                    </el-table-column>

                  </el-table-column>
                  <el-table-column v-if="pagetwo" label="二次企划部信息录入">
                  
                    <el-table-column
                      prop="nextBeginTime"
                      label="执行日期"
                      width="100"
                      >
                      <template slot-scope="scope">
                            {{scope.row.nextBeginTime ? fmtDate(scope.row.nextBeginTime) : ''}}
                        </template>
                      
                    </el-table-column>
                    <el-table-column
                      prop="nextWareId"
                      label="款号"
                      width="130"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="nextColor"
                      label="颜色"
                      width="80"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="nextS"
                      label="s"
                      width="70"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="nextM"
                      label="m"
                      width="70"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="nextL"
                      label="l"
                      width="70"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="nextXl"
                      label="xl"
                      width="70"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="nextJ"
                      label="j"
                      width="70"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="nextRemark"
                      label="操作要求"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="nextReason"
                      label="入库原因"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="nextMemo"
                      label="备注"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="amount2"
                      label="操作">

                        <template slot-scope="scope">

                          <el-button
                          size="mini"
                          type="primary"
                          v-if = "!scope.row.thirdClose && scope.row.firstClose && scope.row.type == 1 && isInArray(12)"
                          @click="editthirdstep(scope.row)">编辑</el-button>
                          
                        </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column v-if="pagetwo" label="二次仓储部执行信息录入">
                  
                    <el-table-column
                      prop="nextCheckTime"
                      label="执行日期"
                      width="100"
                      >
                      <template slot-scope="scope">
                            {{scope.row.nextCheckTime ? fmtDate(scope.row.nextCheckTime) : ''}}
                        </template>
                    </el-table-column>
                    <el-table-column
                      prop="nextCheckWareId"
                      label="款号"
                      width="130"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="nextCheckColor"
                      label="颜色"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="nextS1"
                      label="s"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="nextM1"
                      label="m"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="nextL1"
                      label="l"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="nextXl1"
                      label="xl"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="nextJ1"
                      label="j"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="nextIsFinish"
                      label="是否完结"
                      >
                      <template slot-scope="scope">
                          <span v-if="scope.row.nextIsFinish==1">是</span>
                          <span v-if="scope.row.nextIsFinish==2">否</span>
                          <span v-if="!scope.row.nextIsFinish">{{scope.row.nextIsFinish}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="nextCheckMemo"
                      label="备注"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="amount2"
                      label="操作">

                        <template slot-scope="scope">
                          <el-button
                          size="mini"
                          type="primary"
                          v-if="scope.row.secondClose && scope.row.type == 1  && isInArray(13)"
                          @click="editfourstep(scope.row)">编辑</el-button>
                          
                        </template>
                    </el-table-column>

                  </el-table-column>
                  <el-table-column v-if="pagetwo" label="财务部信息录入">
                      <el-table-column
                      prop="isMoney"
                      label="是否结款"
                      >
                      <template slot-scope="scope">
                          <span v-if="scope.row.isMoney==1">是</span>
                          <span v-if="scope.row.isMoney==2">否</span>
                          <span v-if="!scope.row.isMoney">{{scope.row.isMoney}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="financeTime"
                      label="操作时间"
                      >
                      <template slot-scope="scope">
                            {{scope.row.financeTime ? fmtDate(scope.row.financeTime) : ''}}
                        </template>
                    </el-table-column>
                    <el-table-column
                      prop="amount2"
                      label="操作">

                        <template slot-scope="scope">
                          <el-button
                          size="mini"
                          type="primary"
                          v-if="scope.row.type == 4 && scope.row.firstClose && isInArray(14)"
                          @click="editfivestep(scope.row)">编辑</el-button>
                          
                        </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>


                <div class="pagination">
                  <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[250, 300, 350, 400, 450]"
                    :page-size="search.pageSize"
                    :current-page="search.pageNum"
                    :total="search.total"
                    layout="total,sizes, prev, pager, next"
                    >
                  </el-pagination>
                </div>


        </div> 
        <el-dialog
          title="企划部信息录入/修改"
          :visible.sync="firststop.dialogVisible"
          width="640px"
          :close-on-click-modal="false"

          >
          <div class="firststopwrap">
                <p style="margin-top: 20px;">
                  <span >数据类型：</span>
                  <el-select style="margin-right: 20px;" clearable v-model="firststop.type" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in getout_coming_report"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                    </el-option>
                  </el-select>
                  

                  <span >发起日期：</span>
                    <el-date-picker
                      v-model="firststop.time"
                      size="mini" class="input-class" 
                      type="date"
                      style="width: 170px;"
                      placeholder="录入日期">
                    </el-date-picker>
                </p>
                <p style="margin-top: 20px;">
                  <span >供&nbsp;&nbsp;应&nbsp;&nbsp;链：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;margin-right: 20px;" placeholder="请输入供应链" v-model="firststop.supply" ></el-input>

                  <span >款&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;" placeholder="请输入款号" v-model="firststop.wareId" ></el-input>
                </p>
                <p style="margin-top: 20px;">
                  <span >颜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;margin-right: 20px;" placeholder="请输入颜色" v-model="firststop.color" ></el-input>

                  <span >福袋配比：</span>

                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;" placeholder="请输入福袋配比" v-model="firststop.luckyBag" ></el-input>
                </p>
                
                <p style="margin-top: 20px;">
                    <span style="margin-right: 10px;">尺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
                  <span >s：</span>

                  <el-input size="mini"
                  style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;" placeholder="请输入s" v-model="firststop.s" ></el-input>


                  <span >m：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;" placeholder="请输入m" v-model="firststop.m" ></el-input>
                  <span >l：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;" placeholder="请输入l" v-model="firststop.l" ></el-input>
                </p>
                <p style="margin-top: 20px;">
                  <span style="padding-left: 80px;">xl：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;" placeholder="请输入xl" v-model="firststop.xl" ></el-input>

                  <span >j：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;" placeholder="请输入j" v-model="firststop.j" ></el-input>
                </p>

                <p style="margin-top: 20px;">
                  <span style="position: relative;top: -20px;">操作要求：</span>
                  <el-input type="textarea"
                  :rows="2"
                  placeholder="请输入内容" style="display: inline-block;width: 260px;font-size: 12px;" v-model="firststop.remark" ></el-input>
          
                </p>
                <p style="margin-top: 20px;">
                  <span style="position: relative;top: -20px;">出库原因：</span>
                  <el-input type="textarea"
                  :rows="2"
                  placeholder="请输入内容" style="display: inline-block;width: 260px;font-size: 12px;" v-model="firststop.reason" ></el-input>
          
                </p>
                <p style="margin-top: 20px;">
                  <span style="position: relative;top: -20px;">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                  <el-input type="textarea"
                  :rows="2"
                  placeholder="请输入备注" style="display: inline-block;width: 260px;font-size: 12px;" v-model="firststop.memo" ></el-input>
          
                </p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="firststop.dialogVisible = false">取 消</el-button>
            <el-button size="mini" @click="add_report" type="primary" >确 定</el-button>
          </span>
        </el-dialog>


        <el-dialog
          title="仓储部执行信息录入/修改"
          :visible.sync="secondstep.dialogVisible"
          width="640px"
          :close-on-click-modal="false"

          >
          <div class="firststopwrap">
                <p style="margin-top: 20px;">
                  <span >颜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;margin-right: 20px;" placeholder="请输入颜色" v-model="secondstep.color" ></el-input>

                  

                  <span >执行时间：</span>
                    <el-date-picker
                      v-model="secondstep.time"
                      size="mini" class="input-class" 
                      type="date"
                      style="width: 170px;"
                      placeholder="录入日期">
                    </el-date-picker>
                </p>
                <p style="margin-top: 20px;">
                    <span >是否完结：</span>
                  <el-select style="margin-right: 20px;" clearable v-model="secondstep.isFinish" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in isMoneyselect"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>

                  <span >款&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;" placeholder="请输入款号" v-model="secondstep.wareId" ></el-input>
                </p>
                
                <p style="margin-top: 20px;">
                    <span style="margin-right: 10px;">尺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
                  <span >s：</span>

                  <el-input size="mini"
                  style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;" placeholder="请输入s" v-model="secondstep.s" ></el-input>


                  <span >m：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;" placeholder="请输入m" v-model="secondstep.m" ></el-input>
                  <span >l：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;" placeholder="请输入l" v-model="secondstep.l" ></el-input>
                </p>
                <p style="margin-top: 20px;">
                  <span style="padding-left: 80px;">xl：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;" placeholder="请输入xl" v-model="secondstep.xl" ></el-input>
                  <span >j：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;" placeholder="请输入j" v-model="secondstep.j" ></el-input>

                </p>
                
                <p style="margin-top: 20px;">
                  <span style="position: relative;top: -20px;">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                  <el-input type="textarea"
                  :rows="2"
                  placeholder="请输入备注" style="display: inline-block;width: 260px;font-size: 12px;" v-model="secondstep.memo" ></el-input>
          
                </p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="secondstep.dialogVisible = false">取 消</el-button>
            <el-button size="mini" @click="update_report_by_cc" type="primary" >确 定</el-button>
          </span>
        </el-dialog>



        <el-dialog
          title="二次企划部信息录入/修改"
          :visible.sync="thirdstep.dialogVisible"
          width="640px"
          :close-on-click-modal="false"

          >
          <div class="firststopwrap">
                <p style="margin-top: 20px;">
                  <span >款&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;margin-right: 20px;" placeholder="请输入款号" v-model="thirdstep.wareId" ></el-input>
                  

                  <span >发起日期：</span>
                    <el-date-picker
                      v-model="thirdstep.time"
                      size="mini" class="input-class" 
                      type="date"
                      style="width: 170px;"
                      placeholder="录入日期">
                    </el-date-picker>
                </p>
                <p style="margin-top: 20px;">
                  <span >颜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;margin-right: 20px;" placeholder="请输入颜色" v-model="thirdstep.color" ></el-input>

                  
                </p>
                
                <p style="margin-top: 20px;">
                    <span style="margin-right: 10px;">尺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
                  <span >s：</span>

                  <el-input size="mini"
                  style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;" placeholder="请输入s" v-model="thirdstep.s" ></el-input>


                  <span >m：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;" placeholder="请输入m" v-model="thirdstep.m" ></el-input>
                  <span >l：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;" placeholder="请输入l" v-model="thirdstep.l" ></el-input>
                </p>
                <p style="margin-top: 20px;">
                  <span style="padding-left: 80px;">xl：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;" placeholder="请输入xl" v-model="thirdstep.xl" ></el-input>
                  <span >j：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;" placeholder="请输入j" v-model="thirdstep.j" ></el-input>
                </p>
                <p style="margin-top: 20px;">
                  <span style="position: relative;top: -20px;">操作要求：</span>
                  <el-input type="textarea"
                  :rows="2"
                  placeholder="请输入内容" style="display: inline-block;width: 260px;font-size: 12px;" v-model="thirdstep.remark" ></el-input>
          
                </p>
                <p style="margin-top: 20px;">
                  <span style="position: relative;top: -20px;">出库原因：</span>
                  <el-input type="textarea"
                  :rows="2"
                  placeholder="请输入内容" style="display: inline-block;width: 260px;font-size: 12px;" v-model="thirdstep.reason" ></el-input>
          
                </p>
                <p style="margin-top: 20px;">
                  <span style="position: relative;top: -20px;">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                  <el-input type="textarea"
                  :rows="2"
                  placeholder="请输入备注" style="display: inline-block;width: 260px;font-size: 12px;" v-model="thirdstep.memo" ></el-input>
          
                </p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="thirdstep.dialogVisible = false">取 消</el-button>
            <el-button size="mini" @click="update_report_by_qh" type="primary" >确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog
          title="二次仓储部执行信息录入/修改"
          :visible.sync="fourstep.dialogVisible"
          width="640px"
          :close-on-click-modal="false"

          >
          <div class="firststopwrap">
                <p style="margin-top: 20px;">
                  <span >颜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;margin-right: 20px;" placeholder="请输入颜色" v-model="fourstep.color" ></el-input>

                  

                  <span >执行时间：</span>
                    <el-date-picker
                      v-model="fourstep.time"
                      size="mini" class="input-class" 
                      type="date"
                      style="width: 170px;"
                      placeholder="录入日期">
                    </el-date-picker>
                </p>
                <p style="margin-top: 20px;">
                    <span >是否完结：</span>
                  <el-select style="margin-right: 20px;" clearable v-model="fourstep.isFinish" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in isMoneyselect"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>

                  <span >款&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;" placeholder="请输入款号" v-model="fourstep.wareId" ></el-input>
                </p>
                
                <p style="margin-top: 20px;">
                    <span style="margin-right: 10px;">尺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
                  <span >s：</span>

                  <el-input size="mini"
                  style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;" placeholder="请输入s" v-model="fourstep.s" ></el-input>


                  <span >m：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;" placeholder="请输入m" v-model="fourstep.m" ></el-input>
                  <span >l：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;" placeholder="请输入l" v-model="fourstep.l" ></el-input>
                </p>
                <p style="margin-top: 20px;">
                  <span style="padding-left: 80px;">xl：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;" placeholder="请输入xl" v-model="fourstep.xl" ></el-input>
                  <span >j：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;" placeholder="请输入j" v-model="fourstep.j" ></el-input>
                </p>
                
                <p style="margin-top: 20px;">
                  <span style="position: relative;top: -20px;">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                  <el-input type="textarea"
                  :rows="2"
                  placeholder="请输入备注" style="display: inline-block;width: 260px;font-size: 12px;" v-model="fourstep.memo" ></el-input>
          
                </p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="fourstep.dialogVisible = false">取 消</el-button>
            <el-button size="mini" @click="update_report_by_sc" type="primary" >确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="财务部执行信息录入/修改"
          :visible.sync="fivestep.dialogVisible"
          width="540px"
          :close-on-click-modal="false"

          >
          <div class="firststopwrap">
                <p style="margin-top: 20px;">
                  <span >操作时间：</span>
                    <el-date-picker
                      v-model="fivestep.time"
                      size="mini" class="input-class" 
                      type="date"
                      style="width: 170px;"
                      placeholder="操作时间">
                    </el-date-picker>
                </p>
                <p style="margin-top: 20px;">
                    <span >是否完结：</span>
                  <el-select style="margin-right: 20px;" clearable v-model="fivestep.isMoney" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in isMoneyselect"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </p>

                
          </div>
          
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="fivestep.dialogVisible = false">取 消</el-button>
            <el-button size="mini" @click="update_report_by_cw" type="primary" >确 定</el-button>
          </span>
        </el-dialog>

    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import vHeader from '../head'

export default {
    name: "cangchu",
    components: {
        vHeader
    },
    data(){
        return{
            headListx: [
                {
                    name: '仓储出库报表',
                    choose: true,
                    link:'/reportcangchu/cangchu',
                    show: true,
                },
                {
                    name: '借样出库报表',
                    choose: false,
                    link:'/reportcangchu/importsearch',
                    show: false,
                },
                /*{
                    name: '品控报表',
                    choose: false,
                    link:'/report/pinkong',
                },*/
                
            ],
            uploadflag: false,
            pagetwo: false,
            table_height: 300,
            search: {
                type: '',
                Date: '',
                wareId: '',
                remark: '',
                id: '',
                checkTime: '',
                outReason: '',
                typearray: [],
                incomingReason: '',
                color: '',
                supply: '',
                isMoney: '',
                isFinal: '',
                pageNum: 1,
                pageSize: 250,
                total: 0
            },
            firststop: {
                dialogVisible: false,
                type: '',
                time: '',
                supply: '',
                wareId: '',
                color: '',
                luckyBag: '',
                s: '',
                m: '',
                l: '',
                xl: '',
                j: '',
                remark: '',
                reason: '',
                memo: '',
                id: ''
            },
            secondstep: {
                dialogVisible: false,
                id: '',
                time: '',
                color: '',
                wareId: '',
                s: '',
                m: '',
                l: '',
                xl: '',
                j: '',
                isFinish: '',
                memo: '',
            },
            thirdstep: {
                dialogVisible: false,
                id: '',
                time: '',
                color: '',
                wareId: '',
                s: '',
                m: '',
                l: '',
                xl: '',
                j: '',
                remark: '',
                reason: '',
                memo: '',
            },
            fourstep: {
                dialogVisible: false,
                id: '',
                time: '',
                color: '',
                wareId: '',
                s: '',
                m: '',
                l: '',
                xl: '',
                j: '',
                memo: '',
                isFinish: ''
            },
            fivestep: {
                dialogVisible: false,
                id: '',
                isMoney: '',
                time: '',
            },
            isMoneyselect: [ 
                {
                    label: '是',
                    value: 1, 
                },
                {
                    label: '否',
                    value: 2, 
                },
            ],
            tableData: []
        }
    },
    computed: {
        ...mapGetters([
            'getpageDict',
            'getpowers'
        ]),
        getout_coming_report() {
            let demand_status = this.getpageDict.filter((list) => {
                return list.dicType == "out_coming_report"
            })

            console.info(demand_status[0])

            if (demand_status[0]) {
                return demand_status[0].dicList
            } else {
                return []
            }

            
        },
    },
    created() {
       
    },
    mounted(){
        this.$nextTick(()=>{
            this.table_height = this.$refs.cangchu.offsetHeight - this.$refs.cangchu_top.offsetHeight -30
        })
        this.select_reports()
    },
    methods:{
        //文件上传
        tirggerFile : function (event) {
          let that = this


            if (this.uploadflag) {
                return this.$message({
                  message: "正在上传中",
                  type: 'error'
                })
            }
            this.uploadflag = true
            var file = event.target.files[0]

            let formData = new FormData();
            formData.append('file', file);

            this.$http({
                url:  'reports/import_out_coming_report',
                method: 'POST',
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            }).then((res) => {
                that.uploadflag = false
                event.target.value=""
                if (res.code == '200') {


                    that.$message({
                      message: res.msg,
                      type: 'success'
                    })
                } else {
                    that.$message({
                      message: res.msg,
                      type: 'error'
                    })
                }

                that.select_reports()

            })

        },
        isInArray(value){
            for(var i = 0; i < this.getpowers.length; i++){
                if(value == this.getpowers[i]){

                    return true;
                }
            }
            return false;
        },
        editfirststep(row) {

            if (row && row.id) {
                this.firststop.type = row.type
                this.firststop.time = row.beginTime ? new Date(row.beginTime*1000) : ''
                this.firststop.supply = row.supply
                this.firststop.id = row.id
                this.firststop.wareId = row.wareId
                this.firststop.luckyBag = row.luckyBag
                this.firststop.color = row.color
                this.firststop.s = row.s
                this.firststop.m = row.m
                this.firststop.l = row.l
                this.firststop.xl = row.xl
                this.firststop.j = row.j

                this.firststop.remark = row.remark
                this.firststop.reason = row.reason
                this.firststop.memo = row.memo

            } else {
                this.firststop.type = ''
                this.firststop.time = ''
                this.firststop.supply = ''
                this.firststop.id = ''
                this.firststop.wareId = ''
                this.firststop.luckyBag = ''
                this.firststop.s = ''
                this.firststop.m = ''
                this.firststop.l = ''
                this.firststop.xl = ''
                this.firststop.j = ''
                this.firststop.remark = ''
                this.firststop.reason = ''
                this.firststop.memo = ''
                this.firststop.color = ''
            }

            
            this.firststop.dialogVisible = true
        },
        
        editsecondstep(row) {
            this.secondstep.id = row.id
            this.secondstep.time = row.checkTime ? new Date(row.checkTime*1000) : ''



            this.secondstep.color = row.checkColor
            this.secondstep.wareId = row.checkWareId
            this.secondstep.s = row.s1
            this.secondstep.m = row.m1
            this.secondstep.l = row.l1
            this.secondstep.xl = row.xl1
            this.secondstep.j = row.j1
            this.secondstep.isFinish = row.isFinish
            this.secondstep.memo = row.checkMemo


            this.secondstep.dialogVisible = true
        },
        editfourstep(row) {
            this.fourstep.id = row.id
            this.fourstep.time = row.nextCheckTime ? new Date(row.nextCheckTime*1000) : ''

            this.fourstep.color = row.nextCheckColor
            this.fourstep.wareId = row.nextCheckWareId
            this.fourstep.s = row.nextS1
            this.fourstep.m = row.nextM1
            this.fourstep.l = row.nextL1
            this.fourstep.xl = row.nextXl1
            this.fourstep.j = row.nextJ1
            this.fourstep.isFinish = row.nextIsFinish
            this.fourstep.memo = row.nextCheckMemo

            this.fourstep.dialogVisible = true
        },
        editfivestep(row) {
            this.fivestep.id = row.id
            this.fivestep.isMoney = row.isMoney
            this.fivestep.time = row.financeTime ? new Date(row.financeTime*1000) : ''
            this.fivestep.dialogVisible = true
        },
        editthirdstep(row) {
            this.thirdstep.time = row.nextBeginTime ? new Date(row.nextBeginTime*1000) : ''
            this.thirdstep.id = row.id
            this.thirdstep.wareId = row.nextWareId
            this.thirdstep.color = row.nextColor
            this.thirdstep.s = row.nextS
            this.thirdstep.m = row.nextM
            this.thirdstep.l = row.nextL
            this.thirdstep.xl = row.nextXl
            this.thirdstep.j = row.nextJ
            this.thirdstep.remark = row.nextRemark
            this.thirdstep.reason = row.nextReason
            this.thirdstep.memo = row.nextMemo

            this.thirdstep.dialogVisible = true
        },
        filterstatus(id) {
            let demand_status = this.getout_coming_report.filter((list) => {
                return list.dicCode == id
            })


            if (demand_status[0]) {
                return demand_status[0].dicName
            } else {
                return id
            }
        },
        clearsearch() {
            this.search.id = ''
            this.search.wareId = ''
            this.search.color = ''
            this.search.Date = ''
            this.search.doDate = ''
            this.search.nextDate = ''
            this.search.nextDoDate = ''
            this.search.outReason = ''
            this.search.incomingReason = ''
            this.search.remark = ''
            this.search.supply = ''
            this.search.type = ''
            this.search.isFinal = ''
            this.search.isMoney = ''
            this.search.typearray = []
            this.search.pageNum = 1
            this.select_reports()
        },
        fmtDate(obj){
            var date =  new Date(obj*1000);

            var y = 1900+date.getYear();
            var m = "0"+(date.getMonth()+1);
            var d = "0"+date.getDate();
            return y+"/"+m.substring(m.length-2,m.length)+"/"+d.substring(d.length-2,d.length);
        },
        update_report_by_cw() {
            let that = this
            this.$http.post(`reports/update_report_by_cw`,{
                time: this.fivestep.time ? this.fivestep.time.getTime().toString().substr(0, 10):'',
                isMoney: this.fivestep.isMoney,
                id: this.fivestep.id,
            })
            .then((data)=>{
                if (data.code == 200) {
                    this.$message({
                        message: data.msg,
                        type: 'success'
                      });

                    this.fivestep.dialogVisible = false

                } else {
                    this.$message({
                        message: data.msg,
                        type: 'error'
                      });
                }

                this.select_reports()


                

            })
            .catch(function (error) {
                console.log(error);
                that.$message({
                    message: '接口报错',
                    type: 'error'
                  });
            })
        },
        update_report_by_qh() {
            let that = this
            this.$http.post(`reports/update_report_by_qh`,{
                time: this.thirdstep.time ? this.thirdstep.time.getTime().toString().substr(0, 10):'',
                supply: this.thirdstep.supply,
                wareId: this.thirdstep.wareId,
                color: this.thirdstep.color,
                s: this.thirdstep.s,
                m: this.thirdstep.m,
                l: this.thirdstep.l,
                xl: this.thirdstep.xl,
                j: this.thirdstep.j,
                remark: this.thirdstep.remark,
                reason: this.thirdstep.reason,
                memo: this.thirdstep.memo,
                id: this.thirdstep.id,
            })
            .then((data)=>{
                if (data.code == 200) {
                    this.$message({
                        message: data.msg,
                        type: 'success'
                      });

                    this.thirdstep.dialogVisible = false

                } else {
                    this.$message({
                        message: data.msg,
                        type: 'error'
                      });
                }

                this.select_reports()


                

            })
            .catch(function (error) {
                console.log(error);
                that.$message({
                    message: '接口报错',
                    type: 'error'
                  });
            })
        },
        update_report_by_cc() {
            this.$http.post(`reports/update_report_by_cc`,{
                id: this.secondstep.id,
                time: this.secondstep.time ? this.secondstep.time.getTime().toString().substr(0, 10):'',
                wareId: this.secondstep.wareId,
                color: this.secondstep.color,
                s: this.secondstep.s,
                m: this.secondstep.m,
                l: this.secondstep.l,
                xl: this.secondstep.xl,
                j: this.secondstep.j,
                memo: this.secondstep.memo,
                isFinish: this.secondstep.isFinish,
            })
            .then((data)=>{
                if (data.code == 200) {
                    this.$message({
                        message: data.msg,
                        type: 'success'
                      });

                    this.secondstep.dialogVisible = false
                    this.select_reports()
                } else {
                    this.$message({
                        message: data.msg,
                        type: 'error'
                      });
                }


                

            })
            .catch(function (error) {
                console.log(error);
                this.$message({
                    message: '接口报错',
                    type: 'error'
                  });
            })
        },
        update_report_by_sc() {
            this.$http.post(`reports/update_report_by_sc`,{
                id: this.fourstep.id,
                time: this.fourstep.time ? this.fourstep.time.getTime().toString().substr(0, 10):'',
                wareId: this.fourstep.wareId,
                color: this.fourstep.color,
                s: this.fourstep.s,
                m: this.fourstep.m,
                l: this.fourstep.l,
                xl: this.fourstep.xl,
                j: this.fourstep.j,
                memo: this.fourstep.memo,
                isFinish: this.fourstep.isFinish,
            })
            .then((data)=>{
                if (data.code == 200) {
                    this.$message({
                        message: data.msg,
                        type: 'success'
                      });

                    this.fourstep.dialogVisible = false
                    this.select_reports()
                } else {
                    this.$message({
                        message: data.msg,
                        type: 'error'
                      });
                }


                

            })
            .catch(function (error) {
                console.log(error);
                this.$message({
                    message: '接口报错',
                    type: 'error'
                  });
            })
        },
        add_report() {
            let that = this
            if (this.firststop.id) {
                this.$http.post(`reports/update_report_by_sh`,{
                    type: this.firststop.type,
                    id: this.firststop.id,
                    time: this.firststop.time ? this.firststop.time.getTime().toString().substr(0, 10):'',
                    supply: this.firststop.supply,
                    wareId: this.firststop.wareId,
                    color: this.firststop.color,
                    luckyBag: this.firststop.luckyBag,
                    s: this.firststop.s,
                    m: this.firststop.m,
                    l: this.firststop.l,
                    xl: this.firststop.xl,
                    j: this.firststop.j,
                    remark: this.firststop.remark,
                    reason: this.firststop.reason,
                    memo: this.firststop.memo,
                })
                .then((data)=>{
                    if (data.code == 200) {
                        this.$message({
                            message: data.msg,
                            type: 'success'
                          });

                        this.firststop.dialogVisible = false

                    } else {
                        this.$message({
                            message: data.msg,
                            type: 'error'
                          });
                    }

                    this.select_reports()


                    

                })
                .catch(function (error) {
                    console.log(error);
                    that.$message({
                        message: '接口报错',
                        type: 'error'
                      });
                })
            } else {
                this.$http.post(`reports/add_report`,{
                    type: this.firststop.type,
                    time: this.firststop.time ? this.firststop.time.getTime().toString().substr(0, 10):'',
                    supply: this.firststop.supply,
                    wareId: this.firststop.wareId,
                    color: this.firststop.color,
                    luckyBag: this.firststop.luckyBag,
                    s: this.firststop.s,
                    m: this.firststop.m,
                    l: this.firststop.l,
                    xl: this.firststop.xl,
                    j: this.firststop.j,
                    remark: this.firststop.remark,
                    reason: this.firststop.reason,
                    memo: this.firststop.memo,
                })
                .then((data)=>{
                    if (data.code == 200) {
                        this.$message({
                            message: data.msg,
                            type: 'success'
                          });

                        this.firststop.dialogVisible = false

                    } else {
                        this.$message({
                            message: data.msg,
                            type: 'error'
                          });
                    }

                    this.select_reports()


                    

                })
                .catch(function (error) {
                    console.log(error);
                    that.$message({
                        message: '接口报错',
                        type: 'error'
                      });
                })
            }
            

        },


        handleSizeChange(val) {
          this.search.pageSize = val
          this.search.pageNum = 1
          this.select_reports()
        },
        handleCurrentChange(val) {
          this.search.pageNum = val
          this.select_reports()
        },
        select_reports() {
            let that = this
            this.$http.post(`reports/select_reports`,{ 
                id: this.search.id,
                wareId: this.search.wareId,
                pageNum: this.search.pageNum,
                pageSize: this.search.pageSize,
                isMoney: this.search.isMoney,
                isFinal: this.search.isFinal,
                supply: this.search.supply,
                incomingReason: this.search.incomingReason,
                outReason: this.search.outReason,
                nextDoDate: this.search.nextDoDate ? this.search.nextDoDate.getTime().toString().substr(0, 10): '',
                nextDate: this.search.nextDate ? this.search.nextDate.getTime().toString().substr(0, 10): '',
                doDate: this.search.doDate ? this.search.doDate.getTime().toString().substr(0, 10): '',
                date: this.search.Date ? this.search.Date.getTime().toString().substr(0, 10): '',
                color: this.search.color,
                types: this.search.typearray.length>0 ? this.search.typearray.join(','): '',
                remark: this.search.remark,

            })
               .then((data)=>{
                   this.tableData = data.data.list
                   this.search.total = data.data.total

                

                })
                .catch(function (error) {
                    console.log(error);
                    that.$message({
                        message: '接口报错',
                        type: 'error'
                      });
                }) 
        },
        exportcus() {
            let that = this
          this.$exporthttp.post(`reports/export_report_list`,{
                id: this.search.id,
                wareId: this.search.wareId,
                isMoney: this.search.isMoney,
                isFinal: this.search.isFinal,
                supply: this.search.supply,
                incomingReason: this.search.incomingReason,
                outReason: this.search.outReason,
                nextDoDate: this.search.nextDoDate ? this.search.nextDoDate.getTime().toString().substr(0, 10): '',
                nextDate: this.search.nextDate ? this.search.nextDate.getTime().toString().substr(0, 10): '',
                doDate: this.search.doDate ? this.search.doDate.getTime().toString().substr(0, 10): '',
                date: this.search.Date ? this.search.Date.getTime().toString().substr(0, 10): '',
                color: this.search.color,
                types: this.search.typearray.length>0 ? this.search.typearray.join(','): '',
                remark: this.search.remark,


          },{
            
            responseType: 'arraybuffer'
          })
            .then(function (res) {
              console.info(res)              

              let fileName = decodeURI(res.headers['file-name'])
              let data = res.data

              


              if (data && !data.byteLength) {
                alert('表格数据为空，无法导出！');
                return;
              }
              try {
                let linkElement = document.createElement('a');
                let blob = new Blob([data], {
                  type: 'application/octet-stream'
                });


                let url = window.URL.createObjectURL(blob);
                linkElement.setAttribute('href', url);
                linkElement.setAttribute("download", fileName);




                let clickEvent = new MouseEvent("click", {
                  "view": window,
                  "bubbles": true,
                  "cancelable": false
                });
                linkElement.dispatchEvent(clickEvent);
              } catch (ex) {
                console.log(ex);
              }
            })
            .catch(function (error) {
              console.log(error);
              that.loading2 = false
              that.$message({
                  message: '接口报错',
                  type: 'error'
                });
            });
        },
    },
}
</script>
<style>
    .table-wrap .el-table td, .el-table th {
      padding: 4px 0px;
        text-align: center;
        font-size: 12px;

    } 
    .table-wrap .el-table .cell, .el-table th div {
        

    }
    .table-wrap .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    }



</style>
<style spoced lang="less">
.inpucus {
    opacity: 0;
    background: red;
    width: 60px;
    height: 26px;
    z-index: 10;
    position: absolute;
    left: 240px;
    top: 0px;

    &.iupzinde {
        z-index: 1;
    }
}
.top-head-setting {
    height: 36px;
    border-bottom: 1px solid #e2e2e2;
    padding-left: 30px;
    position: relative;
    font-size: 14px;

    .list {
        display: inline-block;
        min-width: 60px;
        line-height: 36px;
        height: 100%;
        text-align: center;
        margin-right: 34px;
        padding-left: 6px;
        padding-right: 6px;


        &.activex {
            color: #409eff;
        }
        
    }
}
.firststopwrap {
    span {
        font-size: 12px;
    }
}
.cangchu {
    height: calc(100vh - 160px); 

    &-top {
        border-bottom: 1px solid #e2e2e2;
        margin-top: 20px;
        padding-left: 10px;


        .search-p {
            display: inline-block;
            margin-bottom: 20px;
            margin-right: 20px;
            font-size: 13px;

            .input-class {
                display: inline-block;
                width: 180px;
                margin-right: 20px
            }
        }
    }

    .table-wrap {
        margin-top: 10px;
        width: calc(100vw - 90px); 
        position: relative;

        .pagination {
            position: absolute;
            bottom: 0px;
            right: 20px;
          }

    }
}
  
</style>
