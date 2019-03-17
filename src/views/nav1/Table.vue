<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="searchKey.nameOrphone" placeholder="输入姓名或手机号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="searchByNameOrPhone">查询</el-button>
				</el-form-item>
				<!-- <el-form-item>
					<el-input v-model="filters.phone" placeholder=""></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">查询</el-button>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="Name" label="姓名" width="120">
			</el-table-column>
			<!-- <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
			</el-table-column> -->
			<el-table-column prop="Grade" label="年级" width="100">
			</el-table-column>
			<el-table-column prop="Tel" label="手机" width="150">
			</el-table-column>
			<el-table-column prop="WeChat" label="微信" min-width="180">
			</el-table-column>
			<el-table-column prop="level" label="等级" min-width="180" :formatter="getItemLevel">
			</el-table-column>
			<el-table-column label="是否为会员" min-width="180" :formatter="formatIsVip">
						<!-- <template slot-scope="scope">
							<span>{{scope.row.Status!==0?'是':'否'}}</span>
						</template> -->
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="Name">
					<el-input v-model="editForm.Name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.Sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机">
					<el-input v-model="editForm.Tel" ></el-input>
				</el-form-item>
				<el-form-item label="微信">
					<el-input v-model="editForm.Wechat" ></el-input>
				</el-form-item>
				<el-form-item label="年级">
						<el-select v-model="editForm.Grade" placeholder="请选择">
							<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
				</el-form-item>
				<el-form-item label="等级">
						<el-select v-model="editForm.Level" placeholder="请选择">
							<el-option
							v-for="item in levelList"
							:key="item.LevelId"
							:label="item.Name"
							:value="item.LevelId">
							</el-option>
						</el-select>
				</el-form-item>
				<el-form-item label="会员">
						<el-switch v-model="editForm.Status" :off-value=0 :on-value=1 @change="change($event)">
						</el-switch>
				</el-form-item>
				<!-- <el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
				</el-form-item> -->
				<!-- <el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item> -->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="Name">
					<el-input v-model="addForm.Name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.Sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机">
					<el-input type="" v-model="addForm.Tel"></el-input>						
				</el-form-item>
				<el-form-item label="微信">
					<el-input type="" v-model="addForm.WeChat"></el-input>						
				</el-form-item>
				<el-form-item label="年级">
						<el-select v-model="addForm.Grade" placeholder="请选择">
							<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
				</el-form-item>
				<!-- <el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item> -->
				<!-- <el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item> -->
				<!-- <el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item> -->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser,stu,getStuLevel,searchByName} from '../../api/api';
	export default {
		data() {
			return {
				searchKey:{
					nameOrphone:'',
					grade:''	
				},
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				pageSize:10,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				levelList:[],
				options:[
					{
					 value:'一',
					 label:'一年级'
					},
					{
					 value:'二',
					 label:'二年级'
					},
					{
					 value:'三',
					 label:'三年级'
					},
					{
					 value:'四',
					 label:'四年级'
					},
					{
					 value:'五',
					 label:'五年级'
					},
					{
					 value:'六',
					 label:'六年级'
					},
					{
					 value:'七',
					 label:'七年级'
					},
					{
					 value:'八',
					 label:'八年级'
					},
					{
					 value:'九',
					 label:'九年级'
					}									
				],
				//编辑界面数据
				editForm: {
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					Name: '',
					Sex: -1,
					Tel:'',
					Grade:'',
					WeChat:''
				}

			}
		},
		methods: {
			//item等级
			getItemLevel:function(row){
				const result=this.levelList.find((item)=>item.id==row.Level);
				// console.log(result);
				return result.Name;
			},
			//是否是vip
			formatIsVip:function(row,column){
				return row.Status==1?'是':'否'
			},
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			getStuLevel(){
					getStuLevel().then(res=>{
							this.levelList=res;
							console.log(this.levelList);
					})
			},
			
			change(val){
				console.log(val);
			},
			searchByNameOrPhone(){
				this.listLoading=true;
				searchByName({
					 info:this.searchKey.nameOrphone
				}).then((res)=>{
						this.listLoading=false;
						console.log(res);
						this.users=res;
				})
			},
			//获取用户列表
			getUsers() {
				let para = {
					pageSize:this.pageSize,
					pageNum:this.page
				};
				this.listLoading = true;
				stu(para).then((res)=>{
					this.listLoading=false;
					console.log(res);
					this.total = res.totalRow;
					this.users=res.data;
				})
				//NProgress.start();
				// getUserListPage(para).then((res) => {
				// 	this.total = res.data.total;
				// 	this.users = res.data.users;
				// 	this.listLoading = false;
				// 	//NProgress.done();
				// });
			},
			// getUsersByName(){
			// 	this.listLoading=true;
			// 	searchByName({info:this.searchKey.name}).then(res=>{
			// 			this.listLoading=false;
			// 			console.log(res);
			// 			this.users=res;
			// 	});
			// },
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { uuid: row.UUID };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				console.log(row);
				this.editForm = Object.assign({}, row);
				console.log(this.editForm);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					Name: '',
					Sex: -1,
					Tel:'',
					Grade:'',
					WeChat:''
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							//para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							//para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								console.log(res);
								//NProgress.done();
								if(res.code==200){
										this.$message({
											message: '提交成功',
											type: 'success'
										});
									this.$refs['addForm'].resetFields();
									this.addFormVisible = false;
									this.getUsers();
								}
								else{
									this.$message({
										message: res.msg,
										type: 'error'
									});
								}
								
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getUsers();
			this.getStuLevel();
			//getCookie();
		}
	}

</script>

<style scoped>

</style>