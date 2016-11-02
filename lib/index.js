'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callbackHandler = exports.signinHandler = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _serverlessAuthentication = require('serverless-authentication');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Strava = function (_Provider) {
  _inherits(Strava, _Provider);

  function Strava() {
    _classCallCheck(this, Strava);

    return _possibleConstructorReturn(this, (Strava.__proto__ || Object.getPrototypeOf(Strava)).apply(this, arguments));
  }

  _createClass(Strava, [{
    key: 'signinHandler',


    /**
     * Signin function
     * @param scope
     * @param state
     * @param callback, returns url that will be used for redirecting to oauth provider signin page
     */
    value: function signinHandler(_ref, callback) {
      var _ref$scope = _ref.scope,
          scope = _ref$scope === undefined ? 'public' : _ref$scope,
          state = _ref.state;

      var signinOptions = Object.assign({
        scope: scope, state: state
      }, {
        signin_uri: 'https://www.strava.com/oauth/authorize',
        response_type: 'code'
      });

      _get(Strava.prototype.__proto__ || Object.getPrototypeOf(Strava.prototype), 'signin', this).call(this, signinOptions, callback);
    }

    /**
     * Callback function
     * @param event
     * @param callback, returns user profile
     */

  }, {
    key: 'callbackHandler',
    value: function callbackHandler(event, callback) {
      var profileMap = function profileMap(response) {
        return _extends({
          provider: 'strava'
        }, response);
      };

      var options = {
        authorization_uri: 'https://www.strava.com/oauth/token',
        profile_uri: 'https://www.strava.com/api/v3/athlete',
        profileMap: profileMap,
        authorizationMethod: 'POST'
      };

      _get(Strava.prototype.__proto__ || Object.getPrototypeOf(Strava.prototype), 'callback', this).call(this, event, options, { authorization: { grant_type: 'authorization_code' } }, callback);
    }
  }]);

  return Strava;
}(_serverlessAuthentication.Provider);

var signinHandler = function signinHandler(config, options, callback) {
  return new Strava(config).signinHandler(options, callback);
};

var callbackHandler = function callbackHandler(event, config, callback) {
  return new Strava(config).callbackHandler(event, callback);
};

exports.default = Strava;
exports.signinHandler = signinHandler;
exports.callbackHandler = callbackHandler;