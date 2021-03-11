const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const triggersHandler = require('./triggers/handler');
const cors = require('cors');
require("dotenv/config")

mongoose.connect(String(process.env.DB_CONNECTION),
 {useNewUrlParser: true, useUnifiedTopology: true, poolSize: 10},
 () => console.log("Mongoose Connected"))
const app = express();

//MiddleWare
app.use(bodyParser.json());
app.use(cors());


// app.use('/posts', () => {
//     console.log("Running basic middleware");
// })

//import Routes
// const subRoute = require('./routes/subscription');
const GoogleApiRoute = require('./routes/googleProvider');
const GithubApiRoute = require('./routes/githubProvider');
const DiscordApiRoute = require('./routes/discordProvider');
const FacebookApiRoute = require('./routes/facebookProvider');
const SpotifyApiRoute = require('./routes/spotifyProvider');
const ActionRoute = require('./routes/action');
// const servicesRoute = require('./routes/services');
const UserRoute = require('./routes/user');

// app.use('/api/subscription', subRoute);
app.use('/api/user', UserRoute);
app.use('/api/actions', ActionRoute);
// app.use('/api/services', servicesRoute);
app.use('/api/google', GoogleApiRoute);
app.use('/api/spotify', SpotifyApiRoute);
app.use('/api/github', GithubApiRoute);
app.use('/api/discord', DiscordApiRoute);
app.use('/api/facebook', FacebookApiRoute);

// Routes
app.get("/", (req, res) => {
    res.send('Home Page');
})

app.get("/user", (req, res) => {
})
let tick = 0;


// CALL USERS TRIGGERS EVERY X SECONDS
setTimeout(function run() {
    if (++tick > 30) {
        triggersHandler.handleTriggers()
        tick = 0;
    }
    setTimeout(run, 1000);
})

// Listening port
app.listen(8080);

