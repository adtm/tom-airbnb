require("dotenv").config();
const app = require('./app');
const mongoose = require('mongoose'); 

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== "test") {
  mongoose.connect(process.env.MONGO_DB_DEV, { server: { socketOptions: { keepAlive: 1 } } });
}
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${process.env.NODE_ENV}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});

module.exports=app;