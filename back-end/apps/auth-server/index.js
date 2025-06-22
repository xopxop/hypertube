const express = require('express');
require('dotenv').config({ path: '../../.env.common' })
const PORT = process.env.AUTH_SERVER_PORT;
const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Auth server is running on port ${PORT}`);
});
