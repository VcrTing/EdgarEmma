
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
  named: 'strapi-admin@gmail.com',
  pass: '1Qazxc2Wsxcv'
}

export default {
  baseURL,
  API,

  TEST,
  STRAPI,
  ENDPOINT
}
