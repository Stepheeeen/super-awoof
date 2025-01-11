const path = require('path');

module.exports = {
  resolver: {
    extraNodeModules: {
      tty: path.resolve(__dirname, 'node_modules/node-libs-react-native/mock/tty.js'),
    },
  },
};
