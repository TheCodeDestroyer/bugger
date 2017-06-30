const _ = require('lodash');
const express = require('express');
const Slapp = require('slapp');
const BeepBoopConvoStore = require('slapp-convo-beepboop');
const BeepBoopContext = require('slapp-context-beepboop');
const port = process.env.PORT || 3000;

const slapp = Slapp({
    convo_store: BeepBoopConvoStore(),
    context: BeepBoopContext()
});

const server = slapp.attachToExpress(express());

slapp.message('^(hi|hello|hey).*', ['direct_mention', 'direct_message'], (msg, text, greeting) => {
    msg.say({
            text: `${greeting}, how are you?`
        })
        .route('handleHowAreYou');
});

// register a route handler
slapp.route('handleHowAreYou', (msg,) => {
    msg.say(['Me too', 'Noted', 'That is interesting'])
});

server.get('/', (res, req) => {
    res.send('Hello');
});

server.get('/healthz', (res, req) => {
    res.send({ version: process.env.VERSION, id: process.env.BEEPBOOP_ID })
});

server.listen(port);