'use strict';

/**
 * A class to implement JSONP protocol inside a web page
 * 
 * @returns {null | Promise} returns a Promise if no callbackName is provided, null elsewhere
 */
class DanJsonp {
    static invokeJsonp(uri, callbackName = null) {
        // create the script dom node, which will contain the address to be invoked
        let s = document.createElement("script");
        let separator = uri.indexOf('?') !== -1 ? "&" : "?";
        let finalAddress = uri;

        if(callbackName) {
            finalAddress += separator + "callback=" + callbackName;
            s.src = finalAddress;

            // append script node to document body
            document.body.appendChild(s);
        }
        else {
            // create the promise to return
            var willPromiseFinish = new Promise(
                (resolve, reject) => {
                    // assign static method danJsonpCallback to class DanJsonp
                    Object.assign(DanJsonp, {
                        danJsonpCallback(myObj) {
                            // resolve promise after callback invocation
                            if(myObj) {
                                resolve(myObj);
                            }
                            else {
                                reject("No value returned by server");
                            }
                        }
                    });
                }
            );

            finalAddress += separator + "callback=DanJsonp.danJsonpCallback";
            s.src = finalAddress;

            // append script node to document body
            document.body.appendChild(s);

            return willPromiseFinish;
        }
    }
}
