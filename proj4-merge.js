function merge() {
  const instances = [];

  const add = it => {
    if (!it) return;
    if (Array.isArray(it)) return it.forEach(add);
    if (it.default) it = it.default;
    instances.push(it);
  };

  Array.from(arguments).forEach(add);

  if (instances.length === 0) throw Error("[proj4-merge] merge called with zero instances of proj4");

  const [first, ...rest] = instances;

  rest.forEach(instance => {
    first.defs(Object.entries(instance.defs));
  });

  return first;
}

module.exports = merge;
