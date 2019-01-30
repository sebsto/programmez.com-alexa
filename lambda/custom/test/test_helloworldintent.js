'use strict';

let chai = require('chai');
chai.use(require('chai-string'));
let should = chai.should();

const event = require('./helloworldintent.json')
const lambda = require('../index');

let skill_response;

describe('Hello World : HelloWorldIntent', function () {

    // pre-requisites
    before(() => {
        return new Promise((resolve, reject) => {
            lambda.handler(event, null, (error, result) => {
                skill_response = result;
                resolve();
            });
        });
    });

    it('it responses with valid response structure ', () => {
        skill_response.should.have.property("version");
        skill_response.version.should.equal("1.0");
    }),

    it('it responses with output speech ', () => {

        skill_response.should.have.property("response");
        let r = skill_response.response;

        r.should.have.property("outputSpeech");
        r.outputSpeech.should.have.property("type");
        r.outputSpeech.type.should.equal('SSML');
        r.outputSpeech.should.have.property("ssml");
        r.outputSpeech.ssml.should.startWith('<speak>');
        r.outputSpeech.ssml.should.contains('Bonjour, comment vous appelez-vous ?');
        r.outputSpeech.ssml.should.endWith('</speak>');

    }),

    it('it keeps the session open', () => {

        let r = skill_response.response;
        r.should.have.property("shouldEndSession");
        r.shouldEndSession.should.be.false;
    });
});