<template>
		<section>
			<!--工具条-->
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="filters">
						<el-form-item>
							<el-input v-model="filters.name" placeholder="姓名"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary">查询</el-button>
						</el-form-item>
						<el-form-item>
						<el-button type="primary" @click="handleAdd">新增</el-button>
					</el-form-item>
				</el-form>
			</el-col>

			<!--列表-->
			<el-table :data="levelList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
				<el-table-column type="selection">
				</el-table-column>
				<el-table-column type="index">
				</el-table-column>
				<el-table-column prop="Name" label="等级">
				</el-table-column>
				<!-- <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
				</el-table-column> -->
				<el-table-column label="操作">
					<template scope="scope">
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!--新增界面-->
			<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
				<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
					<el-form-item label="等级" prop="Name">
						<el-input v-model="addForm.Name" auto-complete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="addFormVisible = false">取消</el-button>
					<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
				</div>
			</el-dialog>
			<!--编辑界面-->
			<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
				<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
					<el-form-item label="等级" prop="Name">
						<el-input v-model="editForm.Name" auto-complete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="editFormVisible = false">取消</el-button>
					<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
				</div>
			</el-dialog>
		</section>
</template>

<script>
	import {getStuLevel,addStuLevel,removeStuLevel,editStuLevel} from '../../api/api'
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				levelList:[],
				listLoading:false,
				addFormVisible:false,
				addLoading: false,
				//新增界面数据
				addForm: {
					Name: ''
				},
				addFormRules: {
					Name: [
						{ required: true, message: '请输入等级', trigger: 'blur' }
					]
				},
				editLoading:false,
				editFormVisible: false,
				editForm:{},
				editFormRules: {
					Name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleAdd(){
				this.addFormVisible = true;	
			},
			getLevel(){
				 this.listLoading = true;
				 getStuLevel().then(res=>{
					     this.listLoading=false;		
						 console.log(res);
						 this.levelList=res
				 })
			},
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.LevelId=this.levelList.length+1;
							//para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addStuLevel(para).then((res) => {
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
									this.getLevel();
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
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeStuLevel(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getLevel();
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
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editStuLevel(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								if(res.code=='200'){
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getLevel();
								}
								else{
									this.$message({
										message:res.msg,
										type: 'error'
									});
								}
							});
						});
					}
				});
			},
			selsChange(){

			}
		},
		mounted() {
			this.getLevel();
		},
	}

</script>