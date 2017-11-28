export default [{
    name: 'MENU', 
    value: [{
        id: 1,
        parentId: 0,
        label: '指标管理',
        route: '/tomato/target',
        show: true,
        order: 1,
        icon: 'arrow-graph-up-right',
    }, {
        id: 2,
        parentId: 0,
        order: 1,
        label: 'IDEA管理',
        route: '/tomato/idea',
        show: true,
        icon: 'ios-flower'
    }, {
        id: 3,
        parentId: 0,
        order: 1,
        label: '项目管理',
        route: '/tomato/project',
        show: true,
        icon: 'ios-briefcase'
    }, {
        id: 4,
        parentId: 0,
        order: 1,
        label: '项目报告',
        route: '/tomato/report',
        show: true,
        icon: 'ios-paper'
    }]
}]