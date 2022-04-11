
const TEST = false

const baseURL = 'https://strapi07.svr.up5d.com'
// const baseURL = 'http://127.0.0.1:1337'

const API = baseURL // + '/api'

const VERSION = '0.8'
const VERSION_TIMED = '2022-04-11'

const ENDPOINT = {
  user: '/users',
  send: '/sends',
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
  TEST_LOCAL: baseURL.endsWith('1:1337'),
  
  STRAPI,
  ENDPOINT,

  VERSION,
  VERSION_TIMED
}
