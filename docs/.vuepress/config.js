module.exports = {
  title: 'East China 个人博客',
  description: '一个菜鸟小前端',
  base: '/blog/',
  head: [
    ['link', { rel: 'icon', href: '/images/favicon.ico' }],
  ],
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      {
        text: 'vue全家桶',
        items: [
          { text: 'vue', link: '/vue-family/vue/' },
          { text: 'vue-router', link: '/vue-family/vue-router/' },
          { text: 'vuex', link: '/vuex/' }
        ]
      },
      {
        text: 'JavaScript',
        items: [
          { text: '算法', link: '/javascript/algorithm/' }
        ]
      },
      { text: '关于', link: '/about/' },
      { text: 'Github', link: 'https://github.com/276259822/blog' }
    ],
    sidebar: {
      '/vue-family/': [
        {
          title: 'vue',
          path: '/vue-family/vue/',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/vue-family/vue/'
          ]
        },
        {
          title: 'vue-router',
          path: '/vue-family/vue-router/',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/vue-family/vue-router/',
            ['/vue-family/vue-router/resetRouter', '重置路由']
          ]
        }
      ],
      '/javascript/': [
        {
          title: '算法',
          path: '/javascript/algorithm/',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ['/javascript/algorithm/Cartesian-product', '笛卡尔积算法']
          ]
        }
      ],
      '/about/': [
        ''
      ]
    },
    sidebarDepth: 2,
    lastUpdated: 'Last Updated'
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': 'assets'
      }
    }
  }
}
