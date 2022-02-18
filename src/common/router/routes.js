
import Home from '@/pages/Home/Home'

import tool_csv from './tool/tool_csv'
import company from './child/company'
import add_company from './child/add_company'

const AllRoutes = [
    {
      path: '/home',
      component: Home,
      redirect: '/home/company_my',
      children: [
        ...tool_csv,
        ...company,
        ...add_company
      ]
    },
    {
      path: '',
      redirect: '/home',
      meta: {
        title: '首页'
      }
    },
]


export default AllRoutes