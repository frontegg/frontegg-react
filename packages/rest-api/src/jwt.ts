/**
 * The code was extracted from:
 * https://github.com/davidchambers/Base64.js
 */

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

export class InvalidCharacterError extends Error {
  constructor(message: string) {
    super(message);
  }
}

function polyfill(input: string) {
  const str = String(input).replace(/=+$/, '');
  if (str.length % 4 === 1) {
    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
  }
  let output = '';
  // noinspection JSAssignmentUsedAsCondition,JSUnusedAssignment,CommaExpressionJS
  for (
    // initialize result and counters
    let bc = 0, bs: number, buffer, idx = 0;
    // get next character
    // tslint:disable-next-line:no-conditional-assignment
    (buffer = str.charAt(idx++));
    // character found in table? initialize bit storage and add its ascii value;
    // tslint:disable-next-line:no-conditional-assignment
    ~buffer &&
    ((bs = bc % 4 ? bs! * 64 + buffer : buffer),
    // and if not first of each 4 characters,
    // convert the first 8 bits to one ascii character
    bc++ % 4)
      ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
      : 0
  ) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }
  return output;
}

const atob = (typeof window !== 'undefined' && window.atob && window.atob.bind(window)) || polyfill;

function b64DecodeUnicode(str: string) {
  return decodeURIComponent(
    atob(str).replace(/(.)/g, (m, p) => {
      let code = p.charCodeAt(0).toString(16).toUpperCase();
      if (code.length < 2) {
        code = '0' + code;
      }
      return '%' + code;
    })
  );
}

const base64UrlDecode = (str: string) => {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw new Error('Illegal base64url string!');
  }

  try {
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
};

export class InvalidTokenError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const jwtDecode = (token: string, options: { header?: boolean } = {}) => {
  const pos = !!options.header ? 0 : 1;
  try {
    return JSON.parse(base64UrlDecode(token.split('.')[pos]));
  } catch (e) {
    throw new InvalidTokenError('Invalid token specified: ' + e.message);
  }
};
