'use strict'

if (process.env.NODE_ENV === 'production') {
    const mod = require('./system-input.cjs.production.min.js');
    module.exports = mod.default ?? {};
    for (const [key, value] of Object.entries(mod)) {
        module.exports[key] = value;
    }
} else {
    const mod = require('./system-input.cjs.development.js');
    module.exports = mod.default ?? {};
    for (const [key, value] of Object.entries(mod)) {
        module.exports[key] = value;
    }
}
