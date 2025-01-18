Short Mongo Id
==============
Generate short id's from MongoDB Object ID's for use in url's or other applications.

Id's are generated from the timestamp and counter of the MongoDB Id, with some slight variation. They should be reasonably unique.

This is, unfortunately, a one-way function. It will reliably produce the same short id for the same MongoDB Id, but the operation can't be reversed (it is missing information about the machine id, process id, and most of the counter).

Install
-------
Use NPM:

```bash
$ npm i -S di-short-mongo-id
```

Use
---

Pass a MongoDB ObjectId (or a string that can be converted to one) and it will return a reasonably unique short id.

```javascript
const shortId = require('di-short-mongo-id');

shortId("597b3ae1bca3cc7f2c33128e"); // returns "wrxtm4nb"
shortId("597b3afabca3cc7f2c331290"); // returns "87qum4nb"
shortId("597b3afabca3cc7f2c331290", true); // returns "87QUM4NB"
```

License
-------
MIT (see [License](LICENSE))