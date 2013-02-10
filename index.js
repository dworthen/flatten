var flatten = module.exports = function (obj, options) {
  var _into = obj; // = options && !options.clone ? obj : options.into || {};
  var _prefix = (options && options.prefix) ? options.prefix : "";
  var _seperator = (options && options.seperator) ? options.seperator : '.';
  var _ignoreArrays = (options && options.ignoreArrays) ? true : false;

  if (options && options.clone) {
    _into = options.into || {};
  } 

  var opts = {
    into: _into,
    clone: true,
    seperator: _seperator,
    ignoreArrays: _ignoreArrays
  };

  // console.log('into: %s, pre: %s, sep: %s, ig: %s',_into, _prefix, _seperator, _ignoreArrays);

  for (var k in obj) {
    opts.prefix = _prefix + k + _seperator;
    if (obj.hasOwnProperty(k)) {
      var prop = obj[k];
      if (prop && typeof prop === "object" &&
        !(prop instanceof Date || prop instanceof RegExp)) {
          if(_ignoreArrays) {
            if(!(prop instanceof Array)) {
              flatten(prop, opts);
            } else {
              _into[_prefix + k] = prop;
            }
          } else {
            flatten(prop, opts);  
          }
      }
      else {
        _into[_prefix + k] = prop;
      }
    }
  }

  // console.log(_into);

  return _into;
}