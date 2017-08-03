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
                        scriptString = targetScript.innerHTML.innerString("{", "\n\n");
                        eval(scriptString);
                        return [2 /*return*/, Math.floor((1 / finalMin) * 100)];
                }
            });
        });
    };
    Bank_1111.prototype.initList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var jobList, i, a, range, count, e_1, e_2, i, a, range, count, e_3, e_4, navButton, i, THIS;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jobList = document.querySelectorAll(".recruit > a");
                        if (!(jobList.length > 0)) return [3 /*break*/, 12];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < jobList.length)) return [3 /*break*/, 11];
                        a = jobList.item(i);
                        range = void 0, count = void 0;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 9]);
                        range = a.title.match(/\d+\s*~\s*\d+/)[0].split("~").map(function (x) { return parseInt(x); });
                        return [4 /*yield*/, this.getApplicantCount(a.href, range[0], range[1])];
                    case 3:
                        count = _a.sent();
                        return [3 /*break*/, 9];
                    case 4:
                        e_1 = _a.sent();
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.getApplicantCount(a.href, 50, 100)];
                    case 6:
                        count = _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        e_2 = _a.sent();
                        return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 9];
                    case 9:
                        jobList.item(i).innerHTML = count + " \u4EBA\u61C9\u5FB5";
                        _a.label = 10;
                    case 10:
                        i++;
                        return [3 /*break*/, 1];
                    case 11: return [3 /*break*/, 29];
                    case 12: return [4 /*yield*/, App.waitLoading()];
                    case 13:
                        _a.sent();
                        _a.label = 14;
                    case 14:
                        jobList = document.querySelectorAll("#showResultList > .digest");
                        return [4 /*yield*/, App.sleep(1000)];
                    case 15:
                        _a.sent();
                        _a.label = 16;
                    case 16:
                        if (jobList.length == 0) return [3 /*break*/, 14];
                        _a.label = 17;
                    case 17:
                        i = 0;
                        _a.label = 18;
                    case 18:
                        if (!(i < jobList.length)) return [3 /*break*/, 28];
                        a = jobList.item(i).querySelector(".DetRight > p > a");
                        range = void 0, count = void 0;
                        _a.label = 19;
                    case 19:
                        _a.trys.push([19, 21, , 26]);
                        range = a.title.match(/\d+\s*~\s*\d+/)[0].split("~").map(function (x) { return parseInt(x); });
                        return [4 /*yield*/, this.getApplicantCount(a.href, range[0], range[1])];
                    case 20:
                        count = _a.sent();
                        return [3 /*break*/, 26];
                    case 21:
                        e_3 = _a.sent();
                        _a.label = 22;
                    case 22:
                        _a.trys.push([22, 24, , 25]);
                        return [4 /*yield*/, this.getApplicantCount(a.href, 50, 100)];
                    case 23:
                        count = _a.sent();
                        return [3 /*break*/, 25];
                    case 24:
                        e_4 = _a.sent();
                        return [3 /*break*/, 25];
                    case 25: return [3 /*break*/, 26];
                    case 26:
                        a.innerHTML = count + " \u4EBA\u61C9\u5FB5";
                        _a.label = 27;
                    case 27:
                        i++;
                        return [3 /*break*/, 18];
                    case 28:
                        navButton = document.querySelectorAll(".pagination > li > a");
                        for (i = 0; i < navButton.length; i++) {
                            THIS = this;
                            navButton.item(i).addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, App.sleep(1000)];
                                        case 1:
                                            _a.sent();
                                            THIS.initList();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        _a.label = 29;
                    case 29: return [2 /*return*/];
                }
            });
        });
    };
    Bank_1111.prototype.initPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var countInfo, countInfo2, range, count, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        countInfo = document.querySelector(".control>div>a");
                        countInfo2 = document.querySelector(".initiative>a:last-child");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 5]);
                        range = countInfo.innerHTML.match(/\d+ ~ \d+/)[0].split("~").map(function (x) { return parseInt(x); });
                        return [4 /*yield*/, this.getApplicantCount(countInfo.href, range[0], range[1])];
                    case 2:
                        count = _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        e_5 = _a.sent();
                        return [4 /*yield*/, this.getApplicantCount(countInfo.href, 50, 100)];
                    case 4:
                        count = _a.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        countInfo.innerHTML = count + " \u4EBA\u61C9\u5FB5";
                        countInfo2.innerHTML = count + " \u4EBA\u61C9\u5FB5";
                        return [2 /*return*/];
                }
            });
        });
    };
    return Bank_1111;
}());
App.counter = new Bank_1111();
