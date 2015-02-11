function PasswordVerification() {

    // configuration
    this.size = 8,
    this.forceUpperCase = true,
    this.forceLowerCase = true,
    this.forceNumber = true,
    this.forceSpecialChar = true,
    this.forceSize = true,
    
    // initial state
    this.result = false,
    this.resultPass = false,
    this.resultPassRetype = false,
    
    this.pass = null,
    this.passRetype = null,
    
    this.hasUpperCase = false,
    this.hasLowerCase = false,
    this.hasNumber = false,
    this.hasSpecialChar = false,
    this.hasSize = false,
    this.hasNotAllowedChar = false,
    
    this.passCheck = false;
    
    this.messages = [];
    
    this._resetResults = function() {
        this.result = false,
        this.resultPass = false,
        this.resultPassRetype = false;
    };
    
    this._resetHas = function() {
        this.hasUpperCase = false,
        this.hasLowerCase = false,
        this.hasNumber = false,
        this.hasSpecialChar = false,
        this.hasSize = false;
    };
}

PasswordVerification.prototype.test = function() {
    console.log('testing...');
};

PasswordVerification.prototype.check = function(pass, passRetype) {
    
    this.pass = pass;
    this.passRetype = passRetype;

    this._resetResults();
    this._resetHas();

    if(this.pass !== null) {
        for (var i = 0 ; i < this.pass.length; i++) {
            console.log(this.pass[i]);
            var c = this.pass.charAt(i);
            var founded = false;
    //            var passRetypeCheck = false;

            if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(c) >= 0)
            {
                this.hasUpperCase = true;
                founded = true;
            }
            if ('abcdefghijklmnopqrstuvwxyz'.indexOf(c) >= 0)
            {
                this.hasLowerCase = true;
                founded = true;
            }

            if ('0123456789'.indexOf(c) >= 0)
            {
                this.hasNumber = true;
                founded = true;
            }
            if ('!@#$%&*_,.'.indexOf(c) >= 0)
            {
                this.hasSpecialChar = true;
                founded = true;
            }

            if(!founded) {
                this.hasNotAllowedChar = true;
            }

            if(this.pass.length >= this.size) {
                this.hasSize = true;
            }

            if(this.pass === this.passRetype) {
                this.resultPassRetype = true;
            }

        }
    }

    this.resultPass = false;
    if(!this.hasNotAllowedChar
            && (!this.forceUpperCase || this.hasUpperCase)
            && (!this.forceLowerCase || this.hasLowerCase)
            && (!this.forceNumber || this.hasNumber)
            && (!this.forceSpecialChar || this.hasSpecialChar)
            && (!this.forceSize || this.hasSize)
            ) {
        this.resultPass = true;
    }

    this.messages = [];
    if(this.forceUpperCase && !this.hasUpperCase) {
        this.messages.push('Requires uppercase');
    }
    if(this.forceLowerCase && !this.hasLowerCase) {
        this.messages.push('Requires lowercase');
    }
    if(this.forceNumber && !this.hasNumber) {
        this.messages.push('Requires number');
    }
    if(this.forceSpecialChar && !this.hasSpecialChar) {
        this.messages.push('Requires special character');
    }
    if(this.forceSize && !this.hasSize) {
        this.messages.push('Requires minimum ' + this.size + ' characters');
    }
    if(this.hasNotAllowedChar) {
        this.messages.push('Contains not allowed characters');
    }
    if(!this.resultPassRetype) {
        this.messages.push('Password and retype password don\'t match');
    }

    this.result = false;
    if(this.resultPass && this.resultPassRetype) {
        this.result = true;
        this.messages.push('Password is OK!');
    }

    var response = {
        "result" : this.result,
        "resultPass" : this.resultPass,
        "resultPassRetype" : this.resultPassRetype,
        "check" : {
            "hasUpperCase" : this.hasUpperCase,
            "hasLowerCase" : this.hasLowerCase,
            "hasNumber" : this.hasNumber,
            "hasSpecialChar" : this.hasSpecialChar,
            "hasSize" : this.hasSize,
            "hasNotAllowedChar" : this.hasNotAllowedChar,
            "passCheck" : this.resultPassRetype // remove
        },
        "messages" : this.messages
    };

    return response;
};