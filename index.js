var flatten = module.exports = function (obj, into, clone, seperator, prefix) {
  into = !clone ? obj : into || {};
  prefix = prefix || "";
  seperator = seperator || '.';

  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      var prop = obj[k];
      if (prop && typeof prop === "object" &&
        !(prop instanceof Date || prop instanceof RegExp || prop instanceof Array)) {
        flatten(prop, into, true, seperator, prefix + k + seperator);
      }
      else {
        into[prefix + k] = prop;
      }
    }
  }

  return into;
}