
const TEST = false
const TEST_LOCAL = false

const baseURL = 'https://strapi07.svr.up5d.com'
// const baseURL = 'http://127.0.0.1:1337'
const API = baseURL // + '/api'

const VERSION = '0.70'
const VERSION_TIMED = '2022-04-04'

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
  TEST_LOCAL,
  
  STRAPI,
  ENDPOINT,

  VERSION,
  VERSION_TIMED
}
