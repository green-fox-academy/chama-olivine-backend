# Node.JS - MongoDB basic project

## Steps

- Copy this repository
- Use the following commands:
  - `npm i` - install the dependencies
  - `npm start` - start your app
  - `npm test` - start your test
  - `npm run lint` - start the linter
- For using mongoDB write this into your `index.js`:
```js
const mongoose = require('mongoose');

mongoose.connect('Connection String', 
{ 
  useNewUrlParser: true,
  useCreateIndex: true, 
});

```

- Replace `Connection String` into your connection string.
- Following folder structure should be the best:
  - models
  - services
  - controllers
  - routes
  - test
