'use strict';

const sms_work = require('../../extensions/send_work/index')
const running = require('../../plugins/smstrapi/work')
const cp_ref = require('../../extensions/company_refresh')

module.exports = {
  '1 * * * * *': () => {
    running()
    sms_work()
    // cp_ref.running()
  }
};
