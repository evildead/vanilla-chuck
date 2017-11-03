'use strict';

class IcndbAPI {
    static baseApiAddress() {
        return "http://api.icndb.com";
    }

    static getRandomJoke(callbackName, customName, customSurname) {
        let s = document.createElement("script");

        let nameOfMainCharacter = "";
        if(customName.length > 0) {
            nameOfMainCharacter += ("&firstName=" + customName);
        }
        if(customSurname.length > 0) {
            nameOfMainCharacter += ("&lastName=" + customSurname);
        }

        // Invoke API via JSONP
        s.src = IcndbAPI.baseApiAddress() + "/jokes/random/?escape=javascript&callback=" + callbackName;
        if(nameOfMainCharacter.length > 0) {
            s.src += nameOfMainCharacter;
        }

        document.body.appendChild(s);
    }
}
