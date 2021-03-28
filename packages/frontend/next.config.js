const path = require('path');

module.exports = {
    experimental: {
        optimizeFonts: true,
    },
    webpack(config, options) {
        config.resolve.alias['@'] = path.join(__dirname, 'src');
        return config;
    },
};
