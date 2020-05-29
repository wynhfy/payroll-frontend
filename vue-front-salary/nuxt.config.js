module.exports = {

  router: {
    extendRoutes(routes, resolve) {         //路由配置扩展
        routes.push({
            name: 'personnalCenter',                    //到个人中心的路由
            path: '/center/:id',      //路由路径
            props: true,                    // 允许props
            component: resolve(__dirname, 'pages/center.vue') //路由组件地址
        }),
        routes.push({
          name: 'updateCenter',                    //从路由中心到修改个人信息
          path: '/modifiedCenter/:id',      
          props: true,                    
          component: resolve(__dirname, 'pages/modifiedCenter.vue') 
        }),
        routes.push({
          name: 'overWorkCenter',                    //到加班打卡的路由
          path: '/overWork/:id',      
          props: true,                    
          component: resolve(__dirname, 'pages/overWork.vue') 
        }),
        routes.push({
          name: 'attendanceCenter',                    //到考勤打卡的路由
          path: '/attendance/:id',      
          props: true,                    
          component: resolve(__dirname, 'pages/attendance.vue') 
        }),
        routes.push({
          name: 'salaryCenter',                    //到工资查询的路由
          path: '/salary/:id',      
          props: true,                    
          component: resolve(__dirname, 'pages/salary.vue') 
        })
    }
  },
    

  plugins: [
    { src: '~/plugins/nuxt-element-ui-plugin.js', ssr: false } 
  ],
   
  /*
  ** Headers of the page
  */
  head: {
    title: 'payroll前台系统',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '{{escape description }}' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

