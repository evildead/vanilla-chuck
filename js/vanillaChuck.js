'use strict';

/**
 * A class to invoke Chuck Norris random jokes API offered by https://api.icndb.com
 * This class uses DanJsonp library to perform the JSONP protocol
 */
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
