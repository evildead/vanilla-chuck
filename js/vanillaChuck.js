'use strict';

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
        // create the script dom node, which will contain the api address to be invoked
        let s = document.createElement("script");

        // build custom main character
        let nameOfMainCharacter = "";
        if(customName.length > 0) {
            nameOfMainCharacter += ("&firstName=" + customName);
        }
        if(customSurname.length > 0) {
            nameOfMainCharacter += ("&lastName=" + customSurname);
        }

        // Invoke API via JSONP
        s.src = IcndbAPI.baseApiAddress() + "/jokes/random/"+numJokes+"/?escape=javascript&callback=" + callbackName;
        if(nameOfMainCharacter.length > 0) {
            s.src += nameOfMainCharacter;
        }

        // append script node to document body
        document.body.appendChild(s);
    }

    /**
     * Invoke icndb api in jsonp mode by using promises
     * 
     * @param {String} customName 
     * @param {String} customSurname 
     */
    static getRandomJokePromise(customName, customSurname, numJokes = 10) {
        // create the script dom node, which will contain the api address to be invoked
        let s = document.createElement("script");

        // build custom main character
        let nameOfMainCharacter = "";
        if(customName.length > 0) {
            nameOfMainCharacter += ("&firstName=" + customName);
        }
        if(customSurname.length > 0) {
            nameOfMainCharacter += ("&lastName=" + customSurname);
        }

        // create the promise to return
        var willJokeFinish = new Promise(
            (resolve, reject) => {
                // assign static method icndbApiCallback to class IcndbAPI
                Object.assign(IcndbAPI, {
                    icndbApiCallback(myObj) {
                        // resolve promise after callback invocation
                        resolve(myObj);
                    }
                });
            }
        );

        // Invoke API via JSONP
        s.src = IcndbAPI.baseApiAddress() + "/jokes/random/"+numJokes+"/?escape=javascript&callback=IcndbAPI.icndbApiCallback";
        if(nameOfMainCharacter.length > 0) {
            s.src += nameOfMainCharacter;
        }

        // append script node to document body
        document.body.appendChild(s);

        return willJokeFinish;
    }
}
