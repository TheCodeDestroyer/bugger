const _ = require('lodash');
const express = require('express');
const Slapp = require('slapp');
const BeepBoopConvoStore = require('slapp-convo-beepboop');
const BeepBoopContext = require('slapp-context-beepboop');
const port = process.env.PORT || 3000;

const slapp = Slapp({
    convo_store: BeepBoopConvoStore(),
    context: BeepBoopContext(),
    log: true,
    colors: true
});

const server = slapp.attachToExpress(express());

slapp.message('^(hi|hello|hey).*', ['direct_mention', 'direct_message'], (msg, text, greeting, match2) => {
    console.log(match2);
    msg.say({
            text: `${greeting}, how are you?`,
            attachments: [{
                text: '',
                callback_id: 'how_are_you',
                actions: [{
                    name: 'answer',
                    text: ':thumbsup:',
                    type: 'button',
                    value: 'up',
                    styled: 'default',
                }, {
                    name: 'answer',
                    text: ':thumbsdown:',
                    type: 'button',
                    value: 'down',
                    styled: 'default',
                }]
            }]
        })
        .route('handleHi', { what: greeting });
});

slapp.route('handleHi', (msg, state) => {
    if (msg.type !== 'action') {
        msg.say('You must choose a button!').route('handleHi', state);
        return;
    }
    msg.say('Me too');
});

server.get('/', (res, req) => {
    res.send('Hello');
});

server.get('/healthz', (res, req) => {
    res.send({ version: process.env.VERSION, id: process.env.BEEPBOOP_ID })
});

server.listen(port);