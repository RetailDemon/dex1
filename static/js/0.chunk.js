(this.webpackJsonpunifactory = this.webpackJsonpunifactory || []).push([
    [0],
    {
        1038: function (e, t, r) {
            const n = r(1039),
                o = r(1127);
            function s(e, t) {
                return new Promise((r) => {
                    const n = setTimeout(r, e);
                    n.unref && t && n.unref();
                });
            }
            e.exports = class extends o {
                constructor() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if (!e.provider) throw new Error("PollingBlockTracker - no provider specified.");
                    const t = e.pollingInterval || 2e4,
                        r = e.retryTimeout || t / 10,
                        n = void 0 === e.keepEventLoopActive || e.keepEventLoopActive,
                        o = e.setSkipCacheFlag || !1;
                    super(Object.assign({ blockResetDuration: t }, e)), (this._provider = e.provider), (this._pollingInterval = t), (this._retryTimeout = r), (this._keepEventLoopActive = n), (this._setSkipCacheFlag = o);
                }
                async checkForLatestBlock() {
                    return await this._updateLatestBlock(), await this.getLatestBlock();
                }
                _start() {
                    this._performSync().catch((e) => this.emit("error", e));
                }
                async _performSync() {
                    for (; this._isRunning; )
                        try {
                            await this._updateLatestBlock(), await s(this._pollingInterval, !this._keepEventLoopActive);
                        } catch (e) {
                            const r = new Error("PollingBlockTracker - encountered an error while attempting to update latest block:\n".concat(e.stack));
                            try {
                                this.emit("error", r);
                            } catch (t) {
                                console.error(r);
                            }
                            await s(this._retryTimeout, !this._keepEventLoopActive);
                        }
                }
                async _updateLatestBlock() {
                    const e = await this._fetchLatestBlock();
                    this._newPotentialLatest(e);
                }
                async _fetchLatestBlock() {
                    const e = { jsonrpc: "2.0", id: 1, method: "eth_blockNumber", params: [] };
                    this._setSkipCacheFlag && (e.skipCache = !0);
                    const t = await n((t) => this._provider.sendAsync(e, t))();
                    if (t.error) throw new Error("PollingBlockTracker - encountered error fetching block:\n".concat(t.error));
                    return t.result;
                }
            };
        },
        1039: function (e, t, r) {
            "use strict";
            const n = (e, t) =>
                function () {
                    const r = t.promiseModule,
                        n = new Array(arguments.length);
                    for (let e = 0; e < arguments.length; e++) n[e] = arguments[e];
                    return new r((r, o) => {
                        t.errorFirst
                            ? n.push(function (e, n) {
                                  if (t.multiArgs) {
                                      const t = new Array(arguments.length - 1);
                                      for (let e = 1; e < arguments.length; e++) t[e - 1] = arguments[e];
                                      e ? (t.unshift(e), o(t)) : r(t);
                                  } else e ? o(e) : r(n);
                              })
                            : n.push(function (e) {
                                  if (t.multiArgs) {
                                      const e = new Array(arguments.length - 1);
                                      for (let t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                      r(e);
                                  } else r(e);
                              }),
                            e.apply(this, n);
                    });
                };
            e.exports = (e, t) => {
                t = Object.assign({ exclude: [/.+(Sync|Stream)$/], errorFirst: !0, promiseModule: Promise }, t);
                const r = (e) => {
                    const r = (t) => ("string" === typeof t ? e === t : t.test(e));
                    return t.include ? t.include.some(r) : !t.exclude.some(r);
                };
                let o;
                o =
                    "function" === typeof e
                        ? function () {
                              return t.excludeMain ? e.apply(this, arguments) : n(e, t).apply(this, arguments);
                          }
                        : Object.create(Object.getPrototypeOf(e));
                for (const s in e) {
                    const i = e[s];
                    o[s] = "function" === typeof i && r(s) ? n(i, t) : i;
                }
                return o;
            };
        },
        1040: function (e, t, r) {
            const n = r(952),
                o = r(1128)();
            function s(e) {
                this.currentProvider = e;
            }
            function i(e) {
                return function () {
                    const t = this;
                    var r = [].slice.call(arguments),
                        n = r.pop();
                    t.sendAsync({ method: e, params: r }, n);
                };
            }
            function c(e, t) {
                return function () {
                    const r = this;
                    var n = [].slice.call(arguments),
                        o = n.pop();
                    n.length < e && n.push("latest"), r.sendAsync({ method: t, params: n }, o);
                };
            }
            (e.exports = s),
                (s.prototype.getBalance = c(2, "eth_getBalance")),
                (s.prototype.getCode = c(2, "eth_getCode")),
                (s.prototype.getTransactionCount = c(2, "eth_getTransactionCount")),
                (s.prototype.getStorageAt = c(3, "eth_getStorageAt")),
                (s.prototype.call = c(2, "eth_call")),
                (s.prototype.protocolVersion = i("eth_protocolVersion")),
                (s.prototype.syncing = i("eth_syncing")),
                (s.prototype.coinbase = i("eth_coinbase")),
                (s.prototype.mining = i("eth_mining")),
                (s.prototype.hashrate = i("eth_hashrate")),
                (s.prototype.gasPrice = i("eth_gasPrice")),
                (s.prototype.accounts = i("eth_accounts")),
                (s.prototype.blockNumber = i("eth_blockNumber")),
                (s.prototype.getBlockTransactionCountByHash = i("eth_getBlockTransactionCountByHash")),
                (s.prototype.getBlockTransactionCountByNumber = i("eth_getBlockTransactionCountByNumber")),
                (s.prototype.getUncleCountByBlockHash = i("eth_getUncleCountByBlockHash")),
                (s.prototype.getUncleCountByBlockNumber = i("eth_getUncleCountByBlockNumber")),
                (s.prototype.sign = i("eth_sign")),
                (s.prototype.sendTransaction = i("eth_sendTransaction")),
                (s.prototype.sendRawTransaction = i("eth_sendRawTransaction")),
                (s.prototype.estimateGas = i("eth_estimateGas")),
                (s.prototype.getBlockByHash = i("eth_getBlockByHash")),
                (s.prototype.getBlockByNumber = i("eth_getBlockByNumber")),
                (s.prototype.getTransactionByHash = i("eth_getTransactionByHash")),
                (s.prototype.getTransactionByBlockHashAndIndex = i("eth_getTransactionByBlockHashAndIndex")),
                (s.prototype.getTransactionByBlockNumberAndIndex = i("eth_getTransactionByBlockNumberAndIndex")),
                (s.prototype.getTransactionReceipt = i("eth_getTransactionReceipt")),
                (s.prototype.getUncleByBlockHashAndIndex = i("eth_getUncleByBlockHashAndIndex")),
                (s.prototype.getUncleByBlockNumberAndIndex = i("eth_getUncleByBlockNumberAndIndex")),
                (s.prototype.getCompilers = i("eth_getCompilers")),
                (s.prototype.compileLLL = i("eth_compileLLL")),
                (s.prototype.compileSolidity = i("eth_compileSolidity")),
                (s.prototype.compileSerpent = i("eth_compileSerpent")),
                (s.prototype.newFilter = i("eth_newFilter")),
                (s.prototype.newBlockFilter = i("eth_newBlockFilter")),
                (s.prototype.newPendingTransactionFilter = i("eth_newPendingTransactionFilter")),
                (s.prototype.uninstallFilter = i("eth_uninstallFilter")),
                (s.prototype.getFilterChanges = i("eth_getFilterChanges")),
                (s.prototype.getFilterLogs = i("eth_getFilterLogs")),
                (s.prototype.getLogs = i("eth_getLogs")),
                (s.prototype.getWork = i("eth_getWork")),
                (s.prototype.submitWork = i("eth_submitWork")),
                (s.prototype.submitHashrate = i("eth_submitHashrate")),
                (s.prototype.sendAsync = function (e, t) {
                    var r;
                    this.currentProvider.sendAsync(((r = e), n({ id: o(), jsonrpc: "2.0", params: [] }, r)), function (e, r) {
                        if ((!e && r.error && (e = new Error("EthQuery - RPC Error - " + r.error.message)), e)) return t(e);
                        t(null, r.result);
                    });
                });
        },
        1047: function (e, t, r) {
            const n = r(1230).Mutex,
                { createAsyncMiddleware: o } = r(1048),
                s = r(1053),
                i = r(1160),
                c = r(1163),
                a = r(1164),
                { intToHex: u, hexToInt: l } = r(938);
            function d(e) {
                return p(async function () {
                    const t = await e(...arguments),
                        r = u(t.id);
                    return r;
                });
            }
            function p(e) {
                return o(async (t, r) => {
                    const n = await e.apply(null, t.params);
                    r.result = n;
                });
            }
            function h(e, t) {
                const r = [];
                for (let n in e) r.push(e[n]);
                return r;
            }
            e.exports = function (e) {
                let { blockTracker: t, provider: r } = e,
                    o = 0,
                    f = {};
                const m = new n(),
                    y = (function (e) {
                        let { mutex: t } = e;
                        return (e) => async (r, n, o, s) => {
                            (await t.acquire())(), e(r, n, o, s);
                        };
                    })({ mutex: m }),
                    g = s({ eth_newFilter: y(d(_)), eth_newBlockFilter: y(d(w)), eth_newPendingTransactionFilter: y(d(b)), eth_uninstallFilter: y(p(R)), eth_getFilterChanges: y(p(k)), eth_getFilterLogs: y(p(E)) }),
                    v = async (e) => {
                        let { oldBlock: t, newBlock: r } = e;
                        if (0 === f.length) return;
                        const n = await m.acquire();
                        try {
                            await Promise.all(
                                h(f).map(async (e) => {
                                    try {
                                        await e.update({ oldBlock: t, newBlock: r });
                                    } catch (n) {
                                        console.error(n);
                                    }
                                })
                            );
                        } catch (o) {
                            console.error(o);
                        }
                        n();
                    };
                return (
                    (g.newLogFilter = _),
                    (g.newBlockFilter = w),
                    (g.newPendingTransactionFilter = b),
                    (g.uninstallFilter = R),
                    (g.getFilterChanges = k),
                    (g.getFilterLogs = E),
                    (g.destroy = () => {
                        !(async function () {
                            const e = h(f).length;
                            (f = {}), C({ prevFilterCount: e, newFilterCount: 0 });
                        })();
                    }),
                    g
                );
                async function _(e) {
                    const t = new i({ provider: r, params: e });
                    await B(t);
                    return t;
                }
                async function w() {
                    const e = new c({ provider: r });
                    await B(e);
                    return e;
                }
                async function b() {
                    const e = new a({ provider: r });
                    await B(e);
                    return e;
                }
                async function k(e) {
                    const t = l(e),
                        r = f[t];
                    if (!r) throw new Error('No filter for index "'.concat(t, '"'));
                    return r.getChangesAndClear();
                }
                async function E(e) {
                    const t = l(e),
                        r = f[t];
                    if (!r) throw new Error('No filter for index "'.concat(t, '"'));
                    return "log" === r.type ? (results = r.getAllResults()) : (results = []), results;
                }
                async function R(e) {
                    const t = l(e),
                        r = f[t],
                        n = Boolean(r);
                    return (
                        n &&
                            (await (async function (e) {
                                const t = h(f).length;
                                delete f[e];
                                const r = h(f).length;
                                C({ prevFilterCount: t, newFilterCount: r });
                            })(t)),
                        n
                    );
                }
                async function B(e) {
                    const r = h(f).length,
                        n = await t.getLatestBlock();
                    await e.initialize({ currentBlock: n }), o++, (f[o] = e), (e.id = o), (e.idHex = u(o));
                    return C({ prevFilterCount: r, newFilterCount: h(f).length }), o;
                }
                function C(e) {
                    let { prevFilterCount: r, newFilterCount: n } = e;
                    0 === r && n > 0 ? t.on("sync", v) : r > 0 && 0 === n && t.removeListener("sync", v);
                }
            };
        },
        1048: function (e, t, r) {
            "use strict";
            var n =
                    (this && this.__createBinding) ||
                    (Object.create
                        ? function (e, t, r, n) {
                              void 0 === n && (n = r),
                                  Object.defineProperty(e, n, {
                                      enumerable: !0,
                                      get: function () {
                                          return t[r];
                                      },
                                  });
                          }
                        : function (e, t, r, n) {
                              void 0 === n && (n = r), (e[n] = t[r]);
                          }),
                o =
                    (this && this.__exportStar) ||
                    function (e, t) {
                        for (var r in e) "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
            Object.defineProperty(t, "__esModule", { value: !0 }), o(r(1153), t), o(r(1154), t), o(r(1155), t), o(r(1049), t), o(r(1050), t), o(r(1158), t);
        },
        1049: function (e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: !0 }), (t.getUniqueId = void 0);
            let n = Math.floor(4294967295 * Math.random());
            t.getUniqueId = function () {
                return (n = (n + 1) % 4294967295), n;
            };
        },
        1050: function (e, t, r) {
            "use strict";
            var n =
                (this && this.__importDefault) ||
                function (e) {
                    return e && e.__esModule ? e : { default: e };
                };
            Object.defineProperty(t, "__esModule", { value: !0 }), (t.JsonRpcEngine = void 0);
            const o = n(r(956)),
                s = r(1156);
            class i extends o.default {
                constructor() {
                    super(), (this._middleware = []);
                }
                push(e) {
                    this._middleware.push(e);
                }
                handle(e, t) {
                    if (t && "function" !== typeof t) throw new Error('"callback" must be a function if provided.');
                    return Array.isArray(e) ? (t ? this._handleBatch(e, t) : this._handleBatch(e)) : t ? this._handle(e, t) : this._promiseHandle(e);
                }
                asMiddleware() {
                    return async (e, t, r, n) => {
                        try {
                            const [o, s, c] = await i._runAllMiddleware(e, t, this._middleware);
                            return s
                                ? (await i._runReturnHandlers(c), n(o))
                                : r(async (e) => {
                                      try {
                                          await i._runReturnHandlers(c);
                                      } catch (t) {
                                          return e(t);
                                      }
                                      return e();
                                  });
                        } catch (o) {
                            return n(o);
                        }
                    };
                }
                async _handleBatch(e, t) {
                    try {
                        const r = await Promise.all(e.map(this._promiseHandle.bind(this)));
                        return t ? t(null, r) : r;
                    } catch (r) {
                        if (t) return t(r);
                        throw r;
                    }
                }
                _promiseHandle(e) {
                    return new Promise((t) => {
                        this._handle(e, (e, r) => {
                            t(r);
                        });
                    });
                }
                async _handle(e, t) {
                    if (!e || Array.isArray(e) || "object" !== typeof e) {
                        const r = new s.EthereumRpcError(s.errorCodes.rpc.invalidRequest, "Requests must be plain objects. Received: ".concat(typeof e), { request: e });
                        return t(r, { id: void 0, jsonrpc: "2.0", error: r });
                    }
                    if ("string" !== typeof e.method) {
                        const r = new s.EthereumRpcError(s.errorCodes.rpc.invalidRequest, "Must specify a string method. Received: ".concat(typeof e.method), { request: e });
                        return t(r, { id: e.id, jsonrpc: "2.0", error: r });
                    }
                    const r = Object.assign({}, e),
                        n = { id: r.id, jsonrpc: r.jsonrpc };
                    let o = null;
                    try {
                        await this._processRequest(r, n);
                    } catch (i) {
                        o = i;
                    }
                    return o && (delete n.result, n.error || (n.error = s.serializeError(o))), t(o, n);
                }
                async _processRequest(e, t) {
                    const [r, n, o] = await i._runAllMiddleware(e, t, this._middleware);
                    if ((i._checkForCompletion(e, t, n), await i._runReturnHandlers(o), r)) throw r;
                }
                static async _runAllMiddleware(e, t, r) {
                    const n = [];
                    let o = null,
                        s = !1;
                    for (const c of r) if ((([o, s] = await i._runMiddleware(e, t, c, n)), s)) break;
                    return [o, s, n.reverse()];
                }
                static _runMiddleware(e, t, r, n) {
                    return new Promise((o) => {
                        const i = (e) => {
                                const r = e || t.error;
                                r && (t.error = s.serializeError(r)), o([r, !0]);
                            },
                            a = (r) => {
                                t.error
                                    ? i(t.error)
                                    : (r &&
                                          ("function" !== typeof r &&
                                              i(
                                                  new s.EthereumRpcError(s.errorCodes.rpc.internal, 'JsonRpcEngine: "next" return handlers must be functions. ' + 'Received "'.concat(typeof r, '" for request:\n').concat(c(e)), {
                                                      request: e,
                                                  })
                                              ),
                                          n.push(r)),
                                      o([null, !1]));
                            };
                        try {
                            r(e, t, a, i);
                        } catch (u) {
                            i(u);
                        }
                    });
                }
                static async _runReturnHandlers(e) {
                    for (const t of e)
                        await new Promise((e, r) => {
                            t((t) => (t ? r(t) : e()));
                        });
                }
                static _checkForCompletion(e, t, r) {
                    if (!("result" in t) && !("error" in t)) throw new s.EthereumRpcError(s.errorCodes.rpc.internal, "JsonRpcEngine: Response has no error or result for request:\n".concat(c(e)), { request: e });
                    if (!r) throw new s.EthereumRpcError(s.errorCodes.rpc.internal, "JsonRpcEngine: Nothing ended request:\n".concat(c(e)), { request: e });
                }
            }
            function c(e) {
                return JSON.stringify(e, null, 2);
            }
            t.JsonRpcEngine = i;
        },
        1051: function (e, t) {
            (e.exports = s), (s.default = s), (s.stable = a), (s.stableStringify = a);
            var r = [],
                n = [];
            function o() {
                return { depthLimit: Number.MAX_SAFE_INTEGER, edgesLimit: Number.MAX_SAFE_INTEGER };
            }
            function s(e, t, s, c) {
                var a;
                "undefined" === typeof c && (c = o()),
                    (function e(t, r, n, o, s, c, a) {
                        var u;
                        if (((c += 1), "object" === typeof t && null !== t)) {
                            for (u = 0; u < o.length; u++) if (o[u] === t) return void i("[Circular]", t, r, s);
                            if ("undefined" !== typeof a.depthLimit && c > a.depthLimit) return void i("[...]", t, r, s);
                            if ("undefined" !== typeof a.edgesLimit && n + 1 > a.edgesLimit) return void i("[...]", t, r, s);
                            if ((o.push(t), Array.isArray(t))) for (u = 0; u < t.length; u++) e(t[u], u, u, o, t, c, a);
                            else {
                                var l = Object.keys(t);
                                for (u = 0; u < l.length; u++) {
                                    var d = l[u];
                                    e(t[d], d, u, o, t, c, a);
                                }
                            }
                            o.pop();
                        }
                    })(e, "", 0, [], void 0, 0, c);
                try {
                    a = 0 === n.length ? JSON.stringify(e, t, s) : JSON.stringify(e, u(t), s);
                } catch (d) {
                    return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
                } finally {
                    for (; 0 !== r.length; ) {
                        var l = r.pop();
                        4 === l.length ? Object.defineProperty(l[0], l[1], l[3]) : (l[0][l[1]] = l[2]);
                    }
                }
                return a;
            }
            function i(e, t, o, s) {
                var i = Object.getOwnPropertyDescriptor(s, o);
                void 0 !== i.get ? (i.configurable ? (Object.defineProperty(s, o, { value: e }), r.push([s, o, t, i])) : n.push([t, o, e])) : ((s[o] = e), r.push([s, o, t]));
            }
            function c(e, t) {
                return e < t ? -1 : e > t ? 1 : 0;
            }
            function a(e, t, s, a) {
                "undefined" === typeof a && (a = o());
                var l,
                    d =
                        (function e(t, n, o, s, a, u, l) {
                            var d;
                            if (((u += 1), "object" === typeof t && null !== t)) {
                                for (d = 0; d < s.length; d++) if (s[d] === t) return void i("[Circular]", t, n, a);
                                try {
                                    if ("function" === typeof t.toJSON) return;
                                } catch (m) {
                                    return;
                                }
                                if ("undefined" !== typeof l.depthLimit && u > l.depthLimit) return void i("[...]", t, n, a);
                                if ("undefined" !== typeof l.edgesLimit && o + 1 > l.edgesLimit) return void i("[...]", t, n, a);
                                if ((s.push(t), Array.isArray(t))) for (d = 0; d < t.length; d++) e(t[d], d, d, s, t, u, l);
                                else {
                                    var p = {},
                                        h = Object.keys(t).sort(c);
                                    for (d = 0; d < h.length; d++) {
                                        var f = h[d];
                                        e(t[f], f, d, s, t, u, l), (p[f] = t[f]);
                                    }
                                    if ("undefined" === typeof a) return p;
                                    r.push([a, n, t]), (a[n] = p);
                                }
                                s.pop();
                            }
                        })(e, "", 0, [], void 0, 0, a) || e;
                try {
                    l = 0 === n.length ? JSON.stringify(d, t, s) : JSON.stringify(d, u(t), s);
                } catch (h) {
                    return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
                } finally {
                    for (; 0 !== r.length; ) {
                        var p = r.pop();
                        4 === p.length ? Object.defineProperty(p[0], p[1], p[3]) : (p[0][p[1]] = p[2]);
                    }
                }
                return l;
            }
            function u(e) {
                return (
                    (e =
                        "undefined" !== typeof e
                            ? e
                            : function (e, t) {
                                  return t;
                              }),
                    function (t, r) {
                        if (n.length > 0)
                            for (var o = 0; o < n.length; o++) {
                                var s = n[o];
                                if (s[1] === t && s[0] === r) {
                                    (r = s[2]), n.splice(o, 1);
                                    break;
                                }
                            }
                        return e.call(this, t, r);
                    }
                );
            }
        },
        1052: function (e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: !0 }), (t.serializeError = t.isValidCode = t.getMessageFromCode = t.JSON_RPC_SERVER_ERROR_MESSAGE = void 0);
            const n = r(983),
                o = r(982),
                s = n.errorCodes.rpc.internal,
                i = "Unspecified error message. This is a bug, please report it.",
                c = { code: s, message: a(s) };
            function a(e) {
                let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : i;
                if (Number.isInteger(e)) {
                    const r = e.toString();
                    if (p(n.errorValues, r)) return n.errorValues[r].message;
                    if (l(e)) return t.JSON_RPC_SERVER_ERROR_MESSAGE;
                }
                return r;
            }
            function u(e) {
                if (!Number.isInteger(e)) return !1;
                const t = e.toString();
                return !!n.errorValues[t] || !!l(e);
            }
            function l(e) {
                return e >= -32099 && e <= -32e3;
            }
            function d(e) {
                return e && "object" === typeof e && !Array.isArray(e) ? Object.assign({}, e) : e;
            }
            function p(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
            }
            (t.JSON_RPC_SERVER_ERROR_MESSAGE = "Unspecified server error."),
                (t.getMessageFromCode = a),
                (t.isValidCode = u),
                (t.serializeError = function (e) {
                    let { fallbackError: t = c, shouldIncludeStack: r = !1 } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    var n, s;
                    if (!t || !Number.isInteger(t.code) || "string" !== typeof t.message) throw new Error("Must provide fallback error with integer number code and string message.");
                    if (e instanceof o.EthereumRpcError) return e.serialize();
                    const i = {};
                    if (e && "object" === typeof e && !Array.isArray(e) && p(e, "code") && u(e.code)) {
                        const t = e;
                        (i.code = t.code), t.message && "string" === typeof t.message ? ((i.message = t.message), p(t, "data") && (i.data = t.data)) : ((i.message = a(i.code)), (i.data = { originalError: d(e) }));
                    } else {
                        i.code = t.code;
                        const r = null === (n = e) || void 0 === n ? void 0 : n.message;
                        (i.message = r && "string" === typeof r ? r : t.message), (i.data = { originalError: d(e) });
                    }
                    const l = null === (s = e) || void 0 === s ? void 0 : s.stack;
                    return r && e && l && "string" === typeof l && (i.stack = l), i;
                });
        },
        1053: function (e, t, r) {
            e.exports = r(1159);
        },
        1055: function (e, t, r) {
            const n = r(956).default,
                o = r(1053),
                { createAsyncMiddleware: s } = r(1048),
                i = r(1047),
                { unsafeRandomBytes: c, incrementHexInt: a } = r(938),
                u = r(985);
            function l(e) {
                return {
                    hash: e.hash,
                    parentHash: e.parentHash,
                    sha3Uncles: e.sha3Uncles,
                    miner: e.miner,
                    stateRoot: e.stateRoot,
                    transactionsRoot: e.transactionsRoot,
                    receiptsRoot: e.receiptsRoot,
                    logsBloom: e.logsBloom,
                    difficulty: e.difficulty,
                    number: e.number,
                    gasLimit: e.gasLimit,
                    gasUsed: e.gasUsed,
                    nonce: e.nonce,
                    mixHash: e.mixHash,
                    timestamp: e.timestamp,
                    extraData: e.extraData,
                };
            }
            e.exports = function (e) {
                let { blockTracker: t, provider: r } = e;
                const d = {},
                    p = i({ blockTracker: t, provider: r });
                let h = !1;
                const f = new n(),
                    m = o({
                        eth_subscribe: s(async function (e, n) {
                            if (h) throw new Error("SubscriptionManager - attempting to use after destroying");
                            const o = e.params[0],
                                s = c(16);
                            let i;
                            switch (o) {
                                case "newHeads":
                                    i = (function (e) {
                                        let { subId: n } = e;
                                        const s = {
                                            type: o,
                                            destroy: async () => {
                                                t.removeListener("sync", s.update);
                                            },
                                            update: async (e) => {
                                                let { oldBlock: t, newBlock: o } = e;
                                                const s = o,
                                                    i = a(t);
                                                (await u({ provider: r, fromBlock: i, toBlock: s })).map(l).forEach((e) => {
                                                    y(n, e);
                                                });
                                            },
                                        };
                                        return t.on("sync", s.update), s;
                                    })({ subId: s });
                                    break;
                                case "logs":
                                    const n = e.params[1],
                                        c = await p.newLogFilter(n);
                                    i = (function (e) {
                                        let { subId: t, filter: r } = e;
                                        r.on("update", (e) => y(t, e));
                                        return { type: o, destroy: async () => await p.uninstallFilter(r.idHex) };
                                    })({ subId: s, filter: c });
                                    break;
                                default:
                                    throw new Error('SubscriptionManager - unsupported subscription type "'.concat(o, '"'));
                            }
                            return (d[s] = i), void (n.result = s);
                        }),
                        eth_unsubscribe: s(async function (e, t) {
                            if (h) throw new Error("SubscriptionManager - attempting to use after destroying");
                            const r = e.params[0],
                                n = d[r];
                            if (!n) return void (t.result = !1);
                            delete d[r], await n.destroy(), (t.result = !0);
                        }),
                    });
                return (
                    (m.destroy = function () {
                        f.removeAllListeners();
                        for (const e in d) d[e].destroy(), delete d[e];
                        h = !0;
                    }),
                    { events: f, middleware: m }
                );
                function y(e, t) {
                    f.emit("notification", { jsonrpc: "2.0", method: "eth_subscription", params: { subscription: e, result: t } });
                }
            };
        },
        1127: function (e, t, r) {
            r(1040), r(1039);
            const n = r(1129),
                o = (e, t) => e + t,
                s = ["sync", "latest"];
            function i(e) {
                return Number.parseInt(e, 16);
            }
            e.exports = class extends n {
                constructor() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    super(),
                        (this._blockResetDuration = e.blockResetDuration || 2e4),
                        this._blockResetTimeout,
                        (this._currentBlock = null),
                        (this._isRunning = !1),
                        (this._onNewListener = this._onNewListener.bind(this)),
                        (this._onRemoveListener = this._onRemoveListener.bind(this)),
                        (this._resetCurrentBlock = this._resetCurrentBlock.bind(this)),
                        this._setupInternalEvents();
                }
                isRunning() {
                    return this._isRunning;
                }
                getCurrentBlock() {
                    return this._currentBlock;
                }
                async getLatestBlock() {
                    if (this._currentBlock) return this._currentBlock;
                    return await new Promise((e) => this.once("latest", e));
                }
                removeAllListeners(e) {
                    e ? super.removeAllListeners(e) : super.removeAllListeners(), this._setupInternalEvents(), this._onRemoveListener();
                }
                _start() {}
                _end() {}
                _setupInternalEvents() {
                    this.removeListener("newListener", this._onNewListener), this.removeListener("removeListener", this._onRemoveListener), this.on("newListener", this._onNewListener), this.on("removeListener", this._onRemoveListener);
                }
                _onNewListener(e, t) {
                    s.includes(e) && this._maybeStart();
                }
                _onRemoveListener(e, t) {
                    this._getBlockTrackerEventCount() > 0 || this._maybeEnd();
                }
                _maybeStart() {
                    this._isRunning || ((this._isRunning = !0), this._cancelBlockResetTimeout(), this._start());
                }
                _maybeEnd() {
                    this._isRunning && ((this._isRunning = !1), this._setupBlockResetTimeout(), this._end());
                }
                _getBlockTrackerEventCount() {
                    return s.map((e) => this.listenerCount(e)).reduce(o);
                }
                _newPotentialLatest(e) {
                    const t = this._currentBlock;
                    (t && i(e) <= i(t)) || this._setCurrentBlock(e);
                }
                _setCurrentBlock(e) {
                    const t = this._currentBlock;
                    (this._currentBlock = e), this.emit("latest", e), this.emit("sync", { oldBlock: t, newBlock: e });
                }
                _setupBlockResetTimeout() {
                    this._cancelBlockResetTimeout(), (this._blockResetTimeout = setTimeout(this._resetCurrentBlock, this._blockResetDuration)), this._blockResetTimeout.unref && this._blockResetTimeout.unref();
                }
                _cancelBlockResetTimeout() {
                    clearTimeout(this._blockResetTimeout);
                }
                _resetCurrentBlock() {
                    this._currentBlock = null;
                }
            };
        },
        1128: function (e, t) {
            e.exports = function (e) {
                var t = (e = e || {}).max || Number.MAX_SAFE_INTEGER,
                    r = "undefined" !== typeof e.start ? e.start : Math.floor(Math.random() * t);
                return function () {
                    return (r %= t), r++;
                };
            };
        },
        1129: function (e, t, r) {
            const n = r(471),
                o = r(100);
            var s = "object" === typeof Reflect ? Reflect : null,
                i =
                    s && "function" === typeof s.apply
                        ? s.apply
                        : function (e, t, r) {
                              return Function.prototype.apply.call(e, t, r);
                          };
            function c() {
                o.call(this);
            }
            function a(e, t, r) {
                try {
                    i(e, t, r);
                } catch (n) {
                    setTimeout(() => {
                        throw n;
                    });
                }
            }
            function u(e, t) {
                for (var r = new Array(t), n = 0; n < t; ++n) r[n] = e[n];
                return r;
            }
            (e.exports = c),
                n.inherits(c, o),
                (c.prototype.emit = function (e) {
                    for (var t = [], r = 1; r < arguments.length; r++) t.push(arguments[r]);
                    var n = "error" === e,
                        o = this._events;
                    if (void 0 !== o) n = n && void 0 === o.error;
                    else if (!n) return !1;
                    if (n) {
                        var s;
                        if ((t.length > 0 && (s = t[0]), s instanceof Error)) throw s;
                        var i = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
                        throw ((i.context = s), i);
                    }
                    var c = o[e];
                    if (void 0 === c) return !1;
                    if ("function" === typeof c) a(c, this, t);
                    else {
                        var l = c.length,
                            d = u(c, l);
                        for (r = 0; r < l; ++r) a(d[r], this, t);
                    }
                    return !0;
                });
        },
        1153: function (e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: !0 }), (t.createIdRemapMiddleware = void 0);
            const n = r(1049);
            t.createIdRemapMiddleware = function () {
                return (e, t, r, o) => {
                    const s = e.id,
                        i = n.getUniqueId();
                    (e.id = i),
                        (t.id = i),
                        r((r) => {
                            (e.id = s), (t.id = s), r();
                        });
                };
            };
        },
        1154: function (e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: !0 }),
                (t.createAsyncMiddleware = void 0),
                (t.createAsyncMiddleware = function (e) {
                    return async (t, r, n, o) => {
                        let s;
                        const i = new Promise((e) => {
                            s = e;
                        });
                        let c = null,
                            a = !1;
                        const u = async () => {
                            (a = !0),
                                n((e) => {
                                    (c = e), s();
                                }),
                                await i;
                        };
                        try {
                            await e(t, r, u), a ? (await i, c(null)) : o(null);
                        } catch (l) {
                            c ? c(l) : o(l);
                        }
                    };
                });
        },
        1155: function (e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: !0 }),
                (t.createScaffoldMiddleware = void 0),
                (t.createScaffoldMiddleware = function (e) {
                    return (t, r, n, o) => {
                        const s = e[t.method];
                        return void 0 === s ? n() : "function" === typeof s ? s(t, r, n, o) : ((r.result = s), o());
                    };
                });
        },
        1156: function (e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: !0 }), (t.getMessageFromCode = t.serializeError = t.EthereumProviderError = t.EthereumRpcError = t.ethErrors = t.errorCodes = void 0);
            const n = r(982);
            Object.defineProperty(t, "EthereumRpcError", {
                enumerable: !0,
                get: function () {
                    return n.EthereumRpcError;
                },
            }),
                Object.defineProperty(t, "EthereumProviderError", {
                    enumerable: !0,
                    get: function () {
                        return n.EthereumProviderError;
                    },
                });
            const o = r(1052);
            Object.defineProperty(t, "serializeError", {
                enumerable: !0,
                get: function () {
                    return o.serializeError;
                },
            }),
                Object.defineProperty(t, "getMessageFromCode", {
                    enumerable: !0,
                    get: function () {
                        return o.getMessageFromCode;
                    },
                });
            const s = r(1157);
            Object.defineProperty(t, "ethErrors", {
                enumerable: !0,
                get: function () {
                    return s.ethErrors;
                },
            });
            const i = r(983);
            Object.defineProperty(t, "errorCodes", {
                enumerable: !0,
                get: function () {
                    return i.errorCodes;
                },
            });
        },
        1157: function (e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: !0 }), (t.ethErrors = void 0);
            const n = r(982),
                o = r(1052),
                s = r(983);
            function i(e, t) {
                const [r, s] = a(t);
                return new n.EthereumRpcError(e, r || o.getMessageFromCode(e), s);
            }
            function c(e, t) {
                const [r, s] = a(t);
                return new n.EthereumProviderError(e, r || o.getMessageFromCode(e), s);
            }
            function a(e) {
                if (e) {
                    if ("string" === typeof e) return [e];
                    if ("object" === typeof e && !Array.isArray(e)) {
                        const { message: t, data: r } = e;
                        if (t && "string" !== typeof t) throw new Error("Must specify string message.");
                        return [t || void 0, r];
                    }
                }
                return [];
            }
            t.ethErrors = {
                rpc: {
                    parse: (e) => i(s.errorCodes.rpc.parse, e),
                    invalidRequest: (e) => i(s.errorCodes.rpc.invalidRequest, e),
                    invalidParams: (e) => i(s.errorCodes.rpc.invalidParams, e),
                    methodNotFound: (e) => i(s.errorCodes.rpc.methodNotFound, e),
                    internal: (e) => i(s.errorCodes.rpc.internal, e),
                    server: (e) => {
                        if (!e || "object" !== typeof e || Array.isArray(e)) throw new Error("Ethereum RPC Server errors must provide single object argument.");
                        const { code: t } = e;
                        if (!Number.isInteger(t) || t > -32005 || t < -32099) throw new Error('"code" must be an integer such that: -32099 <= code <= -32005');
                        return i(t, e);
                    },
                    invalidInput: (e) => i(s.errorCodes.rpc.invalidInput, e),
                    resourceNotFound: (e) => i(s.errorCodes.rpc.resourceNotFound, e),
                    resourceUnavailable: (e) => i(s.errorCodes.rpc.resourceUnavailable, e),
                    transactionRejected: (e) => i(s.errorCodes.rpc.transactionRejected, e),
                    methodNotSupported: (e) => i(s.errorCodes.rpc.methodNotSupported, e),
                    limitExceeded: (e) => i(s.errorCodes.rpc.limitExceeded, e),
                },
                provider: {
                    userRejectedRequest: (e) => c(s.errorCodes.provider.userRejectedRequest, e),
                    unauthorized: (e) => c(s.errorCodes.provider.unauthorized, e),
                    unsupportedMethod: (e) => c(s.errorCodes.provider.unsupportedMethod, e),
                    disconnected: (e) => c(s.errorCodes.provider.disconnected, e),
                    chainDisconnected: (e) => c(s.errorCodes.provider.chainDisconnected, e),
                    custom: (e) => {
                        if (!e || "object" !== typeof e || Array.isArray(e)) throw new Error("Ethereum Provider custom errors must provide single object argument.");
                        const { code: t, message: r, data: o } = e;
                        if (!r || "string" !== typeof r) throw new Error('"message" must be a nonempty string');
                        return new n.EthereumProviderError(t, r, o);
                    },
                },
            };
        },
        1158: function (e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: !0 }), (t.mergeMiddleware = void 0);
            const n = r(1050);
            t.mergeMiddleware = function (e) {
                const t = new n.JsonRpcEngine();
                return e.forEach((e) => t.push(e)), t.asMiddleware();
            };
        },
        1159: function (e, t) {
            e.exports = function (e) {
                return (t, r, n, o) => {
                    const s = e[t.method];
                    return void 0 === s ? n() : "function" === typeof s ? s(t, r, n, o) : ((r.result = s), o());
                };
            };
        },
        1160: function (e, t, r) {
            const n = r(1040),
                o = r(1161),
                s = r(1162),
                { bnToHex: i, hexToInt: c, incrementHexInt: a, minBlockRef: u, blockRefIsNumber: l } = r(938);
            e.exports = class extends s {
                constructor(e) {
                    let { provider: t, params: r } = e;
                    super(),
                        (this.type = "log"),
                        (this.ethQuery = new n(t)),
                        (this.params = Object.assign({ fromBlock: "latest", toBlock: "latest", address: void 0, topics: [] }, r)),
                        this.params.address && (Array.isArray(this.params.address) || (this.params.address = [this.params.address]), (this.params.address = this.params.address.map((e) => e.toLowerCase())));
                }
                async initialize(e) {
                    let { currentBlock: t } = e,
                        r = this.params.fromBlock;
                    ["latest", "pending"].includes(r) && (r = t), "earliest" === r && (r = "0x0"), (this.params.fromBlock = r);
                    const n = u(this.params.toBlock, t),
                        o = Object.assign({}, this.params, { toBlock: n }),
                        s = await this._fetchLogs(o);
                    this.addInitialResults(s);
                }
                async update(e) {
                    let { oldBlock: t, newBlock: r } = e;
                    const n = r;
                    let o;
                    o = t ? a(t) : r;
                    const s = Object.assign({}, this.params, { fromBlock: o, toBlock: n }),
                        i = (await this._fetchLogs(s)).filter((e) => this.matchLog(e));
                    this.addResults(i);
                }
                async _fetchLogs(e) {
                    return await o((t) => this.ethQuery.getLogs(e, t))();
                }
                matchLog(e) {
                    if (c(this.params.fromBlock) >= c(e.blockNumber)) return !1;
                    if (l(this.params.toBlock) && c(this.params.toBlock) <= c(e.blockNumber)) return !1;
                    const t = e.address && e.address.toLowerCase();
                    if (this.params.address && t && !this.params.address.includes(t)) return !1;
                    return this.params.topics.every((t, r) => {
                        let n = e.topics[r];
                        if (!n) return !1;
                        n = n.toLowerCase();
                        let o = Array.isArray(t) ? t : [t];
                        if (o.includes(null)) return !0;
                        o = o.map((e) => e.toLowerCase());
                        return o.includes(n);
                    });
                }
            };
        },
        1161: function (e, t, r) {
            "use strict";
            const n = (e, t, r, n) =>
                    function () {
                        for (var o = arguments.length, s = new Array(o), i = 0; i < o; i++) s[i] = arguments[i];
                        const c = t.promiseModule;
                        return new c((o, i) => {
                            t.multiArgs
                                ? s.push(function () {
                                      for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
                                      t.errorFirst ? (r[0] ? i(r) : (r.shift(), o(r))) : o(r);
                                  })
                                : t.errorFirst
                                ? s.push((e, t) => {
                                      e ? i(e) : o(t);
                                  })
                                : s.push(o);
                            const c = this === r ? n : this;
                            Reflect.apply(e, c, s);
                        });
                    },
                o = new WeakMap();
            e.exports = (e, t) => {
                t = { exclude: [/.+(?:Sync|Stream)$/], errorFirst: !0, promiseModule: Promise, ...t };
                const r = typeof e;
                if (null === e || ("object" !== r && "function" !== r)) throw new TypeError("Expected `input` to be a `Function` or `Object`, got `".concat(null === e ? "null" : r, "`"));
                const s = new WeakMap(),
                    i = new Proxy(e, {
                        apply(e, r, o) {
                            const c = s.get(e);
                            if (c) return Reflect.apply(c, r, o);
                            const a = t.excludeMain ? e : n(e, t, i, e);
                            return s.set(e, a), Reflect.apply(a, r, o);
                        },
                        get(e, r) {
                            const c = e[r];
                            if (
                                !((e, r) => {
                                    let n = o.get(e);
                                    if ((n || ((n = {}), o.set(e, n)), r in n)) return n[r];
                                    const s = (e) => ("string" === typeof e || "symbol" === typeof r ? r === e : e.test(r)),
                                        i = Reflect.getOwnPropertyDescriptor(e, r),
                                        c = void 0 === i || i.writable || i.configurable,
                                        a = (t.include ? t.include.some(s) : !t.exclude.some(s)) && c;
                                    return (n[r] = a), a;
                                })(e, r) ||
                                c === Function.prototype[r]
                            )
                                return c;
                            const a = s.get(c);
                            if (a) return a;
                            if ("function" === typeof c) {
                                const r = n(c, t, i, e);
                                return s.set(c, r), r;
                            }
                            return c;
                        },
                    });
                return i;
            };
        },
        1162: function (e, t, r) {
            const n = r(984);
            e.exports = class extends n {
                constructor() {
                    super(), (this.allResults = []);
                }
                async update() {
                    throw new Error("BaseFilterWithHistory - no update method specified");
                }
                addResults(e) {
                    (this.allResults = this.allResults.concat(e)), super.addResults(e);
                }
                addInitialResults(e) {
                    (this.allResults = this.allResults.concat(e)), super.addInitialResults(e);
                }
                getAllResults() {
                    return this.allResults;
                }
            };
        },
        1163: function (e, t, r) {
            const n = r(984),
                o = r(985),
                { incrementHexInt: s } = r(938);
            e.exports = class extends n {
                constructor(e) {
                    let { provider: t, params: r } = e;
                    super(), (this.type = "block"), (this.provider = t);
                }
                async update(e) {
                    let { oldBlock: t, newBlock: r } = e;
                    const n = r,
                        i = s(t),
                        c = (await o({ provider: this.provider, fromBlock: i, toBlock: n })).map((e) => e.hash);
                    this.addResults(c);
                }
            };
        },
        1164: function (e, t, r) {
            const n = r(984),
                o = r(985),
                { incrementHexInt: s } = r(938);
            e.exports = class extends n {
                constructor(e) {
                    let { provider: t } = e;
                    super(), (this.type = "tx"), (this.provider = t);
                }
                async update(e) {
                    let { oldBlock: t } = e;
                    const r = t,
                        n = s(t),
                        i = await o({ provider: this.provider, fromBlock: n, toBlock: r }),
                        c = [];
                    for (const o of i) c.push(...o.transactions);
                    this.addResults(c);
                }
            };
        },
        1230: function (e, t, r) {
            "use strict";
            r.r(t),
                r.d(t, "Mutex", function () {
                    return s;
                }),
                r.d(t, "Semaphore", function () {
                    return o;
                }),
                r.d(t, "withTimeout", function () {
                    return i;
                });
            var n = r(66),
                o = (function () {
                    function e(e) {
                        if (((this._maxConcurrency = e), (this._queue = []), e <= 0)) throw new Error("semaphore must be initialized to a positive value");
                        this._value = e;
                    }
                    return (
                        (e.prototype.acquire = function () {
                            var e = this,
                                t = this.isLocked(),
                                r = new Promise(function (t) {
                                    return e._queue.push(t);
                                });
                            return t || this._dispatch(), r;
                        }),
                        (e.prototype.runExclusive = function (e) {
                            return Object(n.b)(this, void 0, void 0, function () {
                                var t, r, o;
                                return Object(n.c)(this, function (n) {
                                    switch (n.label) {
                                        case 0:
                                            return [4, this.acquire()];
                                        case 1:
                                            (t = n.sent()), (r = t[0]), (o = t[1]), (n.label = 2);
                                        case 2:
                                            return n.trys.push([2, , 4, 5]), [4, e(r)];
                                        case 3:
                                            return [2, n.sent()];
                                        case 4:
                                            return o(), [7];
                                        case 5:
                                            return [2];
                                    }
                                });
                            });
                        }),
                        (e.prototype.isLocked = function () {
                            return this._value <= 0;
                        }),
                        (e.prototype.release = function () {
                            if (this._maxConcurrency > 1) throw new Error("this method is unavailabel on semaphores with concurrency > 1; use the scoped release returned by acquire instead");
                            if (this._currentReleaser) {
                                var e = this._currentReleaser;
                                (this._currentReleaser = void 0), e();
                            }
                        }),
                        (e.prototype._dispatch = function () {
                            var e = this,
                                t = this._queue.shift();
                            if (t) {
                                var r = !1;
                                (this._currentReleaser = function () {
                                    r || ((r = !0), e._value++, e._dispatch());
                                }),
                                    t([this._value--, this._currentReleaser]);
                            }
                        }),
                        e
                    );
                })(),
                s = (function () {
                    function e() {
                        this._semaphore = new o(1);
                    }
                    return (
                        (e.prototype.acquire = function () {
                            return Object(n.b)(this, void 0, void 0, function () {
                                var e;
                                return Object(n.c)(this, function (t) {
                                    switch (t.label) {
                                        case 0:
                                            return [4, this._semaphore.acquire()];
                                        case 1:
                                            return (e = t.sent()), [2, e[1]];
                                    }
                                });
                            });
                        }),
                        (e.prototype.runExclusive = function (e) {
                            return this._semaphore.runExclusive(function () {
                                return e();
                            });
                        }),
                        (e.prototype.isLocked = function () {
                            return this._semaphore.isLocked();
                        }),
                        (e.prototype.release = function () {
                            this._semaphore.release();
                        }),
                        e
                    );
                })();
            function i(e, t, r) {
                var o = this;
                return (
                    void 0 === r && (r = new Error("timeout")),
                    {
                        acquire: function () {
                            return new Promise(function (s, i) {
                                return Object(n.b)(o, void 0, void 0, function () {
                                    var o, c;
                                    return Object(n.c)(this, function (n) {
                                        switch (n.label) {
                                            case 0:
                                                return (
                                                    (o = !1),
                                                    setTimeout(function () {
                                                        (o = !0), i(r);
                                                    }, t),
                                                    [4, e.acquire()]
                                                );
                                            case 1:
                                                return (c = n.sent()), o ? (Array.isArray(c) ? c[1] : c)() : s(c), [2];
                                        }
                                    });
                                });
                            });
                        },
                        runExclusive: function (e) {
                            return Object(n.b)(this, void 0, void 0, function () {
                                var t, r;
                                return Object(n.c)(this, function (n) {
                                    switch (n.label) {
                                        case 0:
                                            (t = function () {}), (n.label = 1);
                                        case 1:
                                            return n.trys.push([1, , 7, 8]), [4, this.acquire()];
                                        case 2:
                                            return (r = n.sent()), Array.isArray(r) ? ((t = r[1]), [4, e(r[0])]) : [3, 4];
                                        case 3:
                                            return [2, n.sent()];
                                        case 4:
                                            return (t = r), [4, e()];
                                        case 5:
                                            return [2, n.sent()];
                                        case 6:
                                            return [3, 8];
                                        case 7:
                                            return t(), [7];
                                        case 8:
                                            return [2];
                                    }
                                });
                            });
                        },
                        release: function () {
                            e.release();
                        },
                        isLocked: function () {
                            return e.isLocked();
                        },
                    }
                );
            }
        },
        938: function (e, t) {
            function r(e) {
                return e.sort((e, t) => ("latest" === e || "earliest" === t ? 1 : "latest" === t || "earliest" === e ? -1 : n(e) - n(t)));
            }
            function n(e) {
                return void 0 === e || null === e ? e : Number.parseInt(e, 16);
            }
            function o(e) {
                if (void 0 === e || null === e) return e;
                let t = e.toString(16);
                return t.length % 2 && (t = "0" + t), "0x" + t;
            }
            function s() {
                return Math.floor(16 * Math.random()).toString(16);
            }
            e.exports = {
                minBlockRef: function () {
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    const o = r(t);
                    return o[0];
                },
                maxBlockRef: function () {
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    const o = r(t);
                    return o[o.length - 1];
                },
                sortBlockRefs: r,
                bnToHex: function (e) {
                    return "0x" + e.toString(16);
                },
                blockRefIsNumber: function (e) {
                    return e && !["earliest", "latest", "pending"].includes(e);
                },
                hexToInt: n,
                incrementHexInt: function (e) {
                    if (void 0 === e || null === e) return e;
                    return o(n(e) + 1);
                },
                intToHex: o,
                unsafeRandomBytes: function (e) {
                    let t = "0x";
                    for (let r = 0; r < e; r++) (t += s()), (t += s());
                    return t;
                },
            };
        },
        952: function (e, t) {
            e.exports = function () {
                for (var e = {}, t = 0; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var o in n) r.call(n, o) && (e[o] = n[o]);
                }
                return e;
            };
            var r = Object.prototype.hasOwnProperty;
        },
        956: function (e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: !0 });
            const n = r(100);
            function o(e, t, r) {
                try {
                    Reflect.apply(e, t, r);
                } catch (n) {
                    setTimeout(() => {
                        throw n;
                    });
                }
            }
            class s extends n.EventEmitter {
                emit(e) {
                    let t = "error" === e;
                    const r = this._events;
                    if (void 0 !== r) t = t && void 0 === r.error;
                    else if (!t) return !1;
                    for (var n = arguments.length, s = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) s[i - 1] = arguments[i];
                    if (t) {
                        let e;
                        if ((s.length > 0 && ([e] = s), e instanceof Error)) throw e;
                        const t = new Error("Unhandled error.".concat(e ? " (".concat(e.message, ")") : ""));
                        throw ((t.context = e), t);
                    }
                    const c = r[e];
                    if (void 0 === c) return !1;
                    if ("function" === typeof c) o(c, this, s);
                    else {
                        const e = c.length,
                            t = (function (e) {
                                const t = e.length,
                                    r = new Array(t);
                                for (let n = 0; n < t; n += 1) r[n] = e[n];
                                return r;
                            })(c);
                        for (let r = 0; r < e; r += 1) o(t[r], this, s);
                    }
                    return !0;
                }
            }
            t.default = s;
        },
        982: function (e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: !0 }), (t.EthereumProviderError = t.EthereumRpcError = void 0);
            const n = r(1051);
            class o extends Error {
                constructor(e, t, r) {
                    if (!Number.isInteger(e)) throw new Error('"code" must be an integer.');
                    if (!t || "string" !== typeof t) throw new Error('"message" must be a nonempty string.');
                    super(t), (this.code = e), void 0 !== r && (this.data = r);
                }
                serialize() {
                    const e = { code: this.code, message: this.message };
                    return void 0 !== this.data && (e.data = this.data), this.stack && (e.stack = this.stack), e;
                }
                toString() {
                    return n.default(this.serialize(), s, 2);
                }
            }
            t.EthereumRpcError = o;
            function s(e, t) {
                if ("[Circular]" !== t) return t;
            }
            t.EthereumProviderError = class extends o {
                constructor(e, t, r) {
                    if (
                        !(function (e) {
                            return Number.isInteger(e) && e >= 1e3 && e <= 4999;
                        })(e)
                    )
                        throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
                    super(e, t, r);
                }
            };
        },
        983: function (e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: !0 }),
                (t.errorValues = t.errorCodes = void 0),
                (t.errorCodes = {
                    rpc: {
                        invalidInput: -32e3,
                        resourceNotFound: -32001,
                        resourceUnavailable: -32002,
                        transactionRejected: -32003,
                        methodNotSupported: -32004,
                        limitExceeded: -32005,
                        parse: -32700,
                        invalidRequest: -32600,
                        methodNotFound: -32601,
                        invalidParams: -32602,
                        internal: -32603,
                    },
                    provider: { userRejectedRequest: 4001, unauthorized: 4100, unsupportedMethod: 4200, disconnected: 4900, chainDisconnected: 4901 },
                }),
                (t.errorValues = {
                    "-32700": { standard: "JSON RPC 2.0", message: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text." },
                    "-32600": { standard: "JSON RPC 2.0", message: "The JSON sent is not a valid Request object." },
                    "-32601": { standard: "JSON RPC 2.0", message: "The method does not exist / is not available." },
                    "-32602": { standard: "JSON RPC 2.0", message: "Invalid method parameter(s)." },
                    "-32603": { standard: "JSON RPC 2.0", message: "Internal JSON-RPC error." },
                    "-32000": { standard: "EIP-1474", message: "Invalid input." },
                    "-32001": { standard: "EIP-1474", message: "Resource not found." },
                    "-32002": { standard: "EIP-1474", message: "Resource unavailable." },
                    "-32003": { standard: "EIP-1474", message: "Transaction rejected." },
                    "-32004": { standard: "EIP-1474", message: "Method not supported." },
                    "-32005": { standard: "EIP-1474", message: "Request limit exceeded." },
                    4001: { standard: "EIP-1193", message: "User rejected the request." },
                    4100: { standard: "EIP-1193", message: "The requested account and/or method has not been authorized by the user." },
                    4200: { standard: "EIP-1193", message: "The requested method is not supported by this Ethereum provider." },
                    4900: { standard: "EIP-1193", message: "The provider is disconnected from all chains." },
                    4901: { standard: "EIP-1193", message: "The provider is disconnected from the specified chain." },
                });
        },
        984: function (e, t, r) {
            const n = r(956).default;
            e.exports = class extends n {
                constructor() {
                    super(), (this.updates = []);
                }
                async initialize() {}
                async update() {
                    throw new Error("BaseFilter - no update method specified");
                }
                addResults(e) {
                    (this.updates = this.updates.concat(e)), e.forEach((e) => this.emit("update", e));
                }
                addInitialResults(e) {}
                getChangesAndClear() {
                    const e = this.updates;
                    return (this.updates = []), e;
                }
            };
        },
        985: function (e, t) {
            function r(e) {
                return void 0 === e || null === e ? e : Number.parseInt(e, 16);
            }
            function n(e) {
                if (void 0 === e || null === e) return e;
                return "0x" + e.toString(16);
            }
            e.exports = async function (e) {
                let { provider: t, fromBlock: o, toBlock: s } = e;
                o || (o = s);
                const i = r(o),
                    c = r(s),
                    a = Array(c - i + 1)
                        .fill()
                        .map((e, t) => i + t)
                        .map(n);
                return await Promise.all(
                    a.map((e) =>
                        (function (e, t, r) {
                            return new Promise((n, o) => {
                                e.sendAsync({ id: 1, jsonrpc: "2.0", method: t, params: r }, (e, t) => {
                                    if (e) return o(e);
                                    n(t.result);
                                });
                            });
                        })(t, "eth_getBlockByNumber", [e, !1])
                    )
                );
            };
        },
    },
]);
