'use strict';

const sms_work = require('../../extensions/send_work/index')
const running = require('../../plugins/smstrapi/work')
const impo = require('../../extensions/import/index')

module.exports = {
  '1 * * * * *': () => {
    running()
    sms_work()
    impo.import_company()
  }
};
