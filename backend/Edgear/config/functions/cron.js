'use strict';

const sms_work = require('../../extensions/send_work/index')
const running = require('../../plugins/smstrapi/work')
const dbpub = require('../../extensions/dbpub_refresh')

module.exports = {
  '1 * * * * *': () => {
    running()
    sms_work()
    // dbpub.fetch()
  }
};
