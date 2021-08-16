module.exports = {
    title: '刘圳槟的个人博客',
    description: '刘圳槟的个人博客',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
        nav: [ // 导航栏配置
            { text: '前端知识体系', link: '/knowledge/css' },
        ],
        sidebar: {
            '/knowledge': [{
                title: '前端知识体系',
                collapsable: false,
                children: [
                    { title: 'JavaScript', path: '/knowledge/javascript' },
                    { title: 'HTML和CSS', path: '/knowledge/css' },
                    { title: '计算机基础', path: '/knowledge/computer' },
                    { title: '算法', path: '/knowledge/algorithms' },
                ]
            }]
        },
        sidebarDepth: 2, // 侧边栏显示2级
    }
};