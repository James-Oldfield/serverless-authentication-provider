# serverless-authentication-strava
Authentication provider using Strava for Serverless Authentication via nodeJS.

For use with [this](https://github.com/laardee/serverless-authentication-boilerplate) boilerplate and the serverless framework.

### install

`npm i -S serverless-authentication-strava`

### sample usage
```js
import Strava from 'serverless-authentication-strava';

Strava.signinHandler(providerConfig, { scope: 'public', state },
    (err, data) => redirectProxyCallback(context, data));

Strava.callbackHandler(
    event,
    providerConfig,
    handleResponse
);
```