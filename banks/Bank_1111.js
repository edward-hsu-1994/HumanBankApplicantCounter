var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Bank_1111 = (function () {
    function Bank_1111() {
    }
    Bank_1111.prototype.getApplicantCount = function (url, min, max) {
        return __awaiter(this, void 0, void 0, function () {
            function CreatePie(a, b, c) {
                var list = JSON.parse("[" + c.replace(/\'/g, '"') + "]");
                var temp_min = 100;
                var notSet = false;
                for (var j = 0; j < list.length; j++) {
                    console.log(list[j][1] + "   " + minP);
                    if (list[j][1] / 100 < minP)
                        continue;
                    temp_min = Math.min(temp_min, list[j][1]);
                    notSet = true;
                }
                if (!notSet)
                    temp_min = 1;
                finalMin = Math.min(finalMin, temp_min);
            }
            function $() { } //Fix not found JQuery
            var minP, httpClient, webSource, _a, _b, scripts, targetScript, i, finalMin, scriptString;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        minP = 1 / max;
                        httpClient = new HttpClient();
                        _b = (_a = App).parseHTML;
                        return [4 /*yield*/, httpClient.getAsync(url)];
                    case 1:
                        webSource = _b.apply(_a, [(_c.sent()).result]);
                        scripts = webSource.getElementsByTagName("script");
                        targetScript = null;
                        for (i = 0; i < scripts.length; i++) {
                            if (scripts[i].innerHTML.indexOf("CreatePie($('#testBox'),") > -1) {
                                targetScript = scripts[i];
                                break;
                            }
                            continue;
                        }
                        if (targetScript == null) {
                            return [2 /*return*/, 0];
                        }
                        finalMin = 100;
                        scriptString = targetScript.innerHTML.innerString("$(document).ready(function () {", "\r\n\r\n\r\n");
                        eval(scriptString);
                        return [2 /*return*/, Math.floor((1 / finalMin) * 100)];
                }
            });
        });
    };
    Bank_1111.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var jobList, i, a, range, count, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jobList = document.querySelectorAll(".recruit > a");
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < jobList.length)) return [3 /*break*/, 8];
                        a = jobList.item(i);
                        range = void 0, count = void 0;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 6]);
                        range = a.title.match(/\d+ ~ \d+/)[0].split("~").map(function (x) { return parseInt(x); });
                        return [4 /*yield*/, this.getApplicantCount(a.href, range[0], range[1])];
                    case 3:
                        count = _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        e_1 = _a.sent();
                        return [4 /*yield*/, this.getApplicantCount(a.href, 50, 100)];
                    case 5:
                        count = _a.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        jobList.item(i).innerHTML = count + " \u4EBA\u61C9\u5FB5";
                        _a.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 1];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return Bank_1111;
}());
App.counter = new Bank_1111();
