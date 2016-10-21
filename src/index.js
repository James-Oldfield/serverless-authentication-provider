'use strict';

import { Provider } from 'serverless-authentication';

class Strava extends Provider {

  /**
   * Signin function
   * @param scope
   * @param state
   * @param callback, returns url that will be used for redirecting to oauth provider signin page
   */
  signinHandler({ scope = 'profile', state }, callback) {
    const signinOptions = Object.assign({
      scope, state,
    }, {
      signin_uri: 'https://www.strava.com/oauth/authorize',
      scope: 'public',
      response_type: 'code',
    });

    super.signin(signinOptions, callback);
  }

  /**
   * Callback function
   * @param event
   * @param callback, returns user profile
   */
  callbackHandler(event, callback) {
    const profileMap = (response) => ({
      provider: 'strava',
      ...response
    });

    const options = {
      authorization_uri: 'https://www.strava.com/oauth/token',
      profile_uri: 'https://www.strava.com/api/v3/athlete',
      profileMap,
      authorizationMethod: 'POST'
    };

    super.callback(
      event,
      options,
      { authorization: { grant_type: 'authorization_code' } },
      callback
    );
  }
}

const signinHandler = (config, options, callback) =>
  (new Strava(config)).signinHandler(options, callback);

const callbackHandler = (event, config, callback) =>
  (new Strava(config)).callbackHandler(event, callback);

export default Strava;

export { signinHandler, callbackHandler };
