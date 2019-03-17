//import { resolve } from 'dns';
let routes = [
    {
        path: '/login',
        component: (resolve)=>require(['./views/Login.vue'],resolve),
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component:(resolve)=>require(['./views/404.vue'],resolve),
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component:(resolve)=>require(['./views/Home.vue'],resolve),
        name: '学生管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/table', component:(resolve)=>require(['./views/nav1/Table.vue'],resolve), name: '学生信息' },
            { path: '/main', component:(resolve)=>require(['./views/Main.vue'],resolve), name: '主页', hidden: true },
            { path: '/form', component:(resolve)=>require(['./views/nav1/Form.vue'],resolve), name: '等级设置'}
            // { path: '/user', component: user, name: '列表' }
        ]
    },
    {
        path: '/',
        component:(resolve)=>require(['./views/Home.vue'],resolve),
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/preStu', component:(resolve)=>require(['./views/nav3/preStu.vue'],resolve), name: '预报名学生' }
        ]
    },
    {
       path:'/',
       component:(resolve)=>require(['./views/Home.vue'],resolve),
       name:'',
       iconCls: 'fa fa-address-card',
       leaf: true,//只有一个节点
       children: [
        { path: '/money', component:(resolve)=>require(['./views/nav4/money.vue'],resolve), name: '佣金发放' }
       ] 
    }, 
    {
        path: '/',
        component:(resolve)=>require(['./views/Home.vue'],resolve),
        name: '',
        leaf:true,//只有一个节点
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component:(resolve)=>require(['./views/charts/echarts.vue'],resolve), name: '学生统计' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];
export default routes;