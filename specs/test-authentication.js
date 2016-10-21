/* eslint-disable */
'use strict';

const config = require('serverless-authentication').config;
const auth = require('../lib');
const expect = require('chai').expect;

describe('Example authentication', () => {
  describe('Signin', () => {
    it('tests signin with scope and state params', () => {
      const providerConfig = config('example');
      auth.signinHandler(providerConfig, { scope: 'public', state: '123456' }, (err, data) => {
        expect(err).to.be.null;
        expect(data.url).to.equal('https://www.strava.com/oauth/authorize?client_id=strava-mock-id&redirect_uri=https://api-id.execute-api.eu-west-1.amazonaws.com/dev/callback/example&response_type=code&scope=public&state=123456');
      });
    });
  });
});