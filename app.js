const express = require('express');
const app = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');

//app config
app.use(helmet.xssFilter()); 

// serving public files
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Mongoose setup
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/issue-tracker", { useNewUrlParser: true });
mongoose.Promise = global.Promise;
//Get the default connection
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
   console.log("Connected to database");
   //configuring the listening port
   const listener = app.listen(process.env.PORT || 3000, function () {
       console.log('Your app is listening on port ' + listener.address().port);
   });
});

//issue-tracker routing
const issue_tracker_routes = require('./routes/issues.route');
app.use('/api/issues', issue_tracker_routes);

//home routing
app.get("/", function (req, res) {
   res.sendFile(__dirname + '/views/index.html');
});
