const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "./web-DrW7wduZ.js",
      "./vendor-mui-BvCO_twC.js",
      "./vendor-react-BxgARPeU.js",
      "./web-DMf8sByJ.js",
      "./ContactsPage-B52_Qam5.js",
      "./SettingsPage-Vf4Acxr2.js",
      "./EditProfilePage-C8uCNFvt.js",
      "./UserProfilePage-GN1AUgZ5.js",
      "./GlobalSearchPage-KcTSwoSA.js",
      "./PrivacyPage-DlTddfQB.js",
      "./PrivacySettingPage-BYZ47Yc7.js",
      "./UserPickerPage-C3mo7wKl.js",
      "./DataStoragePage-Bh42jygM.js",
      "./DevicesPage-CeI1c2-B.js",
      "./ArchivePage-DgmIkG-_.js",
      "./AddContactPage-B_gsKTlb.js",
      "./AdminPage-BxGDE_9r.js",
      "./SupportPage-B7iRm9dY.js",
      "./SupportAgentPage-CAd9qBNK.js",
    ]),
) => i.map((i) => d[i]);
import {
  c as Kr,
  j as o,
  T as Qo,
  B as y,
  a as A,
  b as ot,
  I as jr,
  d as X,
  V as oc,
  e as ic,
  f as Ee,
  C as Ct,
  u as ac,
  i as Te,
  g as zn,
  D as Zo,
  N as cc,
  W as lc,
  h as ei,
  L as dc,
  k as uc,
  l as He,
  m as hc,
  P as fc,
  n as ti,
  o as ni,
  S as ri,
  p as pc,
  H as gc,
  q as Dn,
  r as Xt,
  s as Qe,
  t as mc,
  R as xc,
  v as yc,
  w as bc,
  M as Yr,
  x as si,
  y as Bn,
  z as wc,
  A as oi,
  E as vc,
  F as Rr,
  G as Sc,
  J as Cc,
  K as _r,
  O as qe,
  Q as kc,
  U as Ns,
  X as Wt,
  Y as ii,
  Z as ai,
  _ as Ec,
  $ as ci,
  a0 as vt,
  a1 as Vt,
  a2 as Kt,
  a3 as Yt,
  a4 as Fs,
  a5 as jc,
  a6 as zs,
  a7 as Rc,
  a8 as Bs,
  a9 as _c,
  aa as Ac,
  ab as Tc,
  ac as Us,
  ad as li,
  ae as $s,
  af as Jr,
  ag as Pc,
  ah as Ic,
  ai as Mc,
  aj as Dc,
  ak as Ar,
  al as Lc,
  am as Oc,
  an as Nc,
  ao as Ws,
  ap as Hs,
  aq as qs,
  ar as Vs,
  as as Fc,
  at as Ks,
  au as zc,
  av as Ys,
  aw as Js,
  ax as Bc,
  ay as Uc,
  az as $c,
  aA as Wc,
  aB as Hc,
} from "./vendor-mui-BvCO_twC.js";
import {
  c as qc,
  r as h,
  d as Vc,
  a as je,
  g as Kc,
  u as _t,
  e as Yc,
  f as di,
  h as Jc,
  i as we,
  N as ur,
  B as Xc,
} from "./vendor-react-BxgARPeU.js";
(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const i of s)
      if (i.type === "childList")
        for (const a of i.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && r(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const i = {};
    return (
      s.integrity && (i.integrity = s.integrity),
      s.referrerPolicy && (i.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : s.crossOrigin === "anonymous"
          ? (i.credentials = "omit")
          : (i.credentials = "same-origin"),
      i
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const i = n(s);
    fetch(s.href, i);
  }
})();
var Tr = {},
  Xs = qc;
((Tr.createRoot = Xs.createRoot), (Tr.hydrateRoot = Xs.hydrateRoot));
const Gc = "modulepreload",
  Qc = function (t, e) {
    return new URL(t, e).href;
  },
  Gs = {},
  Ce = function (e, n, r) {
    let s = Promise.resolve();
    if (n && n.length > 0) {
      const a = document.getElementsByTagName("link"),
        c = document.querySelector("meta[property=csp-nonce]"),
        d =
          (c == null ? void 0 : c.nonce) ||
          (c == null ? void 0 : c.getAttribute("nonce"));
      s = Promise.allSettled(
        n.map((l) => {
          if (((l = Qc(l, r)), l in Gs)) return;
          Gs[l] = !0;
          const u = l.endsWith(".css"),
            m = u ? '[rel="stylesheet"]' : "";
          if (!!r)
            for (let p = a.length - 1; p >= 0; p--) {
              const x = a[p];
              if (x.href === l && (!u || x.rel === "stylesheet")) return;
            }
          else if (document.querySelector(`link[href="${l}"]${m}`)) return;
          const w = document.createElement("link");
          if (
            ((w.rel = u ? "stylesheet" : Gc),
            u || (w.as = "script"),
            (w.crossOrigin = ""),
            (w.href = l),
            d && w.setAttribute("nonce", d),
            document.head.appendChild(w),
            u)
          )
            return new Promise((p, x) => {
              (w.addEventListener("load", p),
                w.addEventListener("error", () =>
                  x(new Error(`Unable to preload CSS for ${l}`)),
                ));
            });
        }),
      );
    }
    function i(a) {
      const c = new Event("vite:preloadError", { cancelable: !0 });
      if (((c.payload = a), window.dispatchEvent(c), !c.defaultPrevented))
        throw a;
    }
    return s.then((a) => {
      for (const c of a || []) c.status === "rejected" && i(c.reason);
      return e().catch(i);
    });
  };
/*! Capacitor: https://capacitorjs.com/ - MIT License */ const Zc = (t) => {
    const e = new Map();
    e.set("web", { name: "web" });
    const n = t.CapacitorPlatforms || {
        currentPlatform: { name: "web" },
        platforms: e,
      },
      r = (i, a) => {
        n.platforms.set(i, a);
      },
      s = (i) => {
        n.platforms.has(i) && (n.currentPlatform = n.platforms.get(i));
      };
    return ((n.addPlatform = r), (n.setPlatform = s), n);
  },
  el = (t) => (t.CapacitorPlatforms = Zc(t)),
  ui = el(
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : typeof global < "u"
            ? global
            : {},
  );
ui.addPlatform;
ui.setPlatform;
var kt;
(function (t) {
  ((t.Unimplemented = "UNIMPLEMENTED"), (t.Unavailable = "UNAVAILABLE"));
})(kt || (kt = {}));
class hr extends Error {
  constructor(e, n, r) {
    (super(e), (this.message = e), (this.code = n), (this.data = r));
  }
}
const tl = (t) => {
    var e, n;
    return t != null && t.androidBridge
      ? "android"
      : !(
            (n =
              (e = t == null ? void 0 : t.webkit) === null || e === void 0
                ? void 0
                : e.messageHandlers) === null || n === void 0
          ) && n.bridge
        ? "ios"
        : "web";
  },
  nl = (t) => {
    var e, n, r, s, i;
    const a = t.CapacitorCustomPlatform || null,
      c = t.Capacitor || {},
      d = (c.Plugins = c.Plugins || {}),
      l = t.CapacitorPlatforms,
      u = () => (a !== null ? a.name : tl(t)),
      m =
        ((e = l == null ? void 0 : l.currentPlatform) === null || e === void 0
          ? void 0
          : e.getPlatform) || u,
      b = () => m() !== "web",
      w =
        ((n = l == null ? void 0 : l.currentPlatform) === null || n === void 0
          ? void 0
          : n.isNativePlatform) || b,
      p = (D) => {
        const _ = M.get(D);
        return !!((_ != null && _.platforms.has(m())) || k(D));
      },
      x =
        ((r = l == null ? void 0 : l.currentPlatform) === null || r === void 0
          ? void 0
          : r.isPluginAvailable) || p,
      g = (D) => {
        var _;
        return (_ = c.PluginHeaders) === null || _ === void 0
          ? void 0
          : _.find((P) => P.name === D);
      },
      k =
        ((s = l == null ? void 0 : l.currentPlatform) === null || s === void 0
          ? void 0
          : s.getPluginHeader) || g,
      E = (D) => t.console.error(D),
      T = (D, _, P) =>
        Promise.reject(`${P} does not have an implementation of "${_}".`),
      M = new Map(),
      H = (D, _ = {}) => {
        const P = M.get(D);
        if (P)
          return (
            console.warn(
              `Capacitor plugin "${D}" already registered. Cannot register plugins twice.`,
            ),
            P.proxy
          );
        const J = m(),
          ae = k(D);
        let te;
        const re = async () => (
            !te && J in _
              ? (te =
                  typeof _[J] == "function" ? (te = await _[J]()) : (te = _[J]))
              : a !== null &&
                !te &&
                "web" in _ &&
                (te =
                  typeof _.web == "function"
                    ? (te = await _.web())
                    : (te = _.web)),
            te
          ),
          B = (le, se) => {
            var ue, he;
            if (ae) {
              const de =
                ae == null ? void 0 : ae.methods.find((fe) => se === fe.name);
              if (de)
                return de.rtype === "promise"
                  ? (fe) => c.nativePromise(D, se.toString(), fe)
                  : (fe, Ie) => c.nativeCallback(D, se.toString(), fe, Ie);
              if (le)
                return (ue = le[se]) === null || ue === void 0
                  ? void 0
                  : ue.bind(le);
            } else {
              if (le)
                return (he = le[se]) === null || he === void 0
                  ? void 0
                  : he.bind(le);
              throw new hr(
                `"${D}" plugin is not implemented on ${J}`,
                kt.Unimplemented,
              );
            }
          },
          K = (le) => {
            let se;
            const ue = (...he) => {
              const de = re().then((fe) => {
                const Ie = B(fe, le);
                if (Ie) {
                  const Ae = Ie(...he);
                  return ((se = Ae == null ? void 0 : Ae.remove), Ae);
                } else
                  throw new hr(
                    `"${D}.${le}()" is not implemented on ${J}`,
                    kt.Unimplemented,
                  );
              });
              return (
                le === "addListener" && (de.remove = async () => se()),
                de
              );
            };
            return (
              (ue.toString = () => `${le.toString()}() { [capacitor code] }`),
              Object.defineProperty(ue, "name", {
                value: le,
                writable: !1,
                configurable: !1,
              }),
              ue
            );
          },
          L = K("addListener"),
          W = K("removeListener"),
          Q = (le, se) => {
            const ue = L({ eventName: le }, se),
              he = async () => {
                const fe = await ue;
                W({ eventName: le, callbackId: fe }, se);
              },
              de = new Promise((fe) => ue.then(() => fe({ remove: he })));
            return (
              (de.remove = async () => {
                (console.warn(
                  "Using addListener() without 'await' is deprecated.",
                ),
                  await he());
              }),
              de
            );
          },
          ce = new Proxy(
            {},
            {
              get(le, se) {
                switch (se) {
                  case "$$typeof":
                    return;
                  case "toJSON":
                    return () => ({});
                  case "addListener":
                    return ae ? Q : L;
                  case "removeListener":
                    return W;
                  default:
                    return K(se);
                }
              },
            },
          );
        return (
          (d[D] = ce),
          M.set(D, {
            name: D,
            proxy: ce,
            platforms: new Set([...Object.keys(_), ...(ae ? [J] : [])]),
          }),
          ce
        );
      },
      Z =
        ((i = l == null ? void 0 : l.currentPlatform) === null || i === void 0
          ? void 0
          : i.registerPlugin) || H;
    return (
      c.convertFileSrc || (c.convertFileSrc = (D) => D),
      (c.getPlatform = m),
      (c.handleError = E),
      (c.isNativePlatform = w),
      (c.isPluginAvailable = x),
      (c.pluginMethodNoop = T),
      (c.registerPlugin = Z),
      (c.Exception = hr),
      (c.DEBUG = !!c.DEBUG),
      (c.isLoggingEnabled = !!c.isLoggingEnabled),
      (c.platform = c.getPlatform()),
      (c.isNative = c.isNativePlatform()),
      c
    );
  },
  rl = (t) => (t.Capacitor = nl(t)),
  ct = rl(
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : typeof global < "u"
            ? global
            : {},
  ),
  Ke = ct.registerPlugin;
ct.Plugins;
class hi {
  constructor(e) {
    ((this.listeners = {}),
      (this.retainedEventArguments = {}),
      (this.windowListeners = {}),
      e &&
        (console.warn(
          `Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`,
        ),
        (this.config = e)));
  }
  addListener(e, n) {
    let r = !1;
    (this.listeners[e] || ((this.listeners[e] = []), (r = !0)),
      this.listeners[e].push(n));
    const i = this.windowListeners[e];
    (i && !i.registered && this.addWindowListener(i),
      r && this.sendRetainedArgumentsForEvent(e));
    const a = async () => this.removeListener(e, n);
    return Promise.resolve({ remove: a });
  }
  async removeAllListeners() {
    this.listeners = {};
    for (const e in this.windowListeners)
      this.removeWindowListener(this.windowListeners[e]);
    this.windowListeners = {};
  }
  notifyListeners(e, n, r) {
    const s = this.listeners[e];
    if (!s) {
      if (r) {
        let i = this.retainedEventArguments[e];
        (i || (i = []), i.push(n), (this.retainedEventArguments[e] = i));
      }
      return;
    }
    s.forEach((i) => i(n));
  }
  hasListeners(e) {
    return !!this.listeners[e].length;
  }
  registerWindowListener(e, n) {
    this.windowListeners[n] = {
      registered: !1,
      windowEventName: e,
      pluginEventName: n,
      handler: (r) => {
        this.notifyListeners(n, r);
      },
    };
  }
  unimplemented(e = "not implemented") {
    return new ct.Exception(e, kt.Unimplemented);
  }
  unavailable(e = "not available") {
    return new ct.Exception(e, kt.Unavailable);
  }
  async removeListener(e, n) {
    const r = this.listeners[e];
    if (!r) return;
    const s = r.indexOf(n);
    (this.listeners[e].splice(s, 1),
      this.listeners[e].length ||
        this.removeWindowListener(this.windowListeners[e]));
  }
  addWindowListener(e) {
    (window.addEventListener(e.windowEventName, e.handler),
      (e.registered = !0));
  }
  removeWindowListener(e) {
    e &&
      (window.removeEventListener(e.windowEventName, e.handler),
      (e.registered = !1));
  }
  sendRetainedArgumentsForEvent(e) {
    const n = this.retainedEventArguments[e];
    n &&
      (delete this.retainedEventArguments[e],
      n.forEach((r) => {
        this.notifyListeners(e, r);
      }));
  }
}
const Qs = (t) =>
    encodeURIComponent(t)
      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape),
  Zs = (t) => t.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
class sl extends hi {
  async getCookies() {
    const e = document.cookie,
      n = {};
    return (
      e.split(";").forEach((r) => {
        if (r.length <= 0) return;
        let [s, i] = r.replace(/=/, "CAP_COOKIE").split("CAP_COOKIE");
        ((s = Zs(s).trim()), (i = Zs(i).trim()), (n[s] = i));
      }),
      n
    );
  }
  async setCookie(e) {
    try {
      const n = Qs(e.key),
        r = Qs(e.value),
        s = `; expires=${(e.expires || "").replace("expires=", "")}`,
        i = (e.path || "/").replace("path=", ""),
        a = e.url != null && e.url.length > 0 ? `domain=${e.url}` : "";
      document.cookie = `${n}=${r || ""}${s}; path=${i}; ${a};`;
    } catch (n) {
      return Promise.reject(n);
    }
  }
  async deleteCookie(e) {
    try {
      document.cookie = `${e.key}=; Max-Age=0`;
    } catch (n) {
      return Promise.reject(n);
    }
  }
  async clearCookies() {
    try {
      const e = document.cookie.split(";") || [];
      for (const n of e)
        document.cookie = n
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async clearAllCookies() {
    try {
      await this.clearCookies();
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
Ke("CapacitorCookies", { web: () => new sl() });
const ol = async (t) =>
    new Promise((e, n) => {
      const r = new FileReader();
      ((r.onload = () => {
        const s = r.result;
        e(s.indexOf(",") >= 0 ? s.split(",")[1] : s);
      }),
        (r.onerror = (s) => n(s)),
        r.readAsDataURL(t));
    }),
  il = (t = {}) => {
    const e = Object.keys(t);
    return Object.keys(t)
      .map((s) => s.toLocaleLowerCase())
      .reduce((s, i, a) => ((s[i] = t[e[a]]), s), {});
  },
  al = (t, e = !0) =>
    t
      ? Object.entries(t)
          .reduce((r, s) => {
            const [i, a] = s;
            let c, d;
            return (
              Array.isArray(a)
                ? ((d = ""),
                  a.forEach((l) => {
                    ((c = e ? encodeURIComponent(l) : l), (d += `${i}=${c}&`));
                  }),
                  d.slice(0, -1))
                : ((c = e ? encodeURIComponent(a) : a), (d = `${i}=${c}`)),
              `${r}&${d}`
            );
          }, "")
          .substr(1)
      : null,
  cl = (t, e = {}) => {
    const n = Object.assign(
        { method: t.method || "GET", headers: t.headers },
        e,
      ),
      s = il(t.headers)["content-type"] || "";
    if (typeof t.data == "string") n.body = t.data;
    else if (s.includes("application/x-www-form-urlencoded")) {
      const i = new URLSearchParams();
      for (const [a, c] of Object.entries(t.data || {})) i.set(a, c);
      n.body = i.toString();
    } else if (
      s.includes("multipart/form-data") ||
      t.data instanceof FormData
    ) {
      const i = new FormData();
      if (t.data instanceof FormData)
        t.data.forEach((c, d) => {
          i.append(d, c);
        });
      else for (const c of Object.keys(t.data)) i.append(c, t.data[c]);
      n.body = i;
      const a = new Headers(n.headers);
      (a.delete("content-type"), (n.headers = a));
    } else
      (s.includes("application/json") || typeof t.data == "object") &&
        (n.body = JSON.stringify(t.data));
    return n;
  };
class ll extends hi {
  async request(e) {
    const n = cl(e, e.webFetchExtra),
      r = al(e.params, e.shouldEncodeUrlParams),
      s = r ? `${e.url}?${r}` : e.url,
      i = await fetch(s, n),
      a = i.headers.get("content-type") || "";
    let { responseType: c = "text" } = i.ok ? e : {};
    a.includes("application/json") && (c = "json");
    let d, l;
    switch (c) {
      case "arraybuffer":
      case "blob":
        ((l = await i.blob()), (d = await ol(l)));
        break;
      case "json":
        d = await i.json();
        break;
      case "document":
      case "text":
      default:
        d = await i.text();
    }
    const u = {};
    return (
      i.headers.forEach((m, b) => {
        u[b] = m;
      }),
      { data: d, headers: u, status: i.status, url: i.url }
    );
  }
  async get(e) {
    return this.request(Object.assign(Object.assign({}, e), { method: "GET" }));
  }
  async post(e) {
    return this.request(
      Object.assign(Object.assign({}, e), { method: "POST" }),
    );
  }
  async put(e) {
    return this.request(Object.assign(Object.assign({}, e), { method: "PUT" }));
  }
  async patch(e) {
    return this.request(
      Object.assign(Object.assign({}, e), { method: "PATCH" }),
    );
  }
  async delete(e) {
    return this.request(
      Object.assign(Object.assign({}, e), { method: "DELETE" }),
    );
  }
}
Ke("CapacitorHttp", { web: () => new ll() });
const fr = Ke("App", {
    web: () =>
      Ce(
        () => import("./web-DrW7wduZ.js"),
        __vite__mapDeps([0, 1, 2]),
        import.meta.url,
      ).then((t) => new t.AppWeb()),
  }),
  dl = {},
  eo = (t) => {
    let e;
    const n = new Set(),
      r = (u, m) => {
        const b = typeof u == "function" ? u(e) : u;
        if (!Object.is(b, e)) {
          const w = e;
          ((e =
            (m ?? (typeof b != "object" || b === null))
              ? b
              : Object.assign({}, e, b)),
            n.forEach((p) => p(e, w)));
        }
      },
      s = () => e,
      d = {
        setState: r,
        getState: s,
        getInitialState: () => l,
        subscribe: (u) => (n.add(u), () => n.delete(u)),
        destroy: () => {
          ((dl ? "production" : void 0) !== "production" &&
            console.warn(
              "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.",
            ),
            n.clear());
        },
      },
      l = (e = t(r, s, d));
    return d;
  },
  ul = (t) => (t ? eo(t) : eo);
var fi = { exports: {} },
  pi = {},
  gi = { exports: {} },
  mi = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Et = h;
function hl(t, e) {
  return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
}
var fl = typeof Object.is == "function" ? Object.is : hl,
  pl = Et.useState,
  gl = Et.useEffect,
  ml = Et.useLayoutEffect,
  xl = Et.useDebugValue;
function yl(t, e) {
  var n = e(),
    r = pl({ inst: { value: n, getSnapshot: e } }),
    s = r[0].inst,
    i = r[1];
  return (
    ml(
      function () {
        ((s.value = n), (s.getSnapshot = e), pr(s) && i({ inst: s }));
      },
      [t, n, e],
    ),
    gl(
      function () {
        return (
          pr(s) && i({ inst: s }),
          t(function () {
            pr(s) && i({ inst: s });
          })
        );
      },
      [t],
    ),
    xl(n),
    n
  );
}
function pr(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !fl(t, n);
  } catch {
    return !0;
  }
}
function bl(t, e) {
  return e();
}
var wl =
  typeof window > "u" ||
  typeof window.document > "u" ||
  typeof window.document.createElement > "u"
    ? bl
    : yl;
mi.useSyncExternalStore =
  Et.useSyncExternalStore !== void 0 ? Et.useSyncExternalStore : wl;
gi.exports = mi;
var vl = gi.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Un = h,
  Sl = vl;
function Cl(t, e) {
  return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
}
var kl = typeof Object.is == "function" ? Object.is : Cl,
  El = Sl.useSyncExternalStore,
  jl = Un.useRef,
  Rl = Un.useEffect,
  _l = Un.useMemo,
  Al = Un.useDebugValue;
pi.useSyncExternalStoreWithSelector = function (t, e, n, r, s) {
  var i = jl(null);
  if (i.current === null) {
    var a = { hasValue: !1, value: null };
    i.current = a;
  } else a = i.current;
  i = _l(
    function () {
      function d(w) {
        if (!l) {
          if (((l = !0), (u = w), (w = r(w)), s !== void 0 && a.hasValue)) {
            var p = a.value;
            if (s(p, w)) return (m = p);
          }
          return (m = w);
        }
        if (((p = m), kl(u, w))) return p;
        var x = r(w);
        return s !== void 0 && s(p, x) ? ((u = w), p) : ((u = w), (m = x));
      }
      var l = !1,
        u,
        m,
        b = n === void 0 ? null : n;
      return [
        function () {
          return d(e());
        },
        b === null
          ? void 0
          : function () {
              return d(b());
            },
      ];
    },
    [e, n, r, s],
  );
  var c = El(t, i[0], i[1]);
  return (
    Rl(
      function () {
        ((a.hasValue = !0), (a.value = c));
      },
      [c],
    ),
    Al(c),
    c
  );
};
fi.exports = pi;
var Tl = fi.exports;
const Pl = Vc(Tl),
  xi = {},
  { useDebugValue: Il } = je,
  { useSyncExternalStoreWithSelector: Ml } = Pl;
let to = !1;
const Dl = (t) => t;
function Ll(t, e = Dl, n) {
  (xi ? "production" : void 0) !== "production" &&
    n &&
    !to &&
    (console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937",
    ),
    (to = !0));
  const r = Ml(
    t.subscribe,
    t.getState,
    t.getServerState || t.getInitialState,
    e,
    n,
  );
  return (Il(r), r);
}
const no = (t) => {
    (xi ? "production" : void 0) !== "production" &&
      typeof t != "function" &&
      console.warn(
        "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.",
      );
    const e = typeof t == "function" ? ul(t) : t,
      n = (r, s) => Ll(e, r, s);
    return (Object.assign(n, e), n);
  },
  ht = (t) => (t ? no(t) : no),
  Ol = {};
function Nl(t, e) {
  let n;
  try {
    n = t();
  } catch {
    return;
  }
  return {
    getItem: (s) => {
      var i;
      const a = (d) => (d === null ? null : JSON.parse(d, void 0)),
        c = (i = n.getItem(s)) != null ? i : null;
      return c instanceof Promise ? c.then(a) : a(c);
    },
    setItem: (s, i) => n.setItem(s, JSON.stringify(i, void 0)),
    removeItem: (s) => n.removeItem(s),
  };
}
const Gt = (t) => (e) => {
    try {
      const n = t(e);
      return n instanceof Promise
        ? n
        : {
            then(r) {
              return Gt(r)(n);
            },
            catch(r) {
              return this;
            },
          };
    } catch (n) {
      return {
        then(r) {
          return this;
        },
        catch(r) {
          return Gt(r)(n);
        },
      };
    }
  },
  Fl = (t, e) => (n, r, s) => {
    let i = {
        getStorage: () => localStorage,
        serialize: JSON.stringify,
        deserialize: JSON.parse,
        partialize: (g) => g,
        version: 0,
        merge: (g, k) => ({ ...k, ...g }),
        ...e,
      },
      a = !1;
    const c = new Set(),
      d = new Set();
    let l;
    try {
      l = i.getStorage();
    } catch {}
    if (!l)
      return t(
        (...g) => {
          (console.warn(
            `[zustand persist middleware] Unable to update item '${i.name}', the given storage is currently unavailable.`,
          ),
            n(...g));
        },
        r,
        s,
      );
    const u = Gt(i.serialize),
      m = () => {
        const g = i.partialize({ ...r() });
        let k;
        const E = u({ state: g, version: i.version })
          .then((T) => l.setItem(i.name, T))
          .catch((T) => {
            k = T;
          });
        if (k) throw k;
        return E;
      },
      b = s.setState;
    s.setState = (g, k) => {
      (b(g, k), m());
    };
    const w = t(
      (...g) => {
        (n(...g), m());
      },
      r,
      s,
    );
    let p;
    const x = () => {
      var g;
      if (!l) return;
      ((a = !1), c.forEach((E) => E(r())));
      const k =
        ((g = i.onRehydrateStorage) == null ? void 0 : g.call(i, r())) ||
        void 0;
      return Gt(l.getItem.bind(l))(i.name)
        .then((E) => {
          if (E) return i.deserialize(E);
        })
        .then((E) => {
          if (E)
            if (typeof E.version == "number" && E.version !== i.version) {
              if (i.migrate) return i.migrate(E.state, E.version);
              console.error(
                "State loaded from storage couldn't be migrated since no migrate function was provided",
              );
            } else return E.state;
        })
        .then((E) => {
          var T;
          return ((p = i.merge(E, (T = r()) != null ? T : w)), n(p, !0), m());
        })
        .then(() => {
          (k == null || k(p, void 0), (a = !0), d.forEach((E) => E(p)));
        })
        .catch((E) => {
          k == null || k(void 0, E);
        });
    };
    return (
      (s.persist = {
        setOptions: (g) => {
          ((i = { ...i, ...g }), g.getStorage && (l = g.getStorage()));
        },
        clearStorage: () => {
          l == null || l.removeItem(i.name);
        },
        getOptions: () => i,
        rehydrate: () => x(),
        hasHydrated: () => a,
        onHydrate: (g) => (
          c.add(g),
          () => {
            c.delete(g);
          }
        ),
        onFinishHydration: (g) => (
          d.add(g),
          () => {
            d.delete(g);
          }
        ),
      }),
      x(),
      p || w
    );
  },
  zl = (t, e) => (n, r, s) => {
    let i = {
        storage: Nl(() => localStorage),
        partialize: (x) => x,
        version: 0,
        merge: (x, g) => ({ ...g, ...x }),
        ...e,
      },
      a = !1;
    const c = new Set(),
      d = new Set();
    let l = i.storage;
    if (!l)
      return t(
        (...x) => {
          (console.warn(
            `[zustand persist middleware] Unable to update item '${i.name}', the given storage is currently unavailable.`,
          ),
            n(...x));
        },
        r,
        s,
      );
    const u = () => {
        const x = i.partialize({ ...r() });
        return l.setItem(i.name, { state: x, version: i.version });
      },
      m = s.setState;
    s.setState = (x, g) => {
      (m(x, g), u());
    };
    const b = t(
      (...x) => {
        (n(...x), u());
      },
      r,
      s,
    );
    s.getInitialState = () => b;
    let w;
    const p = () => {
      var x, g;
      if (!l) return;
      ((a = !1),
        c.forEach((E) => {
          var T;
          return E((T = r()) != null ? T : b);
        }));
      const k =
        ((g = i.onRehydrateStorage) == null
          ? void 0
          : g.call(i, (x = r()) != null ? x : b)) || void 0;
      return Gt(l.getItem.bind(l))(i.name)
        .then((E) => {
          if (E)
            if (typeof E.version == "number" && E.version !== i.version) {
              if (i.migrate) return [!0, i.migrate(E.state, E.version)];
              console.error(
                "State loaded from storage couldn't be migrated since no migrate function was provided",
              );
            } else return [!1, E.state];
          return [!1, void 0];
        })
        .then((E) => {
          var T;
          const [M, H] = E;
          if (((w = i.merge(H, (T = r()) != null ? T : b)), n(w, !0), M))
            return u();
        })
        .then(() => {
          (k == null || k(w, void 0),
            (w = r()),
            (a = !0),
            d.forEach((E) => E(w)));
        })
        .catch((E) => {
          k == null || k(void 0, E);
        });
    };
    return (
      (s.persist = {
        setOptions: (x) => {
          ((i = { ...i, ...x }), x.storage && (l = x.storage));
        },
        clearStorage: () => {
          l == null || l.removeItem(i.name);
        },
        getOptions: () => i,
        rehydrate: () => p(),
        hasHydrated: () => a,
        onHydrate: (x) => (
          c.add(x),
          () => {
            c.delete(x);
          }
        ),
        onFinishHydration: (x) => (
          d.add(x),
          () => {
            d.delete(x);
          }
        ),
      }),
      i.skipHydration || p(),
      w || b
    );
  },
  Bl = (t, e) =>
    "getStorage" in e || "serialize" in e || "deserialize" in e
      ? ((Ol ? "production" : void 0) !== "production" &&
          console.warn(
            "[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead.",
          ),
        Fl(t, e))
      : zl(t, e),
  Xr = Bl;
function yi(t, e) {
  return function () {
    return t.apply(e, arguments);
  };
}
const { toString: Ul } = Object.prototype,
  { getPrototypeOf: Gr } = Object,
  { iterator: $n, toStringTag: bi } = Symbol,
  Wn = ((t) => (e) => {
    const n = Ul.call(e);
    return t[n] || (t[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  Fe = (t) => ((t = t.toLowerCase()), (e) => Wn(e) === t),
  Hn = (t) => (e) => typeof e === t,
  { isArray: At } = Array,
  jt = Hn("undefined");
function Qt(t) {
  return (
    t !== null &&
    !jt(t) &&
    t.constructor !== null &&
    !jt(t.constructor) &&
    Re(t.constructor.isBuffer) &&
    t.constructor.isBuffer(t)
  );
}
const wi = Fe("ArrayBuffer");
function $l(t) {
  let e;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (e = ArrayBuffer.isView(t))
      : (e = t && t.buffer && wi(t.buffer)),
    e
  );
}
const Wl = Hn("string"),
  Re = Hn("function"),
  vi = Hn("number"),
  Zt = (t) => t !== null && typeof t == "object",
  Hl = (t) => t === !0 || t === !1,
  jn = (t) => {
    if (Wn(t) !== "object") return !1;
    const e = Gr(t);
    return (
      (e === null ||
        e === Object.prototype ||
        Object.getPrototypeOf(e) === null) &&
      !(bi in t) &&
      !($n in t)
    );
  },
  ql = (t) => {
    if (!Zt(t) || Qt(t)) return !1;
    try {
      return (
        Object.keys(t).length === 0 &&
        Object.getPrototypeOf(t) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  Vl = Fe("Date"),
  Kl = Fe("File"),
  Yl = Fe("Blob"),
  Jl = Fe("FileList"),
  Xl = (t) => Zt(t) && Re(t.pipe),
  Gl = (t) => {
    let e;
    return (
      t &&
      ((typeof FormData == "function" && t instanceof FormData) ||
        (Re(t.append) &&
          ((e = Wn(t)) === "formdata" ||
            (e === "object" &&
              Re(t.toString) &&
              t.toString() === "[object FormData]"))))
    );
  },
  Ql = Fe("URLSearchParams"),
  [Zl, ed, td, nd] = ["ReadableStream", "Request", "Response", "Headers"].map(
    Fe,
  ),
  rd = (t) =>
    t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function en(t, e, { allOwnKeys: n = !1 } = {}) {
  if (t === null || typeof t > "u") return;
  let r, s;
  if ((typeof t != "object" && (t = [t]), At(t)))
    for (r = 0, s = t.length; r < s; r++) e.call(null, t[r], r, t);
  else {
    if (Qt(t)) return;
    const i = n ? Object.getOwnPropertyNames(t) : Object.keys(t),
      a = i.length;
    let c;
    for (r = 0; r < a; r++) ((c = i[r]), e.call(null, t[c], c, t));
  }
}
function Si(t, e) {
  if (Qt(t)) return null;
  e = e.toLowerCase();
  const n = Object.keys(t);
  let r = n.length,
    s;
  for (; r-- > 0; ) if (((s = n[r]), e === s.toLowerCase())) return s;
  return null;
}
const st =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : global,
  Ci = (t) => !jt(t) && t !== st;
function Pr() {
  const { caseless: t, skipUndefined: e } = (Ci(this) && this) || {},
    n = {},
    r = (s, i) => {
      if (i === "__proto__" || i === "constructor" || i === "prototype") return;
      const a = (t && Si(n, i)) || i;
      jn(n[a]) && jn(s)
        ? (n[a] = Pr(n[a], s))
        : jn(s)
          ? (n[a] = Pr({}, s))
          : At(s)
            ? (n[a] = s.slice())
            : (!e || !jt(s)) && (n[a] = s);
    };
  for (let s = 0, i = arguments.length; s < i; s++)
    arguments[s] && en(arguments[s], r);
  return n;
}
const sd = (t, e, n, { allOwnKeys: r } = {}) => (
    en(
      e,
      (s, i) => {
        n && Re(s)
          ? Object.defineProperty(t, i, {
              value: yi(s, n),
              writable: !0,
              enumerable: !0,
              configurable: !0,
            })
          : Object.defineProperty(t, i, {
              value: s,
              writable: !0,
              enumerable: !0,
              configurable: !0,
            });
      },
      { allOwnKeys: r },
    ),
    t
  ),
  od = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t),
  id = (t, e, n, r) => {
    ((t.prototype = Object.create(e.prototype, r)),
      Object.defineProperty(t.prototype, "constructor", {
        value: t,
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "super", { value: e.prototype }),
      n && Object.assign(t.prototype, n));
  },
  ad = (t, e, n, r) => {
    let s, i, a;
    const c = {};
    if (((e = e || {}), t == null)) return e;
    do {
      for (s = Object.getOwnPropertyNames(t), i = s.length; i-- > 0; )
        ((a = s[i]),
          (!r || r(a, t, e)) && !c[a] && ((e[a] = t[a]), (c[a] = !0)));
      t = n !== !1 && Gr(t);
    } while (t && (!n || n(t, e)) && t !== Object.prototype);
    return e;
  },
  cd = (t, e, n) => {
    ((t = String(t)),
      (n === void 0 || n > t.length) && (n = t.length),
      (n -= e.length));
    const r = t.indexOf(e, n);
    return r !== -1 && r === n;
  },
  ld = (t) => {
    if (!t) return null;
    if (At(t)) return t;
    let e = t.length;
    if (!vi(e)) return null;
    const n = new Array(e);
    for (; e-- > 0; ) n[e] = t[e];
    return n;
  },
  dd = (
    (t) => (e) =>
      t && e instanceof t
  )(typeof Uint8Array < "u" && Gr(Uint8Array)),
  ud = (t, e) => {
    const r = (t && t[$n]).call(t);
    let s;
    for (; (s = r.next()) && !s.done; ) {
      const i = s.value;
      e.call(t, i[0], i[1]);
    }
  },
  hd = (t, e) => {
    let n;
    const r = [];
    for (; (n = t.exec(e)) !== null; ) r.push(n);
    return r;
  },
  fd = Fe("HTMLFormElement"),
  pd = (t) =>
    t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, s) {
      return r.toUpperCase() + s;
    }),
  ro = (
    ({ hasOwnProperty: t }) =>
    (e, n) =>
      t.call(e, n)
  )(Object.prototype),
  gd = Fe("RegExp"),
  ki = (t, e) => {
    const n = Object.getOwnPropertyDescriptors(t),
      r = {};
    (en(n, (s, i) => {
      let a;
      (a = e(s, i, t)) !== !1 && (r[i] = a || s);
    }),
      Object.defineProperties(t, r));
  },
  md = (t) => {
    ki(t, (e, n) => {
      if (Re(t) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
        return !1;
      const r = t[n];
      if (Re(r)) {
        if (((e.enumerable = !1), "writable" in e)) {
          e.writable = !1;
          return;
        }
        e.set ||
          (e.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  xd = (t, e) => {
    const n = {},
      r = (s) => {
        s.forEach((i) => {
          n[i] = !0;
        });
      };
    return (At(t) ? r(t) : r(String(t).split(e)), n);
  },
  yd = () => {},
  bd = (t, e) => (t != null && Number.isFinite((t = +t)) ? t : e);
function wd(t) {
  return !!(t && Re(t.append) && t[bi] === "FormData" && t[$n]);
}
const vd = (t) => {
    const e = new Array(10),
      n = (r, s) => {
        if (Zt(r)) {
          if (e.indexOf(r) >= 0) return;
          if (Qt(r)) return r;
          if (!("toJSON" in r)) {
            e[s] = r;
            const i = At(r) ? [] : {};
            return (
              en(r, (a, c) => {
                const d = n(a, s + 1);
                !jt(d) && (i[c] = d);
              }),
              (e[s] = void 0),
              i
            );
          }
        }
        return r;
      };
    return n(t, 0);
  },
  Sd = Fe("AsyncFunction"),
  Cd = (t) => t && (Zt(t) || Re(t)) && Re(t.then) && Re(t.catch),
  Ei = ((t, e) =>
    t
      ? setImmediate
      : e
        ? ((n, r) => (
            st.addEventListener(
              "message",
              ({ source: s, data: i }) => {
                s === st && i === n && r.length && r.shift()();
              },
              !1,
            ),
            (s) => {
              (r.push(s), st.postMessage(n, "*"));
            }
          ))(`axios@${Math.random()}`, [])
        : (n) => setTimeout(n))(
    typeof setImmediate == "function",
    Re(st.postMessage),
  ),
  kd =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(st)
      : (typeof process < "u" && process.nextTick) || Ei,
  Ed = (t) => t != null && Re(t[$n]),
  v = {
    isArray: At,
    isArrayBuffer: wi,
    isBuffer: Qt,
    isFormData: Gl,
    isArrayBufferView: $l,
    isString: Wl,
    isNumber: vi,
    isBoolean: Hl,
    isObject: Zt,
    isPlainObject: jn,
    isEmptyObject: ql,
    isReadableStream: Zl,
    isRequest: ed,
    isResponse: td,
    isHeaders: nd,
    isUndefined: jt,
    isDate: Vl,
    isFile: Kl,
    isBlob: Yl,
    isRegExp: gd,
    isFunction: Re,
    isStream: Xl,
    isURLSearchParams: Ql,
    isTypedArray: dd,
    isFileList: Jl,
    forEach: en,
    merge: Pr,
    extend: sd,
    trim: rd,
    stripBOM: od,
    inherits: id,
    toFlatObject: ad,
    kindOf: Wn,
    kindOfTest: Fe,
    endsWith: cd,
    toArray: ld,
    forEachEntry: ud,
    matchAll: hd,
    isHTMLForm: fd,
    hasOwnProperty: ro,
    hasOwnProp: ro,
    reduceDescriptors: ki,
    freezeMethods: md,
    toObjectSet: xd,
    toCamelCase: pd,
    noop: yd,
    toFiniteNumber: bd,
    findKey: Si,
    global: st,
    isContextDefined: Ci,
    isSpecCompliantForm: wd,
    toJSONObject: vd,
    isAsyncFn: Sd,
    isThenable: Cd,
    setImmediate: Ei,
    asap: kd,
    isIterable: Ed,
  };
let Y = class ji extends Error {
  static from(e, n, r, s, i, a) {
    const c = new ji(e.message, n || e.code, r, s, i);
    return ((c.cause = e), (c.name = e.name), a && Object.assign(c, a), c);
  }
  constructor(e, n, r, s, i) {
    (super(e),
      (this.name = "AxiosError"),
      (this.isAxiosError = !0),
      n && (this.code = n),
      r && (this.config = r),
      s && (this.request = s),
      i && ((this.response = i), (this.status = i.status)));
  }
  toJSON() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: v.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  }
};
Y.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
Y.ERR_BAD_OPTION = "ERR_BAD_OPTION";
Y.ECONNABORTED = "ECONNABORTED";
Y.ETIMEDOUT = "ETIMEDOUT";
Y.ERR_NETWORK = "ERR_NETWORK";
Y.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
Y.ERR_DEPRECATED = "ERR_DEPRECATED";
Y.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
Y.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
Y.ERR_CANCELED = "ERR_CANCELED";
Y.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
Y.ERR_INVALID_URL = "ERR_INVALID_URL";
const jd = null;
function Ir(t) {
  return v.isPlainObject(t) || v.isArray(t);
}
function Ri(t) {
  return v.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function so(t, e, n) {
  return t
    ? t
        .concat(e)
        .map(function (s, i) {
          return ((s = Ri(s)), !n && i ? "[" + s + "]" : s);
        })
        .join(n ? "." : "")
    : e;
}
function Rd(t) {
  return v.isArray(t) && !t.some(Ir);
}
const _d = v.toFlatObject(v, {}, null, function (e) {
  return /^is[A-Z]/.test(e);
});
function qn(t, e, n) {
  if (!v.isObject(t)) throw new TypeError("target must be an object");
  ((e = e || new FormData()),
    (n = v.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (x, g) {
        return !v.isUndefined(g[x]);
      },
    )));
  const r = n.metaTokens,
    s = n.visitor || u,
    i = n.dots,
    a = n.indexes,
    d = (n.Blob || (typeof Blob < "u" && Blob)) && v.isSpecCompliantForm(e);
  if (!v.isFunction(s)) throw new TypeError("visitor must be a function");
  function l(p) {
    if (p === null) return "";
    if (v.isDate(p)) return p.toISOString();
    if (v.isBoolean(p)) return p.toString();
    if (!d && v.isBlob(p))
      throw new Y("Blob is not supported. Use a Buffer instead.");
    return v.isArrayBuffer(p) || v.isTypedArray(p)
      ? d && typeof Blob == "function"
        ? new Blob([p])
        : Buffer.from(p)
      : p;
  }
  function u(p, x, g) {
    let k = p;
    if (p && !g && typeof p == "object") {
      if (v.endsWith(x, "{}"))
        ((x = r ? x : x.slice(0, -2)), (p = JSON.stringify(p)));
      else if (
        (v.isArray(p) && Rd(p)) ||
        ((v.isFileList(p) || v.endsWith(x, "[]")) && (k = v.toArray(p)))
      )
        return (
          (x = Ri(x)),
          k.forEach(function (T, M) {
            !(v.isUndefined(T) || T === null) &&
              e.append(
                a === !0 ? so([x], M, i) : a === null ? x : x + "[]",
                l(T),
              );
          }),
          !1
        );
    }
    return Ir(p) ? !0 : (e.append(so(g, x, i), l(p)), !1);
  }
  const m = [],
    b = Object.assign(_d, {
      defaultVisitor: u,
      convertValue: l,
      isVisitable: Ir,
    });
  function w(p, x) {
    if (!v.isUndefined(p)) {
      if (m.indexOf(p) !== -1)
        throw Error("Circular reference detected in " + x.join("."));
      (m.push(p),
        v.forEach(p, function (k, E) {
          (!(v.isUndefined(k) || k === null) &&
            s.call(e, k, v.isString(E) ? E.trim() : E, x, b)) === !0 &&
            w(k, x ? x.concat(E) : [E]);
        }),
        m.pop());
    }
  }
  if (!v.isObject(t)) throw new TypeError("data must be an object");
  return (w(t), e);
}
function oo(t) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function (r) {
    return e[r];
  });
}
function Qr(t, e) {
  ((this._pairs = []), t && qn(t, this, e));
}
const _i = Qr.prototype;
_i.append = function (e, n) {
  this._pairs.push([e, n]);
};
_i.toString = function (e) {
  const n = e
    ? function (r) {
        return e.call(this, r, oo);
      }
    : oo;
  return this._pairs
    .map(function (s) {
      return n(s[0]) + "=" + n(s[1]);
    }, "")
    .join("&");
};
function Ad(t) {
  return encodeURIComponent(t)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+");
}
function Ai(t, e, n) {
  if (!e) return t;
  const r = (n && n.encode) || Ad,
    s = v.isFunction(n) ? { serialize: n } : n,
    i = s && s.serialize;
  let a;
  if (
    (i
      ? (a = i(e, s))
      : (a = v.isURLSearchParams(e) ? e.toString() : new Qr(e, s).toString(r)),
    a)
  ) {
    const c = t.indexOf("#");
    (c !== -1 && (t = t.slice(0, c)),
      (t += (t.indexOf("?") === -1 ? "?" : "&") + a));
  }
  return t;
}
class io {
  constructor() {
    this.handlers = [];
  }
  use(e, n, r) {
    return (
      this.handlers.push({
        fulfilled: e,
        rejected: n,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(e) {
    v.forEach(this.handlers, function (r) {
      r !== null && e(r);
    });
  }
}
const Zr = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
    legacyInterceptorReqResOrdering: !0,
  },
  Td = typeof URLSearchParams < "u" ? URLSearchParams : Qr,
  Pd = typeof FormData < "u" ? FormData : null,
  Id = typeof Blob < "u" ? Blob : null,
  Md = {
    isBrowser: !0,
    classes: { URLSearchParams: Td, FormData: Pd, Blob: Id },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  es = typeof window < "u" && typeof document < "u",
  Mr = (typeof navigator == "object" && navigator) || void 0,
  Dd =
    es &&
    (!Mr || ["ReactNative", "NativeScript", "NS"].indexOf(Mr.product) < 0),
  Ld =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  Od = (es && window.location.href) || "http://localhost",
  Nd = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: es,
        hasStandardBrowserEnv: Dd,
        hasStandardBrowserWebWorkerEnv: Ld,
        navigator: Mr,
        origin: Od,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  ke = { ...Nd, ...Md };
function Fd(t, e) {
  return qn(t, new ke.classes.URLSearchParams(), {
    visitor: function (n, r, s, i) {
      return ke.isNode && v.isBuffer(n)
        ? (this.append(r, n.toString("base64")), !1)
        : i.defaultVisitor.apply(this, arguments);
    },
    ...e,
  });
}
function zd(t) {
  return v
    .matchAll(/\w+|\[(\w*)]/g, t)
    .map((e) => (e[0] === "[]" ? "" : e[1] || e[0]));
}
function Bd(t) {
  const e = {},
    n = Object.keys(t);
  let r;
  const s = n.length;
  let i;
  for (r = 0; r < s; r++) ((i = n[r]), (e[i] = t[i]));
  return e;
}
function Ti(t) {
  function e(n, r, s, i) {
    let a = n[i++];
    if (a === "__proto__") return !0;
    const c = Number.isFinite(+a),
      d = i >= n.length;
    return (
      (a = !a && v.isArray(s) ? s.length : a),
      d
        ? (v.hasOwnProp(s, a) ? (s[a] = [s[a], r]) : (s[a] = r), !c)
        : ((!s[a] || !v.isObject(s[a])) && (s[a] = []),
          e(n, r, s[a], i) && v.isArray(s[a]) && (s[a] = Bd(s[a])),
          !c)
    );
  }
  if (v.isFormData(t) && v.isFunction(t.entries)) {
    const n = {};
    return (
      v.forEachEntry(t, (r, s) => {
        e(zd(r), s, n, 0);
      }),
      n
    );
  }
  return null;
}
function Ud(t, e, n) {
  if (v.isString(t))
    try {
      return ((e || JSON.parse)(t), v.trim(t));
    } catch (r) {
      if (r.name !== "SyntaxError") throw r;
    }
  return (n || JSON.stringify)(t);
}
const tn = {
  transitional: Zr,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (e, n) {
      const r = n.getContentType() || "",
        s = r.indexOf("application/json") > -1,
        i = v.isObject(e);
      if ((i && v.isHTMLForm(e) && (e = new FormData(e)), v.isFormData(e)))
        return s ? JSON.stringify(Ti(e)) : e;
      if (
        v.isArrayBuffer(e) ||
        v.isBuffer(e) ||
        v.isStream(e) ||
        v.isFile(e) ||
        v.isBlob(e) ||
        v.isReadableStream(e)
      )
        return e;
      if (v.isArrayBufferView(e)) return e.buffer;
      if (v.isURLSearchParams(e))
        return (
          n.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1,
          ),
          e.toString()
        );
      let c;
      if (i) {
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return Fd(e, this.formSerializer).toString();
        if ((c = v.isFileList(e)) || r.indexOf("multipart/form-data") > -1) {
          const d = this.env && this.env.FormData;
          return qn(
            c ? { "files[]": e } : e,
            d && new d(),
            this.formSerializer,
          );
        }
      }
      return i || s ? (n.setContentType("application/json", !1), Ud(e)) : e;
    },
  ],
  transformResponse: [
    function (e) {
      const n = this.transitional || tn.transitional,
        r = n && n.forcedJSONParsing,
        s = this.responseType === "json";
      if (v.isResponse(e) || v.isReadableStream(e)) return e;
      if (e && v.isString(e) && ((r && !this.responseType) || s)) {
        const a = !(n && n.silentJSONParsing) && s;
        try {
          return JSON.parse(e, this.parseReviver);
        } catch (c) {
          if (a)
            throw c.name === "SyntaxError"
              ? Y.from(c, Y.ERR_BAD_RESPONSE, this, null, this.response)
              : c;
        }
      }
      return e;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: ke.classes.FormData, Blob: ke.classes.Blob },
  validateStatus: function (e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
v.forEach(["delete", "get", "head", "post", "put", "patch"], (t) => {
  tn.headers[t] = {};
});
const $d = v.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  Wd = (t) => {
    const e = {};
    let n, r, s;
    return (
      t &&
        t
          .split(
            `
`,
          )
          .forEach(function (a) {
            ((s = a.indexOf(":")),
              (n = a.substring(0, s).trim().toLowerCase()),
              (r = a.substring(s + 1).trim()),
              !(!n || (e[n] && $d[n])) &&
                (n === "set-cookie"
                  ? e[n]
                    ? e[n].push(r)
                    : (e[n] = [r])
                  : (e[n] = e[n] ? e[n] + ", " + r : r)));
          }),
      e
    );
  },
  ao = Symbol("internals");
function Ft(t) {
  return t && String(t).trim().toLowerCase();
}
function Rn(t) {
  return t === !1 || t == null ? t : v.isArray(t) ? t.map(Rn) : String(t);
}
function Hd(t) {
  const e = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = n.exec(t)); ) e[r[1]] = r[2];
  return e;
}
const qd = (t) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());
function gr(t, e, n, r, s) {
  if (v.isFunction(r)) return r.call(this, e, n);
  if ((s && (e = n), !!v.isString(e))) {
    if (v.isString(r)) return e.indexOf(r) !== -1;
    if (v.isRegExp(r)) return r.test(e);
  }
}
function Vd(t) {
  return t
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (e, n, r) => n.toUpperCase() + r);
}
function Kd(t, e) {
  const n = v.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(t, r + n, {
      value: function (s, i, a) {
        return this[r].call(this, e, s, i, a);
      },
      configurable: !0,
    });
  });
}
let _e = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, n, r) {
    const s = this;
    function i(c, d, l) {
      const u = Ft(d);
      if (!u) throw new Error("header name must be a non-empty string");
      const m = v.findKey(s, u);
      (!m || s[m] === void 0 || l === !0 || (l === void 0 && s[m] !== !1)) &&
        (s[m || d] = Rn(c));
    }
    const a = (c, d) => v.forEach(c, (l, u) => i(l, u, d));
    if (v.isPlainObject(e) || e instanceof this.constructor) a(e, n);
    else if (v.isString(e) && (e = e.trim()) && !qd(e)) a(Wd(e), n);
    else if (v.isObject(e) && v.isIterable(e)) {
      let c = {},
        d,
        l;
      for (const u of e) {
        if (!v.isArray(u))
          throw TypeError("Object iterator must return a key-value pair");
        c[(l = u[0])] = (d = c[l])
          ? v.isArray(d)
            ? [...d, u[1]]
            : [d, u[1]]
          : u[1];
      }
      a(c, n);
    } else e != null && i(n, e, r);
    return this;
  }
  get(e, n) {
    if (((e = Ft(e)), e)) {
      const r = v.findKey(this, e);
      if (r) {
        const s = this[r];
        if (!n) return s;
        if (n === !0) return Hd(s);
        if (v.isFunction(n)) return n.call(this, s, r);
        if (v.isRegExp(n)) return n.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, n) {
    if (((e = Ft(e)), e)) {
      const r = v.findKey(this, e);
      return !!(r && this[r] !== void 0 && (!n || gr(this, this[r], r, n)));
    }
    return !1;
  }
  delete(e, n) {
    const r = this;
    let s = !1;
    function i(a) {
      if (((a = Ft(a)), a)) {
        const c = v.findKey(r, a);
        c && (!n || gr(r, r[c], c, n)) && (delete r[c], (s = !0));
      }
    }
    return (v.isArray(e) ? e.forEach(i) : i(e), s);
  }
  clear(e) {
    const n = Object.keys(this);
    let r = n.length,
      s = !1;
    for (; r--; ) {
      const i = n[r];
      (!e || gr(this, this[i], i, e, !0)) && (delete this[i], (s = !0));
    }
    return s;
  }
  normalize(e) {
    const n = this,
      r = {};
    return (
      v.forEach(this, (s, i) => {
        const a = v.findKey(r, i);
        if (a) {
          ((n[a] = Rn(s)), delete n[i]);
          return;
        }
        const c = e ? Vd(i) : String(i).trim();
        (c !== i && delete n[i], (n[c] = Rn(s)), (r[c] = !0));
      }),
      this
    );
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const n = Object.create(null);
    return (
      v.forEach(this, (r, s) => {
        r != null && r !== !1 && (n[s] = e && v.isArray(r) ? r.join(", ") : r);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, n]) => e + ": " + n).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...n) {
    const r = new this(e);
    return (n.forEach((s) => r.set(s)), r);
  }
  static accessor(e) {
    const r = (this[ao] = this[ao] = { accessors: {} }).accessors,
      s = this.prototype;
    function i(a) {
      const c = Ft(a);
      r[c] || (Kd(s, a), (r[c] = !0));
    }
    return (v.isArray(e) ? e.forEach(i) : i(e), this);
  }
};
_e.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
v.reduceDescriptors(_e.prototype, ({ value: t }, e) => {
  let n = e[0].toUpperCase() + e.slice(1);
  return {
    get: () => t,
    set(r) {
      this[n] = r;
    },
  };
});
v.freezeMethods(_e);
function mr(t, e) {
  const n = this || tn,
    r = e || n,
    s = _e.from(r.headers);
  let i = r.data;
  return (
    v.forEach(t, function (c) {
      i = c.call(n, i, s.normalize(), e ? e.status : void 0);
    }),
    s.normalize(),
    i
  );
}
function Pi(t) {
  return !!(t && t.__CANCEL__);
}
let nn = class extends Y {
  constructor(e, n, r) {
    (super(e ?? "canceled", Y.ERR_CANCELED, n, r),
      (this.name = "CanceledError"),
      (this.__CANCEL__ = !0));
  }
};
function Ii(t, e, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status)
    ? t(n)
    : e(
        new Y(
          "Request failed with status code " + n.status,
          [Y.ERR_BAD_REQUEST, Y.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n,
        ),
      );
}
function Yd(t) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return (e && e[1]) || "";
}
function Jd(t, e) {
  t = t || 10;
  const n = new Array(t),
    r = new Array(t);
  let s = 0,
    i = 0,
    a;
  return (
    (e = e !== void 0 ? e : 1e3),
    function (d) {
      const l = Date.now(),
        u = r[i];
      (a || (a = l), (n[s] = d), (r[s] = l));
      let m = i,
        b = 0;
      for (; m !== s; ) ((b += n[m++]), (m = m % t));
      if (((s = (s + 1) % t), s === i && (i = (i + 1) % t), l - a < e)) return;
      const w = u && l - u;
      return w ? Math.round((b * 1e3) / w) : void 0;
    }
  );
}
function Xd(t, e) {
  let n = 0,
    r = 1e3 / e,
    s,
    i;
  const a = (l, u = Date.now()) => {
    ((n = u), (s = null), i && (clearTimeout(i), (i = null)), t(...l));
  };
  return [
    (...l) => {
      const u = Date.now(),
        m = u - n;
      m >= r
        ? a(l, u)
        : ((s = l),
          i ||
            (i = setTimeout(() => {
              ((i = null), a(s));
            }, r - m)));
    },
    () => s && a(s),
  ];
}
const Ln = (t, e, n = 3) => {
    let r = 0;
    const s = Jd(50, 250);
    return Xd((i) => {
      const a = i.loaded,
        c = i.lengthComputable ? i.total : void 0,
        d = a - r,
        l = s(d),
        u = a <= c;
      r = a;
      const m = {
        loaded: a,
        total: c,
        progress: c ? a / c : void 0,
        bytes: d,
        rate: l || void 0,
        estimated: l && c && u ? (c - a) / l : void 0,
        event: i,
        lengthComputable: c != null,
        [e ? "download" : "upload"]: !0,
      };
      t(m);
    }, n);
  },
  co = (t, e) => {
    const n = t != null;
    return [(r) => e[0]({ lengthComputable: n, total: t, loaded: r }), e[1]];
  },
  lo =
    (t) =>
    (...e) =>
      v.asap(() => t(...e)),
  Gd = ke.hasStandardBrowserEnv
    ? ((t, e) => (n) => (
        (n = new URL(n, ke.origin)),
        t.protocol === n.protocol &&
          t.host === n.host &&
          (e || t.port === n.port)
      ))(
        new URL(ke.origin),
        ke.navigator && /(msie|trident)/i.test(ke.navigator.userAgent),
      )
    : () => !0,
  Qd = ke.hasStandardBrowserEnv
    ? {
        write(t, e, n, r, s, i, a) {
          if (typeof document > "u") return;
          const c = [`${t}=${encodeURIComponent(e)}`];
          (v.isNumber(n) && c.push(`expires=${new Date(n).toUTCString()}`),
            v.isString(r) && c.push(`path=${r}`),
            v.isString(s) && c.push(`domain=${s}`),
            i === !0 && c.push("secure"),
            v.isString(a) && c.push(`SameSite=${a}`),
            (document.cookie = c.join("; ")));
        },
        read(t) {
          if (typeof document > "u") return null;
          const e = document.cookie.match(
            new RegExp("(?:^|; )" + t + "=([^;]*)"),
          );
          return e ? decodeURIComponent(e[1]) : null;
        },
        remove(t) {
          this.write(t, "", Date.now() - 864e5, "/");
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function Zd(t) {
  return typeof t != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function eu(t, e) {
  return e ? t.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : t;
}
function Mi(t, e, n) {
  let r = !Zd(e);
  return t && (r || n == !1) ? eu(t, e) : e;
}
const uo = (t) => (t instanceof _e ? { ...t } : t);
function lt(t, e) {
  e = e || {};
  const n = {};
  function r(l, u, m, b) {
    return v.isPlainObject(l) && v.isPlainObject(u)
      ? v.merge.call({ caseless: b }, l, u)
      : v.isPlainObject(u)
        ? v.merge({}, u)
        : v.isArray(u)
          ? u.slice()
          : u;
  }
  function s(l, u, m, b) {
    if (v.isUndefined(u)) {
      if (!v.isUndefined(l)) return r(void 0, l, m, b);
    } else return r(l, u, m, b);
  }
  function i(l, u) {
    if (!v.isUndefined(u)) return r(void 0, u);
  }
  function a(l, u) {
    if (v.isUndefined(u)) {
      if (!v.isUndefined(l)) return r(void 0, l);
    } else return r(void 0, u);
  }
  function c(l, u, m) {
    if (m in e) return r(l, u);
    if (m in t) return r(void 0, l);
  }
  const d = {
    url: i,
    method: i,
    data: i,
    baseURL: a,
    transformRequest: a,
    transformResponse: a,
    paramsSerializer: a,
    timeout: a,
    timeoutMessage: a,
    withCredentials: a,
    withXSRFToken: a,
    adapter: a,
    responseType: a,
    xsrfCookieName: a,
    xsrfHeaderName: a,
    onUploadProgress: a,
    onDownloadProgress: a,
    decompress: a,
    maxContentLength: a,
    maxBodyLength: a,
    beforeRedirect: a,
    transport: a,
    httpAgent: a,
    httpsAgent: a,
    cancelToken: a,
    socketPath: a,
    responseEncoding: a,
    validateStatus: c,
    headers: (l, u, m) => s(uo(l), uo(u), m, !0),
  };
  return (
    v.forEach(Object.keys({ ...t, ...e }), function (u) {
      if (u === "__proto__" || u === "constructor" || u === "prototype") return;
      const m = v.hasOwnProp(d, u) ? d[u] : s,
        b = m(t[u], e[u], u);
      (v.isUndefined(b) && m !== c) || (n[u] = b);
    }),
    n
  );
}
const Di = (t) => {
    const e = lt({}, t);
    let {
      data: n,
      withXSRFToken: r,
      xsrfHeaderName: s,
      xsrfCookieName: i,
      headers: a,
      auth: c,
    } = e;
    if (
      ((e.headers = a = _e.from(a)),
      (e.url = Ai(
        Mi(e.baseURL, e.url, e.allowAbsoluteUrls),
        t.params,
        t.paramsSerializer,
      )),
      c &&
        a.set(
          "Authorization",
          "Basic " +
            btoa(
              (c.username || "") +
                ":" +
                (c.password ? unescape(encodeURIComponent(c.password)) : ""),
            ),
        ),
      v.isFormData(n))
    ) {
      if (ke.hasStandardBrowserEnv || ke.hasStandardBrowserWebWorkerEnv)
        a.setContentType(void 0);
      else if (v.isFunction(n.getHeaders)) {
        const d = n.getHeaders(),
          l = ["content-type", "content-length"];
        Object.entries(d).forEach(([u, m]) => {
          l.includes(u.toLowerCase()) && a.set(u, m);
        });
      }
    }
    if (
      ke.hasStandardBrowserEnv &&
      (r && v.isFunction(r) && (r = r(e)), r || (r !== !1 && Gd(e.url)))
    ) {
      const d = s && i && Qd.read(i);
      d && a.set(s, d);
    }
    return e;
  },
  tu = typeof XMLHttpRequest < "u",
  nu =
    tu &&
    function (t) {
      return new Promise(function (n, r) {
        const s = Di(t);
        let i = s.data;
        const a = _e.from(s.headers).normalize();
        let { responseType: c, onUploadProgress: d, onDownloadProgress: l } = s,
          u,
          m,
          b,
          w,
          p;
        function x() {
          (w && w(),
            p && p(),
            s.cancelToken && s.cancelToken.unsubscribe(u),
            s.signal && s.signal.removeEventListener("abort", u));
        }
        let g = new XMLHttpRequest();
        (g.open(s.method.toUpperCase(), s.url, !0), (g.timeout = s.timeout));
        function k() {
          if (!g) return;
          const T = _e.from(
              "getAllResponseHeaders" in g && g.getAllResponseHeaders(),
            ),
            H = {
              data:
                !c || c === "text" || c === "json"
                  ? g.responseText
                  : g.response,
              status: g.status,
              statusText: g.statusText,
              headers: T,
              config: t,
              request: g,
            };
          (Ii(
            function (D) {
              (n(D), x());
            },
            function (D) {
              (r(D), x());
            },
            H,
          ),
            (g = null));
        }
        ("onloadend" in g
          ? (g.onloadend = k)
          : (g.onreadystatechange = function () {
              !g ||
                g.readyState !== 4 ||
                (g.status === 0 &&
                  !(g.responseURL && g.responseURL.indexOf("file:") === 0)) ||
                setTimeout(k);
            }),
          (g.onabort = function () {
            g &&
              (r(new Y("Request aborted", Y.ECONNABORTED, t, g)), (g = null));
          }),
          (g.onerror = function (M) {
            const H = M && M.message ? M.message : "Network Error",
              Z = new Y(H, Y.ERR_NETWORK, t, g);
            ((Z.event = M || null), r(Z), (g = null));
          }),
          (g.ontimeout = function () {
            let M = s.timeout
              ? "timeout of " + s.timeout + "ms exceeded"
              : "timeout exceeded";
            const H = s.transitional || Zr;
            (s.timeoutErrorMessage && (M = s.timeoutErrorMessage),
              r(
                new Y(
                  M,
                  H.clarifyTimeoutError ? Y.ETIMEDOUT : Y.ECONNABORTED,
                  t,
                  g,
                ),
              ),
              (g = null));
          }),
          i === void 0 && a.setContentType(null),
          "setRequestHeader" in g &&
            v.forEach(a.toJSON(), function (M, H) {
              g.setRequestHeader(H, M);
            }),
          v.isUndefined(s.withCredentials) ||
            (g.withCredentials = !!s.withCredentials),
          c && c !== "json" && (g.responseType = s.responseType),
          l && (([b, p] = Ln(l, !0)), g.addEventListener("progress", b)),
          d &&
            g.upload &&
            (([m, w] = Ln(d)),
            g.upload.addEventListener("progress", m),
            g.upload.addEventListener("loadend", w)),
          (s.cancelToken || s.signal) &&
            ((u = (T) => {
              g &&
                (r(!T || T.type ? new nn(null, t, g) : T),
                g.abort(),
                (g = null));
            }),
            s.cancelToken && s.cancelToken.subscribe(u),
            s.signal &&
              (s.signal.aborted
                ? u()
                : s.signal.addEventListener("abort", u))));
        const E = Yd(s.url);
        if (E && ke.protocols.indexOf(E) === -1) {
          r(new Y("Unsupported protocol " + E + ":", Y.ERR_BAD_REQUEST, t));
          return;
        }
        g.send(i || null);
      });
    },
  ru = (t, e) => {
    const { length: n } = (t = t ? t.filter(Boolean) : []);
    if (e || n) {
      let r = new AbortController(),
        s;
      const i = function (l) {
        if (!s) {
          ((s = !0), c());
          const u = l instanceof Error ? l : this.reason;
          r.abort(
            u instanceof Y ? u : new nn(u instanceof Error ? u.message : u),
          );
        }
      };
      let a =
        e &&
        setTimeout(() => {
          ((a = null), i(new Y(`timeout of ${e}ms exceeded`, Y.ETIMEDOUT)));
        }, e);
      const c = () => {
        t &&
          (a && clearTimeout(a),
          (a = null),
          t.forEach((l) => {
            l.unsubscribe
              ? l.unsubscribe(i)
              : l.removeEventListener("abort", i);
          }),
          (t = null));
      };
      t.forEach((l) => l.addEventListener("abort", i));
      const { signal: d } = r;
      return ((d.unsubscribe = () => v.asap(c)), d);
    }
  },
  su = function* (t, e) {
    let n = t.byteLength;
    if (n < e) {
      yield t;
      return;
    }
    let r = 0,
      s;
    for (; r < n; ) ((s = r + e), yield t.slice(r, s), (r = s));
  },
  ou = async function* (t, e) {
    for await (const n of iu(t)) yield* su(n, e);
  },
  iu = async function* (t) {
    if (t[Symbol.asyncIterator]) {
      yield* t;
      return;
    }
    const e = t.getReader();
    try {
      for (;;) {
        const { done: n, value: r } = await e.read();
        if (n) break;
        yield r;
      }
    } finally {
      await e.cancel();
    }
  },
  ho = (t, e, n, r) => {
    const s = ou(t, e);
    let i = 0,
      a,
      c = (d) => {
        a || ((a = !0), r && r(d));
      };
    return new ReadableStream(
      {
        async pull(d) {
          try {
            const { done: l, value: u } = await s.next();
            if (l) {
              (c(), d.close());
              return;
            }
            let m = u.byteLength;
            if (n) {
              let b = (i += m);
              n(b);
            }
            d.enqueue(new Uint8Array(u));
          } catch (l) {
            throw (c(l), l);
          }
        },
        cancel(d) {
          return (c(d), s.return());
        },
      },
      { highWaterMark: 2 },
    );
  },
  fo = 64 * 1024,
  { isFunction: xn } = v,
  au = (({ Request: t, Response: e }) => ({ Request: t, Response: e }))(
    v.global,
  ),
  { ReadableStream: po, TextEncoder: go } = v.global,
  mo = (t, ...e) => {
    try {
      return !!t(...e);
    } catch {
      return !1;
    }
  },
  cu = (t) => {
    t = v.merge.call({ skipUndefined: !0 }, au, t);
    const { fetch: e, Request: n, Response: r } = t,
      s = e ? xn(e) : typeof fetch == "function",
      i = xn(n),
      a = xn(r);
    if (!s) return !1;
    const c = s && xn(po),
      d =
        s &&
        (typeof go == "function"
          ? (
              (p) => (x) =>
                p.encode(x)
            )(new go())
          : async (p) => new Uint8Array(await new n(p).arrayBuffer())),
      l =
        i &&
        c &&
        mo(() => {
          let p = !1;
          const x = new n(ke.origin, {
            body: new po(),
            method: "POST",
            get duplex() {
              return ((p = !0), "half");
            },
          }).headers.has("Content-Type");
          return p && !x;
        }),
      u = a && c && mo(() => v.isReadableStream(new r("").body)),
      m = { stream: u && ((p) => p.body) };
    s &&
      ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((p) => {
        !m[p] &&
          (m[p] = (x, g) => {
            let k = x && x[p];
            if (k) return k.call(x);
            throw new Y(
              `Response type '${p}' is not supported`,
              Y.ERR_NOT_SUPPORT,
              g,
            );
          });
      });
    const b = async (p) => {
        if (p == null) return 0;
        if (v.isBlob(p)) return p.size;
        if (v.isSpecCompliantForm(p))
          return (
            await new n(ke.origin, { method: "POST", body: p }).arrayBuffer()
          ).byteLength;
        if (v.isArrayBufferView(p) || v.isArrayBuffer(p)) return p.byteLength;
        if ((v.isURLSearchParams(p) && (p = p + ""), v.isString(p)))
          return (await d(p)).byteLength;
      },
      w = async (p, x) => {
        const g = v.toFiniteNumber(p.getContentLength());
        return g ?? b(x);
      };
    return async (p) => {
      let {
          url: x,
          method: g,
          data: k,
          signal: E,
          cancelToken: T,
          timeout: M,
          onDownloadProgress: H,
          onUploadProgress: Z,
          responseType: D,
          headers: _,
          withCredentials: P = "same-origin",
          fetchOptions: J,
        } = Di(p),
        ae = e || fetch;
      D = D ? (D + "").toLowerCase() : "text";
      let te = ru([E, T && T.toAbortSignal()], M),
        re = null;
      const B =
        te &&
        te.unsubscribe &&
        (() => {
          te.unsubscribe();
        });
      let K;
      try {
        if (
          Z &&
          l &&
          g !== "get" &&
          g !== "head" &&
          (K = await w(_, k)) !== 0
        ) {
          let se = new n(x, { method: "POST", body: k, duplex: "half" }),
            ue;
          if (
            (v.isFormData(k) &&
              (ue = se.headers.get("content-type")) &&
              _.setContentType(ue),
            se.body)
          ) {
            const [he, de] = co(K, Ln(lo(Z)));
            k = ho(se.body, fo, he, de);
          }
        }
        v.isString(P) || (P = P ? "include" : "omit");
        const L = i && "credentials" in n.prototype,
          W = {
            ...J,
            signal: te,
            method: g.toUpperCase(),
            headers: _.normalize().toJSON(),
            body: k,
            duplex: "half",
            credentials: L ? P : void 0,
          };
        re = i && new n(x, W);
        let Q = await (i ? ae(re, J) : ae(x, W));
        const ce = u && (D === "stream" || D === "response");
        if (u && (H || (ce && B))) {
          const se = {};
          ["status", "statusText", "headers"].forEach((fe) => {
            se[fe] = Q[fe];
          });
          const ue = v.toFiniteNumber(Q.headers.get("content-length")),
            [he, de] = (H && co(ue, Ln(lo(H), !0))) || [];
          Q = new r(
            ho(Q.body, fo, he, () => {
              (de && de(), B && B());
            }),
            se,
          );
        }
        D = D || "text";
        let le = await m[v.findKey(m, D) || "text"](Q, p);
        return (
          !ce && B && B(),
          await new Promise((se, ue) => {
            Ii(se, ue, {
              data: le,
              headers: _e.from(Q.headers),
              status: Q.status,
              statusText: Q.statusText,
              config: p,
              request: re,
            });
          })
        );
      } catch (L) {
        throw (
          B && B(),
          L && L.name === "TypeError" && /Load failed|fetch/i.test(L.message)
            ? Object.assign(
                new Y("Network Error", Y.ERR_NETWORK, p, re, L && L.response),
                { cause: L.cause || L },
              )
            : Y.from(L, L && L.code, p, re, L && L.response)
        );
      }
    };
  },
  lu = new Map(),
  Li = (t) => {
    let e = (t && t.env) || {};
    const { fetch: n, Request: r, Response: s } = e,
      i = [r, s, n];
    let a = i.length,
      c = a,
      d,
      l,
      u = lu;
    for (; c--; )
      ((d = i[c]),
        (l = u.get(d)),
        l === void 0 && u.set(d, (l = c ? new Map() : cu(e))),
        (u = l));
    return l;
  };
Li();
const ts = { http: jd, xhr: nu, fetch: { get: Li } };
v.forEach(ts, (t, e) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { value: e });
    } catch {}
    Object.defineProperty(t, "adapterName", { value: e });
  }
});
const xo = (t) => `- ${t}`,
  du = (t) => v.isFunction(t) || t === null || t === !1;
function uu(t, e) {
  t = v.isArray(t) ? t : [t];
  const { length: n } = t;
  let r, s;
  const i = {};
  for (let a = 0; a < n; a++) {
    r = t[a];
    let c;
    if (
      ((s = r),
      !du(r) && ((s = ts[(c = String(r)).toLowerCase()]), s === void 0))
    )
      throw new Y(`Unknown adapter '${c}'`);
    if (s && (v.isFunction(s) || (s = s.get(e)))) break;
    i[c || "#" + a] = s;
  }
  if (!s) {
    const a = Object.entries(i).map(
      ([d, l]) =>
        `adapter ${d} ` +
        (l === !1
          ? "is not supported by the environment"
          : "is not available in the build"),
    );
    let c = n
      ? a.length > 1
        ? `since :
` +
          a.map(xo).join(`
`)
        : " " + xo(a[0])
      : "as no adapter specified";
    throw new Y(
      "There is no suitable adapter to dispatch the request " + c,
      "ERR_NOT_SUPPORT",
    );
  }
  return s;
}
const Oi = { getAdapter: uu, adapters: ts };
function xr(t) {
  if (
    (t.cancelToken && t.cancelToken.throwIfRequested(),
    t.signal && t.signal.aborted)
  )
    throw new nn(null, t);
}
function yo(t) {
  return (
    xr(t),
    (t.headers = _e.from(t.headers)),
    (t.data = mr.call(t, t.transformRequest)),
    ["post", "put", "patch"].indexOf(t.method) !== -1 &&
      t.headers.setContentType("application/x-www-form-urlencoded", !1),
    Oi.getAdapter(
      t.adapter || tn.adapter,
      t,
    )(t).then(
      function (r) {
        return (
          xr(t),
          (r.data = mr.call(t, t.transformResponse, r)),
          (r.headers = _e.from(r.headers)),
          r
        );
      },
      function (r) {
        return (
          Pi(r) ||
            (xr(t),
            r &&
              r.response &&
              ((r.response.data = mr.call(t, t.transformResponse, r.response)),
              (r.response.headers = _e.from(r.response.headers)))),
          Promise.reject(r)
        );
      },
    )
  );
}
const Ni = "1.13.5",
  Vn = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (t, e) => {
    Vn[t] = function (r) {
      return typeof r === t || "a" + (e < 1 ? "n " : " ") + t;
    };
  },
);
const bo = {};
Vn.transitional = function (e, n, r) {
  function s(i, a) {
    return (
      "[Axios v" +
      Ni +
      "] Transitional option '" +
      i +
      "'" +
      a +
      (r ? ". " + r : "")
    );
  }
  return (i, a, c) => {
    if (e === !1)
      throw new Y(
        s(a, " has been removed" + (n ? " in " + n : "")),
        Y.ERR_DEPRECATED,
      );
    return (
      n &&
        !bo[a] &&
        ((bo[a] = !0),
        console.warn(
          s(
            a,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future",
          ),
        )),
      e ? e(i, a, c) : !0
    );
  };
};
Vn.spelling = function (e) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${e}`), !0);
};
function hu(t, e, n) {
  if (typeof t != "object")
    throw new Y("options must be an object", Y.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(t);
  let s = r.length;
  for (; s-- > 0; ) {
    const i = r[s],
      a = e[i];
    if (a) {
      const c = t[i],
        d = c === void 0 || a(c, i, t);
      if (d !== !0)
        throw new Y("option " + i + " must be " + d, Y.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new Y("Unknown option " + i, Y.ERR_BAD_OPTION);
  }
}
const _n = { assertOptions: hu, validators: Vn },
  Me = _n.validators;
let it = class {
  constructor(e) {
    ((this.defaults = e || {}),
      (this.interceptors = { request: new io(), response: new io() }));
  }
  async request(e, n) {
    try {
      return await this._request(e, n);
    } catch (r) {
      if (r instanceof Error) {
        let s = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(s)
          : (s = new Error());
        const i = s.stack ? s.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack
            ? i &&
              !String(r.stack).endsWith(i.replace(/^.+\n.+\n/, "")) &&
              (r.stack +=
                `
` + i)
            : (r.stack = i);
        } catch {}
      }
      throw r;
    }
  }
  _request(e, n) {
    (typeof e == "string" ? ((n = n || {}), (n.url = e)) : (n = e || {}),
      (n = lt(this.defaults, n)));
    const { transitional: r, paramsSerializer: s, headers: i } = n;
    (r !== void 0 &&
      _n.assertOptions(
        r,
        {
          silentJSONParsing: Me.transitional(Me.boolean),
          forcedJSONParsing: Me.transitional(Me.boolean),
          clarifyTimeoutError: Me.transitional(Me.boolean),
          legacyInterceptorReqResOrdering: Me.transitional(Me.boolean),
        },
        !1,
      ),
      s != null &&
        (v.isFunction(s)
          ? (n.paramsSerializer = { serialize: s })
          : _n.assertOptions(
              s,
              { encode: Me.function, serialize: Me.function },
              !0,
            )),
      n.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (n.allowAbsoluteUrls = !0)),
      _n.assertOptions(
        n,
        {
          baseUrl: Me.spelling("baseURL"),
          withXsrfToken: Me.spelling("withXSRFToken"),
        },
        !0,
      ),
      (n.method = (n.method || this.defaults.method || "get").toLowerCase()));
    let a = i && v.merge(i.common, i[n.method]);
    (i &&
      v.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (p) => {
          delete i[p];
        },
      ),
      (n.headers = _e.concat(a, i)));
    const c = [];
    let d = !0;
    this.interceptors.request.forEach(function (x) {
      if (typeof x.runWhen == "function" && x.runWhen(n) === !1) return;
      d = d && x.synchronous;
      const g = n.transitional || Zr;
      g && g.legacyInterceptorReqResOrdering
        ? c.unshift(x.fulfilled, x.rejected)
        : c.push(x.fulfilled, x.rejected);
    });
    const l = [];
    this.interceptors.response.forEach(function (x) {
      l.push(x.fulfilled, x.rejected);
    });
    let u,
      m = 0,
      b;
    if (!d) {
      const p = [yo.bind(this), void 0];
      for (
        p.unshift(...c), p.push(...l), b = p.length, u = Promise.resolve(n);
        m < b;
      )
        u = u.then(p[m++], p[m++]);
      return u;
    }
    b = c.length;
    let w = n;
    for (; m < b; ) {
      const p = c[m++],
        x = c[m++];
      try {
        w = p(w);
      } catch (g) {
        x.call(this, g);
        break;
      }
    }
    try {
      u = yo.call(this, w);
    } catch (p) {
      return Promise.reject(p);
    }
    for (m = 0, b = l.length; m < b; ) u = u.then(l[m++], l[m++]);
    return u;
  }
  getUri(e) {
    e = lt(this.defaults, e);
    const n = Mi(e.baseURL, e.url, e.allowAbsoluteUrls);
    return Ai(n, e.params, e.paramsSerializer);
  }
};
v.forEach(["delete", "get", "head", "options"], function (e) {
  it.prototype[e] = function (n, r) {
    return this.request(
      lt(r || {}, { method: e, url: n, data: (r || {}).data }),
    );
  };
});
v.forEach(["post", "put", "patch"], function (e) {
  function n(r) {
    return function (i, a, c) {
      return this.request(
        lt(c || {}, {
          method: e,
          headers: r ? { "Content-Type": "multipart/form-data" } : {},
          url: i,
          data: a,
        }),
      );
    };
  }
  ((it.prototype[e] = n()), (it.prototype[e + "Form"] = n(!0)));
});
let fu = class Fi {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function (i) {
      n = i;
    });
    const r = this;
    (this.promise.then((s) => {
      if (!r._listeners) return;
      let i = r._listeners.length;
      for (; i-- > 0; ) r._listeners[i](s);
      r._listeners = null;
    }),
      (this.promise.then = (s) => {
        let i;
        const a = new Promise((c) => {
          (r.subscribe(c), (i = c));
        }).then(s);
        return (
          (a.cancel = function () {
            r.unsubscribe(i);
          }),
          a
        );
      }),
      e(function (i, a, c) {
        r.reason || ((r.reason = new nn(i, a, c)), n(r.reason));
      }));
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : (this._listeners = [e]);
  }
  unsubscribe(e) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(e);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const e = new AbortController(),
      n = (r) => {
        e.abort(r);
      };
    return (
      this.subscribe(n),
      (e.signal.unsubscribe = () => this.unsubscribe(n)),
      e.signal
    );
  }
  static source() {
    let e;
    return {
      token: new Fi(function (s) {
        e = s;
      }),
      cancel: e,
    };
  }
};
function pu(t) {
  return function (n) {
    return t.apply(null, n);
  };
}
function gu(t) {
  return v.isObject(t) && t.isAxiosError === !0;
}
const Dr = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526,
};
Object.entries(Dr).forEach(([t, e]) => {
  Dr[e] = t;
});
function zi(t) {
  const e = new it(t),
    n = yi(it.prototype.request, e);
  return (
    v.extend(n, it.prototype, e, { allOwnKeys: !0 }),
    v.extend(n, e, null, { allOwnKeys: !0 }),
    (n.create = function (s) {
      return zi(lt(t, s));
    }),
    n
  );
}
const me = zi(tn);
me.Axios = it;
me.CanceledError = nn;
me.CancelToken = fu;
me.isCancel = Pi;
me.VERSION = Ni;
me.toFormData = qn;
me.AxiosError = Y;
me.Cancel = me.CanceledError;
me.all = function (e) {
  return Promise.all(e);
};
me.spread = pu;
me.isAxiosError = gu;
me.mergeConfig = lt;
me.AxiosHeaders = _e;
me.formToJSON = (t) => Ti(v.isHTMLForm(t) ? new FormData(t) : t);
me.getAdapter = Oi.getAdapter;
me.HttpStatusCode = Dr;
me.default = me;
const {
    Axios: wg,
    AxiosError: vg,
    CanceledError: Sg,
    isCancel: Cg,
    CancelToken: kg,
    VERSION: Eg,
    all: jg,
    Cancel: Rg,
    isAxiosError: _g,
    spread: Ag,
    toFormData: Tg,
    AxiosHeaders: Pg,
    HttpStatusCode: Ig,
    formToJSON: Mg,
    getAdapter: Dg,
    mergeConfig: Lg,
  } = me,
  We = Object.create(null);
We.open = "0";
We.close = "1";
We.ping = "2";
We.pong = "3";
We.message = "4";
We.upgrade = "5";
We.noop = "6";
const An = Object.create(null);
Object.keys(We).forEach((t) => {
  An[We[t]] = t;
});
const Lr = { type: "error", data: "parser error" },
  Bi =
    typeof Blob == "function" ||
    (typeof Blob < "u" &&
      Object.prototype.toString.call(Blob) === "[object BlobConstructor]"),
  Ui = typeof ArrayBuffer == "function",
  $i = (t) =>
    typeof ArrayBuffer.isView == "function"
      ? ArrayBuffer.isView(t)
      : t && t.buffer instanceof ArrayBuffer,
  ns = ({ type: t, data: e }, n, r) =>
    Bi && e instanceof Blob
      ? n
        ? r(e)
        : wo(e, r)
      : Ui && (e instanceof ArrayBuffer || $i(e))
        ? n
          ? r(e)
          : wo(new Blob([e]), r)
        : r(We[t] + (e || "")),
  wo = (t, e) => {
    const n = new FileReader();
    return (
      (n.onload = function () {
        const r = n.result.split(",")[1];
        e("b" + (r || ""));
      }),
      n.readAsDataURL(t)
    );
  };
function vo(t) {
  return t instanceof Uint8Array
    ? t
    : t instanceof ArrayBuffer
      ? new Uint8Array(t)
      : new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
}
let yr;
function mu(t, e) {
  if (Bi && t.data instanceof Blob)
    return t.data.arrayBuffer().then(vo).then(e);
  if (Ui && (t.data instanceof ArrayBuffer || $i(t.data))) return e(vo(t.data));
  ns(t, !1, (n) => {
    (yr || (yr = new TextEncoder()), e(yr.encode(n)));
  });
}
const So = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  Ht = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let t = 0; t < So.length; t++) Ht[So.charCodeAt(t)] = t;
const xu = (t) => {
    let e = t.length * 0.75,
      n = t.length,
      r,
      s = 0,
      i,
      a,
      c,
      d;
    t[t.length - 1] === "=" && (e--, t[t.length - 2] === "=" && e--);
    const l = new ArrayBuffer(e),
      u = new Uint8Array(l);
    for (r = 0; r < n; r += 4)
      ((i = Ht[t.charCodeAt(r)]),
        (a = Ht[t.charCodeAt(r + 1)]),
        (c = Ht[t.charCodeAt(r + 2)]),
        (d = Ht[t.charCodeAt(r + 3)]),
        (u[s++] = (i << 2) | (a >> 4)),
        (u[s++] = ((a & 15) << 4) | (c >> 2)),
        (u[s++] = ((c & 3) << 6) | (d & 63)));
    return l;
  },
  yu = typeof ArrayBuffer == "function",
  rs = (t, e) => {
    if (typeof t != "string") return { type: "message", data: Wi(t, e) };
    const n = t.charAt(0);
    return n === "b"
      ? { type: "message", data: bu(t.substring(1), e) }
      : An[n]
        ? t.length > 1
          ? { type: An[n], data: t.substring(1) }
          : { type: An[n] }
        : Lr;
  },
  bu = (t, e) => {
    if (yu) {
      const n = xu(t);
      return Wi(n, e);
    } else return { base64: !0, data: t };
  },
  Wi = (t, e) => {
    switch (e) {
      case "blob":
        return t instanceof Blob ? t : new Blob([t]);
      case "arraybuffer":
      default:
        return t instanceof ArrayBuffer ? t : t.buffer;
    }
  },
  Hi = "",
  wu = (t, e) => {
    const n = t.length,
      r = new Array(n);
    let s = 0;
    t.forEach((i, a) => {
      ns(i, !1, (c) => {
        ((r[a] = c), ++s === n && e(r.join(Hi)));
      });
    });
  },
  vu = (t, e) => {
    const n = t.split(Hi),
      r = [];
    for (let s = 0; s < n.length; s++) {
      const i = rs(n[s], e);
      if ((r.push(i), i.type === "error")) break;
    }
    return r;
  };
function Su() {
  return new TransformStream({
    transform(t, e) {
      mu(t, (n) => {
        const r = n.length;
        let s;
        if (r < 126)
          ((s = new Uint8Array(1)), new DataView(s.buffer).setUint8(0, r));
        else if (r < 65536) {
          s = new Uint8Array(3);
          const i = new DataView(s.buffer);
          (i.setUint8(0, 126), i.setUint16(1, r));
        } else {
          s = new Uint8Array(9);
          const i = new DataView(s.buffer);
          (i.setUint8(0, 127), i.setBigUint64(1, BigInt(r)));
        }
        (t.data && typeof t.data != "string" && (s[0] |= 128),
          e.enqueue(s),
          e.enqueue(n));
      });
    },
  });
}
let br;
function yn(t) {
  return t.reduce((e, n) => e + n.length, 0);
}
function bn(t, e) {
  if (t[0].length === e) return t.shift();
  const n = new Uint8Array(e);
  let r = 0;
  for (let s = 0; s < e; s++)
    ((n[s] = t[0][r++]), r === t[0].length && (t.shift(), (r = 0)));
  return (t.length && r < t[0].length && (t[0] = t[0].slice(r)), n);
}
function Cu(t, e) {
  br || (br = new TextDecoder());
  const n = [];
  let r = 0,
    s = -1,
    i = !1;
  return new TransformStream({
    transform(a, c) {
      for (n.push(a); ; ) {
        if (r === 0) {
          if (yn(n) < 1) break;
          const d = bn(n, 1);
          ((i = (d[0] & 128) === 128),
            (s = d[0] & 127),
            s < 126 ? (r = 3) : s === 126 ? (r = 1) : (r = 2));
        } else if (r === 1) {
          if (yn(n) < 2) break;
          const d = bn(n, 2);
          ((s = new DataView(d.buffer, d.byteOffset, d.length).getUint16(0)),
            (r = 3));
        } else if (r === 2) {
          if (yn(n) < 8) break;
          const d = bn(n, 8),
            l = new DataView(d.buffer, d.byteOffset, d.length),
            u = l.getUint32(0);
          if (u > Math.pow(2, 21) - 1) {
            c.enqueue(Lr);
            break;
          }
          ((s = u * Math.pow(2, 32) + l.getUint32(4)), (r = 3));
        } else {
          if (yn(n) < s) break;
          const d = bn(n, s);
          (c.enqueue(rs(i ? d : br.decode(d), e)), (r = 0));
        }
        if (s === 0 || s > t) {
          c.enqueue(Lr);
          break;
        }
      }
    },
  });
}
const qi = 4;
function ye(t) {
  if (t) return ku(t);
}
function ku(t) {
  for (var e in ye.prototype) t[e] = ye.prototype[e];
  return t;
}
ye.prototype.on = ye.prototype.addEventListener = function (t, e) {
  return (
    (this._callbacks = this._callbacks || {}),
    (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e),
    this
  );
};
ye.prototype.once = function (t, e) {
  function n() {
    (this.off(t, n), e.apply(this, arguments));
  }
  return ((n.fn = e), this.on(t, n), this);
};
ye.prototype.off =
  ye.prototype.removeListener =
  ye.prototype.removeAllListeners =
  ye.prototype.removeEventListener =
    function (t, e) {
      if (((this._callbacks = this._callbacks || {}), arguments.length == 0))
        return ((this._callbacks = {}), this);
      var n = this._callbacks["$" + t];
      if (!n) return this;
      if (arguments.length == 1) return (delete this._callbacks["$" + t], this);
      for (var r, s = 0; s < n.length; s++)
        if (((r = n[s]), r === e || r.fn === e)) {
          n.splice(s, 1);
          break;
        }
      return (n.length === 0 && delete this._callbacks["$" + t], this);
    };
ye.prototype.emit = function (t) {
  this._callbacks = this._callbacks || {};
  for (
    var e = new Array(arguments.length - 1),
      n = this._callbacks["$" + t],
      r = 1;
    r < arguments.length;
    r++
  )
    e[r - 1] = arguments[r];
  if (n) {
    n = n.slice(0);
    for (var r = 0, s = n.length; r < s; ++r) n[r].apply(this, e);
  }
  return this;
};
ye.prototype.emitReserved = ye.prototype.emit;
ye.prototype.listeners = function (t) {
  return (
    (this._callbacks = this._callbacks || {}),
    this._callbacks["$" + t] || []
  );
};
ye.prototype.hasListeners = function (t) {
  return !!this.listeners(t).length;
};
const Kn =
    typeof Promise == "function" && typeof Promise.resolve == "function"
      ? (e) => Promise.resolve().then(e)
      : (e, n) => n(e, 0),
  De =
    typeof self < "u"
      ? self
      : typeof window < "u"
        ? window
        : Function("return this")(),
  Eu = "arraybuffer";
function Vi(t, ...e) {
  return e.reduce((n, r) => (t.hasOwnProperty(r) && (n[r] = t[r]), n), {});
}
const ju = De.setTimeout,
  Ru = De.clearTimeout;
function Yn(t, e) {
  e.useNativeTimers
    ? ((t.setTimeoutFn = ju.bind(De)), (t.clearTimeoutFn = Ru.bind(De)))
    : ((t.setTimeoutFn = De.setTimeout.bind(De)),
      (t.clearTimeoutFn = De.clearTimeout.bind(De)));
}
const _u = 1.33;
function Au(t) {
  return typeof t == "string"
    ? Tu(t)
    : Math.ceil((t.byteLength || t.size) * _u);
}
function Tu(t) {
  let e = 0,
    n = 0;
  for (let r = 0, s = t.length; r < s; r++)
    ((e = t.charCodeAt(r)),
      e < 128
        ? (n += 1)
        : e < 2048
          ? (n += 2)
          : e < 55296 || e >= 57344
            ? (n += 3)
            : (r++, (n += 4)));
  return n;
}
function Ki() {
  return (
    Date.now().toString(36).substring(3) +
    Math.random().toString(36).substring(2, 5)
  );
}
function Pu(t) {
  let e = "";
  for (let n in t)
    t.hasOwnProperty(n) &&
      (e.length && (e += "&"),
      (e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n])));
  return e;
}
function Iu(t) {
  let e = {},
    n = t.split("&");
  for (let r = 0, s = n.length; r < s; r++) {
    let i = n[r].split("=");
    e[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
  }
  return e;
}
class Mu extends Error {
  constructor(e, n, r) {
    (super(e),
      (this.description = n),
      (this.context = r),
      (this.type = "TransportError"));
  }
}
class ss extends ye {
  constructor(e) {
    (super(),
      (this.writable = !1),
      Yn(this, e),
      (this.opts = e),
      (this.query = e.query),
      (this.socket = e.socket),
      (this.supportsBinary = !e.forceBase64));
  }
  onError(e, n, r) {
    return (super.emitReserved("error", new Mu(e, n, r)), this);
  }
  open() {
    return ((this.readyState = "opening"), this.doOpen(), this);
  }
  close() {
    return (
      (this.readyState === "opening" || this.readyState === "open") &&
        (this.doClose(), this.onClose()),
      this
    );
  }
  send(e) {
    this.readyState === "open" && this.write(e);
  }
  onOpen() {
    ((this.readyState = "open"),
      (this.writable = !0),
      super.emitReserved("open"));
  }
  onData(e) {
    const n = rs(e, this.socket.binaryType);
    this.onPacket(n);
  }
  onPacket(e) {
    super.emitReserved("packet", e);
  }
  onClose(e) {
    ((this.readyState = "closed"), super.emitReserved("close", e));
  }
  pause(e) {}
  createUri(e, n = {}) {
    return (
      e +
      "://" +
      this._hostname() +
      this._port() +
      this.opts.path +
      this._query(n)
    );
  }
  _hostname() {
    const e = this.opts.hostname;
    return e.indexOf(":") === -1 ? e : "[" + e + "]";
  }
  _port() {
    return this.opts.port &&
      ((this.opts.secure && Number(this.opts.port) !== 443) ||
        (!this.opts.secure && Number(this.opts.port) !== 80))
      ? ":" + this.opts.port
      : "";
  }
  _query(e) {
    const n = Pu(e);
    return n.length ? "?" + n : "";
  }
}
class Du extends ss {
  constructor() {
    (super(...arguments), (this._polling = !1));
  }
  get name() {
    return "polling";
  }
  doOpen() {
    this._poll();
  }
  pause(e) {
    this.readyState = "pausing";
    const n = () => {
      ((this.readyState = "paused"), e());
    };
    if (this._polling || !this.writable) {
      let r = 0;
      (this._polling &&
        (r++,
        this.once("pollComplete", function () {
          --r || n();
        })),
        this.writable ||
          (r++,
          this.once("drain", function () {
            --r || n();
          })));
    } else n();
  }
  _poll() {
    ((this._polling = !0), this.doPoll(), this.emitReserved("poll"));
  }
  onData(e) {
    const n = (r) => {
      if (
        (this.readyState === "opening" && r.type === "open" && this.onOpen(),
        r.type === "close")
      )
        return (
          this.onClose({ description: "transport closed by the server" }),
          !1
        );
      this.onPacket(r);
    };
    (vu(e, this.socket.binaryType).forEach(n),
      this.readyState !== "closed" &&
        ((this._polling = !1),
        this.emitReserved("pollComplete"),
        this.readyState === "open" && this._poll()));
  }
  doClose() {
    const e = () => {
      this.write([{ type: "close" }]);
    };
    this.readyState === "open" ? e() : this.once("open", e);
  }
  write(e) {
    ((this.writable = !1),
      wu(e, (n) => {
        this.doWrite(n, () => {
          ((this.writable = !0), this.emitReserved("drain"));
        });
      }));
  }
  uri() {
    const e = this.opts.secure ? "https" : "http",
      n = this.query || {};
    return (
      this.opts.timestampRequests !== !1 &&
        (n[this.opts.timestampParam] = Ki()),
      !this.supportsBinary && !n.sid && (n.b64 = 1),
      this.createUri(e, n)
    );
  }
}
let Yi = !1;
try {
  Yi = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {}
const Lu = Yi;
function Ou() {}
class Nu extends Du {
  constructor(e) {
    if ((super(e), typeof location < "u")) {
      const n = location.protocol === "https:";
      let r = location.port;
      (r || (r = n ? "443" : "80"),
        (this.xd =
          (typeof location < "u" && e.hostname !== location.hostname) ||
          r !== e.port));
    }
  }
  doWrite(e, n) {
    const r = this.request({ method: "POST", data: e });
    (r.on("success", n),
      r.on("error", (s, i) => {
        this.onError("xhr post error", s, i);
      }));
  }
  doPoll() {
    const e = this.request();
    (e.on("data", this.onData.bind(this)),
      e.on("error", (n, r) => {
        this.onError("xhr poll error", n, r);
      }),
      (this.pollXhr = e));
  }
}
class $e extends ye {
  constructor(e, n, r) {
    (super(),
      (this.createRequest = e),
      Yn(this, r),
      (this._opts = r),
      (this._method = r.method || "GET"),
      (this._uri = n),
      (this._data = r.data !== void 0 ? r.data : null),
      this._create());
  }
  _create() {
    var e;
    const n = Vi(
      this._opts,
      "agent",
      "pfx",
      "key",
      "passphrase",
      "cert",
      "ca",
      "ciphers",
      "rejectUnauthorized",
      "autoUnref",
    );
    n.xdomain = !!this._opts.xd;
    const r = (this._xhr = this.createRequest(n));
    try {
      r.open(this._method, this._uri, !0);
      try {
        if (this._opts.extraHeaders) {
          r.setDisableHeaderCheck && r.setDisableHeaderCheck(!0);
          for (let s in this._opts.extraHeaders)
            this._opts.extraHeaders.hasOwnProperty(s) &&
              r.setRequestHeader(s, this._opts.extraHeaders[s]);
        }
      } catch {}
      if (this._method === "POST")
        try {
          r.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch {}
      try {
        r.setRequestHeader("Accept", "*/*");
      } catch {}
      ((e = this._opts.cookieJar) === null || e === void 0 || e.addCookies(r),
        "withCredentials" in r &&
          (r.withCredentials = this._opts.withCredentials),
        this._opts.requestTimeout && (r.timeout = this._opts.requestTimeout),
        (r.onreadystatechange = () => {
          var s;
          (r.readyState === 3 &&
            ((s = this._opts.cookieJar) === null ||
              s === void 0 ||
              s.parseCookies(r.getResponseHeader("set-cookie"))),
            r.readyState === 4 &&
              (r.status === 200 || r.status === 1223
                ? this._onLoad()
                : this.setTimeoutFn(() => {
                    this._onError(typeof r.status == "number" ? r.status : 0);
                  }, 0)));
        }),
        r.send(this._data));
    } catch (s) {
      this.setTimeoutFn(() => {
        this._onError(s);
      }, 0);
      return;
    }
    typeof document < "u" &&
      ((this._index = $e.requestsCount++), ($e.requests[this._index] = this));
  }
  _onError(e) {
    (this.emitReserved("error", e, this._xhr), this._cleanup(!0));
  }
  _cleanup(e) {
    if (!(typeof this._xhr > "u" || this._xhr === null)) {
      if (((this._xhr.onreadystatechange = Ou), e))
        try {
          this._xhr.abort();
        } catch {}
      (typeof document < "u" && delete $e.requests[this._index],
        (this._xhr = null));
    }
  }
  _onLoad() {
    const e = this._xhr.responseText;
    e !== null &&
      (this.emitReserved("data", e),
      this.emitReserved("success"),
      this._cleanup());
  }
  abort() {
    this._cleanup();
  }
}
$e.requestsCount = 0;
$e.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function") attachEvent("onunload", Co);
  else if (typeof addEventListener == "function") {
    const t = "onpagehide" in De ? "pagehide" : "unload";
    addEventListener(t, Co, !1);
  }
}
function Co() {
  for (let t in $e.requests)
    $e.requests.hasOwnProperty(t) && $e.requests[t].abort();
}
const Fu = (function () {
  const t = Ji({ xdomain: !1 });
  return t && t.responseType !== null;
})();
class zu extends Nu {
  constructor(e) {
    super(e);
    const n = e && e.forceBase64;
    this.supportsBinary = Fu && !n;
  }
  request(e = {}) {
    return (
      Object.assign(e, { xd: this.xd }, this.opts),
      new $e(Ji, this.uri(), e)
    );
  }
}
function Ji(t) {
  const e = t.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!e || Lu)) return new XMLHttpRequest();
  } catch {}
  if (!e)
    try {
      return new De[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {}
}
const Xi =
  typeof navigator < "u" &&
  typeof navigator.product == "string" &&
  navigator.product.toLowerCase() === "reactnative";
class Bu extends ss {
  get name() {
    return "websocket";
  }
  doOpen() {
    const e = this.uri(),
      n = this.opts.protocols,
      r = Xi
        ? {}
        : Vi(
            this.opts,
            "agent",
            "perMessageDeflate",
            "pfx",
            "key",
            "passphrase",
            "cert",
            "ca",
            "ciphers",
            "rejectUnauthorized",
            "localAddress",
            "protocolVersion",
            "origin",
            "maxPayload",
            "family",
            "checkServerIdentity",
          );
    this.opts.extraHeaders && (r.headers = this.opts.extraHeaders);
    try {
      this.ws = this.createSocket(e, n, r);
    } catch (s) {
      return this.emitReserved("error", s);
    }
    ((this.ws.binaryType = this.socket.binaryType), this.addEventListeners());
  }
  addEventListeners() {
    ((this.ws.onopen = () => {
      (this.opts.autoUnref && this.ws._socket.unref(), this.onOpen());
    }),
      (this.ws.onclose = (e) =>
        this.onClose({
          description: "websocket connection closed",
          context: e,
        })),
      (this.ws.onmessage = (e) => this.onData(e.data)),
      (this.ws.onerror = (e) => this.onError("websocket error", e)));
  }
  write(e) {
    this.writable = !1;
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = n === e.length - 1;
      ns(r, this.supportsBinary, (i) => {
        try {
          this.doWrite(r, i);
        } catch {}
        s &&
          Kn(() => {
            ((this.writable = !0), this.emitReserved("drain"));
          }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    typeof this.ws < "u" &&
      ((this.ws.onerror = () => {}), this.ws.close(), (this.ws = null));
  }
  uri() {
    const e = this.opts.secure ? "wss" : "ws",
      n = this.query || {};
    return (
      this.opts.timestampRequests && (n[this.opts.timestampParam] = Ki()),
      this.supportsBinary || (n.b64 = 1),
      this.createUri(e, n)
    );
  }
}
const wr = De.WebSocket || De.MozWebSocket;
class Uu extends Bu {
  createSocket(e, n, r) {
    return Xi ? new wr(e, n, r) : n ? new wr(e, n) : new wr(e);
  }
  doWrite(e, n) {
    this.ws.send(n);
  }
}
class $u extends ss {
  get name() {
    return "webtransport";
  }
  doOpen() {
    try {
      this._transport = new WebTransport(
        this.createUri("https"),
        this.opts.transportOptions[this.name],
      );
    } catch (e) {
      return this.emitReserved("error", e);
    }
    (this._transport.closed
      .then(() => {
        this.onClose();
      })
      .catch((e) => {
        this.onError("webtransport error", e);
      }),
      this._transport.ready.then(() => {
        this._transport.createBidirectionalStream().then((e) => {
          const n = Cu(Number.MAX_SAFE_INTEGER, this.socket.binaryType),
            r = e.readable.pipeThrough(n).getReader(),
            s = Su();
          (s.readable.pipeTo(e.writable),
            (this._writer = s.writable.getWriter()));
          const i = () => {
            r.read()
              .then(({ done: c, value: d }) => {
                c || (this.onPacket(d), i());
              })
              .catch((c) => {});
          };
          i();
          const a = { type: "open" };
          (this.query.sid && (a.data = `{"sid":"${this.query.sid}"}`),
            this._writer.write(a).then(() => this.onOpen()));
        });
      }));
  }
  write(e) {
    this.writable = !1;
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = n === e.length - 1;
      this._writer.write(r).then(() => {
        s &&
          Kn(() => {
            ((this.writable = !0), this.emitReserved("drain"));
          }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    var e;
    (e = this._transport) === null || e === void 0 || e.close();
  }
}
const Wu = { websocket: Uu, webtransport: $u, polling: zu },
  Hu =
    /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
  qu = [
    "source",
    "protocol",
    "authority",
    "userInfo",
    "user",
    "password",
    "host",
    "port",
    "relative",
    "path",
    "directory",
    "file",
    "query",
    "anchor",
  ];
function Or(t) {
  if (t.length > 8e3) throw "URI too long";
  const e = t,
    n = t.indexOf("["),
    r = t.indexOf("]");
  n != -1 &&
    r != -1 &&
    (t =
      t.substring(0, n) +
      t.substring(n, r).replace(/:/g, ";") +
      t.substring(r, t.length));
  let s = Hu.exec(t || ""),
    i = {},
    a = 14;
  for (; a--; ) i[qu[a]] = s[a] || "";
  return (
    n != -1 &&
      r != -1 &&
      ((i.source = e),
      (i.host = i.host.substring(1, i.host.length - 1).replace(/;/g, ":")),
      (i.authority = i.authority
        .replace("[", "")
        .replace("]", "")
        .replace(/;/g, ":")),
      (i.ipv6uri = !0)),
    (i.pathNames = Vu(i, i.path)),
    (i.queryKey = Ku(i, i.query)),
    i
  );
}
function Vu(t, e) {
  const n = /\/{2,9}/g,
    r = e.replace(n, "/").split("/");
  return (
    (e.slice(0, 1) == "/" || e.length === 0) && r.splice(0, 1),
    e.slice(-1) == "/" && r.splice(r.length - 1, 1),
    r
  );
}
function Ku(t, e) {
  const n = {};
  return (
    e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (r, s, i) {
      s && (n[s] = i);
    }),
    n
  );
}
const Nr =
    typeof addEventListener == "function" &&
    typeof removeEventListener == "function",
  Tn = [];
Nr &&
  addEventListener(
    "offline",
    () => {
      Tn.forEach((t) => t());
    },
    !1,
  );
class Ze extends ye {
  constructor(e, n) {
    if (
      (super(),
      (this.binaryType = Eu),
      (this.writeBuffer = []),
      (this._prevBufferLen = 0),
      (this._pingInterval = -1),
      (this._pingTimeout = -1),
      (this._maxPayload = -1),
      (this._pingTimeoutTime = 1 / 0),
      e && typeof e == "object" && ((n = e), (e = null)),
      e)
    ) {
      const r = Or(e);
      ((n.hostname = r.host),
        (n.secure = r.protocol === "https" || r.protocol === "wss"),
        (n.port = r.port),
        r.query && (n.query = r.query));
    } else n.host && (n.hostname = Or(n.host).host);
    (Yn(this, n),
      (this.secure =
        n.secure != null
          ? n.secure
          : typeof location < "u" && location.protocol === "https:"),
      n.hostname && !n.port && (n.port = this.secure ? "443" : "80"),
      (this.hostname =
        n.hostname ||
        (typeof location < "u" ? location.hostname : "localhost")),
      (this.port =
        n.port ||
        (typeof location < "u" && location.port
          ? location.port
          : this.secure
            ? "443"
            : "80")),
      (this.transports = []),
      (this._transportsByName = {}),
      n.transports.forEach((r) => {
        const s = r.prototype.name;
        (this.transports.push(s), (this._transportsByName[s] = r));
      }),
      (this.opts = Object.assign(
        {
          path: "/engine.io",
          agent: !1,
          withCredentials: !1,
          upgrade: !0,
          timestampParam: "t",
          rememberUpgrade: !1,
          addTrailingSlash: !0,
          rejectUnauthorized: !0,
          perMessageDeflate: { threshold: 1024 },
          transportOptions: {},
          closeOnBeforeunload: !1,
        },
        n,
      )),
      (this.opts.path =
        this.opts.path.replace(/\/$/, "") +
        (this.opts.addTrailingSlash ? "/" : "")),
      typeof this.opts.query == "string" &&
        (this.opts.query = Iu(this.opts.query)),
      Nr &&
        (this.opts.closeOnBeforeunload &&
          ((this._beforeunloadEventListener = () => {
            this.transport &&
              (this.transport.removeAllListeners(), this.transport.close());
          }),
          addEventListener(
            "beforeunload",
            this._beforeunloadEventListener,
            !1,
          )),
        this.hostname !== "localhost" &&
          ((this._offlineEventListener = () => {
            this._onClose("transport close", {
              description: "network connection lost",
            });
          }),
          Tn.push(this._offlineEventListener))),
      this.opts.withCredentials && (this._cookieJar = void 0),
      this._open());
  }
  createTransport(e) {
    const n = Object.assign({}, this.opts.query);
    ((n.EIO = qi), (n.transport = e), this.id && (n.sid = this.id));
    const r = Object.assign(
      {},
      this.opts,
      {
        query: n,
        socket: this,
        hostname: this.hostname,
        secure: this.secure,
        port: this.port,
      },
      this.opts.transportOptions[e],
    );
    return new this._transportsByName[e](r);
  }
  _open() {
    if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    }
    const e =
      this.opts.rememberUpgrade &&
      Ze.priorWebsocketSuccess &&
      this.transports.indexOf("websocket") !== -1
        ? "websocket"
        : this.transports[0];
    this.readyState = "opening";
    const n = this.createTransport(e);
    (n.open(), this.setTransport(n));
  }
  setTransport(e) {
    (this.transport && this.transport.removeAllListeners(),
      (this.transport = e),
      e
        .on("drain", this._onDrain.bind(this))
        .on("packet", this._onPacket.bind(this))
        .on("error", this._onError.bind(this))
        .on("close", (n) => this._onClose("transport close", n)));
  }
  onOpen() {
    ((this.readyState = "open"),
      (Ze.priorWebsocketSuccess = this.transport.name === "websocket"),
      this.emitReserved("open"),
      this.flush());
  }
  _onPacket(e) {
    if (
      this.readyState === "opening" ||
      this.readyState === "open" ||
      this.readyState === "closing"
    )
      switch (
        (this.emitReserved("packet", e), this.emitReserved("heartbeat"), e.type)
      ) {
        case "open":
          this.onHandshake(JSON.parse(e.data));
          break;
        case "ping":
          (this._sendPacket("pong"),
            this.emitReserved("ping"),
            this.emitReserved("pong"),
            this._resetPingTimeout());
          break;
        case "error":
          const n = new Error("server error");
          ((n.code = e.data), this._onError(n));
          break;
        case "message":
          (this.emitReserved("data", e.data),
            this.emitReserved("message", e.data));
          break;
      }
  }
  onHandshake(e) {
    (this.emitReserved("handshake", e),
      (this.id = e.sid),
      (this.transport.query.sid = e.sid),
      (this._pingInterval = e.pingInterval),
      (this._pingTimeout = e.pingTimeout),
      (this._maxPayload = e.maxPayload),
      this.onOpen(),
      this.readyState !== "closed" && this._resetPingTimeout());
  }
  _resetPingTimeout() {
    this.clearTimeoutFn(this._pingTimeoutTimer);
    const e = this._pingInterval + this._pingTimeout;
    ((this._pingTimeoutTime = Date.now() + e),
      (this._pingTimeoutTimer = this.setTimeoutFn(() => {
        this._onClose("ping timeout");
      }, e)),
      this.opts.autoUnref && this._pingTimeoutTimer.unref());
  }
  _onDrain() {
    (this.writeBuffer.splice(0, this._prevBufferLen),
      (this._prevBufferLen = 0),
      this.writeBuffer.length === 0
        ? this.emitReserved("drain")
        : this.flush());
  }
  flush() {
    if (
      this.readyState !== "closed" &&
      this.transport.writable &&
      !this.upgrading &&
      this.writeBuffer.length
    ) {
      const e = this._getWritablePackets();
      (this.transport.send(e),
        (this._prevBufferLen = e.length),
        this.emitReserved("flush"));
    }
  }
  _getWritablePackets() {
    if (
      !(
        this._maxPayload &&
        this.transport.name === "polling" &&
        this.writeBuffer.length > 1
      )
    )
      return this.writeBuffer;
    let n = 1;
    for (let r = 0; r < this.writeBuffer.length; r++) {
      const s = this.writeBuffer[r].data;
      if ((s && (n += Au(s)), r > 0 && n > this._maxPayload))
        return this.writeBuffer.slice(0, r);
      n += 2;
    }
    return this.writeBuffer;
  }
  _hasPingExpired() {
    if (!this._pingTimeoutTime) return !0;
    const e = Date.now() > this._pingTimeoutTime;
    return (
      e &&
        ((this._pingTimeoutTime = 0),
        Kn(() => {
          this._onClose("ping timeout");
        }, this.setTimeoutFn)),
      e
    );
  }
  write(e, n, r) {
    return (this._sendPacket("message", e, n, r), this);
  }
  send(e, n, r) {
    return (this._sendPacket("message", e, n, r), this);
  }
  _sendPacket(e, n, r, s) {
    if (
      (typeof n == "function" && ((s = n), (n = void 0)),
      typeof r == "function" && ((s = r), (r = null)),
      this.readyState === "closing" || this.readyState === "closed")
    )
      return;
    ((r = r || {}), (r.compress = r.compress !== !1));
    const i = { type: e, data: n, options: r };
    (this.emitReserved("packetCreate", i),
      this.writeBuffer.push(i),
      s && this.once("flush", s),
      this.flush());
  }
  close() {
    const e = () => {
        (this._onClose("forced close"), this.transport.close());
      },
      n = () => {
        (this.off("upgrade", n), this.off("upgradeError", n), e());
      },
      r = () => {
        (this.once("upgrade", n), this.once("upgradeError", n));
      };
    return (
      (this.readyState === "opening" || this.readyState === "open") &&
        ((this.readyState = "closing"),
        this.writeBuffer.length
          ? this.once("drain", () => {
              this.upgrading ? r() : e();
            })
          : this.upgrading
            ? r()
            : e()),
      this
    );
  }
  _onError(e) {
    if (
      ((Ze.priorWebsocketSuccess = !1),
      this.opts.tryAllTransports &&
        this.transports.length > 1 &&
        this.readyState === "opening")
    )
      return (this.transports.shift(), this._open());
    (this.emitReserved("error", e), this._onClose("transport error", e));
  }
  _onClose(e, n) {
    if (
      this.readyState === "opening" ||
      this.readyState === "open" ||
      this.readyState === "closing"
    ) {
      if (
        (this.clearTimeoutFn(this._pingTimeoutTimer),
        this.transport.removeAllListeners("close"),
        this.transport.close(),
        this.transport.removeAllListeners(),
        Nr &&
          (this._beforeunloadEventListener &&
            removeEventListener(
              "beforeunload",
              this._beforeunloadEventListener,
              !1,
            ),
          this._offlineEventListener))
      ) {
        const r = Tn.indexOf(this._offlineEventListener);
        r !== -1 && Tn.splice(r, 1);
      }
      ((this.readyState = "closed"),
        (this.id = null),
        this.emitReserved("close", e, n),
        (this.writeBuffer = []),
        (this._prevBufferLen = 0));
    }
  }
}
Ze.protocol = qi;
class Yu extends Ze {
  constructor() {
    (super(...arguments), (this._upgrades = []));
  }
  onOpen() {
    if ((super.onOpen(), this.readyState === "open" && this.opts.upgrade))
      for (let e = 0; e < this._upgrades.length; e++)
        this._probe(this._upgrades[e]);
  }
  _probe(e) {
    let n = this.createTransport(e),
      r = !1;
    Ze.priorWebsocketSuccess = !1;
    const s = () => {
      r ||
        (n.send([{ type: "ping", data: "probe" }]),
        n.once("packet", (m) => {
          if (!r)
            if (m.type === "pong" && m.data === "probe") {
              if (
                ((this.upgrading = !0), this.emitReserved("upgrading", n), !n)
              )
                return;
              ((Ze.priorWebsocketSuccess = n.name === "websocket"),
                this.transport.pause(() => {
                  r ||
                    (this.readyState !== "closed" &&
                      (u(),
                      this.setTransport(n),
                      n.send([{ type: "upgrade" }]),
                      this.emitReserved("upgrade", n),
                      (n = null),
                      (this.upgrading = !1),
                      this.flush()));
                }));
            } else {
              const b = new Error("probe error");
              ((b.transport = n.name), this.emitReserved("upgradeError", b));
            }
        }));
    };
    function i() {
      r || ((r = !0), u(), n.close(), (n = null));
    }
    const a = (m) => {
      const b = new Error("probe error: " + m);
      ((b.transport = n.name), i(), this.emitReserved("upgradeError", b));
    };
    function c() {
      a("transport closed");
    }
    function d() {
      a("socket closed");
    }
    function l(m) {
      n && m.name !== n.name && i();
    }
    const u = () => {
      (n.removeListener("open", s),
        n.removeListener("error", a),
        n.removeListener("close", c),
        this.off("close", d),
        this.off("upgrading", l));
    };
    (n.once("open", s),
      n.once("error", a),
      n.once("close", c),
      this.once("close", d),
      this.once("upgrading", l),
      this._upgrades.indexOf("webtransport") !== -1 && e !== "webtransport"
        ? this.setTimeoutFn(() => {
            r || n.open();
          }, 200)
        : n.open());
  }
  onHandshake(e) {
    ((this._upgrades = this._filterUpgrades(e.upgrades)), super.onHandshake(e));
  }
  _filterUpgrades(e) {
    const n = [];
    for (let r = 0; r < e.length; r++)
      ~this.transports.indexOf(e[r]) && n.push(e[r]);
    return n;
  }
}
let Ju = class extends Yu {
  constructor(e, n = {}) {
    const r = typeof e == "object" ? e : n;
    ((!r.transports || (r.transports && typeof r.transports[0] == "string")) &&
      (r.transports = (r.transports || ["polling", "websocket", "webtransport"])
        .map((s) => Wu[s])
        .filter((s) => !!s)),
      super(e, r));
  }
};
function Xu(t, e = "", n) {
  let r = t;
  ((n = n || (typeof location < "u" && location)),
    t == null && (t = n.protocol + "//" + n.host),
    typeof t == "string" &&
      (t.charAt(0) === "/" &&
        (t.charAt(1) === "/" ? (t = n.protocol + t) : (t = n.host + t)),
      /^(https?|wss?):\/\//.test(t) ||
        (typeof n < "u" ? (t = n.protocol + "//" + t) : (t = "https://" + t)),
      (r = Or(t))),
    r.port ||
      (/^(http|ws)$/.test(r.protocol)
        ? (r.port = "80")
        : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")),
    (r.path = r.path || "/"));
  const i = r.host.indexOf(":") !== -1 ? "[" + r.host + "]" : r.host;
  return (
    (r.id = r.protocol + "://" + i + ":" + r.port + e),
    (r.href =
      r.protocol + "://" + i + (n && n.port === r.port ? "" : ":" + r.port)),
    r
  );
}
const Gu = typeof ArrayBuffer == "function",
  Qu = (t) =>
    typeof ArrayBuffer.isView == "function"
      ? ArrayBuffer.isView(t)
      : t.buffer instanceof ArrayBuffer,
  Gi = Object.prototype.toString,
  Zu =
    typeof Blob == "function" ||
    (typeof Blob < "u" && Gi.call(Blob) === "[object BlobConstructor]"),
  eh =
    typeof File == "function" ||
    (typeof File < "u" && Gi.call(File) === "[object FileConstructor]");
function os(t) {
  return (
    (Gu && (t instanceof ArrayBuffer || Qu(t))) ||
    (Zu && t instanceof Blob) ||
    (eh && t instanceof File)
  );
}
function Pn(t, e) {
  if (!t || typeof t != "object") return !1;
  if (Array.isArray(t)) {
    for (let n = 0, r = t.length; n < r; n++) if (Pn(t[n])) return !0;
    return !1;
  }
  if (os(t)) return !0;
  if (t.toJSON && typeof t.toJSON == "function" && arguments.length === 1)
    return Pn(t.toJSON(), !0);
  for (const n in t)
    if (Object.prototype.hasOwnProperty.call(t, n) && Pn(t[n])) return !0;
  return !1;
}
function th(t) {
  const e = [],
    n = t.data,
    r = t;
  return (
    (r.data = Fr(n, e)),
    (r.attachments = e.length),
    { packet: r, buffers: e }
  );
}
function Fr(t, e) {
  if (!t) return t;
  if (os(t)) {
    const n = { _placeholder: !0, num: e.length };
    return (e.push(t), n);
  } else if (Array.isArray(t)) {
    const n = new Array(t.length);
    for (let r = 0; r < t.length; r++) n[r] = Fr(t[r], e);
    return n;
  } else if (typeof t == "object" && !(t instanceof Date)) {
    const n = {};
    for (const r in t)
      Object.prototype.hasOwnProperty.call(t, r) && (n[r] = Fr(t[r], e));
    return n;
  }
  return t;
}
function nh(t, e) {
  return ((t.data = zr(t.data, e)), delete t.attachments, t);
}
function zr(t, e) {
  if (!t) return t;
  if (t && t._placeholder === !0) {
    if (typeof t.num == "number" && t.num >= 0 && t.num < e.length)
      return e[t.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(t))
    for (let n = 0; n < t.length; n++) t[n] = zr(t[n], e);
  else if (typeof t == "object")
    for (const n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (t[n] = zr(t[n], e));
  return t;
}
const rh = [
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener",
];
var ie;
(function (t) {
  ((t[(t.CONNECT = 0)] = "CONNECT"),
    (t[(t.DISCONNECT = 1)] = "DISCONNECT"),
    (t[(t.EVENT = 2)] = "EVENT"),
    (t[(t.ACK = 3)] = "ACK"),
    (t[(t.CONNECT_ERROR = 4)] = "CONNECT_ERROR"),
    (t[(t.BINARY_EVENT = 5)] = "BINARY_EVENT"),
    (t[(t.BINARY_ACK = 6)] = "BINARY_ACK"));
})(ie || (ie = {}));
class sh {
  constructor(e) {
    this.replacer = e;
  }
  encode(e) {
    return (e.type === ie.EVENT || e.type === ie.ACK) && Pn(e)
      ? this.encodeAsBinary({
          type: e.type === ie.EVENT ? ie.BINARY_EVENT : ie.BINARY_ACK,
          nsp: e.nsp,
          data: e.data,
          id: e.id,
        })
      : [this.encodeAsString(e)];
  }
  encodeAsString(e) {
    let n = "" + e.type;
    return (
      (e.type === ie.BINARY_EVENT || e.type === ie.BINARY_ACK) &&
        (n += e.attachments + "-"),
      e.nsp && e.nsp !== "/" && (n += e.nsp + ","),
      e.id != null && (n += e.id),
      e.data != null && (n += JSON.stringify(e.data, this.replacer)),
      n
    );
  }
  encodeAsBinary(e) {
    const n = th(e),
      r = this.encodeAsString(n.packet),
      s = n.buffers;
    return (s.unshift(r), s);
  }
}
class is extends ye {
  constructor(e) {
    (super(), (this.reviver = e));
  }
  add(e) {
    let n;
    if (typeof e == "string") {
      if (this.reconstructor)
        throw new Error("got plaintext data when reconstructing a packet");
      n = this.decodeString(e);
      const r = n.type === ie.BINARY_EVENT;
      r || n.type === ie.BINARY_ACK
        ? ((n.type = r ? ie.EVENT : ie.ACK),
          (this.reconstructor = new oh(n)),
          n.attachments === 0 && super.emitReserved("decoded", n))
        : super.emitReserved("decoded", n);
    } else if (os(e) || e.base64)
      if (this.reconstructor)
        ((n = this.reconstructor.takeBinaryData(e)),
          n && ((this.reconstructor = null), super.emitReserved("decoded", n)));
      else throw new Error("got binary data when not reconstructing a packet");
    else throw new Error("Unknown type: " + e);
  }
  decodeString(e) {
    let n = 0;
    const r = { type: Number(e.charAt(0)) };
    if (ie[r.type] === void 0) throw new Error("unknown packet type " + r.type);
    if (r.type === ie.BINARY_EVENT || r.type === ie.BINARY_ACK) {
      const i = n + 1;
      for (; e.charAt(++n) !== "-" && n != e.length; );
      const a = e.substring(i, n);
      if (a != Number(a) || e.charAt(n) !== "-")
        throw new Error("Illegal attachments");
      r.attachments = Number(a);
    }
    if (e.charAt(n + 1) === "/") {
      const i = n + 1;
      for (; ++n && !(e.charAt(n) === "," || n === e.length); );
      r.nsp = e.substring(i, n);
    } else r.nsp = "/";
    const s = e.charAt(n + 1);
    if (s !== "" && Number(s) == s) {
      const i = n + 1;
      for (; ++n; ) {
        const a = e.charAt(n);
        if (a == null || Number(a) != a) {
          --n;
          break;
        }
        if (n === e.length) break;
      }
      r.id = Number(e.substring(i, n + 1));
    }
    if (e.charAt(++n)) {
      const i = this.tryParse(e.substr(n));
      if (is.isPayloadValid(r.type, i)) r.data = i;
      else throw new Error("invalid payload");
    }
    return r;
  }
  tryParse(e) {
    try {
      return JSON.parse(e, this.reviver);
    } catch {
      return !1;
    }
  }
  static isPayloadValid(e, n) {
    switch (e) {
      case ie.CONNECT:
        return ko(n);
      case ie.DISCONNECT:
        return n === void 0;
      case ie.CONNECT_ERROR:
        return typeof n == "string" || ko(n);
      case ie.EVENT:
      case ie.BINARY_EVENT:
        return (
          Array.isArray(n) &&
          (typeof n[0] == "number" ||
            (typeof n[0] == "string" && rh.indexOf(n[0]) === -1))
        );
      case ie.ACK:
      case ie.BINARY_ACK:
        return Array.isArray(n);
    }
  }
  destroy() {
    this.reconstructor &&
      (this.reconstructor.finishedReconstruction(),
      (this.reconstructor = null));
  }
}
class oh {
  constructor(e) {
    ((this.packet = e), (this.buffers = []), (this.reconPack = e));
  }
  takeBinaryData(e) {
    if (
      (this.buffers.push(e), this.buffers.length === this.reconPack.attachments)
    ) {
      const n = nh(this.reconPack, this.buffers);
      return (this.finishedReconstruction(), n);
    }
    return null;
  }
  finishedReconstruction() {
    ((this.reconPack = null), (this.buffers = []));
  }
}
function ko(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
const ih = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      Decoder: is,
      Encoder: sh,
      get PacketType() {
        return ie;
      },
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
function Ne(t, e, n) {
  return (
    t.on(e, n),
    function () {
      t.off(e, n);
    }
  );
}
const ah = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  newListener: 1,
  removeListener: 1,
});
class Qi extends ye {
  constructor(e, n, r) {
    (super(),
      (this.connected = !1),
      (this.recovered = !1),
      (this.receiveBuffer = []),
      (this.sendBuffer = []),
      (this._queue = []),
      (this._queueSeq = 0),
      (this.ids = 0),
      (this.acks = {}),
      (this.flags = {}),
      (this.io = e),
      (this.nsp = n),
      r && r.auth && (this.auth = r.auth),
      (this._opts = Object.assign({}, r)),
      this.io._autoConnect && this.open());
  }
  get disconnected() {
    return !this.connected;
  }
  subEvents() {
    if (this.subs) return;
    const e = this.io;
    this.subs = [
      Ne(e, "open", this.onopen.bind(this)),
      Ne(e, "packet", this.onpacket.bind(this)),
      Ne(e, "error", this.onerror.bind(this)),
      Ne(e, "close", this.onclose.bind(this)),
    ];
  }
  get active() {
    return !!this.subs;
  }
  connect() {
    return this.connected
      ? this
      : (this.subEvents(),
        this.io._reconnecting || this.io.open(),
        this.io._readyState === "open" && this.onopen(),
        this);
  }
  open() {
    return this.connect();
  }
  send(...e) {
    return (e.unshift("message"), this.emit.apply(this, e), this);
  }
  emit(e, ...n) {
    var r, s, i;
    if (ah.hasOwnProperty(e))
      throw new Error('"' + e.toString() + '" is a reserved event name');
    if (
      (n.unshift(e),
      this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
    )
      return (this._addToQueue(n), this);
    const a = { type: ie.EVENT, data: n };
    if (
      ((a.options = {}),
      (a.options.compress = this.flags.compress !== !1),
      typeof n[n.length - 1] == "function")
    ) {
      const u = this.ids++,
        m = n.pop();
      (this._registerAckCallback(u, m), (a.id = u));
    }
    const c =
        (s =
          (r = this.io.engine) === null || r === void 0
            ? void 0
            : r.transport) === null || s === void 0
          ? void 0
          : s.writable,
      d =
        this.connected &&
        !(
          !((i = this.io.engine) === null || i === void 0) &&
          i._hasPingExpired()
        );
    return (
      (this.flags.volatile && !c) ||
        (d
          ? (this.notifyOutgoingListeners(a), this.packet(a))
          : this.sendBuffer.push(a)),
      (this.flags = {}),
      this
    );
  }
  _registerAckCallback(e, n) {
    var r;
    const s =
      (r = this.flags.timeout) !== null && r !== void 0
        ? r
        : this._opts.ackTimeout;
    if (s === void 0) {
      this.acks[e] = n;
      return;
    }
    const i = this.io.setTimeoutFn(() => {
        delete this.acks[e];
        for (let c = 0; c < this.sendBuffer.length; c++)
          this.sendBuffer[c].id === e && this.sendBuffer.splice(c, 1);
        n.call(this, new Error("operation has timed out"));
      }, s),
      a = (...c) => {
        (this.io.clearTimeoutFn(i), n.apply(this, c));
      };
    ((a.withError = !0), (this.acks[e] = a));
  }
  emitWithAck(e, ...n) {
    return new Promise((r, s) => {
      const i = (a, c) => (a ? s(a) : r(c));
      ((i.withError = !0), n.push(i), this.emit(e, ...n));
    });
  }
  _addToQueue(e) {
    let n;
    typeof e[e.length - 1] == "function" && (n = e.pop());
    const r = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: !1,
      args: e,
      flags: Object.assign({ fromQueue: !0 }, this.flags),
    };
    (e.push(
      (s, ...i) => (
        this._queue[0],
        s !== null
          ? r.tryCount > this._opts.retries && (this._queue.shift(), n && n(s))
          : (this._queue.shift(), n && n(null, ...i)),
        (r.pending = !1),
        this._drainQueue()
      ),
    ),
      this._queue.push(r),
      this._drainQueue());
  }
  _drainQueue(e = !1) {
    if (!this.connected || this._queue.length === 0) return;
    const n = this._queue[0];
    (n.pending && !e) ||
      ((n.pending = !0),
      n.tryCount++,
      (this.flags = n.flags),
      this.emit.apply(this, n.args));
  }
  packet(e) {
    ((e.nsp = this.nsp), this.io._packet(e));
  }
  onopen() {
    typeof this.auth == "function"
      ? this.auth((e) => {
          this._sendConnectPacket(e);
        })
      : this._sendConnectPacket(this.auth);
  }
  _sendConnectPacket(e) {
    this.packet({
      type: ie.CONNECT,
      data: this._pid
        ? Object.assign({ pid: this._pid, offset: this._lastOffset }, e)
        : e,
    });
  }
  onerror(e) {
    this.connected || this.emitReserved("connect_error", e);
  }
  onclose(e, n) {
    ((this.connected = !1),
      delete this.id,
      this.emitReserved("disconnect", e, n),
      this._clearAcks());
  }
  _clearAcks() {
    Object.keys(this.acks).forEach((e) => {
      if (!this.sendBuffer.some((r) => String(r.id) === e)) {
        const r = this.acks[e];
        (delete this.acks[e],
          r.withError &&
            r.call(this, new Error("socket has been disconnected")));
      }
    });
  }
  onpacket(e) {
    if (e.nsp === this.nsp)
      switch (e.type) {
        case ie.CONNECT:
          e.data && e.data.sid
            ? this.onconnect(e.data.sid, e.data.pid)
            : this.emitReserved(
                "connect_error",
                new Error(
                  "It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)",
                ),
              );
          break;
        case ie.EVENT:
        case ie.BINARY_EVENT:
          this.onevent(e);
          break;
        case ie.ACK:
        case ie.BINARY_ACK:
          this.onack(e);
          break;
        case ie.DISCONNECT:
          this.ondisconnect();
          break;
        case ie.CONNECT_ERROR:
          this.destroy();
          const r = new Error(e.data.message);
          ((r.data = e.data.data), this.emitReserved("connect_error", r));
          break;
      }
  }
  onevent(e) {
    const n = e.data || [];
    (e.id != null && n.push(this.ack(e.id)),
      this.connected
        ? this.emitEvent(n)
        : this.receiveBuffer.push(Object.freeze(n)));
  }
  emitEvent(e) {
    if (this._anyListeners && this._anyListeners.length) {
      const n = this._anyListeners.slice();
      for (const r of n) r.apply(this, e);
    }
    (super.emit.apply(this, e),
      this._pid &&
        e.length &&
        typeof e[e.length - 1] == "string" &&
        (this._lastOffset = e[e.length - 1]));
  }
  ack(e) {
    const n = this;
    let r = !1;
    return function (...s) {
      r || ((r = !0), n.packet({ type: ie.ACK, id: e, data: s }));
    };
  }
  onack(e) {
    const n = this.acks[e.id];
    typeof n == "function" &&
      (delete this.acks[e.id],
      n.withError && e.data.unshift(null),
      n.apply(this, e.data));
  }
  onconnect(e, n) {
    ((this.id = e),
      (this.recovered = n && this._pid === n),
      (this._pid = n),
      (this.connected = !0),
      this.emitBuffered(),
      this._drainQueue(!0),
      this.emitReserved("connect"));
  }
  emitBuffered() {
    (this.receiveBuffer.forEach((e) => this.emitEvent(e)),
      (this.receiveBuffer = []),
      this.sendBuffer.forEach((e) => {
        (this.notifyOutgoingListeners(e), this.packet(e));
      }),
      (this.sendBuffer = []));
  }
  ondisconnect() {
    (this.destroy(), this.onclose("io server disconnect"));
  }
  destroy() {
    (this.subs && (this.subs.forEach((e) => e()), (this.subs = void 0)),
      this.io._destroy(this));
  }
  disconnect() {
    return (
      this.connected && this.packet({ type: ie.DISCONNECT }),
      this.destroy(),
      this.connected && this.onclose("io client disconnect"),
      this
    );
  }
  close() {
    return this.disconnect();
  }
  compress(e) {
    return ((this.flags.compress = e), this);
  }
  get volatile() {
    return ((this.flags.volatile = !0), this);
  }
  timeout(e) {
    return ((this.flags.timeout = e), this);
  }
  onAny(e) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.push(e),
      this
    );
  }
  prependAny(e) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.unshift(e),
      this
    );
  }
  offAny(e) {
    if (!this._anyListeners) return this;
    if (e) {
      const n = this._anyListeners;
      for (let r = 0; r < n.length; r++)
        if (e === n[r]) return (n.splice(r, 1), this);
    } else this._anyListeners = [];
    return this;
  }
  listenersAny() {
    return this._anyListeners || [];
  }
  onAnyOutgoing(e) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.push(e),
      this
    );
  }
  prependAnyOutgoing(e) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.unshift(e),
      this
    );
  }
  offAnyOutgoing(e) {
    if (!this._anyOutgoingListeners) return this;
    if (e) {
      const n = this._anyOutgoingListeners;
      for (let r = 0; r < n.length; r++)
        if (e === n[r]) return (n.splice(r, 1), this);
    } else this._anyOutgoingListeners = [];
    return this;
  }
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  notifyOutgoingListeners(e) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const n = this._anyOutgoingListeners.slice();
      for (const r of n) r.apply(this, e.data);
    }
  }
}
function Tt(t) {
  ((t = t || {}),
    (this.ms = t.min || 100),
    (this.max = t.max || 1e4),
    (this.factor = t.factor || 2),
    (this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0),
    (this.attempts = 0));
}
Tt.prototype.duration = function () {
  var t = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var e = Math.random(),
      n = Math.floor(e * this.jitter * t);
    t = Math.floor(e * 10) & 1 ? t + n : t - n;
  }
  return Math.min(t, this.max) | 0;
};
Tt.prototype.reset = function () {
  this.attempts = 0;
};
Tt.prototype.setMin = function (t) {
  this.ms = t;
};
Tt.prototype.setMax = function (t) {
  this.max = t;
};
Tt.prototype.setJitter = function (t) {
  this.jitter = t;
};
class Br extends ye {
  constructor(e, n) {
    var r;
    (super(),
      (this.nsps = {}),
      (this.subs = []),
      e && typeof e == "object" && ((n = e), (e = void 0)),
      (n = n || {}),
      (n.path = n.path || "/socket.io"),
      (this.opts = n),
      Yn(this, n),
      this.reconnection(n.reconnection !== !1),
      this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0),
      this.reconnectionDelay(n.reconnectionDelay || 1e3),
      this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3),
      this.randomizationFactor(
        (r = n.randomizationFactor) !== null && r !== void 0 ? r : 0.5,
      ),
      (this.backoff = new Tt({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor(),
      })),
      this.timeout(n.timeout == null ? 2e4 : n.timeout),
      (this._readyState = "closed"),
      (this.uri = e));
    const s = n.parser || ih;
    ((this.encoder = new s.Encoder()),
      (this.decoder = new s.Decoder()),
      (this._autoConnect = n.autoConnect !== !1),
      this._autoConnect && this.open());
  }
  reconnection(e) {
    return arguments.length
      ? ((this._reconnection = !!e), e || (this.skipReconnect = !0), this)
      : this._reconnection;
  }
  reconnectionAttempts(e) {
    return e === void 0
      ? this._reconnectionAttempts
      : ((this._reconnectionAttempts = e), this);
  }
  reconnectionDelay(e) {
    var n;
    return e === void 0
      ? this._reconnectionDelay
      : ((this._reconnectionDelay = e),
        (n = this.backoff) === null || n === void 0 || n.setMin(e),
        this);
  }
  randomizationFactor(e) {
    var n;
    return e === void 0
      ? this._randomizationFactor
      : ((this._randomizationFactor = e),
        (n = this.backoff) === null || n === void 0 || n.setJitter(e),
        this);
  }
  reconnectionDelayMax(e) {
    var n;
    return e === void 0
      ? this._reconnectionDelayMax
      : ((this._reconnectionDelayMax = e),
        (n = this.backoff) === null || n === void 0 || n.setMax(e),
        this);
  }
  timeout(e) {
    return arguments.length ? ((this._timeout = e), this) : this._timeout;
  }
  maybeReconnectOnOpen() {
    !this._reconnecting &&
      this._reconnection &&
      this.backoff.attempts === 0 &&
      this.reconnect();
  }
  open(e) {
    if (~this._readyState.indexOf("open")) return this;
    this.engine = new Ju(this.uri, this.opts);
    const n = this.engine,
      r = this;
    ((this._readyState = "opening"), (this.skipReconnect = !1));
    const s = Ne(n, "open", function () {
        (r.onopen(), e && e());
      }),
      i = (c) => {
        (this.cleanup(),
          (this._readyState = "closed"),
          this.emitReserved("error", c),
          e ? e(c) : this.maybeReconnectOnOpen());
      },
      a = Ne(n, "error", i);
    if (this._timeout !== !1) {
      const c = this._timeout,
        d = this.setTimeoutFn(() => {
          (s(), i(new Error("timeout")), n.close());
        }, c);
      (this.opts.autoUnref && d.unref(),
        this.subs.push(() => {
          this.clearTimeoutFn(d);
        }));
    }
    return (this.subs.push(s), this.subs.push(a), this);
  }
  connect(e) {
    return this.open(e);
  }
  onopen() {
    (this.cleanup(), (this._readyState = "open"), this.emitReserved("open"));
    const e = this.engine;
    this.subs.push(
      Ne(e, "ping", this.onping.bind(this)),
      Ne(e, "data", this.ondata.bind(this)),
      Ne(e, "error", this.onerror.bind(this)),
      Ne(e, "close", this.onclose.bind(this)),
      Ne(this.decoder, "decoded", this.ondecoded.bind(this)),
    );
  }
  onping() {
    this.emitReserved("ping");
  }
  ondata(e) {
    try {
      this.decoder.add(e);
    } catch (n) {
      this.onclose("parse error", n);
    }
  }
  ondecoded(e) {
    Kn(() => {
      this.emitReserved("packet", e);
    }, this.setTimeoutFn);
  }
  onerror(e) {
    this.emitReserved("error", e);
  }
  socket(e, n) {
    let r = this.nsps[e];
    return (
      r
        ? this._autoConnect && !r.active && r.connect()
        : ((r = new Qi(this, e, n)), (this.nsps[e] = r)),
      r
    );
  }
  _destroy(e) {
    const n = Object.keys(this.nsps);
    for (const r of n) if (this.nsps[r].active) return;
    this._close();
  }
  _packet(e) {
    const n = this.encoder.encode(e);
    for (let r = 0; r < n.length; r++) this.engine.write(n[r], e.options);
  }
  cleanup() {
    (this.subs.forEach((e) => e()),
      (this.subs.length = 0),
      this.decoder.destroy());
  }
  _close() {
    ((this.skipReconnect = !0),
      (this._reconnecting = !1),
      this.onclose("forced close"));
  }
  disconnect() {
    return this._close();
  }
  onclose(e, n) {
    var r;
    (this.cleanup(),
      (r = this.engine) === null || r === void 0 || r.close(),
      this.backoff.reset(),
      (this._readyState = "closed"),
      this.emitReserved("close", e, n),
      this._reconnection && !this.skipReconnect && this.reconnect());
  }
  reconnect() {
    if (this._reconnecting || this.skipReconnect) return this;
    const e = this;
    if (this.backoff.attempts >= this._reconnectionAttempts)
      (this.backoff.reset(),
        this.emitReserved("reconnect_failed"),
        (this._reconnecting = !1));
    else {
      const n = this.backoff.duration();
      this._reconnecting = !0;
      const r = this.setTimeoutFn(() => {
        e.skipReconnect ||
          (this.emitReserved("reconnect_attempt", e.backoff.attempts),
          !e.skipReconnect &&
            e.open((s) => {
              s
                ? ((e._reconnecting = !1),
                  e.reconnect(),
                  this.emitReserved("reconnect_error", s))
                : e.onreconnect();
            }));
      }, n);
      (this.opts.autoUnref && r.unref(),
        this.subs.push(() => {
          this.clearTimeoutFn(r);
        }));
    }
  }
  onreconnect() {
    const e = this.backoff.attempts;
    ((this._reconnecting = !1),
      this.backoff.reset(),
      this.emitReserved("reconnect", e));
  }
}
const zt = {};
function In(t, e) {
  (typeof t == "object" && ((e = t), (t = void 0)), (e = e || {}));
  const n = Xu(t, e.path || "/socket.io"),
    r = n.source,
    s = n.id,
    i = n.path,
    a = zt[s] && i in zt[s].nsps,
    c = e.forceNew || e["force new connection"] || e.multiplex === !1 || a;
  let d;
  return (
    c ? (d = new Br(r, e)) : (zt[s] || (zt[s] = new Br(r, e)), (d = zt[s])),
    n.query && !e.query && (e.query = n.queryKey),
    d.socket(n.path, e)
  );
}
Object.assign(In, { Manager: Br, Socket: Qi, io: In, connect: In });
const Zi = "http://217.114.11.48:3001/api",
  ch = "http://217.114.11.48:3001",
  G = me.create({
    baseURL: Zi,
    headers: { "Content-Type": "application/json" },
  }),
  as = me.create({
    baseURL: Zi,
    headers: { "Content-Type": "application/json" },
  });
G.interceptors.request.use((t) => {
  const e = localStorage.getItem("token");
  return (e && (t.headers.Authorization = `Bearer ${e}`), t);
});
as.interceptors.request.use((t) => {
  const e = localStorage.getItem("token");
  return (e && (t.headers.Authorization = `Bearer ${e}`), t);
});
G.interceptors.response.use(
  (t) => t,
  (t) => {
    var e;
    return (
      t.response ||
        (t.code === "ECONNREFUSED" || t.message.includes("Network Error")
          ? (t.response = {
              data: {
                error:
                  "Сервер недоступен. Убедитесь, что сервер запущен на порту 3001.",
              },
            })
          : (t.response = {
              data: {
                error:
                  "Ошибка подключения к серверу. Проверьте интернет-соединение.",
              },
            })),
      ((e = t.response) == null ? void 0 : e.status) === 401 &&
        (localStorage.removeItem("token"),
        localStorage.removeItem("user"),
        (window.location.href = "/auth")),
      Promise.reject(t)
    );
  },
);
as.interceptors.response.use(
  (t) => t,
  (t) => (
    t.response ||
      (t.code === "ECONNREFUSED" || t.message.includes("Network Error")
        ? (t.response = {
            data: {
              error:
                "Сервер недоступен. Убедитесь, что сервер запущен на порту 3001.",
            },
          })
        : (t.response = {
            data: {
              error:
                "Ошибка подключения к серверу. Проверьте интернет-соединение.",
            },
          })),
    Promise.reject(t)
  ),
);
const Bt = {
    register: async (t, e, n) =>
      (
        await G.post("/auth/register", {
          username: t,
          fullName: e,
          password: n,
        })
      ).data,
    login: async (t, e) =>
      (await G.post("/auth/login", { username: t, password: e })).data,
    verify: async () => (await G.get("/auth/verify")).data,
    updateProfile: async (t) => (await G.put("/users/me", t)).data,
    changePassword: async (t, e) =>
      (
        await as.put("/users/me/password", {
          currentPassword: t,
          newPassword: e,
        })
      ).data,
  },
  cs = {
    getMe: async () => (await G.get("/users/me")).data,
    search: async (t) =>
      (await G.get("/users/search", { params: { q: t } })).data,
    getById: async (t) => (await G.get(`/users/${t}`)).data,
    getByUsername: async (t) =>
      (await G.get(`/users/by-username/${encodeURIComponent(t)}`)).data,
    updateProfile: async (t) => (await G.put("/users/me", t)).data,
  },
  Eo = {
    getAIChat: async () => (await G.get("/ai/chat")).data,
    sendMessage: async (t, e) =>
      (await G.post("/ai/message", { chatId: t, text: e })).data,
  },
  lh = { getSavedChat: async () => (await G.get("/saved/chat")).data },
  bt = {
    getChats: async () => (await G.get("/chats")).data,
    create: async (t, e, n) =>
      (await G.post("/chats", { name: t, type: e, participantIds: n })).data,
    getById: async (t) => (await G.get(`/chats/${t}`)).data,
    clear: async (t) => (await G.delete(`/chats/${t}/messages`)).data,
    delete: async (t, e = !1) =>
      (await G.delete(`/chats/${t}`, { data: { deleteForAll: e } })).data,
    archive: async (t) => (await G.post(`/chats/${t}/archive`)).data,
    unarchive: async (t) => (await G.delete(`/chats/${t}/archive`)).data,
    mute: async (t) => (await G.post(`/chats/${t}/mute`)).data,
    pin: async (t) => (await G.post(`/chats/${t}/pin`)).data,
    block: async (t, e) =>
      (await G.post(`/chats/${t}/block`, { userId: e })).data,
    unblock: async (t, e) =>
      (await G.delete(`/chats/${t}/block`, { data: { userId: e } })).data,
  },
  jo = {
    getByChatId: async (t, e = 50, n = 0) =>
      (await G.get(`/messages/chat/${t}`, { params: { limit: e, offset: n } }))
        .data,
    send: async (t, e, n) =>
      (await G.post("/messages", { chatId: t, text: e, attachments: n })).data,
    markAsRead: async (t) =>
      (await G.post("/messages/read", { chatId: t })).data,
  };
let ge = null;
const Jt = (t) => (
    (ge && (ge.connected || ge.active)) ||
      (ge && ge.disconnect(),
      (ge = In(ch, {
        auth: { token: t },
        timeout: 1e4,
        transports: ["websocket", "polling"],
        reconnection: !0,
        reconnectionAttempts: 1 / 0,
        reconnectionDelay: 1e3,
      })),
      ge.on("connect", () => {}),
      ge.on("disconnect", () => {}),
      ge.on("connect_error", (e) => {
        console.error("Socket connection error:", e);
      }),
      ge.on("error", (e) => {
        console.error("Socket error:", e);
      })),
    ge
  ),
  ve = () => ge,
  dh = () => {
    ge && (ge.disconnect(), (ge = null));
  },
  uh = () => {
    const t = localStorage.getItem("token");
    return t
      ? (ge && (ge.removeAllListeners(), ge.disconnect(), (ge = null)), Jt(t))
      : null;
  },
  hh = () => !!(ge && ge.connected),
  Ro = {
    getActive: async (t) =>
      (await G.get("/notifications", { params: { vc: t } })).data,
    dismiss: async (t) => (await G.post(`/notifications/${t}/dismiss`)).data,
  },
  fh = {
    createTicket: async (t, e) =>
      (await G.post("/support/tickets", { category: t, subject: e })).data,
    getMyTickets: async () => (await G.get("/support/tickets/my")).data,
    getAllTickets: async (t) =>
      (await G.get("/support/tickets", { params: t ? { status: t } : {} }))
        .data,
    getTicket: async (t) => (await G.get(`/support/tickets/${t}`)).data,
    claimTicket: async (t) =>
      (await G.post(`/support/tickets/${t}/claim`)).data,
    closeTicket: async (t) =>
      (await G.post(`/support/tickets/${t}/close`)).data,
    getMessages: async (t) =>
      (await G.get(`/support/tickets/${t}/messages`)).data,
    sendMessage: async (t, e) =>
      (await G.post(`/support/tickets/${t}/messages`, { text: e })).data,
  },
  Ng = {
    getStats: async () => (await G.get("/upload/storage-stats")).data,
    clearCache: async () => (await G.delete("/upload/clear-cache")).data,
  },
  _o = {
    getSettings: async () => (await G.get("/users/me/privacy")).data,
    updateSetting: async (t, e, n, r) =>
      (
        await G.put("/users/me/privacy", {
          settingKey: t,
          value: e,
          alwaysShareWith: n,
          neverShareWith: r,
        })
      ).data,
  },
  wn = {
    uploadFiles: async (t) => {
      const e = new FormData();
      t.forEach((n) => {
        e.append("files", n);
      });
      try {
        return (
          await G.post("/upload", e, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        ).data.files;
      } catch (n) {
        throw (console.error("Upload API error:", n), n);
      }
    },
    getFileInfo: async (t) => (await G.get(`/upload/info/${t}`)).data,
    deleteFile: async (t) => (await G.delete(`/upload/${t}`)).data,
  },
  dt = ht()(
    Xr(
      (t, e) => ({
        contacts: [],
        blockedUserIds: [],
        isLoading: !1,
        error: null,
        addContact: async (n, r) => {
          const { contacts: s } = e();
          if (s.find((c) => c.userId === n.id)) {
            t({ error: "Пользователь уже добавлен в контакты" });
            return;
          }
          const a = {
            id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            userId: n.id,
            displayName: r || n.fullName,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            user: n,
          };
          t((c) => ({ contacts: [...c.contacts, a], error: null }));
        },
        removeContact: (n) => {
          t((r) => ({ contacts: r.contacts.filter((s) => s.id !== n) }));
        },
        renameContact: (n, r) => {
          t((s) => ({
            contacts: s.contacts.map((i) =>
              i.id === n
                ? { ...i, displayName: r, updatedAt: new Date().toISOString() }
                : i,
            ),
          }));
        },
        getContactByUserId: (n) => {
          const { contacts: r } = e();
          return r.find((s) => s.userId === n);
        },
        isUserInContacts: (n) => {
          const { contacts: r } = e();
          return r.some((s) => s.userId === n);
        },
        blockUser: (n) => {
          t((r) => ({
            blockedUserIds: r.blockedUserIds.includes(n)
              ? r.blockedUserIds
              : [...r.blockedUserIds, n],
          }));
        },
        unblockUser: (n) => {
          t((r) => ({
            blockedUserIds: r.blockedUserIds.filter((s) => s !== n),
          }));
        },
        isUserBlocked: (n) => e().blockedUserIds.includes(n),
        loadContacts: async () => {
          t({ isLoading: !0, error: null });
          try {
            t({ isLoading: !1 });
          } catch {
            t({ isLoading: !1, error: "Ошибка при загрузке контактов" });
          }
        },
        updateContactUser: (n, r) => {
          t((s) => ({
            contacts: s.contacts.map((i) =>
              i.userId === n ? { ...i, user: { ...i.user, ...r } } : i,
            ),
          }));
        },
        reset: () =>
          t({ contacts: [], blockedUserIds: [], isLoading: !1, error: null }),
      }),
      {
        name: "contacts-storage",
        partialize: (t) => ({
          contacts: t.contacts,
          blockedUserIds: t.blockedUserIds,
        }),
      },
    ),
  );
var Ao;
(function (t) {
  ((t[(t.Sunday = 1)] = "Sunday"),
    (t[(t.Monday = 2)] = "Monday"),
    (t[(t.Tuesday = 3)] = "Tuesday"),
    (t[(t.Wednesday = 4)] = "Wednesday"),
    (t[(t.Thursday = 5)] = "Thursday"),
    (t[(t.Friday = 6)] = "Friday"),
    (t[(t.Saturday = 7)] = "Saturday"));
})(Ao || (Ao = {}));
const On = Ke("LocalNotifications", {
  web: () =>
    Ce(
      () => import("./web-DMf8sByJ.js"),
      __vite__mapDeps([3, 1, 2]),
      import.meta.url,
    ).then((t) => new t.LocalNotificationsWeb()),
});
let Ur = !1;
async function ph() {
  if (ct.isNativePlatform())
    try {
      const t = await On.checkPermissions();
      t.display === "granted"
        ? (Ur = !0)
        : t.display !== "denied" &&
          (Ur = (await On.requestPermissions()).display === "granted");
    } catch (t) {
      console.error("Notification permission error:", t);
    }
}
let gh = 1;
async function mh(t, e, n) {
  if (!(!Ur && !ct.isNativePlatform()))
    try {
      await On.schedule({
        notifications: [
          {
            id: gh++,
            title: t,
            body: e || "Новое сообщение",
            largeBody: e || "Новое сообщение",
            channelId: "messages",
            extra: { chatId: n },
          },
        ],
      });
    } catch (r) {
      console.error("Error showing notification:", r);
    }
}
async function xh() {
  if (ct.isNativePlatform())
    try {
      await On.createChannel({
        id: "messages",
        name: "Сообщения",
        description: "Уведомления о новых сообщениях",
        importance: 4,
        visibility: 1,
        vibration: !0,
        sound: "default",
      });
    } catch (t) {
      console.error("Error creating notification channel:", t);
    }
}
const To = "http://217.114.11.48:3001",
  yh = "1.0.02",
  ea = 89,
  Po = Ke("AppUpdater");
function bh() {
  return yh;
}
function wh() {
  return ea;
}
async function vh() {
  try {
    const t = await fetch(`${To}/api/app/version`);
    if (!t.ok) return null;
    const e = await t.json();
    return e.versionCode > ea
      ? {
          ...e,
          downloadUrl: e.downloadUrl.startsWith("http")
            ? e.downloadUrl
            : `${To}${e.downloadUrl}`,
        }
      : null;
  } catch (t) {
    return (console.log("Update check failed:", t), null);
  }
}
const Nn = ht((t, e) => ({
    banners: [],
    loadBanners: async () => {
      try {
        const n = await Ro.getActive(wh());
        t({ banners: n || [] });
      } catch {}
    },
    addBanner: (n) => {
      t((r) => ({
        banners: r.banners.some((s) => s.id === n.id)
          ? r.banners
          : [...r.banners, n],
      }));
    },
    removeBanner: (n) => {
      t((r) => ({ banners: r.banners.filter((s) => s.id !== n) }));
    },
    dismissBanner: async (n) => {
      e().removeBanner(n);
      try {
        await Ro.dismiss(n);
      } catch {}
    },
  })),
  vr = new Map();
let Io = !1;
const Ve = ht((t, e) => ({
    chats: [],
    messages: {},
    currentChatId: null,
    isLoading: !1,
    isLoadingMessages: !1,
    typingUsers: {},
    showArchived: !1,
    reset: () =>
      t({
        chats: [],
        messages: {},
        currentChatId: null,
        isLoading: !1,
        typingUsers: {},
        showArchived: !1,
      }),
    loadChats: async () => {
      t({ isLoading: !0 });
      try {
        const n = await bt.getChats(),
          r = Array.isArray(n) ? n : [];
        try {
          const s = await Eo.getAIChat();
          r.some((a) => a.id === s.id) || r.unshift(s);
        } catch (s) {
          console.error("Error loading AI chat:", s);
        }
        try {
          const s = await lh.getSavedChat();
          r.some((a) => a.id === s.id) || r.unshift(s);
        } catch (s) {
          console.error("Error loading Saved chat:", s);
        }
        if (vr.size > 0)
          for (const s of r)
            for (const i of s.participants) {
              if (i.status === "hidden") continue;
              const a = vr.get(i.id);
              a &&
                ((i.status = a.status),
                a.lastSeen && (i.lastSeen = a.lastSeen));
            }
        t({ chats: r, isLoading: !1 });
      } catch (n) {
        (console.error("Error loading chats:", n), t({ isLoading: !1 }));
      }
    },
    loadMessages: async (n) => {
      var r;
      t({ isLoadingMessages: !0 });
      try {
        const s = await jo.getByChatId(n);
        t((i) => ({
          messages: { ...i.messages, [n]: s },
          isLoadingMessages: !1,
        }));
      } catch (s) {
        (console.error("Error loading messages:", s),
          ((r = s.response) == null ? void 0 : r.status) === 404
            ? t((i) => {
                const a = { ...i.messages };
                return (
                  delete a[n],
                  {
                    chats: i.chats.filter((c) => c.id !== n),
                    messages: a,
                    currentChatId:
                      i.currentChatId === n ? null : i.currentChatId,
                  }
                );
              })
            : t((i) => ({
                messages: { ...i.messages, [n]: [] },
                isLoadingMessages: !1,
              })));
      }
    },
    setCurrentChat: (n) => {
      t({ currentChatId: n });
    },
    sendMessage: async (n, r, s = [], i) => {
      var l;
      const c = e().chats.find((u) => u.id === n),
        d = ((l = Ue.getState().user) == null ? void 0 : l.id) || "";
      if ((c == null ? void 0 : c.type) === "ai") {
        const u = `temp-${Date.now()}-${Math.random()}`,
          m = {
            id: u,
            chatId: n,
            userId: d,
            text: r,
            attachments: s,
            status: "sending",
            createdAt: new Date().toISOString(),
          };
        t((b) => ({
          messages: { ...b.messages, [n]: [...(b.messages[n] || []), m] },
        }));
        try {
          const b = await Eo.sendMessage(n, r),
            w = b.userMessage;
          t((x) => {
            const k = (x.messages[n] || []).map((E) => (E.id === u ? w : E));
            return { messages: { ...x.messages, [n]: k } };
          });
          const p = b.aiMessage;
          return (
            t((x) => {
              const g = x.messages[n] || [];
              return {
                messages: { ...x.messages, [n]: [...g, p] },
                chats: x.chats.map((k) =>
                  k.id === n
                    ? {
                        ...k,
                        lastMessage: p,
                        lastMessageText: p.text,
                        lastMessageTime: p.createdAt,
                      }
                    : k,
                ),
              };
            }),
            w
          );
        } catch (b) {
          (console.error("Error sending message to AI:", b.message),
            t((w) => {
              const x = (w.messages[n] || []).map((g) =>
                g.id === u ? { ...g, status: "error" } : g,
              );
              return { messages: { ...w.messages, [n]: x } };
            }));
        }
      } else {
        const u = ve();
        if (!u)
          throw (
            console.error("Socket not available for sending message"),
            new Error("Socket connection not available")
          );
        if (!u.connected)
          throw (
            console.error("Socket not connected"),
            new Error("Socket not connected")
          );
        const m = `temp-${Date.now()}-${Math.random()}`,
          b = {
            id: m,
            chatId: n,
            userId: d,
            text: r,
            attachments: s,
            status: "sending",
            createdAt: new Date().toISOString(),
          };
        (t((w) => ({
          messages: { ...w.messages, [n]: [...(w.messages[n] || []), b] },
          chats: w.chats.map((p) =>
            p.id === n
              ? {
                  ...p,
                  lastMessage: b,
                  lastMessageText: r,
                  lastMessageTime: b.createdAt,
                }
              : p,
          ),
        })),
          u.emit(
            "message:send",
            { chatId: n, text: r, attachments: s, tempId: m, replyToId: i },
            (w) => {
              w != null &&
                w.success &&
                w.message &&
                e().handleNewMessage(w.message);
            },
          ),
          setTimeout(() => {
            (e().messages[n] || []).find(
              (g) => g.id === m && g.status === "sending",
            ) && e().loadMessages(n);
          }, 5e3),
          setTimeout(() => {
            (e().messages[n] || []).find(
              (g) => g.id === m && g.status === "sending",
            ) &&
              t((g) => ({
                messages: {
                  ...g.messages,
                  [n]: (g.messages[n] || []).map((k) =>
                    k.id === m ? { ...k, status: "error" } : k,
                  ),
                },
              }));
          }, 15e3));
      }
    },
    editMessage: (n, r, s) => {
      t((a) => {
        const d = (a.messages[n] || []).map((l) =>
          l.id === r ? { ...l, text: s, edited: !0, editedAt: new Date() } : l,
        );
        return (
          d[d.length - 1],
          {
            messages: { ...a.messages, [n]: d },
            chats: a.chats.map((l) => {
              var u;
              return l.id === n &&
                ((u = l.lastMessage) == null ? void 0 : u.id) === r
                ? {
                    ...l,
                    lastMessage: { ...l.lastMessage, text: s },
                    lastMessageText: s,
                  }
                : l;
            }),
          }
        );
      });
      const i = ve();
      i && i.emit("message:edit", { messageId: r, text: s });
    },
    deleteMessage: (n, r, s = !1) => {
      t((a) => {
        const c = (a.messages[n] || []).filter((l) => l.id !== r),
          d = c[c.length - 1];
        return {
          messages: { ...a.messages, [n]: c },
          chats: a.chats.map((l) =>
            l.id === n
              ? {
                  ...l,
                  lastMessage: d || null,
                  lastMessageText: (d == null ? void 0 : d.text) || "",
                  lastMessageTime: d == null ? void 0 : d.createdAt,
                }
              : l,
          ),
        };
      });
      const i = ve();
      i &&
        i.emit("message:delete", { messageId: r, chatId: n, deleteForAll: s });
    },
    markAsRead: async (n) => {
      try {
        await jo.markAsRead(n);
        const r = ve();
        (r && r.emit("message:read", { chatId: n }),
          t((s) => ({
            chats: s.chats.map((i) =>
              i.id === n ? { ...i, unreadCount: 0 } : i,
            ),
          })));
      } catch (r) {
        console.error("Error marking as read:", r);
      }
    },
    searchMessages: (n) =>
      Object.values(e().messages)
        .flat()
        .filter((s) => s.text.toLowerCase().includes(n.toLowerCase())),
    createChat: async (n, r, s) => {
      try {
        const i = await bt.create(n, r, s);
        t((c) =>
          c.chats.some((l) => l.id === i.id)
            ? c
            : {
                chats: [...c.chats, i],
                messages: { ...c.messages, [i.id]: [] },
              },
        );
        const a = ve();
        return (
          a && a.emit("chat:create", { name: n, type: r, participantIds: s }),
          i
        );
      } catch (i) {
        throw (console.error("Error creating chat:", i), i);
      }
    },
    clearChat: async (n) => {
      try {
        (await bt.clear(n),
          t((s) => ({
            messages: { ...s.messages, [n]: [] },
            chats: s.chats.map((i) =>
              i.id === n
                ? {
                    ...i,
                    lastMessageText: "",
                    lastMessageTime: void 0,
                    unreadCount: 0,
                  }
                : i,
            ),
          })));
        const r = ve();
        r && r.emit("chat:clear", { chatId: n });
      } catch (r) {
        throw (console.error("Error clearing chat:", r), r);
      }
    },
    deleteChat: async (n, r = !1) => {
      try {
        (t((i) => {
          const a = { ...i.messages };
          return (
            delete a[n],
            { chats: i.chats.filter((c) => c.id !== n), messages: a }
          );
        }),
          e().currentChatId === n && t({ currentChatId: null }));
        const s = ve();
        s && s.emit("chat:delete", { chatId: n, deleteForAll: r });
      } catch (s) {
        throw (console.error("Error deleting chat:", s), s);
      }
    },
    archiveChat: async (n) => {
      try {
        t((s) => ({
          chats: s.chats.map((i) => (i.id === n ? { ...i, archived: !0 } : i)),
        }));
        const r = ve();
        r && r.emit("chat:archive", { chatId: n });
      } catch (r) {
        throw (console.error("Error archiving chat:", r), r);
      }
    },
    unarchiveChat: async (n) => {
      try {
        t((s) => ({
          chats: s.chats.map((i) => (i.id === n ? { ...i, archived: !1 } : i)),
        }));
        const r = ve();
        r && r.emit("chat:unarchive", { chatId: n });
      } catch (r) {
        throw (console.error("Error unarchiving chat:", r), r);
      }
    },
    muteChat: async (n) => {
      try {
        t((s) => ({
          chats: s.chats.map((i) =>
            i.id === n ? { ...i, muted: !i.muted } : i,
          ),
        }));
        const r = ve();
        r && r.emit("chat:mute", { chatId: n });
      } catch (r) {
        throw (console.error("Error muting chat:", r), r);
      }
    },
    pinChat: async (n) => {
      try {
        t((s) => ({
          chats: s.chats.map((i) =>
            i.id === n ? { ...i, pinned: !i.pinned } : i,
          ),
        }));
        const r = ve();
        r && r.emit("chat:pin", { chatId: n });
      } catch (r) {
        throw (console.error("Error pinning chat:", r), r);
      }
    },
    blockUser: async (n, r) => {
      try {
        (await bt.block(n, r),
          t((i) => {
            const a = JSON.parse(localStorage.getItem("user") || "{}");
            return {
              chats: i.chats.map((c) =>
                c.id === n ? { ...c, blocked: !0, blockedBy: a.id } : c,
              ),
            };
          }));
        const s = ve();
        s && s.emit("user:block", { chatId: n, blockedUserId: r });
      } catch (s) {
        throw (console.error("Error blocking user:", s), s);
      }
    },
    unblockUser: async (n, r) => {
      try {
        (await bt.unblock(n, r),
          t((i) => ({
            chats: i.chats.map((a) =>
              a.id === n ? { ...a, blocked: !1, blockedBy: void 0 } : a,
            ),
          })));
        const s = ve();
        s && s.emit("user:unblock", { chatId: n, blockedUserId: r });
      } catch (s) {
        throw (console.error("Error unblocking user:", s), s);
      }
    },
    toggleArchiveView: () => {
      t((n) => ({ showArchived: !n.showArchived }));
    },
    handleNewMessage: (n) => {
      var s;
      const r = (s = Ue.getState().user) == null ? void 0 : s.id;
      t((i) => {
        var b;
        const a = i.messages[n.chatId] || [],
          c = a.findIndex((w) => w.id === n.tempId);
        let d,
          l = !1;
        if (c !== -1)
          ((d = [...a]), (d[c] = { ...n, status: "delivered" }), (l = !0));
        else {
          if (a.some((p) => p.id === n.id))
            return {
              chats: i.chats.map((x) =>
                x.id === n.chatId
                  ? {
                      ...x,
                      lastMessage: n,
                      lastMessageText: n.text,
                      lastMessageTime: n.createdAt,
                    }
                  : x,
              ),
            };
          n.userId === r
            ? ((d = [...a, { ...n, status: "delivered" }]), (l = !0))
            : (d = [...a, { ...n, status: "sent" }]);
        }
        i.chats.some((w) => w.id === n.chatId) ||
          bt
            .getById(n.chatId)
            .then((w) => {
              t((p) =>
                p.chats.some((x) => x.id === w.id)
                  ? p
                  : { chats: [...p.chats, w] },
              );
            })
            .catch(() => {});
        const m = i.chats.map((w) =>
          w.id === n.chatId
            ? {
                ...w,
                lastMessage: n,
                lastMessageText: n.text,
                lastMessageTime: n.createdAt,
                updatedAt: new Date(),
                unreadCount:
                  l || i.currentChatId === n.chatId
                    ? w.unreadCount || 0
                    : (w.unreadCount || 0) + 1,
              }
            : w,
        );
        if (!l && n.userId !== r && i.currentChatId !== n.chatId) {
          const w = i.chats.find((p) => p.id === n.chatId);
          if (w && !w.muted) {
            const p =
              w.type === "private"
                ? ((b = w.participants.find((x) => x.id !== r)) == null
                    ? void 0
                    : b.fullName) ||
                  w.name ||
                  "Чат"
                : w.name || "Группа";
            mh(p, n.text, n.chatId);
          }
        }
        return { messages: { ...i.messages, [n.chatId]: d }, chats: m };
      });
    },
    handleMessageEdited: ({ messageId: n, text: r, editedAt: s }) => {
      t((i) => {
        const a = { ...i.messages };
        for (const d in a)
          a[d] = a[d].map((l) =>
            l.id === n
              ? { ...l, text: r, edited: !0, editedAt: new Date(s) }
              : l,
          );
        const c = i.chats.map((d) => {
          var l;
          return ((l = d.lastMessage) == null ? void 0 : l.id) === n
            ? {
                ...d,
                lastMessage: { ...d.lastMessage, text: r },
                lastMessageText: r,
              }
            : d;
        });
        return { messages: a, chats: c };
      });
    },
    handleMessageDeleted: ({ messageId: n, chatId: r }) => {
      t((s) => {
        const i = (s.messages[r] || []).filter((c) => c.id !== n),
          a = i[i.length - 1];
        return {
          messages: { ...s.messages, [r]: i },
          chats: s.chats.map((c) =>
            c.id === r
              ? {
                  ...c,
                  lastMessage: a || null,
                  lastMessageText: (a == null ? void 0 : a.text) || "",
                  lastMessageTime: a == null ? void 0 : a.createdAt,
                }
              : c,
          ),
        };
      });
    },
    handleUserTyping: ({ userId: n, chatId: r }) => {
      (t((s) => ({
        typingUsers: {
          ...s.typingUsers,
          [r]: [...(s.typingUsers[r] || []), n].filter(
            (i, a, c) => c.indexOf(i) === a,
          ),
        },
      })),
        setTimeout(() => {
          e().handleUserStopTyping({ userId: n, chatId: r });
        }, 3e3));
    },
    handleUserStopTyping: ({ userId: n, chatId: r }) => {
      t((s) => ({
        typingUsers: {
          ...s.typingUsers,
          [r]: (s.typingUsers[r] || []).filter((i) => i !== n),
        },
      }));
    },
    handleNewChat: (n) => {
      t((r) =>
        r.chats.some((s) => s.id === n.id)
          ? r
          : { chats: [...r.chats, n], messages: { ...r.messages, [n.id]: [] } },
      );
    },
    handleChatDeleted: (n) => {
      t((r) => {
        const s = { ...r.messages };
        return (
          delete s[n],
          {
            chats: r.chats.filter((i) => i.id !== n),
            messages: s,
            currentChatId: r.currentChatId === n ? null : r.currentChatId,
          }
        );
      });
    },
    handleChatArchived: (n) => {
      t((r) => ({
        chats: r.chats.map((s) => (s.id === n ? { ...s, archived: !0 } : s)),
        currentChatId: r.currentChatId === n ? null : r.currentChatId,
      }));
    },
    handleChatUnarchived: (n) => {
      t((r) => ({
        chats: r.chats.map((s) => (s.id === n ? { ...s, archived: !1 } : s)),
      }));
    },
    handleUserBlocked: (n) => {
      const r = n.blockerId;
      t((s) => ({
        chats: s.chats.map((i) =>
          i.id === n.chatId ? { ...i, blocked: !0, blockedBy: r } : i,
        ),
      }));
    },
    handleUserUnblocked: (n) => {
      t((r) => ({
        chats: r.chats.map((s) =>
          s.id === n.chatId ? { ...s, blocked: !1, blockedBy: void 0 } : s,
        ),
      }));
    },
    handleUserStatusUpdate: (n) => {
      (vr.set(n.userId, { status: n.status, lastSeen: n.lastSeen }),
        t((s) => ({
          chats: s.chats.map((i) =>
            i.participants.some((c) => c.id === n.userId)
              ? {
                  ...i,
                  participants: i.participants.map((c) =>
                    c.id === n.userId
                      ? { ...c, status: n.status, lastSeen: n.lastSeen }
                      : c,
                  ),
                }
              : i,
          ),
        })));
      const { updateContactUser: r } = dt.getState();
      r(n.userId, { status: n.status, lastSeen: n.lastSeen });
    },
    handleUserProfileUpdate: (n) => {
      const r = {};
      (n.avatar !== void 0 && (r.avatar = n.avatar),
        n.fullName !== void 0 && (r.fullName = n.fullName),
        n.username !== void 0 && (r.username = n.username),
        n.bio !== void 0 && (r.bio = n.bio),
        n.status !== void 0 && (r.status = n.status),
        n.lastSeen !== void 0 && (r.lastSeen = n.lastSeen),
        t((i) => ({
          chats: i.chats.map((a) =>
            a.participants.some((d) => d.id === n.userId)
              ? {
                  ...a,
                  participants: a.participants.map((d) =>
                    d.id === n.userId ? { ...d, ...r } : d,
                  ),
                }
              : a,
          ),
        })));
      const { updateContactUser: s } = dt.getState();
      s(n.userId, r);
    },
    handleMessageReadUpdate: ({ chatId: n, userId: r }) => {
      var i;
      const s = (i = Ue.getState().user) == null ? void 0 : i.id;
      r !== s &&
        t((a) => {
          const c = (a.messages[n] || []).map((d) =>
            d.userId === s && d.status !== "read"
              ? {
                  ...d,
                  read: !0,
                  readCount: (d.readCount || 0) + 1,
                  status: "read",
                }
              : d,
          );
          return (
            c[c.length - 1],
            {
              messages: { ...a.messages, [n]: c },
              chats: a.chats.map((d) =>
                d.id === n && d.lastMessage
                  ? { ...d, lastMessage: { ...d.lastMessage, status: "read" } }
                  : d,
              ),
            }
          );
        });
    },
    initSocketHandlers: () => {
      let n = ve();
      if (!n) {
        const r = Ue.getState().token;
        r && (Jt(r), (n = ve()));
      }
      if (!n) {
        console.warn("Socket not available for handlers initialization");
        return;
      }
      (n.off("message:new"),
        n.off("message:edited"),
        n.off("message:deleted"),
        n.off("typing:user"),
        n.off("typing:user:stop"),
        n.off("chat:new"),
        n.off("chat:deleted"),
        n.off("chat:archived"),
        n.off("chat:unarchived"),
        n.off("user:status"),
        n.off("user:profileUpdate"),
        n.off("user:blocked"),
        n.off("user:unblocked"),
        n.off("message:read:update"),
        n.off("connect"),
        n.off("admin:notification"),
        n.off("admin:notification:remove"),
        n.off("user:badgeUpdate"),
        n.on("message:new", (r) => e().handleNewMessage(r)),
        n.on("message:edited", (r) => e().handleMessageEdited(r)),
        n.on("message:deleted", (r) => e().handleMessageDeleted(r)),
        n.on("message:read:update", (r) => e().handleMessageReadUpdate(r)),
        n.on("typing:user", (r) => e().handleUserTyping(r)),
        n.on("typing:user:stop", (r) => e().handleUserStopTyping(r)),
        n.on("chat:new", (r) => e().handleNewChat(r)),
        n.on("chat:deleted", (r) => e().handleChatDeleted(r.chatId)),
        n.on("chat:archived", (r) => e().handleChatArchived(r.chatId)),
        n.on("chat:unarchived", (r) => e().handleChatUnarchived(r.chatId)),
        n.on("user:status", (r) => e().handleUserStatusUpdate(r)),
        n.on("user:profileUpdate", (r) => e().handleUserProfileUpdate(r)),
        n.on("user:blocked", (r) => e().handleUserBlocked(r)),
        n.on("user:unblocked", (r) => e().handleUserUnblocked(r)),
        n.on("admin:notification", (r) => Nn.getState().addBanner(r)),
        n.on("admin:notification:remove", ({ id: r }) =>
          Nn.getState().removeBanner(r),
        ),
        n.on("user:badgeUpdate", (r) => {
          t((a) => ({
            chats: a.chats.map((c) => {
              var d;
              return {
                ...c,
                participants:
                  ((d = c.participants) == null
                    ? void 0
                    : d.map((l) =>
                        l.id === r.userId ? { ...l, badge: r.badge } : l,
                      )) || [],
              };
            }),
          }));
          const { useAuthStore: s } = require("./authStore"),
            i = s.getState();
          i.user && i.user.id === r.userId && i.updateUser({ badge: r.badge });
        }),
        n.on("connect", () => {
          (Io && e().syncAll(), (Io = !0));
        }));
    },
    syncAll: () => {
      (hh() || (uh(), e().initSocketHandlers()), e().loadChats());
      const n = e().currentChatId;
      n && e().loadMessages(n);
    },
  })),
  Ue = ht()(
    Xr(
      (t) => ({
        user: null,
        token: null,
        isAuthenticated: !1,
        isLoading: !1,
        error: null,
        banned: !1,
        banReason: "",
        login: async (e, n) => {
          var r, s, i, a, c;
          t({ isLoading: !0, error: null });
          try {
            const { token: d, user: l } = await Bt.login(e, n);
            (localStorage.setItem("token", d),
              Jt(d),
              t({ user: l, token: d, isAuthenticated: !0, isLoading: !1 }));
          } catch (d) {
            throw (
              ((r = d.response) == null ? void 0 : r.status) === 403 &&
              ((i = (s = d.response) == null ? void 0 : s.data) == null
                ? void 0
                : i.error) === "banned"
                ? t({
                    banned: !0,
                    banReason: d.response.data.reason || "",
                    isLoading: !1,
                    error: null,
                  })
                : t({
                    error:
                      ((c = (a = d.response) == null ? void 0 : a.data) == null
                        ? void 0
                        : c.error) || "Ошибка при входе",
                    isLoading: !1,
                  }),
              d
            );
          }
        },
        register: async (e, n, r) => {
          var s, i;
          t({ isLoading: !0, error: null });
          try {
            const { token: a, user: c } = await Bt.register(e, n, r);
            (localStorage.setItem("token", a),
              Jt(a),
              t({ user: c, token: a, isAuthenticated: !0, isLoading: !1 }));
          } catch (a) {
            throw (
              t({
                error:
                  ((i = (s = a.response) == null ? void 0 : s.data) == null
                    ? void 0
                    : i.error) || "Ошибка при регистрации",
                isLoading: !1,
              }),
              a
            );
          }
        },
        logout: () => {
          (localStorage.removeItem("token"),
            dh(),
            Ve.getState().reset(),
            dt.getState().reset(),
            t({ user: null, token: null, isAuthenticated: !1 }));
        },
        updateUser: (e) =>
          t((n) => ({ user: n.user ? { ...n.user, ...e } : null })),
        updateProfile: async (e) => {
          var n, r;
          t({ isLoading: !0, error: null });
          try {
            const s = await Bt.updateProfile(e);
            t({ user: s, isLoading: !1 });
          } catch (s) {
            throw (
              console.error("Error updating profile:", s),
              t({
                error:
                  ((r = (n = s.response) == null ? void 0 : n.data) == null
                    ? void 0
                    : r.error) || "Ошибка при обновлении профиля",
                isLoading: !1,
              }),
              s
            );
          }
        },
        changePassword: async (e, n) => {
          var r, s;
          t({ isLoading: !0, error: null });
          try {
            (await Bt.changePassword(e, n), t({ isLoading: !1 }));
          } catch (i) {
            throw (
              t({
                error:
                  ((s = (r = i.response) == null ? void 0 : r.data) == null
                    ? void 0
                    : s.error) || "Ошибка при смене пароля",
                isLoading: !1,
              }),
              i
            );
          }
        },
        checkAuth: async () => {
          var n, r, s;
          const e = localStorage.getItem("token");
          if (!e) {
            t({ isAuthenticated: !1 });
            return;
          }
          try {
            const { user: i } = await Bt.verify();
            (Jt(e),
              t({
                user: i,
                token: e,
                isAuthenticated: !0,
                banned: !1,
                banReason: "",
              }));
          } catch (i) {
            ((n = i.response) == null ? void 0 : n.status) === 403 &&
            ((s = (r = i.response) == null ? void 0 : r.data) == null
              ? void 0
              : s.error) === "banned"
              ? (localStorage.removeItem("token"),
                t({
                  user: null,
                  token: null,
                  isAuthenticated: !1,
                  banned: !0,
                  banReason: i.response.data.reason || "",
                }))
              : (localStorage.removeItem("token"),
                t({ user: null, token: null, isAuthenticated: !1 }));
          }
        },
      }),
      {
        name: "auth-storage",
        partialize: (t) => ({
          user: t.user,
          token: t.token,
          isAuthenticated: t.isAuthenticated,
        }),
      },
    ),
  ),
  rn = ht()(
    Xr(
      (t) => ({
        theme: "dark",
        fontSize: "medium",
        language: "ru",
        customColors: {
          primary: "#FF6B6B",
          secondary: "#4ECDC4",
          background: "#2C3E50",
          paper: "#34495E",
        },
        notifications: { messages: !0, mentions: !0, calls: !0, sound: !0 },
        privacy: { showOnlineStatus: !0, showLastSeen: !0, readReceipts: !0 },
        autoDownload: {
          photosWifi: !0,
          photosData: !0,
          videosWifi: !0,
          videosData: !1,
          filesWifi: !0,
          filesData: !1,
          audioWifi: !0,
          audioData: !0,
        },
        privacySettings: {
          lastSeen: {
            value: "everybody",
            alwaysShareWith: [],
            neverShareWith: [],
          },
          profilePhoto: {
            value: "everybody",
            alwaysShareWith: [],
            neverShareWith: [],
          },
          bio: { value: "everybody", alwaysShareWith: [], neverShareWith: [] },
          searchByUsername: {
            value: "everybody",
            alwaysShareWith: [],
            neverShareWith: [],
          },
          hideReadTime: !1,
        },
        chatWallpaper: null,
        bgEffect: "snow",
        glowMode: !1,
        setTheme: (e) => t({ theme: e }),
        setFontSize: (e) => t({ fontSize: e }),
        setLanguage: (e) => t({ language: e }),
        setCustomColors: (e) => t({ customColors: e }),
        updateNotifications: (e) =>
          t((n) => ({ notifications: { ...n.notifications, ...e } })),
        updatePrivacy: (e) => t((n) => ({ privacy: { ...n.privacy, ...e } })),
        updateAutoDownload: (e) =>
          t((n) => ({ autoDownload: { ...n.autoDownload, ...e } })),
        updatePrivacyRule: (e, n) => {
          t((i) => ({
            privacySettings: {
              ...i.privacySettings,
              [e]: { ...i.privacySettings[e], ...n },
            },
          }));
          const s = rn.getState().privacySettings[e];
          _o.updateSetting(
            e,
            s.value,
            s.alwaysShareWith,
            s.neverShareWith,
          ).catch(() => {});
        },
        setHideReadTime: (e) =>
          t((n) => ({
            privacySettings: { ...n.privacySettings, hideReadTime: e },
          })),
        loadPrivacyFromServer: async () => {
          try {
            const e = await _o.getSettings();
            t((n) => {
              const r = { ...n.privacySettings };
              return (
                ["lastSeen", "profilePhoto", "bio", "searchByUsername"].forEach(
                  (i) => {
                    e[i] &&
                      (r[i] = {
                        value: e[i].value || "everybody",
                        alwaysShareWith: e[i].alwaysShareWith || [],
                        neverShareWith: e[i].neverShareWith || [],
                      });
                  },
                ),
                { privacySettings: r }
              );
            });
          } catch {}
        },
        setChatWallpaper: (e) => t({ chatWallpaper: e }),
        setBgEffect: (e) => t({ bgEffect: e }),
        setGlowMode: (e) => t({ glowMode: e }),
      }),
      { name: "settings-storage" },
    ),
  ),
  Mo = 0.15,
  Do = 30;
function Sh(t) {
  let e = t;
  for (; e && e !== document.body; ) {
    const r = getComputedStyle(e).overflowY;
    if ((r === "auto" || r === "scroll") && e.scrollHeight > e.clientHeight)
      return e;
    e = e.parentElement;
  }
  return null;
}
function Ch() {
  let t = null,
    e = 0,
    n = 0,
    r = !1,
    s = null;
  const i = (l) => {
      ((l.style.transition = ""),
        (l.style.transform = ""),
        (l.style.willChange = ""));
    },
    a = (l) => {
      (s && (clearTimeout(s), (s = null)), t && i(t));
      const u = Sh(l.target);
      if (!u) {
        t = null;
        return;
      }
      ((t = u), i(t), (e = l.touches[0].clientY), (n = t.scrollTop), (r = !1));
    },
    c = (l) => {
      if (!t) return;
      const m = l.touches[0].clientY - e,
        b = Math.max(0, t.scrollHeight - t.clientHeight),
        w = n - m;
      let p = 0;
      if (
        (w < 0
          ? (p = Math.min(-w * Mo, Do))
          : w > b && (p = -Math.min((w - b) * Mo, Do)),
        p === 0)
      ) {
        r && (i(t), (r = !1));
        return;
      }
      ((r = !0),
        (t.style.willChange = "transform"),
        (t.style.transform = `translate3d(0, ${p}px, 0)`));
    },
    d = () => {
      if (t && r) {
        ((t.style.transition =
          "transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)"),
          (t.style.transform = "translate3d(0, 0, 0)"));
        const l = t;
        s = setTimeout(() => {
          (i(l), (s = null));
        }, 300);
      } else t && i(t);
      ((r = !1), (t = null));
    };
  return (
    document.addEventListener("touchstart", a, { passive: !0 }),
    document.addEventListener("touchmove", c, { passive: !0 }),
    document.addEventListener("touchend", d, { passive: !0 }),
    document.addEventListener("touchcancel", d, { passive: !0 }),
    () => {
      (document.removeEventListener("touchstart", a),
        document.removeEventListener("touchmove", c),
        document.removeEventListener("touchend", d),
        document.removeEventListener("touchcancel", d),
        s && clearTimeout(s),
        t && i(t),
        (r = !1),
        (t = null));
    }
  );
}
const ut = new Map(),
  at = new Set();
function Fg(t) {
  return ut.get(t) || null;
}
function zg(t, e) {
  ut.set(t, e);
}
async function kh(t) {
  const e = ut.get(t);
  if (e) return e;
  if (at.has(t)) return null;
  at.add(t);
  try {
    const n = await cs.getById(t);
    return (n && ut.set(t, n), n);
  } catch {
    return null;
  } finally {
    at.delete(t);
  }
}
function Eh(t) {
  for (const e of t) !ut.has(e) && !at.has(e) && kh(e);
}
async function jh() {
  const t = Array.from(ut.keys());
  for (const e of t)
    if (!at.has(e)) {
      at.add(e);
      try {
        const n = await cs.getById(e);
        n && ut.set(e, n);
      } catch {}
      at.delete(e);
    }
}
const ta = Kr({
    palette: {
      mode: "dark",
      primary: { main: "#8774E1", light: "#A89BEC", dark: "#6C5CE7" },
      secondary: { main: "#8774E1", light: "#9C88FF", dark: "#6C5CE7" },
      background: { default: "#0E1621", paper: "#17212B" },
      text: { primary: "#F5F5F5", secondary: "#708499" },
      divider: "rgba(255,255,255,0.06)",
    },
    typography: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Roboto", "Apple Color Emoji", "Segoe UI", "Oxygen", "Ubuntu", "Helvetica Neue", Arial, sans-serif',
      h1: { fontSize: "2.5rem", fontWeight: 600 },
      h2: { fontSize: "2rem", fontWeight: 600 },
      h3: { fontSize: "1.5rem", fontWeight: 600 },
      body1: { fontSize: "0.9375rem" },
      body2: { fontSize: "0.875rem" },
    },
    shape: { borderRadius: 10 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: "none", borderRadius: 10, fontWeight: 500 },
        },
      },
      MuiPaper: {
        styleOverrides: { root: { backgroundImage: "none", borderRadius: 12 } },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundImage: "none",
            borderRadius: 12,
            boxShadow:
              "0 8px 40px rgba(0,0,0,0.5), 0 0 24px rgba(135,116,225,0.12), 0 0 0 1px rgba(135,116,225,0.08)",
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundImage: "none",
            boxShadow:
              "0 4px 24px rgba(0,0,0,0.45), 0 0 16px rgba(135,116,225,0.1)",
            borderRadius: 10,
            minWidth: "140px !important",
            maxWidth: 210,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: "0.8rem",
            paddingTop: 12,
            paddingBottom: 12,
            paddingLeft: 16,
            paddingRight: 24,
            gap: 14,
            textShadow:
              "0 0 8px rgba(135,116,225,0.5), 0 0 16px rgba(135,116,225,0.2)",
            "& .MuiSvgIcon-root": {
              fontSize: "22px !important",
              marginRight: "0px !important",
              filter: "drop-shadow(0 0 4px rgba(135,116,225,0.4))",
            },
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            "&.Mui-selected": { backgroundColor: "rgba(135, 116, 225, 0.15)" },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: { "& .MuiOutlinedInput-root": { borderRadius: 12 } },
        },
      },
      MuiChip: { styleOverrides: { root: { borderRadius: 10 } } },
      MuiSwitch: {
        styleOverrides: {
          root: {
            "& .MuiSwitch-switchBase.Mui-checked": { color: "#8774E1" },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#8774E1",
            },
          },
        },
      },
      MuiCard: { styleOverrides: { root: { borderRadius: 12 } } },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            transition: "transform 0.15s ease, background-color 0.15s ease",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            boxShadow:
              "4px 0 32px rgba(0,0,0,0.5), 0 0 20px rgba(135,116,225,0.08)",
          },
        },
      },
    },
  }),
  Rh = Kr({
    palette: {
      mode: "light",
      primary: { main: "#8774E1", light: "#A89BEC", dark: "#6C5CE7" },
      secondary: { main: "#8774E1", light: "#9C88FF", dark: "#6C5CE7" },
      background: { default: "#F0F0F0", paper: "#FFFFFF" },
      text: { primary: "#1A1A1A", secondary: "#6B7C8A" },
      divider: "rgba(0,0,0,0.08)",
    },
    typography: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Roboto", "Apple Color Emoji", "Segoe UI", "Oxygen", "Ubuntu", "Helvetica Neue", Arial, sans-serif',
      h1: { fontSize: "2.5rem", fontWeight: 600 },
      h2: { fontSize: "2rem", fontWeight: 600 },
      h3: { fontSize: "1.5rem", fontWeight: 600 },
      body1: { fontSize: "0.9375rem" },
      body2: { fontSize: "0.875rem" },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: "none", borderRadius: 8, fontWeight: 500 },
        },
      },
      MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
      MuiDialog: { styleOverrides: { paper: { backgroundImage: "none" } } },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundImage: "none",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.12)",
            minWidth: "140px !important",
            maxWidth: 220,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: "0.88rem",
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 14,
            paddingRight: 14,
          },
        },
      },
    },
  }),
  _h = (t, e) => {
    switch (t) {
      case "light":
        return Rh;
      case "custom":
        return Ah(e);
      case "dark":
      default:
        return ta;
    }
  },
  Ah = (t) => {
    const n = t || {
      primary: "#FF6B6B",
      secondary: "#4ECDC4",
      background: "#2C3E50",
      paper: "#34495E",
    };
    return Kr({
      palette: {
        mode: "dark",
        primary: { main: n.primary, light: n.primary, dark: n.primary },
        secondary: { main: n.secondary, light: n.secondary, dark: n.secondary },
        background: { default: n.background, paper: n.paper },
        text: { primary: "#ffffff", secondary: "#BDC3C7" },
      },
      typography: {
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Roboto", "Apple Color Emoji", "Segoe UI", "Oxygen", "Ubuntu", "Helvetica Neue", Arial, sans-serif',
        h1: { fontSize: "2.5rem", fontWeight: 600 },
        h2: { fontSize: "2rem", fontWeight: 600 },
        h3: { fontSize: "1.5rem", fontWeight: 600 },
        body1: { fontSize: "0.9375rem" },
        body2: { fontSize: "0.875rem" },
      },
      shape: { borderRadius: 12 },
      components: {
        MuiButton: {
          styleOverrides: {
            root: { textTransform: "none", borderRadius: 8, fontWeight: 500 },
          },
        },
        MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
        MuiDialog: { styleOverrides: { paper: { backgroundImage: "none" } } },
        MuiMenu: {
          styleOverrides: {
            paper: {
              backgroundImage: "none",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
            },
          },
        },
      },
    });
  },
  Th = () => {
    const { login: t, register: e, isLoading: n, error: r } = Ue(),
      [s, i] = h.useState(!0),
      [a, c] = h.useState(""),
      [d, l] = h.useState(""),
      [u, m] = h.useState(""),
      [b, w] = h.useState(""),
      [p, x] = h.useState(!1),
      g = (T) =>
        T.length < 6
          ? "Минимум 6 символов"
          : /^[a-zA-Z0-9_]+$/.test(T)
            ? ""
            : "Только латиница, цифры и _",
      k = (T) => {
        const M = T.replace(/[^a-zA-Z0-9_]/g, "");
        (c(M), l(s && M ? g(M) : ""));
      },
      E = async (T) => {
        if ((T.preventDefault(), s)) {
          const M = g(a);
          if (M) {
            l(M);
            return;
          }
          await e(a, u, b);
        } else await t(a, b);
      };
    return o.jsx(Qo, {
      theme: ta,
      children: o.jsxs(y, {
        sx: {
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
          backgroundColor: "#0E1621",
        },
        children: [
          o.jsx(y, {
            sx: {
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #8774E1 0%, #6C5CE7 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            },
            children: o.jsx(A, {
              sx: { fontSize: "2rem", color: "#fff", fontWeight: 700 },
              children: "L",
            }),
          }),
          o.jsx(A, {
            variant: "h5",
            sx: { fontWeight: 600, mb: 0.5, color: "#F5F5F5" },
            children: "Leet",
          }),
          o.jsx(A, {
            variant: "body2",
            sx: { color: "#708499", mb: 4, textAlign: "center" },
            children: s ? "Создайте аккаунт" : "Войдите в свой аккаунт",
          }),
          o.jsxs(y, {
            component: "form",
            onSubmit: E,
            sx: { width: "100%", maxWidth: 360 },
            children: [
              o.jsx(ot, {
                fullWidth: !0,
                label: "Имя пользователя",
                value: a,
                onChange: (T) => k(T.target.value),
                error: s && !!d,
                helperText: s ? d : "",
                sx: { mb: 2 },
                autoComplete: "username",
              }),
              s &&
                o.jsx(ot, {
                  fullWidth: !0,
                  label: "Полное имя",
                  value: u,
                  onChange: (T) => m(T.target.value),
                  sx: { mb: 2 },
                }),
              o.jsx(ot, {
                fullWidth: !0,
                label: "Пароль",
                type: p ? "text" : "password",
                value: b,
                onChange: (T) => w(T.target.value),
                sx: { mb: 2 },
                autoComplete: s ? "new-password" : "current-password",
                InputProps: {
                  endAdornment: o.jsx(jr, {
                    position: "end",
                    children: o.jsx(X, {
                      onClick: () => x(!p),
                      edge: "end",
                      size: "small",
                      children: p ? o.jsx(oc, {}) : o.jsx(ic, {}),
                    }),
                  }),
                },
              }),
              r &&
                o.jsx(A, {
                  variant: "body2",
                  sx: { color: "#e53935", mb: 2, textAlign: "center" },
                  children: r,
                }),
              o.jsx(Ee, {
                fullWidth: !0,
                type: "submit",
                variant: "contained",
                disabled: n || !a || !b || (s && !u) || (s && !!d),
                sx: {
                  py: 1.5,
                  mb: 2,
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #8774E1 0%, #6C5CE7 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #6C5CE7 0%, #5A4BD1 100%)",
                  },
                  "&:disabled": { background: "rgba(135, 116, 225, 0.3)" },
                },
                children: n
                  ? o.jsx(Ct, { size: 24, sx: { color: "#fff" } })
                  : s
                    ? "Зарегистрироваться"
                    : "Войти",
              }),
              o.jsx(Ee, {
                fullWidth: !0,
                variant: "text",
                onClick: () => i(!s),
                sx: {
                  color: "#8774E1",
                  textTransform: "none",
                  fontSize: "0.9rem",
                },
                children: s
                  ? "Уже есть аккаунт? Войти"
                  : "Нет аккаунта? Создать",
              }),
            ],
          }),
        ],
      }),
    });
  };
var ls = {},
  Sr = {};
const Ph = Kc(ac);
var Lo;
function Pe() {
  return (
    Lo ||
      ((Lo = 1),
      (function (t) {
        "use client";
        (Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "default", {
            enumerable: !0,
            get: function () {
              return e.createSvgIcon;
            },
          }));
        var e = Ph;
      })(Sr)),
    Sr
  );
}
var Ih = Te;
Object.defineProperty(ls, "__esModule", { value: !0 });
var ds = (ls.default = void 0),
  Mh = Ih(Pe()),
  Dh = o;
ds = ls.default = (0, Mh.default)(
  (0, Dh.jsx)("path", {
    d: "M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5z",
  }),
  "Shield",
);
const Lh = "http://217.114.11.48:3001",
  Oh = "avatar-cache",
  Rt = "blobs",
  Nh = 1;
let vn = null;
function na() {
  return (
    vn ||
    ((vn = new Promise((t, e) => {
      const n = indexedDB.open(Oh, Nh);
      ((n.onupgradeneeded = () => {
        const r = n.result;
        r.objectStoreNames.contains(Rt) || r.createObjectStore(Rt);
      }),
        (n.onsuccess = () => t(n.result)),
        (n.onerror = () => e(n.error)));
    })),
    vn)
  );
}
async function Fh(t) {
  try {
    const e = await na();
    return new Promise((n) => {
      const s = e.transaction(Rt, "readonly").objectStore(Rt).get(t);
      ((s.onsuccess = () => n(s.result)), (s.onerror = () => n(void 0)));
    });
  } catch {
    return;
  }
}
async function zh(t, e) {
  try {
    (await na()).transaction(Rt, "readwrite").objectStore(Rt).put(e, t);
  } catch {}
}
const qt = new Map(),
  wt = new Map(),
  $r = new Set();
function Bh(t) {
  return (
    $r.add(t),
    () => {
      $r.delete(t);
    }
  );
}
function Oo(t, e) {
  $r.forEach((n) => n(t, e));
}
function No(t) {
  if (!t) return;
  const e = Jn(t);
  return qt.get(e);
}
function Fn(t) {
  if (!t) return Promise.resolve(null);
  const e = Jn(t);
  if (qt.has(e)) return Promise.resolve(qt.get(e));
  if (wt.has(e)) return wt.get(e);
  const n = (async () => {
    const r = await Fh(e);
    if (r) {
      const s = URL.createObjectURL(r);
      return (qt.set(e, s), wt.delete(e), Oo(e, s), s);
    }
    try {
      const s = await fetch(e, { mode: "cors" });
      if (!s.ok) throw new Error(`HTTP ${s.status}`);
      const i = await s.blob(),
        a = URL.createObjectURL(i);
      return (qt.set(e, a), wt.delete(e), Oo(e, a), zh(e, i), a);
    } catch {
      return (wt.delete(e), null);
    }
  })();
  return (wt.set(e, n), n);
}
function Uh(t) {
  t.forEach((e) => {
    e && (Fn(Wr(e)), Fn(ra(e)));
  });
}
function Jn(t) {
  return t.startsWith("http") ? t : `${Lh}${t}`;
}
function Wr(t) {
  if (!t) return;
  const e = Jn(t),
    n = e.match(/\/uploads\/images\/(.+)$/);
  return n
    ? e.replace(`/uploads/images/${n[1]}`, `/uploads/thumbnails/thumb-${n[1]}`)
    : e;
}
function ra(t) {
  if (t) return Jn(t);
}
const Fo = [
  "linear-gradient(135deg, #FF6B6B, #EE5A24)",
  "linear-gradient(135deg, #7C4DFF, #536DFE)",
  "linear-gradient(135deg, #00BFA5, #00E676)",
  "linear-gradient(135deg, #FF9800, #F57C00)",
  "linear-gradient(135deg, #E91E63, #AD1457)",
  "linear-gradient(135deg, #00BCD4, #0097A7)",
  "linear-gradient(135deg, #8774E1, #6C5CE7)",
  "linear-gradient(135deg, #26C6DA, #00ACC1)",
];
function $h(t) {
  let e = 0;
  for (let n = 0; n < t.length; n++) e = t.charCodeAt(n) + ((e << 5) - e);
  return Fo[Math.abs(e) % Fo.length];
}
const Wh = ({
    src: t,
    name: e,
    size: n = 54,
    sx: r,
    onClick: s,
    className: i,
  }) => {
    var g;
    const a = ra(t),
      [c, d] = h.useState(() => No(a)),
      [l, u] = h.useState(!!c),
      m = h.useRef(a);
    (h.useEffect(() => {
      if (a !== m.current) {
        m.current = a;
        const k = No(a);
        k ? (d(k), u(!0)) : (d(void 0), u(!1), a && Fn(a));
      } else a && !c && Fn(a);
    }, [a]),
      h.useEffect(
        () =>
          !a || c
            ? void 0
            : Bh((E, T) => {
                E === a && (d(T), requestAnimationFrame(() => u(!0)));
              }),
        [a, c],
      ));
    const b = $h(e || "?"),
      w = ((g = (e || "?")[0]) == null ? void 0 : g.toUpperCase()) || "?",
      p = !!a,
      x = p && c;
    return o.jsxs("div", {
      onClick: s,
      className: i,
      style: {
        width: n,
        height: n,
        minWidth: n,
        minHeight: n,
        borderRadius: "50%",
        background: x ? void 0 : b,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        cursor: s ? "pointer" : void 0,
        flexShrink: 0,
        ...r,
      },
      children: [
        !p &&
          o.jsx("span", {
            style: {
              color: "#fff",
              fontSize: n * 0.38,
              fontWeight: 600,
              letterSpacing: "0.02em",
              lineHeight: 1,
              userSelect: "none",
            },
            children: w,
          }),
        x &&
          o.jsx("img", {
            src: c,
            alt: "",
            draggable: !1,
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
              opacity: l ? 1 : 0,
              transition: "opacity 150ms ease-in",
            },
          }),
      ],
    });
  },
  St = je.memo(Wh);
var us = {},
  Hh = Te;
Object.defineProperty(us, "__esModule", { value: !0 });
var sa = (us.default = void 0),
  qh = Hh(Pe()),
  Vh = o;
sa = us.default = (0, qh.default)(
  (0, Vh.jsx)("path", {
    d: "M9.68 13.69 12 11.93l2.31 1.76-.88-2.85L15.75 9h-2.84L12 6.19 11.09 9H8.25l2.31 1.84zM20 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28V23l6-2 6 2v-7.72c1.24-1.41 2-3.25 2-5.28m-8-6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6",
  }),
  "WorkspacePremium",
);
var hs = {},
  Kh = Te;
Object.defineProperty(hs, "__esModule", { value: !0 });
var oa = (hs.default = void 0),
  Yh = Kh(Pe()),
  Jh = o;
oa = hs.default = (0, Yh.default)(
  (0, Jh.jsx)("path", {
    fillRule: "evenodd",
    d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m4.9 13.49-1.4 1.4c-.2.2-.51.2-.71 0l-3.41-3.41c-1.22.43-2.64.17-3.62-.81-1.11-1.11-1.3-2.79-.59-4.1l2.35 2.35 1.41-1.41-2.35-2.34c1.32-.71 2.99-.52 4.1.59.98.98 1.24 2.4.81 3.62l3.41 3.41c.19.19.19.51 0 .7",
  }),
  "BuildCircle",
);
var fs = {},
  Xh = Te;
Object.defineProperty(fs, "__esModule", { value: !0 });
var ia = (fs.default = void 0),
  Gh = Xh(Pe()),
  Qh = o;
ia = fs.default = (0, Gh.default)(
  (0, Qh.jsx)("path", {
    d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2m4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23z",
  }),
  "Stars",
);
const zo = {
    admin: {
      Icon: sa,
      label: "Admin",
      color: "#FFD700",
      bgDark: "rgba(255,215,0,0.18)",
      bgLight: "rgba(255,180,0,0.14)",
      glowDark: "rgba(255,215,0,0.55)",
      glowLight: "rgba(255,180,0,0.35)",
    },
    support: {
      Icon: ds,
      label: "Support",
      color: "#64B5F6",
      bgDark: "rgba(100,181,246,0.18)",
      bgLight: "rgba(33,150,243,0.12)",
      glowDark: "rgba(100,181,246,0.5)",
      glowLight: "rgba(33,150,243,0.3)",
    },
    tech: {
      Icon: oa,
      label: "Tech",
      color: "#81C784",
      bgDark: "rgba(129,199,132,0.18)",
      bgLight: "rgba(76,175,80,0.12)",
      glowDark: "rgba(129,199,132,0.5)",
      glowLight: "rgba(76,175,80,0.3)",
    },
    veteran: {
      Icon: ia,
      label: "Veteran",
      color: "#CE93D8",
      bgDark: "rgba(206,147,216,0.18)",
      bgLight: "rgba(156,39,176,0.12)",
      glowDark: "rgba(206,147,216,0.5)",
      glowLight: "rgba(156,39,176,0.3)",
    },
  },
  ps = je.memo(({ badge: t, size: e = 14, inline: n = !0 }) => {
    const s = zn().palette.mode === "dark";
    if (!t || !zo[t]) return null;
    const i = zo[t],
      a = s ? i.glowDark : i.glowLight,
      c = s ? i.bgDark : i.bgLight,
      { Icon: d } = i,
      l = Math.round(e * 1.6);
    return o.jsx("span", {
      title: i.label,
      style: {
        display: n ? "inline-flex" : "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        width: l,
        height: l,
        background: c,
        boxShadow: `0 0 ${e * 0.8}px ${a}, 0 0 ${e * 2}px ${a}`,
        verticalAlign: "middle",
        marginLeft: n ? 3 : 0,
        flexShrink: 0,
        animation:
          t === "admin" ? "badgeAdminPulse 2.5s ease-in-out infinite" : void 0,
      },
      children: o.jsx(d, {
        style: { fontSize: e, color: i.color, display: "block" },
      }),
    });
  }),
  Zh = ({ open: t, onClose: e }) => {
    const n = _t(),
      { user: r } = Ue(),
      { theme: s, setTheme: i } = rn(),
      { chats: a } = Ve(),
      c = (m) => {
        (e(), n(m));
      },
      d = () => {
        const m = a.find((b) => b.type === "saved");
        m && (e(), n(`/chat/${m.id}`));
      },
      l =
        (r == null ? void 0 : r.badge) === "support" ||
        (r == null ? void 0 : r.badge) === "admin",
      u = [
        {
          icon: o.jsx(fc, {}),
          label: "Мой профиль",
          action: () => c("/settings"),
        },
        {
          icon: o.jsx(ti, {}),
          label: "Контакты",
          action: () => c("/contacts"),
        },
        { icon: o.jsx(ni, {}), label: "Избранное", action: d },
        {
          icon: o.jsx(ri, {}),
          label: "Настройки",
          action: () => c("/settings"),
        },
        {
          icon: o.jsx(pc, {}),
          label: "Поддержка",
          action: () => c("/support"),
        },
        ...(l
          ? [
              {
                icon: o.jsx(gc, { sx: { color: "#8774E1" } }),
                label: "Заявки (агент)",
                action: () => c("/support-agent"),
              },
            ]
          : []),
      ];
    return o.jsxs(Zo, {
      anchor: "left",
      open: t,
      onClose: e,
      PaperProps: {
        sx: {
          width: "80%",
          maxWidth: 320,
          backgroundColor: "background.paper",
          backgroundImage: "none",
        },
      },
      ModalProps: {
        BackdropProps: { sx: { backgroundColor: "rgba(0,0,0,0.5)" } },
      },
      children: [
        o.jsxs(y, {
          sx: { px: 2, pt: 3, pb: 2, backgroundColor: "background.paper" },
          children: [
            o.jsxs(y, {
              sx: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 1.5,
              },
              children: [
                o.jsx(St, {
                  src: r == null ? void 0 : r.avatar,
                  name: (r == null ? void 0 : r.fullName) || "U",
                  size: 56,
                  onClick: () => c("/settings"),
                }),
                o.jsx(X, {
                  onClick: () => i(s === "dark" ? "light" : "dark"),
                  sx: { color: "text.secondary", mt: -0.5 },
                  children: s === "dark" ? o.jsx(cc, {}) : o.jsx(lc, {}),
                }),
              ],
            }),
            o.jsxs(A, {
              variant: "subtitle1",
              sx: {
                fontWeight: 600,
                fontSize: "1rem",
                lineHeight: 1.3,
                color: "text.primary",
                display: "flex",
                alignItems: "center",
              },
              children: [
                r == null ? void 0 : r.fullName,
                o.jsx(ps, { badge: r == null ? void 0 : r.badge, size: 14 }),
              ],
            }),
            o.jsxs(A, {
              variant: "body2",
              sx: { color: "text.secondary", fontSize: "0.85rem" },
              children: ["@", r == null ? void 0 : r.username],
            }),
          ],
        }),
        o.jsx(ei, { sx: { borderColor: "divider" } }),
        o.jsx(dc, {
          sx: { py: 0.5 },
          children: u.map((m, b) =>
            o.jsxs(
              uc,
              {
                button: !0,
                onClick: m.action,
                sx: {
                  px: 2.5,
                  py: 1.5,
                  "&:active": { backgroundColor: "action.selected" },
                },
                children: [
                  o.jsx(He, {
                    sx: { minWidth: 44, color: "text.secondary" },
                    children: m.icon,
                  }),
                  o.jsx(hc, {
                    primary: m.label,
                    primaryTypographyProps: {
                      fontSize: "0.95rem",
                      fontWeight: 400,
                      color: "text.primary",
                    },
                  }),
                ],
              },
              b,
            ),
          ),
        }),
      ],
    });
  },
  ef = "http://217.114.11.48:3001",
  gs = ht((t, e) => ({
    currentTrack: null,
    isPlaying: !1,
    currentTime: 0,
    duration: 0,
    volume: 1,
    audioEl: null,
    loadAndPlay: (n) => {
      let r = e().audioEl;
      const s = () => {
          const w = e().audioEl;
          if (!w) return;
          const p = isFinite(w.duration) && w.duration > 0 ? w.duration : 0;
          p && p !== e().duration && t({ duration: p });
        },
        i = () => {
          (t({ currentTime: r.currentTime }), s());
        },
        a = () => s(),
        c = () => s(),
        d = () => s(),
        l = () => t({ isPlaying: !1 }),
        u = () => t({ isPlaying: !0 }),
        m = () => t({ isPlaying: !1 });
      r ||
        ((r = new Audio()),
        (r.preload = "metadata"),
        (r.volume = e().volume),
        (r._eventHandlers = {
          timeupdate: i,
          loadedmetadata: a,
          durationchange: c,
          canplay: d,
          ended: l,
          play: u,
          pause: m,
        }),
        r.addEventListener("timeupdate", i),
        r.addEventListener("loadedmetadata", a),
        r.addEventListener("durationchange", c),
        r.addEventListener("canplay", d),
        r.addEventListener("ended", l),
        r.addEventListener("play", u),
        r.addEventListener("pause", m),
        t({ audioEl: r }));
      const b = `${ef}${n.url}`;
      (r.src !== b && (r.src = b),
        t({ duration: 0, currentTime: 0 }),
        (r.currentTime = 0),
        r.load(),
        r.play().catch(() => {}),
        t({
          currentTrack: { id: n.id, name: n.name, url: n.url, attachment: n },
          isPlaying: !0,
        }));
    },
    togglePlay: () => {
      const n = e().audioEl;
      n && (n.paused ? n.play() : n.pause());
    },
    pause: () => {
      const n = e().audioEl;
      n && n.pause();
    },
    stop: () => {
      const n = e().audioEl;
      if (n) {
        n.pause();
        try {
          n.currentTime = 0;
        } catch {}
      }
      t({ currentTrack: null, isPlaying: !1, currentTime: 0, duration: 0 });
    },
    seek: (n) => {
      const r = e().audioEl;
      if (r)
        try {
          ((r.currentTime = n), t({ currentTime: n }));
        } catch {}
    },
    setVolume: (n) => {
      const r = e().audioEl;
      (r && (r.volume = n), t({ volume: n }));
    },
    cleanup: () => {
      const n = e().audioEl;
      (n &&
        n._eventHandlers &&
        (Object.entries(n._eventHandlers).forEach(([r, s]) => {
          n.removeEventListener(r, s);
        }),
        delete n._eventHandlers,
        n.pause(),
        (n.src = ""),
        n.load()),
        t({
          audioEl: null,
          currentTrack: null,
          isPlaying: !1,
          currentTime: 0,
          duration: 0,
        }));
    },
  })),
  aa = () => {
    const {
        currentTrack: t,
        isPlaying: e,
        currentTime: n,
        duration: r,
        togglePlay: s,
        stop: i,
        seek: a,
      } = gs(),
      [c, d] = h.useState(!1),
      l = !!t,
      u = (() => {
        if (!t) return "";
        const g = t.name || "",
          k = g.lastIndexOf(".");
        return k > 0 ? g.substring(0, k) : g;
      })(),
      m = u.split(" - "),
      b = m.length > 1 ? m[0].trim() : "",
      w = m.length > 1 ? m.slice(1).join(" - ").trim() : u,
      p = (g) => {
        const k = Math.floor(g / 60),
          E = Math.floor(g % 60);
        return `${k}:${E.toString().padStart(2, "0")}`;
      },
      x = (g, k) => {
        a(k);
      };
    return o.jsxs(o.Fragment, {
      children: [
        o.jsxs(y, {
          onClick: () => l && d(!0),
          sx: {
            display: "flex",
            alignItems: "center",
            px: 1.5,
            py: l ? 0.5 : 0,
            backgroundColor: "primary.main",
            cursor: l ? "pointer" : "default",
            maxHeight: l ? 36 : 0,
            opacity: l ? 1 : 0,
            overflow: "hidden",
            gap: 1,
            zIndex: 10,
            boxShadow: l ? "0 2px 4px rgba(0,0,0,0.2)" : "none",
            transition:
              "max-height 0.2s ease, opacity 0.15s ease, padding 0.2s ease",
          },
          children: [
            o.jsx(X, {
              size: "small",
              onClick: (g) => {
                (g.stopPropagation(), s());
              },
              sx: { color: "#fff", p: 0.25 },
              children: e
                ? o.jsx(Dn, { sx: { fontSize: 20 } })
                : o.jsx(Xt, { sx: { fontSize: 20 } }),
            }),
            o.jsxs(A, {
              noWrap: !0,
              sx: {
                flex: 1,
                fontSize: "0.8rem",
                color: "#fff",
                fontWeight: 500,
              },
              children: [w, b ? ` - ${b}` : ""],
            }),
            o.jsx(X, {
              size: "small",
              onClick: (g) => {
                (g.stopPropagation(), i());
              },
              sx: { color: "rgba(255,255,255,0.8)", p: 0.25 },
              children: o.jsx(Qe, { sx: { fontSize: 18 } }),
            }),
          ],
        }),
        o.jsx(Zo, {
          anchor: "bottom",
          open: c && l,
          onClose: () => d(!1),
          PaperProps: {
            sx: {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              backgroundColor: "background.paper",
              pb: 2,
            },
          },
          children: o.jsxs(y, {
            sx: { px: 3, pt: 3, pb: 1 },
            children: [
              o.jsx(y, {
                sx: { display: "flex", justifyContent: "center", mb: 3 },
                children: o.jsx(y, {
                  sx: {
                    width: 40,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: "action.disabled",
                  },
                }),
              }),
              o.jsx(A, {
                variant: "h6",
                sx: {
                  fontWeight: 600,
                  color: "text.primary",
                  fontSize: "1.1rem",
                  mb: 0.25,
                },
                children: b || w,
              }),
              o.jsx(A, {
                variant: "body2",
                sx: { color: "text.secondary", fontSize: "0.9rem", mb: 2 },
                children: b ? w : "",
              }),
              o.jsx(mc, {
                value: n,
                max: Math.max(r, 1e-4),
                onChange: x,
                disabled: r <= 0,
                sx: {
                  color: "primary.main",
                  height: 4,
                  "& .MuiSlider-thumb": { width: 14, height: 14 },
                  "& .MuiSlider-rail": { backgroundColor: "action.disabled" },
                },
              }),
              o.jsxs(y, {
                sx: {
                  display: "flex",
                  justifyContent: "space-between",
                  mt: -0.5,
                  mb: 2,
                },
                children: [
                  o.jsx(A, {
                    variant: "caption",
                    sx: { color: "text.secondary" },
                    children: p(n),
                  }),
                  o.jsx(A, {
                    variant: "caption",
                    sx: { color: "text.secondary" },
                    children: p(r),
                  }),
                ],
              }),
              o.jsxs(y, {
                sx: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                },
                children: [
                  o.jsx(X, {
                    sx: { color: "text.secondary" },
                    children: o.jsx(xc, {}),
                  }),
                  o.jsx(X, {
                    sx: { color: "text.primary" },
                    children: o.jsx(yc, { sx: { fontSize: 32 } }),
                  }),
                  o.jsx(X, {
                    onClick: s,
                    sx: {
                      color: "#fff",
                      backgroundColor: "primary.main",
                      width: 56,
                      height: 56,
                      "&:hover": { backgroundColor: "primary.dark" },
                    },
                    children: e
                      ? o.jsx(Dn, { sx: { fontSize: 32 } })
                      : o.jsx(Xt, { sx: { fontSize: 32 } }),
                  }),
                  o.jsx(X, {
                    sx: { color: "text.primary" },
                    children: o.jsx(bc, { sx: { fontSize: 32 } }),
                  }),
                  o.jsx(X, {
                    sx: { color: "text.secondary" },
                    children: o.jsx(Yr, {}),
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    });
  };
function Xn(t) {
  if (!t) return new Date(0);
  if (t instanceof Date) return t;
  const e = String(t).trim();
  return !e.includes("Z") &&
    !e.includes("+") &&
    !/\d{2}:\d{2}:\d{2}[+-]/.test(e)
    ? new Date(e.replace(" ", "T") + "Z")
    : new Date(e);
}
function ca(t) {
  return t
    ? Xn(t).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
    : "";
}
function tf(t) {
  if (!t) return "";
  const e = Xn(t),
    r = Math.floor((new Date().getTime() - e.getTime()) / (1e3 * 60 * 60 * 24));
  return r === 0
    ? e.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
    : r < 7
      ? e.toLocaleDateString("ru-RU", { weekday: "short" })
      : e.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" });
}
function nf(t) {
  if (!t) return "не в сети";
  const e = Xn(t),
    r = new Date().getTime() - e.getTime(),
    s = Math.floor(r / 6e4);
  if (s < 1) return "был(а) только что";
  if (s < 60) return `был(а) ${s} мин. назад`;
  const i = Math.floor(s / 60);
  if (i < 24) return `был(а) ${i} ч. назад`;
  const a = Math.floor(i / 24);
  return a < 7
    ? `был(а) ${a} дн. назад`
    : `был(а) ${e.toLocaleDateString("ru-RU", { day: "numeric", month: "short" })}`;
}
function rf(t) {
  return t
    ? Xn(t).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";
}
const la = je.memo(
  ({
    chat: t,
    chatName: e,
    avatarUrl: n,
    lastPreview: r,
    hasUnread: s,
    isSelected: i,
    isSelecting: a,
    isFavorite: c,
    isOnline: d,
    isLast: l,
    currentUserId: u,
    onClick: m,
    onTouchStart: b,
    onTouchEnd: w,
    onTouchMove: p,
    onContextMenu: x,
  }) => {
    var T;
    const g = zn(),
      k = g.palette.mode === "dark",
      E =
        t.type === "private"
          ? (T = t.participants) == null
            ? void 0
            : T.find((M) => M.id !== u)
          : null;
    return o.jsxs("div", {
      className: "chat-item",
      children: [
        o.jsxs("div", {
          onClick: m,
          onTouchStart: b,
          onTouchEnd: w,
          onTouchMove: p,
          onContextMenu: (M) => {
            (M.preventDefault(), x());
          },
          style: {
            display: "flex",
            alignItems: "center",
            padding: "8.8px 16px",
            gap: 12,
            cursor: "pointer",
            position: "relative",
            backgroundColor: i
              ? k
                ? "rgba(135,116,225,0.12)"
                : "rgba(135,116,225,0.08)"
              : "transparent",
            WebkitTapHighlightColor: "transparent",
          },
          children: [
            o.jsxs("div", {
              style: { position: "relative", flexShrink: 0 },
              children: [
                o.jsx(si, {
                  overlap: "circular",
                  anchorOrigin: { vertical: "bottom", horizontal: "right" },
                  variant: "dot",
                  invisible: !d,
                  sx: {
                    "& .MuiBadge-badge": {
                      backgroundColor: "#4CAF50",
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      border: "2.5px solid",
                      borderColor: "background.default",
                      boxShadow: "0 0 0 1px rgba(76,175,80,0.3)",
                    },
                  },
                  children: o.jsx(St, {
                    src: n,
                    name: e,
                    size: 54,
                    sx: { opacity: i ? 0.6 : 1 },
                  }),
                }),
                i &&
                  o.jsx(Bn, {
                    sx: {
                      position: "absolute",
                      bottom: -2,
                      right: -2,
                      fontSize: 22,
                      color: "primary.main",
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                    },
                  }),
              ],
            }),
            o.jsxs("div", {
              style: { flex: 1, minWidth: 0, padding: "1.6px 0" },
              children: [
                o.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 3.2,
                  },
                  children: [
                    o.jsxs("div", {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        flex: 1,
                        minWidth: 0,
                        gap: 4,
                      },
                      children: [
                        o.jsx("div", {
                          style: {
                            fontWeight: s ? 650 : 450,
                            fontSize: "0.96rem",
                            color: g.palette.text.primary,
                            lineHeight: 1.3,
                            letterSpacing: "-0.01em",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          },
                          children: e,
                        }),
                        (E == null ? void 0 : E.badge) &&
                          o.jsx(ps, { badge: E.badge, size: 13 }),
                        !!t.muted &&
                          o.jsx(wc, {
                            sx: {
                              fontSize: 14,
                              color: "text.secondary",
                              opacity: 0.5,
                              flexShrink: 0,
                            },
                          }),
                        c &&
                          o.jsx(ni, {
                            sx: {
                              fontSize: 14,
                              color: "primary.main",
                              opacity: 0.9,
                              flexShrink: 0,
                            },
                          }),
                      ],
                    }),
                    o.jsxs("div", {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 2.4,
                        flexShrink: 0,
                        marginLeft: 8,
                      },
                      children: [
                        !!t.pinned &&
                          o.jsx(oi, {
                            sx: {
                              fontSize: 13,
                              color: "text.secondary",
                              opacity: 0.5,
                              transform: "rotate(45deg)",
                            },
                          }),
                        t.lastMessage &&
                          t.lastMessage.userId === u &&
                          (() => {
                            const M = t.lastMessage.status;
                            return M === "sending"
                              ? o.jsx(vc, {
                                  sx: {
                                    fontSize: 14,
                                    color: "text.secondary",
                                    opacity: 0.5,
                                  },
                                })
                              : M === "read"
                                ? o.jsx(Rr, {
                                    sx: { fontSize: 16, color: "#8774E1" },
                                  })
                                : M === "delivered"
                                  ? o.jsx(Rr, {
                                      sx: {
                                        fontSize: 16,
                                        color: "text.secondary",
                                        opacity: 0.5,
                                      },
                                    })
                                  : o.jsx(Sc, {
                                      sx: {
                                        fontSize: 16,
                                        color: "text.secondary",
                                        opacity: 0.5,
                                      },
                                    });
                          })(),
                        o.jsx("span", {
                          style: {
                            color: s
                              ? g.palette.primary.main
                              : g.palette.text.secondary,
                            fontSize: "0.73rem",
                            fontWeight: s ? 600 : 400,
                            opacity: s ? 1 : 0.7,
                          },
                          children: tf(t.lastMessageTime),
                        }),
                      ],
                    }),
                  ],
                }),
                o.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  },
                  children: [
                    o.jsx("div", {
                      style: {
                        color: g.palette.text.secondary,
                        fontSize: "0.84rem",
                        flex: 1,
                        lineHeight: 1.4,
                        opacity: s ? 0.85 : 0.6,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      },
                      children: r,
                    }),
                    s &&
                      o.jsx("div", {
                        style: {
                          background: t.muted
                            ? k
                              ? "rgba(255,255,255,0.2)"
                              : "rgba(0,0,0,0.15)"
                            : "linear-gradient(135deg, #8774E1, #6C5CE7)",
                          borderRadius: 12,
                          minWidth: 22,
                          height: 22,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "0 5.6px",
                          marginLeft: 8,
                          flexShrink: 0,
                          boxShadow: t.muted
                            ? "none"
                            : "0 2px 6px rgba(135,116,225,0.35)",
                        },
                        children: o.jsx("span", {
                          style: {
                            color: "#fff",
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            lineHeight: 1,
                          },
                          children: t.unreadCount > 99 ? "99+" : t.unreadCount,
                        }),
                      }),
                  ],
                }),
              ],
            }),
          ],
        }),
        !l &&
          o.jsx("div", {
            style: {
              marginLeft: 80,
              marginRight: 16,
              margin: "2.4px 16px 2.4px 80px",
              borderBottom: `2px solid ${g.palette.divider}`,
            },
          }),
      ],
    });
  },
  (t, e) =>
    t.chat === e.chat &&
    t.chatName === e.chatName &&
    t.avatarUrl === e.avatarUrl &&
    t.lastPreview === e.lastPreview &&
    t.hasUnread === e.hasUnread &&
    t.isSelected === e.isSelected &&
    t.isFavorite === e.isFavorite &&
    t.isOnline === e.isOnline &&
    t.isLast === e.isLast &&
    t.currentUserId === e.currentUserId,
);
la.displayName = "ChatItem";
const sf = () => {
    const t = _t(),
      { user: e } = Ue(),
      {
        chats: n,
        archiveChat: r,
        muteChat: s,
        pinChat: i,
        deleteChat: a,
        isLoading: c,
      } = Ve(),
      { getContactByUserId: d } = dt(),
      [l, u] = h.useState(""),
      [m, b] = h.useState(!1),
      [w, p] = h.useState(!1),
      [x, g] = h.useState(() => {
        try {
          return JSON.parse(localStorage.getItem("supportTicket") || "null");
        } catch {
          return null;
        }
      });
    je.useEffect(() => {
      fh.getMyTickets()
        .then((C) => {
          const O = C.find(($) => $.status !== "closed") || null;
          (g(O),
            O
              ? localStorage.setItem("supportTicket", JSON.stringify(O))
              : localStorage.removeItem("supportTicket"));
        })
        .catch(() => {});
    }, []);
    const [k, E] = h.useState(null),
      [T, M] = h.useState(new Set()),
      H = h.useRef(null),
      Z = h.useRef(!1),
      D = h.useRef(!1),
      _ = T.size > 0,
      P = h.useRef(!1),
      [J, ae] = h.useState(!1),
      [te, re] = h.useState(!1),
      B = h.useRef(null);
    je.useEffect(() => {
      c ? (P.current = !0) : P.current && !J && ae(!0);
    }, [c, J]);
    const K = !J && (c || n.length === 0);
    je.useEffect(
      () => (
        K
          ? (B.current = setTimeout(() => re(!0), 1e4))
          : (B.current && (clearTimeout(B.current), (B.current = null)),
            re(!1)),
        () => {
          B.current && clearTimeout(B.current);
        }
      ),
      [K],
    );
    const L = h.useCallback((C) => {
        ((Z.current = !1),
          (H.current = setTimeout(() => {
            ((Z.current = !0), M(new Set([C])));
          }, 500)));
      }, []),
      W = h.useCallback(() => {
        H.current && (clearTimeout(H.current), (H.current = null));
      }, []),
      Q = h.useCallback((C) => {
        M((O) => {
          const $ = new Set(O);
          return ($.has(C) ? $.delete(C) : $.add(C), $);
        });
      }, []),
      ce = h.useCallback(async () => {
        const C = Array.from(T);
        for (const O of C) await r(O);
        M(new Set());
      }, [T, r]),
      le = h.useCallback(() => {
        M(new Set());
      }, []),
      [se, ue] = h.useState(!1),
      [he, de] = h.useState(!1),
      fe = h.useCallback(async () => {
        const C = Array.from(T);
        for (const O of C) await i(O);
        M(new Set());
      }, [T, i]),
      Ie = h.useCallback(async () => {
        const C = Array.from(T);
        for (const O of C) await s(O);
        M(new Set());
      }, [T, s]),
      Ae = h.useCallback(async () => {
        const C = Array.from(T);
        for (const O of C) await a(O, he);
        (M(new Set()), ue(!1), de(!1));
      }, [T, a, he]),
      pe = h.useMemo(() => n.filter((C) => C.archived), [n]),
      R = h.useMemo(
        () =>
          n
            .filter((C) => !C.archived)
            .filter((C) =>
              l ? U(C).toLowerCase().includes(l.toLowerCase()) : !0,
            )
            .sort((C, O) => {
              if (C.pinned && !O.pinned) return -1;
              if (!C.pinned && O.pinned) return 1;
              const $ = C.lastMessageTime
                ? new Date(C.lastMessageTime).getTime()
                : 0;
              return (
                (O.lastMessageTime
                  ? new Date(O.lastMessageTime).getTime()
                  : 0) - $
              );
            }),
        [n, l],
      );
    function U(C) {
      if (C.type === "saved") return "Избранное";
      if (C.type === "group") return C.name || "Группа";
      if (C.type === "ai") return "ИИ Ассистент";
      const O = C.participants.find(
        (Se) => Se.id !== (e == null ? void 0 : e.id),
      );
      if (!O) return C.name || "Чат";
      const $ = d(O.id);
      return ($ == null ? void 0 : $.displayName) || O.fullName;
    }
    je.useEffect(() => {
      const C = R.map((O) => {
        var $;
        return O.type !== "private"
          ? O.avatar
          : ($ = O.participants.find(
                (Se) => Se.id !== (e == null ? void 0 : e.id),
              )) == null
            ? void 0
            : $.avatar;
      });
      Uh(C);
    }, [n]);
    function q(C) {
      if (C.type !== "private") return Wr(C.avatar);
      const O = C.participants.find(
        ($) => $.id !== (e == null ? void 0 : e.id),
      );
      return Wr(O == null ? void 0 : O.avatar);
    }
    function z(C) {
      var O;
      return C.lastMessageText
        ? C.lastMessageText
        : (O = C.lastMessage) != null && O.text
          ? C.lastMessage.text
          : "";
    }
    function V(C) {
      if (C.type !== "private") return !1;
      const O = C.participants.find(
        ($) => $.id !== (e == null ? void 0 : e.id),
      );
      return (O == null ? void 0 : O.status) === "online";
    }
    return o.jsxs(y, {
      className: "page-enter-back",
      sx: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
      },
      children: [
        o.jsxs(y, {
          sx: {
            position: "relative",
            minHeight: 52,
            zIndex: 10,
            backgroundColor: _
              ? (C) =>
                  C.palette.mode === "dark"
                    ? "rgba(135,116,225,0.15)"
                    : "rgba(135,116,225,0.1)"
              : "background.paper",
            transition: "background-color 0.2s ease",
          },
          children: [
            o.jsxs(y, {
              sx: {
                display: "flex",
                alignItems: "center",
                px: 1.5,
                py: 0.75,
                minHeight: 52,
                opacity: _ ? 0 : 1,
                pointerEvents: _ ? "none" : "auto",
                transition: "opacity 0.15s ease",
              },
              children: [
                o.jsx(X, {
                  onClick: () => b(!0),
                  sx: { color: "text.secondary", mr: 1 },
                  children: o.jsx(Cc, {}),
                }),
                o.jsx(A, {
                  variant: "h6",
                  sx: {
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    flex: 1,
                    color: "text.primary",
                    letterSpacing: "-0.01em",
                  },
                  children: "Leet",
                }),
                o.jsx(X, {
                  onClick: (C) => E(C.currentTarget),
                  sx: { color: "text.secondary" },
                  children: o.jsx(Yr, {}),
                }),
                o.jsx(_r, {
                  anchorEl: k,
                  open: !!k,
                  onClose: () => E(null),
                  anchorOrigin: { vertical: "bottom", horizontal: "right" },
                  transformOrigin: { vertical: "top", horizontal: "right" },
                  transitionDuration: 0,
                  slotProps: { paper: { sx: { minWidth: 180, mt: 0.5 } } },
                  BackdropProps: { invisible: !0, onTouchStart: () => E(null) },
                  children: o.jsx(qe, {
                    disabled: !0,
                    sx: { opacity: "0.7 !important", fontSize: "0.9rem" },
                    children: "В разработке...",
                  }),
                }),
              ],
            }),
            o.jsxs(y, {
              sx: {
                display: "flex",
                alignItems: "center",
                px: 1.5,
                py: 0.75,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                minHeight: 52,
                opacity: _ ? 1 : 0,
                pointerEvents: _ ? "auto" : "none",
                transition: "opacity 0.15s ease",
              },
              children: [
                o.jsx(X, {
                  onClick: le,
                  sx: { color: "primary.main", mr: 0.5 },
                  children: o.jsx(Qe, {}),
                }),
                o.jsx(A, {
                  variant: "h6",
                  sx: {
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    flex: 1,
                    color: "text.primary",
                  },
                  children: T.size,
                }),
                o.jsx(X, {
                  onClick: fe,
                  sx: { color: "text.secondary" },
                  children: o.jsx(oi, { sx: { fontSize: 22 } }),
                }),
                o.jsx(X, {
                  onClick: Ie,
                  sx: { color: "text.secondary" },
                  children: o.jsx(kc, { sx: { fontSize: 22 } }),
                }),
                o.jsx(X, {
                  onClick: ce,
                  sx: { color: "text.secondary" },
                  children: o.jsx(Ns, { sx: { fontSize: 22 } }),
                }),
                o.jsx(X, {
                  onClick: () => ue(!0),
                  sx: { color: "error.main" },
                  children: o.jsx(Wt, { sx: { fontSize: 22 } }),
                }),
              ],
            }),
          ],
        }),
        o.jsx(y, {
          sx: {
            maxHeight: _ ? 0 : 56,
            opacity: _ ? 0 : 1,
            py: _ ? 0 : 0.8,
            overflow: "hidden",
            transition:
              "max-height 0.2s ease, opacity 0.2s ease, padding 0.2s ease",
            px: 1.5,
            backgroundColor: "background.paper",
            borderBottom: _ ? "none" : "1px solid",
            borderColor: "divider",
            position: "relative",
            zIndex: 2,
          },
          children: o.jsx(ot, {
            fullWidth: !0,
            placeholder: "Поиск чата",
            value: l,
            onChange: (C) => u(C.target.value),
            size: "small",
            InputProps: {
              startAdornment: o.jsx(jr, {
                position: "start",
                children: o.jsx(ii, {
                  sx: { color: "text.secondary", fontSize: 20 },
                }),
              }),
              endAdornment: l
                ? o.jsx(jr, {
                    position: "end",
                    children: o.jsx(X, {
                      size: "small",
                      onClick: () => u(""),
                      children: o.jsx(Qe, { sx: { fontSize: 18 } }),
                    }),
                  })
                : null,
            },
            sx: {
              "& .MuiInputBase-root": {
                backgroundColor: (C) =>
                  C.palette.mode === "dark"
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.04)",
                borderRadius: "12px",
                height: 40,
                fontSize: "0.9rem",
                "& fieldset": { border: "none" },
                "&.Mui-focused": {
                  backgroundColor: (C) =>
                    C.palette.mode === "dark"
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.06)",
                },
              },
            },
          }),
        }),
        o.jsx(aa, {}),
        o.jsxs(y, {
          className: "scroll-container",
          sx: { flex: 1, overflow: "auto", py: 0.5, pb: "80px" },
          children: [
            pe.length > 0 &&
              !l &&
              o.jsxs(y, {
                onClick: () => t("/archive"),
                sx: {
                  display: "flex",
                  alignItems: "center",
                  px: 2,
                  py: 1.2,
                  gap: 1.5,
                  cursor: "pointer",
                  transition: "background-color 0.15s ease",
                  "&:active": {
                    backgroundColor: (C) =>
                      C.palette.mode === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.04)",
                  },
                },
                children: [
                  o.jsx(y, {
                    sx: {
                      width: 54,
                      height: 54,
                      borderRadius: "50%",
                      backgroundColor: (C) =>
                        C.palette.mode === "dark"
                          ? "rgba(135,116,225,0.12)"
                          : "rgba(135,116,225,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                    children: o.jsx(Ns, {
                      sx: { color: "primary.main", fontSize: 24 },
                    }),
                  }),
                  o.jsxs(y, {
                    sx: { flex: 1 },
                    children: [
                      o.jsx(A, {
                        sx: {
                          fontWeight: 500,
                          fontSize: "0.95rem",
                          color: "text.primary",
                        },
                        children: "Архив",
                      }),
                      o.jsxs(A, {
                        sx: { fontSize: "0.82rem", color: "text.secondary" },
                        children: [
                          pe.length,
                          " ",
                          pe.length === 1
                            ? "чат"
                            : pe.length < 5
                              ? "чата"
                              : "чатов",
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            x &&
              !l &&
              o.jsx("div", {
                className: "chat-item",
                children: o.jsxs("div", {
                  onClick: () => t("/support"),
                  style: {
                    display: "flex",
                    alignItems: "center",
                    padding: "8.8px 16px",
                    gap: 12,
                    cursor: "pointer",
                    WebkitTapHighlightColor: "transparent",
                  },
                  children: [
                    o.jsx("div", {
                      style: { position: "relative", flexShrink: 0 },
                      children: o.jsx("div", {
                        style: {
                          width: 54,
                          height: 54,
                          borderRadius: "50%",
                          background: "linear-gradient(135deg,#8774E1,#6C5CE7)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        },
                        children: o.jsx(ds, {
                          style: { color: "#fff", fontSize: 26 },
                        }),
                      }),
                    }),
                    o.jsxs("div", {
                      style: { flex: 1, minWidth: 0 },
                      children: [
                        o.jsx("div", {
                          style: {
                            display: "flex",
                            alignItems: "baseline",
                            justifyContent: "space-between",
                            marginBottom: 2,
                          },
                          children: o.jsx("span", {
                            style: {
                              fontWeight: 600,
                              fontSize: "0.95rem",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            },
                            children: "Поддержка",
                          }),
                        }),
                        o.jsxs("div", {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          },
                          children: [
                            o.jsx("span", {
                              style: {
                                fontSize: "0.82rem",
                                color:
                                  x.status === "in_progress"
                                    ? "#4CAF50"
                                    : void 0,
                                opacity: x.status === "in_progress" ? 1 : 0.6,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                flex: 1,
                              },
                              children:
                                x.status === "in_progress"
                                  ? "Специалист в чате"
                                  : "Ожидание ответа...",
                            }),
                            x.status === "open" &&
                              o.jsx("div", {
                                style: {
                                  width: 20,
                                  height: 20,
                                  borderRadius: "50%",
                                  backgroundColor: "#8774E1",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                  marginLeft: 6,
                                },
                                children: o.jsx("span", {
                                  style: {
                                    color: "#fff",
                                    fontSize: 11,
                                    fontWeight: 700,
                                  },
                                  children: "!",
                                }),
                              }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            R.length === 0 && pe.length === 0
              ? K && !l
                ? o.jsxs(y, {
                    sx: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                      minHeight: "60vh",
                      position: "relative",
                    },
                    children: [
                      o.jsx(Ct, { sx: { color: "#8774E1" }, size: 36 }),
                      o.jsxs(y, {
                        sx: {
                          position: "absolute",
                          top: "50%",
                          left: 0,
                          right: 0,
                          mt: 4,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textAlign: "center",
                          px: 4,
                          opacity: te ? 1 : 0,
                          transform: te ? "translateY(0)" : "translateY(8px)",
                          transition: "opacity 0.6s ease, transform 0.6s ease",
                        },
                        children: [
                          o.jsx(A, {
                            sx: {
                              fontWeight: 700,
                              fontSize: "0.95rem",
                              color: "text.primary",
                              mb: 1,
                            },
                            children: "Долгая загрузка",
                          }),
                          o.jsx(A, {
                            sx: {
                              fontSize: "0.82rem",
                              color: "text.secondary",
                              lineHeight: 1.7,
                              mt: 0.5,
                            },
                            children: "Возможные причины проблемы:",
                          }),
                          o.jsx(A, {
                            sx: {
                              fontSize: "0.82rem",
                              color: "text.secondary",
                              lineHeight: 1.7,
                            },
                            children:
                              "— В текущий момент у вас очень медленный интернет",
                          }),
                          o.jsx(A, {
                            sx: {
                              fontSize: "0.82rem",
                              color: "text.secondary",
                              lineHeight: 1.7,
                            },
                            children:
                              "— РКН/ваш интернет-провайдер ограничил работу мобильной связи в этом районе",
                          }),
                        ],
                      }),
                    ],
                  })
                : o.jsxs(y, {
                    sx: {
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                      minHeight: "60vh",
                      px: 4,
                    },
                    children: [
                      o.jsx(y, {
                        sx: {
                          width: 72,
                          height: 72,
                          borderRadius: "50%",
                          backgroundColor: (C) =>
                            C.palette.mode === "dark"
                              ? "rgba(135,116,225,0.12)"
                              : "rgba(135,116,225,0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 2.5,
                        },
                        children: o.jsx(ai, {
                          sx: {
                            fontSize: 32,
                            color: "primary.main",
                            opacity: 0.7,
                          },
                        }),
                      }),
                      o.jsx(A, {
                        variant: "body1",
                        sx: {
                          color: "text.secondary",
                          fontWeight: 500,
                          mb: 0.5,
                        },
                        children: l ? "Ничего не найдено" : "Пока нет чатов",
                      }),
                      o.jsx(A, {
                        variant: "body2",
                        sx: {
                          color: "text.secondary",
                          opacity: 0.6,
                          fontSize: "0.8rem",
                        },
                        children: l
                          ? "Попробуйте другой запрос"
                          : "Начните новую переписку",
                      }),
                    ],
                  })
              : R.map((C, O) =>
                  o.jsx(
                    la,
                    {
                      chat: C,
                      chatName: U(C),
                      avatarUrl: q(C),
                      lastPreview: z(C),
                      hasUnread: C.unreadCount > 0,
                      isSelected: T.has(C.id),
                      isSelecting: _,
                      isFavorite: C.type === "saved",
                      isOnline: V(C),
                      isLast: O === R.length - 1,
                      currentUserId: e == null ? void 0 : e.id,
                      onClick: ($) => {
                        if (D.current) {
                          D.current = !1;
                          return;
                        }
                        _ ? Q(C.id) : t(`/chat/${C.id}`);
                      },
                      onTouchStart: ($) => {
                        _ || L(C.id);
                      },
                      onTouchEnd: ($) => {
                        Z.current
                          ? ((Z.current = !1),
                            (D.current = !0),
                            $ == null || $.preventDefault())
                          : _
                            ? ((D.current = !0), Q(C.id))
                            : W();
                      },
                      onTouchMove: ($) => W(),
                      onContextMenu: ($) => {
                        ($ == null || $.preventDefault(),
                          _ || M(new Set([C.id])));
                      },
                    },
                    C.id,
                  ),
                ),
          ],
        }),
        o.jsx(Ec, {
          sx: {
            position: "absolute",
            bottom: 88,
            right: 16,
            background: "linear-gradient(135deg, #8774E1, #6C5CE7)",
            color: "#fff",
            boxShadow:
              "0 4px 16px rgba(135,116,225,0.45), 0 0 20px rgba(135,116,225,0.25)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              background: "linear-gradient(135deg, #9C88FF, #7C6FE7)",
            },
            "&:active": {
              transform: "scale(0.93)",
              boxShadow: "0 2px 8px rgba(135,116,225,0.3)",
            },
          },
          onClick: () => t("/search"),
          children: o.jsx(ci, {}),
        }),
        o.jsx(Zh, { open: m, onClose: () => b(!1) }),
        o.jsxs(vt, {
          open: se,
          onClose: () => {
            (ue(!1), de(!1));
          },
          PaperProps: {
            sx: { borderRadius: 3, backgroundImage: "none", minWidth: 280 },
          },
          children: [
            o.jsxs(Vt, {
              sx: { fontSize: "1.05rem", fontWeight: 600, pb: 0.5 },
              children: [
                "Удалить ",
                T.size > 1 ? `${T.size} чатов` : "чат",
                "?",
              ],
            }),
            o.jsxs(Kt, {
              sx: { pb: 1 },
              children: [
                o.jsx(A, {
                  sx: { fontSize: "0.9rem", color: "text.secondary", mb: 1.5 },
                  children: "Это действие нельзя отменить.",
                }),
                o.jsxs(y, {
                  onClick: () => de(!he),
                  sx: {
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    py: 0.5,
                  },
                  children: [
                    o.jsx(y, {
                      sx: {
                        width: 20,
                        height: 20,
                        borderRadius: "4px",
                        border: "2px solid",
                        borderColor: he ? "primary.main" : "text.secondary",
                        backgroundColor: he ? "primary.main" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition:
                          "background-color 0.2s ease, border-color 0.2s ease",
                      },
                      children:
                        he &&
                        o.jsx(Bn, { sx: { fontSize: 16, color: "#fff" } }),
                    }),
                    o.jsx(A, {
                      sx: { fontSize: "0.88rem", color: "text.primary" },
                      children: "Удалить также у собеседника",
                    }),
                  ],
                }),
              ],
            }),
            o.jsxs(Yt, {
              sx: { px: 2, pb: 2 },
              children: [
                o.jsx(Ee, {
                  onClick: () => {
                    (ue(!1), de(!1));
                  },
                  sx: {
                    color: "text.secondary",
                    textTransform: "none",
                    fontWeight: 500,
                  },
                  children: "Отмена",
                }),
                o.jsx(Ee, {
                  onClick: Ae,
                  sx: {
                    color: "error.main",
                    textTransform: "none",
                    fontWeight: 600,
                  },
                  children: "Удалить",
                }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  ms = ht((t, e) => ({
    current: null,
    timerId: null,
    push: (n) => {
      var c, d;
      const r = e();
      r.current &&
        (r.timerId && clearTimeout(r.timerId),
        (d = (c = r.current).onExpire) == null || d.call(c));
      const s = Date.now().toString(),
        i = { ...n, id: s },
        a = setTimeout(() => {
          var u, m;
          ((u = e().current) == null ? void 0 : u.id) === s &&
            ((m = i.onExpire) == null || m.call(i),
            t({ current: null, timerId: null }));
        }, n.timeout);
      t({ current: i, timerId: a });
    },
    undo: () => {
      var r, s;
      const n = e();
      n.current &&
        (n.timerId && clearTimeout(n.timerId),
        (s = (r = n.current).onUndo) == null || s.call(r),
        t({ current: null, timerId: null }));
    },
    dismiss: () => {
      var r, s;
      const n = e();
      n.current &&
        (n.timerId && clearTimeout(n.timerId),
        (s = (r = n.current).onExpire) == null || s.call(r),
        t({ current: null, timerId: null }));
    },
  })),
  of = {
    save: "Сохранить",
    cancel: "Отмена",
    close: "Закрыть",
    edit: "Редактировать",
    delete: "Удалить",
    confirm: "Подтвердить",
    loading: "Загрузка...",
    error: "Ошибка",
    success: "Успешно",
    yes: "Да",
    no: "Нет",
  },
  af = {
    login: "Вход",
    register: "Регистрация",
    logout: "Выйти из аккаунта",
    username: "Имя пользователя",
    password: "Пароль",
    fullName: "Полное имя",
    loginToAccount: "Войдите в свой аккаунт",
    createAccount: "Создайте новый аккаунт",
    enterUsername: "Введите имя пользователя",
    enterPassword: "Введите пароль",
    enterFullName: "Введите ваше имя",
    fillAllFields: "Пожалуйста, заполните все поля",
    enterName: "Пожалуйста, введите ваше имя",
    noAccount: "Нет аккаунта? Зарегистрируйтесь",
    haveAccount: "Уже есть аккаунт? Войдите",
    invalidCredentials: "Неверное имя пользователя или пароль",
    userExists: "Пользователь с таким именем уже существует",
    registrationError: "Ошибка при регистрации",
    loginError: "Ошибка при входе",
  },
  cf = {
    title: "Настройки",
    profile: "Профиль",
    notifications: "Уведомления",
    privacy: "Конфиденциальность",
    appearance: "Внешний вид",
    language: "Язык",
    storage: "Хранилище",
    about: "О программе",
    profileSettings: "Настройки профиля",
    editProfile: "Редактировать профиль",
    userId: "ID пользователя",
    registrationDate: "Дата регистрации",
    lastSeen: "Последний визит",
    online: "В сети",
    away: "Отошел",
    offline: "Не в сети",
  },
  lf = {
    title: "Настройки уведомлений",
    messages: "Сообщения",
    mentions: "Упоминания",
    calls: "Звонки",
    sound: "Звук",
    messagesDesc: "Получать уведомления о новых сообщениях",
    mentionsDesc: "Получать уведомления когда вас упоминают",
    callsDesc: "Получать уведомления о входящих звонках",
    soundDesc: "Воспроизводить звук при получении уведомления",
    notificationsTitle: "Уведомления",
    allNotifications: "Все уведомления",
    newMessage: "Новое сообщение",
    newContact: "Новый контакт",
    systemUpdate: "Обновление системы",
    contactAdded: "добавила вас в контакты",
    newVersionAvailable: "Доступна новая версия приложения",
    yesterday: "Вчера",
    hourAgo: "час назад",
    notificationsComingSoon:
      "Функция уведомлений будет доступна в следующей версии",
  },
  df = {
    title: "Настройки конфиденциальности",
    accountSecurity: "Безопасность аккаунта",
    changePassword: "Сменить пароль",
    changePasswordDesc: "Обновите пароль для повышения безопасности",
    change: "Изменить",
    twoFactorAuth: "Двухфакторная аутентификация",
    twoFactorAuthDesc: "Дополнительная защита вашего аккаунта",
    profileVisibility: "Видимость профиля",
    showOnlineStatus: "Показывать статус 'в сети'",
    showOnlineStatusDesc: "Другие пользователи будут видеть когда вы онлайн",
    showLastSeen: "Показывать время последнего визита",
    showLastSeenDesc: "Показывать когда вы последний раз были в сети",
    messageSettings: "Настройки сообщений",
    readReceipts: "Отчеты о прочтении",
    readReceiptsDesc: "Отправлять отчеты о прочтении сообщений",
    allowForwarding: "Разрешить пересылку сообщений",
    allowForwardingDesc: "Другие пользователи смогут пересылать ваши сообщения",
    screenshotProtection: "Защита от скриншотов",
    screenshotProtectionDesc: "Предупреждать при попытке сделать скриншот",
    privacyInfo:
      "Эти настройки помогают контролировать вашу конфиденциальность и безопасность в мессенджере.",
  },
  uf = {
    title: "Сменить пароль",
    description:
      "Для смены пароля введите текущий пароль и создайте новый надежный пароль.",
    currentPassword: "Текущий пароль",
    newPassword: "Новый пароль",
    confirmPassword: "Подтвердите новый пароль",
    passwordRequirements: "Требования к паролю:",
    minLength: "Минимум 6 символов",
    passwordStrength: "Надежность пароля:",
    veryWeak: "Очень слабый",
    weak: "Слабый",
    medium: "Средний",
    good: "Хороший",
    excellent: "Отличный",
    passwordsNotMatch: "Пароли не совпадают",
    enterCurrentPassword: "Введите текущий пароль",
    enterNewPassword: "Введите новый пароль",
    confirmNewPassword: "Подтвердите новый пароль",
    passwordChanged: "Пароль успешно изменен!",
    changePasswordError: "Ошибка при смене пароля",
    wrongCurrentPassword: "Неверный текущий пароль",
    passwordTooShort: "Новый пароль должен содержать минимум 6 символов",
    passwordSameAsCurrent: "Новый пароль должен отличаться от текущего",
    changingPassword: "Смена пароля...",
    changePasswordBtn: "Сменить пароль",
  },
  hf = {
    title: "Настройки внешнего вида",
    theme: "Тема оформления",
    darkTheme: "Темная",
    lightTheme: "Светлая",
    customTheme: "Кастом",
    darkThemeDesc: "Классическая темная тема",
    lightThemeDesc: "Светлая тема для дневного использования",
    customThemeDesc: "Настройте свою палитру",
    fontSize: "Размер шрифта",
    small: "Маленький",
    medium: "Средний",
    large: "Большой",
    customPalette: "Настройка палитры",
    customPaletteDesc: "Настройте цвета для своей кастомной темы",
    reset: "Сбросить",
  },
  ff = {
    title: "Настройки языка",
    interfaceLanguage: "Язык интерфейса",
    russian: "Русский",
    english: "English",
    chinese: "Chinese",
  },
  pf = {
    title: "Настройки хранилища",
    clearCache: "Очистить кэш",
    clearAllData: "Удалить все данные",
    clearCacheDesc: "Очистить кэш браузера и временные файлы",
    clearAllDataDesc: "Удалить все данные приложения (включая настройки)",
    cacheCleared: "Кэш очищен!",
    allDataDeleted: "Все данные удалены! Приложение будет перезагружено.",
    confirmDeleteAll:
      "Вы уверены, что хотите удалить ВСЕ данные? Это действие нельзя отменить.",
    usedSpace: "Используется места",
    of: "из",
  },
  gf = {
    chats: "Чаты",
    contacts: "Контакты",
    notifications: "Уведомления",
    modules: "Модули",
    settings: "Настройки",
    comingSoon: "Скоро",
    user: "Пользователь",
    online: "Онлайн",
  },
  mf = {
    newMessage: "Новое сообщение",
    send: "Отправить",
    typeMessage: "Введите сообщение...",
    noMessages: "Нет сообщений",
    loadingMessages: "Загрузка сообщений...",
    messageSent: "Отправлено",
    messageDelivered: "Доставлено",
    messageRead: "Прочитано",
    online: "в сети",
    lastSeen: "был в сети",
    typing: "печатает...",
    search: "Поиск",
    searchPlaceholder: "Поиск в чатах...",
    noChats: "Нет чатов",
    startChat: "Начать чат",
    addContact: "Добавить контакт",
    title: "Чаты",
    recentChats: "Недавние чаты",
    newChat: "Новый чат",
    selectChat: "Выберите чат для начала общения",
    noActiveChat: "Нет активного чата",
    archive: "Архив",
    archivedChats: "архивированных чатов",
    archiveEmpty: "Архив пуст",
    archiveEmptyDesc: "Здесь будут отображаться архивированные чаты",
    unarchive: "Восстановить из архива",
    archiveChat: "Архивировать",
    unarchiveChat: "Восстановить из архива",
    chatArchived: 'Чат "{name}" перемещен в архив',
    chatUnarchived: 'Чат "{name}" восстановлен из архива',
    archiveError: "Ошибка при архивировании чата",
    unarchiveError: "Ошибка при восстановлении чата из архива",
    attachFiles: "Прикрепить файлы",
  },
  xf = {
    title: "Контакты",
    search: "Поиск контактов",
    searchPlaceholder: "Поиск по имени или username...",
    noContacts: "Нет контактов",
    addContact: "Добавить контакт",
    removeContact: "Удалить контакт",
    renameContact: "Переименовать контакт",
    startChat: "Начать чат",
    blockUser: "Заблокировать",
    online: "в сети",
    lastSeen: "был в сети",
    wasRecently: "был(а) недавно",
    offline: "Не в сети",
    away: "Отошел",
    unknown: "Неизвестно",
    contacts: "Контакты",
    chats: "Чаты",
    searchUsers: "Поиск пользователей",
    searchUsersPlaceholder: "Введите имя или username...",
    noResults: "Нет результатов",
    addToContacts: "Добавить в контакты",
    rename: "Переименовать",
    newName: "Новое имя",
    save: "Сохранить",
    cancel: "Отмена",
    myContacts: "Мои контакты",
    recentChats: "Недавние чаты",
    searchForUsers: "Поиск пользователей",
    noContactsFound: "Контакты не найдены",
    noChatsFound: "Чаты не найдены",
    noUsersFound: "Пользователи не найдены",
    loading: "Загрузка...",
    error: "Ошибка",
    success: "Успешно",
    userProfile: "Профиль пользователя",
    information: "Информация",
    userId: "ID пользователя",
    registrationDate: "Дата регистрации",
    lastVisit: "Последний визит",
    additional: "Дополнительно",
    additionalInfo:
      "Здесь может быть дополнительная информация о пользователе, такая как:",
    language: "Язык",
    education: "Образование",
    work: "Работа",
    notSpecified: "Не указано",
    contactName: "Имя контакта",
    unblock: "Разблокировать",
    block: "Заблокировать",
    participants: "участников",
    typing: "печатает...",
    editMessage: "Редактирование сообщения",
    writeMessage: "Напишите сообщение...",
    cannotSendMessage: "Вы не можете отправлять сообщения в этот чат",
    writeMessageBtn: "Написать сообщение",
    justNow: "Только что",
    minutesAgo: "мин назад",
    hoursAgo: "ч назад",
    daysAgo: "дн назад",
  },
  yf = {
    editProfile: "Редактировать профиль",
    changePhoto: "Нажмите на камеру для смены фото",
    usernameHelper:
      "Минимум 3 символа, только буквы, цифры и подчеркивания. Будет сохранен в нижнем регистре.",
    fullNameHelper: "Как вас будут видеть другие пользователи",
    status: "Статус",
    additionalInfo: "Дополнительная информация",
    unknown: "Неизвестно",
    usernameRequired: "Имя пользователя обязательно",
    fullNameRequired: "Полное имя обязательно",
    usernameMinLength: "Имя пользователя должно содержать минимум 3 символа",
    fullNameMinLength: "Полное имя должно содержать минимум 2 символа",
    usernamePattern:
      "Имя пользователя может содержать только буквы, цифры и подчеркивания",
    saving: "Сохранение...",
    profileUpdated: "Профиль успешно обновлен",
    updateProfileError: "Ошибка при обновлении профиля",
  },
  bf = {
    description:
      "Анонимный мессенджер без необходимости ввода номера при регистрации. Создан by Noob1e1337",
  },
  wf = {
    serverUnavailable:
      "Сервер недоступен. Убедитесь, что сервер запущен на порту 3001.",
    connectionError:
      "Ошибка подключения к серверу. Проверьте интернет-соединение.",
    generalError: "Произошла ошибка. Попробуйте еще раз.",
    networkError: "Ошибка сети",
    timeoutError: "Превышено время ожидания",
  },
  vf = {
    common: of,
    auth: af,
    settings: cf,
    notifications: lf,
    privacy: df,
    changePassword: uf,
    appearance: hf,
    language: ff,
    storage: pf,
    navigation: gf,
    chat: mf,
    people: xf,
    profile: yf,
    about: bf,
    errors: wf,
  },
  Sf = {
    save: "Save",
    cancel: "Cancel",
    close: "Close",
    edit: "Edit",
    delete: "Delete",
    confirm: "Confirm",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    yes: "Yes",
    no: "No",
  },
  Cf = {
    login: "Login",
    register: "Register",
    logout: "Logout",
    username: "Username",
    password: "Password",
    fullName: "Full Name",
    loginToAccount: "Sign in to your account",
    createAccount: "Create a new account",
    enterUsername: "Enter username",
    enterPassword: "Enter password",
    enterFullName: "Enter your name",
    fillAllFields: "Please fill in all fields",
    enterName: "Please enter your name",
    noAccount: "Don't have an account? Register",
    haveAccount: "Already have an account? Sign in",
    invalidCredentials: "Invalid username or password",
    userExists: "User with this username already exists",
    registrationError: "Registration error",
    loginError: "Login error",
  },
  kf = {
    title: "Settings",
    profile: "Profile",
    notifications: "Notifications",
    privacy: "Privacy",
    appearance: "Appearance",
    language: "Language",
    storage: "Storage",
    about: "About",
    profileSettings: "Profile Settings",
    editProfile: "Edit Profile",
    userId: "User ID",
    registrationDate: "Registration Date",
    lastSeen: "Last Seen",
    online: "Online",
    away: "Away",
    offline: "Offline",
  },
  Ef = {
    title: "Notification Settings",
    messages: "Messages",
    mentions: "Mentions",
    calls: "Calls",
    sound: "Sound",
    messagesDesc: "Receive notifications for new messages",
    mentionsDesc: "Receive notifications when mentioned",
    callsDesc: "Receive notifications for incoming calls",
    soundDesc: "Play sound when receiving notifications",
    notificationsTitle: "Notifications",
    allNotifications: "All notifications",
    newMessage: "New message",
    newContact: "New contact",
    systemUpdate: "System update",
    contactAdded: "added you to contacts",
    newVersionAvailable: "New app version available",
    yesterday: "Yesterday",
    hourAgo: "hour ago",
    notificationsComingSoon:
      "Notifications feature will be available in the next version",
  },
  jf = {
    title: "Privacy Settings",
    accountSecurity: "Account Security",
    changePassword: "Change Password",
    changePasswordDesc: "Update your password for better security",
    change: "Change",
    twoFactorAuth: "Two-Factor Authentication",
    twoFactorAuthDesc: "Additional protection for your account",
    profileVisibility: "Profile Visibility",
    showOnlineStatus: "Show online status",
    showOnlineStatusDesc: "Other users will see when you're online",
    showLastSeen: "Show last seen time",
    showLastSeenDesc: "Show when you were last online",
    messageSettings: "Message Settings",
    readReceipts: "Read receipts",
    readReceiptsDesc: "Send read receipts for messages",
    allowForwarding: "Allow message forwarding",
    allowForwardingDesc: "Other users can forward your messages",
    screenshotProtection: "Screenshot protection",
    screenshotProtectionDesc: "Warn when attempting to take a screenshot",
    privacyInfo:
      "These settings help you control your privacy and security in Leet.",
  },
  Rf = {
    title: "Change Password",
    description:
      "To change your password, enter your current password and create a new secure password.",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm New Password",
    passwordRequirements: "Password Requirements:",
    minLength: "Minimum 6 characters",
    passwordStrength: "Password Strength:",
    veryWeak: "Very Weak",
    weak: "Weak",
    medium: "Medium",
    good: "Good",
    excellent: "Excellent",
    passwordsNotMatch: "Passwords don't match",
    enterCurrentPassword: "Enter current password",
    enterNewPassword: "Enter new password",
    confirmNewPassword: "Confirm new password",
    passwordChanged: "Password changed successfully!",
    changePasswordError: "Error changing password",
    wrongCurrentPassword: "Wrong current password",
    passwordTooShort: "New password must contain at least 6 characters",
    passwordSameAsCurrent: "New password must be different from current",
    changingPassword: "Changing password...",
    changePasswordBtn: "Change Password",
  },
  _f = {
    title: "Appearance Settings",
    theme: "Theme",
    darkTheme: "Dark",
    lightTheme: "Light",
    customTheme: "Custom",
    darkThemeDesc: "Classic dark theme",
    lightThemeDesc: "Light theme for daytime use",
    customThemeDesc: "Customize your palette",
    fontSize: "Font Size",
    small: "Small",
    medium: "Medium",
    large: "Large",
    customPalette: "Custom Palette",
    customPaletteDesc: "Customize colors for your custom theme",
    reset: "Reset",
  },
  Af = {
    title: "Language Settings",
    interfaceLanguage: "Interface Language",
    russian: "Русский",
    english: "English",
    chinese: "Chinese",
  },
  Tf = {
    title: "Storage Settings",
    clearCache: "Clear Cache",
    clearAllData: "Delete All Data",
    clearCacheDesc: "Clear browser cache and temporary files",
    clearAllDataDesc: "Delete all application data (including settings)",
    cacheCleared: "Cache cleared!",
    allDataDeleted: "All data deleted! The application will be reloaded.",
    confirmDeleteAll:
      "Are you sure you want to delete ALL data? This action cannot be undone.",
    usedSpace: "Used space",
    of: "of",
  },
  Pf = {
    chats: "Chats",
    contacts: "Contacts",
    notifications: "Notifications",
    modules: "Modules",
    settings: "Settings",
    comingSoon: "Soon",
    user: "User",
    online: "Online",
  },
  If = {
    newMessage: "New Message",
    send: "Send",
    typeMessage: "Type a message...",
    noMessages: "No messages",
    loadingMessages: "Loading messages...",
    messageSent: "Sent",
    messageDelivered: "Delivered",
    messageRead: "Read",
    online: "online",
    lastSeen: "last seen",
    typing: "typing...",
    search: "Search",
    searchPlaceholder: "Search in chats...",
    noChats: "No chats",
    startChat: "Start Chat",
    addContact: "Add Contact",
    title: "Chats",
    recentChats: "Recent Chats",
    newChat: "New Chat",
    selectChat: "Select a chat to start messaging",
    noActiveChat: "No active chat",
    archive: "Archive",
    archivedChats: "Archived chats",
    archiveEmpty: "Archive is empty",
    archiveEmptyDesc: "Archived chats will appear here",
    unarchive: "Unarchive",
    archiveChat: "Archive",
    unarchiveChat: "Unarchive",
    chatArchived: 'Chat "{name}" moved to archive',
    chatUnarchived: 'Chat "{name}" restored from archive',
    archiveError: "Error archiving chat",
    unarchiveError: "Error unarchiving chat",
  },
  Mf = {
    title: "Contacts",
    search: "Search contacts",
    searchPlaceholder: "Search by name or username...",
    noContacts: "No contacts",
    addContact: "Add contact",
    removeContact: "Remove contact",
    renameContact: "Rename contact",
    startChat: "Start chat",
    blockUser: "Block user",
    online: "online",
    lastSeen: "last seen",
    wasRecently: "was recently",
    offline: "Offline",
    away: "Away",
    unknown: "Unknown",
    contacts: "Contacts",
    chats: "Chats",
    searchUsers: "Search users",
    searchUsersPlaceholder: "Enter name or username...",
    noResults: "No results",
    addToContacts: "Add to contacts",
    rename: "Rename",
    newName: "New name",
    save: "Save",
    cancel: "Cancel",
    myContacts: "My contacts",
    recentChats: "Recent chats",
    searchForUsers: "Search for users",
    noContactsFound: "No contacts found",
    noChatsFound: "No chats found",
    noUsersFound: "No users found",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    userProfile: "User Profile",
    information: "Information",
    userId: "User ID",
    registrationDate: "Registration Date",
    lastVisit: "Last Visit",
    additional: "Additional",
    additionalInfo:
      "Here can be additional information about the user, such as:",
    language: "Language",
    education: "Education",
    work: "Work",
    notSpecified: "Not specified",
    contactName: "Contact name",
    unblock: "Unblock",
    block: "Block",
    participants: "participants",
    typing: "typing...",
    editMessage: "Editing message",
    writeMessage: "Write a message...",
    cannotSendMessage: "You cannot send messages to this chat",
    writeMessageBtn: "Write message",
    justNow: "Just now",
    minutesAgo: "min ago",
    hoursAgo: "h ago",
    daysAgo: "d ago",
  },
  Df = {
    editProfile: "Edit Profile",
    changePhoto: "Click on camera to change photo",
    usernameHelper:
      "Minimum 3 characters, letters, numbers and underscores only. Will be saved in lowercase.",
    fullNameHelper: "How other users will see you",
    status: "Status",
    additionalInfo: "Additional Information",
    unknown: "Unknown",
    usernameRequired: "Username is required",
    fullNameRequired: "Full name is required",
    usernameMinLength: "Username must contain at least 3 characters",
    fullNameMinLength: "Full name must contain at least 2 characters",
    usernamePattern:
      "Username can only contain letters, numbers and underscores",
    saving: "Saving...",
    profileUpdated: "Profile updated successfully",
    updateProfileError: "Error updating profile",
  },
  Lf = {
    description:
      "Anonymous messenger Leet — no phone number required. Created by Noob1e1337",
  },
  Of = {
    serverUnavailable:
      "Server unavailable. Make sure the server is running on port 3001.",
    connectionError: "Connection error. Check your internet connection.",
    generalError: "An error occurred. Please try again.",
    networkError: "Network Error",
    timeoutError: "Request Timeout",
  },
  Nf = {
    common: Sf,
    auth: Cf,
    settings: kf,
    notifications: Ef,
    privacy: jf,
    changePassword: Rf,
    appearance: _f,
    language: Af,
    storage: Tf,
    navigation: Pf,
    chat: If,
    people: Mf,
    profile: Df,
    about: Lf,
    errors: Of,
  },
  Ff = {
    save: "保存",
    cancel: "取消",
    close: "关闭",
    edit: "编辑",
    delete: "删除",
    confirm: "确认",
    loading: "加载中...",
    error: "错误",
    success: "成功",
    yes: "是",
    no: "否",
  },
  zf = {
    login: "登录",
    register: "注册",
    logout: "退出登录",
    username: "用户名",
    password: "密码",
    fullName: "全名",
    loginToAccount: "请登录您的账户",
    createAccount: "创建新账户",
    enterUsername: "请输入用户名",
    enterPassword: "请输入密码",
    enterFullName: "请输入您的全名",
    fillAllFields: "请填写所有字段",
    enterName: "请输入您的名字",
    noAccount: "没有账户? 注册",
    haveAccount: "已经有一个账户? 登录",
    invalidCredentials: "用户名或密码错误",
    userExists: "用户名已存在",
    registrationError: "注册错误",
    loginError: "登录错误",
  },
  Bf = {
    title: "设置",
    profile: "个人资料",
    notifications: "通知",
    privacy: "隐私",
    appearance: "外观",
    language: "语言",
    storage: "存储",
    about: "关于",
    profileSettings: "个人资料设置",
    editProfile: "编辑个人资料",
    userId: "用户ID",
    registrationDate: "注册日期",
    lastSeen: "最后访问",
    online: "在线",
    away: "离开",
    offline: "离线",
  },
  Uf = {
    title: "通知设置",
    messages: "消息",
    mentions: "提及",
    calls: "电话",
    sound: "声音",
    messagesDesc: "接收新消息通知",
    mentionsDesc: "接收提及通知",
    callsDesc: "接收来电通知",
    soundDesc: "播放通知声音",
    notificationsTitle: "通知",
    allNotifications: "所有通知",
    newMessage: "新消息",
    newContact: "新联系人",
    systemUpdate: "系统更新",
    contactAdded: "添加您为联系人",
    newVersionAvailable: "有新版本可用",
    yesterday: "昨天",
    hourAgo: "小时前",
    notificationsComingSoon: "通知功能将在下一个版本中可用",
  },
  $f = {
    title: "隐私设置",
    accountSecurity: "账户安全",
    changePassword: "更改密码",
    changePasswordDesc: "更新密码以提高安全性",
    change: "更改",
    twoFactorAuth: "两步验证",
    twoFactorAuthDesc: "额外的账户保护",
    profileVisibility: "可见性",
    showOnlineStatus: "显示在线状态",
    showOnlineStatusDesc: "其他用户将看到您何时在线",
    showLastSeen: "显示最后访问时间",
    showLastSeenDesc: "显示您上次在线的时间",
    messageSettings: "消息设置",
    readReceipts: "阅读回执",
    readReceiptsDesc: "发送阅读回执",
    allowForwarding: "允许转发消息",
    allowForwardingDesc: "其他用户可以转发您的消息",
    screenshotProtection: "截图保护",
    screenshotProtectionDesc: "当尝试截图时发出警告",
    privacyInfo: "这些设置有助于控制您的隐私和安全性。",
  },
  Wf = {
    title: "更改密码",
    description: "输入当前密码并创建一个安全的新密码。",
    currentPassword: "当前密码",
    newPassword: "新密码",
    confirmPassword: "确认新密码",
    passwordRequirements: "密码要求:",
    minLength: "至少6个字符",
    passwordStrength: "密码强度:",
    veryWeak: "非常弱",
    weak: "弱",
    medium: "中等",
    good: "好",
    excellent: "优秀",
    passwordsNotMatch: "密码不匹配",
    enterCurrentPassword: "输入当前密码",
    enterNewPassword: "输入新密码",
    confirmNewPassword: "确认新密码",
    passwordChanged: "密码已成功更改!",
    changePasswordError: "更改密码时出错",
    wrongCurrentPassword: "当前密码错误",
    passwordTooShort: "新密码必须至少包含6个字符",
    passwordSameAsCurrent: "新密码必须与当前密码不同",
    changingPassword: "更改密码...",
    changePasswordBtn: "更改密码",
  },
  Hf = {
    title: "外观设置",
    theme: "主题",
    darkTheme: "暗色",
    lightTheme: "亮色",
    customTheme: "自定义",
    darkThemeDesc: "经典暗色主题",
    lightThemeDesc: "亮色主题",
    customThemeDesc: "自定义颜色",
    fontSize: "字体大小",
    small: "小",
    medium: "中",
    large: "大",
    customPalette: "自定义颜色",
    customPaletteDesc: "自定义颜色",
    reset: "重置",
  },
  qf = {
    title: "语言设置",
    interfaceLanguage: "界面语言",
    russian: "俄语",
    english: "英语",
    chinese: "中文",
  },
  Vf = {
    title: "存储设置",
    clearCache: "清除缓存",
    clearAllData: "删除所有数据",
    clearCacheDesc: "清除浏览器缓存和临时文件",
    clearAllDataDesc: "删除所有数据 (包括设置)",
    cacheCleared: "缓存已清除!",
    allDataDeleted: "所有数据已删除! 应用程序将重新加载。",
    confirmDeleteAll: "您确定要删除所有数据吗? 此操作无法撤销。",
    usedSpace: "已使用空间",
    of: "共",
  },
  Kf = {
    chats: "聊天",
    contacts: "联系人",
    notifications: "通知",
    modules: "模块",
    settings: "设置",
    comingSoon: "即将推出",
    user: "用户",
    online: "在线",
  },
  Yf = {
    newMessage: "新消息",
    send: "发送",
    typeMessage: "输入消息...",
    noMessages: "没有消息",
    loadingMessages: "加载消息...",
    messageSent: "已发送",
    messageDelivered: "已送达",
    messageRead: "已读",
    online: "在线",
    lastSeen: "最后在线",
    typing: "正在输入...",
    search: "搜索",
    searchPlaceholder: "搜索聊天...",
    noChats: "没有聊天",
    startChat: "开始聊天",
    addContact: "添加联系人",
    title: "聊天",
    recentChats: "最近聊天",
    newChat: "新聊天",
    selectChat: "选择聊天开始对话",
    noActiveChat: "没有活跃的聊天",
    archive: "存档",
    archivedChats: "已存档的聊天",
    archiveEmpty: "存档为空",
    archiveEmptyDesc: "这里将显示已存档的聊天",
    unarchive: "从存档恢复",
    archiveChat: "存档",
    unarchiveChat: "从存档恢复",
    chatArchived: '聊天 "{name}" 已移动到存档',
    chatUnarchived: '聊天 "{name}" 已从存档恢复',
    archiveError: "存档聊天时出错",
    unarchiveError: "从存档恢复聊天时出错",
  },
  Jf = {
    title: "联系人",
    search: "搜索联系人",
    searchPlaceholder: "搜索用户名...",
    noContacts: "没有联系人",
    addContact: "添加联系人",
    removeContact: "删除联系人",
    renameContact: "重命名联系人",
    startChat: "开始聊天",
    blockUser: "封锁用户",
    online: "在线",
    lastSeen: "最后在线",
    wasRecently: "最近在线",
    offline: "离线",
    away: "离开",
    unknown: "未知",
    contacts: "联系人",
    chats: "聊天",
    searchUsers: "搜索用户",
    searchUsersPlaceholder: "输入名字或用户名...",
    noResults: "没有结果",
    addToContacts: "添加到联系人",
    rename: "重命名",
    newName: "新名字",
    save: "保存",
    cancel: "取消",
    myContacts: "我的联系人",
    recentChats: "最近聊天",
    searchForUsers: "搜索用户",
    noContactsFound: "联系人未找到",
    noChatsFound: "聊天未找到",
    noUsersFound: "用户未找到",
    loading: "加载中...",
    error: "错误",
    success: "成功",
    userProfile: "用户资料",
    information: "信息",
    userId: "用户ID",
    registrationDate: "注册日期",
    lastVisit: "最后访问",
    additional: "附加",
    additionalInfo: "这里可以添加用户的信息, 例如:",
    language: "语言",
    education: "教育",
    work: "工作",
    notSpecified: "未指定",
    contactName: "联系人名字",
    unblock: "解锁",
    block: "封锁",
    participants: "参与者",
    typing: "正在输入...",
    editMessage: "编辑消息",
    writeMessage: "输入消息...",
    cannotSendMessage: "您不能发送消息到这个聊天",
    writeMessageBtn: "输入消息",
    justNow: "刚刚",
    minutesAgo: "分钟前",
    hoursAgo: "小时前",
    daysAgo: "天前",
  },
  Xf = {
    editProfile: "编辑个人资料",
    changePhoto: "点击相机更换照片",
    usernameHelper: "至少3个字符, 只包含字母, 数字和下划线. 将保存为小写.",
    fullNameHelper: "其他用户将如何称呼您",
    status: "状态",
    additionalInfo: "附加信息",
    unknown: "未知",
    usernameRequired: "用户名是必需的",
    fullNameRequired: "全名是必需的",
    usernameMinLength: "用户名必须至少包含3个字符",
    fullNameMinLength: "全名必须至少包含2个字符",
    usernamePattern: "用户名只能包含字母, 数字和下划线",
    saving: "保存...",
    profileUpdated: "个人资料已成功更新",
    updateProfileError: "更新个人资料时出错",
  },
  Gf = {
    description: "匿名即时通讯应用，注册时无需输入电话号码。由 Noob1e1337 创建",
  },
  Qf = {
    serverUnavailable: "服务器不可用. 请确保服务器在端口3001上运行.",
    connectionError: "连接到服务器时出错. 请检查互联网连接.",
    generalError: "发生错误. 请重试.",
    networkError: "网络错误",
    timeoutError: "超时错误",
  },
  Zf = {
    common: Ff,
    auth: zf,
    settings: Bf,
    notifications: Uf,
    privacy: $f,
    changePassword: Wf,
    appearance: Hf,
    language: qf,
    storage: Vf,
    navigation: Kf,
    chat: Yf,
    people: Jf,
    profile: Xf,
    about: Gf,
    errors: Qf,
  },
  Cr = { ru: vf, en: Nf, zh: Zf },
  Bo = (t, e) =>
    e.split(".").reduce((n, r) => (n && n[r] !== void 0 ? n[r] : e), t),
  kr = (t, e) =>
    t.replace(/\{(\w+)\}/g, (n, r) => (e[r] !== void 0 ? String(e[r]) : n)),
  ep = () => {
    const { language: t } = rn(),
      e = Cr[t] || Cr.ru,
      n = h.useCallback(
        (s, i) => {
          const a = Bo(e, s);
          return i ? kr(a, i) : a;
        },
        [e],
      ),
      r = h.useCallback(
        (s, i, a) => {
          const c = Bo(e, s);
          if (c && c !== s) return a ? kr(c, a) : c;
          const d = i || s;
          return a ? kr(d, a) : d;
        },
        [e],
      );
    return {
      t: n,
      tWithFallback: r,
      language: t,
      availableLanguages: Object.keys(Cr),
    };
  },
  tp = ({ attachment: t, isOwnMessage: e = !1 }) => {
    const {
        currentTrack: n,
        isPlaying: r,
        currentTime: s,
        duration: i,
        loadAndPlay: a,
        togglePlay: c,
        seek: d,
      } = gs(),
      l = (n == null ? void 0 : n.id) === t.id,
      u = l && r,
      m = (E) => {
        const T = Math.floor(E / 60),
          M = Math.floor(E % 60);
        return `${T}:${M.toString().padStart(2, "0")}`;
      },
      b = () => {
        l ? c() : a(t);
      },
      w = (() => {
        const E = t.name || "",
          T = E.lastIndexOf(".");
        return T > 0 ? E.substring(0, T) : E;
      })(),
      p = w.split(" - "),
      x = p.length > 1 ? p[0].trim() : "",
      g = p.length > 1 ? p.slice(1).join(" - ").trim() : w,
      k = l && i > 0 ? (s / i) * 100 : 0;
    return o.jsx(y, {
      onClick: (E) => E.stopPropagation(),
      sx: { width: 240 },
      children: o.jsxs(y, {
        sx: { display: "flex", alignItems: "center", gap: 1, py: 0.3 },
        children: [
          o.jsx(y, {
            onClick: (E) => {
              (E.stopPropagation(), b());
            },
            sx: {
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: e
                ? "rgba(255,255,255,0.2)"
                : "rgba(135,116,225,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              cursor: "pointer",
              transition: "background 0.15s",
              "&:active": {
                background: e
                  ? "rgba(255,255,255,0.35)"
                  : "rgba(135,116,225,0.3)",
              },
            },
            children: u
              ? o.jsx(Dn, {
                  sx: { color: e ? "#fff" : "#8774E1", fontSize: 20 },
                })
              : o.jsx(Xt, {
                  sx: { color: e ? "#fff" : "#8774E1", fontSize: 20 },
                }),
          }),
          o.jsxs(y, {
            sx: { flex: 1, minWidth: 0 },
            children: [
              o.jsx(A, {
                noWrap: !0,
                sx: {
                  fontWeight: 500,
                  fontSize: "0.8rem",
                  color: e ? "#fff" : "text.primary",
                  lineHeight: 1.2,
                },
                children: x ? `${x} — ${g}` : g,
              }),
              o.jsxs(y, {
                sx: {
                  mt: 0.5,
                  mb: 0.3,
                  position: "relative",
                  height: 3,
                  borderRadius: 2,
                  overflow: "hidden",
                },
                children: [
                  o.jsx(y, {
                    sx: {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: e
                        ? "rgba(255,255,255,0.2)"
                        : "rgba(135,116,225,0.2)",
                      borderRadius: 2,
                    },
                  }),
                  o.jsx(y, {
                    sx: {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      width: `${k}%`,
                      backgroundColor: e ? "#fff" : "#8774E1",
                      borderRadius: 2,
                      transition: "width 0.3s linear",
                    },
                  }),
                ],
              }),
              o.jsxs(A, {
                sx: {
                  fontSize: "0.65rem",
                  color: e ? "rgba(255,255,255,0.6)" : "text.secondary",
                  lineHeight: 1,
                },
                children: [m(l ? s : 0), " / ", m(l ? i : t.duration || 0)],
              }),
            ],
          }),
        ],
      }),
    });
  },
  Uo = "http://217.114.11.48:3001",
  $o = new Map(),
  np = ({ attachment: t, compact: e, onClick: n }) => {
    const r = `${Uo}${t.url}`,
      s = t.thumbnailUrl ? `${Uo}${t.thumbnailUrl}` : void 0,
      [i, a] = h.useState(() => $o.get(r) || null),
      [c, d] = h.useState(i ? 1 : 0),
      [l, u] = h.useState(!!i),
      [m, b] = h.useState(!1),
      [w, p] = h.useState(
        t.width && t.height ? { w: t.width, h: t.height } : null,
      );
    if (e)
      return o.jsx("div", {
        onClick: n,
        style: {
          width: 80,
          height: 80,
          borderRadius: 8,
          overflow: "hidden",
          cursor: "pointer",
          backgroundColor: "#1a1a2e",
          flexShrink: 0,
          position: "relative",
        },
        children: o.jsx("img", {
          src: i || s || r,
          style: { width: "100%", height: "100%", objectFit: "cover" },
          draggable: !1,
        }),
      });
    const x = !!w,
      g = 280,
      k = 320;
    let E = {
      position: "relative",
      borderRadius: 12,
      overflow: "hidden",
      cursor: "pointer",
      backgroundColor: "#1a1a2e",
      minHeight: 60,
    };
    if (x) {
      const D = w.w / w.h;
      let _ = Math.min(w.w, g),
        P = _ / D;
      (P > k && ((P = k), (_ = P * D)),
        (E.width = Math.round(_)),
        (E.height = Math.round(P)));
    } else ((E.width = "100%"), (E.maxWidth = g));
    h.useEffect(() => {
      if (i) return;
      const D = new XMLHttpRequest();
      return (
        D.open("GET", r),
        (D.responseType = "blob"),
        (D.onprogress = (_) => {
          _.lengthComputable && _.total > 0 && d(_.loaded / _.total);
        }),
        (D.onload = () => {
          if (D.status === 200) {
            const _ = D.response,
              P = URL.createObjectURL(_);
            ($o.set(r, P), a(P), d(1), requestAnimationFrame(() => u(!0)));
          }
        }),
        (D.onerror = () => {
          (a(r), d(1), u(!0));
        }),
        D.send(),
        () => {
          D.readyState !== 4 && D.abort();
        }
      );
    }, [r]);
    const T = (D) => {
        if (!w) {
          const _ = D.currentTarget;
          p({ w: _.naturalWidth, h: _.naturalHeight });
        }
      },
      M = 18,
      H = 2 * Math.PI * M,
      Z = H * (1 - c);
    return o.jsxs("div", {
      onClick: n,
      style: E,
      children: [
        s &&
          o.jsx("img", {
            src: s,
            onLoad: () => b(!0),
            style: {
              display: "block",
              width: "100%",
              borderRadius: 12,
              filter: l ? "none" : "blur(10px)",
              transform: l ? "scale(1)" : "scale(1.08)",
              transition: "filter 0.35s ease, transform 0.35s ease",
              opacity: m && !l ? 1 : 0,
              ...(l && {
                position: "absolute",
                inset: 0,
                height: "100%",
                objectFit: "cover",
              }),
            },
            draggable: !1,
          }),
        i &&
          o.jsx("img", {
            src: i,
            onLoad: T,
            style: {
              display: "block",
              width: "100%",
              borderRadius: 12,
              opacity: l ? 1 : 0,
              transition: "opacity 0.3s ease",
            },
            draggable: !1,
          }),
        !i &&
          !s &&
          o.jsx("img", {
            src: r,
            onLoad: (D) => {
              (T(D), u(!0), d(1));
            },
            style: {
              display: "block",
              width: "100%",
              borderRadius: 12,
              opacity: l ? 1 : 0,
              transition: "opacity 0.3s ease",
            },
            draggable: !1,
          }),
        !l &&
          o.jsx("div", {
            style: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            },
            children: o.jsxs("svg", {
              width: 44,
              height: 44,
              viewBox: "0 0 44 44",
              children: [
                o.jsx("circle", {
                  cx: 22,
                  cy: 22,
                  r: M,
                  fill: "rgba(0,0,0,0.45)",
                  stroke: "rgba(255,255,255,0.25)",
                  strokeWidth: 2.5,
                }),
                o.jsx("circle", {
                  cx: 22,
                  cy: 22,
                  r: M,
                  fill: "none",
                  stroke: "white",
                  strokeWidth: 2.5,
                  strokeDasharray: H,
                  strokeDashoffset: Z,
                  strokeLinecap: "round",
                  transform: "rotate(-90 22 22)",
                  style: { transition: "stroke-dashoffset 0.2s ease" },
                }),
              ],
            }),
          }),
      ],
    });
  },
  rp = je.memo(np),
  rt = "http://217.114.11.48:3001",
  sp = ({ attachments: t, compact: e = !1, isOwnMessage: n = !1 }) => {
    ep();
    const [r, s] = h.useState(null),
      [i, a] = h.useState(!1),
      [c, d] = h.useState(null),
      [l, u] = h.useState(null),
      [m, b] = h.useState({});
    h.useRef({});
    const w = h.useRef({}),
      p = (P) => {
        if (P === 0) return "0 Bytes";
        const J = 1024,
          ae = ["Bytes", "KB", "MB", "GB"],
          te = Math.floor(Math.log(P) / Math.log(J));
        return parseFloat((P / Math.pow(J, te)).toFixed(2)) + " " + ae[te];
      },
      x = (P) => {
        switch (P) {
          case "image":
            return o.jsx(Tc, {});
          case "video":
            return o.jsx(Ac, {});
          case "audio":
            return o.jsx(_c, {});
          case "file":
            return o.jsx(Bs, {});
          default:
            return o.jsx(Bs, {});
        }
      },
      g = (P) => {
        switch (P) {
          case "image":
            return "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
          case "video":
            return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
          case "audio":
            return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
          case "file":
            return "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)";
          default:
            return "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)";
        }
      },
      k = (P) => {
        (s(P), a(!0));
      },
      { currentTrack: E, isPlaying: T, loadAndPlay: M, togglePlay: H } = gs(),
      Z = (P, J) => {
        J && ((E == null ? void 0 : E.id) === P ? H() : M(J));
      },
      D = async (P) => {
        try {
          const ae = await (await fetch(`${rt}${P.url}`)).blob(),
            te = window.URL.createObjectURL(ae),
            re = document.createElement("a");
          ((re.href = te),
            (re.download = P.name),
            (re.style.display = "none"),
            document.body.appendChild(re),
            re.click(),
            document.body.removeChild(re),
            setTimeout(() => window.URL.revokeObjectURL(te), 1e3));
        } catch {
          window.open(`${rt}${P.url}`, "_system");
        }
      },
      _ = (P) => {
        const J = e && t.length > 1;
        return P.type === "audio"
          ? o.jsx(
              y,
              { children: o.jsx(tp, { attachment: P, isOwnMessage: n }) },
              P.id,
            )
          : o.jsxs(
              jc,
              {
                elevation: 0,
                sx: {
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  ...(J && {
                    width: 80,
                    height: 80,
                    minWidth: 80,
                    minHeight: 80,
                  }),
                },
                onClick: () => {
                  k(P);
                },
                children: [
                  P.type === "image" &&
                    o.jsx(rp, {
                      attachment: P,
                      compact: J,
                      onClick: () => k(P),
                    }),
                  P.type === "video" &&
                    o.jsxs(y, {
                      sx: { position: "relative" },
                      children: [
                        o.jsx(y, {
                          component: "img",
                          src: P.thumbnailUrl
                            ? `${rt}${P.thumbnailUrl}`
                            : `${rt}${P.url}`,
                          alt: P.name,
                          sx: {
                            width: "100%",
                            height: J ? 80 : 200,
                            objectFit: "cover",
                            display: "block",
                          },
                        }),
                        o.jsx(y, {
                          sx: {
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            background: "rgba(0,0,0,0.7)",
                            borderRadius: "50%",
                            width: 40,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          },
                          children: o.jsx(Xt, {
                            sx: { color: "white", fontSize: 20 },
                          }),
                        }),
                      ],
                    }),
                  P.type === "file" &&
                    o.jsxs(y, {
                      sx: {
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        height: J ? 80 : "auto",
                      },
                      children: [
                        o.jsx(y, {
                          sx: {
                            width: J ? 40 : 60,
                            height: J ? 40 : 60,
                            borderRadius: "12px",
                            background: g(P.type),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          },
                          children: x(P.type),
                        }),
                        !J &&
                          o.jsxs(y, {
                            sx: { flex: 1, minWidth: 0 },
                            children: [
                              o.jsx(A, {
                                variant: "body2",
                                noWrap: !0,
                                sx: { fontWeight: 500 },
                                children: P.name,
                              }),
                              o.jsx(A, {
                                variant: "caption",
                                sx: { color: "text.secondary" },
                                children: p(P.size),
                              }),
                            ],
                          }),
                      ],
                    }),
                  !J &&
                    o.jsxs(y, {
                      sx: {
                        position: "absolute",
                        top: 8,
                        right: 8,
                        display: "flex",
                        gap: 0.5,
                        opacity: 0,
                        transition: "opacity 0.2s ease",
                        ".MuiPaper-root:hover &": { opacity: 1 },
                      },
                      children: [
                        o.jsx(zs, {
                          title: "Скачать",
                          arrow: !0,
                          children: o.jsx(X, {
                            size: "small",
                            onClick: (ae) => {
                              (ae.stopPropagation(), D(P));
                            },
                            sx: {
                              backgroundColor: "rgba(0,0,0,0.7)",
                              color: "white",
                              "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                            },
                            children: o.jsx(Fs, { sx: { fontSize: 16 } }),
                          }),
                        }),
                        o.jsx(zs, {
                          title: "Открыть",
                          arrow: !0,
                          children: o.jsx(X, {
                            size: "small",
                            onClick: (ae) => {
                              (ae.stopPropagation(),
                                window.open(`${rt}${P.url}`, "_blank"));
                            },
                            sx: {
                              backgroundColor: "rgba(0,0,0,0.7)",
                              color: "white",
                              "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                            },
                            children: o.jsx(Rc, { sx: { fontSize: 16 } }),
                          }),
                        }),
                      ],
                    }),
                ],
              },
              P.id,
            );
      };
    return !t || t.length === 0
      ? null
      : o.jsxs(o.Fragment, {
          children: [
            o.jsx(y, {
              sx: {
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                mt: 1,
                ...(e && { gap: 0.5 }),
              },
              children: t.map(_),
            }),
            o.jsxs(vt, {
              open: i,
              onClose: () => a(!1),
              fullScreen: !0,
              PaperProps: {
                sx: { backgroundColor: "#000", m: 0, borderRadius: 0 },
              },
              children: [
                o.jsxs(y, {
                  sx: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 1,
                    py: 0.5,
                    zIndex: 10,
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
                  },
                  children: [
                    o.jsx(X, {
                      onClick: () => a(!1),
                      sx: { color: "#fff" },
                      children: o.jsx(Qe, {}),
                    }),
                    o.jsx(A, {
                      variant: "body2",
                      noWrap: !0,
                      sx: { color: "#fff", flex: 1, mx: 1, opacity: 0.8 },
                      children: r == null ? void 0 : r.name,
                    }),
                    r &&
                      o.jsx(X, {
                        onClick: () => D(r),
                        sx: { color: "#fff" },
                        children: o.jsx(Fs, {}),
                      }),
                  ],
                }),
                o.jsx(y, {
                  sx: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                  },
                  onClick: () => a(!1),
                  children:
                    r &&
                    o.jsxs(o.Fragment, {
                      children: [
                        r.type === "image" &&
                          o.jsx(y, {
                            component: "img",
                            src: `${rt}${r.url}`,
                            alt: r.name,
                            onClick: (P) => P.stopPropagation(),
                            sx: {
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "contain",
                            },
                          }),
                        r.type === "video" &&
                          o.jsx(y, {
                            onClick: (P) => P.stopPropagation(),
                            sx: {
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                            },
                            children: o.jsx("video", {
                              ref: (P) => {
                                P && (w.current[r.id] = P);
                              },
                              src: `${rt}${r.url}`,
                              controls: !0,
                              playsInline: !0,
                              style: { width: "100%", maxHeight: "100%" },
                              onPlay: () => u(r.id),
                              onPause: () => u(null),
                            }),
                          }),
                        r.type === "audio" &&
                          o.jsx(y, {
                            onClick: (P) => P.stopPropagation(),
                            sx: { p: 4 },
                            children: o.jsx(y, {
                              sx: {
                                width: 160,
                                height: 160,
                                borderRadius: "50%",
                                background: g(r.type),
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mx: "auto",
                                mb: 3,
                              },
                              children: o.jsx(X, {
                                size: "large",
                                onClick: () => Z(r.id, r),
                                sx: { color: "white" },
                                children:
                                  (E == null ? void 0 : E.id) === r.id && T
                                    ? o.jsx(Dn, { sx: { fontSize: 48 } })
                                    : o.jsx(Xt, { sx: { fontSize: 48 } }),
                              }),
                            }),
                          }),
                        r.type === "file" &&
                          o.jsxs(y, {
                            onClick: (P) => P.stopPropagation(),
                            sx: { p: 4, textAlign: "center" },
                            children: [
                              o.jsx(y, {
                                sx: {
                                  width: 120,
                                  height: 120,
                                  borderRadius: "16px",
                                  background: g(r.type),
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  mx: "auto",
                                  mb: 2,
                                },
                                children: x(r.type),
                              }),
                              o.jsx(A, {
                                variant: "body1",
                                sx: { color: "#fff", mb: 1 },
                                children: r.name,
                              }),
                              o.jsx(A, {
                                variant: "caption",
                                sx: { color: "rgba(255,255,255,0.5)" },
                                children: p(r.size),
                              }),
                            ],
                          }),
                      ],
                    }),
                }),
              ],
            }),
          ],
        });
  },
  Sn = new Map(),
  op = /@([a-zA-Z0-9_]{1,32})/g,
  Er = () => {
    ms.getState().push({ message: "Пользователь не найден", timeout: 2500 });
  },
  ip = ({ text: t, style: e }) => {
    const n = _t(),
      r = h.useCallback(
        async (d, l) => {
          (d.stopPropagation(), d.preventDefault());
          const u = Sn.get(l.toLowerCase());
          if (u === null) {
            Er();
            return;
          }
          if (u) {
            n(`/user/${u}`);
            return;
          }
          try {
            const m = await cs.getByUsername(l);
            m != null && m.id
              ? (Sn.set(l.toLowerCase(), m.id), n(`/user/${m.id}`))
              : (Sn.set(l.toLowerCase(), null), Er());
          } catch {
            (Sn.set(l.toLowerCase(), null), Er());
          }
        },
        [n],
      ),
      s = [];
    let i = 0;
    const a = new RegExp(op.source, "g");
    let c;
    for (; (c = a.exec(t)) !== null; ) {
      c.index > i && s.push(t.slice(i, c.index));
      const d = c[0],
        l = c[1];
      (s.push(
        o.jsx(
          "span",
          {
            onClick: (u) => r(u, l),
            style: {
              fontWeight: 700,
              color: "#8774E1",
              textShadow: "0 0 6px rgba(135,116,225,0.5)",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
            },
            children: d,
          },
          `mention-${c.index}`,
        ),
      ),
        (i = c.index + d.length));
    }
    return (
      i < t.length && s.push(t.slice(i)),
      o.jsx("span", { style: e, children: s })
    );
  },
  ap = je.memo(ip),
  Cn = { fontSize: 14, width: 14, height: 14 },
  da = je.memo(
    ({
      message: t,
      isOwn: e,
      showAvatar: n,
      msgUser: r,
      isSelected: s,
      isSearchMatch: i,
      isCurrentMatch: a,
      chatType: c,
      onTap: d,
      onToggleSelect: l,
      onTouchStart: u,
      onTouchMove: m,
      onTouchEnd: b,
      onContextMenu: w,
      longPressTriggered: p,
      messageRef: x,
      onReply: g,
      onScrollToMessage: k,
      isSelectingRef: E,
    }) => {
      const M = zn().palette.mode === "dark",
        H = h.useRef(null),
        Z = h.useRef({
          startX: 0,
          startY: 0,
          swiping: !1,
          scrolling: !1,
          triggered: !1,
          lastDx: 0,
        }),
        D = h.useCallback(
          (B) => {
            const K = B.touches[0];
            ((Z.current = {
              startX: K.clientX,
              startY: K.clientY,
              swiping: !1,
              scrolling: !1,
              triggered: !1,
              lastDx: 0,
            }),
              u(t.id, B));
          },
          [t.id, u],
        ),
        _ = h.useCallback(
          (B) => {
            const K = Z.current;
            if (K.scrolling) return;
            const L = B.touches[0],
              W = L.clientX - K.startX,
              Q = L.clientY - K.startY;
            if (!K.swiping) {
              if (Math.abs(Q) > 12 && Math.abs(Q) > Math.abs(W)) {
                ((K.scrolling = !0), m(B));
                return;
              }
              Math.abs(W) > 15 &&
                Math.abs(W) > Math.abs(Q) &&
                ((K.swiping = !0), m(B));
            }
            if (K.swiping && W < 0) {
              const ce = Math.max(W, -80);
              ((K.lastDx = W),
                H.current &&
                  ((H.current.style.willChange = "transform"),
                  (H.current.style.transform = `translateX(${ce}px)`)),
                W < -60 && !K.triggered
                  ? ((K.triggered = !0),
                    navigator.vibrate && navigator.vibrate(15))
                  : W > -50 && (K.triggered = !1));
              return;
            }
            K.swiping || m(B);
          },
          [m],
        ),
        P = h.useCallback(() => {
          const B = Z.current;
          if (B.swiping) {
            (H.current &&
              ((H.current.style.transition = "transform 0.2s ease"),
              (H.current.style.transform = "translateX(0)"),
              setTimeout(() => {
                H.current &&
                  ((H.current.style.transition = ""),
                  (H.current.style.willChange = ""));
              }, 200)),
              B.triggered && g(t),
              (B.swiping = !1),
              (B.triggered = !1));
            return;
          }
          b();
        }, [t, g, b]),
        J = M ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
        ae = M ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)",
        te = M ? "rgba(255,255,255,0.9)" : "#4CAF50",
        re = () =>
          e
            ? t.read || (t.readCount && t.readCount > 0)
              ? o.jsx(Rr, { style: { ...Cn, color: te } })
              : t.status === "sending"
                ? o.jsx(Us, { style: { ...Cn, color: ae } })
                : t.status === "error"
                  ? o.jsx(Us, { style: { ...Cn, color: "#FF5252" } })
                  : o.jsx(li, { style: { ...Cn, color: ae } })
            : null;
      return o.jsxs("div", {
        className: "msg-row",
        "data-msg-id": t.id,
        ref: (B) => {
          ((H.current = B), x(B));
        },
        onClick: (B) => {
          if (!Z.current.swiping) {
            if (p.current) {
              p.current = !1;
              return;
            }
            if (E.current) {
              l(t.id);
              return;
            }
            d(B, t);
          }
        },
        onTouchStart: D,
        onTouchMove: _,
        onTouchEnd: P,
        onContextMenu: (B) => {
          B.preventDefault();
        },
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: e ? "flex-end" : "flex-start",
          marginBottom: n ? 4 : 1.5,
          padding: "0 12px",
          margin: `0 -12px ${n ? 4 : 1.5}px -12px`,
          paddingLeft: 12,
          paddingRight: 12,
          cursor: "pointer",
          backgroundColor: s ? "rgba(135,116,225,0.12)" : "transparent",
          transition: "background-color 0.15s ease",
          WebkitTapHighlightColor: "transparent",
        },
        children: [
          o.jsx("div", {
            className: "msg-select-checkbox",
            style: {
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            },
            children: s
              ? o.jsx(Bn, { style: { fontSize: 22, color: "#8774E1" } })
              : o.jsx("div", {
                  style: {
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.3)",
                  },
                }),
          }),
          c === "group" &&
            !e &&
            n &&
            o.jsx(St, {
              src: r == null ? void 0 : r.avatar,
              name: (r == null ? void 0 : r.fullName) || "?",
              size: 32,
              sx: { marginRight: 6.4, marginTop: "auto", marginBottom: 2.4 },
            }),
          c === "group" && !e && !n && o.jsx("div", { style: { width: 40 } }),
          o.jsxs("div", {
            style: {
              padding: t.replyTo ? "5px 10px 5px 10px" : "5px 10px",
              maxWidth: "80%",
              backgroundColor: a
                ? e
                  ? M
                    ? "#3B6A9A"
                    : "#B3D9FF"
                  : M
                    ? "#1E3A50"
                    : "#E8F0FE"
                : e
                  ? M
                    ? "#2B5278"
                    : "#E3F2FD"
                  : M
                    ? "#182533"
                    : "#FFFFFF",
              outline: a ? "2px solid #8774E1" : "none",
              borderRadius: e
                ? n
                  ? "18px 18px 6px 18px"
                  : "18px 6px 6px 18px"
                : n
                  ? "18px 18px 18px 6px"
                  : "6px 18px 18px 6px",
              boxShadow: M
                ? e
                  ? "0 2px 12px rgba(43,82,120,0.35), 0 0 6px rgba(135,116,225,0.12)"
                  : "0 2px 8px rgba(0,0,0,0.2)"
                : "0 1px 4px rgba(0,0,0,0.1)",
            },
            children: [
              c === "group" &&
                !e &&
                n &&
                o.jsx("div", {
                  style: {
                    color: M ? "#3E96D0" : "#1976D2",
                    fontWeight: 600,
                    fontSize: 12,
                    marginBottom: 2.4,
                  },
                  children: r == null ? void 0 : r.fullName,
                }),
              t.replyTo &&
                o.jsxs("div", {
                  onClick: (B) => {
                    (B.stopPropagation(), t.replyTo && k && k(t.replyTo.id));
                  },
                  style: {
                    borderLeft: "2px solid #8774E1",
                    paddingLeft: 8,
                    marginBottom: 4,
                    borderRadius: 4,
                    backgroundColor: M
                      ? "rgba(135,116,225,0.08)"
                      : "rgba(135,116,225,0.06)",
                    padding: "4px 8px",
                    cursor: "pointer",
                  },
                  children: [
                    o.jsx("div", {
                      style: {
                        fontSize: 11.5,
                        fontWeight: 600,
                        color: "#8774E1",
                      },
                      children: t.replyTo.fullName || "Пользователь",
                    }),
                    o.jsx("div", {
                      style: {
                        fontSize: 11.5,
                        color: M ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: 220,
                      },
                      children: t.replyTo.text || "📎 Вложение",
                    }),
                  ],
                }),
              t.text &&
                o.jsx("div", {
                  style: {
                    color: M ? "#F5F5F5" : "#1A1A1A",
                    wordBreak: "break-word",
                    lineHeight: 1.4,
                    fontSize: "14.5px",
                    whiteSpace: "pre-wrap",
                  },
                  children: o.jsx(ap, { text: t.text }),
                }),
              t.attachments &&
                t.attachments.length > 0 &&
                o.jsx(sp, {
                  attachments: t.attachments,
                  compact: !1,
                  isOwnMessage: e,
                }),
              o.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 2.4,
                  marginTop: 1.6,
                  float: "right",
                  marginLeft: 8,
                },
                children: [
                  !!t.edited &&
                    o.jsx("span", {
                      style: { color: J, fontSize: 11, fontStyle: "italic" },
                      children: "изм.",
                    }),
                  o.jsx("span", {
                    style: { color: J, fontSize: 11 },
                    children:
                      (t.createdAt || t.timestamp) &&
                      ca(t.createdAt || t.timestamp),
                  }),
                  re(),
                ],
              }),
            ],
          }),
        ],
      });
    },
    (t, e) =>
      t.message === e.message &&
      t.isOwn === e.isOwn &&
      t.showAvatar === e.showAvatar &&
      t.isSelected === e.isSelected &&
      t.isCurrentMatch === e.isCurrentMatch &&
      t.isSearchMatch === e.isSearchMatch,
  );
da.displayName = "MessageRow";
const Mn = Ke("GalleryReader"),
  Ut = new Map(),
  cp = ({ photo: t, isSelected: e, selIndex: n, onTap: r, onSelect: s }) => {
    const [i, a] = h.useState(Ut.get(t.id) || null),
      c = h.useRef(null),
      d = h.useRef(!1);
    return (
      h.useEffect(() => {
        if (i || d.current) return;
        const l = new IntersectionObserver(
          ([u]) => {
            u.isIntersecting && !d.current && !Ut.has(t.id)
              ? ((d.current = !0),
                l.disconnect(),
                Mn.getThumbnail({ id: t.id, size: 400 })
                  .then((m) => {
                    (Ut.set(t.id, m.base64), a(m.base64));
                  })
                  .catch(() => {
                    d.current = !1;
                  }))
              : u.isIntersecting &&
                Ut.has(t.id) &&
                (a(Ut.get(t.id)), l.disconnect());
          },
          { threshold: 0.01, rootMargin: "200px" },
        );
        return (c.current && l.observe(c.current), () => l.disconnect());
      }, [t.id, i]),
      o.jsxs(y, {
        ref: c,
        onClick: () => r(t.id),
        sx: {
          aspectRatio: "1",
          position: "relative",
          backgroundColor: "#2a2a3e",
          borderRadius: "2px",
          overflow: "hidden",
        },
        children: [
          i
            ? o.jsx(y, {
                component: "img",
                src: i,
                sx: {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.15s ease, border-radius 0.15s ease",
                  transform: e ? "scale(0.85)" : "scale(1)",
                  borderRadius: e ? "8px" : "0",
                },
              })
            : o.jsx(y, {
                sx: {
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#2a2a3e",
                  "@keyframes pulse": {
                    "0%": { opacity: 0.6 },
                    "50%": { opacity: 0.3 },
                    "100%": { opacity: 0.6 },
                  },
                  animation: "pulse 1.5s ease-in-out infinite",
                },
              }),
          o.jsx(y, {
            onClick: (l) => s(t.id, l),
            sx: {
              position: "absolute",
              top: 4,
              right: 4,
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: e ? "none" : "2px solid rgba(255,255,255,0.7)",
              backgroundColor: e ? "#4E8EF7" : "rgba(0,0,0,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            },
            children:
              e &&
              o.jsx(A, {
                sx: { color: "#fff", fontSize: 12, fontWeight: 700 },
                children: n,
              }),
          }),
        ],
      })
    );
  },
  kn = 0.48,
  $t = 0.92,
  Wo = 80,
  lp = 24,
  dp = ({
    open: t,
    onClose: e,
    onPhotosSelected: n,
    onPhotoTap: r,
    onFileSelect: s,
    onCameraSelect: i,
    scrollToPhotoId: a,
  }) => {
    const [c, d] = h.useState([]),
      [l, u] = h.useState(new Set()),
      [m, b] = h.useState(!1),
      [w, p] = h.useState(kn),
      [x, g] = h.useState(!1),
      k = h.useRef(0),
      E = h.useRef(0),
      T = h.useRef(null),
      [M, H] = h.useState("gallery");
    (h.useEffect(() => {
      if (t && a && c.length > 0) {
        const L = c.findIndex((W) => W.id === a);
        if (L >= 0 && T.current) {
          const W = Math.floor((L + 1) / 3),
            Q = T.current.scrollWidth / 3;
          T.current.scrollTop = W * Q;
        }
      }
    }, [t, a, c]),
      h.useEffect(() => {
        if (t) {
          (p(kn),
            a || u(new Set()),
            Z(),
            window.history.pushState({ modal: "attachmentSheet" }, ""));
          const L = () => {
            e();
          };
          return (
            window.addEventListener("popstate", L),
            () => {
              window.removeEventListener("popstate", L);
            }
          );
        }
      }, [t]));
    const Z = async () => {
        try {
          b(!0);
          const L = await Mn.getRecentPhotos({ limit: 500, offset: 0 });
          d(L.photos || []);
        } catch (L) {
          console.error("Failed to load gallery:", L);
        } finally {
          b(!1);
        }
      },
      D = (L, W) => {
        (W.stopPropagation(),
          u((Q) => {
            const ce = new Set(Q);
            return (ce.has(L) ? ce.delete(L) : ce.add(L), ce);
          }));
      },
      _ = async (L) => {
        try {
          const W = await Mn.getPhotoBase64({ id: L, maxSize: 1920 });
          r({ id: L, base64: W.base64 });
        } catch (W) {
          console.error("Failed to load photo:", W);
        }
      },
      P = async () => {
        const L = [];
        for (const W of l)
          try {
            const Q = await Mn.getPhotoBase64({ id: W, maxSize: 1920 });
            L.push({ id: W, base64: Q.base64 });
          } catch (Q) {
            console.error("Failed to load full photo:", Q);
          }
        (n(L), u(new Set()));
      },
      J = h.useCallback(
        (L) => {
          (g(!0), (k.current = L.touches[0].clientY), (E.current = w));
        },
        [w],
      ),
      ae = h.useCallback(
        (L) => {
          if (!x) return;
          const W = k.current - L.touches[0].clientY,
            Q = window.innerHeight,
            ce = E.current + W / Q;
          p(Math.max(0.15, Math.min($t, ce)));
        },
        [x],
      ),
      te = h.useCallback(() => {
        (g(!1), w < 0.3 ? e() : w < (kn + $t) / 2 ? p(kn) : p($t));
      }, [w, e]),
      re = h.useCallback(
        (L) => {
          const W = L.currentTarget;
          w < $t - 0.01 && W.scrollTop > 5 && ((W.scrollTop = 0), p($t));
        },
        [w],
      );
    if (!t) return null;
    const B = Array.from(l),
      K = [
        {
          key: "gallery",
          icon: o.jsx(Pc, {}),
          label: "Галерея",
          color: "#4E8EF7",
        },
        {
          key: "camera",
          icon: o.jsx($s, {}),
          label: "Камера",
          color: "#E53935",
        },
        { key: "file", icon: o.jsx(Ic, {}), label: "Файл", color: "#7C4DFF" },
        {
          key: "location",
          icon: o.jsx(Mc, {}),
          label: "Место",
          color: "#43A047",
        },
      ];
    return o.jsxs(y, {
      sx: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1300,
      },
      children: [
        o.jsx(y, {
          onClick: e,
          sx: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        }),
        o.jsxs(y, {
          sx: {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: `${w * 100}%`,
            backgroundColor: "#1a1a2e",
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
            display: "flex",
            flexDirection: "column",
            transition: x ? "none" : "height 0.3s cubic-bezier(.4,0,.2,1)",
          },
          children: [
            o.jsx(y, {
              onTouchStart: J,
              onTouchMove: ae,
              onTouchEnd: te,
              sx: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: lp,
                cursor: "grab",
                flexShrink: 0,
              },
              children: o.jsx(y, {
                sx: {
                  width: 36,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: "rgba(255,255,255,0.3)",
                },
              }),
            }),
            o.jsx(y, {
              ref: T,
              onScroll: re,
              sx: {
                flex: 1,
                overflow: "auto",
                px: "2px",
                "&::-webkit-scrollbar": { display: "none" },
              },
              children: o.jsxs(y, {
                sx: {
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "2px",
                },
                children: [
                  o.jsx(y, {
                    onClick: () => i(),
                    sx: {
                      aspectRatio: "1",
                      backgroundColor: "#2a2a3e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "2px",
                    },
                    children: o.jsx($s, {
                      sx: { fontSize: 36, color: "rgba(255,255,255,0.6)" },
                    }),
                  }),
                  c.map((L) =>
                    o.jsx(
                      cp,
                      {
                        photo: L,
                        isSelected: l.has(L.id),
                        selIndex: l.has(L.id) ? B.indexOf(L.id) + 1 : 0,
                        onTap: _,
                        onSelect: D,
                      },
                      L.id,
                    ),
                  ),
                ],
              }),
            }),
            o.jsx(y, {
              sx: {
                height: Wo,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                px: 2,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                backgroundColor: "#1a1a2e",
              },
              children: K.map((L) =>
                o.jsxs(
                  y,
                  {
                    onClick: () => {
                      (H(L.key),
                        L.key === "file" && s(),
                        L.key === "camera" && i());
                    },
                    sx: {
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 0.5,
                      opacity: M === L.key ? 1 : 0.6,
                    },
                    children: [
                      o.jsx(y, {
                        sx: {
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          backgroundColor: L.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          "& .MuiSvgIcon-root": { fontSize: 22, color: "#fff" },
                        },
                        children: L.icon,
                      }),
                      o.jsx(A, {
                        sx: { fontSize: "0.65rem", color: "#fff" },
                        children: L.label,
                      }),
                    ],
                  },
                  L.key,
                ),
              ),
            }),
            l.size > 0 &&
              o.jsx(y, {
                onClick: P,
                sx: {
                  position: "absolute",
                  bottom: Wo + 16,
                  right: 16,
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  backgroundColor: "#4E8EF7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(78,142,247,0.5)",
                  zIndex: 10,
                },
                children: o.jsx(Jr, {
                  sx: {
                    color: "#fff",
                    fontSize: 22,
                    transform: "rotate(-30deg)",
                  },
                }),
              }),
          ],
        }),
      ],
    });
  },
  up = [
    "#FF0000",
    "#FF6D00",
    "#FFAB00",
    "#00C853",
    "#00B8D4",
    "#2962FF",
    "#AA00FF",
    "#FFFFFF",
  ],
  hp = ({ imageBase64: t, onSend: e, onClose: n, onBack: r }) => {
    const [s, i] = h.useState("preview"),
      [a, c] = h.useState(""),
      [d, l] = h.useState("SD"),
      [u, m] = h.useState(t),
      [b, w] = h.useState({ x: 0, y: 0, w: 100, h: 100 }),
      [p, x] = h.useState(0),
      g = h.useRef(null),
      [k, E] = h.useState({ x: 0, y: 0, w: 0, h: 0 }),
      T = h.useRef(null),
      M = h.useRef(null),
      [H, Z] = h.useState("#FF0000"),
      [D, _] = h.useState([]),
      [P, J] = h.useState(null),
      [ae, te] = h.useState(!1),
      re = h.useRef({ w: 0, h: 0 });
    (h.useEffect(() => {
      m(t);
    }, [t]),
      h.useEffect(() => {
        window.history.pushState({ modal: "photoEditor" }, "");
        const R = () => {
          r ? r(u) : n();
        };
        return (
          window.addEventListener("popstate", R),
          () => {
            window.removeEventListener("popstate", R);
          }
        );
      }, []));
    const B = () => {
        e(u, a);
      },
      K = () => {
        (i("crop"),
          x(0),
          w({ x: 0, y: 0, w: 100, h: 100 }),
          E({ x: 0, y: 0, w: 0, h: 0 }));
      };
    h.useEffect(() => {
      if (s !== "crop") return;
      const R = g.current;
      if (!R) return;
      const U = new Image();
      ((U.onload = () => {
        const q = R.clientWidth,
          z = R.clientHeight,
          V = U.naturalWidth / U.naturalHeight;
        let C, O;
        (V > q / z ? ((C = q), (O = q / V)) : ((O = z), (C = z * V)),
          E({ x: (q - C) / 2, y: (z - O) / 2, w: C, h: O }));
      }),
        (U.src = u));
    }, [s, u]);
    const L = () => {
        if (b.x === 0 && b.y === 0 && b.w === 100 && b.h === 100 && p === 0) {
          i("preview");
          return;
        }
        const R = new Image();
        ((R.onload = () => {
          const U = document.createElement("canvas"),
            q = U.getContext("2d");
          if (p !== 0) {
            const z = (p * Math.PI) / 180,
              V = Math.abs(Math.sin(z)),
              C = Math.abs(Math.cos(z)),
              O = R.naturalWidth * C + R.naturalHeight * V,
              $ = R.naturalWidth * V + R.naturalHeight * C,
              Se = document.createElement("canvas");
            ((Se.width = O), (Se.height = $));
            const Pt = Se.getContext("2d");
            (Pt.translate(O / 2, $ / 2),
              Pt.rotate(z),
              Pt.drawImage(R, -R.naturalWidth / 2, -R.naturalHeight / 2));
            const Ye = (b.x / 100) * O,
              Gn = (b.y / 100) * $,
              Le = (b.w / 100) * O,
              It = (b.h / 100) * $;
            ((U.width = Math.max(1, Math.round(Le))),
              (U.height = Math.max(1, Math.round(It))),
              q.drawImage(Se, Ye, Gn, Le, It, 0, 0, U.width, U.height));
          } else {
            const z = (b.x / 100) * R.naturalWidth,
              V = (b.y / 100) * R.naturalHeight,
              C = (b.w / 100) * R.naturalWidth,
              O = (b.h / 100) * R.naturalHeight;
            ((U.width = Math.max(1, Math.round(C))),
              (U.height = Math.max(1, Math.round(O))),
              q.drawImage(R, z, V, C, O, 0, 0, U.width, U.height));
          }
          (m(U.toDataURL("image/jpeg", d === "HD" ? 0.95 : 0.85)),
            i("preview"));
        }),
          (R.src = u));
      },
      [W, Q] = h.useState(null),
      ce = h.useRef({ x: 0, y: 0, rect: { x: 0, y: 0, w: 100, h: 100 } }),
      le = (R, U) => {
        (U.stopPropagation(),
          U.preventDefault(),
          Q(R),
          (ce.current = {
            x: U.touches[0].clientX,
            y: U.touches[0].clientY,
            rect: { ...b },
          }));
      },
      se = h.useCallback(
        (R) => {
          if (!W || k.w === 0) return;
          const U = ((R.touches[0].clientX - ce.current.x) / k.w) * 100,
            q = ((R.touches[0].clientY - ce.current.y) / k.h) * 100,
            z = ce.current.rect,
            V = { ...z },
            C = 15;
          (W === "move"
            ? ((V.x = Math.max(0, Math.min(100 - z.w, z.x + U))),
              (V.y = Math.max(0, Math.min(100 - z.h, z.y + q))))
            : W === "tl"
              ? ((V.x = Math.max(0, Math.min(z.x + z.w - C, z.x + U))),
                (V.y = Math.max(0, Math.min(z.y + z.h - C, z.y + q))),
                (V.w = z.w + (z.x - V.x)),
                (V.h = z.h + (z.y - V.y)))
              : W === "tr"
                ? ((V.w = Math.max(C, Math.min(100 - z.x, z.w + U))),
                  (V.y = Math.max(0, Math.min(z.y + z.h - C, z.y + q))),
                  (V.h = z.h + (z.y - V.y)))
                : W === "bl"
                  ? ((V.x = Math.max(0, Math.min(z.x + z.w - C, z.x + U))),
                    (V.w = z.w + (z.x - V.x)),
                    (V.h = Math.max(C, Math.min(100 - z.y, z.h + q))))
                  : W === "br" &&
                    ((V.w = Math.max(C, Math.min(100 - z.x, z.w + U))),
                    (V.h = Math.max(C, Math.min(100 - z.y, z.h + q)))),
            w(V));
        },
        [W, k],
      ),
      ue = () => Q(null),
      he = () => {
        (i("draw"), _([]), J(null));
      };
    (h.useEffect(() => {
      if (s !== "draw") return;
      const R = T.current,
        U = M.current;
      if (!R || !U) return;
      const q = new Image();
      ((q.onload = () => {
        const z = U.clientWidth,
          V = U.clientHeight,
          C = q.naturalWidth / q.naturalHeight;
        let O, $;
        (C > z / V ? ((O = z), ($ = z / C)) : (($ = V), (O = V * C)),
          (O = Math.round(O)),
          ($ = Math.round($)),
          (R.style.width = `${O}px`),
          (R.style.height = `${$}px`),
          (R.width = O),
          (R.height = $),
          (re.current = { w: O, h: $ }),
          R.getContext("2d").drawImage(q, 0, 0, O, $));
      }),
        (q.src = u));
    }, [s, u]),
      h.useEffect(() => {
        if (s !== "draw") return;
        const R = T.current;
        if (!R || R.width === 0) return;
        const U = new Image();
        ((U.onload = () => {
          const q = R.getContext("2d");
          (q.clearRect(0, 0, R.width, R.height),
            q.drawImage(U, 0, 0, R.width, R.height));
          const z = [...D];
          P && P.length > 0 && z.push({ points: P, color: H, width: 3 });
          for (const V of z)
            if (!(V.points.length < 2)) {
              (q.beginPath(),
                (q.strokeStyle = V.color),
                (q.lineWidth = V.width),
                (q.lineCap = "round"),
                (q.lineJoin = "round"),
                q.moveTo(V.points[0].x, V.points[0].y));
              for (let C = 1; C < V.points.length; C++)
                q.lineTo(V.points[C].x, V.points[C].y);
              q.stroke();
            }
        }),
          (U.src = u));
      }, [D, P, H, s, u]));
    const de = (R) => {
        const U = T.current;
        if (!U) return { x: 0, y: 0 };
        const q = U.getBoundingClientRect(),
          z = "touches" in R ? R.touches[0].clientX : R.clientX,
          V = "touches" in R ? R.touches[0].clientY : R.clientY;
        return { x: z - q.left, y: V - q.top };
      },
      fe = (R) => {
        (R.preventDefault(), te(!0), J([de(R)]));
      },
      Ie = (R) => {
        ae && (R.preventDefault(), J((U) => (U ? [...U, de(R)] : null)));
      },
      Ae = () => {
        (P &&
          P.length > 1 &&
          _((R) => [...R, { points: P, color: H, width: 3 }]),
          J(null),
          te(!1));
      },
      pe = () => {
        if (D.length === 0) {
          i("preview");
          return;
        }
        const R = new Image();
        ((R.onload = () => {
          const U = document.createElement("canvas");
          ((U.width = R.naturalWidth), (U.height = R.naturalHeight));
          const q = U.getContext("2d");
          q.drawImage(R, 0, 0);
          const z = R.naturalWidth / re.current.w,
            V = R.naturalHeight / re.current.h;
          for (const C of D)
            if (!(C.points.length < 2)) {
              (q.beginPath(),
                (q.strokeStyle = C.color),
                (q.lineWidth = C.width * z),
                (q.lineCap = "round"),
                (q.lineJoin = "round"),
                q.moveTo(C.points[0].x * z, C.points[0].y * V));
              for (let O = 1; O < C.points.length; O++)
                q.lineTo(C.points[O].x * z, C.points[O].y * V);
              q.stroke();
            }
          (m(U.toDataURL("image/jpeg", d === "HD" ? 0.95 : 0.85)),
            _([]),
            i("preview"));
        }),
          (R.src = u));
      };
    return s === "crop"
      ? o.jsxs(y, {
          sx: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#000",
            zIndex: 1400,
            display: "flex",
            flexDirection: "column",
          },
          children: [
            o.jsx(y, {
              ref: g,
              onTouchMove: se,
              onTouchEnd: ue,
              sx: { flex: 1, position: "relative", overflow: "hidden" },
              children:
                k.w > 0 &&
                o.jsxs(o.Fragment, {
                  children: [
                    o.jsx(y, {
                      component: "img",
                      src: u,
                      sx: {
                        position: "absolute",
                        left: k.x,
                        top: k.y,
                        width: k.w,
                        height: k.h,
                        transform: `rotate(${p}deg)`,
                        transition: "transform 0.2s ease",
                      },
                    }),
                    o.jsxs(y, {
                      sx: {
                        position: "absolute",
                        left: k.x,
                        top: k.y,
                        width: k.w,
                        height: k.h,
                      },
                      children: [
                        o.jsx(y, {
                          sx: {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: `${b.y}%`,
                            backgroundColor: "rgba(0,0,0,0.6)",
                          },
                        }),
                        o.jsx(y, {
                          sx: {
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: `${100 - b.y - b.h}%`,
                            backgroundColor: "rgba(0,0,0,0.6)",
                          },
                        }),
                        o.jsx(y, {
                          sx: {
                            position: "absolute",
                            top: `${b.y}%`,
                            left: 0,
                            width: `${b.x}%`,
                            height: `${b.h}%`,
                            backgroundColor: "rgba(0,0,0,0.6)",
                          },
                        }),
                        o.jsx(y, {
                          sx: {
                            position: "absolute",
                            top: `${b.y}%`,
                            right: 0,
                            width: `${100 - b.x - b.w}%`,
                            height: `${b.h}%`,
                            backgroundColor: "rgba(0,0,0,0.6)",
                          },
                        }),
                        o.jsxs(y, {
                          sx: {
                            position: "absolute",
                            top: `${b.y}%`,
                            left: `${b.x}%`,
                            width: `${b.w}%`,
                            height: `${b.h}%`,
                            border: "2px solid #fff",
                            boxSizing: "border-box",
                          },
                          children: [
                            o.jsx(y, {
                              sx: {
                                position: "absolute",
                                top: "33.33%",
                                left: 0,
                                right: 0,
                                borderTop: "1px solid rgba(255,255,255,0.3)",
                              },
                            }),
                            o.jsx(y, {
                              sx: {
                                position: "absolute",
                                top: "66.66%",
                                left: 0,
                                right: 0,
                                borderTop: "1px solid rgba(255,255,255,0.3)",
                              },
                            }),
                            o.jsx(y, {
                              sx: {
                                position: "absolute",
                                left: "33.33%",
                                top: 0,
                                bottom: 0,
                                borderLeft: "1px solid rgba(255,255,255,0.3)",
                              },
                            }),
                            o.jsx(y, {
                              sx: {
                                position: "absolute",
                                left: "66.66%",
                                top: 0,
                                bottom: 0,
                                borderLeft: "1px solid rgba(255,255,255,0.3)",
                              },
                            }),
                            o.jsx(y, {
                              onTouchStart: (R) => le("move", R),
                              sx: {
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                              },
                            }),
                            ["tl", "tr", "bl", "br"].map((R) =>
                              o.jsx(
                                y,
                                {
                                  onTouchStart: (U) => le(R, U),
                                  sx: {
                                    position: "absolute",
                                    ...(R === "tl"
                                      ? { top: -4, left: -4 }
                                      : R === "tr"
                                        ? { top: -4, right: -4 }
                                        : R === "bl"
                                          ? { bottom: -4, left: -4 }
                                          : { bottom: -4, right: -4 }),
                                    width: 32,
                                    height: 32,
                                    zIndex: 2,
                                    "&::before": {
                                      content: '""',
                                      position: "absolute",
                                      width: 24,
                                      height: 3,
                                      backgroundColor: "#fff",
                                      borderRadius: 1,
                                      top: R.includes("t") ? 0 : "auto",
                                      bottom: R.includes("b") ? 0 : "auto",
                                      left: R.includes("l") ? 0 : "auto",
                                      right: R.includes("r") ? 0 : "auto",
                                    },
                                    "&::after": {
                                      content: '""',
                                      position: "absolute",
                                      width: 3,
                                      height: 24,
                                      backgroundColor: "#fff",
                                      borderRadius: 1,
                                      top: R.includes("t") ? 0 : "auto",
                                      bottom: R.includes("b") ? 0 : "auto",
                                      left: R.includes("l") ? 0 : "auto",
                                      right: R.includes("r") ? 0 : "auto",
                                    },
                                  },
                                },
                                R,
                              ),
                            ),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
            }),
            o.jsxs(y, {
              sx: {
                px: 3,
                py: 1.5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              },
              children: [
                o.jsxs(A, {
                  sx: { color: "#fff", fontSize: "0.85rem", mb: 1 },
                  children: [p.toFixed(1), "°"],
                }),
                o.jsxs(y, {
                  sx: {
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  },
                  children: [
                    o.jsx(y, {
                      component: "input",
                      type: "range",
                      min: -45,
                      max: 45,
                      step: 0.1,
                      value: p,
                      onChange: (R) => x(parseFloat(R.target.value)),
                      sx: {
                        flex: 1,
                        height: 2,
                        WebkitAppearance: "none",
                        background: "rgba(255,255,255,0.3)",
                        borderRadius: 1,
                        outline: "none",
                        "&::-webkit-slider-thumb": {
                          WebkitAppearance: "none",
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          backgroundColor: "#4E8EF7",
                        },
                      },
                    }),
                    o.jsx(X, {
                      onClick: () => x((R) => (R + 90) % 360),
                      sx: { color: "#fff" },
                      children: o.jsx(y, {
                        component: "span",
                        sx: { fontSize: 20 },
                        children: "⟳",
                      }),
                    }),
                  ],
                }),
              ],
            }),
            o.jsxs(y, {
              sx: {
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: 2,
              },
              children: [
                o.jsx(A, {
                  onClick: () => {
                    (i("preview"), x(0));
                  },
                  sx: { color: "#fff", fontSize: "1rem", fontWeight: 500 },
                  children: "CANCEL",
                }),
                o.jsx(A, {
                  onClick: L,
                  sx: { color: "#4E8EF7", fontSize: "1rem", fontWeight: 600 },
                  children: "CROP",
                }),
              ],
            }),
          ],
        })
      : s === "draw"
        ? o.jsxs(y, {
            sx: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#000",
              zIndex: 1400,
              display: "flex",
              flexDirection: "column",
            },
            children: [
              o.jsxs(y, {
                sx: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                  py: 1,
                },
                children: [
                  o.jsx(X, {
                    onClick: () => _((R) => R.slice(0, -1)),
                    sx: { color: "#fff" },
                    children: o.jsx(Dc, {}),
                  }),
                  o.jsx(A, {
                    onClick: () => _([]),
                    sx: { color: "#fff", fontSize: "0.9rem", fontWeight: 500 },
                    children: "Clear All",
                  }),
                ],
              }),
              o.jsx(y, {
                ref: M,
                sx: {
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                },
                children: o.jsx("canvas", {
                  ref: T,
                  onTouchStart: fe,
                  onTouchMove: Ie,
                  onTouchEnd: Ae,
                  onMouseDown: fe,
                  onMouseMove: Ie,
                  onMouseUp: Ae,
                  style: { touchAction: "none", display: "block" },
                }),
              }),
              o.jsx(y, {
                sx: {
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                  px: 2,
                  py: 1.5,
                },
                children: up.map((R) =>
                  o.jsx(
                    y,
                    {
                      onClick: () => Z(R),
                      sx: {
                        width: H === R ? 32 : 26,
                        height: H === R ? 32 : 26,
                        borderRadius: "50%",
                        backgroundColor: R,
                        border:
                          H === R
                            ? "3px solid #fff"
                            : "2px solid rgba(255,255,255,0.3)",
                        transition:
                          "width 0.15s ease, height 0.15s ease, border 0.15s ease",
                      },
                    },
                    R,
                  ),
                ),
              }),
              o.jsxs(y, {
                sx: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                  py: 1.5,
                  pb: 2,
                },
                children: [
                  o.jsx(X, {
                    onClick: () => {
                      (_([]), i("preview"));
                    },
                    sx: { color: "#fff" },
                    children: o.jsx(Qe, {}),
                  }),
                  o.jsxs(y, {
                    sx: { display: "flex", gap: 3 },
                    children: [
                      o.jsx(A, {
                        sx: {
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: "0.85rem",
                          borderBottom: "2px solid #fff",
                          pb: 0.3,
                        },
                        children: "DRAW",
                      }),
                      o.jsx(A, {
                        sx: {
                          color: "rgba(255,255,255,0.5)",
                          fontWeight: 500,
                          fontSize: "0.85rem",
                        },
                        children: "STICKER",
                      }),
                      o.jsx(A, {
                        sx: {
                          color: "rgba(255,255,255,0.5)",
                          fontWeight: 500,
                          fontSize: "0.85rem",
                        },
                        children: "TEXT",
                      }),
                    ],
                  }),
                  o.jsx(X, {
                    onClick: pe,
                    sx: { color: "#fff" },
                    children: o.jsx(li, {}),
                  }),
                ],
              }),
            ],
          })
        : o.jsxs(y, {
            sx: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#000",
              zIndex: 1400,
              display: "flex",
              flexDirection: "column",
            },
            children: [
              o.jsx(y, {
                sx: {
                  display: "flex",
                  alignItems: "center",
                  px: 1,
                  py: 0.5,
                  minHeight: 48,
                },
                children:
                  r &&
                  o.jsx(X, {
                    onClick: () => r(u),
                    sx: { color: "#fff" },
                    children: o.jsx(Ar, {}),
                  }),
              }),
              o.jsx(y, {
                sx: {
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                },
                children: o.jsx(y, {
                  component: "img",
                  src: u,
                  sx: {
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  },
                }),
              }),
              o.jsx(y, {
                sx: {
                  px: 2,
                  py: 1,
                  backgroundColor: "rgba(0,0,0,0.8)",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                },
                children: o.jsx(ot, {
                  fullWidth: !0,
                  placeholder: "Добавить подпись...",
                  value: a,
                  onChange: (R) => c(R.target.value),
                  variant: "standard",
                  InputProps: {
                    disableUnderline: !0,
                    sx: { color: "#fff", fontSize: "0.95rem" },
                  },
                  sx: {
                    "& .MuiInputBase-input::placeholder": {
                      color: "rgba(255,255,255,0.5)",
                      opacity: 1,
                    },
                  },
                }),
              }),
              o.jsxs(y, {
                sx: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 2,
                  py: 1.5,
                  pb: 2.5,
                  backgroundColor: "rgba(0,0,0,0.9)",
                },
                children: [
                  o.jsxs(y, {
                    sx: { display: "flex", gap: 1.5, alignItems: "center" },
                    children: [
                      o.jsx(X, {
                        onClick: K,
                        sx: { color: "#fff", p: 1 },
                        children: o.jsx(Lc, { sx: { fontSize: 24 } }),
                      }),
                      o.jsx(X, {
                        onClick: he,
                        sx: { color: "#fff", p: 1 },
                        children: o.jsx(Oc, { sx: { fontSize: 24 } }),
                      }),
                      o.jsx(y, {
                        onClick: () => l((R) => (R === "SD" ? "HD" : "SD")),
                        sx: {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 36,
                          height: 36,
                          borderRadius: "8px",
                          border: "2px solid #fff",
                        },
                        children: o.jsx(A, {
                          sx: {
                            color: "#fff",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                          },
                          children: d,
                        }),
                      }),
                      o.jsx(X, {
                        sx: { color: "#fff", p: 1 },
                        children: o.jsx(Nc, { sx: { fontSize: 24 } }),
                      }),
                    ],
                  }),
                  o.jsx(y, {
                    onClick: B,
                    sx: {
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      backgroundColor: "#4E8EF7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 12px rgba(78,142,247,0.5)",
                    },
                    children: o.jsx(Jr, {
                      sx: {
                        fontSize: 22,
                        color: "#fff",
                        transform: "rotate(-30deg)",
                      },
                    }),
                  }),
                ],
              }),
            ],
          });
  },
  Ho = Ke("PermissionsManager"),
  fp = "http://217.114.11.48:3001",
  pp = () => {
    var Os;
    const { chatId: t } = Yc(),
      e = _t(),
      { user: n } = Ue(),
      {
        chats: r,
        messages: s,
        sendMessage: i,
        markAsRead: a,
        editMessage: c,
        deleteMessage: d,
        typingUsers: l,
        loadMessages: u,
        setCurrentChat: m,
        isLoadingMessages: b,
      } = Ve(),
      { getContactByUserId: w, isUserBlocked: p, unblockUser: x } = dt(),
      [g, k] = h.useState(""),
      [E, T] = h.useState(!1),
      [M, H] = h.useState(null),
      [Z, D] = h.useState(null),
      [_, P] = h.useState(null),
      [J, ae] = h.useState(null),
      te = h.useRef(null),
      re = h.useRef(null),
      B = h.useRef(!1),
      K = h.useRef(!1),
      [L, W] = h.useState(!1),
      [Q, ce] = h.useState(null),
      [le, se] = h.useState(!1),
      [ue, he] = h.useState(!1),
      [de, fe] = h.useState(!1),
      [Ie, Ae] = h.useState(""),
      [pe, R] = h.useState([]),
      [U, q] = h.useState(0),
      z = h.useRef({}),
      [V, C] = h.useState(!1),
      O = h.useRef(null),
      [$, Se] = h.useState([]),
      [Pt, Ye] = h.useState([]),
      [Gn, Le] = h.useState(new Set()),
      [It, Je] = h.useState(!1),
      [wa, sn] = h.useState(!1),
      [va, Xe] = h.useState(!1),
      [js, ft] = h.useState(null),
      [Sa, Qn] = h.useState(null),
      [Ca, ka] = h.useState(null),
      pt = h.useRef(null),
      Mt = h.useRef(!1),
      Dt = h.useRef(!0),
      [Ea, Zn] = h.useState(!1),
      [er, on] = h.useState(0),
      tr = h.useRef(0),
      an = h.useRef(null),
      [ze, Be] = h.useState(new Set()),
      Oe = ze.size > 0,
      nr = h.useRef(!1);
    nr.current = Oe;
    const cn = h.useRef(!1),
      rr = h.useRef(null),
      Lt = h.useRef(null),
      ln = h.useRef(null),
      dn = h.useRef(null),
      Ot = h.useRef(null),
      [un, Rs] = h.useState(""),
      [hn, sr] = h.useState(!1),
      or = h.useRef(-1),
      [_s, As] = h.useState(!1),
      gt = h.useRef(null),
      ee = r.find((f) => f.id === t),
      xe = t ? s[t] || [] : [],
      ir = b && xe.length === 0;
    h.useEffect(
      () => (
        ir
          ? (gt.current = setTimeout(() => As(!0), 1e4))
          : (gt.current && (clearTimeout(gt.current), (gt.current = null)),
            As(!1)),
        () => {
          gt.current && clearTimeout(gt.current);
        }
      ),
      [ir],
    );
    const oe =
        (ee == null ? void 0 : ee.type) === "private"
          ? ee.participants.find((f) => f.id !== (n == null ? void 0 : n.id))
          : null,
      ar = oe ? p(oe.id) : !1,
      Nt = (() => {
        if (!ee) return "";
        if (ee.type === "saved") return "Избранное";
        if (ee.type === "group") return ee.name || "Группа";
        if (ee.type === "ai") return "ИИ Ассистент";
        if (oe) {
          const f = w(oe.id);
          return (f == null ? void 0 : f.displayName) || oe.fullName;
        }
        return ee.name || "Чат";
      })(),
      ja =
        (ee == null ? void 0 : ee.type) === "private"
          ? oe == null
            ? void 0
            : oe.avatar
          : ee == null
            ? void 0
            : ee.avatar,
      Ra = ee
        ? ee.type === "saved"
          ? "сообщения самому себе"
          : ee.type === "group"
            ? `${ee.participants.length} участников`
            : (oe == null ? void 0 : oe.status) === "online"
              ? "в сети"
              : nf(oe == null ? void 0 : oe.lastSeen)
        : "",
      Ts = (() => {
        if (!t || !l[t]) return null;
        const f = l[t].filter((S) => S !== (n == null ? void 0 : n.id));
        if (f.length === 0) return null;
        if (f.length === 1) {
          const S =
            ee == null ? void 0 : ee.participants.find((j) => j.id === f[0]);
          return `${(S == null ? void 0 : S.fullName) || "Кто-то"} печатает...`;
        }
        return `${f.length} печатают...`;
      })();
    (h.useEffect(
      () => (
        t &&
          (Zn(!1),
          on(0),
          m(t),
          u(t).then(() => {
            var f;
            ((tr.current =
              ((f = Ve.getState().messages[t]) == null ? void 0 : f.length) ||
              0),
              (Dt.current = !0),
              requestAnimationFrame(() => {
                var S;
                (S = te.current) == null ||
                  S.scrollIntoView({ behavior: "instant" });
              }));
          })),
        () => {
          m(null);
        }
      ),
      [t],
    ),
      h.useEffect(() => {
        t && a(t);
      }, [t, xe.length, a]),
      h.useEffect(() => {
        const f = Lt.current;
        if (!f) return;
        let S = !1,
          j = !1;
        const I = () => {
          S ||
            ((S = !0),
            requestAnimationFrame(() => {
              S = !1;
              const N = f.scrollHeight - f.scrollTop - f.clientHeight < 80;
              Dt.current = N;
              const F = !N;
              (F !== j && ((j = F), Zn(F)), N && on(0));
            }));
        };
        return (
          f.addEventListener("scroll", I, { passive: !0 }),
          () => f.removeEventListener("scroll", I)
        );
      }, []),
      h.useEffect(() => {
        if (b) return;
        const f = xe.length,
          S = tr.current;
        ((tr.current = f),
          !(f === 0 || f <= S) &&
            (Dt.current
              ? requestAnimationFrame(() => {
                  var j;
                  (j = te.current) == null ||
                    j.scrollIntoView({ behavior: "instant" });
                })
              : on((j) => j + (f - S))));
      }, [xe.length]));
    const _a = h.useCallback(() => {
      var f;
      ((f = te.current) == null || f.scrollIntoView({ behavior: "smooth" }),
        on(0),
        Zn(!1));
    }, []);
    h.useEffect(() => {
      const f = window.visualViewport;
      if (!f) return;
      let S = f.height;
      const j = () => {
        const I = f.height;
        (I < S - 50 &&
          Dt.current &&
          requestAnimationFrame(() => {
            var N;
            (N = te.current) == null ||
              N.scrollIntoView({ behavior: "instant" });
          }),
          (S = I));
      };
      return (
        f.addEventListener("resize", j),
        () => f.removeEventListener("resize", j)
      );
    }, []);
    const Ps = async () => {
        if (!((!g.trim() && $.length === 0) || !t)) {
          if (Mt.current) {
            ((Mt.current = !1),
              pt.current && (clearTimeout(pt.current), (pt.current = null)));
            const f = ve();
            f && f.emit("typing:stop", { chatId: t });
          }
          if (E && M) (c(t, M.id, g.trim()), T(!1), H(null));
          else {
            const f = Pt.filter(Boolean);
            (i(t, g.trim(), f, Z == null ? void 0 : Z.id), Se([]), Ye([]));
          }
          (k(""),
            D(null),
            Dt.current &&
              requestAnimationFrame(() => {
                var f;
                (f = te.current) == null ||
                  f.scrollIntoView({ behavior: "instant" });
              }));
        }
      },
      Aa = async (f) => {
        const S = f.target.files;
        if (!S || S.length === 0) return;
        const j = Array.from(S),
          I = $.length;
        (Se((N) => [...N, ...j]), (f.target.value = ""));
        for (let N = 0; N < j.length; N++) {
          const F = I + N;
          (Le((ne) => new Set(ne).add(F)), Je(!0));
          try {
            const ne = await wn.uploadFiles([j[N]]);
            Ye((be) => {
              const et = [...be];
              return ((et[F] = ne[0]), et);
            });
          } catch (ne) {
            console.error("File upload failed:", ne);
          } finally {
            Le((ne) => {
              const be = new Set(ne);
              return (be.delete(F), be.size === 0 && Je(!1), be);
            });
          }
        }
      },
      Ta = (f) => {
        (Se((S) => S.filter((j, I) => I !== f)),
          Ye((S) => S.filter((j, I) => I !== f)));
      },
      Pa = async () => {
        try {
          (await Ho.requestCameraAndStorage()).allGranted ? Xe(!0) : sn(!0);
        } catch {
          Xe(!0);
        }
      },
      Ia = (f) => {
        if ((Xe(!1), f.length === 1)) ft(f[0].base64);
        else if (f.length > 1)
          for (const S of f) {
            const j = cr(S.base64),
              I = new File([j], `photo_${S.id}.jpg`, { type: "image/jpeg" }),
              N = $.length;
            (Se((F) => [...F, I]),
              Le((F) => new Set(F).add(N)),
              Je(!0),
              wn
                .uploadFiles([I])
                .then((F) => {
                  Ye((ne) => {
                    const be = [...ne];
                    return ((be[N] = F[0]), be);
                  });
                })
                .catch((F) => console.error("Upload failed:", F))
                .finally(() => {
                  Le((F) => {
                    const ne = new Set(F);
                    return (ne.delete(N), ne.size === 0 && Je(!1), ne);
                  });
                }));
          }
      },
      Ma = async (f, S) => {
        if ((ft(null), Qn(null), !t)) return;
        const j = cr(f),
          I = new File([j], `edited_${Date.now()}.jpg`, { type: "image/jpeg" }),
          N = $.length;
        (Se((F) => [...F, I]),
          Le((F) => new Set(F).add(N)),
          Je(!0),
          S && k(S),
          wn
            .uploadFiles([I])
            .then((F) => {
              Ye((ne) => {
                const be = [...ne];
                return ((be[N] = F[0]), be);
              });
            })
            .catch((F) => console.error("Photo upload failed:", F))
            .finally(() => {
              Le((F) => {
                const ne = new Set(F);
                return (ne.delete(N), ne.size === 0 && Je(!1), ne);
              });
            }));
      },
      cr = (f) => {
        var F;
        const S = f.split(","),
          j =
            ((F = S[0].match(/:(.*?);/)) == null ? void 0 : F[1]) ||
            "image/jpeg",
          I = atob(S[1]),
          N = new Uint8Array(I.length);
        for (let ne = 0; ne < I.length; ne++) N[ne] = I.charCodeAt(ne);
        return new Blob([N], { type: j });
      },
      Da = (f) => {
        f.key === "Enter" && !f.shiftKey && (f.preventDefault(), Ps());
      },
      Is = h.useMemo(() => {
        if (!hn || !ee) return [];
        const f = un.toLowerCase();
        return ee.participants
          .filter((S) => S.id !== (n == null ? void 0 : n.id))
          .filter((S) => {
            var j, I;
            return (
              ((j = S.username) == null
                ? void 0
                : j.toLowerCase().includes(f)) ||
              ((I = S.fullName) == null ? void 0 : I.toLowerCase().includes(f))
            );
          })
          .slice(0, 5);
      }, [hn, un, ee, n == null ? void 0 : n.id]),
      La = h.useCallback((f, S) => {
        let j = S - 1;
        for (
          ;
          j >= 0 &&
          f[j] !== "@" &&
          f[j] !== " " &&
          f[j] !==
            `
`;
        )
          j--;
        if (
          j >= 0 &&
          f[j] === "@" &&
          (j === 0 ||
            f[j - 1] === " " ||
            f[j - 1] ===
              `
`)
        ) {
          const I = f.slice(j + 1, S);
          if (I.length <= 32 && /^[a-zA-Z0-9_]*$/.test(I)) {
            ((or.current = j), Rs(I), sr(!0));
            return;
          }
        }
        sr(!1);
      }, []),
      Oa = h.useCallback(
        (f) => {
          const S = or.current;
          if (S < 0) return;
          const j = g.slice(0, S),
            I = g.slice(S + 1 + un.length),
            N = `${j}@${f} ${I}`;
          (k(N),
            sr(!1),
            Rs(""),
            (or.current = -1),
            setTimeout(() => {
              var F;
              return (F = an.current) == null ? void 0 : F.focus();
            }, 50));
        },
        [g, un],
      ),
      Na = h.useCallback((f, S) => {
        if (
          K.current ||
          document.querySelector(
            ".MuiDialog-root, .MuiModal-root, .MuiDrawer-root, .MuiPopover-root",
          )
        )
          return;
        if (nr.current) {
          Be((et) => {
            const yt = new Set(et);
            return (yt.has(S.id) ? yt.delete(S.id) : yt.add(S.id), yt);
          });
          return;
        }
        if (
          f.target.closest(
            'button, a, input, [role="slider"], img, video, audio, svg, .MuiSlider-root, .MuiIconButton-root, .MuiFab-root',
          )
        )
          return;
        f.preventDefault();
        const F = f.clientX,
          ne = f.clientY;
        P({
          anchorEl: {
            getBoundingClientRect: () => new DOMRect(F, ne, 0, 0),
            nodeType: 1,
          },
          message: S,
        });
      }, []),
      Fa = h.useCallback((f) => {
        Be(new Set([f]));
      }, []),
      Ge = () => {
        (P(null),
          (K.current = !0),
          setTimeout(() => {
            K.current = !1;
          }, 200));
      },
      fn = h.useMemo(() => {
        const f = new Map();
        return (xe.forEach((S, j) => f.set(S.id, j)), f);
      }, [xe]),
      pn = h.useCallback((f, S) => {
        const j = document.elementFromPoint(f, S);
        if (!j) return null;
        const I = j.closest("[data-msg-id]");
        return I ? I.getAttribute("data-msg-id") : null;
      }, []),
      gn = h.useRef({ start: -1, end: -1 }),
      mn = h.useCallback(
        (f) => {
          const S = rr.current;
          if (!S) return;
          const j = fn.get(S),
            I = fn.get(f);
          if (j === void 0 || I === void 0) return;
          const N = Math.min(j, I),
            F = Math.max(j, I);
          if (gn.current.start === N && gn.current.end === F) return;
          gn.current = { start: N, end: F };
          const ne = new Set();
          for (let be = N; be <= F; be++) ne.add(xe[be].id);
          Be(ne);
        },
        [xe, fn],
      ),
      mt = h.useCallback(() => {
        ln.current && (clearInterval(ln.current), (ln.current = null));
      }, []),
      lr = h.useCallback(
        (f) => {
          (mt(),
            (ln.current = setInterval(() => {
              const S = Lt.current;
              if (!S) return;
              S.scrollTop += f === "down" ? 12 : -12;
              const j = dn.current;
              if (j) {
                const I = pn(j.x, j.y);
                I && mn(I);
              }
            }, 30)));
        },
        [mt, pn, mn],
      ),
      za = h.useCallback((f) => {
        Be((S) => {
          const j = new Set(S);
          return (j.has(f) ? j.delete(f) : j.add(f), j);
        });
      }, []),
      Ba = h.useCallback(() => {
        Be(new Set());
      }, []),
      Ua = h.useCallback(() => {
        const f = xe
          .filter((S) => ze.has(S.id))
          .map((S) => S.text || "")
          .filter(Boolean).join(`
`);
        (navigator.clipboard.writeText(f), Be(new Set()));
      }, [xe, ze]),
      $a = h.useCallback((f, S) => {
        if (K.current) return;
        const j = S.touches[0];
        ((Ot.current = { x: j.clientX, y: j.clientY }),
          (B.current = !1),
          (re.current = setTimeout(() => {
            ((B.current = !0),
              navigator.vibrate && navigator.vibrate(30),
              (cn.current = !0),
              (rr.current = f),
              Be((I) => new Set(I).add(f)));
          }, 500)));
      }, []),
      dr = h.useRef(null),
      xt = h.useRef(0),
      Wa = h.useCallback(
        (f) => {
          const S = f.touches[0];
          if (!cn.current) {
            if (re.current && Ot.current) {
              const I = S.clientX - Ot.current.x,
                N = S.clientY - Ot.current.y;
              (Math.abs(I) > 12 || Math.abs(N) > 12) &&
                (clearTimeout(re.current), (re.current = null));
            }
            return;
          }
          dn.current = { x: S.clientX, y: S.clientY };
          const j = Lt.current;
          if (j) {
            const I = j.getBoundingClientRect();
            S.clientY < I.top + 60
              ? lr("up")
              : S.clientY > I.bottom - 60
                ? lr("down")
                : mt();
          }
          xt.current ||
            (xt.current = requestAnimationFrame(() => {
              xt.current = 0;
              const I = dn.current;
              if (!I) return;
              const N = pn(I.x, I.y);
              N && N !== dr.current && ((dr.current = N), mn(N));
            }));
        },
        [lr, mt, pn, mn],
      ),
      Ha = h.useCallback(() => {
        (re.current && (clearTimeout(re.current), (re.current = null)),
          (cn.current = !1),
          (rr.current = null),
          (dr.current = null),
          (gn.current = { start: -1, end: -1 }),
          (dn.current = null),
          (Ot.current = null),
          xt.current && (cancelAnimationFrame(xt.current), (xt.current = 0)),
          mt());
      }, [mt]);
    h.useEffect(() => {
      const f = Lt.current;
      if (!f) return;
      const S = (j) => {
        cn.current && j.preventDefault();
      };
      return (
        f.addEventListener("touchmove", S, { passive: !1 }),
        () => f.removeEventListener("touchmove", S)
      );
    }, []);
    const qa = () => {
        (_ != null &&
          _.message.text &&
          navigator.clipboard.writeText(_.message.text),
          Ge());
      },
      Va = () => {
        var f;
        (_ != null &&
          _.message &&
          (D(_.message), (f = an.current) == null || f.focus()),
          Ge());
      },
      Ka = () => {
        (_ != null && _.message && Be(new Set([_.message.id])), Ge());
      },
      Ya = () => {
        (_ != null &&
          _.message &&
          (T(!0), H(_.message), k(_.message.text || "")),
          Ge());
      },
      Ja = () => {
        (_ != null && _.message && (ce(_.message), W(!0)), Ge());
      },
      Ms = h.useCallback(
        async (f) => {
          const S = r.find((I) => I.type === "saved");
          if (!S) return;
          const j = [...f].sort((I, N) => {
            const F = new Date(I.createdAt || I.timestamp || 0).getTime(),
              ne = new Date(N.createdAt || N.timestamp || 0).getTime();
            return F - ne;
          });
          for (const I of j) {
            const N = I.text || "",
              F = I.attachments || [];
            (!N.trim() && F.length === 0) || (await i(S.id, N, F));
          }
          (Be(new Set()), Ge(), e(`/chat/${S.id}`));
        },
        [r, i, e],
      ),
      Xa = () => {
        _ != null && _.message && Ms([_.message]);
      },
      Ga = () => {
        const f = xe.filter((S) => ze.has(S.id));
        f.length !== 0 && Ms(f);
      },
      Qa = () => {
        if (t)
          if (Oe) {
            const f = Array.from(ze);
            for (const S of f) d(t, S, le);
            Be(new Set());
          } else Q && d(t, Q.id, le);
        (W(!1), ce(null), se(!1));
      },
      Ds = () => {
        (W(!1), ce(null), se(!1));
      },
      Za = () => {
        (ae(null), he(!0));
      },
      ec = () => {
        if (t) {
          const { deleteChat: f } = Ve.getState();
          f(t);
        }
        (he(!1), e("/chats"));
      },
      tc = () => {
        (ae(null), fe(!0), Ae(""), R([]), q(0));
      },
      nc = () => {
        (fe(!1), C(!1), Ae(""), R([]), q(0));
      },
      rc = (f) => {
        var I, N;
        if ((Ae(f), !f.trim())) {
          (R([]), q(0));
          return;
        }
        const S = f.toLowerCase(),
          j = [];
        if (
          (xe.forEach((F, ne) => {
            (F.text || "").toLowerCase().includes(S) && j.push(ne);
          }),
          R(j),
          q(j.length > 0 ? j.length - 1 : 0),
          j.length > 0)
        ) {
          const F = (I = xe[j[j.length - 1]]) == null ? void 0 : I.id;
          F &&
            z.current[F] &&
            ((N = z.current[F]) == null ||
              N.scrollIntoView({ behavior: "smooth", block: "center" }));
        }
      },
      Ls = (f) => {
        var I, N;
        if (pe.length === 0) return;
        let S = U;
        (f === "up"
          ? (S = U > 0 ? U - 1 : pe.length - 1)
          : (S = U < pe.length - 1 ? U + 1 : 0),
          q(S));
        const j = (I = xe[pe[S]]) == null ? void 0 : I.id;
        j &&
          z.current[j] &&
          ((N = z.current[j]) == null ||
            N.scrollIntoView({ behavior: "smooth", block: "center" }));
      },
      sc = h.useMemo(() => {
        const f = [];
        let S = "";
        return (
          xe.forEach((j) => {
            const I = rf(j.createdAt || j.timestamp);
            I !== S
              ? ((S = I), f.push({ date: I, messages: [j] }))
              : f[f.length - 1].messages.push(j);
          }),
          f
        );
      }, [xe]);
    return o.jsxs(y, {
      className: "page-enter",
      sx: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
      },
      children: [
        Oe
          ? o.jsxs(y, {
              sx: {
                display: "flex",
                alignItems: "center",
                px: 1.5,
                py: 0.75,
                backgroundColor: (f) =>
                  f.palette.mode === "dark"
                    ? "rgba(135,116,225,0.15)"
                    : "rgba(135,116,225,0.1)",
                minHeight: 56,
                borderBottom: "1px solid",
                borderColor: "transparent",
                transition: "background-color 0.25s ease",
                position: "relative",
                zIndex: 2,
              },
              children: [
                o.jsx(X, {
                  onClick: Ba,
                  sx: { color: "primary.main", mr: 0.5 },
                  children: o.jsx(Qe, {}),
                }),
                o.jsx(A, {
                  variant: "h6",
                  sx: {
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    flex: 1,
                    color: "text.primary",
                  },
                  children: ze.size,
                }),
                o.jsx(X, {
                  onClick: Ua,
                  sx: { color: "text.secondary" },
                  children: o.jsx(Ws, { sx: { fontSize: 22 } }),
                }),
                o.jsx(X, {
                  onClick: Ga,
                  sx: { color: "text.secondary" },
                  children: o.jsx(Hs, { sx: { fontSize: 22 } }),
                }),
                o.jsx(X, {
                  onClick: () => {
                    (ce(null), W(!0));
                  },
                  sx: { color: "error.main" },
                  children: o.jsx(Wt, { sx: { fontSize: 22 } }),
                }),
              ],
            })
          : de
            ? o.jsxs(y, {
                sx: {
                  display: "flex",
                  alignItems: "center",
                  px: 1,
                  py: 0.5,
                  backgroundColor: "background.paper",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  minHeight: 56,
                  gap: 0.5,
                  position: "relative",
                  zIndex: 2,
                },
                children: [
                  o.jsx(X, {
                    onClick: nc,
                    sx: { color: "text.secondary" },
                    children: o.jsx(Ar, {}),
                  }),
                  o.jsx(ot, {
                    fullWidth: !0,
                    autoFocus: !0,
                    size: "small",
                    placeholder: "Search",
                    value: Ie,
                    onChange: (f) => rc(f.target.value),
                    sx: {
                      "& .MuiInputBase-root": {
                        backgroundColor: "transparent",
                        fontSize: "0.95rem",
                        "& fieldset": { border: "none" },
                      },
                    },
                  }),
                ],
              })
            : o.jsxs(y, {
                sx: {
                  display: "flex",
                  alignItems: "center",
                  px: 1.5,
                  py: 1.2,
                  backgroundColor: "background.paper",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  minHeight: 64,
                  position: "relative",
                  zIndex: 2,
                },
                children: [
                  o.jsx(X, {
                    onClick: () => e("/chats"),
                    sx: { color: "text.secondary", mr: 0.5 },
                    children: o.jsx(Ar, { sx: { fontSize: 26 } }),
                  }),
                  o.jsx(St, {
                    src: ja,
                    name: Nt,
                    size: 46,
                    onClick: () => oe && e(`/user/${oe.id}`),
                    sx: { marginRight: 12, cursor: oe ? "pointer" : "default" },
                  }),
                  o.jsxs(y, {
                    onClick: () => oe && e(`/user/${oe.id}`),
                    sx: {
                      flex: 1,
                      minWidth: 0,
                      cursor: oe ? "pointer" : "default",
                    },
                    children: [
                      o.jsxs(A, {
                        variant: "subtitle1",
                        noWrap: !0,
                        sx: {
                          fontWeight: 600,
                          fontSize: "1.05rem",
                          lineHeight: 1.2,
                          color: "text.primary",
                          display: "flex",
                          alignItems: "center",
                        },
                        children: [
                          o.jsx("span", {
                            style: {
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            },
                            children: Nt,
                          }),
                          (oe == null ? void 0 : oe.badge) &&
                            o.jsx(ps, { badge: oe.badge, size: 14 }),
                        ],
                      }),
                      o.jsx(A, {
                        variant: "caption",
                        sx: {
                          color:
                            Ts || (oe == null ? void 0 : oe.status) === "online"
                              ? "primary.main"
                              : "text.secondary",
                          fontSize: "0.8rem",
                        },
                        children: Ts || Ra,
                      }),
                    ],
                  }),
                  o.jsx(X, {
                    onClick: (f) => ae(f.currentTarget),
                    sx: { color: "text.secondary" },
                    children: o.jsx(Yr, {}),
                  }),
                ],
              }),
        o.jsx(aa, {}),
        V &&
          o.jsxs(y, {
            sx: {
              position: "absolute",
              top: 56,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "background.default",
            },
            children: [
              o.jsx(y, {
                sx: { flex: 1, overflow: "auto" },
                children: (pe.length > 0
                  ? pe.map((f) => xe[f])
                  : [...xe].reverse()
                )
                  .filter(Boolean)
                  .map((f, S) => {
                    if (!f) return null;
                    const j =
                        ee == null
                          ? void 0
                          : ee.participants.find((F) => F.id === f.userId),
                      I = f.userId === (n == null ? void 0 : n.id),
                      N = I
                        ? "You"
                        : (j == null ? void 0 : j.fullName) || "Unknown";
                    return o.jsxs(
                      y,
                      {
                        onClick: () => {
                          (C(!1),
                            pe.length > 0 && q(S),
                            setTimeout(() => {
                              const F = z.current[f.id];
                              F == null ||
                                F.scrollIntoView({
                                  behavior: "smooth",
                                  block: "center",
                                });
                            }, 100));
                        },
                        sx: {
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1.5,
                          px: 2,
                          py: 1.2,
                          cursor: "pointer",
                          borderBottom: "1px solid",
                          borderColor: "divider",
                          "&:active": { backgroundColor: "action.selected" },
                        },
                        children: [
                          o.jsx(St, {
                            src: I
                              ? n == null
                                ? void 0
                                : n.avatar
                              : j == null
                                ? void 0
                                : j.avatar,
                            name: N,
                            size: 42,
                            sx: { marginTop: 2.4 },
                          }),
                          o.jsxs(y, {
                            sx: { flex: 1, minWidth: 0 },
                            children: [
                              o.jsxs(y, {
                                sx: {
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  mb: 0.2,
                                },
                                children: [
                                  o.jsx(A, {
                                    sx: {
                                      fontWeight: 600,
                                      fontSize: "0.95rem",
                                      color: "text.primary",
                                    },
                                    children: N,
                                  }),
                                  o.jsx(A, {
                                    sx: {
                                      fontSize: "0.75rem",
                                      color: "text.secondary",
                                      flexShrink: 0,
                                      ml: 1,
                                    },
                                    children:
                                      (f.createdAt || f.timestamp) &&
                                      ca(f.createdAt || f.timestamp),
                                  }),
                                ],
                              }),
                              o.jsx(A, {
                                noWrap: !0,
                                sx: {
                                  fontSize: "0.88rem",
                                  color: "text.secondary",
                                  lineHeight: 1.4,
                                },
                                children: f.text,
                              }),
                            ],
                          }),
                        ],
                      },
                      f.id,
                    );
                  }),
              }),
              o.jsxs(y, {
                sx: {
                  display: "flex",
                  alignItems: "center",
                  px: 2,
                  py: 1.2,
                  backgroundColor: "background.paper",
                  borderTop: "1px solid",
                  borderColor: "divider",
                },
                children: [
                  o.jsx(qs, {
                    sx: { color: "text.secondary", fontSize: 24, mr: 1.5 },
                  }),
                  o.jsx(A, {
                    variant: "body2",
                    sx: { color: "text.primary", flex: 1 },
                    children:
                      pe.length > 0
                        ? `${pe.length.toLocaleString()} results`
                        : `${xe.length.toLocaleString()} messages`,
                  }),
                  o.jsx(A, {
                    variant: "body2",
                    sx: {
                      color: "#8774E1",
                      fontWeight: 500,
                      cursor: "pointer",
                    },
                    onClick: () => C(!1),
                    children: "Show as Chat",
                  }),
                ],
              }),
            ],
          }),
        o.jsxs(y, {
          ref: Lt,
          className: `scroll-container${Oe ? " is-selecting" : ""}`,
          sx: {
            flex: 1,
            overflow: "auto",
            px: 1.5,
            py: 1,
            WebkitUserSelect: "none",
            userSelect: "none",
          },
          children: [
            ir &&
              o.jsxs(y, {
                sx: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  position: "relative",
                },
                children: [
                  o.jsx(Ct, { sx: { color: "#8774E1" }, size: 36 }),
                  o.jsxs(y, {
                    sx: {
                      position: "absolute",
                      top: "50%",
                      left: 0,
                      right: 0,
                      mt: 4,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      px: 4,
                      opacity: _s ? 1 : 0,
                      transform: _s ? "translateY(0)" : "translateY(8px)",
                      transition: "opacity 0.6s ease, transform 0.6s ease",
                    },
                    children: [
                      o.jsx(A, {
                        sx: {
                          fontWeight: 700,
                          fontSize: "0.95rem",
                          color: "text.primary",
                          mb: 1,
                        },
                        children: "Долгая загрузка",
                      }),
                      o.jsx(A, {
                        sx: {
                          fontSize: "0.82rem",
                          color: "text.secondary",
                          lineHeight: 1.7,
                          mt: 0.5,
                        },
                        children: "Возможные причины проблемы:",
                      }),
                      o.jsx(A, {
                        sx: {
                          fontSize: "0.82rem",
                          color: "text.secondary",
                          lineHeight: 1.7,
                        },
                        children:
                          "— В текущий момент у вас очень медленный интернет",
                      }),
                      o.jsx(A, {
                        sx: {
                          fontSize: "0.82rem",
                          color: "text.secondary",
                          lineHeight: 1.7,
                        },
                        children:
                          "— РКН/ваш интернет-провайдер ограничил работу мобильной связи в этом районе",
                      }),
                    ],
                  }),
                ],
              }),
            !b &&
              xe.length === 0 &&
              o.jsx(y, {
                sx: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  px: 3,
                },
                children: o.jsxs(y, {
                  sx: {
                    backgroundColor: "rgba(135,116,225,0.08)",
                    borderRadius: "20px",
                    px: 3.5,
                    py: 3,
                    maxWidth: 300,
                    textAlign: "center",
                  },
                  children: [
                    o.jsx(A, {
                      sx: {
                        fontWeight: 600,
                        fontSize: "1.05rem",
                        color: "text.primary",
                        mb: 0.5,
                      },
                      children: "Пока нет сообщений...",
                    }),
                    o.jsxs(A, {
                      sx: {
                        fontSize: "0.88rem",
                        color: "text.secondary",
                        mb: 2.5,
                        lineHeight: 1.4,
                      },
                      children: [
                        "Поздоровайтесь с ",
                        (oe == null ? void 0 : oe.fullName) || Nt,
                      ],
                    }),
                    o.jsx(y, {
                      sx: { display: "flex", flexDirection: "column", gap: 1 },
                      children: ["Привет! 👋", "Хай! ✌️", "Здравствуйте!"].map(
                        (f) =>
                          o.jsx(
                            y,
                            {
                              onClick: () => {
                                t && i(t, f);
                              },
                              sx: {
                                py: 1,
                                px: 2,
                                borderRadius: "14px",
                                backgroundColor: "rgba(135,116,225,0.15)",
                                color: "#8774E1",
                                fontWeight: 500,
                                fontSize: "0.92rem",
                                cursor: "pointer",
                                transition:
                                  "background-color 0.15s ease, transform 0.15s ease",
                                "&:active": {
                                  backgroundColor: "rgba(135,116,225,0.3)",
                                  transform: "scale(0.97)",
                                },
                              },
                              children: f,
                            },
                            f,
                          ),
                      ),
                    }),
                  ],
                }),
              }),
            sc.map((f) =>
              o.jsxs(
                je.Fragment,
                {
                  children: [
                    o.jsx(y, {
                      sx: {
                        display: "flex",
                        justifyContent: "center",
                        my: 1.5,
                      },
                      children: o.jsx(A, {
                        sx: {
                          backgroundColor: "rgba(0,0,0,0.3)",
                          borderRadius: "12px",
                          px: 1.5,
                          py: 0.3,
                          fontSize: "0.75rem",
                          color: "text.secondary",
                        },
                        children: f.date,
                      }),
                    }),
                    f.messages.map((S, j) => {
                      const I = S.userId === (n == null ? void 0 : n.id),
                        N =
                          ee == null
                            ? void 0
                            : ee.participants.find((tt) => tt.id === S.userId),
                        F = j > 0 ? f.messages[j - 1] : null,
                        ne = !I && (!F || F.userId !== S.userId),
                        be = fn.get(S.id) ?? -1,
                        et = de && pe.includes(be),
                        yt = et && pe[U] === be;
                      return o.jsx(
                        da,
                        {
                          message: S,
                          isOwn: I,
                          showAvatar: ne,
                          msgUser: N,
                          isSelected: ze.has(S.id),
                          isSelectingRef: nr,
                          isSearchMatch: et,
                          isCurrentMatch: yt,
                          chatType:
                            (ee == null ? void 0 : ee.type) || "private",
                          onTap: Na,
                          onToggleSelect: za,
                          onTouchStart: $a,
                          onTouchMove: Wa,
                          onTouchEnd: Ha,
                          onContextMenu: Fa,
                          longPressTriggered: B,
                          messageRef: (tt) => {
                            z.current[S.id] = tt;
                          },
                          onReply: (tt) => {
                            var nt;
                            (D(tt), (nt = an.current) == null || nt.focus());
                          },
                          onScrollToMessage: (tt) => {
                            const nt = z.current[tt];
                            nt &&
                              (nt.scrollIntoView({
                                behavior: "smooth",
                                block: "center",
                              }),
                              (nt.style.backgroundColor =
                                "rgba(135,116,225,0.2)"),
                              setTimeout(() => {
                                nt.style.backgroundColor = "";
                              }, 1500));
                          },
                        },
                        S.id,
                      );
                    }),
                  ],
                },
                f.date,
              ),
            ),
            o.jsx("div", { ref: te }),
          ],
        }),
        Ea &&
          o.jsxs(y, {
            onClick: _a,
            sx: {
              position: "absolute",
              right: 16,
              bottom: Z ? 120 : 80,
              zIndex: 10,
              width: 42,
              height: 42,
              borderRadius: "50%",
              backgroundColor: "background.paper",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.2s ease, opacity 0.2s ease",
              "&:active": { transform: "scale(0.9)" },
            },
            children: [
              o.jsx(Vs, { sx: { color: "text.secondary", fontSize: 28 } }),
              er > 0 &&
                o.jsx(y, {
                  sx: {
                    position: "absolute",
                    top: -6,
                    right: -4,
                    minWidth: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: "#8774E1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 0.5,
                  },
                  children: o.jsx(A, {
                    sx: {
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 1,
                    },
                    children: er > 99 ? "99+" : er,
                  }),
                }),
            ],
          }),
        de &&
          !V &&
          pe.length > 0 &&
          o.jsxs(y, {
            sx: {
              position: "fixed",
              right: 12,
              bottom: 80,
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              zIndex: 10,
            },
            children: [
              o.jsx(X, {
                onClick: () => Ls("up"),
                sx: {
                  backgroundColor: "rgba(23,33,43,0.9)",
                  color: "#fff",
                  width: 44,
                  height: 44,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  "&:hover": { backgroundColor: "rgba(23,33,43,0.95)" },
                },
                children: o.jsx(Fc, {}),
              }),
              o.jsx(X, {
                onClick: () => Ls("down"),
                sx: {
                  backgroundColor: "rgba(23,33,43,0.9)",
                  color: "#fff",
                  width: 44,
                  height: 44,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  "&:hover": { backgroundColor: "rgba(23,33,43,0.95)" },
                },
                children: o.jsx(Vs, {}),
              }),
            ],
          }),
        de &&
          !V &&
          o.jsxs(y, {
            sx: {
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 1.2,
              backgroundColor: "background.paper",
              borderTop: "1px solid",
              borderColor: "divider",
            },
            children: [
              o.jsx(qs, {
                sx: { color: "text.secondary", fontSize: 24, mr: 1.5 },
              }),
              o.jsx(A, {
                variant: "body2",
                sx: { color: "text.primary", flex: 1 },
                children:
                  pe.length > 0
                    ? `${U + 1} of ${pe.length}`
                    : Ie.trim()
                      ? "0 results"
                      : `${xe.length} messages`,
              }),
              o.jsx(A, {
                variant: "body2",
                sx: { color: "#8774E1", fontWeight: 500, cursor: "pointer" },
                onClick: () => C(!0),
                children: "Show as List",
              }),
            ],
          }),
        E &&
          o.jsxs(y, {
            sx: {
              px: 2,
              py: 0.8,
              backgroundColor: "background.paper",
              borderLeft: "2px solid #8774E1",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            },
            children: [
              o.jsxs(y, {
                children: [
                  o.jsx(A, {
                    variant: "caption",
                    sx: { color: "#8774E1", fontWeight: 600 },
                    children: "Редактирование",
                  }),
                  o.jsx(A, {
                    variant: "body2",
                    noWrap: !0,
                    sx: {
                      color: "text.secondary",
                      fontSize: "0.8rem",
                      maxWidth: 250,
                    },
                    children: M == null ? void 0 : M.text,
                  }),
                ],
              }),
              o.jsx(X, {
                size: "small",
                onClick: () => {
                  (T(!1), H(null), k(""));
                },
                children: o.jsx(Wt, {
                  fontSize: "small",
                  sx: { color: "text.secondary" },
                }),
              }),
            ],
          }),
        $.length > 0 &&
          !de &&
          o.jsxs(y, {
            sx: {
              display: "flex",
              gap: 1,
              px: 1.5,
              py: 1,
              backgroundColor: "background.paper",
              borderTop: "1px solid",
              borderColor: "divider",
              overflowX: "auto",
              "&::-webkit-scrollbar": { display: "none" },
            },
            children: [
              $.map((f, S) =>
                o.jsxs(
                  y,
                  {
                    sx: { position: "relative", flexShrink: 0 },
                    children: [
                      f.type.startsWith("image/")
                        ? o.jsx(y, {
                            component: "img",
                            src: URL.createObjectURL(f),
                            sx: {
                              width: 60,
                              height: 60,
                              borderRadius: 1,
                              objectFit: "cover",
                            },
                          })
                        : o.jsx(y, {
                            sx: {
                              width: 60,
                              height: 60,
                              borderRadius: 1,
                              backgroundColor: "action.hover",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            },
                            children: o.jsx(A, {
                              variant: "caption",
                              sx: {
                                fontSize: "0.6rem",
                                textAlign: "center",
                                px: 0.5,
                              },
                              noWrap: !0,
                              children: f.name,
                            }),
                          }),
                      Gn.has(S) &&
                        o.jsx(y, {
                          sx: {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            borderRadius: 1,
                          },
                          children: o.jsx(Ct, {
                            size: 24,
                            sx: { color: "#fff" },
                          }),
                        }),
                      o.jsx(X, {
                        size: "small",
                        onClick: () => Ta(S),
                        sx: {
                          position: "absolute",
                          top: -6,
                          right: -6,
                          backgroundColor: "error.main",
                          color: "#fff",
                          width: 18,
                          height: 18,
                          "&:hover": { backgroundColor: "error.dark" },
                        },
                        children: o.jsx(Qe, { sx: { fontSize: 12 } }),
                      }),
                    ],
                  },
                  S,
                ),
              ),
              It &&
                o.jsx(y, {
                  sx: { display: "flex", alignItems: "center", px: 1 },
                  children: o.jsx(A, {
                    variant: "caption",
                    sx: { color: "text.secondary" },
                    children: "Загрузка...",
                  }),
                }),
            ],
          }),
        ar &&
          !de &&
          o.jsx(y, {
            sx: {
              px: 2,
              py: 1.5,
              pb: 2.5,
              backgroundColor: "background.paper",
              borderTop: "1px solid",
              borderColor: "divider",
            },
            children: o.jsx(y, {
              onClick: () => {
                if (oe) {
                  x(oe.id);
                  const f = oe.id,
                    S = Nt;
                  ms.getState().push({
                    message: `${S} разблокирован`,
                    timeout: 4e3,
                    onUndo: () => {
                      const { blockUser: j } = dt.getState();
                      j(f);
                    },
                    onExpire: () => {},
                  });
                }
              },
              sx: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 1.3,
                borderRadius: "22px",
                backgroundColor: "action.hover",
                cursor: "pointer",
                transition: "background-color 0.15s ease",
                "&:active": { backgroundColor: "action.selected" },
              },
              children: o.jsx(A, {
                sx: {
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "text.primary",
                },
                children: "Разблокировать",
              }),
            }),
          }),
        Z &&
          !de &&
          !ar &&
          o.jsxs(y, {
            sx: {
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 1,
              backgroundColor: "background.paper",
              borderTop: "1px solid",
              borderColor: "divider",
            },
            children: [
              o.jsx(Ks, {
                sx: { color: "#8774E1", fontSize: 20, transform: "scaleX(-1)" },
              }),
              o.jsxs(y, {
                sx: {
                  flex: 1,
                  minWidth: 0,
                  borderLeft: "2px solid #8774E1",
                  pl: 1,
                },
                children: [
                  o.jsx(A, {
                    sx: {
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "#8774E1",
                    },
                    children:
                      Z.userId === (n == null ? void 0 : n.id)
                        ? "Вы"
                        : Z.fullName || "Пользователь",
                  }),
                  o.jsx(A, {
                    sx: {
                      fontSize: "0.78rem",
                      color: "text.secondary",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    },
                    children:
                      Z.text ||
                      ((Os = Z.attachments) != null && Os.length
                        ? "📎 Вложение"
                        : ""),
                  }),
                ],
              }),
              o.jsx(X, {
                size: "small",
                onClick: () => D(null),
                sx: { color: "text.secondary" },
                children: o.jsx(Qe, { sx: { fontSize: 18 } }),
              }),
            ],
          }),
        hn &&
          Is.length > 0 &&
          o.jsx(y, {
            sx: { px: 1.5, pb: 0.5, backgroundColor: "background.paper" },
            children: o.jsx(y, {
              sx: {
                borderRadius: 3,
                backgroundColor: "background.paper",
                boxShadow:
                  "0 -4px 20px rgba(0,0,0,0.15), 0 0 12px rgba(135,116,225,0.1)",
                border: "1px solid",
                borderColor: "divider",
                maxHeight: 220,
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
              },
              children: Is.map((f) =>
                o.jsxs(
                  y,
                  {
                    onMouseDown: (S) => S.preventDefault(),
                    onClick: () => Oa(f.username),
                    sx: {
                      display: "flex",
                      alignItems: "center",
                      gap: 1.2,
                      px: 1.5,
                      py: 1,
                      cursor: "pointer",
                      "&:active": { backgroundColor: "rgba(135,116,225,0.12)" },
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      "&:last-child": { borderBottom: "none" },
                    },
                    children: [
                      o.jsx(St, {
                        src: f.avatar ? `${fp}${f.avatar}` : void 0,
                        name: f.fullName || f.username,
                        size: 34,
                      }),
                      o.jsxs(y, {
                        sx: { flex: 1, minWidth: 0 },
                        children: [
                          o.jsx(A, {
                            noWrap: !0,
                            sx: {
                              fontSize: 13.5,
                              fontWeight: 600,
                              color: "text.primary",
                            },
                            children: f.fullName,
                          }),
                          o.jsxs(A, {
                            noWrap: !0,
                            sx: {
                              fontSize: 12,
                              color: "#8774E1",
                              fontWeight: 500,
                            },
                            children: ["@", f.username],
                          }),
                        ],
                      }),
                    ],
                  },
                  f.id,
                ),
              ),
            }),
          }),
        !de &&
          !ar &&
          o.jsxs(y, {
            sx: {
              display: "flex",
              alignItems: "flex-end",
              gap: 1,
              px: 1.5,
              py: Oe ? 0 : 1.5,
              pb: Oe ? 0 : 2.5,
              backgroundColor: "background.paper",
              borderTop: $.length > 0 || Z || hn ? "none" : "1px solid",
              borderColor: "divider",
              maxHeight: Oe ? 0 : 200,
              opacity: Oe ? 0 : 1,
              overflow: "hidden",
              transition:
                "max-height 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s cubic-bezier(0.4,0,0.2,1)",
              pointerEvents: Oe ? "none" : "auto",
              position: "relative",
              zIndex: 2,
            },
            children: [
              o.jsx("input", {
                type: "file",
                ref: O,
                onChange: Aa,
                multiple: !0,
                accept:
                  "image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.rar",
                style: { display: "none" },
              }),
              o.jsx(X, {
                onClick: Pa,
                disabled: It,
                sx: { color: "text.secondary", mb: 0.3 },
                children: o.jsx(zc, {}),
              }),
              o.jsx(ot, {
                fullWidth: !0,
                multiline: !0,
                maxRows: 4,
                placeholder: "Сообщение...",
                value: g,
                inputRef: an,
                onChange: (f) => {
                  const S = f.target.value;
                  k(S);
                  const j = f.target.selectionStart ?? S.length;
                  if ((La(S, j), t && S.trim())) {
                    const I = ve();
                    (I &&
                      !Mt.current &&
                      ((Mt.current = !0),
                      I.emit("typing:start", { chatId: t })),
                      pt.current && clearTimeout(pt.current),
                      (pt.current = setTimeout(() => {
                        Mt.current = !1;
                        const N = ve();
                        N && N.emit("typing:stop", { chatId: t });
                      }, 2e3)));
                  }
                },
                onKeyDown: Da,
                size: "small",
                sx: {
                  "& .MuiInputBase-root": {
                    backgroundColor: "action.hover",
                    borderRadius: "22px",
                    fontSize: "1rem",
                    py: 0.8,
                    px: 1.8,
                    minHeight: 44,
                    "& fieldset": { border: "none" },
                    transition: "box-shadow 0.3s ease",
                    "&.Mui-focused": {
                      boxShadow:
                        "0 0 0 2px rgba(135,116,225,0.25), 0 0 16px rgba(135,116,225,0.15)",
                    },
                  },
                },
              }),
              o.jsx(X, {
                onClick: Ps,
                onPointerDown: (f) => f.preventDefault(),
                disabled: !g.trim() && $.length === 0,
                sx: {
                  backgroundColor:
                    g.trim() || $.length > 0 ? "primary.main" : "transparent",
                  color: g.trim() || $.length > 0 ? "#fff" : "text.secondary",
                  mb: 0.3,
                  width: 42,
                  height: 42,
                  boxShadow:
                    g.trim() || $.length > 0
                      ? "0 0 14px rgba(135,116,225,0.4), 0 2px 8px rgba(135,116,225,0.3)"
                      : "none",
                  transition:
                    "background-color 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    backgroundColor:
                      g.trim() || $.length > 0 ? "primary.dark" : "transparent",
                  },
                },
                children: o.jsx(Jr, { sx: { fontSize: 20 } }),
              }),
            ],
          }),
        o.jsxs(_r, {
          anchorEl: J,
          open: !!J,
          onClose: () => ae(null),
          transitionDuration: 0,
          BackdropProps: { invisible: !0, onTouchStart: () => ae(null) },
          PaperProps: {
            sx: {
              backgroundColor: "background.paper",
              borderRadius: "10px",
              minWidth: 180,
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            },
          },
          children: [
            o.jsxs(qe, {
              onClick: tc,
              sx: { fontSize: "0.9rem" },
              children: [
                o.jsx(He, {
                  children: o.jsx(ii, {
                    fontSize: "small",
                    sx: { color: "text.secondary" },
                  }),
                }),
                "Поиск",
              ],
            }),
            o.jsxs(qe, {
              onClick: Za,
              sx: { fontSize: "0.9rem", color: "error.main" },
              children: [
                o.jsx(He, {
                  children: o.jsx(Wt, {
                    fontSize: "small",
                    sx: { color: "error.main" },
                  }),
                }),
                "Удалить чат",
              ],
            }),
          ],
        }),
        o.jsxs(_r, {
          anchorEl: _ == null ? void 0 : _.anchorEl,
          open: !!_,
          onClose: Ge,
          transitionDuration: 150,
          MenuListProps: { sx: { py: 0.5 } },
          BackdropProps: { invisible: !0, onTouchStart: () => Ge() },
          PaperProps: {
            sx: {
              backgroundColor: "background.paper",
              borderRadius: "12px",
              minWidth: 180,
              maxWidth: "70vw",
              boxShadow: (f) =>
                f.palette.mode === "dark"
                  ? "0 4px 24px rgba(0,0,0,0.5)"
                  : "0 4px 24px rgba(0,0,0,0.12)",
              backgroundImage: "none",
            },
          },
          children: [
            o.jsxs(qe, {
              onClick: Va,
              sx: { py: 1, px: 2, minHeight: 40 },
              children: [
                o.jsx(He, {
                  sx: { minWidth: 32 },
                  children: o.jsx(Ks, {
                    sx: { fontSize: 20, color: "text.secondary" },
                  }),
                }),
                o.jsx(A, {
                  noWrap: !0,
                  sx: {
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "text.primary",
                  },
                  children: "Ответить",
                }),
              ],
            }),
            o.jsxs(qe, {
              onClick: qa,
              sx: { py: 1, px: 2, minHeight: 40 },
              children: [
                o.jsx(He, {
                  sx: { minWidth: 32 },
                  children: o.jsx(Ws, {
                    sx: { fontSize: 20, color: "text.secondary" },
                  }),
                }),
                o.jsx(A, {
                  noWrap: !0,
                  sx: {
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "text.primary",
                  },
                  children: "Копировать",
                }),
              ],
            }),
            o.jsxs(qe, {
              onClick: Xa,
              sx: { py: 1, px: 2, minHeight: 40 },
              children: [
                o.jsx(He, {
                  sx: { minWidth: 32 },
                  children: o.jsx(Hs, {
                    sx: { fontSize: 20, color: "text.secondary" },
                  }),
                }),
                o.jsx(A, {
                  noWrap: !0,
                  sx: {
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "text.primary",
                  },
                  children: "Переслать в Избранное",
                }),
              ],
            }),
            (_ == null ? void 0 : _.message.userId) ===
              (n == null ? void 0 : n.id) &&
              o.jsxs(qe, {
                onClick: Ya,
                sx: { py: 1, px: 2, minHeight: 40 },
                children: [
                  o.jsx(He, {
                    sx: { minWidth: 32 },
                    children: o.jsx(ci, {
                      sx: { fontSize: 20, color: "text.secondary" },
                    }),
                  }),
                  o.jsx(A, {
                    noWrap: !0,
                    sx: {
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: "text.primary",
                    },
                    children: "Редактировать",
                  }),
                ],
              }),
            o.jsx(ei, { sx: { my: 0.5, borderColor: "divider" } }),
            o.jsxs(qe, {
              onClick: Ka,
              sx: { py: 1, px: 2, minHeight: 40 },
              children: [
                o.jsx(He, {
                  sx: { minWidth: 32 },
                  children: o.jsx(Bn, {
                    sx: { fontSize: 20, color: "text.secondary" },
                  }),
                }),
                o.jsx(A, {
                  noWrap: !0,
                  sx: {
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "text.primary",
                  },
                  children: "Выбрать",
                }),
              ],
            }),
            (_ == null ? void 0 : _.message.userId) ===
              (n == null ? void 0 : n.id) &&
              o.jsxs(qe, {
                onClick: Ja,
                sx: { py: 1, px: 2, minHeight: 40 },
                children: [
                  o.jsx(He, {
                    sx: { minWidth: 32 },
                    children: o.jsx(Wt, {
                      sx: { fontSize: 20, color: "#e53935" },
                    }),
                  }),
                  o.jsx(A, {
                    noWrap: !0,
                    sx: {
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: "#e53935",
                    },
                    children: "Удалить",
                  }),
                ],
              }),
          ],
        }),
        o.jsxs(vt, {
          open: L,
          onClose: Ds,
          PaperProps: {
            sx: {
              backgroundColor: "background.paper",
              borderRadius: "12px",
              minWidth: 280,
            },
          },
          children: [
            o.jsx(Vt, {
              sx: { color: "text.primary", pb: 0.5 },
              children: Oe
                ? `Удалить ${ze.size} ${ze.size === 1 ? "сообщение" : ze.size < 5 ? "сообщения" : "сообщений"}`
                : "Удалить сообщение",
            }),
            o.jsxs(Kt, {
              sx: { pb: 1 },
              children: [
                o.jsx(A, {
                  variant: "body2",
                  sx: { color: "text.secondary", mb: 1 },
                  children: Oe
                    ? "Вы уверены, что хотите удалить выбранные сообщения?"
                    : "Вы уверены, что хотите удалить это сообщение?",
                }),
                (ee == null ? void 0 : ee.type) === "private" &&
                  oe &&
                  o.jsx(Ys, {
                    control: o.jsx(Js, {
                      checked: le,
                      onChange: (f) => se(f.target.checked),
                      sx: {
                        color: "text.secondary",
                        "&.Mui-checked": { color: "#8774E1" },
                      },
                    }),
                    label: o.jsxs(A, {
                      variant: "body2",
                      sx: { color: "text.primary" },
                      children: ["Также удалить для ", oe.fullName],
                    }),
                  }),
                (ee == null ? void 0 : ee.type) === "group" &&
                  o.jsx(Ys, {
                    control: o.jsx(Js, {
                      checked: le,
                      onChange: (f) => se(f.target.checked),
                      sx: {
                        color: "text.secondary",
                        "&.Mui-checked": { color: "#8774E1" },
                      },
                    }),
                    label: o.jsx(A, {
                      variant: "body2",
                      sx: { color: "text.primary" },
                      children: "Удалить для всех",
                    }),
                  }),
              ],
            }),
            o.jsxs(Yt, {
              sx: { px: 2, pb: 2 },
              children: [
                o.jsx(Ee, {
                  onClick: Ds,
                  sx: { color: "text.secondary" },
                  children: "Отмена",
                }),
                o.jsx(Ee, {
                  onClick: Qa,
                  sx: { color: "#e53935" },
                  children: "Удалить",
                }),
              ],
            }),
          ],
        }),
        o.jsxs(vt, {
          open: ue,
          onClose: () => he(!1),
          PaperProps: {
            sx: {
              backgroundColor: "background.paper",
              borderRadius: "12px",
              minWidth: 280,
            },
          },
          children: [
            o.jsx(Vt, {
              sx: { color: "text.primary", pb: 0.5 },
              children: "Удалить чат",
            }),
            o.jsx(Kt, {
              children: o.jsxs(A, {
                variant: "body2",
                sx: { color: "text.secondary" },
                children: [
                  "Вы уверены, что хотите удалить чат с ",
                  Nt,
                  "? Это действие нельзя отменить.",
                ],
              }),
            }),
            o.jsxs(Yt, {
              sx: { px: 2, pb: 2 },
              children: [
                o.jsx(Ee, {
                  onClick: () => he(!1),
                  sx: { color: "text.secondary" },
                  children: "Отмена",
                }),
                o.jsx(Ee, {
                  onClick: ec,
                  sx: { color: "#e53935" },
                  children: "Удалить",
                }),
              ],
            }),
          ],
        }),
        o.jsx(dp, {
          open: va,
          onClose: () => Xe(!1),
          onPhotosSelected: Ia,
          onPhotoTap: (f) => {
            (Xe(!1), Qn(f.id), ft(f.base64));
          },
          scrollToPhotoId: Ca,
          onFileSelect: () => {
            var f;
            (Xe(!1), (f = O.current) == null || f.click());
          },
          onCameraSelect: () => {
            Xe(!1);
            const f = document.createElement("input");
            ((f.type = "file"),
              (f.accept = "image/*"),
              (f.capture = "environment"),
              (f.onchange = (S) => {
                var I, N;
                const j =
                  (N = (I = S.target) == null ? void 0 : I.files) == null
                    ? void 0
                    : N[0];
                if (j) {
                  const F = new FileReader();
                  ((F.onload = () => ft(F.result)), F.readAsDataURL(j));
                }
              }),
              f.click());
          },
        }),
        js &&
          o.jsx(hp, {
            imageBase64: js,
            onSend: Ma,
            onClose: () => ft(null),
            onBack: (f) => {
              const S = cr(f),
                j = new File([S], `edited_${Date.now()}.jpg`, {
                  type: "image/jpeg",
                }),
                I = $.length;
              (Se((N) => [...N, j]),
                Le((N) => new Set(N).add(I)),
                Je(!0),
                wn
                  .uploadFiles([j])
                  .then((N) => {
                    Ye((F) => {
                      const ne = [...F];
                      return ((ne[I] = N[0]), ne);
                    });
                  })
                  .catch((N) => console.error("Upload failed:", N))
                  .finally(() => {
                    Le((N) => {
                      const F = new Set(N);
                      return (F.delete(I), F.size === 0 && Je(!1), F);
                    });
                  }),
                ka(Sa),
                ft(null),
                Qn(null),
                Xe(!0));
            },
          }),
        o.jsxs(vt, {
          open: wa,
          onClose: () => sn(!1),
          PaperProps: {
            sx: {
              backgroundColor: "background.paper",
              borderRadius: "12px",
              minWidth: 280,
            },
          },
          children: [
            o.jsx(Vt, {
              sx: { color: "text.primary", pb: 0.5 },
              children: "Требуются разрешения",
            }),
            o.jsx(Kt, {
              children: o.jsx(A, {
                variant: "body2",
                sx: { color: "text.secondary" },
                children:
                  "Для отправки файлов и фото необходим доступ к камере и хранилищу. Пожалуйста, разрешите доступ в настройках приложения.",
              }),
            }),
            o.jsxs(Yt, {
              sx: { px: 2, pb: 2 },
              children: [
                o.jsx(Ee, {
                  onClick: () => sn(!1),
                  sx: { color: "text.secondary" },
                  children: "Отмена",
                }),
                o.jsx(Ee, {
                  onClick: async () => {
                    var f;
                    sn(!1);
                    try {
                      (await Ho.requestCameraAndStorage()).allGranted &&
                        ((f = O.current) == null || f.click());
                    } catch {}
                  },
                  variant: "contained",
                  children: "Разрешить",
                }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  qo = "dismissedUpdateVersion",
  gp = () => {
    const [t, e] = h.useState(!1),
      [n, r] = h.useState(null),
      [s, i] = h.useState(!1);
    h.useEffect(() => {
      const w = setTimeout(async () => {
        console.log("[UpdateDialog] Checking for updates...");
        const p = await vh();
        if ((console.log("[UpdateDialog] Update result:", p), p)) {
          if (!p.forceUpdate && localStorage.getItem(qo) === p.version) return;
          (r(p), e(!0));
        }
      }, 2e3);
      return () => clearTimeout(w);
    }, []);
    const [a, c] = h.useState(0),
      [d, l] = h.useState(!1),
      u = async () => {
        if (n) {
          (i(!0), c(0));
          try {
            (await Po.addListener("downloadProgress", (b) => {
              c(b.progress);
            }),
              await Po.downloadAndInstall({ url: n.downloadUrl }),
              l(!0),
              c(100));
          } catch (b) {
            (console.error("Native update error:", b),
              window.open(n.downloadUrl, "_blank"),
              l(!0));
          }
        }
      },
      m = () => {
        (n && localStorage.setItem(qo, n.version), e(!1));
      };
    return n
      ? o.jsxs(vt, {
          open: t,
          onClose: n != null && n.forceUpdate ? void 0 : () => e(!1),
          maxWidth: "xs",
          fullWidth: !0,
          disableEscapeKeyDown: !!(n != null && n.forceUpdate),
          children: [
            o.jsxs(Vt, {
              sx: { display: "flex", alignItems: "center", gap: 1 },
              children: [
                o.jsx(Bc, { color: "primary" }),
                "Доступно обновление",
              ],
            }),
            o.jsxs(Kt, {
              children: [
                o.jsxs(A, {
                  variant: "body2",
                  sx: { mb: 1 },
                  children: [
                    "Новая версия: ",
                    o.jsx("strong", { children: n.version }),
                  ],
                }),
                o.jsxs(A, {
                  variant: "caption",
                  sx: { color: "text.secondary" },
                  children: ["Текущая: ", bh()],
                }),
                n.changelog &&
                  o.jsxs(y, {
                    sx: {
                      mt: 2,
                      p: 1.5,
                      backgroundColor: "action.hover",
                      borderRadius: 1,
                    },
                    children: [
                      o.jsx(A, {
                        variant: "caption",
                        sx: { fontWeight: 600 },
                        children: "Что нового:",
                      }),
                      o.jsx(A, {
                        variant: "body2",
                        sx: { mt: 0.5, whiteSpace: "pre-line" },
                        children: n.changelog,
                      }),
                    ],
                  }),
                s &&
                  o.jsxs(y, {
                    sx: { mt: 2 },
                    children: [
                      o.jsx(Uc, {
                        variant: a > 0 ? "determinate" : "indeterminate",
                        value: a,
                        sx: { borderRadius: 1, height: 6 },
                      }),
                      o.jsx(A, {
                        variant: "caption",
                        sx: {
                          color: "text.secondary",
                          mt: 0.5,
                          display: "block",
                          textAlign: "center",
                        },
                        children: d
                          ? "Скачано! Откройте уведомление для установки"
                          : `Загрузка... ${a}%`,
                      }),
                    ],
                  }),
              ],
            }),
            o.jsx(Yt, {
              children: d
                ? o.jsx(Ee, {
                    onClick: u,
                    variant: "contained",
                    children: "Обновить",
                  })
                : o.jsxs(o.Fragment, {
                    children: [
                      !(n != null && n.forceUpdate) &&
                        o.jsx(Ee, {
                          onClick: m,
                          sx: { color: "text.secondary" },
                          disabled: s,
                          children: "Позже",
                        }),
                      o.jsx(Ee, {
                        onClick: u,
                        variant: "contained",
                        disabled: s,
                        children: s ? "Загрузка..." : "Обновить",
                      }),
                    ],
                  }),
            }),
          ],
        })
      : null;
  };
let Hr = "none";
function mp(t) {
  Hr = t;
}
function xp() {
  const t = Hr;
  return ((Hr = "none"), t);
}
const qr = {
    "/chats": 0,
    "/contacts": 1,
    "/settings": 2,
    "/admin": 3,
    "/edit-profile": 4,
  },
  yp = ["2"],
  Vo = [
    { path: "/chats", label: "Чаты", icon: ai, badge: !0 },
    { path: "/contacts", label: "Контакты", icon: ti },
    { path: "/settings", label: "Настройки", icon: ri },
  ],
  bp = { path: "/admin", label: "Админ", icon: $c },
  wp = () => {
    const t = _t(),
      e = di(),
      r = zn().palette.mode === "dark",
      s = e.pathname,
      { chats: i } = Ve(),
      { user: a } = Ue(),
      c = i.reduce((x, g) => x + (g.archived ? 0 : g.unreadCount || 0), 0),
      d = a && yp.includes(String(a.id)),
      l = h.useMemo(() => (d ? [...Vo, bp] : Vo), [d]);
    if (!h.useMemo(() => l.map((x) => x.path), [l]).some((x) => s === x))
      return null;
    const b = (x) => {
        if (s === x) return;
        const g = qr[s] ?? 0,
          k = qr[x] ?? 0;
        (mp(k > g ? "left" : "right"), t(x));
      },
      w = "#8774E1",
      p = r ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.45)";
    return o.jsx("div", {
      style: {
        position: "fixed",
        bottom: "calc(14px + env(safe-area-inset-bottom, 0px))",
        left: 16,
        right: 16,
        zIndex: 1200,
        display: "flex",
        alignItems: "stretch",
        justifyContent: "space-around",
        background: r
          ? "linear-gradient(135deg, rgba(20,30,42,0.55) 0%, rgba(30,40,55,0.45) 50%, rgba(20,28,40,0.55) 100%)"
          : "linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(245,245,255,0.55) 50%, rgba(255,255,255,0.65) 100%)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderRadius: 28,
        padding: "8px 4px",
        border: r
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(255,255,255,0.5)",
        boxShadow: r
          ? "0 8px 32px rgba(0,0,0,0.5), 0 0 24px rgba(135,116,225,0.2), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(255,255,255,0.03)"
          : "0 8px 32px rgba(0,0,0,0.08), 0 0 16px rgba(135,116,225,0.1), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(255,255,255,0.4)",
      },
      children: l.map((x) => {
        const g = s === x.path,
          k = x.icon,
          E = g ? w : p;
        return o.jsxs(
          "div",
          {
            onClick: () => b(x.path),
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              gap: 2,
              padding: "4px 0",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
            },
            children: [
              x.badge && c > 0
                ? o.jsx(si, {
                    badgeContent: c > 99 ? "99+" : c,
                    sx: {
                      "& .MuiBadge-badge": {
                        backgroundColor: w,
                        color: "#fff",
                        fontSize: "0.58rem",
                        fontWeight: 700,
                        minWidth: 16,
                        height: 16,
                        borderRadius: 8,
                        top: 0,
                        right: -4,
                      },
                    },
                    children: o.jsx(k, { style: { fontSize: 24, color: E } }),
                  })
                : o.jsx(k, { style: { fontSize: 24, color: E } }),
              o.jsx("span", {
                style: {
                  fontSize: "0.68rem",
                  fontWeight: g ? 600 : 400,
                  color: E,
                  letterSpacing: "0.01em",
                  lineHeight: 1,
                },
                children: x.label,
              }),
            ],
          },
          x.path,
        );
      }),
    });
  },
  vp = () => {
    const { current: t, undo: e, dismiss: n } = ms();
    return o.jsx(Wc, {
      open: !!t,
      onClose: (r, s) => {
        s !== "clickaway" && n();
      },
      autoHideDuration: null,
      anchorOrigin: { vertical: "bottom", horizontal: "center" },
      sx: {
        bottom: "calc(88px + env(safe-area-inset-bottom, 0px)) !important",
        left: "16px !important",
        right: "16px !important",
        transform: "none !important",
      },
      children: o.jsxs(y, {
        sx: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          backgroundColor: "rgba(30,40,55,0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: "12px",
          px: 2,
          py: 1.2,
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.4), 0 0 12px rgba(135,116,225,0.15)",
          border: "1px solid rgba(255,255,255,0.08)",
        },
        children: [
          o.jsx(A, {
            sx: {
              color: "#fff",
              fontSize: "0.88rem",
              fontWeight: 450,
              flex: 1,
              mr: 1,
            },
            children: t == null ? void 0 : t.message,
          }),
          (t == null ? void 0 : t.onUndo) &&
            o.jsx(Ee, {
              onClick: e,
              sx: {
                color: "#8774E1",
                fontWeight: 600,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                minWidth: "auto",
                px: 1.5,
                py: 0.5,
                borderRadius: "8px",
                "&:active": { backgroundColor: "rgba(135,116,225,0.15)" },
              },
              children: "Отмена",
            }),
        ],
      }),
    });
  };
var xs = {},
  Sp = Te;
Object.defineProperty(xs, "__esModule", { value: !0 });
var ua = (xs.default = void 0),
  Cp = Sp(Pe()),
  kp = o;
ua = xs.default = (0, Cp.default)(
  (0, kp.jsx)("path", {
    d: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
  }),
  "Close",
);
var ys = {},
  Ep = Te;
Object.defineProperty(ys, "__esModule", { value: !0 });
var ha = (ys.default = void 0),
  jp = Ep(Pe()),
  Rp = o;
ha = ys.default = (0, jp.default)(
  (0, Rp.jsx)("path", {
    d: "M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8",
  }),
  "InfoOutlined",
);
var bs = {},
  _p = Te;
Object.defineProperty(bs, "__esModule", { value: !0 });
var fa = (bs.default = void 0),
  Ap = _p(Pe()),
  Tp = o;
fa = bs.default = (0, Ap.default)(
  (0, Tp.jsx)("path", {
    d: "m12 16.5 4-4h-3v-9h-2v9H8zm9-13h-6v1.99h6v14.03H3V5.49h6V3.5H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2",
  }),
  "SystemUpdateAlt",
);
var ws = {},
  Pp = Te;
Object.defineProperty(ws, "__esModule", { value: !0 });
var pa = (ws.default = void 0),
  Ip = Pp(Pe()),
  Ko = o;
pa = ws.default = (0, Ip.default)(
  [
    (0, Ko.jsx)("path", { d: "M12 5.99 19.53 19H4.47zM12 2 1 21h22z" }, "0"),
    (0, Ko.jsx)("path", { d: "M13 16h-2v2h2zm0-6h-2v5h2z" }, "1"),
  ],
  "WarningAmber",
);
var vs = {},
  Mp = Te;
Object.defineProperty(vs, "__esModule", { value: !0 });
var ga = (vs.default = void 0),
  Dp = Mp(Pe()),
  Lp = o;
ga = vs.default = (0, Dp.default)(
  (0, Lp.jsx)("path", {
    d: "M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2m-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1M9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1m11 15H4v-2h16zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20z",
  }),
  "CardGiftcard",
);
var Ss = {},
  Op = Te;
Object.defineProperty(Ss, "__esModule", { value: !0 });
var ma = (Ss.default = void 0),
  Np = Op(Pe()),
  Fp = o;
ma = Ss.default = (0, Np.default)(
  (0, Fp.jsx)("path", {
    d: "M7.58 4.08 6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2c.15-2.65 1.51-4.97 3.55-6.42m12.39 6.42h2c-.15-3.2-1.73-6.02-4.12-7.85l-1.42 1.43c2.02 1.45 3.39 3.77 3.54 6.42M18 11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-6 11c.14 0 .27-.01.4-.04.65-.14 1.18-.58 1.44-1.18.1-.24.15-.5.15-.78h-4c.01 1.1.9 2 2.01 2",
  }),
  "NotificationsActive",
);
var Cs = {},
  zp = Te;
Object.defineProperty(Cs, "__esModule", { value: !0 });
var xa = (Cs.default = void 0),
  Bp = zp(Pe()),
  Up = o;
xa = Cs.default = (0, Bp.default)(
  (0, Up.jsx)("path", {
    d: "m22 9.24-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28z",
  }),
  "StarOutline",
);
var ks = {},
  $p = Te;
Object.defineProperty(ks, "__esModule", { value: !0 });
var ya = (ks.default = void 0),
  Wp = $p(Pe()),
  Yo = o;
ya = ks.default = (0, Wp.default)(
  [
    (0, Yo.jsx)(
      "path",
      {
        d: "m12 12.9-2.13 2.09c-.56.56-.87 1.29-.87 2.07C9 18.68 10.35 20 12 20s3-1.32 3-2.94c0-.78-.31-1.52-.87-2.07z",
      },
      "0",
    ),
    (0, Yo.jsx)(
      "path",
      {
        d: "m16 6-.44.55C14.38 8.02 12 7.19 12 5.3V2S4 6 4 13c0 2.92 1.56 5.47 3.89 6.86-.56-.79-.89-1.76-.89-2.8 0-1.32.52-2.56 1.47-3.5L12 10.1l3.53 3.47c.95.93 1.47 2.17 1.47 3.5 0 1.02-.31 1.96-.85 2.75 1.89-1.15 3.29-3.06 3.71-5.3.66-3.55-1.07-6.9-3.86-8.52",
      },
      "1",
    ),
  ],
  "LocalFireDepartment",
);
var Es = {},
  Hp = Te;
Object.defineProperty(Es, "__esModule", { value: !0 });
var ba = (Es.default = void 0),
  qp = Hp(Pe()),
  Vp = o;
ba = Es.default = (0, qp.default)(
  (0, Vp.jsx)("path", {
    d: "M18 11v2h4v-2zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61M20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4M4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34",
  }),
  "Campaign",
);
const Jo = {
  info: o.jsx(ha, { sx: { fontSize: 20 } }),
  update: o.jsx(fa, { sx: { fontSize: 20 } }),
  warning: o.jsx(pa, { sx: { fontSize: 20 } }),
  gift: o.jsx(ga, { sx: { fontSize: 20 } }),
  bell: o.jsx(ma, { sx: { fontSize: 20 } }),
  star: o.jsx(xa, { sx: { fontSize: 20 } }),
  fire: o.jsx(ya, { sx: { fontSize: 20 } }),
  megaphone: o.jsx(ba, { sx: { fontSize: 20 } }),
};
function Kp() {
  const { banners: t, dismissBanner: e, removeBanner: n } = Nn(),
    [r, s] = h.useState(new Set()),
    i = h.useCallback(
      (c, d) => {
        (s((l) => new Set(l).add(c)),
          setTimeout(() => {
            (d ? e(c) : n(c),
              s((l) => {
                const u = new Set(l);
                return (u.delete(c), u);
              }));
          }, 280));
      },
      [e, n],
    ),
    a = h.useCallback((c) => {
      c && window.open(c, "_blank", "noopener");
    }, []);
  return t.length
    ? o.jsx(y, {
        sx: {
          position: "fixed",
          bottom: "calc(80px + env(safe-area-inset-bottom, 0px))",
          left: 12,
          right: 12,
          maxWidth: 320,
          zIndex: 1300,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          pointerEvents: "none",
        },
        children: t.map((c) => {
          const d = r.has(c.id),
            l = c.bgColor || "#1E2A3A",
            u = c.textColor || "#FFFFFF",
            m = c.buttonColor || "#8774E1",
            b = c.buttonTextColor || "#FFFFFF",
            w = Jo[c.icon || "info"] || Jo.info,
            p = c.dismissable !== 0 && c.dismissable !== !1;
          return o.jsxs(
            y,
            {
              sx: {
                background: l,
                color: u,
                borderRadius: "14px",
                padding: "12px 14px",
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.45)",
                pointerEvents: "auto",
                opacity: d ? 0 : 1,
                transform: d ? "translateY(16px)" : "translateY(0)",
                transition: "opacity 0.28s, transform 0.28s",
                animation: "notifSlideUp 0.35s ease-out",
                "@keyframes notifSlideUp": {
                  from: { opacity: 0, transform: "translateY(30px)" },
                  to: { opacity: 1, transform: "translateY(0)" },
                },
              },
              children: [
                o.jsx(y, {
                  sx: {
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    mt: "2px",
                  },
                  children: w,
                }),
                o.jsxs(y, {
                  sx: { flex: 1, minWidth: 0 },
                  children: [
                    c.title &&
                      o.jsx(A, {
                        sx: {
                          fontWeight: 600,
                          fontSize: 13,
                          lineHeight: 1.3,
                          mb: 0.3,
                          color: u,
                          wordBreak: "break-word",
                          overflowWrap: "anywhere",
                        },
                        children: c.title,
                      }),
                    c.message &&
                      o.jsx(A, {
                        sx: {
                          fontSize: 12,
                          lineHeight: 1.4,
                          opacity: 0.85,
                          color: u,
                          mb: c.buttonText ? 1 : 0,
                          wordBreak: "break-word",
                          overflowWrap: "anywhere",
                        },
                        children: c.message,
                      }),
                    c.buttonText &&
                      o.jsx(y, {
                        component: "button",
                        onClick: () => a(c.buttonUrl),
                        sx: {
                          display: "inline-block",
                          padding: "6px 16px",
                          borderRadius: "8px",
                          background: m,
                          color: b,
                          border: "none",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                          "&:active": { opacity: 0.8 },
                        },
                        children: c.buttonText,
                      }),
                  ],
                }),
                p &&
                  o.jsx(X, {
                    size: "small",
                    onClick: () => i(c.id, c.showOnce),
                    sx: {
                      color: u,
                      opacity: 0.5,
                      p: "4px",
                      mt: "-2px",
                      mr: "-4px",
                    },
                    children: o.jsx(ua, { sx: { fontSize: 18 } }),
                  }),
              ],
            },
            c.id,
          );
        }),
      })
    : null;
}
const Yp = 50,
  Jp = () => {
    const t = h.useRef(null),
      e = h.useRef([]),
      n = h.useRef(0),
      r = h.useCallback((s, i) => {
        const a = [];
        for (let c = 0; c < Yp; c++)
          a.push({
            x: Math.random() * s,
            y: Math.random() * i,
            r: Math.random() * 2.5 + 1,
            speed: Math.random() * 0.6 + 0.3,
            wind: Math.random() * 0.4 - 0.2,
            opacity: Math.random() * 0.5 + 0.3,
          });
        e.current = a;
      }, []);
    return (
      h.useEffect(() => {
        const s = t.current;
        if (!s) return;
        const i = s.getContext("2d");
        if (!i) return;
        const a = () => {
          ((s.width = window.innerWidth),
            (s.height = window.innerHeight),
            e.current.length === 0 && r(s.width, s.height));
        };
        (a(), window.addEventListener("resize", a));
        const c = () => {
          i.clearRect(0, 0, s.width, s.height);
          const d = e.current;
          for (let l = 0; l < d.length; l++) {
            const u = d[l];
            (i.beginPath(),
              i.arc(u.x, u.y, u.r, 0, Math.PI * 2),
              (i.fillStyle = `rgba(255, 255, 255, ${u.opacity})`),
              i.fill(),
              (u.y += u.speed),
              (u.x += u.wind + Math.sin(u.y * 0.01) * 0.3),
              u.y > s.height + 5 &&
                ((u.y = -5), (u.x = Math.random() * s.width)),
              u.x > s.width + 5 && (u.x = -5),
              u.x < -5 && (u.x = s.width + 5));
          }
          n.current = requestAnimationFrame(c);
        };
        return (
          c(),
          () => {
            (cancelAnimationFrame(n.current),
              window.removeEventListener("resize", a));
          }
        );
      }, [r]),
      o.jsx("canvas", {
        ref: t,
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1100,
        },
      })
    );
  },
  Xp = ({ onComplete: t, onReveal: e, dataReady: n }) => {
    const [r, s] = h.useState("center"),
      i = h.useRef(null),
      a = h.useRef(!1),
      c = h.useRef(t);
    c.current = t;
    const d = h.useRef(e);
    d.current = e;
    const l = h.useCallback(() => {
      (s("move"),
        d.current(),
        setTimeout(() => {
          (s("done"), c.current());
        }, 800));
    }, []);
    if (
      (h.useEffect(() => {
        const m = setTimeout(() => s("rainbow"), 350),
          b = setTimeout(() => {
            ((a.current = !0), s("waiting"));
          }, 1450),
          w = setTimeout(() => {
            a.current && l();
          }, 4e3);
        return () => {
          (clearTimeout(m), clearTimeout(b), clearTimeout(w));
        };
      }, [l]),
      h.useEffect(() => {
        r === "waiting" && n && l();
      }, [r, n, l]),
      r === "done")
    )
      return null;
    const u = [
      "splash-title",
      r === "rainbow" ? "splash-rainbow" : "",
      r === "move" ? "splash-move-to-header" : "",
    ]
      .filter(Boolean)
      .join(" ");
    return o.jsx("div", {
      ref: i,
      className: `splash-overlay ${r === "move" ? "splash-exiting" : ""}`,
      children: o.jsxs("div", {
        className: `splash-center-group ${r === "move" ? "splash-group-exit" : ""}`,
        children: [
          o.jsx("div", { className: u, children: "Leet" }),
          o.jsx("div", {
            className: `splash-subtitle ${r === "rainbow" ? "splash-subtitle-visible" : ""} ${r === "move" ? "splash-subtitle-exit" : ""}`,
            children: "MESSENGER",
          }),
        ],
      }),
    });
  };
var Vr;
(function (t) {
  ((t.Dark = "DARK"), (t.Light = "LIGHT"), (t.Default = "DEFAULT"));
})(Vr || (Vr = {}));
var Xo;
(function (t) {
  ((t.None = "NONE"), (t.Slide = "SLIDE"), (t.Fade = "FADE"));
})(Xo || (Xo = {}));
const Go = Ke("StatusBar"),
  Gp = h.lazy(() =>
    Ce(
      () => import("./ContactsPage-B52_Qam5.js"),
      __vite__mapDeps([4, 1, 2]),
      import.meta.url,
    ),
  ),
  Qp = h.lazy(() =>
    Ce(
      () => import("./SettingsPage-Vf4Acxr2.js"),
      __vite__mapDeps([5, 1, 2]),
      import.meta.url,
    ),
  ),
  Zp = h.lazy(() =>
    Ce(
      () => import("./EditProfilePage-C8uCNFvt.js"),
      __vite__mapDeps([6, 1, 2]),
      import.meta.url,
    ),
  ),
  eg = h.lazy(() =>
    Ce(
      () => import("./UserProfilePage-GN1AUgZ5.js"),
      __vite__mapDeps([7, 1, 2]),
      import.meta.url,
    ),
  ),
  tg = h.lazy(() =>
    Ce(
      () => import("./GlobalSearchPage-KcTSwoSA.js"),
      __vite__mapDeps([8, 1, 2]),
      import.meta.url,
    ),
  ),
  ng = h.lazy(() =>
    Ce(
      () => import("./PrivacyPage-DlTddfQB.js"),
      __vite__mapDeps([9, 1, 2]),
      import.meta.url,
    ),
  ),
  rg = h.lazy(() =>
    Ce(
      () => import("./PrivacySettingPage-BYZ47Yc7.js"),
      __vite__mapDeps([10, 1, 2]),
      import.meta.url,
    ),
  ),
  sg = h.lazy(() =>
    Ce(
      () => import("./UserPickerPage-C3mo7wKl.js"),
      __vite__mapDeps([11, 1, 2]),
      import.meta.url,
    ),
  ),
  og = h.lazy(() =>
    Ce(
      () => import("./DataStoragePage-Bh42jygM.js"),
      __vite__mapDeps([12, 1, 2]),
      import.meta.url,
    ),
  ),
  ig = h.lazy(() =>
    Ce(
      () => import("./DevicesPage-CeI1c2-B.js"),
      __vite__mapDeps([13, 1, 2]),
      import.meta.url,
    ),
  ),
  ag = h.lazy(() =>
    Ce(
      () => import("./ArchivePage-DgmIkG-_.js"),
      __vite__mapDeps([14, 1, 2]),
      import.meta.url,
    ),
  ),
  cg = h.lazy(() =>
    Ce(
      () => import("./AddContactPage-B_gsKTlb.js"),
      __vite__mapDeps([15, 1, 2]),
      import.meta.url,
    ),
  ),
  lg = h.lazy(() =>
    Ce(
      () => import("./AdminPage-BxGDE_9r.js"),
      __vite__mapDeps([16, 1, 2]),
      import.meta.url,
    ),
  ),
  dg = h.lazy(() =>
    Ce(
      () => import("./SupportPage-B7iRm9dY.js"),
      __vite__mapDeps([17, 1, 2]),
      import.meta.url,
    ),
  ),
  ug = h.lazy(() =>
    Ce(
      () => import("./SupportAgentPage-CAd9qBNK.js"),
      __vite__mapDeps([18, 1, 2]),
      import.meta.url,
    ),
  ),
  hg = () =>
    o.jsx(y, {
      sx: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      children: o.jsx(Ct, { size: 28, sx: { color: "#8774E1" } }),
    });
Ke("PermissionsManager");
function fg() {
  const {
      isAuthenticated: t,
      checkAuth: e,
      token: n,
      banned: r,
      banReason: s,
    } = Ue(),
    {
      initSocketHandlers: i,
      loadChats: a,
      syncAll: c,
      chats: d,
      isLoading: l,
    } = Ve(),
    { loadContacts: u } = dt(),
    { loadBanners: m } = Nn(),
    [b, w] = h.useState(!0),
    [p, x] = h.useState(!1),
    [g, k] = h.useState(!1),
    E = h.useRef(!1),
    T = _t(),
    M = di(),
    [H, Z] = h.useState(!1),
    D = h.useRef(null);
  h.useEffect(
    () => (
      b
        ? (D.current = setTimeout(() => Z(!0), 1e4))
        : (D.current && (clearTimeout(D.current), (D.current = null)), Z(!1)),
      () => {
        D.current && clearTimeout(D.current);
      }
    ),
    [b],
  );
  const [_, P] = h.useState(""),
    J = h.useRef(M.pathname);
  h.useEffect(() => {
    (e().finally(() => w(!1)),
      Go.setBackgroundColor({ color: "#0E1621" }).catch(() => {}),
      Go.setStyle({ style: Vr.Dark }).catch(() => {}));
    const K = Ch();
    return () => {
      K == null || K();
    };
  }, [e]);
  const { loadPrivacyFromServer: ae, bgEffect: te, glowMode: re } = rn();
  if (
    (h.useEffect(() => {
      t &&
        n &&
        (E.current || ((E.current = !0), x(!0)),
        i(),
        a(),
        u(),
        ae(),
        m(),
        xh().then(() => ph()));
    }, [t, n]),
    h.useEffect(() => {
      if (!t || !n) return;
      const K = setInterval(() => {
        a();
      }, 15e3);
      setTimeout(() => {
        const Q = Ve.getState().chats,
          ce = new Set();
        (Q.forEach((le) => {
          var se;
          return (se = le.participants) == null
            ? void 0
            : se.forEach((ue) => {
                ue.id && ce.add(ue.id);
              });
        }),
          Eh(Array.from(ce)));
      }, 1500);
      const W = setInterval(() => {
        jh();
      }, 2e4);
      return () => {
        (clearInterval(K), clearInterval(W));
      };
    }, [t, n]),
    h.useEffect(() => {
      if (!t || !n) return;
      const K = fr.addListener("appStateChange", ({ isActive: Q }) => {
          Q && c();
        }),
        L = () => {
          document.visibilityState === "visible" && c();
        };
      document.addEventListener("visibilitychange", L);
      const W = () => c();
      return (
        window.addEventListener("online", W),
        () => {
          (K.then((Q) => Q.remove()),
            document.removeEventListener("visibilitychange", L),
            window.removeEventListener("online", W));
        }
      );
    }, [t, n, c]),
    h.useEffect(() => {
      const K = fr.addListener("backButton", () => {
        M.pathname === "/chats" || M.pathname === "/auth"
          ? fr.minimizeApp()
          : T(-1);
      });
      return () => {
        K.then((L) => L.remove());
      };
    }, [M.pathname, T]),
    h.useEffect(() => {
      const K = J.current,
        L = M.pathname;
      J.current = L;
      const W = (Q) => Q in qr;
      if (W(K) && W(L) && K !== L) {
        const Q = xp();
        P(
          Q === "left"
            ? "tab-slide-left"
            : Q === "right"
              ? "tab-slide-right"
              : "",
        );
        const ce = setTimeout(() => P(""), 250);
        return () => clearTimeout(ce);
      } else P("");
    }, [M.pathname]),
    b)
  )
    return o.jsxs(y, {
      sx: {
        height: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        position: "relative",
      },
      children: [
        o.jsx(Ct, { sx: { color: "#8774E1" }, size: 36 }),
        o.jsxs(y, {
          sx: {
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            mt: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            px: 4,
            opacity: H ? 1 : 0,
            transform: H ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          },
          children: [
            o.jsx(A, {
              sx: {
                fontWeight: 700,
                fontSize: "0.95rem",
                color: "text.primary",
                mb: 1,
              },
              children: "Долгая загрузка",
            }),
            o.jsx(A, {
              sx: {
                fontSize: "0.82rem",
                color: "text.secondary",
                lineHeight: 1.7,
                mt: 0.5,
              },
              children: "Возможные причины проблемы:",
            }),
            o.jsx(A, {
              sx: {
                fontSize: "0.82rem",
                color: "text.secondary",
                lineHeight: 1.7,
              },
              children: "— В текущий момент у вас очень медленный интернет",
            }),
            o.jsx(A, {
              sx: {
                fontSize: "0.82rem",
                color: "text.secondary",
                lineHeight: 1.7,
              },
              children:
                "— РКН/ваш интернет-провайдер ограничил работу мобильной связи в этом районе",
            }),
          ],
        }),
      ],
    });
  if (r)
    return o.jsxs(y, {
      sx: {
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0E1621",
        px: 3,
        textAlign: "center",
      },
      children: [
        o.jsx(y, {
          sx: {
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #e53935 0%, #b71c1c 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
            boxShadow: "0 8px 32px rgba(229,57,53,0.35)",
          },
          children: o.jsx(A, { sx: { fontSize: 36 }, children: "🚫" }),
        }),
        o.jsx(A, {
          sx: { fontSize: 22, fontWeight: 700, color: "#fff", mb: 1 },
          children: "Аккаунт заблокирован",
        }),
        o.jsx(A, {
          sx: {
            fontSize: 14,
            color: "rgba(255,255,255,0.5)",
            mb: 2,
            lineHeight: 1.5,
          },
          children: "Ваш аккаунт был заблокирован администратором.",
        }),
        s &&
          o.jsxs(y, {
            sx: {
              p: 2,
              borderRadius: 2,
              backgroundColor: "rgba(229,57,53,0.1)",
              border: "1px solid rgba(229,57,53,0.25)",
              mb: 3,
              maxWidth: 320,
            },
            children: [
              o.jsx(A, {
                sx: {
                  fontSize: 12,
                  color: "rgba(255,255,255,0.4)",
                  mb: 0.5,
                  fontWeight: 600,
                },
                children: "Причина:",
              }),
              o.jsx(A, {
                sx: { fontSize: 14, color: "#fff", lineHeight: 1.4 },
                children: s,
              }),
            ],
          }),
        o.jsx(A, {
          sx: { fontSize: 12, color: "rgba(255,255,255,0.3)" },
          children: "Свяжитесь с администратором для разблокировки.",
        }),
      ],
    });
  const B = (K) => (t ? K : o.jsx(ur, { to: "/auth", replace: !0 }));
  return o.jsxs(y, {
    className: re ? "glow-mode" : "",
    sx: {
      height: "100dvh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "background.default",
      overflow: "hidden",
      paddingTop: "env(safe-area-inset-top)",
      paddingBottom: "env(safe-area-inset-bottom)",
      paddingLeft: "env(safe-area-inset-left)",
      paddingRight: "env(safe-area-inset-right)",
    },
    children: [
      te === "snow" && o.jsx(Jp, {}),
      p &&
        o.jsx(Xp, {
          onComplete: () => x(!1),
          onReveal: () => k(!0),
          dataReady: !l && d.length > 0,
        }),
      o.jsx(gp, {}),
      o.jsx(y, {
        className: _,
        sx: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          opacity: p && !g ? 0 : 1,
          transition: "opacity 0.5s ease",
        },
        children: o.jsx(h.Suspense, {
          fallback: o.jsx(hg, {}),
          children: o.jsxs(Jc, {
            children: [
              o.jsx(we, {
                path: "/auth",
                element: t
                  ? o.jsx(ur, { to: "/chats", replace: !0 })
                  : o.jsx(Th, {}),
              }),
              o.jsx(we, { path: "/chats", element: B(o.jsx(sf, {})) }),
              o.jsx(we, { path: "/chat/:chatId", element: B(o.jsx(pp, {})) }),
              o.jsx(we, { path: "/contacts", element: B(o.jsx(Gp, {})) }),
              o.jsx(we, { path: "/settings", element: B(o.jsx(Qp, {})) }),
              o.jsx(we, { path: "/edit-profile", element: B(o.jsx(Zp, {})) }),
              o.jsx(we, { path: "/user/:userId", element: B(o.jsx(eg, {})) }),
              o.jsx(we, { path: "/search", element: B(o.jsx(tg, {})) }),
              o.jsx(we, { path: "/privacy", element: B(o.jsx(ng, {})) }),
              o.jsx(we, {
                path: "/privacy/:settingKey",
                element: B(o.jsx(rg, {})),
              }),
              o.jsx(we, {
                path: "/privacy/:settingKey/:exceptionType",
                element: B(o.jsx(sg, {})),
              }),
              o.jsx(we, { path: "/data-storage", element: B(o.jsx(og, {})) }),
              o.jsx(we, { path: "/devices", element: B(o.jsx(ig, {})) }),
              o.jsx(we, { path: "/archive", element: B(o.jsx(ag, {})) }),
              o.jsx(we, { path: "/add-contact", element: B(o.jsx(cg, {})) }),
              o.jsx(we, { path: "/admin", element: B(o.jsx(lg, {})) }),
              o.jsx(we, { path: "/support", element: B(o.jsx(dg, {})) }),
              o.jsx(we, { path: "/support-agent", element: B(o.jsx(ug, {})) }),
              o.jsx(we, {
                path: "*",
                element: o.jsx(ur, { to: "/chats", replace: !0 }),
              }),
            ],
          }),
        }),
      }),
      t && o.jsx(wp, {}),
      t && o.jsx(Kp, {}),
      o.jsx(vp, {}),
    ],
  });
}
const pg = ({ children: t }) => {
    const { theme: e, customColors: n } = rn(),
      r = _h(e, n);
    return (
      je.useEffect(() => {
        ((document.body.style.backgroundColor = r.palette.background.default),
          (document.body.style.color = r.palette.text.primary));
        const s = document.getElementById("root");
        s &&
          ((s.style.backgroundColor = r.palette.background.default),
          (s.style.color = r.palette.text.primary));
      }, [r]),
      o.jsxs(Qo, { theme: r, children: [o.jsx(Hc, {}), t] })
    );
  },
  En = window.visualViewport;
if (En) {
  const t = () => {
    document.documentElement.style.setProperty(
      "--app-height",
      En.height + "px",
    );
  };
  (En.addEventListener("resize", t), En.addEventListener("scroll", t), t());
}
Tr.createRoot(document.getElementById("root")).render(
  o.jsx(je.StrictMode, {
    children: o.jsx(Xc, { children: o.jsx(pg, { children: o.jsx(fg, {}) }) }),
  }),
);
export {
  ps as B,
  St as C,
  aa as M,
  hi as W,
  dt as a,
  Ve as b,
  rn as c,
  No as d,
  $h as e,
  Fn as f,
  ra as g,
  wn as h,
  Fg as i,
  cs as j,
  nf as k,
  ms as l,
  Ng as m,
  tf as n,
  Bh as o,
  Wr as p,
  me as q,
  fh as r,
  zg as s,
  ds as t,
  Ue as u,
  ve as v,
};