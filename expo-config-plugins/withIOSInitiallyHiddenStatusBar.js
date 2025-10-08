const { withInfoPlist } = require('expo/config-plugins');

const withHiddenStatusBar = _config => {
  return withInfoPlist(_config, config => {
    config.modResults.UIStatusBarHidden = true;
    return config;
  });
};

module.exports = withHiddenStatusBar;
