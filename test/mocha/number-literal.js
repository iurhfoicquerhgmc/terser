var assert = require("assert");
var UglifyJS = require("../node");

describe("Number literals", function () {
    it("Should not allow legacy octal literals in strict mode", function() {
        var inputs = [
            '"use strict";00;',
            '"use strict"; var foo = 00;'
        ];

        var test = function(input) {
            return function() {
                UglifyJS.parse(input);
            }
        }
        var error = function(e) {
            return e instanceof UglifyJS._JS_Parse_Error
                && e.message === "Legacy octal literals are not allowed in strict mode";
        };
        for (var i = 0; i < inputs.length; i++) {
            assert.throws(test(inputs[i]), error, inputs[i]);
        }
    });
});
