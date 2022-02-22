'use strict';

const running = require('../../plugins/smstrapi/work')

module.exports = {
  '1 * * * * *': () => {
    running()
  }
};
