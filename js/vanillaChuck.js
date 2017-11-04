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

class IcndbAPI {
    static baseApiAddress() {
        return "https://api.icndb.com";
    }

    /**
     * Invoke icndb api in jsonp mode by using an extern callback
     * 
     * @param {String} callbackName 
     * @param {String} customName 
     * @param {String} customSurname 
     */
    static getRandomJoke(callbackName, customName, customSurname, numJokes = 10) {
        let myUri = "";
        
        // build custom main character
        let nameOfMainCharacter = "";
        if(customName.length > 0) {
            nameOfMainCharacter += ("&firstName=" + customName);
        }
        if(customSurname.length > 0) {
            nameOfMainCharacter += ("&lastName=" + customSurname);
        }

        // Build uri
        myUri = IcndbAPI.baseApiAddress() + "/jokes/random/"+numJokes+"/?escape=javascript";
        if(nameOfMainCharacter.length > 0) {
            myUri += nameOfMainCharacter;
        }

        // Invoke API via JSONP
        DanJsonp.invokeJsonp(myUri, callbackName);
    }

    /**
     * Invoke icndb api in jsonp mode by using promises
     * 
     * @param {String} customName 
     * @param {String} customSurname
     * @returns {Promise}
     */
    static getRandomJokePromise(customName, customSurname, numJokes = 10) {
        let myUri = "";

        // build custom main character
        let nameOfMainCharacter = "";
        if(customName.length > 0) {
            nameOfMainCharacter += ("&firstName=" + customName);
        }
        if(customSurname.length > 0) {
            nameOfMainCharacter += ("&lastName=" + customSurname);
        }

        // Build uri
        myUri = IcndbAPI.baseApiAddress() + "/jokes/random/"+numJokes+"/?escape=javascript";
        if(nameOfMainCharacter.length > 0) {
            myUri += nameOfMainCharacter;
        }

        // Invoke API via JSONP and return its Promise
        return DanJsonp.invokeJsonp(myUri);
    }
}
