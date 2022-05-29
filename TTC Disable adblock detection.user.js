// ==UserScript==
// @name         TTC Disable adblock detection
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Bypass checks for AdBlock on tamrieltradecentre.com
// @author       alezhu
// @match        *://*.tamrieltradecentre.com/pc/Trade/SearchResult*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tamrieltradecentre.com
// @grant        none
// @run-at      document-body
// @source      https://github.com/alezhu/ttc-disable-ads-block-detection/raw/main/TTC%20Disable%20adblock%20detection.user.js
// @updateURL   https://github.com/alezhu/ttc-disable-ads-block-detection/raw/main/TTC%20Disable%20adblock%20detection.user.js
// @downloadURL https://github.com/alezhu/ttc-disable-ads-block-detection/raw/main/TTC%20Disable%20adblock%20detection.user.js
// ==/UserScript==

(function() {
    "use strict";
    delete window.disableAds;
    Object.defineProperty(window, 'disableAds', {
        get: function() {
            if (window.sessionId == null) {
                window.sessionId = 1;
            }
            return false;
        }
    });
    window.adsbygoogle = { loaded: true };

    var orig_getElementsByClassName = document.getElementsByClassName;
    document.getElementsByClassName = function(classname) {
        if (classname.includes("adsbygoogle")) {
            return [{
                style: {
                    display: "",
                },
                clientWidth: 3,
                clientHeight: 3,
            }, ];
        } else {
            try {
                return orig_getElementsByClassName.call(document, classname);
            } catch (e) {
                console.error(e);
                return [];
            }
        }
    };
    var orig_fetch = fetch;
    fetch = function() {
        if (arguments && arguments[0].includes("adsbygoogle.js")) {
            return Promise.resolve().then(() => {
                return { url: arguments[0] };
            });
        } else {
            return orig_fetch.apply(window, arguments);
        }
    };
})();