
const TEST = false

const baseURL = 'https://strapi07.svr.up5d.com' // 'http://127.0.0.1:1337' // 'https://strapi01.svr.up5d.com'
const API = baseURL // + '/api'

const ENDPOINT = {
  user: '/users',
  remind: '/reminds',
  company: '/companies',
  import_record: '/import-records',
  company_origin: '/company-origins',
  company_search: '/companies_search'
}

const STRAPI = {
  named: 'vcrting@163.com',
  pass: 'ZT123zlt'
}

export default {
  baseURL,
  API,

  TEST,
  STRAPI,
  ENDPOINT
}
