module.exports = {
  title: 'East China 个人博客',
  description: '一个菜鸟小前端',
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
      { text: '关于', link: '/about/' },
      { text: 'Github', link: 'https://github.com/276259822/blog' }
    ],
    sidebar: {
      '/vue-family/': [
        {
          title: 'vue',
          collapsable: true,
          children: [
            '/vue-family/vue/'
          ]
        },
        {
          title: 'vue-router',
          collapsable: true,
          children: [
            '/vue-family/vue-router/'
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
