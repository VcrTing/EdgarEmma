'use strict';

const sms_work = require('../../extensions/send_work/index')
const running = require('../../plugins/smstrapi/work')

module.exports = {
  '1 * * * * *': () => {
    running()
    sms_work()
  }
};
