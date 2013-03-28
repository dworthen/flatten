var flatten = module.exports = function (obj, options) {
    if(!obj) return undefined;

    options = options || {};

    var _into = options.into || {}
        , _prefix = options.prefix || ''
        , opts = {
            prefix: _prefix,
            into: _into,
            ignoreArrays: options.ignoreArrays ? true : false
        };

    for(var key in obj) {
        var newKey = opts.prefix = (_prefix + key + '.').replace(/\.(\d+)\./g, '[$1]');
        if (obj.hasOwnProperty(key)) {
            var prop = obj[key];
            if(prop && typeof prop === 'object' &&
                !(prop instanceof Date || prop instanceof RegExp) &&
                !(opts.ignoreArrays && prop instanceof Array)) {
                flatten(prop, opts);
            } else {
                _into[newKey.replace(/\.$/, '')] = prop;
            }
        }
    }

  return _into;
};