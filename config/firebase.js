const firebase = require('firebase')

const config = {
  apiKey: "AIzaSyBToHnGaxqBrWRalWuoeB7H1IOjcDGeTco",
  authDomain: "achiko-64287.firebaseapp.com",
  // For databases not in the us-central1 location, databaseURL will be of the
  // form https://[databaseName].[region].firebasedatabase.app.
  // For example, https://your-database-123.europe-west1.firebasedatabase.app
  databaseURL: "https://achiko-64287-default-rtdb.firebaseio.com/"
};
const app = firebase.initializeApp(config);

module.exports = app;