// ==UserScript==
// @name         TTC Disable adblock detection
// @namespace    http://tampermonkey.net/
// @version      1.4
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
    new MutationObserver((changes, observer) => {
        for (const change of changes) {
            for (const node of change.addedNodes) {
                if (node.tagName === 'SCRIPT' && node.src.includes('View')) {
                    node.onload = () => {
                        if (!!ViewModelBase) {
                            ViewModelBase.prototype.GetAdModeAsync = function() {
                                console.log('GetAdModeAsync');
                                return "Full";
                            };
                            ViewModelBase.prototype.IsAdLoaded = function() {
                                console.log('IsAdLoaded');
                                return true
                            };
                        }
                    }
                    observer.disconnect();
                }
            }
        }
    }).observe(document.body, {
        childList: true,
        subtree: false,
    });
})();