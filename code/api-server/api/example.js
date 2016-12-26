// This is an example of a simple REST Api implementation.
//
// For debugging you can use "Advanced REST Client" for Google Chrome:
// https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo

const webService = require('web-service');

const errors = webService.errors;

const users = {};
let idCounter = 0;

module.exports = function exampleApi(api) {
  api.get('/example/users', () => Object.keys(users));

  api.get('/example/users/:id', ({ id }) => {
    if (!users[id])		{
      throw new errors.Not_found(`User ${id} not found`);
    }

    return Object.assign({}, users[id], { id });
  });

  api.post('/example/users', ({ name }) => {
    if (!name)		{
      throw new errors.Input_missing('"name" not specified');
    }

    idCounter++;
    const id = String(idCounter);

    users[id] = { name };

    return id;
  });

  api.patch('/example/users/:id', ({ id, name }) => {
		// throw new Error(123)

    if (!users[id])		{
      throw new errors.Not_found(`User ${id} not found`);
    }

    users[id].name = name;
  });

  api.delete('/example/users/:id', ({ id }) => {
		// throw new Error(123)

    if (!users[id])		{
      throw new errors.Not_found(`User ${id} not found`);
    }

    delete users[id];
  });

  api.post('/example/users/:id/picture', ({ id, fileName }) => {
		// testing uploading image spinner
		// return new Promise((resolve) => setTimeout(resolve, 3000))

		// throw new Error(123)

    if (!users[id])		{
      throw new errors.Not_found(`User ${id} not found`);
    }

    users[id].picture = fileName;
  });
};
