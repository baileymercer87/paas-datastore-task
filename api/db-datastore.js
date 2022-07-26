const {Datastore} = require('@google-cloud/datastore');
const ds = new Datastore({ namespace: 'sse2' });


function key(id) {
  return ds.key(['keys', id]);
}

// Handle DB.List
module.exports.list = async () => {
  let [data] = await ds.createQuery('keys').select('name').order('name').run();
  data = data.map((val) => val.name);
  return data;
};

// Handle GET request
module.exports.get = async (id) => {
  const [data] = await ds.get(key(id));
  if (data && data.val) return data.val;
  return '';
};

// Handle PUT request
module.exports.put = (id, val) => {
  const entity = {
    key: key(id),
    data: { name: id, val },
  }
  return ds.save(entity);
};

// Handle DELETE request
module.exports.delete = (id) => {
  return ds.delete(key(id));
};