// ==UserScript==
// @name         TTC Disable adblock detection
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Bypass checks for AdBlock on tamrieltradecentre.com
// @author       alezhu
// @match        *://*.tamrieltradecentre.com/pc/Trade/SearchResult*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tamrieltradecentre.com
// @grant        none
// @run-at      document-body
// ==/UserScript==

(function() {
    'use strict';
    window.adsbygoogle = { loaded: true };
    var orig_getElementsByClassName = document.getElementsByClassName;
    document.getElementsByClassName = function(classname) {
        if(classname=="adsbygoogle") {
            return [{
                style: {
                    display: "",
                },
                clientWidth: 1,
                clientHeight:1,
            }]
        } else {
            try{
                return orig_getElementsByClassName.call(document,classname);
            }catch(e) {
                console.error(e);
                return [];
            }
        }
    }
})();