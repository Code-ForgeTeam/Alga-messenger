/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Reconstructed from obfuscated bundle (part 1):
 * - Vite deps mapping and preload helpers
 * - modulepreload polyfill
 * - Capacitor platform/core bootstrap
 * - WebPlugin base
 * - CapacitorCookies web implementation
 * - CapacitorHttp web implementation
 * - App plugin lazy web registration
 */

export const __vite__mapDeps = (
  indices: number[],
  mapFn: any = __vite__mapDeps,
  deps:
    | string[]
    | undefined = mapFn.f ||
    (mapFn.f = [
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
    ])
) => indices.map((i) => deps![i]);

(() => {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;

  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link as HTMLLinkElement);
  }

  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) {
        const link = node as HTMLLinkElement;
        if (link.tagName === "LINK" && link.rel === "modulepreload") {
          processPreload(link);
        }
      }
    }
  }).observe(document, { childList: true, subtree: true });

  function getFetchOptions(link: HTMLLinkElement): RequestInit {
    const options: RequestInit = {};
    if (link.integrity) options.integrity = link.integrity;
    if (link.referrerPolicy) options.referrerPolicy = link.referrerPolicy;

    if (link.crossOrigin === "use-credentials") {
      options.credentials = "include";
    } else if (link.crossOrigin === "anonymous") {
      options.credentials = "omit";
    } else {
      options.credentials = "same-origin";
    }

    return options;
  }

  function processPreload(link: HTMLLinkElement & { ep?: boolean }) {
    if (link.ep) return;
    link.ep = true;
    fetch(link.href, getFetchOptions(link));
  }
})();

const VITE_MODULEPRELOAD = "modulepreload";
const toAbsoluteUrl = (path: string, base: string) => new URL(path, base).href;
const preloadedUrls: Record<string, boolean> = {};

export const vitePreload = (
  loader: () => Promise<any>,
  deps?: string[],
  importMetaUrl?: string
) => {
  let promise: Promise<any> = Promise.resolve();

  if (deps && deps.length > 0) {
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
    const nonce =
      cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce") || undefined;

    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = toAbsoluteUrl(dep, importMetaUrl!);
        if (dep in preloadedUrls) return;
        preloadedUrls[dep] = true;

        const isCss = dep.endsWith(".css");
        const cssRelSelector = isCss ? '[rel="stylesheet"]' : "";

        if (importMetaUrl) {
          for (let i = links.length - 1; i >= 0; i--) {
            const existing = links[i] as HTMLLinkElement;
            if (existing.href === dep && (!isCss || existing.rel === "stylesheet")) {
              return;
            }
          }
        } else if (document.querySelector(`link[href="${dep}"]${cssRelSelector}`)) {
          return;
        }

        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : VITE_MODULEPRELOAD;
        if (!isCss) link.as = "script";
        link.crossOrigin = "";
        link.href = dep;
        if (nonce) link.setAttribute("nonce", nonce);
        document.head.appendChild(link);

        if (isCss) {
          return new Promise<void>((resolve, reject) => {
            link.addEventListener("load", () => resolve());
            link.addEventListener("error", () =>
              reject(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }

  function handleError(error: any) {
    const event = new Event("vite:preloadError", { cancelable: true }) as any;
    event.payload = error;
    window.dispatchEvent(event);
    if (!event.defaultPrevented) throw error;
  }

  return promise.then((results) => {
    for (const result of results || []) {
      if (result.status === "rejected") handleError(result.reason);
    }
    return loader().catch(handleError);
  });
};

type CapacitorPlatform = { name: string; [k: string]: any };

const createCapacitorPlatforms = (win: any) => {
  const platforms = new Map<string, CapacitorPlatform>();
  platforms.set("web", { name: "web" });

  const registry =
    win.CapacitorPlatforms || {
      currentPlatform: { name: "web" },
      platforms,
    };

  registry.addPlatform = (name: string, platform: CapacitorPlatform) => {
    registry.platforms.set(name, platform);
  };

  registry.setPlatform = (name: string) => {
    if (registry.platforms.has(name)) {
      registry.currentPlatform = registry.platforms.get(name);
    }
  };

  return registry;
};

const initCapacitorPlatforms = (win: any) =>
  (win.CapacitorPlatforms = createCapacitorPlatforms(win));

initCapacitorPlatforms(
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof self !== "undefined"
      ? self
      : typeof window !== "undefined"
        ? window
        : typeof global !== "undefined"
          ? global
          : {}
);

export enum CapacitorExceptionCode {
  Unimplemented = "UNIMPLEMENTED",
  Unavailable = "UNAVAILABLE",
}

export class CapacitorException extends Error {
  code?: string;
  data?: any;

  constructor(message: string, code?: string, data?: any) {
    super(message);
    this.message = message;
    this.code = code;
    this.data = data;
  }
}

const detectPlatform = (win: any): "android" | "ios" | "web" => {
  if (win?.androidBridge) return "android";
  if (win?.webkit?.messageHandlers?.bridge) return "ios";
  return "web";
};

const createCapacitor = (win: any) => {
  const customPlatform = win.CapacitorCustomPlatform || null;
  const cap = win.Capacitor || {};
  const plugins = (cap.Plugins = cap.Plugins || {});
  const platformRegistry = win.CapacitorPlatforms;

  const fallbackGetPlatform = () =>
    customPlatform !== null ? customPlatform.name : detectPlatform(win);

  const getPlatform =
    platformRegistry?.currentPlatform?.getPlatform || fallbackGetPlatform;

  const isNativePlatform =
    platformRegistry?.currentPlatform?.isNativePlatform ||
    (() => getPlatform() !== "web");

  const loadedPlugins = new Map<string, any>();

  const getPluginHeader =
    platformRegistry?.currentPlatform?.getPluginHeader ||
    ((name: string) => cap.PluginHeaders?.find((h: any) => h.name === name));

  const isPluginAvailable =
    platformRegistry?.currentPlatform?.isPluginAvailable ||
    ((name: string) => {
      const plugin = loadedPlugins.get(name);
      return !!(plugin?.platforms.has(getPlatform()) || getPluginHeader(name));
    });

  const registerPluginFallback = (
    pluginName: string,
    implementations: Record<string, any> = {}
  ) => {
    const existing = loadedPlugins.get(pluginName);
    if (existing) return existing.proxy;

    const currentPlatform = getPlatform();
    const header = getPluginHeader(pluginName);
    let implementation: any;

    const loadImplementation = async () => {
      if (!implementation && currentPlatform in implementations) {
        implementation =
          typeof implementations[currentPlatform] === "function"
            ? await implementations[currentPlatform]()
            : implementations[currentPlatform];
      } else if (customPlatform !== null && !implementation && "web" in implementations) {
        implementation =
          typeof implementations.web === "function"
            ? await implementations.web()
            : implementations.web;
      }
      return implementation;
    };

    const createMethod = (methodName: string) => {
      let remove: any;

      const wrapped = async (...args: any[]) => {
        const impl = await loadImplementation();
        const method = impl?.[methodName]?.bind(impl);

        if (header) {
          const m = header?.methods.find((it: any) => methodName === it.name);
          if (m) {
            const nativeMethod =
              m.rtype === "promise"
                ? (opts: any) => cap.nativePromise(pluginName, methodName.toString(), opts)
                : (opts: any, cb: any) =>
                    cap.nativeCallback(pluginName, methodName.toString(), opts, cb);
            const result = nativeMethod(...args);
            remove = result?.remove;
            return result;
          }
        }

        if (!method) {
          throw new CapacitorException(
            `"${pluginName}.${methodName}()" is not implemented on ${currentPlatform}`,
            CapacitorExceptionCode.Unimplemented
          );
        }

        const result = method(...args);
        remove = result?.remove;
        return result;
      };

      if (methodName === "addListener") {
        (wrapped as any).remove = async () => remove?.();
      }

      return wrapped;
    };

    const addListenerNative = createMethod("addListener");
    const removeListenerNative = createMethod("removeListener");

    const proxy = new Proxy(
      {},
      {
        get(_target, prop: any) {
          switch (prop) {
            case "$$typeof":
              return;
            case "toJSON":
              return () => ({});
            case "addListener":
              return addListenerNative;
            case "removeListener":
              return removeListenerNative;
            default:
              return createMethod(prop.toString());
          }
        },
      }
    );

    plugins[pluginName] = proxy;
    loadedPlugins.set(pluginName, {
      name: pluginName,
      proxy,
      platforms: new Set([...Object.keys(implementations), ...(header ? [currentPlatform] : [])]),
    });

    return proxy;
  };

  cap.convertFileSrc ||= (filePath: string) => filePath;
  cap.getPlatform = getPlatform;
  cap.handleError = (err: any) => win.console.error(err);
  cap.isNativePlatform = isNativePlatform;
  cap.isPluginAvailable = isPluginAvailable;
  cap.pluginMethodNoop = (_target: string, method: string, pluginName: string) =>
    Promise.reject(`${pluginName} does not have an implementation of "${method}".`);
  cap.registerPlugin =
    platformRegistry?.currentPlatform?.registerPlugin || registerPluginFallback;
  cap.Exception = CapacitorException;
  cap.DEBUG = !!cap.DEBUG;
  cap.isLoggingEnabled = !!cap.isLoggingEnabled;
  cap.platform = cap.getPlatform();
  cap.isNative = cap.isNativePlatform();

  return cap;
};

const initCapacitor = (win: any) => (win.Capacitor = createCapacitor(win));

export const Capacitor = initCapacitor(
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof self !== "undefined"
      ? self
      : typeof window !== "undefined"
        ? window
        : typeof global !== "undefined"
          ? global
          : {}
);

export const registerPlugin = Capacitor.registerPlugin;

export class WebPlugin {
  listeners: Record<string, Function[]> = {};
  retainedEventArguments: Record<string, any[]> = {};
  windowListeners: Record<
    string,
    {
      registered: boolean;
      windowEventName: string;
      pluginEventName: string;
      handler: (event: any) => void;
    }
  > = {};

  addListener(eventName: string, listenerFunc: any) {
    let firstListener = false;
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
      firstListener = true;
    }
    this.listeners[eventName].push(listenerFunc);

    const windowListener = this.windowListeners[eventName];
    if (windowListener && !windowListener.registered) this.addWindowListener(windowListener);
    if (firstListener) this.sendRetainedArgumentsForEvent(eventName);

    const remove = async () => this.removeListener(eventName, listenerFunc);
    return Promise.resolve({ remove });
  }

  async removeAllListeners() {
    this.listeners = {};
    for (const eventName in this.windowListeners) {
      this.removeWindowListener(this.windowListeners[eventName]);
    }
    this.windowListeners = {};
  }

  notifyListeners(eventName: string, data: any, retainUntilConsumed?: boolean) {
    const listeners = this.listeners[eventName];
    if (!listeners) {
      if (retainUntilConsumed) {
        const retained = this.retainedEventArguments[eventName] || [];
        retained.push(data);
        this.retainedEventArguments[eventName] = retained;
      }
      return;
    }
    listeners.forEach((listener) => listener(data));
  }

  registerWindowListener(windowEventName: string, pluginEventName: string) {
    this.windowListeners[pluginEventName] = {
      registered: false,
      windowEventName,
      pluginEventName,
      handler: (event) => this.notifyListeners(pluginEventName, event),
    };
  }

  unimplemented(message = "not implemented") {
    return new Capacitor.Exception(message, CapacitorExceptionCode.Unimplemented);
  }

  unavailable(message = "not available") {
    return new Capacitor.Exception(message, CapacitorExceptionCode.Unavailable);
  }

  async removeListener(eventName: string, listenerFunc: any) {
    const listeners = this.listeners[eventName];
    if (!listeners) return;
    const index = listeners.indexOf(listenerFunc);
    this.listeners[eventName].splice(index, 1);
    if (!this.listeners[eventName].length) {
      this.removeWindowListener(this.windowListeners[eventName]);
    }
  }

  protected addWindowListener(listener: any) {
    window.addEventListener(listener.windowEventName, listener.handler);
    listener.registered = true;
  }

  protected removeWindowListener(listener: any) {
    if (!listener) return;
    window.removeEventListener(listener.windowEventName, listener.handler);
    listener.registered = false;
  }

  private sendRetainedArgumentsForEvent(eventName: string) {
    const retained = this.retainedEventArguments[eventName];
    if (!retained) return;
    delete this.retainedEventArguments[eventName];
    retained.forEach((payload) => this.notifyListeners(eventName, payload));
  }
}

const encodeCookie = (str: string) =>
  encodeURIComponent(str)
    .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
    .replace(/[()]/g, escape);

const decodeCookie = (str: string) => str.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);

class CapacitorCookiesWeb extends WebPlugin {
  async getCookies() {
    const cookieString = document.cookie;
    const parsed: Record<string, string> = {};

    cookieString.split(";").forEach((entry) => {
      if (entry.length <= 0) return;
      let [key, value] = entry.replace(/=/, "CAP_COOKIE").split("CAP_COOKIE");
      key = decodeCookie(key).trim();
      value = decodeCookie(value).trim();
      parsed[key] = value;
    });

    return parsed;
  }

  async setCookie(options: any) {
    try {
      const key = encodeCookie(options.key);
      const value = encodeCookie(options.value);
      const expires = `; expires=${(options.expires || "").replace("expires=", "")}`;
      const path = (options.path || "/").replace("path=", "");
      const domain = options.url && options.url.length > 0 ? `domain=${options.url}` : "";
      document.cookie = `${key}=${value || ""}${expires}; path=${path}; ${domain};`;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteCookie(options: any) {
    try {
      document.cookie = `${options.key}=; Max-Age=0`;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async clearCookies() {
    try {
      const cookies = document.cookie.split(";") || [];
      for (const cookie of cookies) {
        document.cookie = cookie
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async clearAllCookies() {
    return this.clearCookies();
  }
}

registerPlugin("CapacitorCookies", { web: () => new CapacitorCookiesWeb() });

const readBlobAsBase64 = async (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.indexOf(",") >= 0 ? result.split(",")[1] : result);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(blob);
  });

const normalizeHeaders = (headers: Record<string, any> = {}) => {
  const keys = Object.keys(headers);
  return Object.keys(headers)
    .map((h) => h.toLowerCase())
    .reduce((acc: Record<string, any>, key, index) => {
      acc[key] = headers[keys[index]];
      return acc;
    }, {});
};

const encodeQueryParams = (params: Record<string, any> | undefined, shouldEncode = true) => {
  if (!params) return null;

  return Object.entries(params)
    .reduce((acc, [key, value]) => {
      let segment: string;
      if (Array.isArray(value)) {
        segment = "";
        value.forEach((item) => {
          const v = shouldEncode ? encodeURIComponent(item) : item;
          segment += `${key}=${v}&`;
        });
      } else {
        const v = shouldEncode ? encodeURIComponent(value) : value;
        segment = `${key}=${v}`;
      }
      return `${acc}&${segment}`;
    }, "")
    .substr(1);
};

const buildFetchRequestInit = (options: any, extra: any = {}) => {
  const request: RequestInit = Object.assign(
    { method: options.method || "GET", headers: options.headers },
    extra
  );

  const contentType = normalizeHeaders(options.headers)["content-type"] || "";

  if (typeof options.data === "string") {
    request.body = options.data;
  } else if (contentType.includes("application/x-www-form-urlencoded")) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(options.data || {})) {
      params.set(key, value as string);
    }
    request.body = params.toString();
  } else if (contentType.includes("multipart/form-data") || options.data instanceof FormData) {
    const formData = new FormData();

    if (options.data instanceof FormData) {
      options.data.forEach((value: any, key: string) => {
        formData.append(key, value);
      });
    } else {
      for (const key of Object.keys(options.data)) {
        formData.append(key, options.data[key]);
      }
    }

    request.body = formData;
    const headers = new Headers(request.headers as HeadersInit);
    headers.delete("content-type");
    request.headers = headers;
  } else if (contentType.includes("application/json") || typeof options.data === "object") {
    request.body = JSON.stringify(options.data);
  }

  return request;
};

class CapacitorHttpWeb extends WebPlugin {
  async request(options: any) {
    const requestInit = buildFetchRequestInit(options, options.webFetchExtra);
    const query = encodeQueryParams(options.params, options.shouldEncodeUrlParams);
    const url = query ? `${options.url}?${query}` : options.url;

    const response = await fetch(url, requestInit);
    const contentType = response.headers.get("content-type") || "";

    let { responseType = "text" } = response.ok ? options : {};
    if (contentType.includes("application/json")) responseType = "json";

    let data: any;
    switch (responseType) {
      case "arraybuffer":
      case "blob": {
        const blob = await response.blob();
        data = await readBlobAsBase64(blob);
        break;
      }
      case "json":
        data = await response.json();
        break;
      case "document":
      case "text":
      default:
        data = await response.text();
    }

    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    return { data, headers, status: response.status, url: response.url };
  }

  async get(options: any) {
    return this.request({ ...options, method: "GET" });
  }

  async post(options: any) {
    return this.request({ ...options, method: "POST" });
  }

  async put(options: any) {
    return this.request({ ...options, method: "PUT" });
  }

  async patch(options: any) {
    return this.request({ ...options, method: "PATCH" });
  }

  async delete(options: any) {
    return this.request({ ...options, method: "DELETE" });
  }
}

registerPlugin("CapacitorHttp", { web: () => new CapacitorHttpWeb() });

export const App = registerPlugin("App", {
  web: () =>
    vitePreload(
      () => import("./web-DrW7wduZ.js"),
      __vite__mapDeps([0, 1, 2]),
      import.meta.url
    ).then((module) => new module.AppWeb()),
});
