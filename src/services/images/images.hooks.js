const axios = require('axios').default;
const errors = require('@feathersjs/errors');

module.exports = {
  before: {
    all: [],
    find: [
      async context => {
        const {
          app,
          params
        } = context;
        const {
          query
        } = params;

        const FLICKR_URL = app.get('flickr-url');

        let tags = '';

        if (query.tags !== undefined) {
          tags = '&tags=' + JSON.parse(JSON.stringify(query.tags));
        }

        await axios.get(FLICKR_URL + '?format=json' + tags).then((res) => {
          let response = res.data.substring(15, res.data.length);
          response = response.substring(0, response.length - 1);
          response = JSON.parse(response);
          context.result = response;
        }).catch((err) => {
          throw new errors.Unprocessable('Flickr Server not response', {
            error: err
          });
        });

        return context;
      }
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
