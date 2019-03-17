import axios from 'axios';
import Qs from 'qs';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials=true;
let base = '';
export const requestLogin = params => { return axios.post(`${base}/MaShuCMS/login`, Qs.stringify(params)).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/MaShuCMS/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/MaShuCMS/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/MaShuCMS/stu/del`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/MaShuCMS/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.post(`${base}/MaShuCMS/stu/edit`, Qs.stringify(params)); };

export const searchByName= params =>{return axios.post(`${base}/MaShuCMS/stu/search`,Qs.stringify(params)).then(res=>res.data)} 

export const getCookie= params =>{return axios.post(`${base}/MaShuCMS`,Qs.stringify(params)).then(res=>res.data);};

export const getPreS= params =>{return axios.post(`${base}/MaShuCMS/pre`,Qs.stringify(params)).then(res=>res.data);};

export const updatePreS= params =>{return axios.post(`${base}/MaShuCMS/pre/changeStatus`,Qs.stringify(params)).then(res=>res.data);};

export const search= params => {return axios.post(`${base}/MaShuCMS/pre/search`,Qs.stringify(params)).then(res=>res.data);};

export const stu = params =>{return axios.post(`${base}/MaShuCMS/stu`,Qs.stringify(params)).then(res=>res.data);};

export const addUser= params =>{return axios.post(`${base}/MaShuCMS/stu/save`,Qs.stringify(params)).then(res=>res.data);};

export const getStuLevel = params =>{return axios.post(`${base}/MaShuCMS/level`,Qs.stringify(params)).then(res=>res.data);};

export const addStuLevel= params => {return axios.post(`${base}/MaShuCMS/level/save`,Qs.stringify(params)).then(res=>res.data)}

export const removeStuLevel= params =>{return axios.post(`${base}/MaShuCMS/level/del`,Qs.stringify(params)).then(res=>res.data)}

export const editStuLevel = params => {return axios.post(`${base}/MaShuCMS/level/edit`,Qs.stringify(params)).then(res=>res.data)}

export const tableData= params =>{return axios.post(`${base}/MaShuCMS/jxl/month`,Qs.stringify(params)).then(res=>res.data)}

export const allTableData=params =>{return axios.post(`${base}/MaShuCMS/jxl/monthAll`,Qs.stringify(params)).then(res=>res.data)}

export const loadData= params =>{return axios.post(`${base}/MaShuCMS/jxl/byMonth`,Qs.stringify(params))}

export const loginOut = params => {return axios.post(`${base}/MaShuCMS/logout`,Qs.stringify(params)).then(res=>res.data)}

//佣金发放
export const pay= params =>{return axios.post(`${base}/MaShuCMS/pay`,Qs.stringify(params)).then(res=>res.data)}

export const deliverPay = params =>{return axios.post(`${base}/MaShuCMS/pay/pay`,Qs.stringify(params)).then(res=>res.data)}

export const getUserByPhoneForPay= params =>{return axios.post(`${base}/MaShuCMS/pay/getByTel`,Qs.stringify(params)).then(res=>res.data)}
