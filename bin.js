#! /usr/bin/env node

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@onyx-ignition/forge/index.mjs
var import_path = __toESM(require("path"), 1);
var import_node_readline = require("node:readline");
var import_node_worker_threads = require("node:worker_threads");
var import_node_zlib = __toESM(require("node:zlib"), 1);
var __create2 = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf2 = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_constants = __commonJS({
  "node_modules/ws/lib/constants.js"(exports2, module2) {
    "use strict";
    var BINARY_TYPES = ["nodebuffer", "arraybuffer", "fragments"];
    var hasBlob = typeof Blob !== "undefined";
    if (hasBlob) BINARY_TYPES.push("blob");
    module2.exports = {
      BINARY_TYPES,
      EMPTY_BUFFER: Buffer.alloc(0),
      GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
      hasBlob,
      kForOnEventAttribute: Symbol("kIsForOnEventAttribute"),
      kListener: Symbol("kListener"),
      kStatusCode: Symbol("status-code"),
      kWebSocket: Symbol("websocket"),
      NOOP: () => {
      }
    };
  }
});
var require_buffer_util = __commonJS({
  "node_modules/ws/lib/buffer-util.js"(exports2, module2) {
    "use strict";
    var { EMPTY_BUFFER } = require_constants();
    var FastBuffer = Buffer[Symbol.species];
    function concat(list, totalLength) {
      if (list.length === 0) return EMPTY_BUFFER;
      if (list.length === 1) return list[0];
      const target = Buffer.allocUnsafe(totalLength);
      let offset = 0;
      for (let i = 0; i < list.length; i++) {
        const buf = list[i];
        target.set(buf, offset);
        offset += buf.length;
      }
      if (offset < totalLength) {
        return new FastBuffer(target.buffer, target.byteOffset, offset);
      }
      return target;
    }
    function _mask(source, mask, output, offset, length2) {
      for (let i = 0; i < length2; i++) {
        output[offset + i] = source[i] ^ mask[i & 3];
      }
    }
    function _unmask(buffer, mask) {
      for (let i = 0; i < buffer.length; i++) {
        buffer[i] ^= mask[i & 3];
      }
    }
    function toArrayBuffer(buf) {
      if (buf.length === buf.buffer.byteLength) {
        return buf.buffer;
      }
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length);
    }
    function toBuffer(data) {
      toBuffer.readOnly = true;
      if (Buffer.isBuffer(data)) return data;
      let buf;
      if (data instanceof ArrayBuffer) {
        buf = new FastBuffer(data);
      } else if (ArrayBuffer.isView(data)) {
        buf = new FastBuffer(data.buffer, data.byteOffset, data.byteLength);
      } else {
        buf = Buffer.from(data);
        toBuffer.readOnly = false;
      }
      return buf;
    }
    module2.exports = {
      concat,
      mask: _mask,
      toArrayBuffer,
      toBuffer,
      unmask: _unmask
    };
    if (!process.env.WS_NO_BUFFER_UTIL) {
      try {
        const bufferUtil = __require("bufferutil");
        module2.exports.mask = function(source, mask, output, offset, length2) {
          if (length2 < 48) _mask(source, mask, output, offset, length2);
          else bufferUtil.mask(source, mask, output, offset, length2);
        };
        module2.exports.unmask = function(buffer, mask) {
          if (buffer.length < 32) _unmask(buffer, mask);
          else bufferUtil.unmask(buffer, mask);
        };
      } catch (e) {
      }
    }
  }
});
var require_limiter = __commonJS({
  "node_modules/ws/lib/limiter.js"(exports2, module2) {
    "use strict";
    var kDone = Symbol("kDone");
    var kRun = Symbol("kRun");
    var Limiter = class {
      /**
       * Creates a new `Limiter`.
       *
       * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
       *     to run concurrently
       */
      constructor(concurrency) {
        this[kDone] = () => {
          this.pending--;
          this[kRun]();
        };
        this.concurrency = concurrency || Infinity;
        this.jobs = [];
        this.pending = 0;
      }
      /**
       * Adds a job to the queue.
       *
       * @param {Function} job The job to run
       * @public
       */
      add(job) {
        this.jobs.push(job);
        this[kRun]();
      }
      /**
       * Removes a job from the queue and runs it if possible.
       *
       * @private
       */
      [kRun]() {
        if (this.pending === this.concurrency) return;
        if (this.jobs.length) {
          const job = this.jobs.shift();
          this.pending++;
          job(this[kDone]);
        }
      }
    };
    module2.exports = Limiter;
  }
});
var require_permessage_deflate = __commonJS({
  "node_modules/ws/lib/permessage-deflate.js"(exports2, module2) {
    "use strict";
    var zlib2 = __require("zlib");
    var bufferUtil = require_buffer_util();
    var Limiter = require_limiter();
    var { kStatusCode } = require_constants();
    var FastBuffer = Buffer[Symbol.species];
    var TRAILER = Buffer.from([0, 0, 255, 255]);
    var kPerMessageDeflate = Symbol("permessage-deflate");
    var kTotalLength = Symbol("total-length");
    var kCallback = Symbol("callback");
    var kBuffers = Symbol("buffers");
    var kError = Symbol("error");
    var zlibLimiter;
    var PerMessageDeflate = class {
      /**
       * Creates a PerMessageDeflate instance.
       *
       * @param {Object} [options] Configuration options
       * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
       *     for, or request, a custom client window size
       * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
       *     acknowledge disabling of client context takeover
       * @param {Number} [options.concurrencyLimit=10] The number of concurrent
       *     calls to zlib
       * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
       *     use of a custom server window size
       * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
       *     disabling of server context takeover
       * @param {Number} [options.threshold=1024] Size (in bytes) below which
       *     messages should not be compressed if context takeover is disabled
       * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
       *     deflate
       * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
       *     inflate
       * @param {Boolean} [isServer=false] Create the instance in either server or
       *     client mode
       * @param {Number} [maxPayload=0] The maximum allowed message length
       */
      constructor(options, isServer, maxPayload) {
        this._maxPayload = maxPayload | 0;
        this._options = options || {};
        this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024;
        this._isServer = !!isServer;
        this._deflate = null;
        this._inflate = null;
        this.params = null;
        if (!zlibLimiter) {
          const concurrency = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
          zlibLimiter = new Limiter(concurrency);
        }
      }
      /**
       * @type {String}
       */
      static get extensionName() {
        return "permessage-deflate";
      }
      /**
       * Create an extension negotiation offer.
       *
       * @return {Object} Extension parameters
       * @public
       */
      offer() {
        const params = {};
        if (this._options.serverNoContextTakeover) {
          params.server_no_context_takeover = true;
        }
        if (this._options.clientNoContextTakeover) {
          params.client_no_context_takeover = true;
        }
        if (this._options.serverMaxWindowBits) {
          params.server_max_window_bits = this._options.serverMaxWindowBits;
        }
        if (this._options.clientMaxWindowBits) {
          params.client_max_window_bits = this._options.clientMaxWindowBits;
        } else if (this._options.clientMaxWindowBits == null) {
          params.client_max_window_bits = true;
        }
        return params;
      }
      /**
       * Accept an extension negotiation offer/response.
       *
       * @param {Array} configurations The extension negotiation offers/reponse
       * @return {Object} Accepted configuration
       * @public
       */
      accept(configurations) {
        configurations = this.normalizeParams(configurations);
        this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations);
        return this.params;
      }
      /**
       * Releases all resources used by the extension.
       *
       * @public
       */
      cleanup() {
        if (this._inflate) {
          this._inflate.close();
          this._inflate = null;
        }
        if (this._deflate) {
          const callback = this._deflate[kCallback];
          this._deflate.close();
          this._deflate = null;
          if (callback) {
            callback(
              new Error(
                "The deflate stream was closed while data was being processed"
              )
            );
          }
        }
      }
      /**
       *  Accept an extension negotiation offer.
       *
       * @param {Array} offers The extension negotiation offers
       * @return {Object} Accepted configuration
       * @private
       */
      acceptAsServer(offers) {
        const opts = this._options;
        const accepted = offers.find((params) => {
          if (opts.serverNoContextTakeover === false && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === false || typeof opts.serverMaxWindowBits === "number" && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits === "number" && !params.client_max_window_bits) {
            return false;
          }
          return true;
        });
        if (!accepted) {
          throw new Error("None of the extension offers can be accepted");
        }
        if (opts.serverNoContextTakeover) {
          accepted.server_no_context_takeover = true;
        }
        if (opts.clientNoContextTakeover) {
          accepted.client_no_context_takeover = true;
        }
        if (typeof opts.serverMaxWindowBits === "number") {
          accepted.server_max_window_bits = opts.serverMaxWindowBits;
        }
        if (typeof opts.clientMaxWindowBits === "number") {
          accepted.client_max_window_bits = opts.clientMaxWindowBits;
        } else if (accepted.client_max_window_bits === true || opts.clientMaxWindowBits === false) {
          delete accepted.client_max_window_bits;
        }
        return accepted;
      }
      /**
       * Accept the extension negotiation response.
       *
       * @param {Array} response The extension negotiation response
       * @return {Object} Accepted configuration
       * @private
       */
      acceptAsClient(response) {
        const params = response[0];
        if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
          throw new Error('Unexpected parameter "client_no_context_takeover"');
        }
        if (!params.client_max_window_bits) {
          if (typeof this._options.clientMaxWindowBits === "number") {
            params.client_max_window_bits = this._options.clientMaxWindowBits;
          }
        } else if (this._options.clientMaxWindowBits === false || typeof this._options.clientMaxWindowBits === "number" && params.client_max_window_bits > this._options.clientMaxWindowBits) {
          throw new Error(
            'Unexpected or invalid parameter "client_max_window_bits"'
          );
        }
        return params;
      }
      /**
       * Normalize parameters.
       *
       * @param {Array} configurations The extension negotiation offers/reponse
       * @return {Array} The offers/response with normalized parameters
       * @private
       */
      normalizeParams(configurations) {
        configurations.forEach((params) => {
          Object.keys(params).forEach((key) => {
            let value = params[key];
            if (value.length > 1) {
              throw new Error(`Parameter "${key}" must have only a single value`);
            }
            value = value[0];
            if (key === "client_max_window_bits") {
              if (value !== true) {
                const num = +value;
                if (!Number.isInteger(num) || num < 8 || num > 15) {
                  throw new TypeError(
                    `Invalid value for parameter "${key}": ${value}`
                  );
                }
                value = num;
              } else if (!this._isServer) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
            } else if (key === "server_max_window_bits") {
              const num = +value;
              if (!Number.isInteger(num) || num < 8 || num > 15) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
              value = num;
            } else if (key === "client_no_context_takeover" || key === "server_no_context_takeover") {
              if (value !== true) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
            } else {
              throw new Error(`Unknown parameter "${key}"`);
            }
            params[key] = value;
          });
        });
        return configurations;
      }
      /**
       * Decompress data. Concurrency limited.
       *
       * @param {Buffer} data Compressed data
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @public
       */
      decompress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._decompress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      /**
       * Compress data. Concurrency limited.
       *
       * @param {(Buffer|String)} data Data to compress
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @public
       */
      compress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._compress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      /**
       * Decompress data.
       *
       * @param {Buffer} data Compressed data
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @private
       */
      _decompress(data, fin, callback) {
        const endpoint = this._isServer ? "client" : "server";
        if (!this._inflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib2.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._inflate = zlib2.createInflateRaw({
            ...this._options.zlibInflateOptions,
            windowBits
          });
          this._inflate[kPerMessageDeflate] = this;
          this._inflate[kTotalLength] = 0;
          this._inflate[kBuffers] = [];
          this._inflate.on("error", inflateOnError);
          this._inflate.on("data", inflateOnData);
        }
        this._inflate[kCallback] = callback;
        this._inflate.write(data);
        if (fin) this._inflate.write(TRAILER);
        this._inflate.flush(() => {
          const err = this._inflate[kError];
          if (err) {
            this._inflate.close();
            this._inflate = null;
            callback(err);
            return;
          }
          const data2 = bufferUtil.concat(
            this._inflate[kBuffers],
            this._inflate[kTotalLength]
          );
          if (this._inflate._readableState.endEmitted) {
            this._inflate.close();
            this._inflate = null;
          } else {
            this._inflate[kTotalLength] = 0;
            this._inflate[kBuffers] = [];
            if (fin && this.params[`${endpoint}_no_context_takeover`]) {
              this._inflate.reset();
            }
          }
          callback(null, data2);
        });
      }
      /**
       * Compress data.
       *
       * @param {(Buffer|String)} data Data to compress
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @private
       */
      _compress(data, fin, callback) {
        const endpoint = this._isServer ? "server" : "client";
        if (!this._deflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib2.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._deflate = zlib2.createDeflateRaw({
            ...this._options.zlibDeflateOptions,
            windowBits
          });
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          this._deflate.on("data", deflateOnData);
        }
        this._deflate[kCallback] = callback;
        this._deflate.write(data);
        this._deflate.flush(zlib2.Z_SYNC_FLUSH, () => {
          if (!this._deflate) {
            return;
          }
          let data2 = bufferUtil.concat(
            this._deflate[kBuffers],
            this._deflate[kTotalLength]
          );
          if (fin) {
            data2 = new FastBuffer(data2.buffer, data2.byteOffset, data2.length - 4);
          }
          this._deflate[kCallback] = null;
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          if (fin && this.params[`${endpoint}_no_context_takeover`]) {
            this._deflate.reset();
          }
          callback(null, data2);
        });
      }
    };
    module2.exports = PerMessageDeflate;
    function deflateOnData(chunk) {
      this[kBuffers].push(chunk);
      this[kTotalLength] += chunk.length;
    }
    function inflateOnData(chunk) {
      this[kTotalLength] += chunk.length;
      if (this[kPerMessageDeflate]._maxPayload < 1 || this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload) {
        this[kBuffers].push(chunk);
        return;
      }
      this[kError] = new RangeError("Max payload size exceeded");
      this[kError].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH";
      this[kError][kStatusCode] = 1009;
      this.removeListener("data", inflateOnData);
      this.reset();
    }
    function inflateOnError(err) {
      this[kPerMessageDeflate]._inflate = null;
      if (this[kError]) {
        this[kCallback](this[kError]);
        return;
      }
      err[kStatusCode] = 1007;
      this[kCallback](err);
    }
  }
});
var require_validation = __commonJS({
  "node_modules/ws/lib/validation.js"(exports2, module2) {
    "use strict";
    var { isUtf8 } = __require("buffer");
    var { hasBlob } = require_constants();
    var tokenChars = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 0 - 15
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 16 - 31
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      // 32 - 47
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      // 48 - 63
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 64 - 79
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      // 80 - 95
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 96 - 111
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0
      // 112 - 127
    ];
    function isValidStatusCode(code) {
      return code >= 1e3 && code <= 1014 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3e3 && code <= 4999;
    }
    function _isValidUTF8(buf) {
      const len = buf.length;
      let i = 0;
      while (i < len) {
        if ((buf[i] & 128) === 0) {
          i++;
        } else if ((buf[i] & 224) === 192) {
          if (i + 1 === len || (buf[i + 1] & 192) !== 128 || (buf[i] & 254) === 192) {
            return false;
          }
          i += 2;
        } else if ((buf[i] & 240) === 224) {
          if (i + 2 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || buf[i] === 224 && (buf[i + 1] & 224) === 128 || // Overlong
          buf[i] === 237 && (buf[i + 1] & 224) === 160) {
            return false;
          }
          i += 3;
        } else if ((buf[i] & 248) === 240) {
          if (i + 3 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || (buf[i + 3] & 192) !== 128 || buf[i] === 240 && (buf[i + 1] & 240) === 128 || // Overlong
          buf[i] === 244 && buf[i + 1] > 143 || buf[i] > 244) {
            return false;
          }
          i += 4;
        } else {
          return false;
        }
      }
      return true;
    }
    function isBlob(value) {
      return hasBlob && typeof value === "object" && typeof value.arrayBuffer === "function" && typeof value.type === "string" && typeof value.stream === "function" && (value[Symbol.toStringTag] === "Blob" || value[Symbol.toStringTag] === "File");
    }
    module2.exports = {
      isBlob,
      isValidStatusCode,
      isValidUTF8: _isValidUTF8,
      tokenChars
    };
    if (isUtf8) {
      module2.exports.isValidUTF8 = function(buf) {
        return buf.length < 24 ? _isValidUTF8(buf) : isUtf8(buf);
      };
    } else if (!process.env.WS_NO_UTF_8_VALIDATE) {
      try {
        const isValidUTF8 = __require("utf-8-validate");
        module2.exports.isValidUTF8 = function(buf) {
          return buf.length < 32 ? _isValidUTF8(buf) : isValidUTF8(buf);
        };
      } catch (e) {
      }
    }
  }
});
var require_receiver = __commonJS({
  "node_modules/ws/lib/receiver.js"(exports2, module2) {
    "use strict";
    var { Writable } = __require("stream");
    var PerMessageDeflate = require_permessage_deflate();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      kStatusCode,
      kWebSocket
    } = require_constants();
    var { concat, toArrayBuffer, unmask } = require_buffer_util();
    var { isValidStatusCode, isValidUTF8 } = require_validation();
    var FastBuffer = Buffer[Symbol.species];
    var GET_INFO = 0;
    var GET_PAYLOAD_LENGTH_16 = 1;
    var GET_PAYLOAD_LENGTH_64 = 2;
    var GET_MASK = 3;
    var GET_DATA = 4;
    var INFLATING = 5;
    var DEFER_EVENT = 6;
    var Receiver2 = class extends Writable {
      /**
       * Creates a Receiver instance.
       *
       * @param {Object} [options] Options object
       * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {String} [options.binaryType=nodebuffer] The type for binary data
       * @param {Object} [options.extensions] An object containing the negotiated
       *     extensions
       * @param {Boolean} [options.isServer=false] Specifies whether to operate in
       *     client or server mode
       * @param {Number} [options.maxPayload=0] The maximum allowed message length
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       */
      constructor(options = {}) {
        super();
        this._allowSynchronousEvents = options.allowSynchronousEvents !== void 0 ? options.allowSynchronousEvents : true;
        this._binaryType = options.binaryType || BINARY_TYPES[0];
        this._extensions = options.extensions || {};
        this._isServer = !!options.isServer;
        this._maxPayload = options.maxPayload | 0;
        this._skipUTF8Validation = !!options.skipUTF8Validation;
        this[kWebSocket] = void 0;
        this._bufferedBytes = 0;
        this._buffers = [];
        this._compressed = false;
        this._payloadLength = 0;
        this._mask = void 0;
        this._fragmented = 0;
        this._masked = false;
        this._fin = false;
        this._opcode = 0;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragments = [];
        this._errored = false;
        this._loop = false;
        this._state = GET_INFO;
      }
      /**
       * Implements `Writable.prototype._write()`.
       *
       * @param {Buffer} chunk The chunk of data to write
       * @param {String} encoding The character encoding of `chunk`
       * @param {Function} cb Callback
       * @private
       */
      _write(chunk, encoding, cb) {
        if (this._opcode === 8 && this._state == GET_INFO) return cb();
        this._bufferedBytes += chunk.length;
        this._buffers.push(chunk);
        this.startLoop(cb);
      }
      /**
       * Consumes `n` bytes from the buffered data.
       *
       * @param {Number} n The number of bytes to consume
       * @return {Buffer} The consumed bytes
       * @private
       */
      consume(n) {
        this._bufferedBytes -= n;
        if (n === this._buffers[0].length) return this._buffers.shift();
        if (n < this._buffers[0].length) {
          const buf = this._buffers[0];
          this._buffers[0] = new FastBuffer(
            buf.buffer,
            buf.byteOffset + n,
            buf.length - n
          );
          return new FastBuffer(buf.buffer, buf.byteOffset, n);
        }
        const dst = Buffer.allocUnsafe(n);
        do {
          const buf = this._buffers[0];
          const offset = dst.length - n;
          if (n >= buf.length) {
            dst.set(this._buffers.shift(), offset);
          } else {
            dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
            this._buffers[0] = new FastBuffer(
              buf.buffer,
              buf.byteOffset + n,
              buf.length - n
            );
          }
          n -= buf.length;
        } while (n > 0);
        return dst;
      }
      /**
       * Starts the parsing loop.
       *
       * @param {Function} cb Callback
       * @private
       */
      startLoop(cb) {
        this._loop = true;
        do {
          switch (this._state) {
            case GET_INFO:
              this.getInfo(cb);
              break;
            case GET_PAYLOAD_LENGTH_16:
              this.getPayloadLength16(cb);
              break;
            case GET_PAYLOAD_LENGTH_64:
              this.getPayloadLength64(cb);
              break;
            case GET_MASK:
              this.getMask();
              break;
            case GET_DATA:
              this.getData(cb);
              break;
            case INFLATING:
            case DEFER_EVENT:
              this._loop = false;
              return;
          }
        } while (this._loop);
        if (!this._errored) cb();
      }
      /**
       * Reads the first two bytes of a frame.
       *
       * @param {Function} cb Callback
       * @private
       */
      getInfo(cb) {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        const buf = this.consume(2);
        if ((buf[0] & 48) !== 0) {
          const error = this.createError(
            RangeError,
            "RSV2 and RSV3 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_2_3"
          );
          cb(error);
          return;
        }
        const compressed = (buf[0] & 64) === 64;
        if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
          const error = this.createError(
            RangeError,
            "RSV1 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_1"
          );
          cb(error);
          return;
        }
        this._fin = (buf[0] & 128) === 128;
        this._opcode = buf[0] & 15;
        this._payloadLength = buf[1] & 127;
        if (this._opcode === 0) {
          if (compressed) {
            const error = this.createError(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
            cb(error);
            return;
          }
          if (!this._fragmented) {
            const error = this.createError(
              RangeError,
              "invalid opcode 0",
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
            cb(error);
            return;
          }
          this._opcode = this._fragmented;
        } else if (this._opcode === 1 || this._opcode === 2) {
          if (this._fragmented) {
            const error = this.createError(
              RangeError,
              `invalid opcode ${this._opcode}`,
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
            cb(error);
            return;
          }
          this._compressed = compressed;
        } else if (this._opcode > 7 && this._opcode < 11) {
          if (!this._fin) {
            const error = this.createError(
              RangeError,
              "FIN must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_FIN"
            );
            cb(error);
            return;
          }
          if (compressed) {
            const error = this.createError(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
            cb(error);
            return;
          }
          if (this._payloadLength > 125 || this._opcode === 8 && this._payloadLength === 1) {
            const error = this.createError(
              RangeError,
              `invalid payload length ${this._payloadLength}`,
              true,
              1002,
              "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
            );
            cb(error);
            return;
          }
        } else {
          const error = this.createError(
            RangeError,
            `invalid opcode ${this._opcode}`,
            true,
            1002,
            "WS_ERR_INVALID_OPCODE"
          );
          cb(error);
          return;
        }
        if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
        this._masked = (buf[1] & 128) === 128;
        if (this._isServer) {
          if (!this._masked) {
            const error = this.createError(
              RangeError,
              "MASK must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_MASK"
            );
            cb(error);
            return;
          }
        } else if (this._masked) {
          const error = this.createError(
            RangeError,
            "MASK must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_MASK"
          );
          cb(error);
          return;
        }
        if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
        else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
        else this.haveLength(cb);
      }
      /**
       * Gets extended payload length (7+16).
       *
       * @param {Function} cb Callback
       * @private
       */
      getPayloadLength16(cb) {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        this._payloadLength = this.consume(2).readUInt16BE(0);
        this.haveLength(cb);
      }
      /**
       * Gets extended payload length (7+64).
       *
       * @param {Function} cb Callback
       * @private
       */
      getPayloadLength64(cb) {
        if (this._bufferedBytes < 8) {
          this._loop = false;
          return;
        }
        const buf = this.consume(8);
        const num = buf.readUInt32BE(0);
        if (num > Math.pow(2, 53 - 32) - 1) {
          const error = this.createError(
            RangeError,
            "Unsupported WebSocket frame: payload length > 2^53 - 1",
            false,
            1009,
            "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH"
          );
          cb(error);
          return;
        }
        this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
        this.haveLength(cb);
      }
      /**
       * Payload length has been read.
       *
       * @param {Function} cb Callback
       * @private
       */
      haveLength(cb) {
        if (this._payloadLength && this._opcode < 8) {
          this._totalPayloadLength += this._payloadLength;
          if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
            const error = this.createError(
              RangeError,
              "Max payload size exceeded",
              false,
              1009,
              "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
            );
            cb(error);
            return;
          }
        }
        if (this._masked) this._state = GET_MASK;
        else this._state = GET_DATA;
      }
      /**
       * Reads mask bytes.
       *
       * @private
       */
      getMask() {
        if (this._bufferedBytes < 4) {
          this._loop = false;
          return;
        }
        this._mask = this.consume(4);
        this._state = GET_DATA;
      }
      /**
       * Reads data bytes.
       *
       * @param {Function} cb Callback
       * @private
       */
      getData(cb) {
        let data = EMPTY_BUFFER;
        if (this._payloadLength) {
          if (this._bufferedBytes < this._payloadLength) {
            this._loop = false;
            return;
          }
          data = this.consume(this._payloadLength);
          if (this._masked && (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0) {
            unmask(data, this._mask);
          }
        }
        if (this._opcode > 7) {
          this.controlMessage(data, cb);
          return;
        }
        if (this._compressed) {
          this._state = INFLATING;
          this.decompress(data, cb);
          return;
        }
        if (data.length) {
          this._messageLength = this._totalPayloadLength;
          this._fragments.push(data);
        }
        this.dataMessage(cb);
      }
      /**
       * Decompresses data.
       *
       * @param {Buffer} data Compressed data
       * @param {Function} cb Callback
       * @private
       */
      decompress(data, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        perMessageDeflate.decompress(data, this._fin, (err, buf) => {
          if (err) return cb(err);
          if (buf.length) {
            this._messageLength += buf.length;
            if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
              const error = this.createError(
                RangeError,
                "Max payload size exceeded",
                false,
                1009,
                "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
              );
              cb(error);
              return;
            }
            this._fragments.push(buf);
          }
          this.dataMessage(cb);
          if (this._state === GET_INFO) this.startLoop(cb);
        });
      }
      /**
       * Handles a data message.
       *
       * @param {Function} cb Callback
       * @private
       */
      dataMessage(cb) {
        if (!this._fin) {
          this._state = GET_INFO;
          return;
        }
        const messageLength = this._messageLength;
        const fragments = this._fragments;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragmented = 0;
        this._fragments = [];
        if (this._opcode === 2) {
          let data;
          if (this._binaryType === "nodebuffer") {
            data = concat(fragments, messageLength);
          } else if (this._binaryType === "arraybuffer") {
            data = toArrayBuffer(concat(fragments, messageLength));
          } else if (this._binaryType === "blob") {
            data = new Blob(fragments);
          } else {
            data = fragments;
          }
          if (this._allowSynchronousEvents) {
            this.emit("message", data, true);
            this._state = GET_INFO;
          } else {
            this._state = DEFER_EVENT;
            setImmediate(() => {
              this.emit("message", data, true);
              this._state = GET_INFO;
              this.startLoop(cb);
            });
          }
        } else {
          const buf = concat(fragments, messageLength);
          if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
            const error = this.createError(
              Error,
              "invalid UTF-8 sequence",
              true,
              1007,
              "WS_ERR_INVALID_UTF8"
            );
            cb(error);
            return;
          }
          if (this._state === INFLATING || this._allowSynchronousEvents) {
            this.emit("message", buf, false);
            this._state = GET_INFO;
          } else {
            this._state = DEFER_EVENT;
            setImmediate(() => {
              this.emit("message", buf, false);
              this._state = GET_INFO;
              this.startLoop(cb);
            });
          }
        }
      }
      /**
       * Handles a control message.
       *
       * @param {Buffer} data Data to handle
       * @return {(Error|RangeError|undefined)} A possible error
       * @private
       */
      controlMessage(data, cb) {
        if (this._opcode === 8) {
          if (data.length === 0) {
            this._loop = false;
            this.emit("conclude", 1005, EMPTY_BUFFER);
            this.end();
          } else {
            const code = data.readUInt16BE(0);
            if (!isValidStatusCode(code)) {
              const error = this.createError(
                RangeError,
                `invalid status code ${code}`,
                true,
                1002,
                "WS_ERR_INVALID_CLOSE_CODE"
              );
              cb(error);
              return;
            }
            const buf = new FastBuffer(
              data.buffer,
              data.byteOffset + 2,
              data.length - 2
            );
            if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
              const error = this.createError(
                Error,
                "invalid UTF-8 sequence",
                true,
                1007,
                "WS_ERR_INVALID_UTF8"
              );
              cb(error);
              return;
            }
            this._loop = false;
            this.emit("conclude", code, buf);
            this.end();
          }
          this._state = GET_INFO;
          return;
        }
        if (this._allowSynchronousEvents) {
          this.emit(this._opcode === 9 ? "ping" : "pong", data);
          this._state = GET_INFO;
        } else {
          this._state = DEFER_EVENT;
          setImmediate(() => {
            this.emit(this._opcode === 9 ? "ping" : "pong", data);
            this._state = GET_INFO;
            this.startLoop(cb);
          });
        }
      }
      /**
       * Builds an error object.
       *
       * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
       * @param {String} message The error message
       * @param {Boolean} prefix Specifies whether or not to add a default prefix to
       *     `message`
       * @param {Number} statusCode The status code
       * @param {String} errorCode The exposed error code
       * @return {(Error|RangeError)} The error
       * @private
       */
      createError(ErrorCtor, message, prefix, statusCode, errorCode) {
        this._loop = false;
        this._errored = true;
        const err = new ErrorCtor(
          prefix ? `Invalid WebSocket frame: ${message}` : message
        );
        Error.captureStackTrace(err, this.createError);
        err.code = errorCode;
        err[kStatusCode] = statusCode;
        return err;
      }
    };
    module2.exports = Receiver2;
  }
});
var require_sender = __commonJS({
  "node_modules/ws/lib/sender.js"(exports2, module2) {
    "use strict";
    var { Duplex } = __require("stream");
    var { randomFillSync } = __require("crypto");
    var PerMessageDeflate = require_permessage_deflate();
    var { EMPTY_BUFFER, kWebSocket, NOOP } = require_constants();
    var { isBlob, isValidStatusCode } = require_validation();
    var { mask: applyMask, toBuffer } = require_buffer_util();
    var kByteLength = Symbol("kByteLength");
    var maskBuffer = Buffer.alloc(4);
    var RANDOM_POOL_SIZE = 8 * 1024;
    var randomPool;
    var randomPoolPointer = RANDOM_POOL_SIZE;
    var DEFAULT = 0;
    var DEFLATING = 1;
    var GET_BLOB_DATA = 2;
    var Sender2 = class _Sender {
      /**
       * Creates a Sender instance.
       *
       * @param {Duplex} socket The connection socket
       * @param {Object} [extensions] An object containing the negotiated extensions
       * @param {Function} [generateMask] The function used to generate the masking
       *     key
       */
      constructor(socket, extensions, generateMask) {
        this._extensions = extensions || {};
        if (generateMask) {
          this._generateMask = generateMask;
          this._maskBuffer = Buffer.alloc(4);
        }
        this._socket = socket;
        this._firstFragment = true;
        this._compress = false;
        this._bufferedBytes = 0;
        this._queue = [];
        this._state = DEFAULT;
        this.onerror = NOOP;
        this[kWebSocket] = void 0;
      }
      /**
       * Frames a piece of data according to the HyBi WebSocket protocol.
       *
       * @param {(Buffer|String)} data The data to frame
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @return {(Buffer|String)[]} The framed data
       * @public
       */
      static frame(data, options) {
        let mask;
        let merge = false;
        let offset = 2;
        let skipMasking = false;
        if (options.mask) {
          mask = options.maskBuffer || maskBuffer;
          if (options.generateMask) {
            options.generateMask(mask);
          } else {
            if (randomPoolPointer === RANDOM_POOL_SIZE) {
              if (randomPool === void 0) {
                randomPool = Buffer.alloc(RANDOM_POOL_SIZE);
              }
              randomFillSync(randomPool, 0, RANDOM_POOL_SIZE);
              randomPoolPointer = 0;
            }
            mask[0] = randomPool[randomPoolPointer++];
            mask[1] = randomPool[randomPoolPointer++];
            mask[2] = randomPool[randomPoolPointer++];
            mask[3] = randomPool[randomPoolPointer++];
          }
          skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
          offset = 6;
        }
        let dataLength;
        if (typeof data === "string") {
          if ((!options.mask || skipMasking) && options[kByteLength] !== void 0) {
            dataLength = options[kByteLength];
          } else {
            data = Buffer.from(data);
            dataLength = data.length;
          }
        } else {
          dataLength = data.length;
          merge = options.mask && options.readOnly && !skipMasking;
        }
        let payloadLength = dataLength;
        if (dataLength >= 65536) {
          offset += 8;
          payloadLength = 127;
        } else if (dataLength > 125) {
          offset += 2;
          payloadLength = 126;
        }
        const target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);
        target[0] = options.fin ? options.opcode | 128 : options.opcode;
        if (options.rsv1) target[0] |= 64;
        target[1] = payloadLength;
        if (payloadLength === 126) {
          target.writeUInt16BE(dataLength, 2);
        } else if (payloadLength === 127) {
          target[2] = target[3] = 0;
          target.writeUIntBE(dataLength, 4, 6);
        }
        if (!options.mask) return [target, data];
        target[1] |= 128;
        target[offset - 4] = mask[0];
        target[offset - 3] = mask[1];
        target[offset - 2] = mask[2];
        target[offset - 1] = mask[3];
        if (skipMasking) return [target, data];
        if (merge) {
          applyMask(data, mask, target, offset, dataLength);
          return [target];
        }
        applyMask(data, mask, data, 0, dataLength);
        return [target, data];
      }
      /**
       * Sends a close message to the other peer.
       *
       * @param {Number} [code] The status code component of the body
       * @param {(String|Buffer)} [data] The message component of the body
       * @param {Boolean} [mask=false] Specifies whether or not to mask the message
       * @param {Function} [cb] Callback
       * @public
       */
      close(code, data, mask, cb) {
        let buf;
        if (code === void 0) {
          buf = EMPTY_BUFFER;
        } else if (typeof code !== "number" || !isValidStatusCode(code)) {
          throw new TypeError("First argument must be a valid error code number");
        } else if (data === void 0 || !data.length) {
          buf = Buffer.allocUnsafe(2);
          buf.writeUInt16BE(code, 0);
        } else {
          const length2 = Buffer.byteLength(data);
          if (length2 > 123) {
            throw new RangeError("The message must not be greater than 123 bytes");
          }
          buf = Buffer.allocUnsafe(2 + length2);
          buf.writeUInt16BE(code, 0);
          if (typeof data === "string") {
            buf.write(data, 2);
          } else {
            buf.set(data, 2);
          }
        }
        const options = {
          [kByteLength]: buf.length,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 8,
          readOnly: false,
          rsv1: false
        };
        if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, buf, false, options, cb]);
        } else {
          this.sendFrame(_Sender.frame(buf, options), cb);
        }
      }
      /**
       * Sends a ping message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @public
       */
      ping(data, mask, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else if (isBlob(data)) {
          byteLength = data.size;
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 9,
          readOnly,
          rsv1: false
        };
        if (isBlob(data)) {
          if (this._state !== DEFAULT) {
            this.enqueue([this.getBlobData, data, false, options, cb]);
          } else {
            this.getBlobData(data, false, options, cb);
          }
        } else if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, data, false, options, cb]);
        } else {
          this.sendFrame(_Sender.frame(data, options), cb);
        }
      }
      /**
       * Sends a pong message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @public
       */
      pong(data, mask, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else if (isBlob(data)) {
          byteLength = data.size;
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 10,
          readOnly,
          rsv1: false
        };
        if (isBlob(data)) {
          if (this._state !== DEFAULT) {
            this.enqueue([this.getBlobData, data, false, options, cb]);
          } else {
            this.getBlobData(data, false, options, cb);
          }
        } else if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, data, false, options, cb]);
        } else {
          this.sendFrame(_Sender.frame(data, options), cb);
        }
      }
      /**
       * Sends a data message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Object} options Options object
       * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
       *     or text
       * @param {Boolean} [options.compress=false] Specifies whether or not to
       *     compress `data`
       * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
       *     last one
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Function} [cb] Callback
       * @public
       */
      send(data, options, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        let opcode = options.binary ? 2 : 1;
        let rsv1 = options.compress;
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else if (isBlob(data)) {
          byteLength = data.size;
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (this._firstFragment) {
          this._firstFragment = false;
          if (rsv1 && perMessageDeflate && perMessageDeflate.params[perMessageDeflate._isServer ? "server_no_context_takeover" : "client_no_context_takeover"]) {
            rsv1 = byteLength >= perMessageDeflate._threshold;
          }
          this._compress = rsv1;
        } else {
          rsv1 = false;
          opcode = 0;
        }
        if (options.fin) this._firstFragment = true;
        const opts = {
          [kByteLength]: byteLength,
          fin: options.fin,
          generateMask: this._generateMask,
          mask: options.mask,
          maskBuffer: this._maskBuffer,
          opcode,
          readOnly,
          rsv1
        };
        if (isBlob(data)) {
          if (this._state !== DEFAULT) {
            this.enqueue([this.getBlobData, data, this._compress, opts, cb]);
          } else {
            this.getBlobData(data, this._compress, opts, cb);
          }
        } else if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, data, this._compress, opts, cb]);
        } else {
          this.dispatch(data, this._compress, opts, cb);
        }
      }
      /**
       * Gets the contents of a blob as binary data.
       *
       * @param {Blob} blob The blob
       * @param {Boolean} [compress=false] Specifies whether or not to compress
       *     the data
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @param {Function} [cb] Callback
       * @private
       */
      getBlobData(blob, compress, options, cb) {
        this._bufferedBytes += options[kByteLength];
        this._state = GET_BLOB_DATA;
        blob.arrayBuffer().then((arrayBuffer2) => {
          if (this._socket.destroyed) {
            const err = new Error(
              "The socket was closed while the blob was being read"
            );
            process.nextTick(callCallbacks, this, err, cb);
            return;
          }
          this._bufferedBytes -= options[kByteLength];
          const data = toBuffer(arrayBuffer2);
          if (!compress) {
            this._state = DEFAULT;
            this.sendFrame(_Sender.frame(data, options), cb);
            this.dequeue();
          } else {
            this.dispatch(data, compress, options, cb);
          }
        }).catch((err) => {
          process.nextTick(onError, this, err, cb);
        });
      }
      /**
       * Dispatches a message.
       *
       * @param {(Buffer|String)} data The message to send
       * @param {Boolean} [compress=false] Specifies whether or not to compress
       *     `data`
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @param {Function} [cb] Callback
       * @private
       */
      dispatch(data, compress, options, cb) {
        if (!compress) {
          this.sendFrame(_Sender.frame(data, options), cb);
          return;
        }
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        this._bufferedBytes += options[kByteLength];
        this._state = DEFLATING;
        perMessageDeflate.compress(data, options.fin, (_, buf) => {
          if (this._socket.destroyed) {
            const err = new Error(
              "The socket was closed while data was being compressed"
            );
            callCallbacks(this, err, cb);
            return;
          }
          this._bufferedBytes -= options[kByteLength];
          this._state = DEFAULT;
          options.readOnly = false;
          this.sendFrame(_Sender.frame(buf, options), cb);
          this.dequeue();
        });
      }
      /**
       * Executes queued send operations.
       *
       * @private
       */
      dequeue() {
        while (this._state === DEFAULT && this._queue.length) {
          const params = this._queue.shift();
          this._bufferedBytes -= params[3][kByteLength];
          Reflect.apply(params[0], this, params.slice(1));
        }
      }
      /**
       * Enqueues a send operation.
       *
       * @param {Array} params Send operation parameters.
       * @private
       */
      enqueue(params) {
        this._bufferedBytes += params[3][kByteLength];
        this._queue.push(params);
      }
      /**
       * Sends a frame.
       *
       * @param {(Buffer | String)[]} list The frame to send
       * @param {Function} [cb] Callback
       * @private
       */
      sendFrame(list, cb) {
        if (list.length === 2) {
          this._socket.cork();
          this._socket.write(list[0]);
          this._socket.write(list[1], cb);
          this._socket.uncork();
        } else {
          this._socket.write(list[0], cb);
        }
      }
    };
    module2.exports = Sender2;
    function callCallbacks(sender, err, cb) {
      if (typeof cb === "function") cb(err);
      for (let i = 0; i < sender._queue.length; i++) {
        const params = sender._queue[i];
        const callback = params[params.length - 1];
        if (typeof callback === "function") callback(err);
      }
    }
    function onError(sender, err, cb) {
      callCallbacks(sender, err, cb);
      sender.onerror(err);
    }
  }
});
var require_event_target = __commonJS({
  "node_modules/ws/lib/event-target.js"(exports2, module2) {
    "use strict";
    var { kForOnEventAttribute, kListener } = require_constants();
    var kCode = Symbol("kCode");
    var kData = Symbol("kData");
    var kError = Symbol("kError");
    var kMessage = Symbol("kMessage");
    var kReason = Symbol("kReason");
    var kTarget = Symbol("kTarget");
    var kType = Symbol("kType");
    var kWasClean = Symbol("kWasClean");
    var Event = class {
      /**
       * Create a new `Event`.
       *
       * @param {String} type The name of the event
       * @throws {TypeError} If the `type` argument is not specified
       */
      constructor(type) {
        this[kTarget] = null;
        this[kType] = type;
      }
      /**
       * @type {*}
       */
      get target() {
        return this[kTarget];
      }
      /**
       * @type {String}
       */
      get type() {
        return this[kType];
      }
    };
    Object.defineProperty(Event.prototype, "target", { enumerable: true });
    Object.defineProperty(Event.prototype, "type", { enumerable: true });
    var CloseEvent = class extends Event {
      /**
       * Create a new `CloseEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {Number} [options.code=0] The status code explaining why the
       *     connection was closed
       * @param {String} [options.reason=''] A human-readable string explaining why
       *     the connection was closed
       * @param {Boolean} [options.wasClean=false] Indicates whether or not the
       *     connection was cleanly closed
       */
      constructor(type, options = {}) {
        super(type);
        this[kCode] = options.code === void 0 ? 0 : options.code;
        this[kReason] = options.reason === void 0 ? "" : options.reason;
        this[kWasClean] = options.wasClean === void 0 ? false : options.wasClean;
      }
      /**
       * @type {Number}
       */
      get code() {
        return this[kCode];
      }
      /**
       * @type {String}
       */
      get reason() {
        return this[kReason];
      }
      /**
       * @type {Boolean}
       */
      get wasClean() {
        return this[kWasClean];
      }
    };
    Object.defineProperty(CloseEvent.prototype, "code", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "reason", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "wasClean", { enumerable: true });
    var ErrorEvent = class extends Event {
      /**
       * Create a new `ErrorEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {*} [options.error=null] The error that generated this event
       * @param {String} [options.message=''] The error message
       */
      constructor(type, options = {}) {
        super(type);
        this[kError] = options.error === void 0 ? null : options.error;
        this[kMessage] = options.message === void 0 ? "" : options.message;
      }
      /**
       * @type {*}
       */
      get error() {
        return this[kError];
      }
      /**
       * @type {String}
       */
      get message() {
        return this[kMessage];
      }
    };
    Object.defineProperty(ErrorEvent.prototype, "error", { enumerable: true });
    Object.defineProperty(ErrorEvent.prototype, "message", { enumerable: true });
    var MessageEvent = class extends Event {
      /**
       * Create a new `MessageEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {*} [options.data=null] The message content
       */
      constructor(type, options = {}) {
        super(type);
        this[kData] = options.data === void 0 ? null : options.data;
      }
      /**
       * @type {*}
       */
      get data() {
        return this[kData];
      }
    };
    Object.defineProperty(MessageEvent.prototype, "data", { enumerable: true });
    var EventTarget = {
      /**
       * Register an event listener.
       *
       * @param {String} type A string representing the event type to listen for
       * @param {(Function|Object)} handler The listener to add
       * @param {Object} [options] An options object specifies characteristics about
       *     the event listener
       * @param {Boolean} [options.once=false] A `Boolean` indicating that the
       *     listener should be invoked at most once after being added. If `true`,
       *     the listener would be automatically removed when invoked.
       * @public
       */
      addEventListener(type, handler, options = {}) {
        for (const listener of this.listeners(type)) {
          if (!options[kForOnEventAttribute] && listener[kListener] === handler && !listener[kForOnEventAttribute]) {
            return;
          }
        }
        let wrapper;
        if (type === "message") {
          wrapper = function onMessage(data, isBinary) {
            const event = new MessageEvent("message", {
              data: isBinary ? data : data.toString()
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "close") {
          wrapper = function onClose(code, message) {
            const event = new CloseEvent("close", {
              code,
              reason: message.toString(),
              wasClean: this._closeFrameReceived && this._closeFrameSent
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "error") {
          wrapper = function onError(error) {
            const event = new ErrorEvent("error", {
              error,
              message: error.message
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "open") {
          wrapper = function onOpen() {
            const event = new Event("open");
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else {
          return;
        }
        wrapper[kForOnEventAttribute] = !!options[kForOnEventAttribute];
        wrapper[kListener] = handler;
        if (options.once) {
          this.once(type, wrapper);
        } else {
          this.on(type, wrapper);
        }
      },
      /**
       * Remove an event listener.
       *
       * @param {String} type A string representing the event type to remove
       * @param {(Function|Object)} handler The listener to remove
       * @public
       */
      removeEventListener(type, handler) {
        for (const listener of this.listeners(type)) {
          if (listener[kListener] === handler && !listener[kForOnEventAttribute]) {
            this.removeListener(type, listener);
            break;
          }
        }
      }
    };
    module2.exports = {
      CloseEvent,
      ErrorEvent,
      Event,
      EventTarget,
      MessageEvent
    };
    function callListener(listener, thisArg, event) {
      if (typeof listener === "object" && listener.handleEvent) {
        listener.handleEvent.call(listener, event);
      } else {
        listener.call(thisArg, event);
      }
    }
  }
});
var require_extension = __commonJS({
  "node_modules/ws/lib/extension.js"(exports2, module2) {
    "use strict";
    var { tokenChars } = require_validation();
    function push(dest, name, elem) {
      if (dest[name] === void 0) dest[name] = [elem];
      else dest[name].push(elem);
    }
    function parse(header) {
      const offers = /* @__PURE__ */ Object.create(null);
      let params = /* @__PURE__ */ Object.create(null);
      let mustUnescape = false;
      let isEscaping = false;
      let inQuotes = false;
      let extensionName;
      let paramName;
      let start = -1;
      let code = -1;
      let end = -1;
      let i = 0;
      for (; i < header.length; i++) {
        code = header.charCodeAt(i);
        if (extensionName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (i !== 0 && (code === 32 || code === 9)) {
            if (end === -1 && start !== -1) end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            const name = header.slice(start, end);
            if (code === 44) {
              push(offers, name, params);
              params = /* @__PURE__ */ Object.create(null);
            } else {
              extensionName = name;
            }
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else if (paramName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (code === 32 || code === 9) {
            if (end === -1 && start !== -1) end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            push(params, header.slice(start, end), true);
            if (code === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            start = end = -1;
          } else if (code === 61 && start !== -1 && end === -1) {
            paramName = header.slice(start, i);
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else {
          if (isEscaping) {
            if (tokenChars[code] !== 1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (start === -1) start = i;
            else if (!mustUnescape) mustUnescape = true;
            isEscaping = false;
          } else if (inQuotes) {
            if (tokenChars[code] === 1) {
              if (start === -1) start = i;
            } else if (code === 34 && start !== -1) {
              inQuotes = false;
              end = i;
            } else if (code === 92) {
              isEscaping = true;
            } else {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
          } else if (code === 34 && header.charCodeAt(i - 1) === 61) {
            inQuotes = true;
          } else if (end === -1 && tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (start !== -1 && (code === 32 || code === 9)) {
            if (end === -1) end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            let value = header.slice(start, end);
            if (mustUnescape) {
              value = value.replace(/\\/g, "");
              mustUnescape = false;
            }
            push(params, paramName, value);
            if (code === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            paramName = void 0;
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        }
      }
      if (start === -1 || inQuotes || code === 32 || code === 9) {
        throw new SyntaxError("Unexpected end of input");
      }
      if (end === -1) end = i;
      const token = header.slice(start, end);
      if (extensionName === void 0) {
        push(offers, token, params);
      } else {
        if (paramName === void 0) {
          push(params, token, true);
        } else if (mustUnescape) {
          push(params, paramName, token.replace(/\\/g, ""));
        } else {
          push(params, paramName, token);
        }
        push(offers, extensionName, params);
      }
      return offers;
    }
    function format(extensions) {
      return Object.keys(extensions).map((extension) => {
        let configurations = extensions[extension];
        if (!Array.isArray(configurations)) configurations = [configurations];
        return configurations.map((params) => {
          return [extension].concat(
            Object.keys(params).map((k) => {
              let values = params[k];
              if (!Array.isArray(values)) values = [values];
              return values.map((v) => v === true ? k : `${k}=${v}`).join("; ");
            })
          ).join("; ");
        }).join(", ");
      }).join(", ");
    }
    module2.exports = { format, parse };
  }
});
var require_websocket = __commonJS({
  "node_modules/ws/lib/websocket.js"(exports2, module2) {
    "use strict";
    var EventEmitter = __require("events");
    var https = __require("https");
    var http = __require("http");
    var net = __require("net");
    var tls = __require("tls");
    var { randomBytes, createHash } = __require("crypto");
    var { Duplex, Readable: Readable2 } = __require("stream");
    var { URL: URL2 } = __require("url");
    var PerMessageDeflate = require_permessage_deflate();
    var Receiver2 = require_receiver();
    var Sender2 = require_sender();
    var { isBlob } = require_validation();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      GUID,
      kForOnEventAttribute,
      kListener,
      kStatusCode,
      kWebSocket,
      NOOP
    } = require_constants();
    var {
      EventTarget: { addEventListener, removeEventListener }
    } = require_event_target();
    var { format, parse } = require_extension();
    var { toBuffer } = require_buffer_util();
    var closeTimeout = 30 * 1e3;
    var kAborted = Symbol("kAborted");
    var protocolVersions = [8, 13];
    var readyStates = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
    var subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
    var WebSocket3 = class _WebSocket extends EventEmitter {
      /**
       * Create a new `WebSocket`.
       *
       * @param {(String|URL)} address The URL to which to connect
       * @param {(String|String[])} [protocols] The subprotocols
       * @param {Object} [options] Connection options
       */
      constructor(address, protocols, options) {
        super();
        this._binaryType = BINARY_TYPES[0];
        this._closeCode = 1006;
        this._closeFrameReceived = false;
        this._closeFrameSent = false;
        this._closeMessage = EMPTY_BUFFER;
        this._closeTimer = null;
        this._errorEmitted = false;
        this._extensions = {};
        this._paused = false;
        this._protocol = "";
        this._readyState = _WebSocket.CONNECTING;
        this._receiver = null;
        this._sender = null;
        this._socket = null;
        if (address !== null) {
          this._bufferedAmount = 0;
          this._isServer = false;
          this._redirects = 0;
          if (protocols === void 0) {
            protocols = [];
          } else if (!Array.isArray(protocols)) {
            if (typeof protocols === "object" && protocols !== null) {
              options = protocols;
              protocols = [];
            } else {
              protocols = [protocols];
            }
          }
          initAsClient(this, address, protocols, options);
        } else {
          this._autoPong = options.autoPong;
          this._isServer = true;
        }
      }
      /**
       * For historical reasons, the custom "nodebuffer" type is used by the default
       * instead of "blob".
       *
       * @type {String}
       */
      get binaryType() {
        return this._binaryType;
      }
      set binaryType(type) {
        if (!BINARY_TYPES.includes(type)) return;
        this._binaryType = type;
        if (this._receiver) this._receiver._binaryType = type;
      }
      /**
       * @type {Number}
       */
      get bufferedAmount() {
        if (!this._socket) return this._bufferedAmount;
        return this._socket._writableState.length + this._sender._bufferedBytes;
      }
      /**
       * @type {String}
       */
      get extensions() {
        return Object.keys(this._extensions).join();
      }
      /**
       * @type {Boolean}
       */
      get isPaused() {
        return this._paused;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onclose() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onerror() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onopen() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onmessage() {
        return null;
      }
      /**
       * @type {String}
       */
      get protocol() {
        return this._protocol;
      }
      /**
       * @type {Number}
       */
      get readyState() {
        return this._readyState;
      }
      /**
       * @type {String}
       */
      get url() {
        return this._url;
      }
      /**
       * Set up the socket and the internal resources.
       *
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Object} options Options object
       * @param {Boolean} [options.allowSynchronousEvents=false] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Number} [options.maxPayload=0] The maximum allowed message size
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       * @private
       */
      setSocket(socket, head, options) {
        const receiver = new Receiver2({
          allowSynchronousEvents: options.allowSynchronousEvents,
          binaryType: this.binaryType,
          extensions: this._extensions,
          isServer: this._isServer,
          maxPayload: options.maxPayload,
          skipUTF8Validation: options.skipUTF8Validation
        });
        const sender = new Sender2(socket, this._extensions, options.generateMask);
        this._receiver = receiver;
        this._sender = sender;
        this._socket = socket;
        receiver[kWebSocket] = this;
        sender[kWebSocket] = this;
        socket[kWebSocket] = this;
        receiver.on("conclude", receiverOnConclude);
        receiver.on("drain", receiverOnDrain);
        receiver.on("error", receiverOnError);
        receiver.on("message", receiverOnMessage);
        receiver.on("ping", receiverOnPing);
        receiver.on("pong", receiverOnPong);
        sender.onerror = senderOnError;
        if (socket.setTimeout) socket.setTimeout(0);
        if (socket.setNoDelay) socket.setNoDelay();
        if (head.length > 0) socket.unshift(head);
        socket.on("close", socketOnClose);
        socket.on("data", socketOnData);
        socket.on("end", socketOnEnd);
        socket.on("error", socketOnError);
        this._readyState = _WebSocket.OPEN;
        this.emit("open");
      }
      /**
       * Emit the `'close'` event.
       *
       * @private
       */
      emitClose() {
        if (!this._socket) {
          this._readyState = _WebSocket.CLOSED;
          this.emit("close", this._closeCode, this._closeMessage);
          return;
        }
        if (this._extensions[PerMessageDeflate.extensionName]) {
          this._extensions[PerMessageDeflate.extensionName].cleanup();
        }
        this._receiver.removeAllListeners();
        this._readyState = _WebSocket.CLOSED;
        this.emit("close", this._closeCode, this._closeMessage);
      }
      /**
       * Start a closing handshake.
       *
       *          +----------+   +-----------+   +----------+
       *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
       *    |     +----------+   +-----------+   +----------+     |
       *          +----------+   +-----------+         |
       * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
       *          +----------+   +-----------+   |
       *    |           |                        |   +---+        |
       *                +------------------------+-->|fin| - - - -
       *    |         +---+                      |   +---+
       *     - - - - -|fin|<---------------------+
       *              +---+
       *
       * @param {Number} [code] Status code explaining why the connection is closing
       * @param {(String|Buffer)} [data] The reason why the connection is
       *     closing
       * @public
       */
      close(code, data) {
        if (this.readyState === _WebSocket.CLOSED) return;
        if (this.readyState === _WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          abortHandshake(this, this._req, msg);
          return;
        }
        if (this.readyState === _WebSocket.CLOSING) {
          if (this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted)) {
            this._socket.end();
          }
          return;
        }
        this._readyState = _WebSocket.CLOSING;
        this._sender.close(code, data, !this._isServer, (err) => {
          if (err) return;
          this._closeFrameSent = true;
          if (this._closeFrameReceived || this._receiver._writableState.errorEmitted) {
            this._socket.end();
          }
        });
        setCloseTimer(this);
      }
      /**
       * Pause the socket.
       *
       * @public
       */
      pause() {
        if (this.readyState === _WebSocket.CONNECTING || this.readyState === _WebSocket.CLOSED) {
          return;
        }
        this._paused = true;
        this._socket.pause();
      }
      /**
       * Send a ping.
       *
       * @param {*} [data] The data to send
       * @param {Boolean} [mask] Indicates whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when the ping is sent
       * @public
       */
      ping(data, mask, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number") data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0) mask = !this._isServer;
        this._sender.ping(data || EMPTY_BUFFER, mask, cb);
      }
      /**
       * Send a pong.
       *
       * @param {*} [data] The data to send
       * @param {Boolean} [mask] Indicates whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when the pong is sent
       * @public
       */
      pong(data, mask, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number") data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0) mask = !this._isServer;
        this._sender.pong(data || EMPTY_BUFFER, mask, cb);
      }
      /**
       * Resume the socket.
       *
       * @public
       */
      resume() {
        if (this.readyState === _WebSocket.CONNECTING || this.readyState === _WebSocket.CLOSED) {
          return;
        }
        this._paused = false;
        if (!this._receiver._writableState.needDrain) this._socket.resume();
      }
      /**
       * Send a data message.
       *
       * @param {*} data The message to send
       * @param {Object} [options] Options object
       * @param {Boolean} [options.binary] Specifies whether `data` is binary or
       *     text
       * @param {Boolean} [options.compress] Specifies whether or not to compress
       *     `data`
       * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
       *     last one
       * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when data is written out
       * @public
       */
      send(data, options, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof options === "function") {
          cb = options;
          options = {};
        }
        if (typeof data === "number") data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        const opts = {
          binary: typeof data !== "string",
          mask: !this._isServer,
          compress: true,
          fin: true,
          ...options
        };
        if (!this._extensions[PerMessageDeflate.extensionName]) {
          opts.compress = false;
        }
        this._sender.send(data || EMPTY_BUFFER, opts, cb);
      }
      /**
       * Forcibly close the connection.
       *
       * @public
       */
      terminate() {
        if (this.readyState === _WebSocket.CLOSED) return;
        if (this.readyState === _WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          abortHandshake(this, this._req, msg);
          return;
        }
        if (this._socket) {
          this._readyState = _WebSocket.CLOSING;
          this._socket.destroy();
        }
      }
    };
    Object.defineProperty(WebSocket3, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket3.prototype, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket3, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket3.prototype, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket3, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket3.prototype, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket3, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    Object.defineProperty(WebSocket3.prototype, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    [
      "binaryType",
      "bufferedAmount",
      "extensions",
      "isPaused",
      "protocol",
      "readyState",
      "url"
    ].forEach((property) => {
      Object.defineProperty(WebSocket3.prototype, property, { enumerable: true });
    });
    ["open", "error", "close", "message"].forEach((method) => {
      Object.defineProperty(WebSocket3.prototype, `on${method}`, {
        enumerable: true,
        get() {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute]) return listener[kListener];
          }
          return null;
        },
        set(handler) {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute]) {
              this.removeListener(method, listener);
              break;
            }
          }
          if (typeof handler !== "function") return;
          this.addEventListener(method, handler, {
            [kForOnEventAttribute]: true
          });
        }
      });
    });
    WebSocket3.prototype.addEventListener = addEventListener;
    WebSocket3.prototype.removeEventListener = removeEventListener;
    module2.exports = WebSocket3;
    function initAsClient(websocket, address, protocols, options) {
      const opts = {
        allowSynchronousEvents: true,
        autoPong: true,
        protocolVersion: protocolVersions[1],
        maxPayload: 100 * 1024 * 1024,
        skipUTF8Validation: false,
        perMessageDeflate: true,
        followRedirects: false,
        maxRedirects: 10,
        ...options,
        socketPath: void 0,
        hostname: void 0,
        protocol: void 0,
        timeout: void 0,
        method: "GET",
        host: void 0,
        path: void 0,
        port: void 0
      };
      websocket._autoPong = opts.autoPong;
      if (!protocolVersions.includes(opts.protocolVersion)) {
        throw new RangeError(
          `Unsupported protocol version: ${opts.protocolVersion} (supported versions: ${protocolVersions.join(", ")})`
        );
      }
      let parsedUrl;
      if (address instanceof URL2) {
        parsedUrl = address;
      } else {
        try {
          parsedUrl = new URL2(address);
        } catch (e) {
          throw new SyntaxError(`Invalid URL: ${address}`);
        }
      }
      if (parsedUrl.protocol === "http:") {
        parsedUrl.protocol = "ws:";
      } else if (parsedUrl.protocol === "https:") {
        parsedUrl.protocol = "wss:";
      }
      websocket._url = parsedUrl.href;
      const isSecure = parsedUrl.protocol === "wss:";
      const isIpcUrl = parsedUrl.protocol === "ws+unix:";
      let invalidUrlMessage;
      if (parsedUrl.protocol !== "ws:" && !isSecure && !isIpcUrl) {
        invalidUrlMessage = `The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`;
      } else if (isIpcUrl && !parsedUrl.pathname) {
        invalidUrlMessage = "The URL's pathname is empty";
      } else if (parsedUrl.hash) {
        invalidUrlMessage = "The URL contains a fragment identifier";
      }
      if (invalidUrlMessage) {
        const err = new SyntaxError(invalidUrlMessage);
        if (websocket._redirects === 0) {
          throw err;
        } else {
          emitErrorAndClose(websocket, err);
          return;
        }
      }
      const defaultPort = isSecure ? 443 : 80;
      const key = randomBytes(16).toString("base64");
      const request = isSecure ? https.request : http.request;
      const protocolSet = /* @__PURE__ */ new Set();
      let perMessageDeflate;
      opts.createConnection = opts.createConnection || (isSecure ? tlsConnect : netConnect);
      opts.defaultPort = opts.defaultPort || defaultPort;
      opts.port = parsedUrl.port || defaultPort;
      opts.host = parsedUrl.hostname.startsWith("[") ? parsedUrl.hostname.slice(1, -1) : parsedUrl.hostname;
      opts.headers = {
        ...opts.headers,
        "Sec-WebSocket-Version": opts.protocolVersion,
        "Sec-WebSocket-Key": key,
        Connection: "Upgrade",
        Upgrade: "websocket"
      };
      opts.path = parsedUrl.pathname + parsedUrl.search;
      opts.timeout = opts.handshakeTimeout;
      if (opts.perMessageDeflate) {
        perMessageDeflate = new PerMessageDeflate(
          opts.perMessageDeflate !== true ? opts.perMessageDeflate : {},
          false,
          opts.maxPayload
        );
        opts.headers["Sec-WebSocket-Extensions"] = format({
          [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
        });
      }
      if (protocols.length) {
        for (const protocol of protocols) {
          if (typeof protocol !== "string" || !subprotocolRegex.test(protocol) || protocolSet.has(protocol)) {
            throw new SyntaxError(
              "An invalid or duplicated subprotocol was specified"
            );
          }
          protocolSet.add(protocol);
        }
        opts.headers["Sec-WebSocket-Protocol"] = protocols.join(",");
      }
      if (opts.origin) {
        if (opts.protocolVersion < 13) {
          opts.headers["Sec-WebSocket-Origin"] = opts.origin;
        } else {
          opts.headers.Origin = opts.origin;
        }
      }
      if (parsedUrl.username || parsedUrl.password) {
        opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
      }
      if (isIpcUrl) {
        const parts = opts.path.split(":");
        opts.socketPath = parts[0];
        opts.path = parts[1];
      }
      let req;
      if (opts.followRedirects) {
        if (websocket._redirects === 0) {
          websocket._originalIpc = isIpcUrl;
          websocket._originalSecure = isSecure;
          websocket._originalHostOrSocketPath = isIpcUrl ? opts.socketPath : parsedUrl.host;
          const headers = options && options.headers;
          options = { ...options, headers: {} };
          if (headers) {
            for (const [key2, value] of Object.entries(headers)) {
              options.headers[key2.toLowerCase()] = value;
            }
          }
        } else if (websocket.listenerCount("redirect") === 0) {
          const isSameHost = isIpcUrl ? websocket._originalIpc ? opts.socketPath === websocket._originalHostOrSocketPath : false : websocket._originalIpc ? false : parsedUrl.host === websocket._originalHostOrSocketPath;
          if (!isSameHost || websocket._originalSecure && !isSecure) {
            delete opts.headers.authorization;
            delete opts.headers.cookie;
            if (!isSameHost) delete opts.headers.host;
            opts.auth = void 0;
          }
        }
        if (opts.auth && !options.headers.authorization) {
          options.headers.authorization = "Basic " + Buffer.from(opts.auth).toString("base64");
        }
        req = websocket._req = request(opts);
        if (websocket._redirects) {
          websocket.emit("redirect", websocket.url, req);
        }
      } else {
        req = websocket._req = request(opts);
      }
      if (opts.timeout) {
        req.on("timeout", () => {
          abortHandshake(websocket, req, "Opening handshake has timed out");
        });
      }
      req.on("error", (err) => {
        if (req === null || req[kAborted]) return;
        req = websocket._req = null;
        emitErrorAndClose(websocket, err);
      });
      req.on("response", (res) => {
        const location = res.headers.location;
        const statusCode = res.statusCode;
        if (location && opts.followRedirects && statusCode >= 300 && statusCode < 400) {
          if (++websocket._redirects > opts.maxRedirects) {
            abortHandshake(websocket, req, "Maximum redirects exceeded");
            return;
          }
          req.abort();
          let addr;
          try {
            addr = new URL2(location, address);
          } catch (e) {
            const err = new SyntaxError(`Invalid URL: ${location}`);
            emitErrorAndClose(websocket, err);
            return;
          }
          initAsClient(websocket, addr, protocols, options);
        } else if (!websocket.emit("unexpected-response", req, res)) {
          abortHandshake(
            websocket,
            req,
            `Unexpected server response: ${res.statusCode}`
          );
        }
      });
      req.on("upgrade", (res, socket, head) => {
        websocket.emit("upgrade", res);
        if (websocket.readyState !== WebSocket3.CONNECTING) return;
        req = websocket._req = null;
        const upgrade = res.headers.upgrade;
        if (upgrade === void 0 || upgrade.toLowerCase() !== "websocket") {
          abortHandshake(websocket, socket, "Invalid Upgrade header");
          return;
        }
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        if (res.headers["sec-websocket-accept"] !== digest) {
          abortHandshake(websocket, socket, "Invalid Sec-WebSocket-Accept header");
          return;
        }
        const serverProt = res.headers["sec-websocket-protocol"];
        let protError;
        if (serverProt !== void 0) {
          if (!protocolSet.size) {
            protError = "Server sent a subprotocol but none was requested";
          } else if (!protocolSet.has(serverProt)) {
            protError = "Server sent an invalid subprotocol";
          }
        } else if (protocolSet.size) {
          protError = "Server sent no subprotocol";
        }
        if (protError) {
          abortHandshake(websocket, socket, protError);
          return;
        }
        if (serverProt) websocket._protocol = serverProt;
        const secWebSocketExtensions = res.headers["sec-websocket-extensions"];
        if (secWebSocketExtensions !== void 0) {
          if (!perMessageDeflate) {
            const message = "Server sent a Sec-WebSocket-Extensions header but no extension was requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          let extensions;
          try {
            extensions = parse(secWebSocketExtensions);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          const extensionNames = Object.keys(extensions);
          if (extensionNames.length !== 1 || extensionNames[0] !== PerMessageDeflate.extensionName) {
            const message = "Server indicated an extension that was not requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          try {
            perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          websocket._extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
        websocket.setSocket(socket, head, {
          allowSynchronousEvents: opts.allowSynchronousEvents,
          generateMask: opts.generateMask,
          maxPayload: opts.maxPayload,
          skipUTF8Validation: opts.skipUTF8Validation
        });
      });
      if (opts.finishRequest) {
        opts.finishRequest(req, websocket);
      } else {
        req.end();
      }
    }
    function emitErrorAndClose(websocket, err) {
      websocket._readyState = WebSocket3.CLOSING;
      websocket._errorEmitted = true;
      websocket.emit("error", err);
      websocket.emitClose();
    }
    function netConnect(options) {
      options.path = options.socketPath;
      return net.connect(options);
    }
    function tlsConnect(options) {
      options.path = void 0;
      if (!options.servername && options.servername !== "") {
        options.servername = net.isIP(options.host) ? "" : options.host;
      }
      return tls.connect(options);
    }
    function abortHandshake(websocket, stream, message) {
      websocket._readyState = WebSocket3.CLOSING;
      const err = new Error(message);
      Error.captureStackTrace(err, abortHandshake);
      if (stream.setHeader) {
        stream[kAborted] = true;
        stream.abort();
        if (stream.socket && !stream.socket.destroyed) {
          stream.socket.destroy();
        }
        process.nextTick(emitErrorAndClose, websocket, err);
      } else {
        stream.destroy(err);
        stream.once("error", websocket.emit.bind(websocket, "error"));
        stream.once("close", websocket.emitClose.bind(websocket));
      }
    }
    function sendAfterClose(websocket, data, cb) {
      if (data) {
        const length2 = isBlob(data) ? data.size : toBuffer(data).length;
        if (websocket._socket) websocket._sender._bufferedBytes += length2;
        else websocket._bufferedAmount += length2;
      }
      if (cb) {
        const err = new Error(
          `WebSocket is not open: readyState ${websocket.readyState} (${readyStates[websocket.readyState]})`
        );
        process.nextTick(cb, err);
      }
    }
    function receiverOnConclude(code, reason) {
      const websocket = this[kWebSocket];
      websocket._closeFrameReceived = true;
      websocket._closeMessage = reason;
      websocket._closeCode = code;
      if (websocket._socket[kWebSocket] === void 0) return;
      websocket._socket.removeListener("data", socketOnData);
      process.nextTick(resume, websocket._socket);
      if (code === 1005) websocket.close();
      else websocket.close(code, reason);
    }
    function receiverOnDrain() {
      const websocket = this[kWebSocket];
      if (!websocket.isPaused) websocket._socket.resume();
    }
    function receiverOnError(err) {
      const websocket = this[kWebSocket];
      if (websocket._socket[kWebSocket] !== void 0) {
        websocket._socket.removeListener("data", socketOnData);
        process.nextTick(resume, websocket._socket);
        websocket.close(err[kStatusCode]);
      }
      if (!websocket._errorEmitted) {
        websocket._errorEmitted = true;
        websocket.emit("error", err);
      }
    }
    function receiverOnFinish() {
      this[kWebSocket].emitClose();
    }
    function receiverOnMessage(data, isBinary) {
      this[kWebSocket].emit("message", data, isBinary);
    }
    function receiverOnPing(data) {
      const websocket = this[kWebSocket];
      if (websocket._autoPong) websocket.pong(data, !this._isServer, NOOP);
      websocket.emit("ping", data);
    }
    function receiverOnPong(data) {
      this[kWebSocket].emit("pong", data);
    }
    function resume(stream) {
      stream.resume();
    }
    function senderOnError(err) {
      const websocket = this[kWebSocket];
      if (websocket.readyState === WebSocket3.CLOSED) return;
      if (websocket.readyState === WebSocket3.OPEN) {
        websocket._readyState = WebSocket3.CLOSING;
        setCloseTimer(websocket);
      }
      this._socket.end();
      if (!websocket._errorEmitted) {
        websocket._errorEmitted = true;
        websocket.emit("error", err);
      }
    }
    function setCloseTimer(websocket) {
      websocket._closeTimer = setTimeout(
        websocket._socket.destroy.bind(websocket._socket),
        closeTimeout
      );
    }
    function socketOnClose() {
      const websocket = this[kWebSocket];
      this.removeListener("close", socketOnClose);
      this.removeListener("data", socketOnData);
      this.removeListener("end", socketOnEnd);
      websocket._readyState = WebSocket3.CLOSING;
      let chunk;
      if (!this._readableState.endEmitted && !websocket._closeFrameReceived && !websocket._receiver._writableState.errorEmitted && (chunk = websocket._socket.read()) !== null) {
        websocket._receiver.write(chunk);
      }
      websocket._receiver.end();
      this[kWebSocket] = void 0;
      clearTimeout(websocket._closeTimer);
      if (websocket._receiver._writableState.finished || websocket._receiver._writableState.errorEmitted) {
        websocket.emitClose();
      } else {
        websocket._receiver.on("error", receiverOnFinish);
        websocket._receiver.on("finish", receiverOnFinish);
      }
    }
    function socketOnData(chunk) {
      if (!this[kWebSocket]._receiver.write(chunk)) {
        this.pause();
      }
    }
    function socketOnEnd() {
      const websocket = this[kWebSocket];
      websocket._readyState = WebSocket3.CLOSING;
      websocket._receiver.end();
      this.end();
    }
    function socketOnError() {
      const websocket = this[kWebSocket];
      this.removeListener("error", socketOnError);
      this.on("error", NOOP);
      if (websocket) {
        websocket._readyState = WebSocket3.CLOSING;
        this.destroy();
      }
    }
  }
});
var require_stream = __commonJS({
  "node_modules/ws/lib/stream.js"(exports2, module2) {
    "use strict";
    var WebSocket3 = require_websocket();
    var { Duplex } = __require("stream");
    function emitClose(stream) {
      stream.emit("close");
    }
    function duplexOnEnd() {
      if (!this.destroyed && this._writableState.finished) {
        this.destroy();
      }
    }
    function duplexOnError(err) {
      this.removeListener("error", duplexOnError);
      this.destroy();
      if (this.listenerCount("error") === 0) {
        this.emit("error", err);
      }
    }
    function createWebSocketStream2(ws, options) {
      let terminateOnDestroy = true;
      const duplex = new Duplex({
        ...options,
        autoDestroy: false,
        emitClose: false,
        objectMode: false,
        writableObjectMode: false
      });
      ws.on("message", function message(msg, isBinary) {
        const data = !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;
        if (!duplex.push(data)) ws.pause();
      });
      ws.once("error", function error(err) {
        if (duplex.destroyed) return;
        terminateOnDestroy = false;
        duplex.destroy(err);
      });
      ws.once("close", function close() {
        if (duplex.destroyed) return;
        duplex.push(null);
      });
      duplex._destroy = function(err, callback) {
        if (ws.readyState === ws.CLOSED) {
          callback(err);
          process.nextTick(emitClose, duplex);
          return;
        }
        let called = false;
        ws.once("error", function error(err2) {
          called = true;
          callback(err2);
        });
        ws.once("close", function close() {
          if (!called) callback(err);
          process.nextTick(emitClose, duplex);
        });
        if (terminateOnDestroy) ws.terminate();
      };
      duplex._final = function(callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._final(callback);
          });
          return;
        }
        if (ws._socket === null) return;
        if (ws._socket._writableState.finished) {
          callback();
          if (duplex._readableState.endEmitted) duplex.destroy();
        } else {
          ws._socket.once("finish", function finish() {
            callback();
          });
          ws.close();
        }
      };
      duplex._read = function() {
        if (ws.isPaused) ws.resume();
      };
      duplex._write = function(chunk, encoding, callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._write(chunk, encoding, callback);
          });
          return;
        }
        ws.send(chunk, callback);
      };
      duplex.on("end", duplexOnEnd);
      duplex.on("error", duplexOnError);
      return duplex;
    }
    module2.exports = createWebSocketStream2;
  }
});
var require_subprotocol = __commonJS({
  "node_modules/ws/lib/subprotocol.js"(exports2, module2) {
    "use strict";
    var { tokenChars } = require_validation();
    function parse(header) {
      const protocols = /* @__PURE__ */ new Set();
      let start = -1;
      let end = -1;
      let i = 0;
      for (i; i < header.length; i++) {
        const code = header.charCodeAt(i);
        if (end === -1 && tokenChars[code] === 1) {
          if (start === -1) start = i;
        } else if (i !== 0 && (code === 32 || code === 9)) {
          if (end === -1 && start !== -1) end = i;
        } else if (code === 44) {
          if (start === -1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
          if (end === -1) end = i;
          const protocol2 = header.slice(start, end);
          if (protocols.has(protocol2)) {
            throw new SyntaxError(`The "${protocol2}" subprotocol is duplicated`);
          }
          protocols.add(protocol2);
          start = end = -1;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      }
      if (start === -1 || end !== -1) {
        throw new SyntaxError("Unexpected end of input");
      }
      const protocol = header.slice(start, i);
      if (protocols.has(protocol)) {
        throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
      }
      protocols.add(protocol);
      return protocols;
    }
    module2.exports = { parse };
  }
});
var require_websocket_server = __commonJS({
  "node_modules/ws/lib/websocket-server.js"(exports2, module2) {
    "use strict";
    var EventEmitter = __require("events");
    var http = __require("http");
    var { Duplex } = __require("stream");
    var { createHash } = __require("crypto");
    var extension = require_extension();
    var PerMessageDeflate = require_permessage_deflate();
    var subprotocol = require_subprotocol();
    var WebSocket3 = require_websocket();
    var { GUID, kWebSocket } = require_constants();
    var keyRegex = /^[+/0-9A-Za-z]{22}==$/;
    var RUNNING = 0;
    var CLOSING = 1;
    var CLOSED = 2;
    var WebSocketServer2 = class extends EventEmitter {
      /**
       * Create a `WebSocketServer` instance.
       *
       * @param {Object} options Configuration options
       * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {Boolean} [options.autoPong=true] Specifies whether or not to
       *     automatically send a pong in response to a ping
       * @param {Number} [options.backlog=511] The maximum length of the queue of
       *     pending connections
       * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
       *     track clients
       * @param {Function} [options.handleProtocols] A hook to handle protocols
       * @param {String} [options.host] The hostname where to bind the server
       * @param {Number} [options.maxPayload=104857600] The maximum allowed message
       *     size
       * @param {Boolean} [options.noServer=false] Enable no server mode
       * @param {String} [options.path] Accept only connections matching this path
       * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
       *     permessage-deflate
       * @param {Number} [options.port] The port where to bind the server
       * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
       *     server to use
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       * @param {Function} [options.verifyClient] A hook to reject connections
       * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
       *     class to use. It must be the `WebSocket` class or class that extends it
       * @param {Function} [callback] A listener for the `listening` event
       */
      constructor(options, callback) {
        super();
        options = {
          allowSynchronousEvents: true,
          autoPong: true,
          maxPayload: 100 * 1024 * 1024,
          skipUTF8Validation: false,
          perMessageDeflate: false,
          handleProtocols: null,
          clientTracking: true,
          verifyClient: null,
          noServer: false,
          backlog: null,
          // use default (511 as implemented in net.js)
          server: null,
          host: null,
          path: null,
          port: null,
          WebSocket: WebSocket3,
          ...options
        };
        if (options.port == null && !options.server && !options.noServer || options.port != null && (options.server || options.noServer) || options.server && options.noServer) {
          throw new TypeError(
            'One and only one of the "port", "server", or "noServer" options must be specified'
          );
        }
        if (options.port != null) {
          this._server = http.createServer((req, res) => {
            const body = http.STATUS_CODES[426];
            res.writeHead(426, {
              "Content-Length": body.length,
              "Content-Type": "text/plain"
            });
            res.end(body);
          });
          this._server.listen(
            options.port,
            options.host,
            options.backlog,
            callback
          );
        } else if (options.server) {
          this._server = options.server;
        }
        if (this._server) {
          const emitConnection = this.emit.bind(this, "connection");
          this._removeListeners = addListeners(this._server, {
            listening: this.emit.bind(this, "listening"),
            error: this.emit.bind(this, "error"),
            upgrade: (req, socket, head) => {
              this.handleUpgrade(req, socket, head, emitConnection);
            }
          });
        }
        if (options.perMessageDeflate === true) options.perMessageDeflate = {};
        if (options.clientTracking) {
          this.clients = /* @__PURE__ */ new Set();
          this._shouldEmitClose = false;
        }
        this.options = options;
        this._state = RUNNING;
      }
      /**
       * Returns the bound address, the address family name, and port of the server
       * as reported by the operating system if listening on an IP socket.
       * If the server is listening on a pipe or UNIX domain socket, the name is
       * returned as a string.
       *
       * @return {(Object|String|null)} The address of the server
       * @public
       */
      address() {
        if (this.options.noServer) {
          throw new Error('The server is operating in "noServer" mode');
        }
        if (!this._server) return null;
        return this._server.address();
      }
      /**
       * Stop the server from accepting new connections and emit the `'close'` event
       * when all existing connections are closed.
       *
       * @param {Function} [cb] A one-time listener for the `'close'` event
       * @public
       */
      close(cb) {
        if (this._state === CLOSED) {
          if (cb) {
            this.once("close", () => {
              cb(new Error("The server is not running"));
            });
          }
          process.nextTick(emitClose, this);
          return;
        }
        if (cb) this.once("close", cb);
        if (this._state === CLOSING) return;
        this._state = CLOSING;
        if (this.options.noServer || this.options.server) {
          if (this._server) {
            this._removeListeners();
            this._removeListeners = this._server = null;
          }
          if (this.clients) {
            if (!this.clients.size) {
              process.nextTick(emitClose, this);
            } else {
              this._shouldEmitClose = true;
            }
          } else {
            process.nextTick(emitClose, this);
          }
        } else {
          const server2 = this._server;
          this._removeListeners();
          this._removeListeners = this._server = null;
          server2.close(() => {
            emitClose(this);
          });
        }
      }
      /**
       * See if a given request should be handled by this server instance.
       *
       * @param {http.IncomingMessage} req Request object to inspect
       * @return {Boolean} `true` if the request is valid, else `false`
       * @public
       */
      shouldHandle(req) {
        if (this.options.path) {
          const index = req.url.indexOf("?");
          const pathname = index !== -1 ? req.url.slice(0, index) : req.url;
          if (pathname !== this.options.path) return false;
        }
        return true;
      }
      /**
       * Handle a HTTP Upgrade request.
       *
       * @param {http.IncomingMessage} req The request object
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Function} cb Callback
       * @public
       */
      handleUpgrade(req, socket, head, cb) {
        socket.on("error", socketOnError);
        const key = req.headers["sec-websocket-key"];
        const upgrade = req.headers.upgrade;
        const version = +req.headers["sec-websocket-version"];
        if (req.method !== "GET") {
          const message = "Invalid HTTP method";
          abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
          return;
        }
        if (upgrade === void 0 || upgrade.toLowerCase() !== "websocket") {
          const message = "Invalid Upgrade header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (key === void 0 || !keyRegex.test(key)) {
          const message = "Missing or invalid Sec-WebSocket-Key header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (version !== 13 && version !== 8) {
          const message = "Missing or invalid Sec-WebSocket-Version header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message, {
            "Sec-WebSocket-Version": "13, 8"
          });
          return;
        }
        if (!this.shouldHandle(req)) {
          abortHandshake(socket, 400);
          return;
        }
        const secWebSocketProtocol = req.headers["sec-websocket-protocol"];
        let protocols = /* @__PURE__ */ new Set();
        if (secWebSocketProtocol !== void 0) {
          try {
            protocols = subprotocol.parse(secWebSocketProtocol);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Protocol header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        const secWebSocketExtensions = req.headers["sec-websocket-extensions"];
        const extensions = {};
        if (this.options.perMessageDeflate && secWebSocketExtensions !== void 0) {
          const perMessageDeflate = new PerMessageDeflate(
            this.options.perMessageDeflate,
            true,
            this.options.maxPayload
          );
          try {
            const offers = extension.parse(secWebSocketExtensions);
            if (offers[PerMessageDeflate.extensionName]) {
              perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
              extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
            }
          } catch (err) {
            const message = "Invalid or unacceptable Sec-WebSocket-Extensions header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        if (this.options.verifyClient) {
          const info = {
            origin: req.headers[`${version === 8 ? "sec-websocket-origin" : "origin"}`],
            secure: !!(req.socket.authorized || req.socket.encrypted),
            req
          };
          if (this.options.verifyClient.length === 2) {
            this.options.verifyClient(info, (verified, code, message, headers) => {
              if (!verified) {
                return abortHandshake(socket, code || 401, message, headers);
              }
              this.completeUpgrade(
                extensions,
                key,
                protocols,
                req,
                socket,
                head,
                cb
              );
            });
            return;
          }
          if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
        }
        this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
      }
      /**
       * Upgrade the connection to WebSocket.
       *
       * @param {Object} extensions The accepted extensions
       * @param {String} key The value of the `Sec-WebSocket-Key` header
       * @param {Set} protocols The subprotocols
       * @param {http.IncomingMessage} req The request object
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Function} cb Callback
       * @throws {Error} If called more than once with the same socket
       * @private
       */
      completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
        if (!socket.readable || !socket.writable) return socket.destroy();
        if (socket[kWebSocket]) {
          throw new Error(
            "server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration"
          );
        }
        if (this._state > RUNNING) return abortHandshake(socket, 503);
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        const headers = [
          "HTTP/1.1 101 Switching Protocols",
          "Upgrade: websocket",
          "Connection: Upgrade",
          `Sec-WebSocket-Accept: ${digest}`
        ];
        const ws = new this.options.WebSocket(null, void 0, this.options);
        if (protocols.size) {
          const protocol = this.options.handleProtocols ? this.options.handleProtocols(protocols, req) : protocols.values().next().value;
          if (protocol) {
            headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
            ws._protocol = protocol;
          }
        }
        if (extensions[PerMessageDeflate.extensionName]) {
          const params = extensions[PerMessageDeflate.extensionName].params;
          const value = extension.format({
            [PerMessageDeflate.extensionName]: [params]
          });
          headers.push(`Sec-WebSocket-Extensions: ${value}`);
          ws._extensions = extensions;
        }
        this.emit("headers", headers, req);
        socket.write(headers.concat("\r\n").join("\r\n"));
        socket.removeListener("error", socketOnError);
        ws.setSocket(socket, head, {
          allowSynchronousEvents: this.options.allowSynchronousEvents,
          maxPayload: this.options.maxPayload,
          skipUTF8Validation: this.options.skipUTF8Validation
        });
        if (this.clients) {
          this.clients.add(ws);
          ws.on("close", () => {
            this.clients.delete(ws);
            if (this._shouldEmitClose && !this.clients.size) {
              process.nextTick(emitClose, this);
            }
          });
        }
        cb(ws, req);
      }
    };
    module2.exports = WebSocketServer2;
    function addListeners(server2, map) {
      for (const event of Object.keys(map)) server2.on(event, map[event]);
      return function removeListeners() {
        for (const event of Object.keys(map)) {
          server2.removeListener(event, map[event]);
        }
      };
    }
    function emitClose(server2) {
      server2._state = CLOSED;
      server2.emit("close");
    }
    function socketOnError() {
      this.destroy();
    }
    function abortHandshake(socket, code, message, headers) {
      message = message || http.STATUS_CODES[code];
      headers = {
        Connection: "close",
        "Content-Type": "text/html",
        "Content-Length": Buffer.byteLength(message),
        ...headers
      };
      socket.once("finish", socket.destroy);
      socket.end(
        `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r
` + Object.keys(headers).map((h) => `${h}: ${headers[h]}`).join("\r\n") + "\r\n\r\n" + message
      );
    }
    function abortHandshakeOrEmitwsClientError(server2, req, socket, code, message, headers) {
      if (server2.listenerCount("wsClientError")) {
        const err = new Error(message);
        Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);
        server2.emit("wsClientError", err, socket, req);
      } else {
        abortHandshake(socket, code, message, headers);
      }
    }
  }
});
var require_charset = __commonJS({
  "node_modules/compression/node_modules/negotiator/lib/charset.js"(exports2, module2) {
    "use strict";
    module2.exports = preferredCharsets;
    module2.exports.preferredCharsets = preferredCharsets;
    var simpleCharsetRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
    function parseAcceptCharset(accept) {
      var accepts = accept.split(",");
      for (var i = 0, j = 0; i < accepts.length; i++) {
        var charset = parseCharset(accepts[i].trim(), i);
        if (charset) {
          accepts[j++] = charset;
        }
      }
      accepts.length = j;
      return accepts;
    }
    function parseCharset(str, i) {
      var match = simpleCharsetRegExp.exec(str);
      if (!match) return null;
      var charset = match[1];
      var q = 1;
      if (match[2]) {
        var params = match[2].split(";");
        for (var j = 0; j < params.length; j++) {
          var p = params[j].trim().split("=");
          if (p[0] === "q") {
            q = parseFloat(p[1]);
            break;
          }
        }
      }
      return {
        charset,
        q,
        i
      };
    }
    function getCharsetPriority(charset, accepted, index) {
      var priority = { o: -1, q: 0, s: 0 };
      for (var i = 0; i < accepted.length; i++) {
        var spec = specify(charset, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
          priority = spec;
        }
      }
      return priority;
    }
    function specify(charset, spec, index) {
      var s = 0;
      if (spec.charset.toLowerCase() === charset.toLowerCase()) {
        s |= 1;
      } else if (spec.charset !== "*") {
        return null;
      }
      return {
        i: index,
        o: spec.i,
        q: spec.q,
        s
      };
    }
    function preferredCharsets(accept, provided) {
      var accepts = parseAcceptCharset(accept === void 0 ? "*" : accept || "");
      if (!provided) {
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullCharset);
      }
      var priorities = provided.map(function getPriority(type, index) {
        return getCharsetPriority(type, accepts, index);
      });
      return priorities.filter(isQuality).sort(compareSpecs).map(function getCharset(priority) {
        return provided[priorities.indexOf(priority)];
      });
    }
    function compareSpecs(a, b) {
      return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
    }
    function getFullCharset(spec) {
      return spec.charset;
    }
    function isQuality(spec) {
      return spec.q > 0;
    }
  }
});
var require_encoding = __commonJS({
  "node_modules/compression/node_modules/negotiator/lib/encoding.js"(exports2, module2) {
    "use strict";
    module2.exports = preferredEncodings;
    module2.exports.preferredEncodings = preferredEncodings;
    var simpleEncodingRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
    function parseAcceptEncoding(accept) {
      var accepts = accept.split(",");
      var hasIdentity = false;
      var minQuality = 1;
      for (var i = 0, j = 0; i < accepts.length; i++) {
        var encoding = parseEncoding(accepts[i].trim(), i);
        if (encoding) {
          accepts[j++] = encoding;
          hasIdentity = hasIdentity || specify("identity", encoding);
          minQuality = Math.min(minQuality, encoding.q || 1);
        }
      }
      if (!hasIdentity) {
        accepts[j++] = {
          encoding: "identity",
          q: minQuality,
          i
        };
      }
      accepts.length = j;
      return accepts;
    }
    function parseEncoding(str, i) {
      var match = simpleEncodingRegExp.exec(str);
      if (!match) return null;
      var encoding = match[1];
      var q = 1;
      if (match[2]) {
        var params = match[2].split(";");
        for (var j = 0; j < params.length; j++) {
          var p = params[j].trim().split("=");
          if (p[0] === "q") {
            q = parseFloat(p[1]);
            break;
          }
        }
      }
      return {
        encoding,
        q,
        i
      };
    }
    function getEncodingPriority(encoding, accepted, index) {
      var priority = { encoding, o: -1, q: 0, s: 0 };
      for (var i = 0; i < accepted.length; i++) {
        var spec = specify(encoding, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
          priority = spec;
        }
      }
      return priority;
    }
    function specify(encoding, spec, index) {
      var s = 0;
      if (spec.encoding.toLowerCase() === encoding.toLowerCase()) {
        s |= 1;
      } else if (spec.encoding !== "*") {
        return null;
      }
      return {
        encoding,
        i: index,
        o: spec.i,
        q: spec.q,
        s
      };
    }
    ;
    function preferredEncodings(accept, provided, preferred) {
      var accepts = parseAcceptEncoding(accept || "");
      var comparator = preferred ? function comparator2(a, b) {
        if (a.q !== b.q) {
          return b.q - a.q;
        }
        var aPreferred = preferred.indexOf(a.encoding);
        var bPreferred = preferred.indexOf(b.encoding);
        if (aPreferred === -1 && bPreferred === -1) {
          return b.s - a.s || a.o - b.o || a.i - b.i;
        }
        if (aPreferred !== -1 && bPreferred !== -1) {
          return aPreferred - bPreferred;
        }
        return aPreferred === -1 ? 1 : -1;
      } : compareSpecs;
      if (!provided) {
        return accepts.filter(isQuality).sort(comparator).map(getFullEncoding);
      }
      var priorities = provided.map(function getPriority(type, index) {
        return getEncodingPriority(type, accepts, index);
      });
      return priorities.filter(isQuality).sort(comparator).map(function getEncoding(priority) {
        return provided[priorities.indexOf(priority)];
      });
    }
    function compareSpecs(a, b) {
      return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i;
    }
    function getFullEncoding(spec) {
      return spec.encoding;
    }
    function isQuality(spec) {
      return spec.q > 0;
    }
  }
});
var require_language = __commonJS({
  "node_modules/compression/node_modules/negotiator/lib/language.js"(exports2, module2) {
    "use strict";
    module2.exports = preferredLanguages;
    module2.exports.preferredLanguages = preferredLanguages;
    var simpleLanguageRegExp = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
    function parseAcceptLanguage(accept) {
      var accepts = accept.split(",");
      for (var i = 0, j = 0; i < accepts.length; i++) {
        var language = parseLanguage(accepts[i].trim(), i);
        if (language) {
          accepts[j++] = language;
        }
      }
      accepts.length = j;
      return accepts;
    }
    function parseLanguage(str, i) {
      var match = simpleLanguageRegExp.exec(str);
      if (!match) return null;
      var prefix = match[1];
      var suffix = match[2];
      var full = prefix;
      if (suffix) full += "-" + suffix;
      var q = 1;
      if (match[3]) {
        var params = match[3].split(";");
        for (var j = 0; j < params.length; j++) {
          var p = params[j].split("=");
          if (p[0] === "q") q = parseFloat(p[1]);
        }
      }
      return {
        prefix,
        suffix,
        q,
        i,
        full
      };
    }
    function getLanguagePriority(language, accepted, index) {
      var priority = { o: -1, q: 0, s: 0 };
      for (var i = 0; i < accepted.length; i++) {
        var spec = specify(language, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
          priority = spec;
        }
      }
      return priority;
    }
    function specify(language, spec, index) {
      var p = parseLanguage(language);
      if (!p) return null;
      var s = 0;
      if (spec.full.toLowerCase() === p.full.toLowerCase()) {
        s |= 4;
      } else if (spec.prefix.toLowerCase() === p.full.toLowerCase()) {
        s |= 2;
      } else if (spec.full.toLowerCase() === p.prefix.toLowerCase()) {
        s |= 1;
      } else if (spec.full !== "*") {
        return null;
      }
      return {
        i: index,
        o: spec.i,
        q: spec.q,
        s
      };
    }
    ;
    function preferredLanguages(accept, provided) {
      var accepts = parseAcceptLanguage(accept === void 0 ? "*" : accept || "");
      if (!provided) {
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullLanguage);
      }
      var priorities = provided.map(function getPriority(type, index) {
        return getLanguagePriority(type, accepts, index);
      });
      return priorities.filter(isQuality).sort(compareSpecs).map(function getLanguage(priority) {
        return provided[priorities.indexOf(priority)];
      });
    }
    function compareSpecs(a, b) {
      return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
    }
    function getFullLanguage(spec) {
      return spec.full;
    }
    function isQuality(spec) {
      return spec.q > 0;
    }
  }
});
var require_mediaType = __commonJS({
  "node_modules/compression/node_modules/negotiator/lib/mediaType.js"(exports2, module2) {
    "use strict";
    module2.exports = preferredMediaTypes;
    module2.exports.preferredMediaTypes = preferredMediaTypes;
    var simpleMediaTypeRegExp = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
    function parseAccept(accept) {
      var accepts = splitMediaTypes(accept);
      for (var i = 0, j = 0; i < accepts.length; i++) {
        var mediaType = parseMediaType(accepts[i].trim(), i);
        if (mediaType) {
          accepts[j++] = mediaType;
        }
      }
      accepts.length = j;
      return accepts;
    }
    function parseMediaType(str, i) {
      var match = simpleMediaTypeRegExp.exec(str);
      if (!match) return null;
      var params = /* @__PURE__ */ Object.create(null);
      var q = 1;
      var subtype = match[2];
      var type = match[1];
      if (match[3]) {
        var kvps = splitParameters(match[3]).map(splitKeyValuePair);
        for (var j = 0; j < kvps.length; j++) {
          var pair = kvps[j];
          var key = pair[0].toLowerCase();
          var val = pair[1];
          var value = val && val[0] === '"' && val[val.length - 1] === '"' ? val.slice(1, -1) : val;
          if (key === "q") {
            q = parseFloat(value);
            break;
          }
          params[key] = value;
        }
      }
      return {
        type,
        subtype,
        params,
        q,
        i
      };
    }
    function getMediaTypePriority(type, accepted, index) {
      var priority = { o: -1, q: 0, s: 0 };
      for (var i = 0; i < accepted.length; i++) {
        var spec = specify(type, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
          priority = spec;
        }
      }
      return priority;
    }
    function specify(type, spec, index) {
      var p = parseMediaType(type);
      var s = 0;
      if (!p) {
        return null;
      }
      if (spec.type.toLowerCase() == p.type.toLowerCase()) {
        s |= 4;
      } else if (spec.type != "*") {
        return null;
      }
      if (spec.subtype.toLowerCase() == p.subtype.toLowerCase()) {
        s |= 2;
      } else if (spec.subtype != "*") {
        return null;
      }
      var keys = Object.keys(spec.params);
      if (keys.length > 0) {
        if (keys.every(function(k) {
          return spec.params[k] == "*" || (spec.params[k] || "").toLowerCase() == (p.params[k] || "").toLowerCase();
        })) {
          s |= 1;
        } else {
          return null;
        }
      }
      return {
        i: index,
        o: spec.i,
        q: spec.q,
        s
      };
    }
    function preferredMediaTypes(accept, provided) {
      var accepts = parseAccept(accept === void 0 ? "*/*" : accept || "");
      if (!provided) {
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullType);
      }
      var priorities = provided.map(function getPriority(type, index) {
        return getMediaTypePriority(type, accepts, index);
      });
      return priorities.filter(isQuality).sort(compareSpecs).map(function getType(priority) {
        return provided[priorities.indexOf(priority)];
      });
    }
    function compareSpecs(a, b) {
      return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
    }
    function getFullType(spec) {
      return spec.type + "/" + spec.subtype;
    }
    function isQuality(spec) {
      return spec.q > 0;
    }
    function quoteCount(string) {
      var count = 0;
      var index = 0;
      while ((index = string.indexOf('"', index)) !== -1) {
        count++;
        index++;
      }
      return count;
    }
    function splitKeyValuePair(str) {
      var index = str.indexOf("=");
      var key;
      var val;
      if (index === -1) {
        key = str;
      } else {
        key = str.slice(0, index);
        val = str.slice(index + 1);
      }
      return [key, val];
    }
    function splitMediaTypes(accept) {
      var accepts = accept.split(",");
      for (var i = 1, j = 0; i < accepts.length; i++) {
        if (quoteCount(accepts[j]) % 2 == 0) {
          accepts[++j] = accepts[i];
        } else {
          accepts[j] += "," + accepts[i];
        }
      }
      accepts.length = j + 1;
      return accepts;
    }
    function splitParameters(str) {
      var parameters = str.split(";");
      for (var i = 1, j = 0; i < parameters.length; i++) {
        if (quoteCount(parameters[j]) % 2 == 0) {
          parameters[++j] = parameters[i];
        } else {
          parameters[j] += ";" + parameters[i];
        }
      }
      parameters.length = j + 1;
      for (var i = 0; i < parameters.length; i++) {
        parameters[i] = parameters[i].trim();
      }
      return parameters;
    }
  }
});
var require_negotiator = __commonJS({
  "node_modules/compression/node_modules/negotiator/index.js"(exports2, module2) {
    "use strict";
    var preferredCharsets = require_charset();
    var preferredEncodings = require_encoding();
    var preferredLanguages = require_language();
    var preferredMediaTypes = require_mediaType();
    module2.exports = Negotiator;
    module2.exports.Negotiator = Negotiator;
    function Negotiator(request) {
      if (!(this instanceof Negotiator)) {
        return new Negotiator(request);
      }
      this.request = request;
    }
    Negotiator.prototype.charset = function charset(available) {
      var set = this.charsets(available);
      return set && set[0];
    };
    Negotiator.prototype.charsets = function charsets(available) {
      return preferredCharsets(this.request.headers["accept-charset"], available);
    };
    Negotiator.prototype.encoding = function encoding(available, preferred) {
      var set = this.encodings(available, preferred);
      return set && set[0];
    };
    Negotiator.prototype.encodings = function encodings(available, preferred) {
      return preferredEncodings(this.request.headers["accept-encoding"], available, preferred);
    };
    Negotiator.prototype.language = function language(available) {
      var set = this.languages(available);
      return set && set[0];
    };
    Negotiator.prototype.languages = function languages(available) {
      return preferredLanguages(this.request.headers["accept-language"], available);
    };
    Negotiator.prototype.mediaType = function mediaType(available) {
      var set = this.mediaTypes(available);
      return set && set[0];
    };
    Negotiator.prototype.mediaTypes = function mediaTypes(available) {
      return preferredMediaTypes(this.request.headers.accept, available);
    };
    Negotiator.prototype.preferredCharset = Negotiator.prototype.charset;
    Negotiator.prototype.preferredCharsets = Negotiator.prototype.charsets;
    Negotiator.prototype.preferredEncoding = Negotiator.prototype.encoding;
    Negotiator.prototype.preferredEncodings = Negotiator.prototype.encodings;
    Negotiator.prototype.preferredLanguage = Negotiator.prototype.language;
    Negotiator.prototype.preferredLanguages = Negotiator.prototype.languages;
    Negotiator.prototype.preferredMediaType = Negotiator.prototype.mediaType;
    Negotiator.prototype.preferredMediaTypes = Negotiator.prototype.mediaTypes;
  }
});
var require_safe_buffer = __commonJS({
  "node_modules/safe-buffer/index.js"(exports2, module2) {
    var buffer = __require("buffer");
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module2.exports = buffer;
    } else {
      copyProps(buffer, exports2);
      exports2.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length2) {
      return Buffer2(arg, encodingOrOffset, length2);
    }
    SafeBuffer.prototype = Object.create(Buffer2.prototype);
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length2) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length2);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});
var require_bytes = __commonJS({
  "node_modules/bytes/index.js"(exports2, module2) {
    "use strict";
    module2.exports = bytes;
    module2.exports.format = format;
    module2.exports.parse = parse;
    var formatThousandsRegExp = /\B(?=(\d{3})+(?!\d))/g;
    var formatDecimalsRegExp = /(?:\.0*|(\.[^0]+)0+)$/;
    var map = {
      b: 1,
      kb: 1 << 10,
      mb: 1 << 20,
      gb: 1 << 30,
      tb: Math.pow(1024, 4),
      pb: Math.pow(1024, 5)
    };
    var parseRegExp = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;
    function bytes(value, options) {
      if (typeof value === "string") {
        return parse(value);
      }
      if (typeof value === "number") {
        return format(value, options);
      }
      return null;
    }
    function format(value, options) {
      if (!Number.isFinite(value)) {
        return null;
      }
      var mag = Math.abs(value);
      var thousandsSeparator = options && options.thousandsSeparator || "";
      var unitSeparator = options && options.unitSeparator || "";
      var decimalPlaces = options && options.decimalPlaces !== void 0 ? options.decimalPlaces : 2;
      var fixedDecimals = Boolean(options && options.fixedDecimals);
      var unit = options && options.unit || "";
      if (!unit || !map[unit.toLowerCase()]) {
        if (mag >= map.pb) {
          unit = "PB";
        } else if (mag >= map.tb) {
          unit = "TB";
        } else if (mag >= map.gb) {
          unit = "GB";
        } else if (mag >= map.mb) {
          unit = "MB";
        } else if (mag >= map.kb) {
          unit = "KB";
        } else {
          unit = "B";
        }
      }
      var val = value / map[unit.toLowerCase()];
      var str = val.toFixed(decimalPlaces);
      if (!fixedDecimals) {
        str = str.replace(formatDecimalsRegExp, "$1");
      }
      if (thousandsSeparator) {
        str = str.split(".").map(function(s, i) {
          return i === 0 ? s.replace(formatThousandsRegExp, thousandsSeparator) : s;
        }).join(".");
      }
      return str + unitSeparator + unit;
    }
    function parse(val) {
      if (typeof val === "number" && !isNaN(val)) {
        return val;
      }
      if (typeof val !== "string") {
        return null;
      }
      var results = parseRegExp.exec(val);
      var floatValue;
      var unit = "b";
      if (!results) {
        floatValue = parseInt(val, 10);
        unit = "b";
      } else {
        floatValue = parseFloat(results[1]);
        unit = results[4].toLowerCase();
      }
      if (isNaN(floatValue)) {
        return null;
      }
      return Math.floor(map[unit] * floatValue);
    }
  }
});
var require_compressible = __commonJS({
  "node_modules/compressible/index.js"(exports2, module2) {
    "use strict";
    var db = __require("mime-db");
    var COMPRESSIBLE_TYPE_REGEXP = /^text\/|\+(?:json|text|xml)$/i;
    var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
    module2.exports = compressible;
    function compressible(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var mime = match && match[1].toLowerCase();
      var data = db[mime];
      if (data && data.compressible !== void 0) {
        return data.compressible;
      }
      return COMPRESSIBLE_TYPE_REGEXP.test(mime) || void 0;
    }
  }
});
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports2, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isNaN(val) === false) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      if (ms >= d) {
        return Math.round(ms / d) + "d";
      }
      if (ms >= h) {
        return Math.round(ms / h) + "h";
      }
      if (ms >= m) {
        return Math.round(ms / m) + "m";
      }
      if (ms >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
    }
    function plural(ms, n, name) {
      if (ms < n) {
        return;
      }
      if (ms < n * 1.5) {
        return Math.floor(ms / n) + " " + name;
      }
      return Math.ceil(ms / n) + " " + name + "s";
    }
  }
});
var require_debug = __commonJS({
  "node_modules/debug/src/debug.js"(exports2, module2) {
    exports2 = module2.exports = createDebug.debug = createDebug["default"] = createDebug;
    exports2.coerce = coerce;
    exports2.disable = disable;
    exports2.enable = enable;
    exports2.enabled = enabled;
    exports2.humanize = require_ms();
    exports2.names = [];
    exports2.skips = [];
    exports2.formatters = {};
    var prevTime;
    function selectColor(namespace) {
      var hash = 0, i;
      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return exports2.colors[Math.abs(hash) % exports2.colors.length];
    }
    function createDebug(namespace) {
      function debug() {
        if (!debug.enabled) return;
        var self = debug;
        var curr = +/* @__PURE__ */ new Date();
        var ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        args[0] = exports2.coerce(args[0]);
        if ("string" !== typeof args[0]) {
          args.unshift("%O");
        }
        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
          if (match === "%%") return match;
          index++;
          var formatter = exports2.formatters[format];
          if ("function" === typeof formatter) {
            var val = args[index];
            match = formatter.call(self, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        exports2.formatArgs.call(self, args);
        var logFn = debug.log || exports2.log || console.log.bind(console);
        logFn.apply(self, args);
      }
      debug.namespace = namespace;
      debug.enabled = exports2.enabled(namespace);
      debug.useColors = exports2.useColors();
      debug.color = selectColor(namespace);
      if ("function" === typeof exports2.init) {
        exports2.init(debug);
      }
      return debug;
    }
    function enable(namespaces) {
      exports2.save(namespaces);
      exports2.names = [];
      exports2.skips = [];
      var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      var len = split.length;
      for (var i = 0; i < len; i++) {
        if (!split[i]) continue;
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          exports2.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          exports2.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
    }
    function disable() {
      exports2.enable("");
    }
    function enabled(name) {
      var i, len;
      for (i = 0, len = exports2.skips.length; i < len; i++) {
        if (exports2.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = exports2.names.length; i < len; i++) {
        if (exports2.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function coerce(val) {
      if (val instanceof Error) return val.stack || val.message;
      return val;
    }
  }
});
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports2, module2) {
    exports2 = module2.exports = require_debug();
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
    exports2.colors = [
      "lightseagreen",
      "forestgreen",
      "goldenrod",
      "dodgerblue",
      "darkorchid",
      "crimson"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
        return true;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    exports2.formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (err) {
        return "[UnexpectedJSONParseError]: " + err.message;
      }
    };
    function formatArgs(args) {
      var useColors2 = this.useColors;
      args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports2.humanize(this.diff);
      if (!useColors2) return;
      var c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function(match) {
        if ("%%" === match) return;
        index++;
        if ("%c" === match) {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    function log() {
      return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    function save(namespaces) {
      try {
        if (null == namespaces) {
          exports2.storage.removeItem("debug");
        } else {
          exports2.storage.debug = namespaces;
        }
      } catch (e) {
      }
    }
    function load() {
      var r;
      try {
        r = exports2.storage.debug;
      } catch (e) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    exports2.enable(load());
    function localstorage() {
      try {
        return window.localStorage;
      } catch (e) {
      }
    }
  }
});
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports2, module2) {
    var tty = __require("tty");
    var util = __require("util");
    exports2 = module2.exports = require_debug();
    exports2.init = init;
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.colors = [6, 2, 3, 4, 5, 1];
    exports2.inspectOpts = Object.keys(process.env).filter(function(key) {
      return /^debug_/i.test(key);
    }).reduce(function(obj, key) {
      var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
        return k.toUpperCase();
      });
      var val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
      else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
      else if (val === "null") val = null;
      else val = Number(val);
      obj[prop] = val;
      return obj;
    }, {});
    var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
    if (1 !== fd && 2 !== fd) {
      util.deprecate(function() {
      }, "except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();
    }
    var stream = 1 === fd ? process.stdout : 2 === fd ? process.stderr : createWritableStdioStream(fd);
    function useColors() {
      return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(fd);
    }
    exports2.formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map(function(str) {
        return str.trim();
      }).join(" ");
    };
    exports2.formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
    function formatArgs(args) {
      var name = this.namespace;
      var useColors2 = this.useColors;
      if (useColors2) {
        var c = this.color;
        var prefix = "  \x1B[3" + c + ";1m" + name + " \x1B[0m";
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push("\x1B[3" + c + "m+" + exports2.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = (/* @__PURE__ */ new Date()).toUTCString() + " " + name + " " + args[0];
      }
    }
    function log() {
      return stream.write(util.format.apply(util, arguments) + "\n");
    }
    function save(namespaces) {
      if (null == namespaces) {
        delete process.env.DEBUG;
      } else {
        process.env.DEBUG = namespaces;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function createWritableStdioStream(fd2) {
      var stream2;
      var tty_wrap = process.binding("tty_wrap");
      switch (tty_wrap.guessHandleType(fd2)) {
        case "TTY":
          stream2 = new tty.WriteStream(fd2);
          stream2._type = "tty";
          if (stream2._handle && stream2._handle.unref) {
            stream2._handle.unref();
          }
          break;
        case "FILE":
          var fs22 = __require("fs");
          stream2 = new fs22.SyncWriteStream(fd2, { autoClose: false });
          stream2._type = "fs";
          break;
        case "PIPE":
        case "TCP":
          var net = __require("net");
          stream2 = new net.Socket({
            fd: fd2,
            readable: false,
            writable: true
          });
          stream2.readable = false;
          stream2.read = null;
          stream2._type = "pipe";
          if (stream2._handle && stream2._handle.unref) {
            stream2._handle.unref();
          }
          break;
        default:
          throw new Error("Implement me. Unknown stream file type!");
      }
      stream2.fd = fd2;
      stream2._isStdio = true;
      return stream2;
    }
    function init(debug) {
      debug.inspectOpts = {};
      var keys = Object.keys(exports2.inspectOpts);
      for (var i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
      }
    }
    exports2.enable(load());
  }
});
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports2, module2) {
    if (typeof process !== "undefined" && process.type === "renderer") {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});
var require_on_headers = __commonJS({
  "node_modules/on-headers/index.js"(exports2, module2) {
    "use strict";
    module2.exports = onHeaders;
    var http = __require("http");
    var isAppendHeaderSupported = typeof http.ServerResponse.prototype.appendHeader === "function";
    var set1dArray = isAppendHeaderSupported ? set1dArrayWithAppend : set1dArrayWithSet;
    function createWriteHead(prevWriteHead, listener) {
      var fired = false;
      return function writeHead(statusCode) {
        var args = setWriteHeadHeaders.apply(this, arguments);
        if (!fired) {
          fired = true;
          listener.call(this);
          if (typeof args[0] === "number" && this.statusCode !== args[0]) {
            args[0] = this.statusCode;
            args.length = 1;
          }
        }
        return prevWriteHead.apply(this, args);
      };
    }
    function onHeaders(res, listener) {
      if (!res) {
        throw new TypeError("argument res is required");
      }
      if (typeof listener !== "function") {
        throw new TypeError("argument listener must be a function");
      }
      res.writeHead = createWriteHead(res.writeHead, listener);
    }
    function setHeadersFromArray(res, headers) {
      if (headers.length && Array.isArray(headers[0])) {
        set2dArray(res, headers);
      } else {
        if (headers.length % 2 !== 0) {
          throw new TypeError("headers array is malformed");
        }
        set1dArray(res, headers);
      }
    }
    function setHeadersFromObject(res, headers) {
      var keys = Object.keys(headers);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (k) res.setHeader(k, headers[k]);
      }
    }
    function setWriteHeadHeaders(statusCode) {
      var length2 = arguments.length;
      var headerIndex = length2 > 1 && typeof arguments[1] === "string" ? 2 : 1;
      var headers = length2 >= headerIndex + 1 ? arguments[headerIndex] : void 0;
      this.statusCode = statusCode;
      if (Array.isArray(headers)) {
        setHeadersFromArray(this, headers);
      } else if (headers) {
        setHeadersFromObject(this, headers);
      }
      var args = new Array(Math.min(length2, headerIndex));
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      return args;
    }
    function set2dArray(res, headers) {
      var key;
      for (var i = 0; i < headers.length; i++) {
        key = headers[i][0];
        if (key) {
          res.setHeader(key, headers[i][1]);
        }
      }
    }
    function set1dArrayWithAppend(res, headers) {
      for (var i = 0; i < headers.length; i += 2) {
        res.removeHeader(headers[i]);
      }
      var key;
      for (var j = 0; j < headers.length; j += 2) {
        key = headers[j];
        if (key) {
          res.appendHeader(key, headers[j + 1]);
        }
      }
    }
    function set1dArrayWithSet(res, headers) {
      var key;
      for (var i = 0; i < headers.length; i += 2) {
        key = headers[i];
        if (key) {
          res.setHeader(key, headers[i + 1]);
        }
      }
    }
  }
});
var require_vary = __commonJS({
  "node_modules/vary/index.js"(exports2, module2) {
    "use strict";
    module2.exports = vary;
    module2.exports.append = append;
    var FIELD_NAME_REGEXP = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
    function append(header, field) {
      if (typeof header !== "string") {
        throw new TypeError("header argument is required");
      }
      if (!field) {
        throw new TypeError("field argument is required");
      }
      var fields = !Array.isArray(field) ? parse(String(field)) : field;
      for (var j = 0; j < fields.length; j++) {
        if (!FIELD_NAME_REGEXP.test(fields[j])) {
          throw new TypeError("field argument contains an invalid header name");
        }
      }
      if (header === "*") {
        return header;
      }
      var val = header;
      var vals = parse(header.toLowerCase());
      if (fields.indexOf("*") !== -1 || vals.indexOf("*") !== -1) {
        return "*";
      }
      for (var i = 0; i < fields.length; i++) {
        var fld = fields[i].toLowerCase();
        if (vals.indexOf(fld) === -1) {
          vals.push(fld);
          val = val ? val + ", " + fields[i] : fields[i];
        }
      }
      return val;
    }
    function parse(header) {
      var end = 0;
      var list = [];
      var start = 0;
      for (var i = 0, len = header.length; i < len; i++) {
        switch (header.charCodeAt(i)) {
          case 32:
            if (start === end) {
              start = end = i + 1;
            }
            break;
          case 44:
            list.push(header.substring(start, end));
            start = end = i + 1;
            break;
          default:
            end = i + 1;
            break;
        }
      }
      list.push(header.substring(start, end));
      return list;
    }
    function vary(res, field) {
      if (!res || !res.getHeader || !res.setHeader) {
        throw new TypeError("res argument is required");
      }
      var val = res.getHeader("Vary") || "";
      var header = Array.isArray(val) ? val.join(", ") : String(val);
      if (val = append(header, field)) {
        res.setHeader("Vary", val);
      }
    }
  }
});
var require_compression = __commonJS({
  "node_modules/compression/index.js"(exports2, module2) {
    "use strict";
    var Negotiator = require_negotiator();
    var Buffer2 = require_safe_buffer().Buffer;
    var bytes = require_bytes();
    var compressible = require_compressible();
    var debug = require_src()("compression");
    var onHeaders = require_on_headers();
    var vary = require_vary();
    var zlib2 = __require("zlib");
    module2.exports = compression;
    module2.exports.filter = shouldCompress;
    var hasBrotliSupport = "createBrotliCompress" in zlib2;
    var cacheControlNoTransformRegExp = /(?:^|,)\s*?no-transform\s*?(?:,|$)/;
    var SUPPORTED_ENCODING = hasBrotliSupport ? ["br", "gzip", "deflate", "identity"] : ["gzip", "deflate", "identity"];
    var PREFERRED_ENCODING = hasBrotliSupport ? ["br", "gzip"] : ["gzip"];
    var encodingSupported = ["gzip", "deflate", "identity", "br"];
    function compression(options) {
      var opts = options || {};
      var optsBrotli = {};
      if (hasBrotliSupport) {
        Object.assign(optsBrotli, opts.brotli);
        var brotliParams = {};
        brotliParams[zlib2.constants.BROTLI_PARAM_QUALITY] = 4;
        optsBrotli.params = Object.assign(brotliParams, optsBrotli.params);
      }
      var filter = opts.filter || shouldCompress;
      var threshold = bytes.parse(opts.threshold);
      var enforceEncoding = opts.enforceEncoding || "identity";
      if (threshold == null) {
        threshold = 1024;
      }
      return function compression2(req, res, next) {
        var ended = false;
        var length2;
        var listeners = [];
        var stream;
        var _end = res.end;
        var _on = res.on;
        var _write = res.write;
        res.flush = function flush() {
          if (stream) {
            stream.flush();
          }
        };
        res.write = function write(chunk, encoding) {
          if (ended) {
            return false;
          }
          if (!headersSent(res)) {
            this.writeHead(this.statusCode);
          }
          return stream ? stream.write(toBuffer(chunk, encoding)) : _write.call(this, chunk, encoding);
        };
        res.end = function end(chunk, encoding) {
          if (ended) {
            return false;
          }
          if (!headersSent(res)) {
            if (!this.getHeader("Content-Length")) {
              length2 = chunkLength(chunk, encoding);
            }
            this.writeHead(this.statusCode);
          }
          if (!stream) {
            return _end.call(this, chunk, encoding);
          }
          ended = true;
          return chunk ? stream.end(toBuffer(chunk, encoding)) : stream.end();
        };
        res.on = function on(type, listener) {
          if (!listeners || type !== "drain") {
            return _on.call(this, type, listener);
          }
          if (stream) {
            return stream.on(type, listener);
          }
          listeners.push([type, listener]);
          return this;
        };
        function nocompress(msg) {
          debug("no compression: %s", msg);
          addListeners(res, _on, listeners);
          listeners = null;
        }
        onHeaders(res, function onResponseHeaders() {
          if (!filter(req, res)) {
            nocompress("filtered");
            return;
          }
          if (!shouldTransform(req, res)) {
            nocompress("no transform");
            return;
          }
          vary(res, "Accept-Encoding");
          if (Number(res.getHeader("Content-Length")) < threshold || length2 < threshold) {
            nocompress("size below threshold");
            return;
          }
          var encoding = res.getHeader("Content-Encoding") || "identity";
          if (encoding !== "identity") {
            nocompress("already encoded");
            return;
          }
          if (req.method === "HEAD") {
            nocompress("HEAD request");
            return;
          }
          var negotiator = new Negotiator(req);
          var method = negotiator.encoding(SUPPORTED_ENCODING, PREFERRED_ENCODING);
          if (!req.headers["accept-encoding"] && encodingSupported.indexOf(enforceEncoding) !== -1) {
            method = enforceEncoding;
          }
          if (!method || method === "identity") {
            nocompress("not acceptable");
            return;
          }
          debug("%s compression", method);
          stream = method === "gzip" ? zlib2.createGzip(opts) : method === "br" ? zlib2.createBrotliCompress(optsBrotli) : zlib2.createDeflate(opts);
          addListeners(stream, stream.on, listeners);
          res.setHeader("Content-Encoding", method);
          res.removeHeader("Content-Length");
          stream.on("data", function onStreamData(chunk) {
            if (_write.call(res, chunk) === false) {
              stream.pause();
            }
          });
          stream.on("end", function onStreamEnd() {
            _end.call(res);
          });
          _on.call(res, "drain", function onResponseDrain() {
            stream.resume();
          });
        });
        next();
      };
    }
    function addListeners(stream, on, listeners) {
      for (var i = 0; i < listeners.length; i++) {
        on.apply(stream, listeners[i]);
      }
    }
    function chunkLength(chunk, encoding) {
      if (!chunk) {
        return 0;
      }
      return Buffer2.isBuffer(chunk) ? chunk.length : Buffer2.byteLength(chunk, encoding);
    }
    function shouldCompress(req, res) {
      var type = res.getHeader("Content-Type");
      if (type === void 0 || !compressible(type)) {
        debug("%s not compressible", type);
        return false;
      }
      return true;
    }
    function shouldTransform(req, res) {
      var cacheControl = res.getHeader("Cache-Control");
      return !cacheControl || !cacheControlNoTransformRegExp.test(cacheControl);
    }
    function toBuffer(chunk, encoding) {
      return Buffer2.isBuffer(chunk) ? chunk : Buffer2.from(chunk, encoding);
    }
    function headersSent(res) {
      return typeof res.headersSent !== "boolean" ? Boolean(res._header) : res.headersSent;
    }
  }
});
var require_cookie = __commonJS({
  "node_modules/cookie-parser/node_modules/cookie/index.js"(exports2) {
    "use strict";
    exports2.parse = parse;
    exports2.serialize = serialize;
    var __toString = Object.prototype.toString;
    var __hasOwnProperty = Object.prototype.hasOwnProperty;
    var cookieNameRegExp = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
    var cookieValueRegExp = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    function parse(str, opt) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var len = str.length;
      if (len < 2) return obj;
      var dec = opt && opt.decode || decode;
      var index = 0;
      var eqIdx = 0;
      var endIdx = 0;
      do {
        eqIdx = str.indexOf("=", index);
        if (eqIdx === -1) break;
        endIdx = str.indexOf(";", index);
        if (endIdx === -1) {
          endIdx = len;
        } else if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var keyStartIdx = startIndex(str, index, eqIdx);
        var keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        var key = str.slice(keyStartIdx, keyEndIdx);
        if (!__hasOwnProperty.call(obj, key)) {
          var valStartIdx = startIndex(str, eqIdx + 1, endIdx);
          var valEndIdx = endIndex(str, endIdx, valStartIdx);
          if (str.charCodeAt(valStartIdx) === 34 && str.charCodeAt(valEndIdx - 1) === 34) {
            valStartIdx++;
            valEndIdx--;
          }
          var val = str.slice(valStartIdx, valEndIdx);
          obj[key] = tryDecode(val, dec);
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function startIndex(str, index, max) {
      do {
        var code = str.charCodeAt(index);
        if (code !== 32 && code !== 9) return index;
      } while (++index < max);
      return max;
    }
    function endIndex(str, index, min) {
      while (index > min) {
        var code = str.charCodeAt(--index);
        if (code !== 32 && code !== 9) return index + 1;
      }
      return min;
    }
    function serialize(name, val, opt) {
      var enc = opt && opt.encode || encodeURIComponent;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!cookieNameRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (!opt) return str;
      if (null != opt.maxAge) {
        var maxAge = Math.floor(opt.maxAge);
        if (!isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + maxAge;
      }
      if (opt.domain) {
        if (!domainValueRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!pathValueRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.partitioned) {
        str += "; Partitioned";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});
var require_cookie_signature = __commonJS({
  "node_modules/cookie-signature/index.js"(exports2) {
    var crypto = __require("crypto");
    exports2.sign = function(val, secret) {
      if ("string" != typeof val) throw new TypeError("Cookie value must be provided as a string.");
      if ("string" != typeof secret) throw new TypeError("Secret string must be provided.");
      return val + "." + crypto.createHmac("sha256", secret).update(val).digest("base64").replace(/\=+$/, "");
    };
    exports2.unsign = function(val, secret) {
      if ("string" != typeof val) throw new TypeError("Signed cookie string must be provided.");
      if ("string" != typeof secret) throw new TypeError("Secret string must be provided.");
      var str = val.slice(0, val.lastIndexOf(".")), mac = exports2.sign(str, secret);
      return sha1(mac) == sha1(val) ? str : false;
    };
    function sha1(str) {
      return crypto.createHash("sha1").update(str).digest("hex");
    }
  }
});
var require_cookie_parser = __commonJS({
  "node_modules/cookie-parser/index.js"(exports2, module2) {
    "use strict";
    var cookie = require_cookie();
    var signature = require_cookie_signature();
    module2.exports = cookieParser;
    module2.exports.JSONCookie = JSONCookie;
    module2.exports.JSONCookies = JSONCookies;
    module2.exports.signedCookie = signedCookie;
    module2.exports.signedCookies = signedCookies;
    function cookieParser(secret, options) {
      var secrets = !secret || Array.isArray(secret) ? secret || [] : [secret];
      return function cookieParser2(req, res, next) {
        if (req.cookies) {
          return next();
        }
        var cookies = req.headers.cookie;
        req.secret = secrets[0];
        req.cookies = /* @__PURE__ */ Object.create(null);
        req.signedCookies = /* @__PURE__ */ Object.create(null);
        if (!cookies) {
          return next();
        }
        req.cookies = cookie.parse(cookies, options);
        if (secrets.length !== 0) {
          req.signedCookies = signedCookies(req.cookies, secrets);
          req.signedCookies = JSONCookies(req.signedCookies);
        }
        req.cookies = JSONCookies(req.cookies);
        next();
      };
    }
    function JSONCookie(str) {
      if (typeof str !== "string" || str.substr(0, 2) !== "j:") {
        return void 0;
      }
      try {
        return JSON.parse(str.slice(2));
      } catch (err) {
        return void 0;
      }
    }
    function JSONCookies(obj) {
      var cookies = Object.keys(obj);
      var key;
      var val;
      for (var i = 0; i < cookies.length; i++) {
        key = cookies[i];
        val = JSONCookie(obj[key]);
        if (val) {
          obj[key] = val;
        }
      }
      return obj;
    }
    function signedCookie(str, secret) {
      if (typeof str !== "string") {
        return void 0;
      }
      if (str.substr(0, 2) !== "s:") {
        return str;
      }
      var secrets = !secret || Array.isArray(secret) ? secret || [] : [secret];
      for (var i = 0; i < secrets.length; i++) {
        var val = signature.unsign(str.slice(2), secrets[i]);
        if (val !== false) {
          return val;
        }
      }
      return false;
    }
    function signedCookies(obj, secret) {
      var cookies = Object.keys(obj);
      var dec;
      var key;
      var ret = /* @__PURE__ */ Object.create(null);
      var val;
      for (var i = 0; i < cookies.length; i++) {
        key = cookies[i];
        val = obj[key];
        dec = signedCookie(val, secret);
        if (val !== dec) {
          ret[key] = dec;
          delete obj[key];
        }
      }
      return ret;
    }
  }
});
var Accessor = class {
  _source;
  _entries;
  constructor(source) {
    this._source = source;
  }
  /**
   * Iterates via Object.entries(...) on the internal _args property
   * 
   * @generator
   * @yields {[string, unknown]}
   */
  *[Symbol.iterator]() {
    for (const entry of this._entries) {
      yield entry;
    }
  }
  has(accessor) {
    let value = this._source;
    try {
      for (const access of accessor) {
        if (access in value === false) return false;
        value = value[access];
      }
      return value instanceof Object ? false : true;
    } catch (error) {
      return false;
    }
  }
  intersect(intersect, source) {
    let result;
    for (const [key, query] of Object.entries(intersect)) {
      const value = source[key];
      if (value === void 0) continue;
      let intersection;
      if (query instanceof Object) {
        intersection = this.intersect(query, source[key]);
      } else {
        intersection = value;
      }
      if (intersection !== void 0) {
        if (result === void 0) result = {};
        result[key] = intersection;
      }
    }
    return result;
  }
  fetch(accessor) {
    let value = this._source;
    try {
      for (const access of accessor) {
        value = value[access];
      }
    } catch (error) {
      return new Error(`property does not exist for ${accessor}`);
    }
    return value;
  }
  parse(query, seperator) {
    const accessor = query.split(seperator);
    let value = this._source;
    try {
      for (const access of accessor) {
        value = value[access];
      }
    } catch (error) {
      return new Error("value ");
    }
    return value;
  }
  inject(input, regExp, options) {
    let results;
    while (results = regExp.exec(input)) {
      console.red(results);
      const match = results[0];
      const access = results[1];
      const splitter = options?.splitter || /\./;
      const accessSequence = access.split(splitter);
      if (this.has(accessSequence)) {
        input = input.replace(`{${access}}`, this.fetch(accessSequence));
      } else {
        if (options?.delegate && options.delegate instanceof Function) {
          const delegate = options.delegate;
          const value = delegate(match, access);
          input = input.replace(`{${access}}`, value);
        }
      }
    }
    return input;
  }
};
var EmptyAttributes = Object.freeze({});
var EmptyData = new ArrayBuffer(0);
var __HashCount = 0;
function CatchThenResolveException(error) {
  return error;
}
function GetRange(start, end) {
  const t = Math.random();
  return start * t + end * (1 - t);
}
function CatchThrowError(error) {
  throw error;
}
function CatchCapture(capture) {
  if (capture === true || capture === void 0) return CatchThenResolveException;
  if (capture === false) return CatchThrowError;
  if (capture instanceof Function) return capture;
  return ((error) => {
    if (capture.constructor === String || capture instanceof Error) throw capture;
    return capture;
  });
}
function EmptyFunction() {
}
function DecodeBase64(value) {
  const buff = Buffer.from(value, "base64");
  return buff.toString("ascii");
}
function InflateAttributes(accessor, value, attributes, options) {
  let traversal = attributes;
  for (let i = 0; i < accessor.length; i++) {
    const access = accessor[i];
    if (i == accessor.length - 1) {
      if (options?.overwrite === true) {
        traversal[access] = value;
      } else {
        if (traversal[access] === void 0) {
          traversal[access] = value;
        } else if (traversal[access] instanceof Array) {
          traversal[access].push(value);
        } else {
          console.log("<<<", value);
          traversal[access] = [traversal[access], value];
        }
      }
    } else {
      traversal[access] = traversal[access] || {};
    }
    traversal = traversal[access];
  }
  return attributes;
}
function s4(seed) {
  return Math.floor((1 + seed) * 65536).toString(16).substring(1);
}
function QuickHash(options) {
  const join = options?.join || "-";
  let repeat = options?.repeat || 1;
  switch (repeat.constructor) {
    case Array:
      repeat = GetRange(repeat[0], repeat[1]);
      break;
    // case Number:
    // do nothing. It's already a Number
    // break;
    default:
      repeat = 1;
  }
  let result = [];
  for (let i = 0; i < repeat; i++) {
    const hash = [
      s4(Math.random()) + s4(++__HashCount),
      s4(++__HashCount),
      s4(Math.random()),
      s4(++__HashCount),
      s4((/* @__PURE__ */ new Date()).getTime()) + s4(++__HashCount) + s4(Math.random())
    ].join(join);
    result.push(hash);
  }
  return result.join(join);
}
function $UsePromise(options) {
  let resolveCallback;
  let rejectCallback;
  const promise = new Promise(function(resolve, reject) {
    resolveCallback = resolve;
    rejectCallback = reject;
  });
  return [promise.catch(CatchCapture(options?.capture)), resolveCallback, rejectCallback];
}
function $RacePromise($promise, race, capture) {
  return new Promise(async function(resolve, reject) {
    setTimeout(function() {
      reject(new Error(`$RacePromise( ... ) timed out ${race}ms`));
    });
    resolve(await $promise);
  }).catch(CatchCapture(capture));
}
function $UseRace(race, options) {
  let resolveCallback;
  let rejectCallback;
  const delegate = function(resolve, reject) {
    resolveCallback = resolve;
    rejectCallback = reject;
    if (race === void 0) return;
    setTimeout(function() {
      reject(new Error(`$UseRace( ... ) timed out ${race}ms`));
    }, race);
  };
  const promise = new Promise(delegate).catch(CatchCapture(options?.capture));
  return [promise, resolveCallback, rejectCallback];
}
var GenericSession = class {
  $promise;
  _timeout;
  constructor(options) {
    const capture = options?.capture;
    this.$promise = $UsePromise({ capture });
    if (options?.race) this.renew(options.race);
  }
  renew(delay) {
    clearTimeout(this._timeout);
    const $promise = this.$promise;
    this._timeout = setTimeout(function() {
      $promise[2](new Error(`Session Expiry reached ${delay}`));
    }, delay);
    return this;
  }
  stop() {
    clearTimeout(this._timeout);
    return this;
  }
};
var PoolManager = class _PoolManager {
  static __ClassMap = /* @__PURE__ */ new Map();
  // @-ts-expect-errors
  static Instantiate(constructor, ...rest) {
    let instance;
    let instanceSet = _PoolManager.__ClassMap.get(constructor);
    if (instanceSet === void 0) {
      instanceSet = /* @__PURE__ */ new Set();
      _PoolManager.__ClassMap.set(constructor, instanceSet);
      instance = new constructor();
    } else {
      const iterator = instanceSet[Symbol.iterator]();
      instance = iterator.next().value;
      instanceSet.delete(instance);
      instance = instance || new constructor();
    }
    if (instance.init instanceof Function) {
      instance.init.apply(instance, rest);
    }
    return instance;
  }
  /* _this.isReclaimed = function (instance) {
  
  		let classFunc = instance.constructor;
  
  		// attach a GUID if the class definition does not currently have one
  		if (dns.isEmpty(classFunc[_accessor])) {
  			return false;
  		}
  
  		if (_objectMap[classFunc[_accessor]] instanceof Array) {
  
  			if (_objectMap[classFunc[_accessor]].indexOf(instance) > -1) {
  
  				return true;
  
  			}
  
  		} else {
  
  			return false;
  
  		}
  
  		return false;
  	}; */
  // reclaim an object to be used later
  static Reclaim(instance) {
    const constructor = instance.constructor;
    let instanceSet = _PoolManager.__ClassMap.get(constructor);
    if (instanceSet === void 0) {
      instanceSet = /* @__PURE__ */ new Set();
      _PoolManager.__ClassMap.set(constructor, instanceSet);
    }
    instanceSet.add(instance);
  }
};
var Unsubscribe = Symbol("unsubscribe");
var Subscription = class {
  _subscriberMap = /* @__PURE__ */ new Map();
  _countMap = /* @__PURE__ */ new Map();
  _unsubscribeSet = /* @__PURE__ */ new Set();
  init() {
    this._subscriberMap.clear();
  }
  /**
   * Allows the intsance to be return to a pool.
   * 
   * @param rest {...unknown[]} I used the ...rest parameter for inheritance
   * @implements {IPoolable}
   */
  reclaim() {
    this._subscriberMap.clear();
    PoolManager.Reclaim(this);
  }
  /**
   * Checks the subscriber store for the 
   * `hasSubscription` is mindful of subclasses that use `has` member
   * 
   * @param value {Notification} Value to cast to string and compare.
   * @returns {boolean}
   */
  hasSubscription(value) {
    for (const [callback, notify] of this._subscriberMap) {
      if (String(notify) == String(value)) {
        return true;
      }
    }
    return false;
  }
  /**
   * 
   * 
   * @param notify {Notification} A key used to invoke the supplied delegate.
   * @param delegate {Function} The delegate called
   * @param once {boolean} Deletes the notication entry once it been dispatched
   */
  subscribe(notify, delegate, count) {
    if (delegate === void 0) throw new Error(`Subscription.subscribe( ... ) : delegate passed is not a function ${delegate}`);
    if (count !== void 0) this._countMap.set(delegate, count);
    this._subscriberMap.set(delegate, notify);
  }
  unsubscribe(delegate) {
    this._subscriberMap.delete(delegate);
  }
  notify(notify, ...rest) {
    for (const [callback, query] of this._subscriberMap) {
      let result;
      if (query instanceof RegExp && notify instanceof String) {
        const regExp = query;
        if (regExp.test(notify)) result = callback(notify, ...rest);
      } else if (query.constructor.name == "Array") {
        const values = query;
        for (const value of values) {
          if (value == notify) {
            result = callback(notify, ...rest);
            break;
          }
        }
      } else if (query === notify) {
        result = callback(notify, ...rest);
      }
      if (result instanceof Promise) {
        const self = this;
        result.then(function(resolve) {
          if (resolve === Unsubscribe) self._subscriberMap.delete(callback);
        });
      } else if (result === Unsubscribe) {
        this._unsubscribeSet.add(callback);
      } else if (this._countMap.has(callback)) {
        const count = this._countMap.get(callback) - 1;
        if (count < 1) {
          this._unsubscribeSet.add(callback);
          this._countMap.delete(callback);
        }
      }
    }
    for (const delegate of this._unsubscribeSet) this._subscriberMap.delete(delegate);
    this._unsubscribeSet.clear();
  }
  async $notify(notify, ...rest) {
    for (const [callback, query] of this._subscriberMap) {
      let result;
      if (query.constructor.name == "RegExp") {
        const regExp = query;
        if (regExp.test(notify)) result = await callback(notify, ...rest);
      } else if (query.constructor.name == "Array") {
        const values = query;
        for (const value of values) {
          if (value == notify) {
            result = await callback(notify, ...rest);
            break;
          }
        }
      } else if (query === notify) {
        result = await callback(notify, ...rest);
      }
      for (const delegate of this._unsubscribeSet) this._subscriberMap.delete(delegate);
      this._unsubscribeSet.clear();
    }
  }
  clear() {
    this._subscriberMap.clear();
  }
  $listen(notify, callback, race) {
    const _this = this;
    return new Promise(function(resolve, reject) {
      const subscribeForCallback = function(...rest) {
        const result = callback(...rest);
        if (result === true) {
          resolve(result);
          return _this.unsubscribe;
        }
      };
      _this.subscribe(notify, subscribeForCallback);
      if (race === void 0) return;
      setTimeout(function() {
        reject(new Error(`Subscription.$listen( "${notify}", ... ) has rejected on race timeout : ${race}`));
      }, race);
    });
  }
};
var ForgePath = class _ForgePath {
  static IsAbsolute(file) {
    return import_path.default.isAbsolute(file);
  }
  static Parse(file) {
    const parsedPath = import_path.default.parse(file);
    parsedPath.root = parsedPath.root.replace(/\\/g, "/");
    parsedPath.dir = parsedPath.dir.replace(/\\/g, "/");
    parsedPath.base = parsedPath.base.replace(/\\/g, "/");
    return parsedPath;
  }
  static Resolve(...rest) {
    return import_path.default.resolve(...rest).replace(/\\/g, "/");
  }
  static Relative(source, target) {
    return "./" + import_path.default.relative(source, target).replace(/\\/g, "/");
    ;
  }
  static Contains(source, target) {
    const root = import_path.default.resolve(source);
    const relative = import_path.default.relative(root, target);
    const contains = relative && relative == "" || !relative.startsWith("..") && !import_path.default.isAbsolute(relative);
    return contains;
  }
  static async $Status(root, target) {
    const parsedPath = _ForgePath.Parse(target);
    let exists;
    let isSubdirectory;
    if (parsedPath.ext == "") {
      isSubdirectory = true;
      exists = await ForgeIO.File.$DirectoryExists(target);
    } else {
      isSubdirectory = false;
      exists = await ForgeIO.File.$FileExist(target);
    }
    const contains = _ForgePath.Contains(root, target);
    return { isSubdirectory, exists, contains };
  }
  static Sanitize(...rest) {
    const length2 = rest.length;
    if (_ForgePath.IsAbsolute(rest[length2 - 1])) return rest[length2 - 1].replace(/\\/g, "/");
    ;
    return import_path.default.resolve(...rest).replace(/\\/g, "/");
  }
  static Join(...rest) {
    const joinedPath = import_path.default.join(...rest).replace(/\\/g, "/");
    if (import_path.default.isAbsolute(joinedPath)) return joinedPath;
    return joinedPath[0] == "." ? joinedPath : "./" + joinedPath;
  }
};
var $fs = __require("node:fs/promises");
var fs = __require("fs");
var path2 = __require("path");
var { spawn, fork, exec, execSync } = __require("child_process");
var { Readable } = __require("stream");
var { finished } = __require("stream/promises");
var ForgeFile = class _ForgeFile {
  static Stream = {
    Write: function(file, options) {
      const writeStream = fs.createWriteStream(file, options);
      const $complete = new Promise(function(resolve, reject) {
        writeStream.on("finish", () => {
          resolve(file);
        });
        writeStream.on("error", (error) => {
          reject(error);
        });
      });
      const write = function(content) {
        switch (content.constructor) {
          case ArrayBuffer:
            writeStream.write(new Uint8Array(content));
            break;
          case String:
          case Buffer:
            writeStream.write(content);
            break;
        }
      };
      const $end = async function() {
        writeStream.end();
        return $complete;
      };
      return { write, $end };
    }
  };
  static async $Stat(target) {
    return $fs.stat(target);
  }
  static async $FileExist(file) {
    try {
      const stats = await $fs.stat(file);
      return stats.isDirectory() ? false : true;
    } catch (error) {
      return false;
    }
  }
  static async $DirectoryExists(path4) {
    try {
      const stats = await $fs.stat(path4);
      return stats.isDirectory() ? true : false;
    } catch (error) {
      return false;
    }
  }
  static async $MakeDirectory(path4) {
    return $fs.mkdir(path4, { recursive: true }).then(function() {
      return true;
    }).catch(function() {
      return false;
    });
  }
  static Read(path4, options) {
    const data = fs.readFileSync(path4, options);
    return data.buffer;
  }
  static async $ReadDecoded(path4, encoding) {
    encoding = encoding || "utf8";
    return $fs.readFile(path4, { encoding });
  }
  static async $Read(path4) {
    return new Promise(async function(resolve, reject) {
      try {
        const data = await $fs.readFile(path4);
        resolve(data.buffer);
      } catch (error) {
        reject(new Error(`Error reading file: "${path4}"`));
      }
    });
  }
  static Write(path4, contents, options) {
    if (options?.recursive) {
      const { dir } = ForgePath.Parse(path4);
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path4, contents, options);
  }
  static async $Write(path4, contents, options) {
    if (options?.recursive) {
      const { dir } = ForgePath.Parse(path4);
      await _ForgeFile.$MakeDirectory(dir);
    }
    return $fs.writeFile(path4, contents, options);
  }
  static async $Append(path4, contents, options) {
    return new Promise(async function(resolve, reject) {
      try {
        await $fs.appendFile(path4, contents);
        resolve();
      } catch (error) {
        reject(new Error(`Error appending file: "${path4}"`));
      }
    });
  }
  static async $Copy(source, target) {
    return new Promise(function(resolve, reject) {
      const readStream = fs.createReadStream(source);
      const writeStream = fs.createWriteStream(target);
      readStream.pipe(writeStream);
      readStream.on("end", () => {
        console.log("File copy operation completed successfully!");
      });
      readStream.on("error", (error) => {
        reject(error);
        console.error("Error reading the source file:", error);
      });
      writeStream.on("finish", () => {
        console.log("Data has been written to the destination file.");
        resolve();
      });
      writeStream.on("error", (error) => {
        reject(error);
        console.error("Error writing to the destination file:", error);
      });
    });
  }
  static async $Glob(paths, options) {
    const results = [];
    for (const path4 of paths) {
      let result;
      if (result = /(?<root>.+)\/\*\/\*\*/.exec(path4)) {
        results.push(...await _ForgeFile.$Walk(result.groups.root, { ...options, recursive: true }));
      } else if (result = /.+\/\*/.exec(path4)) {
        results.push(...await _ForgeFile.$Walk(result.groups.root, { ...options, recursive: false }));
      } else {
        results.push(path4);
      }
    }
    return results;
  }
  static async $Walk(root, options) {
    options = options || {};
    const files = [];
    const children = await $fs.readdir(root);
    for (const file of children) {
      const resolvedFile = ForgePath.Join(root, file);
      const stat = await _ForgeFile.$Stat(resolvedFile);
      if (stat.isDirectory()) {
        if (options.directory === true) files.push(resolvedFile);
        if (options.recursive !== false) files.push(...await _ForgeFile.$Walk(resolvedFile, options));
      } else {
        if (options.file !== false) files.push(resolvedFile);
      }
    }
    return options.resolve === true ? files.map((file) => ForgePath.Resolve(file)) : files;
  }
  static async $WalkStats(root, overload) {
    let fileMap = overload && overload.constructor.name == "Map" ? overload : /* @__PURE__ */ new Map();
    const files = await $fs.readdir(root);
    for (const file of files) {
      const resolvedFile = path2.join(root, file).replace(/\\/g, "/");
      ;
      try {
        const stat = await _ForgeFile.$Stat(resolvedFile);
        if (stat.isDirectory() && overload !== false) {
          fileMap = await _ForgeFile.$WalkStats(resolvedFile, fileMap);
        } else {
          fileMap.set(resolvedFile, stat);
        }
      } catch (error) {
      }
    }
    return fileMap;
  }
};
var ForgeWeb = class {
  static $Fetch(url, options) {
    console.red(`ForgeWeb Not properly implemented]`);
    return new Promise(async function(resolve, reject) {
      const response = await fetch(url, {
        ...options,
        signal: options.signal || AbortSignal.timeout(1e3)
      });
      resolve(response);
    });
  }
};
var ForgeIO = class {
  static File = ForgeFile;
  static Web = ForgeWeb;
  static async $Fetch(source, options) {
    if (/^https?:\/\//.test(source)) {
      const response = await fetch(new URL(source), options?.request);
      if (response.ok) return response.arrayBuffer();
      return CatchCapture(options?.capture);
    } else {
      return ForgeFile.$Read(source).catch(CatchCapture(options?.capture));
    }
  }
  static async $Download(url, file) {
    return await new Promise(async function(resolve, reject) {
      const fileStream = fs.createWriteStream(file);
      const { body } = await fetch(url);
      await finished(Readable.fromWeb(body).pipe(fileStream));
      resolve(true);
    }).catch(function(error) {
      console.error(error);
      return false;
    });
  }
  /* public static async $UnZip(compressedData: Uint8Array, directory: string): Promise<boolean> {
  
          return new Promise<boolean>(function (resolve, reject) {
  
              fflate.unzip(compressedData, async function (err, unzipped: Record<string, Uint8Array>) {
  
                  
                  for (const [key, uint8Array] of Object.entries(unzipped)) {
  
                      const unwrappedFileName: string = key.split(/[\\\/]/).slice(1).join("/");
  
                      if (key[key.length - 1] == "/") {
  
                          // is this the home directory
                          if (unwrappedFileName == "") continue;
  
                          await ForgeFile.$MakeDirectory(path.resolve(directory, unwrappedFileName));
  
                      } else {
  
                          await $fs.writeFile(path.resolve(directory, unwrappedFileName), uint8Array);
  
                      }
  
                  }
  
                  resolve(true);
  
              });
  
          });
  
      } */
};
var AbstractArguments = class {
  _args = [];
  _validationMap = /* @__PURE__ */ new Map();
  _errors = [];
  constructor() {
  }
  /**
   * Iterates via Object.entries(...) on the internal _args property
   * 
   * @generator
   * @yields {[string, unknown]}
   */
  *[Symbol.iterator]() {
    for (const entry of this._args) yield entry;
  }
  _query(query, name) {
    if (query.constructor === String && query == name) return false;
    if (query.constructor === RegExp && query.test(name) === false) return false;
    return true;
  }
  /**
   * This function will 
   *      1. Inject a default if no value is provided
   *      2. Test if it is a required parameter, or add to internal errors 
   *      3. Sanitize the value via the `validation.validator` delegate
   * 
   * @param key {string} The key extracted from parsing
   * @param value {unknown} The value extracted from parsing
   * @param validation {ValidationEntry} Provides info for default, is required, and a validator to sanitize the 
   * @returns {unknown} If the `validation` param has a delegate then it will sanitize value.
   */
  _validate(key, value, validation) {
    if (validation.default !== void 0) value = value === void 0 ? validation.default : value;
    if (validation.required && value === void 0) {
      const errorMessage = validation.error || `<red>Required value for <cyan>--${key}--<red> argument`;
      this._errors.push(errorMessage);
    }
    if (validation.validate) {
      try {
        const result = validation.validate(value, this._args);
        if (result === false || result === void 0) {
          const errorMessage = validation.error || `<red>Validation Failed for <cyan>--${key}--<red> argument`;
          this._errors.push(errorMessage);
        }
      } catch (error) {
        if (error instanceof Error) {
          const errorMessage = error.message;
          this._errors.push(errorMessage);
        } else {
          this._errors.push(String(error));
        }
      }
    }
    if (validation.sanitize) {
      const result = validation.sanitize(value, this._args);
      if (result && result instanceof Error) {
        const error = result;
        const errorMessage = error.message || `<red>Sanitation Failed for <cyan>--${key}--<red> argument`;
        this._errors.push(errorMessage);
      }
      return result;
    }
    return value;
  }
  import(args, options) {
    for (const arg of args) this._args.push(arg);
  }
  /**
   * Find the requested key in the internal args members. Can evaluate using `String` or `RegExp`
   * 
   * @param query {string|RegExp} Optional 
   * @returns {boolean} 
   */
  has(query) {
    if (query.constructor === RegExp) {
      const regExp = query;
      for (const [key, value] of this._args) if (regExp.test(key)) return true;
    } else if (query.constructor === String) {
      const match = query;
      for (const [key, value] of this._args) if (key == match) return true;
    }
    return false;
  }
  /**
   * Getter that will return the value associated with the key, or the arguments collection {Record<string, unknown>) 
   * if a RegExp the is passed then this function will returnt he first value that matches.
   * if a string is pass then the value of the indexed value will be returned.
   * if no value is passed then the whole arg object is returned.
   * 
   * @param query {string|RegExp|undefined} Optional 
   * @returns {unknown} DO l really need to explain this
   */
  last(query) {
    let result;
    if (query.constructor === RegExp) {
      const regExp = query;
      for (const [key, value] of this._args) if (regExp.test(key)) result = value;
    } else if (query.constructor === String) {
      const match = query;
      for (const [key, value] of this._args) if (key == match) result = value;
    }
    return result;
  }
  async $prompt(message, options) {
    return new Promise(function(resolve, reject) {
      const readlineInterface = (0, import_node_readline.createInterface)({ input: process.stdin, output: process.stdout });
      readlineInterface.question(message, (answer) => {
        resolve(answer);
        readlineInterface.close();
      });
    });
  }
  /**
   * Assigns a validation check to specific arguments via the key provided
   * 
   * @param query {string|RegExp} A string or RegExp to match the Arguments and dispatch delegate
   * @param validation {ValidationEntry}
   * @returns {this} return this so you can daisy chain calls
   */
  add(query, validation) {
    this._validationMap.set(query, { ...validation, required: validation.required || false });
    return this;
  }
  /**
   * Assigns a validation check to specific arguments via the key provided
   * 
   * @param query {string|RegExp} A string or RegExp to match the Arguments and dispatch delegate
   * @param validationEntry {ValidationEntry}
   * @returns {this} return this so you can daisy chain calls
   */
  async $fetch(query, validation) {
    for (const entry of this._args) {
      const [name, value] = entry;
      if (query.constructor === String && query != name) continue;
      if (query.constructor === RegExp && query.test(name) === false) continue;
      return this._validate(query, value, validation);
    }
    if (validation.prompt.required === true) {
      const value = await this.$prompt(validation.prompt.message || `Value needed for query (${query})`);
      if (validation.sanitize) {
        const result = validation.sanitize(value, this._args);
        if (result && result instanceof Error) {
          const error = result;
          const errorMessage = error.message || `<red>Sanitation Failed for <cyan>--${query}--<red> argument`;
          this._errors.push(errorMessage);
        }
      }
    }
    if (this._errors.length) throw new Error(this._errors.join("\n"));
  }
  /**
   * Subclasses are responsible for assigning a data source (CLI, .Env, Remote/Server) into a arguments {Record<string, unknown>}
   *      1. After using `add` member to set all the validation entries. 
   *      2. `compile` will validate/sanitize each entry. If there any errors then join all errors messages into a single Error and throw it!
   */
  compile() {
    const unvalidatedArgs = new Set(this._args);
    for (const [query, validation] of this._validationMap) {
      for (const entry of unvalidatedArgs) {
        const [name, value] = entry;
        if (query.constructor === RegExp && query.test(name) === false) continue;
        if (query.constructor === String && query != name) continue;
        entry[1] = this._validate(query, value, validation);
        unvalidatedArgs.delete(entry);
      }
    }
    for (const entry of unvalidatedArgs) {
      for (const [query, validation] of this._validationMap) {
        const [name, value] = entry;
        if (query.constructor === String && query != name) continue;
        if (query.constructor === RegExp && query.test(name) === false) continue;
        entry[1] = this._validate(query, value, validation);
      }
    }
    if (this._errors.length) throw new Error(this._errors.join("\n"));
    return this._args;
  }
  parse(input) {
  }
  attributes(query, splitter = ".") {
    const result = {};
    const entries = this.collect(query);
    if (entries.length == 0) return;
    for (const partial of entries) {
      for (const [key, value] of partial) {
        const accessor = key.split(splitter);
        InflateAttributes(accessor, value, result);
        console.log(key, value, result);
      }
    }
    return result;
  }
  split(query, splitter) {
    return this.last(query).split(splitter);
  }
  string(query) {
    return this.last(query);
  }
  number(query) {
    return this.last(query);
  }
  collect(query, options) {
    let results = [];
    for (const [name, value] of this) if (this._query(query, name)) results.push(value);
    if (options?.split) {
      const subResult = [];
      for (const value of results) subResult.push(...String(value).split(options.split));
      results = subResult;
    }
    if (options?.resolve === true) for (let i = 0; i < results.length; i++) results[i] = ForgePath.Resolve(String(results[i]));
    return results;
  }
  async $walk(query, options) {
    const results = [];
    const ignores = options?.ignores === void 0 ? [] : await ForgeFile.$Glob(options?.ignores, { resolve: true });
    const files = this.collect(query).map((file) => ForgePath.Resolve(file));
    for (const file of files) {
      let result;
      if (result = /(?<root>.+)\/\*\/\*\*/.exec(file)) {
        results.push(...await ForgeFile.$Walk(result.groups.root, { recursive: true }));
      } else if (result = /.+\/\*/.exec(file)) {
        results.push(...await ForgeFile.$Walk(result.groups.root, { recursive: false }));
      } else {
        results.push(file);
      }
    }
    return results.filter((file) => ignores.includes(ForgePath.Resolve(file)) === false);
  }
  async $json(query, intersect) {
    try {
      const file = this.last(query);
      const jsonData = JSON.parse(await ForgeFile.$ReadDecoded(file));
      const accessor = new Accessor(jsonData);
      return accessor.intersect(intersect, jsonData);
    } catch (error) {
      const message = error instanceof Error ? error.message : error;
      throw new Error(`Error loading $json from IForgeArgument.$json( ... ) with the following message:
${message}`);
    }
  }
};
var CLIArguments = class _CLIArguments extends AbstractArguments {
  static Defaults = {
    // : { Key: RegExp[], Partial: RegExp[] }
    Key: {
      pair: [
        /^--(?!-)(?<key>.+?)((?<!-)--$)/,
        // --key-- value
        /^\[\[(?!-)(?<key>.+?)((?<!\])\]\]$)/
        // [[key]] value
      ],
      flag: [
        /^--(?!-)(?<flag>.+?)((?<!--)$)/,
        // --flag
        /^\[\[(?!\[)(?<flag>.+?)((?<!\]\])$)/
        // [[flag
      ]
    },
    Partial: {
      pair: [
        /^-(?!-)(?<key>.+?)((?<!-)-$)/,
        // -key- value
        /^\[(?!-)(?<key>.+?)((?<!\])\]$)/
        // [key] value
      ],
      flag: [
        /^-(?!-)(?<flag>.+?)((?<!-)$)/,
        // -flag
        /^\[(?!\[)(?<flag>.+?)((?<!\])$)/
        // [flag
      ]
    }
  };
  _keys = _CLIArguments.Defaults.Key;
  _partials = _CLIArguments.Defaults.Partial;
  compile() {
    const args = process.argv;
    argumentLabel:
      for (let i = 0; i < args.length; i) {
        const keyQuery = args[i++];
        if (new RegExp(`/{{(.+?)}}/`).test(keyQuery)) {
          const results = /{{(.+?)}}/.exec(keyQuery);
          const base64 = args[i++];
          this._args.push([results[1], JSON.parse(DecodeBase64(base64))]);
          continue argumentLabel;
        }
        for (const query of this._keys.pair) {
          const result = query.exec(keyQuery);
          if (result) {
            let queryValue = args[i];
            let partials;
            partialLabel:
              while (queryValue !== void 0) {
                queryValue = args[i];
                for (const query2 of this._partials.pair) {
                  const partialResult = query2.exec(queryValue);
                  if (partialResult) {
                    const partialKey = partialResult.groups.key;
                    if (partialKey === void 0) this._errors.push(`no \`key\` group found in argument "${queryValue}" from RegExp: /${query2.source}/`);
                    i++;
                    if (partials === void 0) partials = [];
                    partials.push([partialKey, args[i++]]);
                    continue partialLabel;
                  }
                }
                for (const query2 of this._partials.flag) if (query2.test(queryValue)) {
                  const partialResult = query2.exec(queryValue);
                  if (partialResult) {
                    const partialFlag = partialResult.groups.flag;
                    if (partialFlag === void 0) this._errors.push(`no \`flag\` group found in argument "${queryValue}" from RegExp: /${query2.source}/`);
                    i++;
                    if (partials === void 0) partials = [];
                    partials.push([partialFlag, true]);
                    continue partialLabel;
                  }
                }
                queryValue = void 0;
              }
            if (partials === void 0) {
              this._args.push([result[1], args[i++]]);
            } else {
              this._args.push([result[1], partials]);
            }
            continue argumentLabel;
          }
        }
        for (const query of this._keys.flag) {
          const result = query.exec(keyQuery);
          if (result) {
            this._args.push([result[1], true]);
            continue argumentLabel;
          }
        }
      }
    return super.compile();
  }
};
var MapCollection = class _MapCollection {
  _map = /* @__PURE__ */ new Map();
  constructor(map) {
    this._map = map || /* @__PURE__ */ new Map();
  }
  *[Symbol.iterator]() {
    for (const entry of this._map) {
      yield entry;
    }
  }
  get size() {
    return this._map.size;
  }
  get sources() {
    return Array.from(this._map.keys());
  }
  get entries() {
    return Array.from(this._map);
  }
  attributes(source) {
    return this._map.get(source);
  }
  get(index) {
    return Array.from(this._map.keys())[index];
  }
  index(source) {
    const sources = Array.from(this._map.keys());
    for (let i = 0; i < sources.length; i++) {
      if (sources[i] == source) return i;
    }
    return -1;
  }
  find(delegate) {
    const results = [];
    const entries = Array.from(this._map);
    for (const [source, attributes] of entries) {
      if (delegate(source, attributes) === true) results.push(source);
    }
    return results;
  }
  add(source, attributes) {
    this._map.set(source, attributes);
    return source;
  }
  remove(source) {
    this._map.delete(source);
    return source;
  }
  exchange(source) {
    return source;
  }
  clear() {
    this._map.clear();
  }
  clone() {
    return new _MapCollection(new Map(this._map));
  }
};
var ArrayCollection = class {
  _array = [];
  constructor(array) {
    this._array = array || [];
  }
  *[Symbol.iterator]() {
    for (const entry of this._array) yield entry;
  }
  get size() {
    return this._array.length;
  }
  get sources() {
    const length2 = this._array.length;
    const entries = this._array;
    const results = new Array(length2);
    for (let i = 0; i < length2; i++) results[i] = results[i] = entries[i][0];
    return results;
  }
  get entries() {
    return [...this._array];
  }
  attributes(source) {
    for (const [value, attributes] of this._array) if (value == source) return attributes;
    throw new Error(`source was not in collection ${source}`);
  }
  get(index) {
    return this._array[index][0];
  }
  index(source) {
    const entries = this._array;
    const length2 = this._array.length;
    for (let i = 0; i < length2; i++) if (entries[i] == source) return i;
    return -1;
  }
  find(delegate) {
    const results = [];
    for (const [source, attributes] of this._array) {
      if (delegate(source, attributes) === true) results.push(source);
    }
    return results;
  }
  add(source, attributes) {
    this._array.push([source, attributes]);
    return source;
  }
  remove(source) {
    const entries = this._array;
    const length2 = this._array.length;
    for (let i = 0; i < length2; i++) {
      if (entries[i] == source) {
        this._array.splice(i, 1);
        break;
      }
    }
    return source;
  }
  exchange(source) {
    return source;
  }
  clear() {
    this._array.splice(0, this._array.length);
  }
  clone() {
    return new MapCollection(new Map(this._array));
  }
};
var Topology = class _Topology {
  static Deserialize(data, replacer) {
    const topology = new _Topology();
    for (const [source, attributes, parentIndex] of data) {
      topology.add(source, attributes, data[parentIndex][0]);
      topology.attributes(source, attributes);
    }
    return topology;
  }
  static Serialize(tree, replacer) {
    const results = [];
    const traversedInstances = Array.from(tree);
    for (const [source, attributes] of traversedInstances) {
      const data = replacer && replacer(source) || source;
      let parentIndex;
      for (let i = 0; i < traversedInstances.length; i++) {
        const current = traversedInstances[i][0];
        if (current == parent) {
          parentIndex = i;
          break;
        }
      }
      results.push([data, attributes, parentIndex]);
    }
    return results;
  }
  _parentMap = /* @__PURE__ */ new Map();
  _childMap = /* @__PURE__ */ new Map();
  _attributeMap = /* @__PURE__ */ new Map();
  _sortChildren = function(sourceA, sourceB) {
    return this._indexMap.get(sourceA) - this._indexMap.get(sourceB);
  }.bind(this);
  constructor() {
    this._childMap.set(void 0, []);
  }
  *[Symbol.iterator]() {
    for (const entry of this._attributeMap) yield entry;
  }
  _detach(source) {
    const parent2 = this._parentMap.get(source);
    const children = this._childMap.get(parent2);
    const indexOf = children.indexOf(source);
    if (indexOf > -1) children.splice(indexOf, 1);
  }
  _delete(source) {
    this._detach(source);
    this._childMap.delete(source);
    this._attributeMap.delete(source);
    this._parentMap.delete(source);
  }
  get size() {
    return this._childMap.size;
  }
  attributes(source, attributes) {
    const oldAttributes = this._attributeMap.get(source);
    if (attributes !== void 0) this._attributeMap.set(source, attributes);
    return oldAttributes;
  }
  traverse(source, traversal) {
    traversal = traversal || /* @__PURE__ */ new Set();
    traversal.add(source);
    const children = this._childMap.get(source);
    for (const child of children) if (traversal.has(child) === false) this.traverse(child, traversal);
    return traversal;
  }
  index(source) {
    const parent2 = this._parentMap.get(source);
    const children = this._childMap.get(parent2);
    return children.indexOf(source);
  }
  add(source, attributes, parent2) {
    if (this._childMap.has(parent2) === false) throw new Error(`parent is not a valid source of with this tree`);
    if (this._childMap.has(source) === false) {
      this._attributeMap.set(source, attributes);
      this._childMap.set(source, []);
    }
    this.move(source, parent2);
    return this;
  }
  remove(source) {
    this._detach(source);
    this._parentMap.delete(source);
    this._attributeMap.delete(source);
    this._childMap.delete(source);
    return this;
  }
  purge(source) {
    const traversal = this.traverse(source, /* @__PURE__ */ new Set());
    for (const entry of traversal) this._delete(entry);
  }
  move(source, parent2, insert) {
    this._detach(source);
    this._parentMap.set(source, parent2);
    const children = this._childMap.get(parent2);
    if (insert === void 0) {
      children.push(source);
    } else {
      const indexOf = children.indexOf(source);
      if (indexOf == -1) {
        insert = Math.max(0, Math.min(children.length - 1, insert));
        children.splice(insert, 0, source);
      } else if (insert == indexOf) {
      } else if (insert < indexOf) {
        if (indexOf > -1) children.splice(indexOf, 1);
        insert = Math.max(0, Math.min(children.length - 1, insert));
        children.splice(insert, 0, source);
      } else {
        if (indexOf > -1) children.splice(indexOf, 1);
        insert = Math.max(0, Math.min(children.length - 1, insert));
        children.splice(insert + 1, 0, source);
      }
    }
    return this;
  }
  order(parent2, children) {
    const oldChildren = this._childMap.get(parent2);
    const newChildren = [];
    for (const child of children) {
      if (oldChildren.indexOf(child) == -1) continue;
      newChildren.push(child);
    }
    for (const child of oldChildren) {
      if (newChildren.indexOf(child) > -1) continue;
      newChildren.push(child);
    }
    this._childMap.set(parent2, newChildren);
    return oldChildren;
  }
  mutate(source, target) {
    if (this.has(source) === false) throw new Error(`source parameter: ${source} is not part topology`);
    if (this.has(target) === false) throw new Error(`target parameter: ${target} is already part of the topology`);
    this._detach(target);
    const parent2 = this._parentMap.get(source);
    const siblings = this._childMap.get(parent2);
    const indexOf = siblings.indexOf(source);
    if (indexOf > -1) siblings.splice(indexOf, 1, target);
    this._parentMap.set(target, parent2);
    this._attributeMap.set(target, { ...this._attributeMap.get(source) });
    const children = this._childMap.get(source);
    this._childMap.set(target, children.slice());
    this._detach(source);
  }
  parent(child) {
    return this._parentMap.get(child);
  }
  children(source) {
    if (this._childMap.has(source) === false) throw new Error(`parameter is not a valid source of with this tree`);
    return this._childMap.get(source);
  }
  siblings(source) {
    const parent2 = this._parentMap.get(source);
    const siblings = new Set(this._childMap.get(parent2));
    siblings.delete(source);
    return siblings;
  }
  ancestry(source) {
    const ancestry = [];
    let parent2 = this._parentMap.get(source);
    while (parent2 !== this && parent2 !== void 0) {
      if (ancestry.indexOf(parent2) > -1) return ancestry;
      ancestry.unshift(parent2);
      parent2 = this._parentMap.get(parent2);
    }
    return ancestry;
  }
  depth(source) {
    let maxDepth = 0;
    for (const [source2, children] of this._childMap) {
      let depth = 1;
      let parent2 = this._parentMap.get(source2);
      while (parent2 !== this) {
        parent2 = this._parentMap.get(parent2);
        depth++;
      }
      maxDepth = Math.max(depth, maxDepth);
    }
    return maxDepth;
  }
  has(source) {
    return this._childMap.has(source);
  }
  clear() {
    const sources = Array.from(this._childMap.keys());
    this._childMap.clear();
    this._parentMap.clear();
    this._attributeMap.clear();
    return sources;
  }
};
var __AllAttributes = {};
var AttributesQuery = class _AttributesQuery {
  static Intersect(objectA, objectB) {
    const entries = Object.entries(objectA);
    for (const [key, value] of entries) {
      if (value instanceof Object) {
        if (_AttributesQuery.Intersect(value, objectB[key]) === false) return false;
      } else if (value != objectB[key]) {
        return false;
      }
    }
    return true;
  }
  static And(objectA, objectB) {
    const entriesA = Object.entries(objectA);
    for (const [key, value] of entriesA) {
      if (value instanceof Object) {
        if (_AttributesQuery.And(value, objectB[key]) === false) return false;
      } else if (value != objectB[key]) {
        return false;
      }
    }
    return true;
  }
  static Or(objectA, objectB) {
    if (objectB === void 0) return false;
    const entriesA = Object.entries(objectA);
    for (const [key, value] of entriesA) {
      if (value instanceof Object) {
        if (_AttributesQuery.Or(value, objectB[key]) === true) return true;
      } else if (value == objectB[key]) {
        return true;
      }
    }
    return false;
  }
  static Not(objectA, objectB) {
    if (objectB === void 0) return true;
    const entriesA = Object.entries(objectA);
    for (const [key, value] of entriesA) {
      if (value instanceof Object) {
        if (_AttributesQuery.Not(value, objectB[key]) === false) return false;
      } else if (value == objectB[key]) {
        return false;
      }
    }
    return true;
  }
  static All(objectA, objectB) {
    return true;
  }
  static Composite(objectA, objectB, ...rest) {
    const entriesA = Object.entries(objectA);
    for (const [key, value] of entriesA) {
      if (value instanceof Object) {
        if (_AttributesQuery.Composite(value, objectB[key]) === false) {
          return false;
        }
      } else if (value == objectB[key]) {
        return true;
      } else if (value instanceof Function) {
        return value(key, objectB[key], ...rest);
      } else if (value instanceof RegExp) {
        return value.test(String(objectB));
      }
    }
    return false;
  }
  /* public static Delegate(objectA: Attributes, objectB: Attributes, delegate): boolean {
  
          if (objectB === undefined) return false;
  
          const entriesA: [string, any][] = Object.entries(objectA);
          for (const [key, value] of entriesA) {
  
              if (value instanceof Object) {
  
                  if (AttributesQuery.And(value, objectB[key] as Attributes) === false) return false;
  
              } else if (value != objectB[key]) {
  
                  return false;
  
              }
  
          }
  
          // now do the attributesB, both attributes must match recursively
          const entriesB: any = Object.entries(objectB);
          for (const [key, value] of entriesB) {
  
              if (key instanceof Object) {
  
                  if (AttributesQuery.And(value, objectA[key] as Attributes) === false) return false;
  
              } else if (value != objectA[key]) {
  
                  return false;
  
              }
  
          }
  
      } */
  static Greater(objectA, objectB) {
    if (objectB === void 0) return false;
    const entriesA = Object.entries(objectA);
    for (const [key, value] of entriesA) {
      if (value instanceof Object) {
        if (_AttributesQuery.Greater(value, objectB[key]) === false) return false;
      } else if (value >= objectB[key]) {
        return false;
      }
    }
    return true;
  }
  static Less(objectA, objectB) {
    if (objectB === void 0) return false;
    const entriesA = Object.entries(objectA);
    for (const [key, value] of entriesA) {
      if (value instanceof Object) {
        if (_AttributesQuery.Less(value, objectB[key]) === false) return false;
      } else if (value <= objectB[key]) {
        return false;
      }
    }
    return true;
  }
};
var QueryManager2 = class _QueryManager {
  static From(overload) {
    const queryManager = new _QueryManager();
    if (Symbol.iterator in overload) {
      for (const [source, attributes] of overload) queryManager.add(source, attributes);
    }
    return queryManager;
  }
  _iCollection;
  _entries;
  _subscription = new Subscription();
  constructor(iCollection) {
    this._subscription.clear();
    this._iCollection = iCollection || new ArrayCollection();
  }
  /*
   * IPoolable implementation
   */
  subscription() {
    return this._subscription;
  }
  /*
   * IQuery implementation
   */
  *[Symbol.iterator]() {
    for (const entry of this._iCollection) yield entry;
  }
  get size() {
    return this._iCollection.size;
  }
  get iCollection() {
    return this._iCollection.clone();
  }
  get sources() {
    return this._iCollection.sources;
  }
  get last() {
    const componentArr = Array.from(this._iCollection.sources);
    return componentArr.pop();
  }
  get first() {
    const componentArr = Array.from(this._iCollection.sources);
    return componentArr.pop();
  }
  get(index) {
    return this._iCollection.sources[index];
  }
  slice(start, end) {
    return this._iCollection.sources.slice(start, end);
  }
  has(callback, ...rest) {
    const componentMap = this._iCollection;
    for (const [component, attributes] of componentMap) {
      if (callback(component, attributes, ...rest) === false) return false;
    }
    return true;
  }
  add(component, attributes) {
    this._iCollection.add(component, attributes);
    this._subscription.notify(this, component, attributes);
    return component;
  }
  remove(component) {
    this._iCollection.remove(component);
    this._subscription.notify(this, component);
    return component;
  }
  clear() {
    this._iCollection.clear();
  }
  attributes(component) {
    return this._iCollection.attributes(component);
  }
  merge(...iQueries) {
    for (const iQuery of iQueries) {
      for (const [component, attributes] of iQuery) this._iCollection.add(component, attributes);
    }
    this._subscription.notify(this);
    return this;
  }
  greater(attributes) {
    const queryManager = new _QueryManager();
    for (const [component, componentAttributes] of this._iCollection) {
      const resolvedAttributes = componentAttributes instanceof Function ? componentAttributes() : componentAttributes;
      if (AttributesQuery.Greater(attributes, resolvedAttributes)) queryManager.add(component, componentAttributes);
    }
    return queryManager;
  }
  less(attributes) {
    const queryManager = new _QueryManager();
    for (const [component, componentAttributes] of this._iCollection) {
      const resolvedAttributes = componentAttributes instanceof Function ? componentAttributes() : componentAttributes;
      if (AttributesQuery.Less(attributes, resolvedAttributes)) queryManager.add(component, componentAttributes);
    }
    return queryManager;
  }
  intersect(attributes) {
    const queryManager = new _QueryManager();
    for (const [component, componentAttributes] of this._iCollection) {
      const resolvedAttributes = componentAttributes instanceof Function ? componentAttributes() : componentAttributes;
      if (AttributesQuery.Intersect(attributes, resolvedAttributes)) queryManager.add(component, componentAttributes);
    }
    return queryManager;
  }
  or(attributes) {
    const queryManager = new _QueryManager();
    for (const [component, componentAttributes] of this._iCollection) {
      const resolvedAttributes = componentAttributes instanceof Function ? componentAttributes() : componentAttributes;
      if (AttributesQuery.Or(attributes, resolvedAttributes)) queryManager.add(component, componentAttributes);
    }
    return queryManager;
  }
  and(attributes) {
    const queryManager = new _QueryManager();
    for (const [component, componentAttributes] of this._iCollection) {
      const resolvedAttributes = componentAttributes instanceof Function ? componentAttributes() : componentAttributes;
      if (AttributesQuery.And(attributes, resolvedAttributes)) queryManager.add(component, componentAttributes);
    }
    return queryManager;
  }
  not(attributes) {
    const queryManager = new _QueryManager();
    for (const [component, componentAttributes] of this._iCollection) {
      const resolvedAttributes = componentAttributes instanceof Function ? componentAttributes() : componentAttributes;
      if (AttributesQuery.Not(attributes, resolvedAttributes)) queryManager.add(component, componentAttributes);
    }
    return queryManager;
  }
  filter(delegate, attributes, ...rest) {
    const queryManager = new _QueryManager();
    for (const [component, componentAttributes] of this._iCollection) {
      const resolvedAttributes = componentAttributes instanceof Function ? componentAttributes() : componentAttributes;
      if (delegate(attributes, resolvedAttributes, ...rest)) queryManager.add(component, componentAttributes);
    }
    return queryManager;
  }
  composite(attributes) {
    const queryManager = new _QueryManager();
    for (const [component, componentAttributes] of this._iCollection) {
      const resolvedAttributes = componentAttributes instanceof Function ? componentAttributes() : componentAttributes;
      if (AttributesQuery.Composite(attributes, resolvedAttributes)) queryManager.add(component, componentAttributes);
    }
    return queryManager;
  }
  all(callback, ...rest) {
    const queryManager = new _QueryManager();
    if (callback === void 0) {
      for (const [component, attributes] of this._iCollection) queryManager.add(component, attributes);
    } else {
      const componentMap = this._iCollection;
      for (const [component, componentAttributes] of componentMap) {
        const resolvedAttributes = componentAttributes instanceof Function ? componentAttributes() : componentAttributes;
        if (callback(component, resolvedAttributes, ...rest) === true) queryManager.add(component, componentAttributes);
      }
    }
    return queryManager;
  }
  async $all(callback, ...rest) {
    const queryManager = new _QueryManager();
    const componentMap = this._iCollection;
    for (const [component, componentAttributes] of componentMap) {
      const resolvedAttributes = componentAttributes instanceof Function ? componentAttributes() : componentAttributes;
      if (await callback(component, resolvedAttributes, ...rest) === true) queryManager.add(component, componentAttributes);
    }
    return queryManager;
  }
  wait() {
    const waitQueryManager = new WaitingQueryManager(this);
    waitQueryManager.root(this);
    return waitQueryManager;
  }
  group(key) {
    const groupMap = /* @__PURE__ */ new Map();
    for (const [component, attributes] of this._iCollection) {
      const groupKey = attributes[key];
      if (attributes[key] !== void 0) {
        if (groupMap.has(groupKey) === false) {
          groupMap.set(groupKey, new _QueryManager());
        }
        const queryMap = groupMap.get(groupKey);
        queryMap.add(component, attributes);
      }
    }
    return groupMap;
  }
  transform(callback, ...rest) {
    const entries = Array.from(this._iCollection);
    for (const [component, attributes] of entries) {
      const resolvedAttributes = attributes instanceof Function ? attributes() : attributes;
      const [transformedComponent, transformedAttributes] = callback(component, resolvedAttributes, ...rest);
      this._iCollection.remove(component);
      this._iCollection.add(transformedComponent, transformedAttributes);
    }
    return this;
  }
};
var WaitingQueryManager = class _WaitingQueryManager {
  _root;
  _parent;
  _filter;
  _$async;
  _callback;
  _rest;
  _queryManager;
  constructor(parent2, attributes, filter) {
    this._parent = parent2;
    this._filter = { callback: filter, attributes };
    this._$async = $UsePromise();
    this._$async[0].then(function(iQuery) {
      console.group("!!!");
      console.log("%c.then done complete results", "background: white; color: black;");
      console.log(iQuery);
      console.groupEnd();
    }).finally(function() {
      console.log("%c.then done complete results", "background: white; color: black;", Date.now());
      this._root.subscription().unsubscribe(this._root, this._onSynchronize);
      if (this._timer) {
        this._timer.stop();
      }
    }.bind(this));
    this._onSynchronize();
  }
  *[Symbol.iterator]() {
    if (this._filter.callback && this._filter.attributes) {
      for (const entry of this._parent) {
        const [component, attributes] = entry;
        const resolvedAttributes = attributes instanceof Function ? attributes() : attributes;
        if (this._filter.callback(this._filter.attributes, resolvedAttributes) === true) yield entry;
      }
    } else {
      for (const entry of this._parent) yield entry;
    }
  }
  _finally$Expired = function() {
    const filter = this._filter;
    if (filter.callback === void 0 && filter.attributes === void 0 && this._confirmation === void 0) return;
    const queryManager = new QueryManager2();
    let confirmed = false;
    for (const [component, componentAttributes] of this._parent) {
      const resolvedAttributes = componentAttributes instanceof Function ? componentAttributes() : componentAttributes;
      if (filter.callback !== void 0 && filter.callback(filter.attributes, resolvedAttributes) === false) continue;
      if (this._confirmation === void 0 || this._confirmation(component, resolvedAttributes, this, ...this._rest)) {
        confirmed = true;
        queryManager.add(component, componentAttributes);
      }
    }
    if (confirmed) {
      console.log("%cExpired CONFIRMED", "background: #f00");
      this._$async[1](queryManager);
    } else {
      console.log("%cExpired", "background: #f00");
      this._$async[2](new Error("WaitingQueryManager expired"));
    }
  }.bind(this);
  _onSynchronize = function() {
    const filter = this._filter;
    if (filter.callback === void 0 && filter.attributes === void 0 && this._confirmation === void 0) return;
    const queryManager = new QueryManager2();
    let confirmed = false;
    for (const [component, componentAttributes] of this._parent) {
      const resolvedAttributes = componentAttributes instanceof Function ? componentAttributes() : componentAttributes;
      if (filter.callback && filter.callback(filter.attributes, resolvedAttributes) === false) continue;
      if (this._confirmation === void 0 || this._confirmation(component, resolvedAttributes, this, ...this._rest)) {
        confirmed = true;
        queryManager.add(component, componentAttributes);
      }
    }
    if (confirmed) {
      console.log("%cASYNCED CONFIRMED", "background: #f00", Date.now());
      console.log(filter);
      console.log("_confirmation", this._confirmation);
      console.log("");
      this._$async[1](queryManager);
    } else {
    }
  }.bind(this);
  root(root) {
    if (root !== void 0) {
      this._root = root;
      this._root.subscription().subscribe(root, this._onSynchronize);
    }
    return this._root;
  }
  $async() {
    return this._$async[0];
  }
  race(value) {
    setTimeout(this._finally$Expired);
    return this;
  }
  confirmation(callback, ...rest) {
    this._callback = callback;
    this._rest = rest;
    return this;
  }
  intersect(attributes) {
    const iWaitingQuery = new _WaitingQueryManager(this, attributes, AttributesQuery.Intersect);
    iWaitingQuery.root(this._root);
    return iWaitingQuery;
  }
  or(attributes) {
    const iWaitingQuery = new _WaitingQueryManager(this, attributes, AttributesQuery.Or);
    iWaitingQuery.root(this._root);
    return iWaitingQuery;
  }
  and(attributes) {
    const iWaitingQuery = new _WaitingQueryManager(this, attributes, AttributesQuery.And);
    iWaitingQuery.root(this._root);
    return iWaitingQuery;
  }
  not(attributes) {
    const iWaitingQuery = new _WaitingQueryManager(this, attributes, AttributesQuery.Not);
    iWaitingQuery.root(this._root);
    return iWaitingQuery;
  }
  all(callback, ...rest) {
    const iWaitingQuery = new _WaitingQueryManager(this, __AllAttributes, callback || AttributesQuery.All);
    iWaitingQuery.root(this._root);
    return iWaitingQuery;
  }
  async $all($callback, ...rest) {
    const queryManager = new QueryManager2();
    if (true) throw "Not implemeted";
    return;
  }
};
var __ArrayBuffer = new ArrayBuffer(8);
var __Uint8Array = new Uint8Array(__ArrayBuffer);
var __Uint16Array = new Uint16Array(__ArrayBuffer);
var __Uint32Array = new Uint32Array(__ArrayBuffer);
var Cipher = class {
  static Random() {
    return;
  }
  _maxIterations = 8;
  _masks;
  _states = [];
  _registers;
  states;
  constructor(values, states) {
    this._registers = new Uint32Array(12);
    if (values !== void 0) {
      const length2 = values.length;
      if (length2 < 7) throw new Error(`must use at least 7 entries`);
      let cursor = 0;
      while (cursor < 6) {
        const index = cursor * 2;
        this._registers[index] = values[cursor];
        this._registers[index + 1] = states && states[cursor] || values[cursor];
        cursor++;
      }
      this._masks = new Uint8Array((length2 - cursor) * 4);
      for (let i = 0; cursor < length2; cursor++, i++) {
        __Uint32Array[0] = values[cursor];
        this._masks[i] = __Uint8Array[0];
        this._masks[i + 1] = __Uint8Array[1];
        this._masks[i + 2] = __Uint8Array[2];
        this._masks[i + 3] = __Uint8Array[3];
      }
    }
    const selfie = this;
    this.states = {
      push: function() {
        selfie._states.push(new Uint32Array([selfie._registers[4], selfie._registers[6], selfie._registers[8], selfie._registers[10], selfie._registers[12]]));
      },
      pop: function() {
        if (selfie._states.length == 0) throw new Error(`Cipher states are exhausted`);
        selfie.states.refresh();
        selfie._states.pop();
      },
      refresh: function() {
        if (selfie._states.length == 0) throw new Error(`Cipher states are exhausted`);
        const state = selfie._states[selfie._states.length - 1];
        selfie._registers[4] = state[0];
        selfie._registers[6] = state[1];
        selfie._registers[8] = state[2];
        selfie._registers[10] = state[3];
      }
    };
  }
  _cycle(index, minimum) {
    const a = this._registers[4];
    const b = this._registers[6];
    const c = this._registers[8];
    __Uint32Array[0] = this._registers[10];
    const encodedMicroOp = __Uint16Array[0];
    const count = __Uint8Array[2] % this._maxIterations;
    let value = this._registers[index];
    switch (encodedMicroOp % 7) {
      case 0:
      case 1:
        this._registers[10] = (this._registers[10] * a + b) % c;
      case 2:
      case 3:
        for (let i = 0; i < count; i++) value = (value * a + b) % c;
        break;
      case 4:
        this._registers[10] = (this._registers[10] * a + b) % c;
      case 5:
        for (let i = 0; i < count; i++) value = (value * a * a - b) % c;
        break;
      case 6:
        this._registers[10] = (this._registers[10] * a + b) % c;
      case 7:
        for (let i = 0; i < count; i++) value = (value * a * b * c + b) % c;
        break;
    }
    value = Math.max(minimum, value);
    this._registers[index] = value;
    return value;
  }
  sort = function() {
    const a = this._cycle(4, 0);
    const b = this._cycle(6, this._registers[7]);
    const c = this._cycle(8, this._registers[9]);
    const refresh = (this._registers[0] * a + b) % c;
    this._registers[0] = refresh;
    return refresh / c - 0.5;
  }.bind(this);
  get size() {
    return this._registers.byteLength + this._masks.byteLength;
  }
  reset() {
    this._registers[0] = this._registers[1];
    this._registers[2] = this._registers[3];
    this._registers[4] = this._registers[5];
    this._registers[6] = this._registers[7];
    this._registers[8] = this._registers[9];
    this._registers[10] = this._registers[11];
    return this;
  }
  shuffle(input) {
    const length2 = input.byteLength;
    const indexes = new Array(length2);
    const inputData = new Uint8Array(input);
    for (let i = 0; i < length2; i++) indexes[i] = i;
    indexes.sort(this.sort);
    const outputData = new Uint8Array(length2);
    for (let i = 0; i < length2; i++) outputData[i] = inputData[indexes[i]];
    return outputData.buffer;
  }
  unshuffle(input) {
    const length2 = input.byteLength;
    const indexes = new Array(length2);
    const inputData = new Uint8Array(input);
    for (let i = 0; i < length2; i++) indexes[i] = i;
    indexes.sort(this.sort);
    const outputData = new Uint8Array(length2);
    for (let i = 0; i < length2; i++) outputData[indexes[i]] = inputData[i];
    return outputData.buffer;
  }
  encrypt(input) {
    this.states.push();
    const encryptedData = new Uint8Array(this.shuffle(input));
    this.states.refresh();
    for (let i = 0; i < encryptedData.length; i++) {
      encryptedData[i] = this.mask(encryptedData[i], true);
    }
    this.states.pop();
    return encryptedData.buffer;
  }
  decrypt(input) {
    const unshuffledData = new Uint8Array(input.slice(0));
    this.states.push();
    for (let i = 0; i < unshuffledData.length; i++) unshuffledData[i] = this.mask(unshuffledData[i], false);
    this.states.refresh();
    const decryptedData = new Uint8Array(this.unshuffle(unshuffledData.buffer));
    this.states.pop();
    return decryptedData.buffer;
  }
  next(repeat) {
    repeat = repeat || 1;
    let results;
    for (let i = 0; i < repeat; i++) results = this._cycle(0, 0);
    return results;
  }
  mask(token, encrypt) {
    const c = this._cycle(8, this._registers[9]);
    const seed = this._cycle(2, 0);
    __Uint16Array[0] = seed;
    const dispatchIndex = __Uint8Array[1] % 8;
    const scaling = this._masks.length / c;
    const maskCursor = Math.floor(seed * scaling);
    const mask = this._masks[maskCursor];
    switch (dispatchIndex) {
      case 0:
      case 1:
      case 2:
      case 3:
        return token ^ mask;
      case 4:
      case 5:
        __Uint8Array[4] = token;
        __Uint8Array[5] = token;
        __Uint8Array[6] = token;
        if (encrypt === true) {
          __Uint32Array[1] << seed % 8;
        } else {
          __Uint32Array[1] >> seed % 8;
        }
        return __Uint8Array[5] ^ mask;
      case 6:
      case 7:
        __Uint8Array[4] = token;
        __Uint8Array[5] = token;
        __Uint8Array[6] = token;
        if (encrypt === true) {
          __Uint32Array[1] >> seed % 8;
        } else {
          __Uint32Array[1] << seed % 8;
        }
        return __Uint8Array[5] ^ mask;
      default:
        throw new Error(`how did you ge here`);
    }
  }
  read(dataStream) {
    const registers = new Uint32Array(dataStream.read());
    for (let i = 0; i < this._registers.length; i++) this._registers[i] = registers[i];
    this._masks = new Uint8Array(dataStream.read());
  }
  write(dataStream) {
    dataStream.write(this._registers.buffer);
    dataStream.write(this._masks.buffer);
  }
  import(data) {
    const values = new Uint32Array(data);
    const end = values.length;
    for (let i = 0; i < this._registers.length; i++) this._registers[i] = values[i];
    let cursor = this._registers.length;
    this._masks = new Uint8Array((end - cursor) * 4);
    for (let i = 0; cursor < end; cursor++, i++) {
      __Uint32Array[0] = values[cursor];
      this._masks[i] = __Uint8Array[0];
      this._masks[i + 1] = __Uint8Array[1];
      this._masks[i + 2] = __Uint8Array[2];
      this._masks[i + 3] = __Uint8Array[3];
      cursor++;
    }
  }
  export() {
    const uint8Array = new Uint8Array(this.size);
    uint8Array.set(new Uint8Array(this._registers.buffer));
    uint8Array.set(this._masks, this._registers.byteLength);
    return uint8Array.buffer;
  }
  toString() {
    return `Cipher { Encoding Token : ${this._registers} }`;
  }
};
var DebugCipherRegisters = [0, 0, 19301, 49297, 233280, 823423, 4294967295];
var DebugCipher = new Cipher(DebugCipherRegisters, DebugCipherRegisters);
var NUMBER_SIZE = 8;
var __ArrayBuffer2 = new ArrayBuffer(8);
var __Uint16Array2 = new Uint16Array(__ArrayBuffer2);
var __Float64Array = new Float64Array(__ArrayBuffer2);
function EncodeNumber(value, data) {
  data = data || new ArrayBuffer(NUMBER_SIZE);
  const dataView = new DataView(data);
  dataView.setFloat64(0, value);
  return data;
}
function EncodeString(value) {
  return new TextEncoder().encode(value).buffer;
}
function DecodeString(buffer) {
  return new TextDecoder().decode(new Uint8Array(buffer));
}
function DecodeAttributes(buffer, reviver) {
  reviver = reviver || Base64.Reviver;
  return JSON.parse(DecodeString(buffer), reviver);
}
function EncodeAttributes(attributes, replacer) {
  replacer = replacer || Base64.Replacer;
  return EncodeString(JSON.stringify(attributes, replacer));
}
var Base64 = class _Base64 {
  static ArrayBuffer(input) {
    const binaryString = atob(input);
    const buffer = Uint8Array.from(binaryString, (m) => m.codePointAt(0));
    return buffer.buffer;
  }
  static String(input) {
    const binaryString = atob(input);
    return new TextDecoder().decode(Uint8Array.from(binaryString, (m) => m.codePointAt(0)));
  }
  static JSON(input, reviver) {
    return JSON.parse(_Base64.String(input), reviver);
  }
  static Encode(input, replacer) {
    let buffer;
    let binaryString;
    switch (input.constructor) {
      case ArrayBuffer:
        buffer = new Uint8Array(input);
        break;
      case String:
        buffer = new Uint8Array(EncodeString(input));
        break;
      case Object:
        buffer = new Uint8Array(EncodeAttributes(input));
        break;
      default:
        throw new Error(`Invalid parameter passed as input ${input?.constructor}. Should be `);
    }
    binaryString = Array.from(buffer, (byte) => String.fromCodePoint(byte)).join("");
    try {
      return btoa(binaryString);
    } catch (error) {
      console.cyan(binaryString);
      console.red("btoa error");
      process.exit(1);
    }
  }
  static Replacer(key, value) {
    if (value === void 0) return;
    if (value.constructor == ArrayBuffer) {
      return {
        _buffer_: _Base64.Encode(value),
        _base64_: true
      };
    }
    return value;
  }
  static Reviver(key, value) {
    if (value === void 0) return;
    if (value.constructor == Object) {
      const query = value;
      if (query._buffer_ !== void 0 && query._base64_ === true) return _Base64.ArrayBuffer(query._buffer_);
    }
    return value;
  }
};
var NUMBER_SIZE2 = 8;
var __ArrayBuffer3 = new ArrayBuffer(8);
var DataStreamWriter2 = class _DataStreamWriter {
  static Flush(contents) {
    const streamWriter = new _DataStreamWriter();
    switch (contents.constructor) {
      case String:
        streamWriter.write(EncodeString(contents));
        break;
      case Number:
        streamWriter.write(EncodeNumber(contents));
        break;
      case Object:
        streamWriter.write(EncodeAttributes(contents));
        break;
      case ArrayBuffer:
        streamWriter.write(contents);
        break;
      default:
        throw new Error(`StreamDataWriter.Flush( ... ) passed incompadible parameter ${contents}`);
    }
    return streamWriter.flush();
  }
  _queue = [];
  _frames = [];
  _queueSize() {
    let size = NUMBER_SIZE2;
    for (const data of this._queue) size += NUMBER_SIZE2 + data.byteLength;
    return size;
  }
  get size() {
    let size = 0;
    for (const data of this._frames) size += data.byteLength;
    if (this._queue.length) size += this._queueSize();
    return size;
  }
  write(overload) {
    switch (overload.constructor) {
      case Number:
        this._queue.push(EncodeNumber(overload));
        break;
      case String:
        this._queue.push(EncodeString(overload));
        break;
      case Object:
        this._queue.push(EncodeAttributes(overload));
        break;
      case ArrayBuffer:
        this._queue.push(overload);
        break;
      default:
        throw new Error(`cannot serialize ${overload.constructor}`);
    }
    return this;
  }
  frame() {
    if (this._queue.length == 0) return;
    const queueSize = this._queueSize();
    const exportData = new Uint8Array(queueSize);
    let cursor = 0;
    exportData.set(new Uint8Array(EncodeNumber(queueSize)), cursor);
    cursor += NUMBER_SIZE2;
    for (const data of this._queue) {
      exportData.set(new Uint8Array(EncodeNumber(data.byteLength)), cursor);
      cursor += NUMBER_SIZE2;
      exportData.set(new Uint8Array(data), cursor);
      cursor += data.byteLength;
    }
    this._frames.push(exportData);
    this._queue = [];
  }
  flush() {
    this.frame();
    const exportData = new Uint8Array(this.size);
    let cursor = 0;
    for (const data of this._frames) {
      exportData.set(data, cursor);
      cursor += data.byteLength;
    }
    return exportData.buffer;
  }
};
var DataStreamReader2 = class {
  _start;
  _cursor;
  _data;
  _dataView;
  _size;
  constructor(data, cursor) {
    this._start = cursor || 0;
    this._cursor = this._start;
    this._data = data;
    this._dataView = new DataView(this._data);
    this._size = this._readNumber();
    this.frame();
  }
  *[Symbol.iterator]() {
    this._cursor = this._start + NUMBER_SIZE2;
    while (this._cursor < this._size) {
      const size = this._readNumber();
      const data = this._data.slice(this._cursor, this._cursor + size);
      this._cursor += size;
      yield data;
    }
  }
  _readNumber() {
    const value = this._dataView.getFloat64(this._cursor);
    this._cursor += NUMBER_SIZE2;
    return value;
  }
  _readCharCode() {
    const value = this._dataView.getUint16(this._cursor);
    this._cursor += NUMBER_SIZE2;
    return value;
  }
  get size() {
    return this._size;
  }
  get cursor() {
    return this._cursor;
  }
  read() {
    if (this._size < this._cursor - this._start) throw new Error(`cursor is beyond buffer size { cursor: ${this._cursor}, size: ${this._size} }`);
    const size = this._readNumber();
    const data = this._data.slice(this._cursor, this._cursor + size);
    this._cursor += data.byteLength;
    return data;
  }
  peek(offset) {
    if (this._size < this._cursor - this._start) throw new Error(`cursor is beyond buffer size { cursor: ${this._cursor}, size: ${this._size} }`);
    let cursor = this._cursor + offset;
    const size = this._dataView.getFloat64(cursor);
    cursor += NUMBER_SIZE2;
    const data = this._data.slice(cursor, cursor + size);
    return data;
  }
  frame() {
    if (this._start + NUMBER_SIZE2 == this._cursor) return;
    this._start = this._cursor;
    this._size = this._readNumber();
  }
  complete() {
    return this._cursor == this._data.byteLength;
  }
  skip() {
    const size = this._readNumber();
    this._cursor += size;
  }
  readString() {
    return DecodeString(this.read());
  }
  readAttributes() {
    return DecodeAttributes(this.read());
  }
};
var ColourFormattingReset = "\x1B[0m";
var __ForgeConsoleContext = {
  reset: ColourFormattingReset,
  foreground: "\x1B[36m"
  /* Cyan */
  // ColourFormattingReset;
};
var ColourFormatting = class {
  _debugFormatter;
  stack;
  _defaultColour;
  constructor(debugFormatter, defaultColour) {
    this._debugFormatter = debugFormatter;
    this._defaultColour = defaultColour || "\x1B[0m";
    this.stack = [];
  }
  size() {
    return this.stack.length;
  }
  current() {
    return this.stack[this.stack.length - 1] || this._defaultColour;
  }
  clear() {
    this.stack = [];
  }
  push(value) {
    this._debugFormatter.write(value);
    this.stack.push(value);
    return this._debugFormatter;
  }
  pop() {
    if (this.stack.length == 0) {
      this._debugFormatter.write(this._defaultColour);
    } else {
      this.stack.pop();
      const formattingColor = this.stack[this.stack.length - 1] || this._defaultColour;
      this._debugFormatter.write(formattingColor);
    }
    return this._debugFormatter;
  }
};
var DebugFormatter = class {
  static Init(options) {
    __DebugFormatter;
  }
  foreground;
  fg;
  background;
  bg;
  resetFormatting = ColourFormattingReset;
  stream = "";
  constructor() {
    this.foreground = this.fg = new ColourFormatting(
      this,
      "\x1B[32m"
      /* Green */
    );
    this.background = this.bg = new ColourFormatting(
      this,
      "\x1B[40m"
      /* Grey */
    );
  }
  clear() {
    this.stream = "";
    this.foreground.clear();
    this.background.clear();
    return this;
  }
  write(value) {
    this.stream += value;
    return this;
  }
  reset() {
    this.stream += this.resetFormatting;
    return this;
  }
  parse(input) {
    const tagsRegExp = /(<([\w$_\.]+)\s*>)|(<\/([\w$_\.]+)\s*>)|(<([\w$_\.]+)\s*\/>)/mg;
    const fragments = [];
    let result;
    let lastIndex = 0;
    while (result = tagsRegExp.exec(input)) {
      if (lastIndex < result.index) fragments.push(input.substring(lastIndex, result.index));
      fragments.push(result[0]);
      lastIndex = tagsRegExp.lastIndex;
    }
    if (lastIndex < input.length) fragments.push(input.substring(lastIndex));
    for (const fragment of fragments) {
      switch (fragment.toLowerCase()) {
        case "<black>":
        case "<fg.black>":
          this.foreground.push(
            "\x1B[30m"
            /* Black */
          );
          break;
        case "<red>":
        case "<fg.red>":
          this.foreground.push(
            "\x1B[31m"
            /* Red */
          );
          break;
        case "<green>":
        case "<fg.green>":
          this.foreground.push(
            "\x1B[32m"
            /* Green */
          );
          break;
        case "<yellow>":
        case "<fg.yellow>":
          this.foreground.push(
            "\x1B[33m"
            /* Yellow */
          );
          break;
        case "<blue>":
        case "<fg.blue>":
          this.foreground.push(
            "\x1B[34m"
            /* Blue */
          );
          break;
        case "<magenta>":
        case "<fg.magenta>":
          this.foreground.push(
            "\x1B[35m"
            /* Magenta */
          );
          break;
        case "<cyan>":
        case "<fg.cyan>":
          this.foreground.push(
            "\x1B[36m"
            /* Cyan */
          );
          break;
        case "<white>":
        case "<fg.white>":
          this.foreground.push(
            "\x1B[37m"
            /* White */
          );
          break;
        // backgrounds
        case "<bg.black>":
          this.background.push(
            "\x1B[40m"
            /* Black */
          );
          break;
        case "<bg.red>":
          this.background.push(
            "\x1B[41m"
            /* Red */
          );
          break;
        case "<bg.green>":
          this.background.push(
            "\x1B[42m"
            /* Green */
          );
          break;
        case "<bg.yellow>":
          this.background.push(
            "\x1B[43m"
            /* Yellow */
          );
          break;
        case "<bg.blue>":
          this.background.push(
            "\x1B[44m"
            /* Blue */
          );
          break;
        case "<bg.magenta>":
          this.background.push(
            "\x1B[45m"
            /* Magenta */
          );
          break;
        case "<bg.cyan>":
          this.background.push(
            "\x1B[46m"
            /* Cyan */
          );
          break;
        case "<bg.white>":
          this.background.push(
            "\x1B[47m"
            /* White */
          );
          break;
        // reset
        case "<reset>":
        case "<reset />":
          this.stream += this.resetFormatting;
          break;
        default:
          if (/(<\/(fg\.)?([\w$_]+)\s*>)/.test(fragment)) {
            this.foreground.pop();
          } else if (/(<\/bg\.([\w$_]+)\s*>)/.test(fragment)) {
            this.background.pop();
          } else {
            this.stream += fragment;
          }
      }
    }
    return this;
  }
};
var __DebugFormatter = new DebugFormatter();
console.forge = function(context) {
  if (context.foreground) __ForgeConsoleContext.foreground = context.foreground;
  if (context.reset) {
    __ForgeConsoleContext.reset = context.reset;
    __DebugFormatter.resetFormatting = context.reset;
  }
  return { ...__ForgeConsoleContext };
};
console.parse = function(...rest) {
  console.log(...rest.map(function(log) {
    if (log === void 0) return void 0;
    if (log.constructor == String) return __DebugFormatter.clear().parse(log).reset().stream;
    return log;
  }));
};
console.move = function(x, y) {
  let xCursor;
  if (x == 0) {
    xCursor = "";
  } else if (x < 0) {
    xCursor = `\x1B[${Math.abs(x)}D`;
  } else {
    xCursor = `\x1B[${x}C`;
  }
  let yCursor;
  if (y == 0) {
    yCursor = "";
  } else if (y > 0) {
    yCursor = `\x1B[${y}B`;
  } else {
    yCursor = `\x1B[${Math.abs(y)}A`;
  }
  return xCursor;
};
console.red = function(...rest) {
  process.stdout.write(
    "\x1B[31m"
    /* Red */
  );
  console.log(...rest, __ForgeConsoleContext.reset);
};
console.green = function(...rest) {
  process.stdout.write(
    "\x1B[32m"
    /* Green */
  );
  console.log(...rest, __ForgeConsoleContext.reset);
};
console.yellow = function(...rest) {
  process.stdout.write(
    "\x1B[33m"
    /* Yellow */
  );
  console.log(...rest, __ForgeConsoleContext.reset);
};
console.blue = function(...rest) {
  process.stdout.write(
    "\x1B[34m"
    /* Blue */
  );
  console.log(...rest, __ForgeConsoleContext.reset);
};
console.magenta = function(...rest) {
  process.stdout.write(
    "\x1B[35m"
    /* Magenta */
  );
  console.log(...rest, __ForgeConsoleContext.reset);
};
console.cyan = function(...rest) {
  process.stdout.write(
    "\x1B[36m"
    /* Cyan */
  );
  console.log(...rest, __ForgeConsoleContext.reset);
};
console.white = function(...rest) {
  process.stdout.write(
    "\x1B[37m"
    /* White */
  );
  console.log(...rest, __ForgeConsoleContext.reset);
};
console.black = function(...rest) {
  process.stdout.write(
    "\x1B[30m"
    /* Black */
  );
  console.log(...rest, __ForgeConsoleContext.reset);
};
var AsyncReactivity = Symbol();
var HaltAsyncReactivity = Symbol();
var Reactivity = Symbol();
var HaltReactivity = Symbol();
var Reactor = class {
  _state;
  _setter;
  _getter;
  _delegates = /* @__PURE__ */ new Set();
  constructor(state, transform) {
    this._state = state;
    this._getter = transform?.getter;
    this._setter = transform?.setter;
  }
  _transformSet(state, previous) {
    return this._setter ? this._setter(state, previous) : state;
  }
  _transformGet(state) {
    return this._getter ? this._getter(state) : state;
  }
  _equals(state, previous) {
    return state === previous;
  }
  getter() {
    return this._transformGet(this._state);
  }
  setter(value) {
    const previous = this._state;
    const state = this._transformSet(value, previous);
    if (this._equals(state, previous)) return this._transformGet(previous);
    this._state = state;
    for (const delegate of [...this._delegates]) {
      if (delegate(this._transformGet(state), this._transformGet(previous)) == HaltReactivity) this._delegates.delete(delegate);
    }
    return this._transformGet(state);
  }
  subscribe(delegate) {
    this._delegates.add(delegate);
    delegate(this._transformGet(this._state));
    return this;
  }
  unsubscribe(delegate) {
    this._delegates.delete(delegate);
    return this;
  }
  clear() {
    this._delegates.clear();
  }
  frame(...rest) {
  }
  flush() {
  }
};
var NullState = Symbol();
var Result = class extends QueryManager2 {
  _$promise;
  success;
  constructor(capture) {
    super(new ArrayCollection());
    capture = capture || EmptyFunction;
    this._$promise = $UsePromise({ capture });
  }
  get $async() {
    return this._$promise[0];
  }
  resolve() {
    this._$promise[1](this);
    if (this.success === void 0) this.success = true;
    return this;
  }
  reject() {
    if (this.success === void 0) this.success = false;
    this._$promise[2](this);
    return this;
  }
};
var __ArrayBuffer4 = new ArrayBuffer(64);
var __Uint8Array2 = new Uint8Array(__ArrayBuffer4);
var BuilderConfig = class _BuilderConfig {
  static async $From(options) {
    const { args } = options;
    if (args) {
      const format = args.last(/^format$/);
      const bundled = args.last(/^bundled$/);
      const platform = args.last(/^platform$/);
      const metafile = args.last(/^meta$/);
      const treeShaking = args.last(/^tree-shaking$/i);
      const ignores = await args.$walk(/^ignore$/i);
      const transform = {
        read: [],
        write: []
      };
      const transformArg = args.attributes(/^transform$/);
      if (transformArg?.write?.["obfuscate"] === true) transform.write.push("obfuscate");
      if (transformArg?.write?.["gzip"] === true) transform.write.push("gzip");
      const aliasesArgs = args.attributes(/^alias$/);
      const aliases = {
        files: aliasesArgs.files || {},
        directories: aliasesArgs.directories || {}
      };
      const externals = args.collect(/^external$/, { split: /\s*,\s*/ });
      return new _BuilderConfig({ bundled, format, platform, metafile, treeShaking, ignores, write: "memory", external: externals, transform, aliases });
    }
  }
  bundled;
  platform;
  format;
  metafile;
  external;
  verbose;
  treeShaking;
  ignores;
  aliases;
  write;
  transform;
  constructor(options) {
    this.bundled = options.bundled || "merge";
    this.platform = options.platform || "node";
    this.format = options.format || "cjs";
    this.treeShaking = options.treeShaking || true;
    this.external = options.external || [];
    this.verbose = options.verbose || "all";
    this.metafile = options.metafile === false ? false : true;
    this.ignores = options.ignores || [];
    this.write = options.write || "memory";
    this.transform = {
      read: options.transform?.read || [],
      write: options.transform?.write || []
    };
    this.aliases = {
      files: options.aliases?.files || {},
      directories: options.aliases?.directories || {}
    };
  }
  async $validate() {
    const result = new Result();
    switch (this.platform) {
      case "browser":
      case "node":
      case "neutral":
        break;
      default:
        result.add(new Error(`Invalid Platform: "${this.platform}"`), { platform: true, error: true });
    }
    switch (this.format) {
      case "cjs":
      case "esm":
      case "iife":
        break;
      default:
        result.add(new Error(`Invalid Format: "${this.format}"`), { format: true, error: true });
    }
    switch (this.verbose) {
      case "all":
      case "error":
      case "warn":
      case "log":
        break;
      default:
        result.add(new Error(`Invalid Verbose: "${this.verbose}"`), { verbose: true, error: true });
    }
    return result;
  }
};
var AbstractForgeModelProxy = class extends Subscription {
  _model;
  _bindings = /* @__PURE__ */ new Map();
  constructor(iModel) {
    super();
    this._model = iModel;
  }
  async *[Symbol.asyncIterator]() {
  }
  async $activate() {
  }
  async $deactivate() {
  }
  async $lock(store) {
  }
  async $unlock(hash) {
  }
  async $branch(parent2, child) {
  }
  async $order(parent2, children) {
  }
  async $read(store) {
  }
  async $write(oldStore, data, mime) {
  }
  async $purge(store) {
  }
  async $connect(store, hash) {
  }
  async $mutate(store, mutateStore) {
  }
  async $frame() {
  }
  async $flush() {
  }
  async $message(socket, header, data) {
  }
};
var ForgeModelProxyManager = class {
  _iProxies = /* @__PURE__ */ new Map();
  *[Symbol.iterator]() {
    for (const entry of this._iProxies) yield entry;
  }
  $add(proxy, attributes) {
    if (this._iProxies.has(proxy) === true) throw new Error(`IForgeModelProxy was already added`);
    this._iProxies.set(proxy, attributes);
    return proxy.$activate();
  }
  remove(proxy) {
    if (this._iProxies.has(proxy) === false) throw new Error(`IForgeModelProxy never added`);
    this._iProxies.delete(proxy);
    return proxy.$deactivate();
  }
  async $connect(store, hash) {
    const promises = [];
    for (const [proxy, attributes] of this._iProxies) promises.push(proxy.$connect(store, hash));
    await Promise.allSettled(promises);
  }
  async $mutate(store, mutateStore) {
    const promises = [];
    for (const [proxy, attributes] of this._iProxies) promises.push(proxy.$mutate(store, mutateStore));
    await Promise.allSettled(promises);
  }
  async $branch(parent2, child) {
    const promises = [];
    for (const [proxy, attributes] of this._iProxies) promises.push(proxy.$branch(parent2, child));
    await Promise.allSettled(promises);
  }
  async $order(parent2, children) {
    const promises = [];
    for (const [proxy, attributes] of this._iProxies) promises.push(proxy.$order(parent2, children));
    await Promise.allSettled(promises);
  }
  async $read(store) {
    const promises = [];
    for (const [proxy, attributes] of this._iProxies) promises.push(proxy.$read(store));
    await Promise.allSettled(promises);
  }
  async $write(store, data, mime) {
    const promises = [];
    for (const [proxy, attributes] of this._iProxies) promises.push(proxy.$write(store, data, mime));
    await Promise.allSettled(promises);
  }
  async $purge(store) {
    const promises = [];
    for (const [proxy, attributes] of this._iProxies) promises.push(proxy.$purge(store));
    await Promise.allSettled(promises);
  }
  async $frame() {
    const promises = [];
    for (const [proxy, attributes] of this._iProxies) promises.push(proxy.$frame());
    await Promise.allSettled(promises);
  }
  async $flush() {
    const promises = [];
    for (const [proxy, attributes] of this._iProxies) promises.push(proxy.$flush());
    await Promise.allSettled(promises);
  }
  async $message(iSocket, header, data) {
    const promises = [];
    for (const [proxy, attributes] of this._iProxies) promises.push(proxy.$message(iSocket, header, data));
    await Promise.allSettled(promises);
  }
};
var EmptyArrayBuffer = new ArrayBuffer(0);
var ForgeStore = class _ForgeStore {
  static AssignHash(iStore, hash) {
    iStore._hash = hash;
  }
  static Null = "null";
  static Header = "RemoteStore:1.0.0";
  static Race = 5e3;
  static Empty(attributes) {
    const iStore = new _ForgeStore(attributes);
    iStore.$write(
      EmptyArrayBuffer,
      "forge/undefined"
      /* Undefined */
    );
    return iStore;
  }
  static Number(attributes, value) {
    const iStore = new _ForgeStore(attributes);
    iStore.$write(
      EncodeNumber(value),
      "application/json; charset=utf-16"
      /* JSON */
    );
    return iStore;
  }
  static JSON(attributes, value) {
    const iStore = new _ForgeStore(attributes);
    iStore.$write(
      EncodeAttributes(value),
      "application/json; charset=utf-16"
      /* JSON */
    );
    return iStore;
  }
  static Binary(attributes, value) {
    const iStore = new _ForgeStore(attributes);
    iStore.$write(
      value,
      "forge/binary"
      /* Binary */
    );
    return iStore;
  }
  static String(attributes, value) {
    const iStore = new _ForgeStore(attributes);
    iStore.$write(
      EncodeString(value),
      "text/plain"
      /* Text */
    );
    return iStore;
  }
  static Store(attributes, value, mime) {
    const iStore = new _ForgeStore(attributes);
    iStore.$write(value, mime);
    return iStore;
  }
  _mime;
  _attributes;
  _hash;
  _lock;
  _releasedStore;
  _$onModelConnected = $UsePromise();
  _$model;
  _$onReleased = $UsePromise();
  _$body = $UsePromise();
  _$ready = $UsePromise();
  constructor(overload, model) {
    const capture = async function(error) {
      console.red(error);
      const modelReady = await Promise.race([this._$model[0], false]) ? true : false;
      const bodyReady = await Promise.race([this._$body[0], false]) ? true : false;
      throw new Error(`${this} ${modelReady === false ? "{ model }" : ""} ${bodyReady === false ? "{ body }" : ""} race failed`);
    }.bind(this);
    this._$model = $UseRace(_ForgeStore.Race, { capture });
    this._$body = $UseRace(_ForgeStore.Race, { capture });
    if (overload instanceof DataStreamReader2) {
      const readStream = overload;
      const { hash, parent: parent2, attributes, mime, data } = this._import(readStream);
      this._$body[1]([data, mime]);
      this._hash = hash;
      this._attributes = attributes;
      this._mime = mime;
      const selfie = this;
      this._$raceIModel().then(function(model2) {
        model2.$import(selfie, { parent: parent2, data, mime });
      });
    } else {
      const attributes = overload;
      this._attributes = attributes;
      this._mime = "forge/undefined";
    }
    if (model !== void 0) this._$onModelConnected[1](model);
    this._$onModelConnected[0].then(this._$thenConnectModel);
    const $ready = this._$ready;
    Promise.all([this._$body[0], this._$model[0]]).then(function(resolves) {
      $ready[1](this);
    });
  }
  async *[Symbol.asyncIterator]() {
    const model = await this._$raceIModel();
    const iStores = await model.$traverse(this);
    for await (const iStore of iStores) {
      yield [iStore, iStore.attributes];
    }
  }
  /*
  *
  * Private members
  * 
  */
  _$thenChildren = async function(model) {
    return model.$children(this);
  }.bind(this);
  _$thenAncestry = async function(model) {
    return model.$ancestry(this);
  }.bind(this);
  _$thenParent = async function(model) {
    return model.$parent(this);
  }.bind(this);
  /*
   *
   * Protected members
   * 
   */
  _import(streamReader) {
    const header = streamReader.skip();
    const attributes = streamReader.readAttributes();
    const hash = streamReader.readString();
    const parent2 = streamReader.readString();
    const mime = streamReader.readString();
    const data = streamReader.read();
    return { hash, parent: parent2, attributes, mime, data };
  }
  async _$raceIModel() {
    await Promise.race([this._$onReleased[0], Promise.resolve()]);
    return this._$model[0];
  }
  _$thenConnectModel = async function(model) {
    const hash = await model.$connect(this);
    this._hash = this._hash || hash;
    this._$model[1](model);
  }.bind(this);
  /*
  *
  * Getters and Setters
  *
  */
  get hash() {
    return this._hash;
  }
  get attributes() {
    return this._attributes;
  }
  get $children() {
    return this._$raceIModel().then(this._$thenChildren);
  }
  get $parent() {
    return this._$raceIModel().then(this._$thenParent);
  }
  get $ancestry() {
    return this._$raceIModel().then(this._$thenAncestry);
  }
  /**
   * 
   * Public members
   * 
   */
  write(buffer, mime) {
    this.$write(buffer, mime);
    return this;
  }
  $ready(race) {
    return $RacePromise(this._$ready[0], race);
  }
  async $connect(model) {
    this._$onModelConnected[1](model);
    await this._$model[0];
    return this;
  }
  async $lock() {
    const model = await this._$raceIModel();
    this._lock = await model.$lock(this);
  }
  async $unlock() {
    const model = await this._$raceIModel();
    await model.$unlock(this._lock);
    this._lock = void 0;
  }
  async $hasLock() {
    return this._lock === void 0 ? false : true;
  }
  async $purge() {
    const model = await this._$raceIModel();
    const iStores = await model.$purge(this);
    this._$onReleased[2]("store already released");
    return iStores;
  }
  async $branch(child) {
    const model = await this._$raceIModel();
    return model.$branch(this, child);
  }
  async $fork(mappings) {
    throw "not yet ready for usage";
    const root = await this.$clone();
    mappings && mappings.set(this, root);
    const children = await this.$children;
    for (const child of children) {
      const forkedStore = await child.$fork(mappings);
      await root.$branch(forkedStore);
    }
    return root;
  }
  async $clone() {
    const [buffer, mime] = await this._$body[0];
    return new _ForgeStore(this._attributes).write(buffer, mime);
  }
  async $order(iForgeStores) {
    const model = await this._$raceIModel();
    return model.$order(this, iForgeStores);
  }
  async $write(data, mime) {
    if (data === void 0 && mime !== "forge/undefined") throw new Error(`undefined add to non-empty store : ${this}`);
    const model = await this._$raceIModel();
    this._mime = mime;
    const currentStore = await model.$write(this, data, mime);
    this._$body[1]([data, mime]);
    return currentStore;
  }
  async $read() {
    try {
      const model = await this._$raceIModel();
      return model.$read(this);
    } catch (error) {
      return this._$body[0];
    }
  }
  async $mutate(data, mime) {
    const model = await this._$raceIModel();
    this._$onReleased[2]("store already released");
    const mutateStore = new _ForgeStore({ ...this._attributes });
    this._releasedStore = mutateStore;
    await mutateStore.$connect(model);
    await mutateStore.$write(data, mime);
    await model.$mutate(this, mutateStore);
    return mutateStore;
  }
  async $query(recursive) {
    const model = await this._$raceIModel();
    return model.$query(this, recursive);
  }
  async $upgrade(queries) {
    const self = this;
    return new Promise(async function(resolve, reject) {
      const iStores = /* @__PURE__ */ new Set([self]);
      for (const { delegate, parameters, recursive } of queries) {
        const parents = [...iStores];
        iStores.clear();
        for (const parent2 of parents) {
          const iQuery = await parent2.$query(recursive);
          for (const [iStore, attribute] of iQuery.filter(delegate, ...parameters)) iStores.add(iStore);
        }
        if (iStores.size == 0) return resolve([self]);
      }
      reject([...iStores]);
    });
  }
  async $find(callback) {
    const results = [];
    for await (const [iStore, attributes] of this) {
      if (callback(iStore, attributes) === true) results.push(iStore);
    }
    return results;
  }
  async $import(readStream) {
    const { hash, parent: parent2, attributes, mime, data } = this._import(readStream);
    this._hash = hash;
    this._attributes = attributes;
    const model = await this._$raceIModel();
    await model.$import(this, { parent: parent2, mime, data });
    this._$body[1]([data, mime]);
    return this;
  }
  async $export(excludeBody) {
    const model = await this._$raceIModel();
    const headerData = EncodeString(_ForgeStore.Header);
    const attributeData = EncodeAttributes(this._attributes);
    const hashData = EncodeString(this._hash);
    const mimeData = EncodeString(this._mime);
    const parent2 = await this.$parent;
    const parentHash = parent2.hash || _ForgeStore.Null;
    const parentData = EncodeString(parentHash);
    if (excludeBody === true) return { header: headerData, attributes: attributeData, hash: hashData, parent: parentData, mime: mimeData };
    const [data, mime] = await this.$read();
    return { header: headerData, attributes: attributeData, hash: hashData, parent: parentData, mime: mimeData, data };
  }
  async $stream(excludeBody) {
    const exportObj = await this.$export(excludeBody);
    const streamWriter = new DataStreamWriter2();
    streamWriter.write(exportObj.header).write(exportObj.attributes).write(exportObj.hash).write(exportObj.parent).write(exportObj.mime);
    if (excludeBody !== false) streamWriter.write(exportObj.data);
    return streamWriter.flush();
  }
  async *$render(options) {
    let previousParent;
    const parents = [];
    for await (const [iStore, attributes] of this) {
      const currentParent = await iStore.$parent;
      if (currentParent === void 0) {
        if (options.$onRender) yield options.$onRender(iStore);
        continue;
      }
      previousParent = parents[parents.length - 1];
      if (iStore == this) {
      } else if (currentParent != previousParent) {
        if (parents.indexOf(currentParent) == -1) {
          if (options.$onStartGroup) yield options.$onStartGroup(iStore, previousParent);
          parents.push(currentParent);
        } else {
          while (parents[parents.length - 1] != currentParent) {
            if (options.$onEndGroup) yield options.$onEndGroup(iStore, previousParent);
            parents.pop();
          }
        }
      } else {
      }
      if (options.$onRender) yield options.$onRender(iStore);
    }
    for (const iStore of parents) {
      if (options.$onEndGroup) yield options.$onEndGroup(iStore, previousParent);
      previousParent = iStore;
    }
  }
  toString() {
    const released = this._releasedStore === void 0 ? "active" : "released";
    return `<RemoteStore  ${JSON.stringify(this._attributes)}  [${this._mime}]> - ${this._hash}`;
  }
};
var ModelReactor = class extends Reactor {
  _stores;
  constructor() {
    const frameStores = /* @__PURE__ */ new Set();
    super({}, {
      getter: function(state) {
        return { frame: [...frameStores], ...state };
      },
      setter: function(newState, oldState) {
        for (const [key, values] of Object.entries(newState)) {
          for (const store of values) frameStores.add(store);
        }
        return newState;
      }
    });
    this._stores = frameStores;
  }
  /**
   * All setters will dispatch subscriptions
   * @param state
   * @param previous
   * @returns
   */
  frame() {
    this._state = {};
    this._stores.clear();
  }
};
var ForgeModel = class _ForgeModel {
  _hash;
  _root;
  _state;
  _proxies = new ForgeModelProxyManager();
  _topology = new Topology();
  _hashes = /* @__PURE__ */ new Map();
  _$bodies = /* @__PURE__ */ new Map();
  _waitingStores = /* @__PURE__ */ new Map();
  _locks = /* @__PURE__ */ new Map();
  [Reactivity] = new ModelReactor();
  race = 500;
  constructor(overload) {
    this._state = QuickHash();
    if (overload === void 0) {
      this._root = ForgeStore.Empty({ root: true });
    } else if (overload.constructor == Object) {
      this._root = ForgeStore.Empty(overload);
    } else {
      this._root = overload;
    }
    this._topology.add(this._root, this._root.attributes);
    this._hashes.set(this._root, "root");
    this._locks.set(this._root, QuickHash());
    ForgeStore.AssignHash(this._root, "root");
    const $race = $UseRace(this.race);
    $race[1](this._root);
    this._waitingStores.set("root", $race);
    this._root.$connect(this).catch(function() {
      console.warn("root connect failed");
    });
    this[Reactivity].subscribe(function(state) {
      this._state = QuickHash();
    }.bind(this));
  }
  *[Symbol.iterator]() {
    for (const entry of this._topology) {
      if (entry[0] == this._root) continue;
      yield entry;
    }
  }
  async *[Symbol.asyncIterator]() {
    for (const entry of this._topology) {
      if (entry[0] == this._root) continue;
      yield entry;
    }
  }
  _nextHash() {
    let hash = QuickHash();
    while (hash === void 0) {
      hash = QuickHash();
      for (const [iStore, storeHash] of this._hashes) {
        if (storeHash == hash) {
          hash = void 0;
          break;
        }
      }
    }
    return hash;
  }
  _$fetchWaitingStore(hash) {
    if (this._waitingStores.has(hash) === false) {
      this._waitingStores.set(hash, $UseRace(this.race, {
        capture: true
        /*function (iStore: IForgeStore) {
        
                            console.log("race for store failed --------", hash, iStore);
        
                        } */
      }));
    }
    return this._waitingStores.get(hash);
  }
  async _$remove(store) {
    const hash = this._hashes.get(store);
    this._topology.remove(store);
    this._hashes.delete(store);
    this._waitingStores.delete(hash);
    this._$bodies.delete(store);
  }
  /*
  *
  *   Getters & Setters
  *
  */
  get state() {
    return this._state;
  }
  get root() {
    return this._root;
  }
  get proxies() {
    return this._proxies;
  }
  async $hash(iStore) {
    return this._hashes.get(iStore);
  }
  async $attributes(iStore) {
    return this._topology.attributes(iStore);
  }
  async $children(iStore) {
    return this._topology.children(iStore).slice();
  }
  async $parent(iStore) {
    return this._topology.parent(iStore);
  }
  async $ancestry(iStore) {
    return this._topology.ancestry(iStore);
  }
  get(query) {
    for (const [iStore, hash] of this._hashes) if (hash === query) return iStore;
  }
  async $fork(stores, options) {
    throw "not yet READY for implemention";
    const model = new _ForgeModel(options?.root);
    const root = model.root;
    const mappings = options?.mappings || /* @__PURE__ */ new Map();
    for (const store of stores) {
      if (options?.topology === false) {
        const descendants = await this.$traverse(store);
        for (const descendant of descendants) {
          const clonedStore = await descendant.$clone();
          await root.$branch(clonedStore);
          mappings.set(descendant, clonedStore);
        }
      } else {
        const forkedStore = await store.$fork(mappings);
        await root.$branch(forkedStore);
      }
    }
    return model;
  }
  async $branch(parent2, child) {
    if (this._topology.has(parent2) === false) throw new Error("parent is not connected to this model");
    await child.$connect(this);
    this._topology.move(child, parent2);
    this[Reactivity].setter({ branch: [child] });
    await this._proxies.$branch(parent2, child);
    return child;
  }
  async $order(parent2, children) {
    this._topology.order(parent2, children);
    this[Reactivity].setter({ order: children });
    await this._proxies.$order(parent2, children);
  }
  async $traverse(iStore) {
    return Array.from(this._topology.traverse(iStore, /* @__PURE__ */ new Set()));
  }
  async $connect(store, options) {
    if (store == this._root) return this._hashes.get(this._root);
    let warnings = [];
    let hash;
    if (this._hashes.has(store) === false) {
      hash = options?.hash || this._nextHash();
      this._hashes.set(store, hash);
    } else {
      hash = store.hash;
      warnings.push(`already has an hash assigned`);
    }
    if (this._topology.has(store) === false) {
      const parent2 = options?.parent || this._root;
      this._topology.add(store, store.attributes, parent2);
    } else {
      console.log(store.attributes, this._topology.parent(store).attributes);
      warnings.push(`store already in topology`);
    }
    if (this._$bodies.has(store) === false) {
      const hasBody = options?.data !== void 0 && options.mime !== void 0 && options.mime !== "forge/undefined";
      if (hasBody) this._$bodies.set(store, [options.data, options.mime]);
    } else {
      const data = this._$bodies.get(store);
      warnings.push(`already has data assigned : ${data && data[1]}`);
    }
    const $iStore = this._$fetchWaitingStore(hash);
    $iStore[1](store);
    this._waitingStores.set(hash, $iStore);
    if (warnings.length) {
      console.red(`ForgeModel.$connect( ... ) ? : ${store} : 
	${warnings.join("\n	")}`);
    } else {
    }
    this[Reactivity].setter({ connect: [store] });
    await this._proxies.$connect(store, hash);
    return hash;
  }
  async $purge(store) {
    const traversedStores = [store, ...await this.$traverse(store)];
    for (const iStore of traversedStores) await this._$remove(iStore);
    this[Reactivity].setter({ purge: traversedStores });
    await this._proxies.$purge(store);
    return traversedStores;
  }
  async $hasLock(store) {
    return this._locks.has(store);
  }
  async $lock(store) {
    if (this._locks.has(store)) throw new Error(`${store} is already locked in IForgeModel`);
    let hash;
    while (hash === void 0) {
      hash = QuickHash();
      for (const [lockedStore, lock] of this._locks) if (hash == lock) hash = void 0;
    }
    this._locks.set(store, hash);
    this[Reactivity].setter({ lock: [store] });
    return hash;
  }
  async $unlock(hash) {
    let unlockedStore;
    for (const [store, lock] of this._locks) {
      if (hash != lock) continue;
      this._locks.delete(store);
      return store;
    }
    throw new Error(`lock does not exist`);
  }
  async $import(iStore, importData) {
    const hash = iStore.hash;
    const { data, mime } = importData;
    const $race = this._$fetchWaitingStore(hash);
    $race[1](iStore);
    this._hashes.set(iStore, hash);
    this._$bodies.set(iStore, [data, mime]);
    const queryParent = importData.parent;
    const parent2 = queryParent.constructor === String ? await this.$wait(queryParent) : queryParent;
    this._topology.add(iStore, iStore.attributes, parent2);
    return iStore;
  }
  async $frame() {
    this[Reactivity].frame();
    await this._proxies.$frame();
    return this;
  }
  async $flush() {
    this[Reactivity].flush();
    await this._proxies.$flush();
    return this;
  }
  async $query(root, recursive) {
    root = root || this._root;
    if (this._topology.has(root) === false) throw new Error(`parent parameter is not part of this model ${root}`);
    const queryManager = new QueryManager2();
    if (recursive === false) {
      const children = await this.$children(root);
      for (const iStore of children) queryManager.add(iStore, iStore.attributes);
    } else {
      const iStores = await this.$traverse(root);
      for (const iStore of iStores) queryManager.add(iStore, iStore.attributes);
    }
    return queryManager;
  }
  async $write(store, data, mime) {
    if (this._$bodies.has(store)) return store.$mutate(data, mime);
    this._$bodies.set(store, [data, mime]);
    this[Reactivity].setter({ write: [store] });
    await this._proxies.$write(store, data, mime);
    return store;
  }
  async $mutate(store, mutatedStore) {
    this._topology.mutate(store, mutatedStore);
    await this._$remove(store);
    this[Reactivity].setter({ mutate: [store], write: [mutatedStore] });
    await this._proxies.$mutate(store, mutatedStore);
    return mutatedStore;
  }
  async $validate(iStore) {
    const iResult = new Result();
    if (this._topology.has(iStore)) iResult.add({ error: `store is not part of topology` }, { error: true, topology: true });
    if (this._hashes.has(iStore)) iResult.add({ error: `store is not connected` }, { error: true, released: true });
    const parent2 = await iStore.$parent;
    if (this._topology.has(parent2) === false) iResult.add({ error: `parent parameter is not part of this model ${parent2}` }, { error: true, parent: true });
    return iResult;
  }
  async $wait(hash) {
    const $parent = this._$fetchWaitingStore(hash);
    return $parent[0];
  }
  async $read(iStore) {
    await this._proxies.$read(iStore);
    return this._$bodies.get(iStore) || [
      new ArrayBuffer(0),
      "forge/undefined"
      /* Undefined */
    ];
  }
  async $message(iSocket, header, data) {
    const promises = [];
    await this._proxies.$message(iSocket, header, data);
    await Promise.allSettled(promises);
  }
  toString() {
    let output = "";
    for (const iStore of this._topology.traverse(this._root, /* @__PURE__ */ new Set())) {
      const ancestorsLength = this._topology.ancestry(iStore).length;
      output += "   ".repeat(ancestorsLength) + String(iStore) + `
`;
    }
    return output;
  }
};
var ForgeRace = class {
  _default;
  _race = /* @__PURE__ */ new Map();
  constructor(overload) {
    if (overload instanceof Map) {
    } else if (overload.constructor.name == "Object") {
      const race = overload;
      const entries = [...Object.entries(race)];
      if (race.length == 0 || race === void 0) throw new Error(`race requires at least 1 entry for defaults`);
      if (race.constructor.name != "Object") throw new Error(`race should be an Object with RegExp as keys : ${race}`);
      this._default = 0;
      for (const [key, value] of entries) {
        this._race.set(new RegExp(key), value);
        this._default = Math.max(value, this._default);
      }
    } else {
      throw new Error(`Invalid arguments passed to new ForgeRace( ${overload} )`);
    }
  }
  query(value) {
    if (value === void 0) return this._default;
    let result = 0;
    for (const [regExp, race] of this._race) {
      if (regExp.test(value)) return race;
      result = Math.max(race, result);
    }
    return result;
  }
};
var __ForgeProtocol = "forge://";
var ForgeSocketRouting = class {
  _iSocket;
  constructor(iSocket) {
    this._iSocket = iSocket;
  }
  _sanitizeResults(data) {
    if (data === void 0) data = {};
    if ("status" in data === false) data.status = void 0;
    if ("writes" in data === false) data.writes = [];
    if ("open" in data === false) data.open = void 0;
    return data;
  }
  async $authorize(request, response, options) {
    try {
      const race = options?.race || this._iSocket.race("routing.authorize");
      const [serialize, error] = await this._iSocket.$session({ route: "authorize" }, { request: await request.$export(options.race), response: await response.$export() }, race, options?.capture);
      if (error) return false;
      const { headers, cookies, authorized, status, writes, open } = this._sanitizeResults(serialize);
      response.header(headers);
      response.cookie(cookies);
      if (status !== void 0) response.status = status;
      for (const data of writes) response.write(data);
      if (open === false) response.end();
      return authorized;
    } catch (error) {
      console.red("ForgeSocketRouting.$authorize error", String(error));
      return false;
    }
  }
  async $resolve(request, response, options) {
    try {
      const race = options?.race || this._iSocket.race("routing.resolve");
      const capture = options?.capture || true;
      const [serialize, error] = await this._iSocket.$session({ route: "resolve" }, { request: await request.$export(options.race), response: await response.$export() }, race, capture);
      if (error) return true;
      const { headers, cookies, status, open, writes, resolved } = this._sanitizeResults(serialize);
      response.header(headers);
      response.cookie(cookies);
      if (status !== void 0) response.status = status;
      for (const data of writes) response.write(data);
      if (open === false) response.end();
      return resolved;
    } catch (error) {
      console.red("$resolve error", String(error));
      return true;
    }
  }
  async $reject(request, response, options) {
    try {
      const race = options?.race || this._iSocket.race("routing.reject");
      const capture = options?.capture || true;
      const [serialize, error] = await this._iSocket.$session({ route: "reject" }, { request: await request.$export(options.race), response: await response.$export() }, race, capture);
      const { headers, cookies, status, open, writes, rejected } = this._sanitizeResults(serialize);
      response.header(headers);
      response.cookie(cookies);
      if (status !== void 0) response.status = status;
      if (writes.length > 0) for (const data of writes) response.write(data);
      if (open === false) response.end();
      return rejected;
    } catch (error) {
      console.red("$reject error", String(error));
      return true;
    }
  }
};
var MultiPartCollector = class {
  _$race;
  _$complete = $UsePromise();
  _$parts = [];
  constructor(header, capture) {
    const { multi_part, frames, race } = header;
    const $parts = this._$parts;
    for (let i = 0; i < frames; i++) $parts.push($UsePromise({ capture }));
    const $buffers = Promise.all(this._$parts.map(($buffer) => $buffer[0]));
    const $race = this._$race = $UseRace(race, { capture });
    const $complete = this._$complete;
    $race[0].catch(function(error) {
      const reject = "multi-part rrace failed";
    });
    $buffers.then(function(resolves) {
      $race[1]();
      let totalBytes = 0;
      for (const buffer of resolves) totalBytes += buffer.byteLength;
      const uint8Array = new Uint8Array(totalBytes);
      let cursor = 0;
      for (const buffer of resolves) {
        uint8Array.set(buffer, cursor);
        cursor += buffer.byteLength;
      }
      $complete[1](uint8Array.buffer);
    });
  }
  get $complete() {
    return this._$complete[0];
  }
  add(header, data) {
    const { index } = header;
    const { buffer } = data;
    this._$parts[index][1](new Uint8Array(buffer));
  }
};
var AbstractForgeSocket = class extends Subscription {
  _name;
  _key;
  _reboot;
  _stdio;
  _$local = $UsePromise();
  _$remote = $UsePromise();
  _race;
  _sessions = /* @__PURE__ */ new Map();
  _bindings = /* @__PURE__ */ new Map();
  _routing = new ForgeSocketRouting(this);
  _collectors = /* @__PURE__ */ new Map();
  constructor(name, config) {
    super();
    this._name = name;
    this._key = config.key || QuickHash();
    if (config.race === void 0) throw new Error(`No valid values for race conditions in ${this.constructor.name} : ${config.race}`);
    this._race = new ForgeRace(config.race);
    const stdio = config.stdio || "pipe";
    switch (stdio.toLowerCase()) {
      case "pipe":
        this._stdio = "pipe";
        break;
      case "inherit":
        this._stdio = "inherit";
        break;
      case "silent":
        this._stdio = "silent";
        break;
      default:
        throw new Error(`Invalid stdio option ( "pipe" | "inherit" | "silent" ): ${config.stdio}`);
    }
    this._bindings.set(this._pipeStdio, this._pipeStdio.bind(this));
    this._bindings.set(this._pipeError, this._pipeError.bind(this));
    this._bindings.set(this.read, this.read.bind(this));
    this._$local[0].then(this._$thenStart.bind(this));
  }
  _pipeStdio(message) {
    const output = [];
    const lines = String(message).split(/\r\n|\r|\n/g);
    for (const line of lines) {
      try {
        const [forge, header, data] = JSON.parse(line);
        if (header.key != this._key) return;
        this.read([forge, header, data]);
      } catch (error) {
        if (line != "") output.push(line);
      }
    }
    if (output.length && (this._stdio == "pipe" || this._stdio == "inherit")) console.parse(`<cyan>${output.join("\n")}</cyan>`);
  }
  _pipeError(message) {
    const output = [];
    const lines = String(message).split(/\r\n|\r|\n/g);
    for (const line of lines) {
      try {
        const [forge, header, data] = JSON.parse(line);
        if (header.key != this._key) return;
        this.read([forge, header, data]);
      } catch (error) {
        if (line != "") output.push(line);
      }
    }
    if (output.length && (this._stdio == "pipe" || this._stdio == "inherit")) console.parse(`<magenta>${output.join("\n")}</magenta>`);
  }
  _getSession(race) {
    const key = QuickHash();
    const sessions = this._sessions;
    const result = [void 0, void 0];
    const session = new GenericSession({
      race,
      capture(error) {
        result[0] = void 0;
        result[1] = error;
        return result;
      }
    });
    session.$promise[0].finally(function() {
      sessions.delete(key);
    });
    this._sessions.set(key, session);
    return [key, session.$promise[0].then(function(resolve) {
      if (result[0] === void 0 && result[1] === void 0) {
        result[0] = resolve;
        result[1] = void 0;
      }
      return result;
    })];
  }
  async _$thenStart(data) {
    const race = this._race.query("start");
    const [session, $promise] = this._getSession(race);
    this.write({ key: this._key, ready: true, session, race }, data);
    return $promise;
  }
  get key() {
    return this._key;
  }
  get name() {
    return this._name;
  }
  get routing() {
    return this._routing;
  }
  race(value) {
    return this._race.query(value);
  }
  get $ready() {
    return Promise.all([this._$local[0], this._$remote[0]]).then(function(resolves) {
      return { local: resolves[0], remote: resolves[1] };
    });
  }
  async $connect(data) {
    this._$local[1](data);
    return this._$remote[0];
  }
  read(message) {
    try {
      const [protocol, header, data] = message;
      if (protocol != __ForgeProtocol) return;
      if ("ready" in header) {
        this._$remote[1](data);
        this._$local[0].then(function(data2) {
          this.resolve(header, data2);
        }.bind(this));
        return true;
      }
      if ("broadcast" in header) {
        this.notify("broadcast", this, header, data);
        return true;
      }
      if (header.key != this._key) return;
      if ("renew" in header) {
        const $race = this._sessions.get(header.renew);
        if ("expiry" in data) {
          const expiry = data.expiry;
          $race?.renew(expiry - Date.now());
        } else {
          const delay = data.delay;
          $race?.renew(delay);
        }
        console.red("RENEW SESSION", data);
        console.red("RENEW SESSION");
        console.yellow("RENEW SESSION");
        console.red("RENEW SESSION");
        console.red("RENEW SESSION");
      } else if ("resolve" in header) {
        const session = this._sessions.get(header.resolve);
        session?.$promise[1](data);
      } else if ("reject" in header) {
        const session = this._sessions.get(header.reject);
        session?.$promise[2](data);
      } else if ("multi_part" in header) {
        const { multi_part } = header;
        if (this._collectors.has(multi_part) === false) {
          const collectors = this._collectors;
          const collector2 = new MultiPartCollector(header, new Error(`Multi-part time out`));
          collector2.$complete.then(function(buffer) {
            const message2 = DecodeAttributes(buffer);
            ;
            this.read(message2);
          }.bind(this)).catch(function(error) {
            console.green("what happened", error);
          }).finally(function() {
            collectors.delete(multi_part);
          });
          this._collectors.set(multi_part, collector2);
        }
        const collector = this._collectors.get(multi_part);
        collector.add(header, data);
        return true;
      } else {
        this.notify("message", this, header, data);
      }
      return true;
    } catch (error) {
      console.parse(`<green>${this._name} <cyan>${message}`, error);
    }
    return false;
  }
  write(header, data) {
    throw new Error("Please override write(...) in subclasses");
  }
  resolve(header, data) {
    this.write({ key: header.key, resolve: header.session }, data);
  }
  reject(header, data) {
    this.write({ key: header.key, reject: header.session }, data);
  }
  async $reset(data) {
    return [{ name: this._name, reset: this.constructor.name }, void 0];
  }
  $session(header, data, race) {
    const [session, $promise] = this._getSession(race);
    this.write({ ...header, session, race }, data);
    return $promise;
  }
  $signal(signal, data, options) {
    const race = options?.race || this._race.query(signal);
    const [session, $promise] = this._getSession(race);
    this.write({ signal, session }, data);
    return $promise;
  }
  async $broadcast(signal, data, race) {
    throw "NOT IMPLMENTED";
  }
  async $reboot() {
  }
};
var { spawn: spawn3, fork: fork3, exec: exec4, execSync: execSync4 } = __require("child_process");
var SpawnSocket = class extends AbstractForgeSocket {
  _source;
  _commands;
  constructor(name, config, source) {
    super(name, config);
    console.log("SpawnService", name, config, source?.constructor.name);
    if (source) {
      this._source = source;
    } else {
      this._commands = config.command.split(/\s+/g);
      const env = { ...config.env, FORGE_KEY: this._key, FORGE_SOCKET: "spawn" };
      this._source = spawn3(this._commands[0], this._commands.slice(1), { stdio: "pipe", env });
      console.red("---->>>", __filename, "\n", __dirname);
    }
    this._source.stdout.on("data", function(message) {
      console.cyan(String(message));
    });
    this._source.stdout.on("data", this._bindings.get(this._pipeStdio));
    this._source.on("exit", this._onExit.bind(this));
  }
  /* protected async _$thenStart(data: Serialize): Promise<Serialize> {
  
          console.green("_$thenStart testing");
  
          return super._$thenStart(data);
  
      } */
  _onExit() {
    console.blue("on exited spawn");
  }
  write(header, ...data) {
    const key = this._key;
    this._source.stdout.write(JSON.stringify(["forge://", { ...header, key }, ...data]) + "\n");
  }
};
var { spawn: spawn4, fork: fork4, exec: exec5, execSync: execSync5 } = __require("child_process");
var ForkSocket = class extends AbstractForgeSocket {
  _source;
  _commands;
  _args;
  constructor(name, config, source) {
    super(name, config);
    if (source === void 0) {
      const controller = new AbortController();
      const { signal } = controller;
      this._commands = config.command.split(/\s+/g);
      this._args = [...this._commands.slice(1), "--key--", this._key, "{{data}}"];
      const env = { ...config.env, FORGE_KEY: this._key, FORGE_SOCKET: "fork" };
      this._source = source || fork4(this._commands[0], this._args, { stdio: "pipe", signal, env });
    } else {
      this._source = source;
    }
    this._source.stdout.on("data", this._bindings.get(this._pipeStdio));
    this._source.stderr.on("data", this._bindings.get(this._pipeError));
    this._source.on("exit", this._onExit.bind(this));
    this._source.on("message", this._bindings.get(this.read));
  }
  _onExit() {
    if (this._source !== process) {
      console.parse("<red>fork ( client ) service ended", this._commands);
    } else {
      if (this._reboot) {
        const controller = new AbortController();
        const { signal } = controller;
        this._source = fork4(this._commands[0], this._args, { stdio: "pipe", signal });
        this._source.stdout.on("data", this._bindings.get(this._pipeStdio));
        this._source.stderr.on("data", this._bindings.get(this._pipeError));
        this._source.on("exit", this._onExit.bind(this));
        this._source.on("message", this._bindings.get(this.read));
      } else {
        this.notify("exit", this);
      }
    }
  }
  write(header, data) {
    const key = this._key;
    this._source.send(["forge://", { ...header, key }, data]);
  }
};
var ClientSocketModelProxy = class extends AbstractForgeModelProxy {
  _socket;
  _rootHash;
  _state;
  _iStoreRemap = /* @__PURE__ */ new Map();
  _$ready = $UsePromise();
  _queue = [];
  constructor(model, socket) {
    super(model);
    this._socket = socket;
    this._socket.$ready.then(this._$thenISocketReady.bind(this));
  }
  async _$thenISocketReady() {
    const model = this._model;
    this._$ready[1](model);
  }
  async _$queue(header, data) {
    const socket = this._socket;
    const queue = this._queue;
    const length2 = queue.length;
    const $previous = length2 ? this._queue[length2 - 1] : Promise.resolve({ state: this._state });
    const $promise = new Promise(async function(resolve, reject) {
      const previous = await $previous;
      for (let i = 0; i < 5; i++) {
        const [current, error] = await socket.$session({ ...header, state: previous.state }, data, socket.race(), new Error(`ClientSocketModelProxy._$queue`));
        if (current) return resolve(current);
      }
      reject(new Error("Queue failed for ClientSocketModelProxy"));
    });
    queue.push($promise);
    return $promise;
  }
  get $ready() {
    return this._$ready[0];
  }
  async $message(iSocket, header, data) {
    if ("model" in header) {
      switch (header.model) {
        case "flush":
        case "frame":
          {
            let buffer;
            if (data.buffer.constructor === ArrayBuffer) {
              buffer = data.buffer;
            } else if (data.buffer.constructor === String) {
            } else {
              return iSocket.reject(header, { error: `incorrect file format provided for buffer` });
            }
            const readStream = new DataStreamReader2(buffer);
            const promises = [];
            while (readStream.complete() === false) {
              readStream.frame();
              const iStore = new ForgeStore(readStream);
              iStore.$connect(this._model);
              promises.push(iStore.$ready(2500).catch(function(error) {
                console.log("" + error);
                console.green(iStore.attributes);
                return iStore;
              }));
            }
          }
          break;
      }
    }
  }
  async $activate() {
    await this._$ready[0];
    const iModel = this._model;
    const root = iModel.root;
    const resolve = await this._$queue({ model: "activate" }, root.attributes);
    const { hash, state } = resolve;
    this._iStoreRemap.set(root, hash);
    this._state = state;
  }
  async $connect(iStore, hash) {
    await this._$ready[0];
    const resolve = await this._$queue({ model: "connect", state: this._state }, iStore.attributes);
    const { store, state } = resolve;
    this._iStoreRemap.set(iStore, store);
    this._state = state;
    console.yellow(resolve);
  }
  async $mutate(iStore, mutateStore) {
    await this._$ready[0];
    const mutate = this._iStoreRemap.get(mutateStore);
    const store = this._iStoreRemap.get(iStore);
    const resolve = await this._$queue({ model: "mutate", state: this._state, mutate, store }, {});
    this._state = resolve.state;
  }
  async $branch(parent2, child) {
    await this._$ready[0];
    if (this._iStoreRemap.has(parent2) === false) throw new Error(`parent does exist remotely`);
    if (this._iStoreRemap.has(child) === false) throw new Error(`child does not exist`);
    const resolve = await this._$queue({ model: "fork", state: this._state, parent: this._iStoreRemap.get(parent2), child: this._iStoreRemap.get(child) }, child.attributes);
    this._state = resolve.state;
  }
  async $write(iStore, data, mime, replacementStore) {
    await this._$ready[0];
    const hash = this._iStoreRemap.get(iStore);
    if (hash === void 0) throw new Error("no store linked for writing");
    const resolve = await this._$queue({ model: "write", state: this._state, write: hash }, { data, mime });
    this._state = resolve.state;
  }
  async $frame() {
    this._socket.write({ model: "frame" }, {});
  }
  async $flush() {
    this._socket.write({ model: "flush" }, {});
  }
};
var ForgeHTTPCookies = class {
  _raw;
  _cookies = {};
  constructor(options) {
  }
  get size() {
    return Object.entries(this._cookies).length;
  }
  set(key, value) {
    const previous = this._cookies[key];
    this._cookies[key] = value;
    return previous;
  }
  get(key) {
    return this._cookies[key];
  }
  delete(key) {
    const previous = this._cookies[key];
    delete this._cookies[key];
    return previous;
  }
  clear() {
    this._cookies = {};
  }
  all(regexp) {
    const results = {};
    for (const [key, value] of Object.entries(this._cookies)) {
      if (regexp.test(key)) results[key] = value;
    }
    return results;
  }
  import(raw) {
    for (const cookie of this._raw.split(/\s*;\s+/g)) {
      const [key, value] = cookie.split("=");
      this._cookies[key] = value;
    }
  }
  export() {
    const cookies = [];
    for (const [key, value] of Object.entries(this._cookies)) cookies.push(`${key}=${value}`);
    return cookies.join("; ");
  }
};
var ForgeHTTPHeaders = class {
  _raw;
  _headers = {};
  _descriptors = [];
  cookies;
  constructor(options) {
    this.cookies = new ForgeHTTPCookies(options);
  }
  *[Symbol.iterator]() {
    for (const entry of Object.entries(this._headers)) yield entry;
  }
  set(key, value) {
    const previous = this._headers[key];
    this._headers[key] = value;
    return previous;
  }
  get(key) {
    return this._headers[key];
  }
  delete(key) {
    const previous = this._headers[key];
    delete this._headers[key];
    return previous;
  }
  clear() {
    this._descriptors = [];
    this._headers = {};
  }
  first(regExp) {
    for (const [key, value] of Object.entries(this._headers)) {
      if (regExp.test(key)) return value;
    }
  }
  all(regExp) {
    const results = {};
    for (const [key, value] of Object.entries(this._headers)) {
      if (regExp.test(key)) results[key] = value;
    }
    return results;
  }
  import(raw) {
    for (const line of raw.split(/\n/g)) {
      const results = /([\w-]+):\s+(.+)/.exec(line);
      if (results) {
        const key = results[1];
        const value = results[2];
        if ("cookies" == key.toLowerCase()) {
          this.cookies.import(value);
        } else {
          this._headers[key] = value;
        }
      } else {
        this._descriptors.push(line);
      }
    }
    return this;
  }
  export() {
    const headers = [...this._descriptors];
    for (const [key, value] of Object.entries(this._headers)) headers.push(`${key}: ${value}`);
    if (this.cookies.size) headers.push(`Cookies: ${this.cookies.export()}`);
    return headers.join("\n");
  }
};
function MapHeaderPairs(value, index) {
  return index % 2 == 0 ? value + ": " : value + "\n";
}
var ForgeRequest2 = class {
  _parseBody = $UsePromise();
  // { capture: function (error) { console.red("Captured: body parsed body fail", error) } }
  _$body = $UsePromise();
  // { capture: function (error) { console.red("Captured: body catch failed", error) }}
  source;
  url;
  queryString;
  query;
  method;
  headers;
  cookies;
  routes;
  constructor(source) {
    const raw = (source?.rawHeaders || []).map(MapHeaderPairs).join("");
    this.headers = new ForgeHTTPHeaders().import(raw);
    this.cookies = this.headers.cookies;
    if (source === void 0) return;
    this.source = source;
    const url = `${this.source.protocol}://${this.source.get("host")}${this.source.originalUrl}`;
    this.url = new URL(url);
    this.routes = String(this.url.pathname).split("/").slice(1);
    this.method = source.method.toLowerCase();
    const $body = this._$body;
    this._parseBody[0].then(function(race) {
      const buffers = [];
      source.on("data", function(chunk) {
        buffers.push(chunk);
      }).on("end", function() {
        const buffer = Buffer.concat(buffers);
        $body[1](new Uint8Array(buffer).buffer);
      });
    });
  }
  async $body(race) {
    if (this.method == "post") {
      this._parseBody[1](race);
    } else {
      this._parseBody[2]("no body in request");
    }
    return this._$body[0];
  }
  get mime() {
    return this.headers["content-type"];
  }
  path(startRoute) {
    const startIndex = this.routes.indexOf(startRoute);
    if (startIndex == -1) {
      return `/${this.routes.join("/")}`;
    } else {
      return `/${this.routes.slice(startIndex + 1).join("/")}`;
    }
  }
  fullURL(startRoute) {
    const query = this.url.search;
    const startIndex = this.routes.indexOf(startRoute);
    return `${this.path(startRoute)}${query}`;
  }
  async $export(race) {
    return {
      href: this.url.href,
      method: this.method,
      cookies: { ...this.cookies },
      headers: this.headers.export(),
      body: this.method == "post" ? await this.$body(race) : void 0
    };
  }
  async $import(requestExport) {
    this.url = new URL(requestExport.href);
    this.routes = String(this.url.pathname).split("/").slice(1);
    this.headers.import(requestExport.headers);
    this.method = requestExport.method.toLowerCase();
    this._$body[1](requestExport.body);
    return this;
  }
};
function EncodeData(data) {
  const constructor = data.constructor;
  switch (constructor) {
    case String:
      return Buffer.from(data);
    case ArrayBuffer:
      return Buffer.from(new Uint8Array(data));
    case Buffer:
      return data;
    default:
      if (ArrayBuffer.isView(data)) return Buffer.from(data);
  }
}
var ForgeResponseChunk = class {
  _writes = [];
  _$complete;
  *[Symbol.iterator]() {
    for (const data of this._writes) yield data;
  }
  async *[Symbol.asyncIterator]() {
    const writes = await this._$complete[0];
    for (const data of writes) yield data;
  }
  constructor() {
    this._$complete = $UsePromise();
  }
  write(data) {
    this._writes.push(data);
    return this;
  }
  clear() {
    this._writes = [];
    return this;
  }
  end() {
    this._$complete[1](this._writes);
  }
};
var ForgeResponse2 = class {
  _response;
  _$end = $UsePromise();
  _open = true;
  _race;
  _headers = {};
  _cookies = {};
  status;
  writes = [];
  query = new QueryManager2();
  constructor(response) {
    if (response === void 0) return;
    this._response = response;
    this._headers = this._response.getHeaders();
    this._cookies;
    this._$end[0].then(async function([headers, writes, status]) {
      for (const [key, value] of Object.entries(headers)) response.setHeader(key, String(value));
      response.status(status);
      for (const data of writes) response.write(EncodeData(data));
      response.end();
    });
  }
  get open() {
    return this._open;
  }
  set type(value) {
    if (this._response) {
      this._response.type(value);
      this._headers["Content-Type"] = value;
    } else {
      this._headers["Content-Type"] = value;
    }
  }
  get type() {
    return this._headers["Content-Type"];
  }
  cookie(overload, value) {
    if (overload === void 0) return this;
    if (overload.constructor == Object) {
      const entries = overload;
    } else {
      const key = overload;
    }
    return this;
  }
  header(overload, value) {
    if (overload === void 0) return this;
    if (overload.constructor == Object) {
      const entries = overload;
      for (const [key, value2] of Object.entries(entries)) this._headers[key] = value2;
    } else {
      const key = overload;
      this._headers[key] = value;
    }
    return this;
  }
  clear() {
    this.writes = [];
  }
  chunk(attributes) {
    const chunk = new ForgeResponseChunk();
  }
  write(data) {
    if (this._open) this.writes.push(data);
  }
  stream(buffer) {
    throw "Not implmented. Cant seem to get anythign to stream...";
    this._response.send(EncodeData(buffer));
  }
  flush() {
    if (this._open === false) return;
    for (const buffer of this.writes) this._response.write(EncodeData(buffer));
    this.writes = [];
  }
  end() {
    if (this._open === false) return;
    this._open = false;
    this._$end[1]([this._headers, this.writes, this.status || 500]);
  }
  redirect(url) {
    this.clear();
    this._headers["Location"] = url;
    this.status = 301;
    this.end();
  }
  unwrap() {
    return this._response;
  }
  async $import(responseExport) {
    this.status = responseExport.status;
    this._open = responseExport.open;
    this.header(responseExport.headers);
    return this;
  }
  async $export(includeWrites) {
    const exportData = {
      headers: this._headers,
      cookies: this._cookies,
      status: this.status,
      open: this._open
    };
    if (includeWrites === true) exportData.writes = this.writes;
    return exportData;
  }
};
var WorkerSocket = class extends AbstractForgeSocket {
  _worker;
  _command;
  _$online = $UsePromise();
  constructor(name, config, port) {
    super(name, config);
    this._command = config.command;
    if (port === void 0 || import_node_worker_threads.isMainThread === true) {
      const env = { ...config.env, FORGE_KEY: this._key, FORGE_SOCKET: "worker" };
      console.red("worker socket", env);
      this._worker = new import_node_worker_threads.Worker(this._command, { env, stdout: false });
      this._worker.on("online", this._$online[1]);
    } else {
      import_node_worker_threads.parentPort.start();
      this._worker = import_node_worker_threads.parentPort;
      this._$online[1]();
    }
    const read = this.read.bind(this);
    this._worker.on("message", function(message) {
      try {
        if (message.constructor !== Array) return;
        if (message[0] !== "forge://") return;
        read(message);
      } catch (error) {
        console.red("Error reading message on WorkerSocket", error);
      }
    });
    this._worker.on("exit", this._onExit.bind(this));
  }
  async $connect(data) {
    await this._$online[0];
    return super.$connect(data);
  }
  _onExit() {
    this.notify("exit", this);
  }
  write(header, data) {
    const key = this._key;
    this._worker.postMessage(["forge://", { ...header, key }, data]);
  }
};
var DummySocket = class extends AbstractForgeSocket {
  constructor(name) {
    super(name, { race: { ".+": 5e3 } });
  }
  write(header, data) {
    console.blue("dummy write", header, data);
  }
};
var import_stream = __toESM2(require_stream(), 1);
var import_receiver = __toESM2(require_receiver(), 1);
var import_sender = __toESM2(require_sender(), 1);
var import_websocket = __toESM2(require_websocket(), 1);
var import_websocket_server = __toESM2(require_websocket_server(), 1);
var wrapper_default = import_websocket.default;
var ForgeWebSocket = class _ForgeWebSocket extends AbstractForgeSocket {
  static FrameSize = 8e3;
  _socket;
  _abort = new AbortController();
  _$online = $UsePromise();
  _frameSize;
  constructor(name, options, socket) {
    super(name, options);
    const { signal } = this._abort;
    this._frameSize = _ForgeWebSocket.FrameSize;
    this._socket = socket;
    this._socket.binaryType = "arraybuffer";
    this._socket.addEventListener("message", this._onMessage.bind(this), { signal });
    this._socket.addEventListener("open", this._onOpen.bind(this), { signal });
    this._socket.addEventListener("exit", this._onExit.bind(this), { signal });
    this._$online = $UseRace(5e3);
    if (this._socket.readyState == 1) this._$online[1]();
    console.red("web socket permission skipped");
  }
  async _$thenRefreshPermission(resolve) {
    const race = this._race.query("refresh");
    const capture = "permission refresh failed";
    const [session, $promise] = this._getSession(race);
    const response = await this.$session({ refresh: true }, {}, race);
    throw new Error(`_$thenRefreshPermission not implemented`);
  }
  _onMessage(event) {
    const payload = event.data;
    let protocol, header, data;
    try {
      if (payload instanceof ArrayBuffer) [protocol, header, data] = DecodeAttributes(payload);
      if (payload instanceof String) [protocol, header, data] = JSON.parse(payload, Base64.Reviver);
      if (protocol == "forge://") this.read([protocol, header, data]);
    } catch (error) {
      console.log(this._name, error);
    }
  }
  _onOpen() {
    console.cyan("socket ready");
    this._$online[1]();
  }
  async $connect(data) {
    await this._$online[0];
    return super.$connect(data);
  }
  _onExit() {
    this.notify("exit", this);
  }
  async _$writeMultiPart(buffer) {
    const byteLength = buffer.byteLength;
    let cursor = 0;
    let i = 0;
    const frames = Math.ceil(byteLength / _ForgeWebSocket.FrameSize);
    const multi_part = QuickHash();
    while (cursor < byteLength) {
      const length2 = Math.min(_ForgeWebSocket.FrameSize, byteLength - cursor);
      const [session, $serialize] = this._getSession(1e3);
      const segment = buffer.slice(cursor, cursor + length2);
      const socketBuffer = EncodeAttributes(["forge://", {
        key: this._key,
        session,
        multi_part,
        index: i++,
        frames,
        bytes: byteLength,
        race: 250
      }, { buffer: segment }]);
      this._socket.send(socketBuffer);
      cursor += length2;
    }
  }
  write(header, data) {
    const key = this._key;
    const buffer = EncodeAttributes(["forge://", { ...header, key }, data]);
    if (buffer.byteLength > _ForgeWebSocket.FrameSize) {
      this._$writeMultiPart(buffer);
    } else {
      this._socket.send(buffer);
    }
  }
  subscribe(notify, delegate, count) {
    super.subscribe(notify, delegate, count);
  }
};
var WebSocketPermit = class {
  verify;
  _decodes = /* @__PURE__ */ new Map();
  socket;
  [Reactivity] = new Reactor();
  constructor(data) {
    this.socket = data.socket;
    for (const signal of data.signals) this._decodes.set(signal, QuickHash({ repeat: [5, 10] }));
  }
  has(signal) {
    return this._decodes.has(signal);
  }
  $signal(header, data) {
    const { verify, signal } = header;
    if (verify == this.verify) return Promise.reject("unauthorized");
    if (signal == this._decodes.has(signal) === false) return Promise.reject("unauthorized");
    const session = QuickHash();
    const reactor = this[Reactivity];
    reactor.setter(session);
    this.socket.write({
      ...header,
      signal: this._decodes.get(signal),
      verify: this.verify
    }, data);
  }
  export() {
    const verify = this.verify;
    const signals = {};
    for (const [signal, tokens] of this._decodes) signals[signal] = tokens;
    return { verify, signals };
  }
};
var WebSocketRouter = class {
  _apis = /* @__PURE__ */ new Map();
  _permits = /* @__PURE__ */ new Map();
  expose(socket, signals, verify, attributes, race) {
    for (const [socket2, permits] of this._permits) for (const [token2, permit] of permits) {
      if (permit.socket == socket2) return {
        success: false,
        message: "permit already exist"
      };
    }
    const token = QuickHash();
    this._apis.set(token, { socket, signals, verify, attributes });
    return {
      success: true,
      message: ""
    };
  }
  permit(socket, token) {
    if (this._apis.has(token) === false) throw new Error(`Permit does not exist`);
    const permit = new WebSocketPermit(this._apis.get(token));
    if (this._permits.has(socket) === false) this._permits.set(socket, /* @__PURE__ */ new Map());
    const permits = this._permits.get(socket);
    permits.set(token, permit);
    return { success: true };
  }
  fetch() {
    const result = {};
    for (const [hash, { socket, signals, attributes }] of this._apis) result[hash] = { signals, attributes };
    return result;
  }
  async read(socket, header, data) {
    const { expose, permit, refresh, signal, session, race } = header;
    let response;
    if (expose) {
      const { verify } = header;
      response = this.expose(socket, expose, verify, data, race);
    } else if (permit) {
      response = this.permit(socket, permit);
    } else if (refresh) {
      response = this.fetch();
    } else if (signal) {
      const permits = this._permits.get(socket);
      const permit2 = permits.get(signal);
      if (permit2) permit2.$signal(header, data);
    } else {
      return socket.resolve(header, response || {});
    }
    if (session) socket.resolve(header, response || {});
  }
  async $signal(signal, data, options) {
    for (const [socket, permit] of this._permits) if (permit.has(signal)) socket.$signal(signal, data, options);
  }
};
var ForgeWebSocketServer = class {
  _key;
  _server;
  _sockets = /* @__PURE__ */ new Map();
  _router = new WebSocketRouter();
  port;
  [Reactivity] = new Reactor([void 0, void 0, void 0]);
  constructor(port, key) {
    this.port = port;
    this._key = key || QuickHash();
    this._server = new import_websocket_server.default({ port, maxPayload: 50 * 1024 * 1024 });
    this._server.on("connection", this._$connect.bind(this));
  }
  async _$connect(socket) {
    const router = this._router;
    const forgeWebSocket = new ForgeWebSocket("server websocket", { key: this._key, race: { ".*": 5e3 } }, socket);
    socket.addEventListener("error", console.error);
    forgeWebSocket.subscribe("message", this._$read.bind(this));
    this._sockets.set(socket, forgeWebSocket);
    console.green("socket connected");
    return forgeWebSocket.$connect({ server: true }).then(async function(resolve) {
      console.cyan("server", resolve);
      console.cyan(await forgeWebSocket.$ready);
    });
  }
  async _$read(notify, socket, header, data) {
    this[Reactivity].setter([socket, header, data]);
  }
  get key() {
    return this._key;
  }
  async $signal(signal, data, options) {
    const promises = [];
    for (const [socket, forgeSocket] of this._sockets) promises.push(forgeSocket.$signal(signal, data));
    const results = new Result();
    for (const serialize of await Promise.allSettled(promises)) {
    }
  }
};
var { isMainThread: isMainThread2, parentPort: parentPort2, workerData: workerData2 } = __require("worker_threads");
async function $Serve(target, request, response, options) {
  if (options.reject === void 0) {
    const buffer = await ForgeIO.File.$Read(target);
    response.status = options.resolve.status;
    response.write(buffer);
  } else {
    try {
      const buffer = await ForgeIO.File.$Read(target);
      response.status = options.resolve.status;
      response.write(buffer);
      response.end();
    } catch (error) {
      if (options.reject.status !== void 0) response.status = options.reject.status;
      if (options.reject.write !== void 0) response.write(options.reject.write);
      if (options.reject.end === true) response.end();
    }
  }
}
var ForgeClientRouting = class {
  _$catchRoute = (error) => {
    console.log(error);
    return false;
  };
  _client;
  constructor(client) {
    this._client = client;
  }
  async $authorize(request, response) {
    let authorized;
    for (const iRoute of this._client.routes) {
      try {
        const authorize = await iRoute.$authorize(request, response);
        if (authorize !== void 0) authorized ||= authorize;
        if (authorized === true) return true;
      } catch (error) {
        console.log(error);
        console.magenta("ForgeClientRouting", error);
        response.query.add(error, { error: true, url: request });
      }
    }
    return authorized;
  }
  async $resolve(request, response) {
    let resolved;
    for (const iRoute of this._client.routes) {
      try {
        if (await iRoute.$authorize(request, response) === true) {
          resolved = await iRoute.$resolve(request, response);
          if (resolved === false) return false;
        }
      } catch (error) {
        console.error(error);
        response.query.add(error, { error: true, url: request });
        const rejected = await iRoute.$reject(request, response).catch(this._$catchRoute);
        if (rejected === false) return false;
      }
      await iRoute.$finally(request, response).catch(this._$catchRoute);
    }
    return resolved;
  }
  async $reject(request, response) {
    return;
  }
};
var SignalSession = class extends GenericSession {
  _header;
  _socket;
  constructor(race, header, socket) {
    super({ race });
    this._header = header;
    this._socket = socket;
  }
  renew(delay) {
    if (this._socket) this._socket.write({ renew: this._header.session }, { delay });
    return super.renew(delay);
  }
  toString() {
    return `SignalSession`;
  }
};
var ForgeClient = class extends Subscription {
  static Arguments(options) {
    const args = new CLIArguments();
    args.add(/key/i, { required: true }).add(/data/i, {
      sanitize: function(value, args2) {
        if (value === void 0) return {};
        return value === void 0 ? {} : value;
      }
    }).compile();
    return [args.last(/key/i), args.last(/data/i), options];
  }
  static $Serve = $Serve;
  _executing;
  _queue = [];
  _socket;
  _model;
  _server;
  _race;
  _routing = new ForgeClientRouting(this);
  routes = /* @__PURE__ */ new Set();
  constructor(options) {
    super();
    const race = options?.race;
    this._race = new ForgeRace(race);
    const { FORGE_KEY, FORGE_SOCKET, FORGE_LISTEN } = process.env;
    const key = options?.key ? options.key : FORGE_KEY;
    console.blue("ForgeClient", String(parentPort2), isMainThread2, `key: "${key}"`);
    switch (FORGE_SOCKET) {
      case "websocket":
        this._socket = new SpawnSocket("client interface", { key, race }, new WebSocket(FORGE_LISTEN));
        break;
      case "spawn":
        this._socket = new SpawnSocket("client interface", { key, race }, process);
        break;
      case "fork":
        this._socket = new ForkSocket("client interface", { key, race }, process);
        break;
      case "worker":
        this._socket = new WorkerSocket("client interface", { key, race }, parentPort2);
        break;
      default:
        this._socket = new DummySocket("");
    }
    this._socket.subscribe("message", this._$subscribeMessage.bind(this));
  }
  async _$raceDispatch(socket, header, session, ...$rest) {
    const result = await Promise.race([session.$promise[0], ...$rest]);
    socket.resolve(header, result);
  }
  async _$subscribeMessage(notify, socket, header, data) {
    if (header.signal) {
      try {
        let { signal, race, session } = header;
        race ||= this._race.query(header.signal);
        const signalSession = new SignalSession(race, header, socket);
        switch (signal) {
          case "reset":
            console.log("\n\nreset intercept\n\n");
            await this._$raceDispatch(socket, header, signalSession, this.$reset(data, signalSession));
            break;
          case "watch":
            await this._$raceDispatch(socket, header, signalSession, this.$watch(data, signalSession));
            break;
          default:
            await this._$raceDispatch(socket, header, signalSession, this.$execute(signal, data, signalSession));
        }
      } catch (error) {
        console.error(error);
        console.magenta("ForgeClient._$subscribeMessage ( ... ) error\n", error);
        if (error === void 0) {
          socket.reject(header, { error: "Error is literally undefined. Weird!" });
        } else if (error instanceof Error) {
          return socket.reject(header, { error: error.message, stack: error.stack });
        } else {
          return socket.reject(header, { error });
        }
      }
    } else if (header.route) {
      const { route } = header;
      const { request, response } = data;
      const forgeRequest = await new ForgeRequest2().$import(request);
      const forgeResponse = await new ForgeResponse2().$import(response);
      const race = header.race || this._race.query(`${header.route}`);
      const $race = $UseRace(race);
      switch (route) {
        case "authorize":
          {
            const authorized = await Promise.race([$race[0], this._routing.$authorize(forgeRequest, forgeResponse)]).catch((error) => {
              console.error("any error on authenicate error caught", error);
              return false;
            });
            socket.resolve(header, { authorized, ...await forgeResponse.$export(true) });
          }
          break;
        case "resolve":
          {
            try {
              const resolved = await Promise.race([$race[0], this._routing.$resolve(forgeRequest, forgeResponse)]);
              socket.resolve(header, { resolved, ...await forgeResponse.$export(true) });
            } catch (error) {
              console.log(error);
              console.log("need to handle rejection during client resolve");
              socket.reject(header, { resolved: false, ...await forgeResponse.$export(true) });
            }
          }
          break;
        case "reject":
          {
            throw "not implemented yet";
          }
          break;
      }
    } else {
      console.red(header);
      socket.reject(header, { error: `malformed signal` });
    }
  }
  get $ready() {
    return this._socket.$ready;
  }
  async $connect(data) {
    this._socket.$connect(data);
    return this.$ready;
  }
  async $reset(data, session) {
    return { "reset": "empty function" };
  }
  async $signal(signal, data, options) {
    return this._socket.$signal(signal, data, options);
  }
  async $execute(signal, data, session) {
    return { "execute": "empty function" };
  }
  async $watch(data, session) {
    return { "watched": true };
  }
  async $model(attributes) {
    const root = ForgeStore.Empty(attributes);
    const model = new ForgeModel(root);
    const proxy = new ClientSocketModelProxy(model, this._socket);
    await model.proxies.$add(proxy, { client: "proxy" });
    return proxy.$ready;
  }
  async $listen(port) {
    if (this._server) return this._server;
    if (isNaN(port) === true) throw new Error(`Port not supplied to Socket Server`);
    this._server = new ForgeWebSocketServer(port);
    this._server[Reactivity].subscribe(function([socket, header, data]) {
      this._$subscribeMessage("message", socket, header, data);
    }.bind(this));
    return this._server;
  }
  async $read(header, data) {
    if (header.signal) {
      try {
        let { signal, race, session } = header;
        race ||= this._race.query(header.signal);
        const signalSession = new SignalSession(race, header);
        switch (signal) {
          case "reset":
            return this.$reset(data, signalSession);
          case "watch":
            return this.$watch(data, signalSession);
          default:
            return this.$execute(signal, data, signalSession);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    } else if (header.route) {
      const { route } = header;
      const { request, response } = data;
      const forgeRequest = await new ForgeRequest2().$import(request);
      const forgeResponse = await new ForgeResponse2().$import(response);
      const race = header.race || this._race.query(`${header.route}`);
      const $race = $UseRace(race);
      switch (route) {
        case "authorize":
          {
            const authorized = await this._routing.$authorize(forgeRequest, forgeResponse).catch((error) => {
              console.error("any error on authenicate error caught", error);
              return false;
            });
            const exportData = await forgeResponse.$export(true);
            return authorized ? exportData : Promise.reject(exportData);
          }
          break;
        case "resolve":
          {
            try {
              const resolved = await Promise.race([$race[0], this._routing.$resolve(forgeRequest, forgeResponse)]);
              const exportData = await forgeResponse.$export(true);
              return resolved ? exportData : Promise.reject(exportData);
            } catch (error) {
              console.log(error);
              console.log("need to handle rejection during client resolve");
              await this._routing.$reject(forgeRequest, forgeResponse);
              const rejection = Promise.reject(forgeResponse.$export(true));
              return rejection;
            }
          }
          break;
        case "reject":
          {
            throw "not implemented yet";
          }
          break;
      }
    } else {
      return Promise.reject("malformed message: " + JSON.stringify(header));
    }
  }
};
var { spawn: spawn5, fork: fork5, exec: exec6, execSync: execSync6 } = __require("child_process");
var ForgeRoute = class _ForgeRoute {
  static Race = 500;
  static Hooks = {
    $Authorize: {
      Match: function(...matches) {
        return async function(forgeRequest, response, iRoute) {
          for (const match of matches) {
            const results = /\s*((\/\s*)?(.+))/.exec(forgeRequest.url.pathname);
            let path4 = results[3];
            if (path4[path4.length - 1] == "/") path4 = path4.slice(0, -1);
            if (path4 == match) return true;
          }
          return false;
        };
      },
      RegExp: function(regExp, options) {
        return async function(request, response, iRoute) {
          const path4 = request.url.pathname;
          const results = regExp.exec(path4);
          if (results) {
            if (options && options.groups) {
              if (results.groups[options.groups]) return true;
            } else if (options && options.index) {
              if (results.groups[options.index]) return true;
            } else {
              return true;
            }
          }
          return false;
        };
      }
    }
  };
  static RegExpURL(regExp) {
    const hooks = [
      { $authorize: async (request, response) => regExp.test(request.url.pathname) }
    ];
    return new _ForgeRoute({ hooks });
  }
  _hooks = /* @__PURE__ */ new Set();
  _race;
  _hasAuthorize = false;
  _hasResolve = false;
  _hasReject = false;
  _hasFinally = false;
  constructor(config) {
    if (config && config.hooks) {
      for (const hook of config.hooks) this.add(hook);
    }
    this._race = config && config.race || _ForgeRoute.Race;
  }
  async $authorize(request, response) {
    let authorize;
    for (const hook of this._hooks) {
      const result = hook.$authorize && await hook.$authorize(request, response, this);
      if (result === false) return false;
      if (result === true) authorize = true;
    }
    return authorize;
  }
  async $resolve(request, response) {
    let resolved;
    for (const hook of this._hooks) {
      const result = hook.$resolve && await hook.$resolve(request, response, this);
      if (result === false) return false;
      if (result === true) resolved = true;
    }
    return resolved;
  }
  async $reject(request, response) {
    let rejected;
    for (const hook of this._hooks) {
      const result = hook.$reject && await hook.$reject(request, response, this);
      if (result === false) return false;
      if (result === true) rejected = true;
    }
    return rejected;
  }
  async $finally(request, response) {
    let finalized = true;
    for (const hook of this._hooks) {
      const result = hook.$finally && await hook.$finally(request, response, this);
      if (result === false) return false;
      if (result === true) finalized = true;
    }
    return finalized;
  }
  add(hook) {
    if (hook.$authorize) this._hasAuthorize = true;
    if (hook.$resolve) this._hasResolve = true;
    if (hook.$reject) this._hasReject = true;
    if (hook.$finally) this._hasFinally = true;
    this._hooks.add(hook);
    return this;
  }
};
var InvalidAccessData = Object.freeze({
  state: "",
  permit: "",
  access: "",
  verifications: {},
  error: true
});
var ForgeModelRouteClient = class {
  static Mime = "application/json; charset=utf-16";
  _url;
  _refresh;
  _headers;
  _access;
  _$sources = $UsePromise({ capture: true });
  _stores = /* @__PURE__ */ new Map();
  _hashes = /* @__PURE__ */ new Map();
  _model = new ForgeModel();
  _reactor = new Reactor([]);
  constructor(url, refresh) {
    this._url = url;
    this._refresh = refresh;
  }
  async *[Symbol.asyncIterator]() {
    const stores = await this._$sources[0];
    for (const store of stores) yield store;
  }
  [Reactivity]() {
    return this._reactor;
  }
  get model() {
    return this._model;
  }
  get $sources() {
    return this._$sources[0];
  }
  async $refresh() {
    this._$sources[2](new Error(`sources refreshed`));
    this._$sources = $UsePromise({ capture: true });
    this._stores.clear();
    this._hashes.clear();
    const response = await fetch(this._url, {
      cache: "no-store",
      headers: {
        [this._refresh[0]]: this._refresh[1],
        access: this._refresh[2]
      }
    });
    if (response.ok === false) throw new Error(`Response status: ${response.status}`);
    const buffer = await response.arrayBuffer();
    const permission = DecodeAttributes(buffer);
    const verifications = permission.verifications;
    this._headers = {
      [permission.state[0]]: permission.state[1],
      [permission.permit[0]]: permission.permit[1],
      ...verifications
    };
    console.warn(" ");
    console.log("_headers", this._headers);
    console.log("permission", permission);
    console.warn(" ");
    this._access = permission.access;
    const promises = [];
    const sources = [];
    const storesData = permission.stores;
    for (const [hash, attributes] of Object.entries(storesData)) {
      if (this._stores.has(hash)) continue;
      const store = new ForgeStore(attributes);
      ForgeStore.AssignHash(store, hash);
      promises.push(store.$connect(this._model));
      this._stores.set(hash, store);
      this._hashes.set(store, hash);
      sources.push(store);
    }
    await Promise.allSettled(promises);
    this._$sources[1](sources);
    return this.$read(sources);
  }
  async $read(stores) {
    const hashes = [];
    for (const store of stores) if (this._hashes.has(store)) hashes.push(store.hash);
    const body = EncodeAttributes({ read: hashes });
    const response = await fetch(this._url, {
      method: "POST",
      cache: "no-store",
      headers: {
        ...this._headers,
        access: this._access[
          "read"
          /* Read */
        ],
        "Content-Type": "application/json; charset=utf-16"
      },
      body
    });
    if (response.ok === false) throw new Error(`Response status: ${response.status}`);
    const buffer = await response.arrayBuffer();
    const { read } = DecodeAttributes(buffer);
    console.log([...Object.values(read)].map(function([buffer2, mime]) {
      return buffer2.byteLength == 0 ? "<<empty>>" : DecodeAttributes(buffer2);
    }));
    const promises = [];
    const sources = [];
    const entries = Object.entries(read);
    for (const [key, [buffer2, mime]] of entries) {
      const store = this._stores.get(key);
      promises.push(store.$write(buffer2, mime));
      sources.push(store);
    }
    await Promise.allSettled(promises);
    this._reactor.setter(sources);
    return sources;
  }
  async $write(writes) {
    const mutate = {};
    for (const [store, writeStore] of writes) {
      const hash = this._hashes.get(store);
      if (hash === void 0) throw new Error(`store is not valid ${store}`);
      mutate[hash] = await writeStore.$read();
    }
    const body = EncodeAttributes({ mutate });
    const response = await fetch(
      this._url,
      {
        method: "POST",
        headers: {
          ...this._headers,
          access: this._access[
            "mutate"
            /* Mutate */
          ],
          "Content-Type": "application/json; charset=utf-16"
        },
        body
      }
    );
    if (response.ok === false) throw new Error(`Response status: ${response.status}`);
    const results = /* @__PURE__ */ new Map();
    {
      const buffer = await response.arrayBuffer();
      const { mutate: mutate2 } = DecodeAttributes(buffer);
      const entries = Object.entries(mutate2);
      for (const [oldHash, newHash] of entries) {
        const oldStore = this._stores.get(oldHash);
        const newStore = this._stores.get(newHash);
        this._hashes.delete(oldStore);
        this._stores.delete(oldHash);
        this._hashes.set(newStore, newHash);
        this._stores.set(newHash, newStore);
      }
    }
    return results;
  }
  async $flush() {
  }
};
var { spawn: spawn6, fork: fork6, exec: exec7, execSync: execSync7 } = __require("child_process");
function EncodeBuffer(data) {
  switch (data?.constructor) {
    case ArrayBuffer:
      return data;
    case String:
      return new TextEncoder().encode(data).buffer;
    default:
      throw new Error(`Unable to encode data as "${data?.constructor}" into a ArrayBuffer`);
  }
}
var ForgeZip = class {
  static async $GUnzip(data) {
    return new Promise(function(resolve, reject) {
      import_node_zlib.default.gunzip(data, function(error, buffer) {
        if (error) {
          reject(error);
        } else {
          const arrayBuffer2 = buffer.buffer.slice(
            buffer.byteOffset,
            buffer.byteOffset + buffer.byteLength
          );
          resolve(arrayBuffer2);
        }
      });
    });
  }
  static async $GZip(data, options) {
    const buffer = EncodeBuffer(data);
    return new Promise(function(resolve, reject) {
      import_node_zlib.default.gzip(data, function(error, buffer2) {
        if (error) {
          reject(error);
        } else {
          const arrayBuffer2 = buffer2.buffer.slice(
            buffer2.byteOffset,
            buffer2.byteOffset + buffer2.byteLength
          );
          resolve(arrayBuffer2);
        }
      });
    });
  }
};
var FileDirectoryRoute = class extends ForgeRoute {
  static Hooks = {
    ...ForgeRoute.Hooks
  };
  _root;
  _indexes;
  _caching = true;
  _resolve = {};
  _reject = {};
  statuses = /* @__PURE__ */ new Map();
  cache = /* @__PURE__ */ new Map();
  constructor(config) {
    super(config);
    this._root = ForgePath.Resolve(config?.root || __dirname);
    this._indexes = config?.indexes || [];
    if (config?.resolve?.status !== void 0) this._resolve.status = config.resolve.status;
    if (config?.resolve?.end !== void 0) this._resolve.end = config.resolve.end;
    if (config?.reject?.status !== void 0) this._reject.status = config.resolve.status;
    if (config?.reject?.end !== void 0) this._reject.end = config.resolve.end;
    if (config.caching === false) this._caching = false;
  }
  get root() {
    return this._root;
  }
  get indexes() {
    return this._indexes;
  }
  async $status(target, root) {
    root = root || this._root;
    return ForgePath.$Status(root, target);
  }
  async $exists(target) {
    return ForgeFile.$FileExist(target);
  }
  async $pathing(request) {
    const relative = "." + request.url.pathname;
    const pathing = {
      relative,
      absolute: void 0,
      ext: void 0,
      base: void 0
    };
    if (this.statuses.has(relative) === false) this.statuses.set(relative, await this.$status(relative));
    const { isSubdirectory, exists, contains } = this.statuses.get(relative);
    let absolute;
    if (isSubdirectory) {
      for (const index of this._indexes) {
        absolute = ForgePath.Resolve(this._root, relative, index);
        if (await ForgeFile.$FileExist(absolute)) break;
      }
    } else {
      absolute = ForgePath.Resolve(this._root, relative);
    }
    const parsedPath = ForgePath.Parse(absolute);
    pathing.ext = parsedPath.ext;
    pathing.absolute = absolute;
    pathing.base = parsedPath.base;
    return pathing;
  }
  async $fetch(relative, absolute) {
    if (this._caching === false) return await ForgeFile.$Read(absolute);
    if (this.cache.has(relative) === false) this.cache.set(relative, await ForgeFile.$Read(absolute));
    return this.cache.get(relative);
  }
  async _$render(request, response, pathing) {
    let rendered;
    for (const hook of this._hooks) {
      if (hook.$render === void 0) continue;
      const result = await hook.$render(request, response, this, pathing);
      if (result === false) return false;
      rendered ||= result;
    }
    if (rendered === void 0) {
      const { relative, absolute } = pathing;
      const buffer = await this.$fetch(relative, absolute);
      response.write(buffer);
    }
    return true;
  }
  async $authorize(request, response) {
    const authorized = await super.$authorize(request, response);
    if (authorized === true || authorized === false) return authorized;
    const relative = "." + request.url.pathname;
    if (this.statuses.has(relative)) return true;
    const absolute = ForgePath.Resolve(this._root, relative);
    const statuses = await this.$status(absolute);
    const { isSubdirectory, exists, contains } = statuses;
    if (exists === false || contains === false) return false;
    if (isSubdirectory) {
      if (this._indexes.length == 0) return false;
      for (const index of this._indexes) {
        const absolute2 = ForgePath.Resolve(this._root, relative, index);
        if (await this.$exists(absolute2)) {
          this.statuses.set(relative, statuses);
          return true;
        }
      }
    } else {
      this.statuses.set(relative, statuses);
      return true;
    }
    console.red("no file was found. Request is not authorized!");
    return false;
  }
  async $resolve(request, response) {
    const resolved = await super.$resolve(request, response);
    if (resolved === true || resolved === false) return resolved;
    try {
      const pathing = await this.$pathing(request);
      const result = await this._$render(request, response, pathing);
      if (this._resolve?.status !== void 0) response.status = response.status || this._resolve.status;
      if (this._resolve?.end === true) response.end();
      return result;
    } catch (error) {
      return this.$reject(request, response);
    }
  }
  async $reject(request, response) {
    const rejected = await super.$reject(request, response);
    if (rejected !== void 0) return rejected;
    response.clear();
    response.write(`url not found ${request.url}`);
    if (this._reject?.status !== void 0) response.status = this._resolve.status;
    if (this._reject?.end === true) response.end();
    return false;
  }
  add(hook) {
    return super.add(hook);
  }
  uncache(relative) {
    if (relative === void 0) {
      this.cache.clear();
      this.statuses.clear();
    } else {
      this.cache.delete(relative);
      this.statuses.delete(relative);
    }
  }
};

// src/ts/Build-Utils.ts
function FetchArguments() {
  const cliArguments = new CLIArguments();
  cliArguments.import([
    ["drew", { so: "much crap" }],
    ["alias", [["files", []], ["directories", {}]]]
  ]);
  cliArguments.add(/^in$/, {
    required: true,
    validate: (value, args) => {
      return args.some(([name, value2]) => /in/i.test(name));
    },
    error: `\x1B[31;1mMissing or incorrect \x1B[36;1m--in--\x1B[0m\x1B[31;1m argument\x1B[0m`
  }).add("out", {
    // required: true,
    /* validate: (value: unknown, args: [string, unknown][]): boolean => {
    
                    return Object.hasOwn(args, "out");
    
                }, */
    error: `\x1B[31;1mMissing or incorrect \x1B[36;1m--out--\x1B[0m\x1B[31;1m argument\x1B[0m`
  }).add(/^format$/i, {
    default: "cjs",
    validate: (value, args) => {
      switch (value) {
        case "cjs":
        case "esm":
        case "iife":
          return true;
      }
      return false;
    },
    error: `\x1B[31;1mMissing or incorrect \x1B[36;1m--format--\x1B[0m\x1B[31;1m argument\x1B[0m`
  }).add("bundled", {
    default: true
  }).add("platform", {
    default: "neutral",
    validate: (value, args) => {
      switch (value) {
        case "node":
        case "neutral":
        case "browser":
          return true;
      }
      return false;
    }
  }).add("meta", {
    default: true
  }).add("watch", {
    default: false
  }).add("external", {
    default: [],
    sanitize: (value, args) => {
      if (value === void 0) return [];
      if (value instanceof Array) return value;
      return String(value).split(/,/g);
    }
  }).add(/verbose/i, {
    default: [],
    sanitize: (value, args) => {
      if (value === void 0) return [];
      if (value instanceof Array) return value;
      return String(value).split(/,/g);
    }
  }).add(/minify/i, {
    default: false,
    sanitize: (value, args) => {
      return value === true ? true : false;
    }
  }).add(/obfuscate/i, {
    default: false
  });
  return cliArguments;
}

// src/ts/build/BuildClient.ts
var import_promises2 = require("node:fs/promises");

// src/ts/build/Core.ts
var import_promises = require("node:fs/promises");
var import_esbuild = require("esbuild");

// src/ts/FileCache.ts
var FileCacheInternal = class {
  _cache = /* @__PURE__ */ new Map();
  _decoder = new TextDecoder();
  Has(url) {
    return this._cache.has(url);
  }
  async $FetchString(url) {
    return this._decoder.decode(await this.$Fetch(url));
  }
  async $Fetch(url) {
    if (this._cache.has(url)) return this._cache.get(url);
    const buffer = await ForgeFile.$Read(url);
    this._cache.set(url, buffer);
    return buffer;
  }
  Cache(url, data) {
    if (this._cache.has(url)) return false;
    this._cache.set(url, data);
    return true;
  }
  Uncache(url) {
    return this._cache.delete(url);
  }
  Clear() {
    this._cache.clear();
  }
};
var FileCache = new FileCacheInternal();

// src/ts/build/Core.ts
var import_javascript_obfuscator = require("javascript-obfuscator");
var CachePlugin = {
  name: "forge-build-cache",
  setup(build) {
    build.onLoad({ filter: /\.((mjs)|(ts|x)|(js|x)$)/ }, async function(args) {
      const filePath = args.path;
      let contents = await FileCache.$FetchString(filePath);
      const regExp = /\(\s*(?<params>.*?)\)\s*=>\s*require\(["'`](?<macro>.+?)["'`]\s*\)/;
      if (regExp.test(contents)) {
        console.green("found macro");
      }
      return { contents, loader: "tsx" };
    });
  }
};
async function $ParseExternals(externals) {
  const externalPackages = /* @__PURE__ */ new Set(["esbuild"]);
  for (const currentPackage of externals) {
    const result = /^(?<protocol>(json:\/\/)|(json.keys:\/\/)|(json.values:\/\/))(?<file>(.*[\\\/])?.+?(?=::))(::(?<accessor>.+))?/mi.exec(currentPackage);
    if (result) {
      const { protocol, file } = result.groups;
      const accessor = result.groups.accessor?.split(/\s*,\s*/g) || [];
      try {
        let jsonData = DecodeAttributes(await ForgeIO.$Fetch(file));
        for (const access of accessor) jsonData = jsonData[access];
        switch (protocol.toLowerCase()) {
          case "json://":
            for (const externalPackage of jsonData) externalPackages.add(externalPackage);
            break;
          case "json.keys://":
            for (const externalPackage of Object.keys(jsonData)) externalPackages.add(externalPackage);
            break;
          case "json.values://":
            for (const externalPackage of Object.values(jsonData)) externalPackages.add(externalPackage);
            break;
        }
      } catch (error) {
      }
    } else {
      externalPackages.add(currentPackage);
    }
  }
  return [...externalPackages];
}
function CalcCodeSize(code) {
  let size;
  switch (code.constructor) {
    case ArrayBuffer:
      return code.byteLength;
    case String:
      return code.length;
  }
}
function UncacheFile(file) {
  FileCache.Uncache(file);
}
async function $Transform({ root, contents, source }, buildOptions, options) {
  const plugins = [];
  plugins.push({
    name: "forge-build-ignore",
    setup(build) {
      const ignores = buildOptions.ignores.map((file) => ForgePath.Resolve(file));
      return;
      build.onResolve({ filter: /./ }, async function(args) {
        const { path: path4, resolveDir } = args;
        for (const ext of [".ts", ".tsx", ".jsx", ".js", ".mjs"]) {
          const absolutePath = ForgePath.Resolve(resolveDir, `${path4}${ext}`);
          if (await ForgeFile.$FileExist(absolutePath) && ignores.includes(absolutePath)) {
          }
        }
      });
    }
  });
  if (options?.cache !== false) plugins.push(CachePlugin);
  if (options?.plugins) plugins.push(...options?.plugins);
  const result = new Result();
  result.add({ ...buildOptions }, { options: true });
  const startTime = Date.now();
  const { bundled, write, verbosity, treeShaking } = buildOptions;
  let logLevel;
  switch (verbosity) {
    default:
      logLevel = "silent";
  }
  const buildQuery = await (0, import_esbuild.build)({
    stdin: {
      contents,
      // These are all optional:
      sourcefile: source,
      resolveDir: root,
      loader: "tsx"
    },
    bundle: true,
    platform: buildOptions.platform,
    write: false,
    // dont produce a build file, but give me the build code as a result
    format: buildOptions.format,
    metafile: true,
    loader: { ".ts": "ts", ".js": "js", ".tsx": "tsx", ".jsx": "jsx" },
    treeShaking,
    minify: buildOptions.transform.write.includes("minify"),
    external: buildOptions.bundled ? await $ParseExternals(["esbuild", ...buildOptions.external]) : void 0,
    plugins,
    logLevel
  }).catch(function(error) {
    if (error instanceof Error) {
      const messages = error.message.split("\n");
      for (let i = 1; i < messages.length; i++) {
        const line = messages[i];
        const execResult = /(?<file>(.+?)):((?<row>\d+):(?<column>\d+):) ERROR: (?<error>.+)/.exec(line);
        if (execResult) result.add({ ...execResult.groups }, { error: true });
      }
    } else {
      result.add({ error }, { error: true });
    }
  });
  result.add({ time: Date.now() - startTime }, { stats: true });
  if (buildQuery === void 0) return result.reject();
  const buildResult = buildQuery;
  const inputs = buildResult.metafile.inputs;
  result.add({ inputs }, { inputs: true });
  const manifest = Object.keys(buildResult.metafile.inputs);
  result.add({ manifest }, { manifest: true });
  const code = await $ApplyWriteTransforms(buildResult.outputFiles[0].text, buildOptions);
  result.add({ code }, { code: true });
  return result.resolve();
}
async function $Build(entryFile, buildOptions, options) {
  const result = new Result();
  const stats = await ForgeFile.$Stat(entryFile).catch((error) => void 0);
  if (stats === void 0 || stats.isFile() === false) {
    result.add({ error: `Entry file missing or not a file: "${entryFile}"` }, { error: true });
    return result.reject();
  }
  const plugins = options?.plugins || [];
  if (options?.cache !== false) plugins.push(CachePlugin);
  result.add({ ...buildOptions }, { options: true });
  result.add({ entry: entryFile }, { entry: true });
  const startTime = Date.now();
  const buildQuery = await (0, import_esbuild.build)({
    entryPoints: [entryFile],
    bundle: true,
    platform: buildOptions.platform,
    write: false,
    // dont produce a build file, but give me the build code as a result
    format: buildOptions.format,
    metafile: true,
    loader: { ".ts": "ts", ".js": "js", ".tsx": "tsx", ".jsx": "jsx" },
    treeShaking: buildOptions.treeShaking,
    minify: buildOptions.transform.write.includes("minify"),
    // logLevel: "silent",
    external: await $ParseExternals(["esbuild", ...buildOptions.external]),
    plugins
  }).catch(function(error) {
    if (error instanceof Error) {
      const messages = error.message.split("\n");
      for (let i = 1; i < messages.length; i++) {
        const line = messages[i];
        const execResult = /(?<file>(.+?)):((?<row>\d+):(?<column>\d+):) ERROR: (?<error>.+)/.exec(line);
        if (execResult) result.add({ ...execResult.groups }, { error: true });
      }
    } else {
      result.add({ error }, { error: true });
    }
  });
  result.add({ time: Date.now() - startTime }, { stats: true });
  if (buildQuery === void 0) return result.reject();
  const buildResult = buildQuery;
  const inputs = buildResult.metafile.inputs;
  const manifest = Object.keys(buildResult.metafile.inputs);
  result.add({ inputs }, { inputs: true });
  result.add({ manifest }, { manifest: true });
  const code = await $ApplyWriteTransforms(buildResult.outputFiles[0].text, buildOptions);
  result.add({ code }, { code: true });
  return result.resolve();
}
async function $Obfuscate(code) {
  const obfuscationResult = (0, import_javascript_obfuscator.obfuscate)(
    code,
    {
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 1,
      numbersToExpressions: true,
      simplify: true,
      stringArrayShuffle: true,
      splitStrings: true,
      stringArrayThreshold: 1
    }
  );
  return obfuscationResult.getObfuscatedCode();
}
async function $ApplyWriteTransforms(code, options) {
  const writeTransforms = options.transform.write;
  code = (options.platform == "node" ? "#! /usr/bin/env node\n\n" : "") + code;
  if (writeTransforms.includes("obfuscate")) code = await $Obfuscate(code);
  if (writeTransforms.includes("gzip")) {
    const buffer = await ForgeZip.$GZip(code);
    if (writeTransforms.includes("base64")) return Base64.Encode(buffer);
    return DecodeString(buffer);
  } else if (writeTransforms.includes("brotli")) {
  } else if (writeTransforms.includes("zip")) {
  }
  if (writeTransforms.includes("base64")) code = Base64.Encode(code);
  return code;
}
async function $Clean() {
  const files = [
    ...await ForgeFile.$Walk(ForgePath.Resolve(__dirname, "./lib"), { recursive: false, directory: true }),
    ...await ForgeFile.$Walk(ForgePath.Resolve(__dirname, "./tmp"), { recursive: false, directory: true })
  ];
  const promises = [];
  for (const file of files) promises.push((0, import_promises.rm)(file, { recursive: true, force: true }));
  await Promise.allSettled(promises);
}

// src/ts/build/LibraryBuilder.ts
function ExportPlugin(files, hashes, resolves) {
  const errors = [];
  return {
    name: "forge-export-library",
    setup: function(build) {
      build.onResolve({ filter: /.+/ }, async function(args) {
        let { path: path4, resolveDir, importer } = args;
        if (resolves.directories) {
          for (const [match, replace] of Object.entries(resolves.directories)) {
            if (path4.startsWith(match)) path4 = path4.replace(match, ForgePath.Resolve(replace) + "/");
          }
        }
        for (const ext of [".ts", ".tsx", ".jsx", ".js"]) {
          const absolutePath = ForgePath.Resolve(resolveDir, `${path4}${ext}`);
          const relativePath = ForgePath.Relative(resolveDir, absolutePath);
          if (await ForgeFile.$FileExist(absolutePath)) {
            if (resolves.files[absolutePath]) {
              return { path: resolves.files[absolutePath], external: true };
            } else if (files.includes(absolutePath)) {
              const importParsed = ForgePath.Parse(importer);
              if (importParsed.name == "{index}") return { path: hashes.get(absolutePath).path, external: true, namespace: "remapped" };
              const pathParsed = ForgePath.Parse(hashes.get(absolutePath).path);
              return { path: "./" + pathParsed.base, external: true, namespace: "remapped" };
              return { namespace: "ignore" };
            }
            console.red(`Unresolved file found`, absolutePath, resolves, files);
            errors.push(`Unresolved file found: ${absolutePath}`);
          }
        }
        return { path: path4, external: true };
      });
      build.onLoad({ filter: /\.((ts|x$)|(js|x))/ }, async function(args) {
        console.magenta("onload", args);
        const { path: path4 } = args;
        const contents = hashes.has(path4) ? hashes.get(path4).contents : await FileCache.$FetchString(path4);
        return { contents, loader: "tsx" };
      });
      build.onEnd(function() {
        if (errors.length) console.log("errors", errors);
        if (errors.length) throw new Error(`Error found compiling ${errors}`);
      });
    }
  };
}
var LibraryBuilder = class {
  _exportedComponents = /* @__PURE__ */ new Set();
  _sanitizeSources({ root, files, aliases }) {
    const sanitizedFiles = [];
    for (const file of files) sanitizedFiles.push(ForgePath.Resolve(file));
    const sanitizedResolves = {};
    for (const [file, resolve] of Object.entries(aliases.files)) {
      if (ForgePath.IsAbsolute(file)) {
        sanitizedResolves[file] = resolve;
      } else {
        sanitizedResolves[ForgePath.Resolve(root, file)] = resolve;
      }
    }
    return {
      root,
      files: sanitizedFiles,
      aliases: {
        files: sanitizedResolves,
        directories: aliases.directories
      }
    };
  }
  async _$extractImportations(file, root, javascript) {
    const parsedPath = ForgePath.Parse(file);
    const name = parsedPath.name;
    const code = await FileCache.$FetchString(file);
    const importations = /* @__PURE__ */ new Set();
    const skippedImportations = [];
    const regExp = javascript === true ? /(^|\n)\s*export\s+(default)?((async function)|function|class|var|const|let)\s+(?<component>[$\w]+)/gm : /(^|\n)\s*export\s+(default)?((async function)|function|class|enum|interface|var|const|let|type)\s+(?<component>[$\w]+)/gm;
    let results;
    while (results = regExp.exec(code)) {
      const exportName = results.groups.component;
      const tranformsResults = new RegExp(`${exportName}\\d+`).exec(code);
      const transformedExport = tranformsResults ? tranformsResults[0] : exportName;
      if (this._exportedComponents.has(exportName)) {
        if (importations.has(exportName) === false) skippedImportations.push(exportName);
      } else {
        importations.add(exportName);
      }
      this._exportedComponents.add(transformedExport);
    }
    let importEntry = importations.size == 0 ? "// " : "";
    importEntry += `import { ${[...importations].join(", ")} } from "${ForgePath.Relative(root, parsedPath.dir)}/${name}";`.replace(/\\/g, "/").replace(".//", "./");
    if (skippedImportations.length) importEntry += ` // skipped imports :{ ${skippedImportations.join(", ")} }`;
    return importEntry;
  }
  async $merge(sources, basic) {
    const { files, root } = sources;
    const importations = [];
    for (const file of files) importations.push(await this._$extractImportations(file, root, basic));
    return `${importations.join("\n")}
        
export {

${[...this._exportedComponents].map((value) => "	" + value.replace(/[^\w$]+/g, "_")).join(",\n")} 
            
};`;
  }
  async $bundle(sources, buildOptions) {
    const { files, root, aliases } = this._sanitizeSources(sources);
    const contents = await this.$merge(sources);
    const result = await $Transform({ root, contents }, buildOptions, {
      plugins: [{
        name: "forge-library-bundle",
        setup(build) {
          build.onResolve({ filter: /.+/ }, async function(args) {
            const { path: path4, resolveDir } = args;
            for (const ext of [".ts", ".tsx", ".jsx", ".js"]) {
              const absolutePath = ForgePath.Resolve(resolveDir, `${path4}${ext}`);
              if (aliases[absolutePath]) return { path: aliases[absolutePath], external: true };
              if (files.includes(absolutePath) === false) return { path: path4, external: true };
              if (await ForgeFile.$FileExist(absolutePath)) return { path: absolutePath, external: false };
            }
            return { path: path4, external: true };
          });
        }
      }]
    });
    return result.or({ code: true }).first.code;
  }
  async $export(sources, buildOptions, libraryExport) {
    let { files, root, aliases } = this._sanitizeSources(sources);
    files = files.filter((file) => buildOptions.ignores.includes(file) === false);
    const hashes = /* @__PURE__ */ new Map();
    const { bundled } = buildOptions;
    for (const file of files) {
      let path4;
      if (bundled == "preserve") {
        const parsedFile = ForgePath.Parse(file);
        path4 = ForgePath.Join(libraryExport.join, ForgePath.Relative(root, ForgePath.Join(parsedFile.dir, parsedFile.name))) + libraryExport.ext;
      } else if (bundled == "mangle") {
        path4 = ForgePath.Join(libraryExport.join, QuickHash()) + libraryExport.ext;
      }
      hashes.set(file, { path: path4, contents: await FileCache.$FetchString(file) });
    }
    const bundle = new Result();
    const contents = await this.$merge({ files, root, aliases }, true);
    const plugins = buildOptions.bundled == "preserve" || buildOptions.bundled == "mangle" ? [ExportPlugin(files, hashes, aliases)] : [];
    const transformResult = await $Transform({ root, contents, source: "{index}" }, buildOptions, { plugins });
    if (transformResult.success === false) return transformResult;
    const { code } = transformResult.or({ code: true }).first;
    bundle.add({ code, path: "{index}" }, { code: true, index: true });
    for (const file of files) {
      if (buildOptions.ignores.includes(file)) {
        console.red("ignore found", file);
        continue;
      }
      const { contents: contents2, path: path4 } = hashes.get(file);
      const fileParsed = ForgePath.Parse(file);
      const transformResult2 = await $Transform({ root: fileParsed.dir, contents: contents2, source: file }, buildOptions, { plugins });
      if (transformResult2.success === false) {
        for (const [component, attributes] of transformResult2) console.log(attributes, component);
        throw `Error compiling library.$Export( ): ${file}`;
      }
      const { code: code2 } = transformResult2.or({ code: true }).first;
      bundle.add({ code: code2, path: path4 }, { code: true, dependency: true });
    }
    return bundle;
  }
};

// src/ts/build/TypesBuilder.ts
var import_typescript = require("typescript");
async function $BuildTypes(entry, packageName, buildOptions) {
  const errors = [];
  if (entry.files) {
    for (const file of entry.files) if (await ForgeFile.$FileExist(file) === false) errors.push(`Entry file: "${file}" is invalid`);
  } else {
    errors.push(`Entry { files } is not an array of vaild files`);
  }
  const result = new Result();
  const fileNames = entry.files;
  const compilerOptions = {
    allowJs: true,
    declaration: true,
    emitDeclarationOnly: true
  };
  const createdFiles = {};
  const host = (0, import_typescript.createCompilerHost)(compilerOptions);
  host.writeFile = (fileName, contents) => createdFiles[fileName] = contents;
  const program = (0, import_typescript.createProgram)(fileNames, compilerOptions, host);
  program.emit();
  const codeSegments = ["\n", `// @ts-nocheck

declare module "${packageName}" {
`];
  if (buildOptions.bundled === "merge") {
    for (const [filename, contents] of Object.entries(createdFiles)) {
      const code2 = contents.replace("export {};", "").replace(/\s*import.+?["'`].+?["'`];\s*/g, "\n").replace(/declare\s+/g, "").split("\n").map((line) => `	${line}`).join("\n");
      codeSegments.push(code2);
    }
    codeSegments.push("\n}");
    const code = await $ApplyWriteTransforms(codeSegments.join("\n"), { transform: { write: [] } });
    result.add({ code }, { code: true });
  } else if (buildOptions.bundled == "preserve") {
    throw new Error(`not yet implemented bundled == "preserve"`);
  }
  return result.resolve();
}

// src/ts/build/BuildClient.ts
function SerializeResult(result) {
  const success = result.success;
  const serializedResult = [];
  for (const [component, attributes] of result) serializedResult.push([component, attributes]);
  return {
    success,
    result: serializedResult
  };
}
var BuildClient = class extends ForgeClient {
  _contexts = /* @__PURE__ */ new Map();
  /* constructor(options: { key?: string, name?: string, race?: Record<string, number> }) {
  
          super(options);
  
      } */
  async $watch(data, session) {
    let { file, event } = data;
    file = file.replace(/\\/g, "/");
    UncacheFile(file);
    const promises = [];
    for (const [hash, { filter, entry, target, build }] of this._contexts) {
      if (filter.test(file) === false) continue;
      promises.push($Build(entry, build));
    }
    await Promise.allSettled(promises);
    return {
      success: true,
      message: `file :${file} flushed`
    };
  }
  async $reset(data, session) {
    const files = [
      ...await ForgeFile.$Walk(ForgePath.Resolve(__dirname, "./lib"), { recursive: false, directory: true }),
      ...await ForgeFile.$Walk(ForgePath.Resolve(__dirname, "./tmp"), { recursive: false, directory: true })
    ];
    const promises = [];
    for (const file of files) {
      promises.push((0, import_promises2.rm)(file, { recursive: true, force: true }));
    }
    await Promise.allSettled(promises);
    return {
      success: true
    };
  }
  async $execute(signal, data, session) {
    console.cyan(`$execute`, signal);
    switch (signal.toLowerCase()) {
      /* case "uncache":
                      return this.Uncache(data, session);
      
                  case "cache":
                      return this.Cache(data, session); */
      case "add-context":
        return this.$startContext(data, session);
      case "remove-context":
        return this.$stopContext(data, session);
      case "bundle":
        return this.$bundle(data, session);
      case "library":
        return this.$library(data, session);
      case "types":
        return this.$types(data, session);
    }
    return { "execute": "empty function" };
  }
  async $route(request, response) {
    throw "ADD SOMETHING";
  }
  async $startContext(data, session) {
    const { entry, target } = data;
    let filter;
    try {
      if (data.filter) filter = new RegExp(data.filter);
    } catch (error) {
      console.red(data.filter, error);
    }
    const errors = [];
    const build = new BuilderConfig(data.build);
    const hash = QuickHash();
    this._contexts.set(hash, { filter, entry, target, build });
    return {
      success: true,
      hash,
      message: ``
    };
  }
  async $stopContext(data, session) {
    const hash = data.hash;
    if (hash === void 0 || this._contexts.has(hash) === false) return {
      success: false,
      message: `context does no exist for ${hash}`
    };
    this._contexts.delete(hash);
    return {
      success: true,
      message: `context does nto exist for ${hash}`
    };
  }
  async $bundle(data, session) {
    const { entry, build, target } = data;
    if (entry === void 0 || entry == "") throw `"in" property missing from action data`;
    return SerializeResult(await $Build(entry, build));
  }
  async $library(data, session) {
    const { source, build } = data;
    const { root, aliases } = source;
    const files = source ? source.files : await ForgeFile.$Walk(source.walk);
    const library = new LibraryBuilder();
    if (build.bundled == "mangle" || build.bundled == "preserve") {
      return SerializeResult(await library.$export({ files, root, aliases }, new BuilderConfig(build), { join: "./lib/", ext: ".js" }));
    } else if (build.bundled == "merge") {
      const code2 = await library.$bundle({ files, root, aliases }, new BuilderConfig(build));
      return {
        success: true,
        result: [{ code: code2 }, { code: true, source: true }]
      };
    }
    const code = await library.$merge({ root, files, aliases });
    return {
      success: true,
      result: [{ code }, { code: true, source: true }]
    };
  }
  async $listen(port, key) {
    if (this._server) return this._server;
    if (isNaN(port) === true) throw new Error(`Port not supplied to Socket Server`);
    this._server = new ForgeWebSocketServer(port, key);
    this._server[Reactivity].subscribe(async function([socket, header, data]) {
      if (header === void 0) return;
      try {
        this._$subscribeMessage("message", socket, header, data);
      } catch (error) {
        socket.reject(header, { error: String(error) });
      }
    }.bind(this));
    return this._server;
  }
  async $types(data, session) {
    const { entry, name, build, options: { ignore, temp } } = data;
    return SerializeResult(await $BuildTypes(entry, name, build, { ignore, temp }));
  }
};

// src/ts/client.ts
async function $OutputCompiledCode(code, outFile) {
  if (outFile) {
    console.log("writing fiel", outFile);
    await ForgeFile.$Write(outFile, code, { recursive: true });
  } else {
    await new Promise(function(resolve, reject) {
      if (code instanceof ArrayBuffer) {
        process.stdout.write(new Uint8Array(code), resolve);
      } else {
        process.stdout.write(code, resolve);
      }
    });
  }
}

// src/ts/build/NPMBuilder.ts
async function $BuildNPM(builderOptions, bin, library) {
  const npmResult = new Result();
  const totalTime = Date.now();
  {
    const startTimne = Date.now();
    const { files, name } = library;
    const result = await $BuildTypes({ files }, name, { ...builderOptions, bundled: "merge" });
    if (result.success === false) return npmResult.merge(result).reject();
    const { code } = result.or({ code: true }).first;
    npmResult.add({ code }, { code: true, types: true });
    const size = CalcCodeSize(code);
    const elapsed = Date.now() - startTimne;
    npmResult.add({ elapsed, size }, { stats: true, types: true });
    console.blue("index.d.ts compiled in ", Date.now() - startTimne, "s");
  }
  {
    const startTimne = Date.now();
    builderOptions.format = "cjs";
    builderOptions.platform = "node";
    const result = await $Build(bin.entry, builderOptions);
    if (result.success === false) return npmResult.merge(result).reject();
    const { code } = result.or({ code: true }).first;
    npmResult.add({ code }, { code: true, types: true });
    const size = CalcCodeSize(code);
    const elapsed = Date.now() - startTimne;
    npmResult.add({ elapsed, size }, { stats: true, types: true });
  }
  {
    const { files, root, join, ext } = library;
    const formats = [["cjs", ext.cjs], ["esm", ext.esm]];
    for (const [format, ext2] of formats) {
      const startTime = Date.now();
      const library2 = new LibraryBuilder();
      builderOptions.format = format;
      builderOptions.bundled = "mangle";
      if (builderOptions.bundled == "mangle" || builderOptions.bundled == "preserve") {
        const result = await library2.$export({ files, root, aliases: builderOptions.aliases }, builderOptions, { join, ext: ext2 });
        if (result.success === false) return npmResult.merge(result).reject();
        for (const [component, attributes] of result.or({ code: true })) {
          let { code, path: path4 } = component;
          const size = CalcCodeSize(code);
          const elapsed = startTime - Date.now();
          if (path4 == "{index}") {
            path4 = `index${ext2}`;
            npmResult.add({ code, path: path4 }, { code: true, library: true, index: true, format });
            npmResult.add({ elapsed, size }, { stats: true, library: true, index: true, format });
          } else {
            npmResult.add({ code, path: path4 }, { code: true, library: true, format });
            npmResult.add({ elapsed, size }, { stats: true, library: true, format });
          }
        }
      } else if (builderOptions.bundled == "merge") {
        const code = await library2.$bundle({ files, root, aliases: builderOptions.aliases }, builderOptions);
        npmResult.add({ code }, { code: true, library: true, index: true, format });
      } else {
        throw new Error(`Invalid bundle option: ${builderOptions.bundled}`);
      }
    }
  }
  console.blue("library compiled in ", Date.now() - totalTime, "s");
  return npmResult;
}

// src/ts/bin.ts
var path3 = require("path");
var fs2 = require("fs");
var $fs2 = require("node:fs/promises");
var { spawn: spawn2, fork: fork2, exec: exec2, execSync: execSync2 } = require("child_process");
var application;
(async function() {
  const args = FetchArguments();
  try {
    args.compile();
    console.log([...args]);
  } catch (error) {
    console.error("The following errors were found:");
    console.error(error["message"]);
    process.exit(1);
  }
  const KEY = args.last("key");
  const OUT = args.last("out");
  const PLATFORM = args.last(/^platform$/i);
  const FORMAT = args.last(/^format$/i);
  const BUNDLE = args.last(/^bundle$/i);
  const WRITE = args.last(/^write$/i);
  const MOUNT = args.last(/^mount$/);
  const BUILD = args.last(/^b$|^forge-typescript\/build/i);
  const PERSIST = args.last(/^p$|^forge-typescript\/persist$/i);
  const INLINE = args.last(/^i$|^forge-typescript\/inline$/i);
  const WATCH = args.last(/^w$|^forge-typescript\/watch$/i);
  const LISTEN = args.last(/^l$^|forge-typescript\/listen$/g);
  const LIBRARY = args.last(/^forge-typescript\/library$/i);
  const TYPES = args.last(/^forge-typescript\/types$/i);
  const CLEAN = args.last(/^forge-typescript\/clean$/i);
  const NPM = args.last(/^forge-typescript\/npm$/i);
  if (CLEAN) await $Clean();
  if (PERSIST || WATCH || LISTEN) {
    console.parse("<red>Persist STARTED");
    application = new BuildClient({ race: { ".*": 500 } });
    if (LISTEN) {
      const server2 = await application.$listen(LISTEN);
    }
  }
  const builderOptions = await BuilderConfig.$From({ args });
  if (TYPES) {
    const name = args.last(/^name$/i);
    const files = await args.$walk(/^files$/, { ignores: builderOptions.ignores });
    const errors = [];
    if (name === void 0) errors.push(`arguments for <cyan>{ name }</cyan> is needed for assigning the namespace files`);
    if (files === void 0 || files.length == 0) errors.push(`arguments for <cyan>{ files }</cyan> has no files assigned`);
    if (errors.length) {
      console.parse("<red>Errors:");
      for (const error of errors) console.parse(`	<red>${error}`);
      process.exit();
    }
    builderOptions.bundled = "merge";
    builderOptions.write = "memory";
    const result = await $BuildTypes({ files }, name, builderOptions);
    ProcessBuilderResult(result, [`Error bundling d.ts to ${OUT} with the following errors:`]);
    const { code } = result.or({ code: true }).first;
    await $OutputCompiledCode(code, OUT);
  } else if (BUILD) {
    const ENTRY_FILE = args.last("in");
    const errors = [];
    if (ENTRY_FILE === void 0) errors.push(`"in" property missing from action data`);
    await $Build(ENTRY_FILE, new BuilderConfig(builderOptions)).then(function(result) {
      if (result.success === false) throw new Error(`Error compiling`);
      const { code } = result.or({ code: true }).first;
      return $OutputCompiledCode(code, OUT);
    }).catch(CatchCompiledError);
  } else if (INLINE) {
    const inlineFile = args.last(/^script/i);
    const contents = (await ForgeFile.$ReadDecoded(inlineFile)).replace(/\s*import(\s+\{\s*(?<components>.+?)\s*\}).+?["'`](?<file>@onyx-ignition[\/\\]forge-core)["'`];\s*/g, "\n");
    builderOptions.bundled = "preserve";
    builderOptions.platform = "node";
    builderOptions.treeShaking = true;
    builderOptions.ignores = await ForgeFile.$Walk("../Forge-Typescript-Source/src/ts/formless", { resolve: true });
    const result = await $Transform({ source: inlineFile, root: "./", contents }, builderOptions, { cache: false });
    if (result.success == false) {
      console.red("Errors found");
      for (const [error, attributes] of result) console.red(error);
    }
    const { code } = result.or({ code: true }).first;
    await ForgeFile.$Write("./dump.js", code);
    process["eval"](code);
  } else if (LIBRARY) {
    const join = args.last(/^join$/i) || "./lib/";
    const root = args.last(/^root$/i);
    const files = await args.$walk(/^file$/i, { ignores: builderOptions.ignores });
    const ext = args.last(/^ext$/i) || ".js";
    const aliases = { files: [], directories: {}, ...args.attributes(/^alias$/i) };
    console.log("aliasDirectories", aliases);
    const library = new LibraryBuilder();
    if (builderOptions.bundled == "mangle" || builderOptions.bundled == "preserve") {
      if (OUT === void 0) throw new Error(`--out-- parameter missing`);
      const result = await library.$export({ files, root, aliases }, builderOptions, { join, ext });
      if (result.success == false) {
        for (const [component, attributes] of result) {
          console.red(component);
        }
        throw new Error(`Error transforming inline file`);
      }
      const outParsed = ForgePath.Parse(OUT);
      for (const [component, attributes] of result.or({ code: true })) {
        const { code, path: path4 } = component;
        const target = path4 == "{index}" ? ForgePath.Resolve(OUT) : ForgePath.Resolve(outParsed.dir, path4);
      }
    } else if (builderOptions.bundled == "merge") {
      const code = await library.$bundle({ files, root, aliases }, builderOptions);
      await $OutputCompiledCode(code, OUT);
    } else {
      throw new Error(`Invalid bundle option: ${builderOptions.bundled}`);
    }
  } else if (NPM) {
    const name = args.last(/^name$/i);
    const files = await args.$walk(/^(files)$/, { ignores: builderOptions.ignores });
    const createPackageJSON = args.last(/^package$/);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>");
    const aliases = { files: {}, directories: {}, ...args.attributes(/^alias$/i) };
    console.log(aliases);
    process.exit();
    const bin = args.attributes(/^bin$/i);
    const errors = [];
    const warnings = [];
    let queryOutDir;
    if (OUT === void 0) {
      errors.push(`arguments for <cyan>{ out }</cyan> is missing or invalid`);
    } else {
      queryOutDir = await ForgeFile.$DirectoryExists(OUT) ? OUT : ForgePath.Parse(OUT).dir;
      if (await ForgeFile.$DirectoryExists(queryOutDir) === false) warnings.push(`arguments for <cyan>{ out }</cyan> is a file. It was resolve to the parent directory`);
    }
    const outDir = queryOutDir;
    const library = args.attributes(/^library$/);
    if (library === void 0) errors.push(`arguments for <cyan>{ library }</cyan> is required and missing or invalid`);
    if (library?.root === void 0) errors.push(`arguments for <cyan>{ library.root }</cyan> is required is missing or invalid`);
    if (library?.join === void 0) warnings.push(`arguments for <cyan>{ library.join }</cyan> is optional and will default to "./lib/"`);
    if (bin) {
      console.log(bin.entry);
      if (await ForgeFile.$FileExist(bin.entry) === false) errors.push(`arguments for { bin.entry } does not exist`);
    } else {
      errors.push(`arguments for <cyan>{ bin.entry }</cyan> is missing or invalid`);
    }
    if (errors.length) {
      console.parse("<yellow>Warnings:");
      for (const warning of warnings) console.parse(`	<yellow>${warning}`);
      console.parse("<red>Errors:");
      for (const error of errors) console.parse(`	<red>${error}`);
      process.exit();
    }
    const { root, join } = { join: "./lib", ...library };
    const ext = {
      cjs: library.ext?.cjs || ".js",
      esm: library.ext?.esm || ".mjs"
    };
    const results = await $BuildNPM(builderOptions, { entry: bin.entry }, { files, root, join, name, ext });
    for (const [component, attributes] of results) console.log(attributes);
    process.exit();
    {
      const startTimne = Date.now();
      builderOptions.bundled = "merge";
      builderOptions.write = "memory";
      const result = await $BuildTypes({ files }, name, builderOptions);
      ProcessBuilderResult(result, [`Error building index.d.ts files with the following errors:`]);
      const { code } = result.or({ code: true }).first;
      const targetFile = ForgePath.Resolve(outDir, `index.d.ts`);
      await $OutputCompiledCode(code, targetFile);
      console.blue("index.d.ts compiled in ", Date.now() - startTimne, "s");
    }
    {
      const startTimne = Date.now();
      const join2 = library.join || "./lib/";
      const root2 = library.root;
      builderOptions.bundled = "mangle";
      const formats = [["cjs", ".js"], ["esm", ".mjs"]];
      for (const [format, ext2] of formats) {
        const library2 = new LibraryBuilder();
        builderOptions.format = format;
        if (builderOptions.bundled == "mangle" || builderOptions.bundled == "preserve") {
          const result = await library2.$export({ files, root: root2, aliases }, builderOptions, { join: join2, ext: ext2 });
          if (result.success == false) {
            const errors2 = [];
            for (const [component, attributes] of result.or({ error: true })) errors2.push(component.error);
            throw new Error(`The following errors occured while exporting NPM: 
${errors2.join("\n")}`);
          }
          const outParsed = ForgePath.Parse(OUT);
          for (const [component, attributes] of result.or({ code: true })) {
            const { code, path: path4 } = component;
            const target = path4 == "{index}" ? ForgePath.Resolve(outDir, `index${ext2}`) : ForgePath.Resolve(outDir, path4);
            await ForgeFile.$Write(target, code, { recursive: true });
          }
        } else if (builderOptions.bundled == "merge") {
          const code = await library2.$bundle({ files, root: root2, aliases }, builderOptions);
          await $OutputCompiledCode(code, OUT);
        } else {
          throw new Error(`Invalid bundle option: ${builderOptions.bundled}`);
        }
      }
      console.blue("bin.js compiled in ", Date.now() - startTimne, "s");
    }
    {
      const startTimne = Date.now();
      builderOptions.format = "cjs";
      builderOptions.platform = "node";
      const result = await $Build(bin.entry, builderOptions);
      ProcessBuilderResult(result);
      const { code } = result.or({ code: true }).first;
      const targetFile = ForgePath.Resolve(outDir, `bin.js`);
      await $OutputCompiledCode(code, targetFile);
      console.blue("bin.js compiled in ", Date.now() - startTimne, "s");
    }
    {
      if (createPackageJSON) {
        const packageJSON = {
          "name": name,
          "author": "",
          "version": "1.0.0",
          "keywords": [name],
          "description": "",
          "bin": "./bin.js",
          "main": "./index.js",
          "exports": {
            ".": {
              "types": "./index.d.ts",
              "require": "./index.js",
              "import": "./index.mjs"
            }
          },
          "scripts": {},
          "license": "ISC",
          "repository": {
            "type": "git",
            "url": ""
          },
          "dependencies": {}
        };
        const targetFile = ForgePath.Resolve(outDir, `package.json`);
        await $OutputCompiledCode(JSON.stringify(packageJSON), targetFile);
      }
    }
  }
})();
function ProcessBuilderResult(result, errorHeaders) {
  if (result.success == false) {
    if (errorHeaders) for (const error of errorHeaders) console.parse(error);
    for (const [component, attributes] of result.or({ error: true })) console.parse("	", component.error);
    process.exit(1);
  }
}
async function CatchCompiledError(error) {
  process.exit(1);
}
/*! Bundled license information:

@onyx-ignition/forge/index.mjs:
  (*! Bundled license information:
  
  negotiator/index.js:
    (*!
     * negotiator
     * Copyright(c) 2012 Federico Romero
     * Copyright(c) 2012-2014 Isaac Z. Schlueter
     * Copyright(c) 2015 Douglas Christopher Wilson
     * MIT Licensed
     *)
  
  safe-buffer/index.js:
    (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
  
  bytes/index.js:
    (*!
     * bytes
     * Copyright(c) 2012-2014 TJ Holowaychuk
     * Copyright(c) 2015 Jed Watson
     * MIT Licensed
     *)
  
  compressible/index.js:
    (*!
     * compressible
     * Copyright(c) 2013 Jonathan Ong
     * Copyright(c) 2014 Jeremiah Senkpiel
     * Copyright(c) 2015 Douglas Christopher Wilson
     * MIT Licensed
     *)
  
  on-headers/index.js:
    (*!
     * on-headers
     * Copyright(c) 2014 Douglas Christopher Wilson
     * MIT Licensed
     *)
  
  vary/index.js:
    (*!
     * vary
     * Copyright(c) 2014-2017 Douglas Christopher Wilson
     * MIT Licensed
     *)
  
  compression/index.js:
    (*!
     * compression
     * Copyright(c) 2010 Sencha Inc.
     * Copyright(c) 2011 TJ Holowaychuk
     * Copyright(c) 2014 Jonathan Ong
     * Copyright(c) 2014-2015 Douglas Christopher Wilson
     * MIT Licensed
     *)
  
  cookie/index.js:
    (*!
     * cookie
     * Copyright(c) 2012-2014 Roman Shtylman
     * Copyright(c) 2015 Douglas Christopher Wilson
     * MIT Licensed
     *)
  
  cookie-parser/index.js:
    (*!
     * cookie-parser
     * Copyright(c) 2014 TJ Holowaychuk
     * Copyright(c) 2015 Douglas Christopher Wilson
     * MIT Licensed
     *)
  *)
*/
