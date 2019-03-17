<template>
    <section class="chart-container">
        <!--工具条-->
        <el-row>
            <el-col :span="6">
                <div class="block">
                    <span class="demonstration">选择月份</span>
                    <el-date-picker v-model="currentMonth" type="month" placeholder="选择月" format="yyyy-MM-dd" @change="getCurrentMonth($event)">
                    </el-date-picker>
                </div>
            </el-col>
            <el-col :span="12">
                 <el-button type="success" @click="getAll()">全部数据</el-button>
            </el-col>
        </el-row>
        <el-row v-loading="chartLoading">
            <el-col :span="12">
                <div id="chartColumn" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartByReg" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartLine" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartPie" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="24">
                <template v-if="all">
                        <a :href="'http://www.mashumaker.com/MaShuCMS/jxl/monthAll'" target="_blank" style="float: right;">下载excel表>></a>
                </template>
                <template v-else>
                            <!-- <a href="http://echarts.baidu.com/examples.html" target="_blank" style="float: right;">下载excel表>></a> -->
                            <a :href="'http://www.mashumaker.com/MaShuCMS/jxl/byMonth?month='+this.currentMonth" target="_blank" style="float: right;">下载excel表>></a>
                            <!-- <el-button type="primary" style="float:right" @click="loadexcel">下载当前月excel表>></el-button> -->
                </template> 
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'
    import {tableData,loadData,allTableData} from '../../api/api';
    export default {
        data() {
            return {
                currentMonth:'',
                chartColumn: null,
                chartBar: null,
                chartLine: null,
                chartPie: null,
                chartLoading:false,
                x1data:[],
                y1data:[],
                x2data:[],
                y2data:[],
                x3data:[],
                y3data:[],
                pieData:[],
                all:false
            }
        },

        methods: {
            getAll(e){
                   this.chartLoading=true;  
                   allTableData({}).then(res=>{
                        console.log(res);
                        this.chartLoading=false;
                        this.all=true;
                        this.dataInCharts(res);
                   })
            },
            getCurrentMonth(e){
                    this.all=false;
                    console.log(this.currentMonth);
                    this.currentMonth=e;
                    //console.log(e);
                    if(!e){
                         return false;
                    }
                    this.chartLoading=true;
                    tableData({month:e}).then(res=>{
                          this.chartLoading=false;
                          this.dataInCharts(res);
                         
                    })

            },
            dataInCharts(res){
                 //重置数据
                    this.x1data=[];
                    this.x2data=[];
                    this.y1data=[];
                    this.y2data=[];
                    this.x3data=[];
                    this.y3data=[];
                    this.pieData=[];
                     console.log(res);
                    res[0].Promoters.map((item)=>{
                            this.x1data.push(item.Name);
                            this.y1data.push(item.Count);
                    })
                    res[1].Pre.map((item)=>{
                        this.x2data.push(item.Date);
                        this.y2data.push(item.Count);
                    })
                    res[2].PreSuccess.map((item)=>{
                        this.x3data.push(item.Date);
                        this.y3data.push(item.Count);
                    })
                    res[3].StudentLevel.map((item)=>{
                        console.log(item);
                        let i={
                                value:item.Count,
                                name:item.Level
                            }
                        this.pieData.push(i);
                    })
                    console.log(this.pieData);
                    console.log(this.x1data);
                    console.log(this.y1data);
            },
            drawColumnChart() {
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartColumn.setOption({
                  title: { text: '推广者-推广数' },
                  tooltip: {},
                  xAxis: {
                      data:this.x1data
                  },
                  yAxis: {},
                  series: [{
                      name: '人数',
                      type: 'bar',
                      data:this.y1data,
                      itemStyle:{
                           normal:{
                               color:"#20a0ff"
                           }
                      }
                    }]
                });
            },
            drawLineChartByReg() {
                this.chartLine = echarts.init(document.getElementById('chartByReg'));
                this.chartLine.setOption({
                    title: {
                        text: '报名人数'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['麻曙创客']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data:this.x3data
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '人数',
                            type: 'line',
                            stack: '总量',
                            data: this.y3data,
                            itemStyle:{
                                normal:{
                                color:"#20a0ff"
                                }
                            }
                        }
                    ]
                });
            },
            drawLineChart() {
                this.chartLine = echarts.init(document.getElementById('chartLine'));
                this.chartLine.setOption({
                    title: {
                        text: '预报名人数'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['麻曙创客']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data:this.x2data
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '人数',
                            type: 'line',
                            stack: '总量',
                            data: this.y2data,
                            itemStyle:{
                                normal:{
                                    color:"#20a0ff"
                                }
                            }
                        }
                    ]
                });
            },
            drawPieChart() {
                this.chartPie = echarts.init(document.getElementById('chartPie'));
                this.chartPie.setOption({
                    title: {
                        text: '会员数量',
                        subtext: '麻曙创客',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    // legend: {
                    //     orient: 'vertical',
                    //     left: 'left',
                    //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                    // },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data:this.pieData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
            drawCharts() {
                this.drawColumnChart()
                this.drawLineChartByReg()
                this.drawLineChart()
                this.drawPieChart()
            },
            getMonthFirstDay(){
                let date=new Date();
                // let d=date.setDate(1);
                // console.log(d);
                date.setDate(1);
                let y=date.getFullYear();
                console.log(y);
                let m=date.getMonth()+1;
                let d=date.getDate();
                m=m<10?"0"+m:m;
                d=d<10?"0"+d:d;
                return y+'-'+m+'-'+d;
            }
        },
        created(){
            this.currentMonth=this.getMonthFirstDay();
        },
        mounted: function () {
             this.getCurrentMonth(this.currentMonth);
             this.drawCharts();
        },
        updated: function () {
            // this.currentMonth=this.getMonthFirstDay();
            this.drawCharts()
        }
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>
