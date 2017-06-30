const _ = require('lodash');
const express = require('express');
const Slapp = require('slapp');
const BeepBoopContext = require('slapp-context-beepboop');
const port = process.env.PORT || 3000;

const slapp = Slapp({ context: BeepBoopContext() });

const app = slapp.attachToExpress(express()).listen(port);

slapp.message('^(hi|hello|hey).*', ['direct_mention', 'direct_message'], (msg, text, greeting) => {
    msg.say(`${greeting}, how are you?`, { what: greeting })
        .route('handleHowAreYou');
});

// register a route handler
slapp.route('handleHowAreYou', (msg, state) => {
    msg.say(['Me too', 'Noted', 'That is interesting'])
});

app.get('/', (res, req) => {
    res.send('Hello');
});
