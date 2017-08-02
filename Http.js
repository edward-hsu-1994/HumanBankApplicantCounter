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
var HttpClient = (function () {
    function HttpClient() {
        this.requestHeader = null;
        this.withCredentials = false;
    }
    HttpClient.prototype.typeOf = function (obj) {
        if (!obj)
            return obj;
        return obj.constructor.name;
    };
    HttpClient.prototype.openAndSend = function (method, url, header, data, user, password, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var xhr = new XMLHttpRequest();
                        //#region 事件與屬性
                        xhr.withCredentials = _this.withCredentials;
                        xhr.onprogress = progressCallback || _this.progressCallback;
                        xhr.onreadystatechange = function (event) {
                            if (xhr.readyState !== 4)
                                return;
                            if (xhr.status >= 200 && xhr.status < 300) {
                                var result = new HttpResponse();
                                result.header = xhr.getAllResponseHeaders();
                                result.statusCode = xhr.status;
                                result.resultType = xhr.responseType;
                                result.resultText = xhr.responseText;
                                result.resultXML = xhr.responseXML;
                                result.result = xhr.response;
                                resolve(result);
                            }
                            else {
                                reject(xhr.statusText);
                            }
                        };
                        //#endregion
                        if ((method == "GET" || method == "DELETE") && url.indexOf("?") == -1) {
                            var params = new Array();
                            for (var key in data)
                                params.push(key + "=" + encodeURIComponent(data[key]));
                            url += "?" + params.join("&");
                        }
                        xhr.open(method, url, true, user || _this.user, password || _this.password);
                        //#region 設定Header
                        if (_this.requestHeader)
                            for (var key in _this.requestHeader)
                                xhr.setRequestHeader(key, _this.requestHeader[key]);
                        if (header)
                            for (var key in header)
                                xhr.setRequestHeader(key, header[key]);
                        //#endregion
                        if (data) {
                            if (data instanceof FormData || _this.typeOf(data) == 'String') {
                                xhr.send(data);
                            }
                            else {
                                if (method == "GET" || method == "DELETE") {
                                    xhr.send();
                                }
                                else if (new FormData()['fake']) {
                                    var qString = "";
                                    for (var key in data) {
                                        if (data[key] instanceof Function)
                                            continue;
                                        qString += "&" + key + "=" + encodeURIComponent(data[key]);
                                    }
                                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
                                    xhr.send(qString.substring(1));
                                }
                                else {
                                    var formdata = new FormData();
                                    for (var key in data) {
                                        if (data[key] instanceof Function)
                                            continue;
                                        formdata.append(key, data[key]);
                                    }
                                    xhr.send(formdata);
                                }
                            }
                        }
                        else {
                            xhr.send();
                        }
                    })];
            });
        });
    };
    HttpClient.prototype.getAsync = function (url, header, data, user, password, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openAndSend('GET', url, header, data, user, password, progressCallback)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpClient.prototype.postAsync = function (url, header, data, user, password, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openAndSend('POST', url, header, data, user, password, progressCallback)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpClient.prototype.putAsync = function (url, header, data, user, password, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openAndSend('PUT', url, header, data, user, password, progressCallback)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpClient.prototype.deleteAsync = function (url, header, data, user, password, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openAndSend('DELETE', url, header, data, user, password, progressCallback)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return HttpClient;
}());
var HttpResponse = (function () {
    function HttpResponse() {
    }
    HttpResponse.prototype.toJSON = function (handler) {
        var result = JSON.parse(this.resultText);
        console.log(result);
        if (handler) {
            handler(result);
        }
        else if (HttpResponse.defaultJSONHandler) {
            HttpResponse.defaultJSONHandler(result);
        }
        return result;
    };
    return HttpResponse;
}());
HttpResponse.defaultJSONHandler = null;
