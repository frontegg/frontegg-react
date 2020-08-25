'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var reactRedux = require('react-redux');
var createSagaMiddleware = _interopDefault(require('redux-saga'));
var toolkit = require('@reduxjs/toolkit');
var reactI18next = require('react-i18next');
var i18n = _interopDefault(require('i18next'));
var reactRouterDom = require('react-router-dom');
var moment = _interopDefault(require('moment'));
var Yup = require('yup');
var semanticUiReact = require('semantic-ui-react');
var formik = require('formik');
var classNames = _interopDefault(require('classnames'));

const initialState = {
    context: undefined,
};
const { reducer, actions } = toolkit.createSlice({
    name: 'root',
    initialState,
    reducers: {
        setContext: {
            prepare: (context) => ({ payload: context }),
            reducer: ((state, { payload }) => (Object.assign(Object.assign({}, state), { context: payload }))),
        },
    },
});

var en = {
    translation: {
        'reports.list-page.title': 'Reports',
        'reports.list-page.subtitle': 'Generate insights on your account usage',
    },
};

const resources = { en };
i18n
    .use(reactI18next.initReactI18next) // passes i18n down to react-i18next
    .init({
    resources,
    lng: 'en',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
});

class ContextHolder {
    constructor() {
        this.context = null;
    }
    static getInstance() {
        if (!ContextHolder.instance) {
            ContextHolder.instance = new ContextHolder();
        }
        return ContextHolder.instance;
    }
    setContext(context) {
        this.context = context;
    }
    getContext() {
        var _a;
        return (_a = this.context) !== null && _a !== void 0 ? _a : {
            baseUrl: window.location.href,
            tokenResolver: () => 'my-authentication-token',
        };
    }
}

// @ts-ignore
const devTools =  { name: 'Frontegg Store' } ;
const sagaMiddleware = createSagaMiddleware();
const middleware = [...toolkit.getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware];
class FronteggProvider extends React.Component {
    constructor(props) {
        super(props);
        this.overrideState = () => {
            return {
                onRedirectTo: this.onRedirectTo,
            };
        };
        this.onRedirectTo = (path, opts) => {
            const { history } = this.props;
            if (opts === null || opts === void 0 ? void 0 : opts.refresh) {
                window.location.href = path;
                return;
            }
            if (opts === null || opts === void 0 ? void 0 : opts.replace) {
                history.replace(path);
            }
            else {
                history.push(path);
            }
        };
        const reducer$1 = toolkit.combineReducers(Object.assign({ root: reducer }, props.plugins.reduce((p, n) => (Object.assign(Object.assign({}, p), { [n.storeName]: n.reducer })), {})));
        const preloadedState = Object.assign({ root: Object.assign(Object.assign({}, initialState), { context: props.context }) }, props.plugins.reduce((p, n) => (Object.assign(Object.assign({}, p), { [n.storeName]: Object.assign(Object.assign({}, n.preloadedState), this.overrideState()) })), {}));
        this.listeners = props.plugins.filter(p => p.Listener).map(p => p.Listener);
        this.store = toolkit.configureStore({ reducer: reducer$1, preloadedState, middleware, devTools });
        function* rootSaga() {
            for (const plugin of props.plugins) {
                yield plugin.sagas();
            }
        }
        this.task = sagaMiddleware.run(rootSaga);
    }
    componentWillUnmount() {
        this.task.cancel();
    }
    componentDidMount() {
        ContextHolder.getInstance().setContext(this.props.context);
    }
    render() {
        const { history, children } = this.props;
        return React.createElement(reactRouterDom.Router, { history: history },
            React.createElement(reactRedux.Provider, { store: this.store },
                React.createElement(reactI18next.I18nextProvider, { i18n: i18n },
                    this.listeners.map((Comp, i) => React.createElement(Comp, { key: i })),
                    children)));
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function request(context, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const headers = yield buildRequestHeaders(context, opts.contentType);
        const url = yield prepareUrl(context, opts.url, opts.params);
        const response = yield fetch(url, {
            body: opts.body ? JSON.stringify(opts.body) : null,
            method: 'POST',
            headers,
            credentials: context.requestCredentials || 'same-origin',
        });
        if (!response.ok) {
            throw new Error(`Error ${response.status} - ${response.statusText}`);
        }
        if (!opts.responseType || opts.responseType === 'json') {
            return yield response.json();
        }
        else if (opts.responseType === 'blob') {
            return yield response.blob();
        }
        else {
            return yield response.text();
        }
    });
}
function getBaseUrl(context) {
    let baseUrl = context.baseUrl;
    const prefix = context.urlPrefix || 'frontegg';
    // Append everything we need to the base url
    if (!baseUrl.endsWith('/')) {
        baseUrl += '/';
    }
    if (!baseUrl.endsWith(prefix)) {
        baseUrl += prefix;
    }
    return baseUrl;
}
function prepareUrl(context, url, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const baseUrl = yield getBaseUrl(context);
        const paramsToSend = yield buildQueryParams(context, params);
        let finalUrl = `${baseUrl}${url}`;
        const hasKeys = Object.keys(paramsToSend).length > 0;
        if (paramsToSend && hasKeys) {
            const urlParams = new URLSearchParams(paramsToSend);
            finalUrl += `?${urlParams}`;
        }
        return finalUrl;
    });
}
function buildRequestHeaders(context, contentType = 'application/json') {
    return __awaiter(this, void 0, void 0, function* () {
        const authToken = yield context.tokenResolver();
        const headers = {};
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }
        if (contentType) {
            headers['Content-Type'] = contentType;
        }
        for (const additionalHeader of yield getAdditionalHeaders(context)) {
            headers[`${additionalHeader.key}`] = `${additionalHeader.value}`;
        }
        headers['x-frontegg-source'] = 'frontegg-react';
        return headers;
    });
}
function buildQueryParams(context, params) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!params) {
            params = {};
        }
        const additionalQueryParams = yield getAdditionalQueryParams(context);
        for (const queryParam of additionalQueryParams) {
            params[queryParam.key] = queryParam.value;
        }
        const keys = Object.keys(params);
        for (const key of keys) {
            const value = params[key];
            params[key] = typeof value === 'object' ? JSON.stringify(value) : value;
        }
        return params;
    });
}
function getAdditionalQueryParams(context) {
    return __awaiter(this, void 0, void 0, function* () {
        let output = [];
        if (context.additionalQueryParamsResolver) {
            output = yield context.additionalQueryParamsResolver();
        }
        return output;
    });
}
function getAdditionalHeaders(context) {
    return __awaiter(this, void 0, void 0, function* () {
        let output = [];
        if (context.additionalHeadersResolver) {
            output = yield context.additionalHeadersResolver();
        }
        return output;
    });
}
const Get = (context, url, params, responseType) => __awaiter(void 0, void 0, void 0, function* () {
    return request(context, {
        url,
        method: 'GET',
        params,
        responseType,
    });
});
const Post = (context, url, body, params, responseType) => __awaiter(void 0, void 0, void 0, function* () {
    return request(context, {
        url,
        method: 'POST',
        contentType: 'application/json',
        body,
        params,
        responseType,
    });
});
const Patch = (context, url, body, params, responseType) => __awaiter(void 0, void 0, void 0, function* () {
    return request(context, {
        url,
        method: 'PATCH',
        contentType: 'application/json',
        body,
        params,
        responseType,
    });
});
const Put = (context, url, body, params, responseType) => __awaiter(void 0, void 0, void 0, function* () {
    return request(context, {
        url,
        method: 'PUT',
        contentType: 'application/json',
        body,
        params,
        responseType,
    });
});
const Delete = (context, url, body, params, responseType) => __awaiter(void 0, void 0, void 0, function* () {
    return request(context, {
        url,
        method: 'DELETE',
        contentType: 'application/json',
        body,
        params,
        responseType,
    });
});
const Download = (context, url, body, params) => __awaiter(void 0, void 0, void 0, function* () {
    return request(context, {
        url,
        method: 'POST',
        contentType: 'application/json',
        body,
        params,
        responseType: 'blob',
    });
});

var createSymbol = function createSymbol(name) {
  return "@@redux-saga/" + name;
};

var CANCEL =
/*#__PURE__*/
createSymbol('CANCEL_PROMISE');
var IO =
/*#__PURE__*/
createSymbol('IO');

var notUndef = function notUndef(v) {
  return v !== null && v !== undefined;
};
var func = function func(f) {
  return typeof f === 'function';
};
var string = function string(s) {
  return typeof s === 'string';
};
var array = Array.isArray;
var object = function object(obj) {
  return obj && !array(obj) && typeof obj === 'object';
};

function delayP(ms, val) {
  if (val === void 0) {
    val = true;
  }

  var timeoutId;
  var promise = new Promise(function (resolve) {
    timeoutId = setTimeout(resolve, ms, val);
  });

  promise[CANCEL] = function () {
    clearTimeout(timeoutId);
  };

  return promise;
}

var identity = function identity(v) {
  return v;
};
function check(value, predicate, error) {
  if (!predicate(value)) {
    throw new Error(error);
  }
}
var CALL = 'CALL';
var SELECT = 'SELECT';

var makeEffect = function makeEffect(type, payload) {
  var _ref;

  return _ref = {}, _ref[IO] = true, _ref.combinator = false, _ref.type = type, _ref.payload = payload, _ref;
};

var validateFnDescriptor = function validateFnDescriptor(effectName, fnDescriptor) {
  check(fnDescriptor, notUndef, effectName + ": argument fn is undefined or null");

  if (func(fnDescriptor)) {
    return;
  }

  var context = null;
  var fn;

  if (array(fnDescriptor)) {
    context = fnDescriptor[0];
    fn = fnDescriptor[1];
    check(fn, notUndef, effectName + ": argument of type [context, fn] has undefined or null `fn`");
  } else if (object(fnDescriptor)) {
    context = fnDescriptor.context;
    fn = fnDescriptor.fn;
    check(fn, notUndef, effectName + ": argument of type {context, fn} has undefined or null `fn`");
  } else {
    check(fnDescriptor, func, effectName + ": argument fn is not function");
    return;
  }

  if (context && string(fn)) {
    check(context[fn], func, effectName + ": context arguments has no such method - \"" + fn + "\"");
    return;
  }

  check(fn, func, effectName + ": unpacked fn argument (from [context, fn] or {context, fn}) is not a function");
};

function getFnCallDescriptor(fnDescriptor, args) {
  var context = null;
  var fn;

  if (func(fnDescriptor)) {
    fn = fnDescriptor;
  } else {
    if (array(fnDescriptor)) {
      context = fnDescriptor[0];
      fn = fnDescriptor[1];
    } else {
      context = fnDescriptor.context;
      fn = fnDescriptor.fn;
    }

    if (context && string(fn) && func(context[fn])) {
      fn = context[fn];
    }
  }

  return {
    context: context,
    fn: fn,
    args: args
  };
}

var isNotDelayEffect = function isNotDelayEffect(fn) {
  return fn !== delay;
};

function call(fnDescriptor) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  {
    var arg0 = typeof args[0] === 'number' ? args[0] : 'ms';
    check(fnDescriptor, isNotDelayEffect, "instead of writing `yield call(delay, " + arg0 + ")` where delay is an effect from `redux-saga/effects` you should write `yield delay(" + arg0 + ")`");
    validateFnDescriptor('call', fnDescriptor);
  }

  return makeEffect(CALL, getFnCallDescriptor(fnDescriptor, args));
}
function select(selector) {
  if (selector === void 0) {
    selector = identity;
  }

  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  if ( arguments.length) {
    check(arguments[0], notUndef, 'select(selector, [...]): argument selector is undefined');
    check(selector, func, "select(selector, [...]): argument " + selector + " is not a function");
  }

  return makeEffect(SELECT, {
    selector: selector,
    args: args
  });
}
var delay =
/*#__PURE__*/
call.bind(null, delayP);

function* getContext() {
    let result;
    do {
        const context = yield select(({ root: { context } }) => context);
        if (!context) {
            yield delay(50);
        }
        else {
            result = context;
        }
    } while (!result);
    return result;
}
const reducerActionOnly = () => ({
    prepare: (payload) => ({ payload }),
    reducer: (state) => state,
});
const reducerResetByState = (key, preloadedState) => () => (Object.assign({}, preloadedState));
const reducerResetByKey = (key, preloadedState) => (state) => (Object.assign(Object.assign({}, state), { [key]: preloadedState[key] }));
const reducerByState = (key) => (state, { payload }) => (Object.assign(Object.assign({}, state), { [key]: payload }));
const reducerBySubState = (key) => ({
    prepare: (payload) => ({ payload }),
    reducer: (state, { payload }) => (Object.assign(Object.assign({}, state), { [key]: Object.assign(Object.assign({}, state[key]), payload) })),
});

const validatePassword = Yup.string().min(6).required('The password is required');
const validateEmail = Yup.string().email('Must be a valid email').required('The Email is required');
const validateTwoFactorCode = Yup.string().length(6).required('The code is required');
const validatePasswordConfirmation = (field = 'password') => Yup.string()
    .required('The confirmation of the password is required')
    .when("password", {
    is: val => (!!(val && val.length > 0)),
    then: Yup.string().oneOf([Yup.ref(field)], "Passwords must match")
});
const validateSchema = (props) => Yup.object(props);
const validateRequiredString = (field) => Yup.string().required(field && `The ${field} is required`);
const validateRequiredCode = (field) => Yup.number().required(field && `The ${field} is required`);

function omitProps(props, keys) {
    const newProps = Object.assign({}, props);
    keys.forEach(key => {
        delete newProps[key];
    });
    return newProps;
}
const formatDate = (date) => {
    const mDate = moment(date);
    return React.createElement(React.Fragment, null,
        mDate.fromNow(),
        " ",
        React.createElement("small", null,
            mDate.format('L LT'),
            " "));
};

class Logger {
    constructor(module) {
        this.module = module;
        this._log = ((l, prefix) => {
            if (console.log.bind === undefined) {
                // @ts-ignore
                return Function.prototype.bind.call(console[l], console, prefix || '', this.module, ':');
            }
            else {
                // @ts-ignore
                return console[l].bind(console, prefix || '', this.module, ':');
            }
        });
        this.debug =  this._log('log', 'DEBUG |') ;
        this.info =  this._log('log', 'INFO  |') ;
        this.warn = this._log('warn', 'WARN  |');
        this.error = this._log('error', 'ERROR |');
    }
}
Logger.from = (module) => new Logger(module);

const AUTH_SERVICE_URL_V1 = '/identity/resources/auth/v1';
const USERS_SERVICE_URL_V1 = '/identity/resources/users/v1';

const logger = Logger.from('AuthApi');
/*****************************************
 * Authentication
 *****************************************/
/**
 * Check if requested email address has sso configuration
 * If true, this function will return the sso address to navigate to
 * else, return null
 */
function preLogin(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const context = ContextHolder.getInstance().getContext();
        try {
            const { address } = yield Post(context, `${AUTH_SERVICE_URL_V1}/user/saml/prelogin`, body);
            return address;
        }
        catch (e) {
            logger.error('preLogin()', e);
            return null;
        }
    });
}
/**
 * login with username and password.
 * if the user has two factor authentication
 *    the server will return mfaToken with mfaRequired: true,
 *    and then ``loginWithMfa`` should be called with the mfaToken and and generated code
 * else, the server will accessToken and refreshToken.
 * the refresh should be used to renew your access token by calling ``refreshToken``
 *
 * @throw exception if login failed
 */
function login(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const context = ContextHolder.getInstance().getContext();
        return yield Post(context, `${AUTH_SERVICE_URL_V1}/user`, body);
    });
}
/**
 * after login succeeded with mfaRequired token response, this function should be called
 * with the mfaToken and the generated code from your authenticator app.
 *
 * @throw exception if generated code or mfaToken are incorrect
 */
function loginWithMfa(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const context = ContextHolder.getInstance().getContext();
        return Post(context, `${AUTH_SERVICE_URL_V1}/user`, body);
    });
}
/**
 * activating account should be called after registering new user of deactivate account
 * ``activateAccount`` should contains userId and the token that has been sent to the user after activation requested.
 *
 * @throws exception if activation failed
 */
function activateAccount(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const context = ContextHolder.getInstance().getContext();
        return Post(context, `${USERS_SERVICE_URL_V1}/activate`, body);
    });
}
/**
 * refresh token called as authenticated use, access and refresh tokens resolved by the cookies.
 * the server will return ILoginResponse with new access Token and refresh token and store it in the browser cookies.
 */
function refreshToken() {
    return __awaiter(this, void 0, void 0, function* () {
        const context = ContextHolder.getInstance().getContext();
        return Post(context, `${AUTH_SERVICE_URL_V1}/user/token/refresh`);
    });
}
/**
 * logout from server, invalidate access and refresh token, remove it from cookies.
 */
function logout() {
    return __awaiter(this, void 0, void 0, function* () {
        const context = ContextHolder.getInstance().getContext();
        return Post(context, `${AUTH_SERVICE_URL_V1}/logout`);
    });
}
/**
 * calling forgot password request will send email with link to reset user's password.
 *
 * @throws exception if the user not found
 */
function forgotPassword(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const context = ContextHolder.getInstance().getContext();
        return Post(context, `${USERS_SERVICE_URL_V1}/passwords/reset`, body);
    });
}
/**
 * reset password should be called after forget password request.
 * userId, new password and the token has been sent to the user email.
 *
 * @throws exception if the user not found, password validation failed or invalid token.
 */
function resetPassword(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const context = ContextHolder.getInstance().getContext();
        return Post(context, `${USERS_SERVICE_URL_V1}/passwords/reset/verify`, body);
    });
}
/**
 * disable Multi-Factor authentication by providing the recoveryCode
 * that has been received when activated it
 *
 * @throws exception if recovery code is not valid
 */
function recoverMfaToken(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const context = ContextHolder.getInstance().getContext();
        return Post(context, `${AUTH_SERVICE_URL_V1}/user/mfa/recover`, body);
    });
}
/*****************************************
 * Multi-Factor Settings
 *****************************************/
/**
 * enroll Multi-Factor Auth Code to use in 3rd party apps like Google Authenticator.
 * the server returns qrCode as png image in base64 format
 *
 * @throws exception if the user already have mfa-enabled
 * ``authorized user``
 */
function enrollMfa() {
    return __awaiter(this, void 0, void 0, function* () {
        const context = ContextHolder.getInstance().getContext();
        return Post(context, `${USERS_SERVICE_URL_V1}/mfa/enroll`);
    });
}
/**
 * after enrolling MFA QR code, verify function should be called
 * with the generated code in the Authenticator App
 *
 * @return recoveryCode to use to disable mfa if your device is lost, this code won't show it again.
 * @throws exception if the generated token is invalid
 * ``authorized user``
 */
function verifyMfa(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const context = ContextHolder.getInstance().getContext();
        return Post(context, `${USERS_SERVICE_URL_V1}/mfa/enroll/verify`, body);
    });
}
/**
 * disable MFA by either passing the recoveryCode or the generated code from the Authenticator App.
 *
 * @throws exception if the generated token or the recoveryCode are incorrect.
 * * ``authorized user``
 */
function disableMfa(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const context = ContextHolder.getInstance().getContext();
        return Post(context, `${USERS_SERVICE_URL_V1}/mfa/disable`, body);
    });
}

var auth = /*#__PURE__*/Object.freeze({
  __proto__: null,
  preLogin: preLogin,
  login: login,
  loginWithMfa: loginWithMfa,
  activateAccount: activateAccount,
  refreshToken: refreshToken,
  logout: logout,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
  recoverMfaToken: recoverMfaToken,
  enrollMfa: enrollMfa,
  verifyMfa: verifyMfa,
  disableMfa: disableMfa
});

const logger$1 = Logger.from('ProfileApi');
/*****************************************
 * Profile Api
 *****************************************/
/**
 * change user password by providing current password and the new password.
 *
 * @throws exception if the current password incorrect or new password validation failed.
 * ``authorized user``
 */
function getProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        logger$1.debug('getProfile()');
        const context = ContextHolder.getInstance().getContext();
        return Post(context, `${USERS_SERVICE_URL_V1}/passwords/change`);
    });
}
/**
 * update user profile by providing updated fields.
 * ``authorized user``
 */
function updateProfile(body) {
    return __awaiter(this, void 0, void 0, function* () {
        logger$1.debug('updateProfile()', body);
        const context = ContextHolder.getInstance().getContext();
        return Post(context, `${USERS_SERVICE_URL_V1}/passwords/change`, body);
    });
}
/**
 * change user password by providing current password and the new password.
 *
 * @throws exception if the current password incorrect or new password validation failed.
 * ``authorized user``
 */
function changePassword(body) {
    return __awaiter(this, void 0, void 0, function* () {
        logger$1.debug('changePassword()');
        const context = ContextHolder.getInstance().getContext();
        return Post(context, `${USERS_SERVICE_URL_V1}/passwords/change`, body);
    });
}

var profile = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProfile: getProfile,
  updateProfile: updateProfile,
  changePassword: changePassword
});

function getMetadata(body) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const context = ContextHolder.getInstance().getContext();
        const data = yield Get(context, '/metadata', body);
        if ((_a = data === null || data === void 0 ? void 0 : data.rows) === null || _a === void 0 ? void 0 : _a[0])
            return (_b = data === null || data === void 0 ? void 0 : data.rows) === null || _b === void 0 ? void 0 : _b[0];
        throw new Error(`metadata not found: ${body.entityName}`);
    });
}
const getNotificationsMetadata = () => __awaiter(void 0, void 0, void 0, function* () { return getMetadata({ entityName: 'notifications' }); });
const getSamlMetadata = () => __awaiter(void 0, void 0, void 0, function* () { return getMetadata({ entityName: 'saml' }); });

var metadata = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getNotificationsMetadata: getNotificationsMetadata,
  getSamlMetadata: getSamlMetadata
});

const api = {
    auth,
    profile,
    metadata
};

const withPlugin = (pluginName, defaultMapper, pluginActions) => {
    const fn = (Component, mapper) => {
        const mapStateToProps = (state) => mapper.state(state[pluginName]);
        const mapDispatchToProps = (dispatch) => toolkit.bindActionCreators(mapper.actions(pluginActions), dispatch);
        return reactRedux.connect(mapStateToProps, mapDispatchToProps)(Component);
    };
    Object.defineProperty(fn, 'name', { value: `with${pluginName.substring(0, 1).toUpperCase()}${pluginName.substring(1)}` });
    return fn;
};

const useT = () => reactI18next.useTranslation();

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".frontegg .frontegg-form-input{position:relative;margin-bottom:1.5rem}.frontegg .frontegg-form-input label{display:block;position:relative}.frontegg .frontegg-form-input input{border-radius:.5rem!important}.frontegg .frontegg-form-error{left:.5rem;bottom:0;position:absolute;font-size:.8em;transform:translateY(100%);color:#9a0000}.frontegg .fe-enter-animation{transition:margin-bottom .3s,max-height .3s;max-height:100px}.frontegg .fe-enter-animation-hidden{max-height:0;overflow:hidden;margin-bottom:0}";
styleInject(css_248z);

const FieldButton = (_a) => {
    var { children, disabledDirty } = _a, props = __rest(_a, ["children", "disabledDirty"]);
    return (React.createElement(formik.Field, null, ({ form: { isValid, dirty } }) => {
        const disabled = !isValid || (disabledDirty ? false : !dirty);
        return React.createElement("div", { className: 'fe-form-action' },
            React.createElement(semanticUiReact.Button, Object.assign({}, props, { type: 'submit' }, (disabled ? { primary: undefined, disabled } : {})), children));
    }));
};

const FieldInput = (_a) => {
    var { wrapperClassName, forwardRef, enterAnimation, visible, name, label, onChange } = _a, inputProps = __rest(_a, ["wrapperClassName", "forwardRef", "enterAnimation", "visible", "name", "label", "onChange"]);
    return (React.createElement(formik.Field, null, ({ form: { values, handleBlur, handleChange, errors, touched } }) => (React.createElement("div", { className: classNames('frontegg-form-row', 'frontegg-form-input', wrapperClassName) },
        label && React.createElement("label", null, label),
        React.createElement(semanticUiReact.Input, Object.assign({}, inputProps, { ref: forwardRef, fluid: true, name: name, values: values[name], onChange: onChange ? (event, data) => {
                onChange(event, data);
                handleChange(name)(event);
            } : handleChange(name), onBlur: handleBlur, error: !!touched[name] && !!errors[name] })),
        React.createElement(formik.ErrorMessage, { name: name, className: 'frontegg-form-error', component: 'div' })))));
};

var ownKeys = Reflect.ownKeys;
class EmptyRender extends React.Component {
    render() { return null; }
}
function memoEqual(prevProps, nextProps) {
    return Object.keys(nextProps).reduce((p, next) => {
        if (typeof prevProps[next] == 'function' && typeof nextProps[next] == 'function') {
            return p;
        }
        if (prevProps[next] != nextProps[next]) {
            return p && false;
        }
        else {
            return p;
        }
    }, true);
}
const generateComponent = (components, component, DefaultComponent) => {
    if (components === null || components === void 0 ? void 0 : components.hasOwnProperty(component)) {
        let comp = components === null || components === void 0 ? void 0 : components[component];
        if (comp == null) {
            return EmptyRender;
        }
        if (typeof comp === 'function') {
            return comp;
        }
    }
    return React.memo(DefaultComponent, memoEqual);
};
const buildComponents = (components, defaultComponents) => {
    if (!components) {
        return defaultComponents;
    }
    return ownKeys(defaultComponents)
        .map((compName) => ({ [compName]: generateComponent(components, compName, defaultComponents[compName]) }))
        .reduce((p, comp) => (Object.assign(Object.assign({}, p), comp)), {});
};
const buildComponentsProps = (configComponents, propsComponents) => {
    const props = {};
    const merger = (comps) => {
        Object.keys(comps || {}).map(key => {
            if (comps[key] === null) {
                props[key] = null;
                return;
            }
            if (props.hasOwnProperty(key)) {
                props[key] = Object.assign(Object.assign({}, (props[key] || {})), comps[key]);
            }
            else {
                props[key] = comps[key];
            }
        });
    };
    merger(configComponents);
    merger(propsComponents);
    return props;
};
class FronteggClass extends React.Component {
    constructor(props, defaultComponents) {
        var _a, _b;
        super(props);
        this.compsProps = buildComponentsProps((_a = this.props.config) !== null && _a !== void 0 ? _a : {}, (_b = this.props.components) !== null && _b !== void 0 ? _b : {});
        this.comps = buildComponents(this.compsProps, defaultComponents);
    }
}

Object.defineProperty(exports, 'withT', {
  enumerable: true,
  get: function () {
    return reactI18next.withTranslation;
  }
});
exports.Delete = Delete;
exports.Download = Download;
exports.FieldButton = FieldButton;
exports.FieldInput = FieldInput;
exports.FronteggProvider = FronteggProvider;
exports.Get = Get;
exports.Patch = Patch;
exports.Post = Post;
exports.Put = Put;
exports.api = api;
exports.formatDate = formatDate;
exports.getContext = getContext;
exports.memoEqual = memoEqual;
exports.omitProps = omitProps;
exports.reducerActionOnly = reducerActionOnly;
exports.reducerByState = reducerByState;
exports.reducerBySubState = reducerBySubState;
exports.reducerResetByKey = reducerResetByKey;
exports.reducerResetByState = reducerResetByState;
exports.useT = useT;
exports.validateEmail = validateEmail;
exports.validatePassword = validatePassword;
exports.validatePasswordConfirmation = validatePasswordConfirmation;
exports.validateRequiredCode = validateRequiredCode;
exports.validateRequiredString = validateRequiredString;
exports.validateSchema = validateSchema;
exports.validateTwoFactorCode = validateTwoFactorCode;
exports.withPlugin = withPlugin;
//# sourceMappingURL=index.js.map
