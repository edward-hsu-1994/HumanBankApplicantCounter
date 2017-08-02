class HttpClient {
    public requestHeader: any = null;
    public withCredentials: boolean = false;
    public progressCallback: (event: ProgressEvent) => any;

    public user: string;
    public password: string;
    private typeOf(obj: any): string {
        if (!obj) return obj;
        return obj.constructor.name;
    }
    private async openAndSend(method: string, url: string, header?: any, data?: (FormData | String | Object), user?: string, password?: string, progressCallback?: (event: ProgressEvent) => any): Promise<HttpResponse> {
        return new Promise<HttpResponse>((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            //#region 事件與屬性
            xhr.withCredentials = this.withCredentials;
            xhr.onprogress = progressCallback || this.progressCallback;
            xhr.onreadystatechange = function (event) {
                if (xhr.readyState !== 4) return;
                if (xhr.status >= 200 && xhr.status < 300) {
                    var result = new HttpResponse();
                    result.header = xhr.getAllResponseHeaders();
                    result.statusCode = xhr.status;
                    result.resultType = xhr.responseType;
                    result.resultText = xhr.responseText;
                    result.resultXML = xhr.responseXML;
                    result.result = xhr.response;
                    resolve(result);
                } else {
                    reject(xhr.statusText);
                }
            };
            //#endregion

            if ((method == "GET" || method == "DELETE") && url.indexOf("?")==-1 ) {
                var params = new Array<string>();
                for (var key in data) params.push(`${key}=${encodeURIComponent(data[key])}`);
                url += "?" + params.join("&");
            }
            xhr.open(method, url, true, user || this.user, password || this.password);

            //#region 設定Header
            if (this.requestHeader) for (var key in this.requestHeader) xhr.setRequestHeader(key, this.requestHeader[key]);
            if (header) for (var key in header) xhr.setRequestHeader(key, header[key]);
            //#endregion

            if (data) {
                if (data instanceof FormData || this.typeOf(data) == 'String') {
                    xhr.send(data);
                } else {
                    if (method == "GET" || method == "DELETE") {
                        xhr.send();
                    } else if (new FormData()['fake']) {
                        var qString = "";
                        for (var key in data) {
                            if (data[key] instanceof Function) continue;
                            qString += "&" + key + "=" + encodeURIComponent(data[key]);
                        }
                        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
                        xhr.send(qString.substring(1));
                    } else {
                        var formdata: FormData = new FormData();
                        for (var key in data) {
                            if (data[key] instanceof Function) continue;
                            formdata.append(key, data[key]);
                        }
                        xhr.send(formdata);
                    }
                }
            } else {
                xhr.send();
            }
        });
    }
    public async getAsync(url: string, header?: any, data?: (FormData | String | Object), user?: string, password?: string, progressCallback?: (event: ProgressEvent) => any): Promise<HttpResponse> {
        return await this.openAndSend('GET', url, header, data, user, password, progressCallback);
    }
    public async postAsync(url: string, header?: any, data?: (FormData | String | Object), user?: string, password?: string, progressCallback?: (event: ProgressEvent) => any): Promise<HttpResponse> {
        return await this.openAndSend('POST', url, header, data, user, password, progressCallback);
    }
    public async putAsync(url: string, header?: any, data?: (FormData | String | Object), user?: string, password?: string, progressCallback?: (event: ProgressEvent) => any): Promise<HttpResponse> {
        return await this.openAndSend('PUT', url, header, data, user, password, progressCallback);
    }
    public async deleteAsync(url: string, header?: any, data?: (FormData | String | Object), user?: string, password?: string, progressCallback?: (event: ProgressEvent) => any): Promise<HttpResponse> {
        return await this.openAndSend('DELETE', url, header, data, user, password, progressCallback);
    }
}
class HttpResponse {
    public statusCode: number;
    public header: any;
    public resultType: string;
    public resultText: string;
    public resultXML: Document;
    public result: any;

    public static defaultJSONHandler: (json: any) => void = null;
    public toJSON(handler?: (json: any) => void): any {
        var result = JSON.parse(this.resultText);
        console.log(result);
        if (handler) {
            handler(result);
        } else if (HttpResponse.defaultJSONHandler) {
            HttpResponse.defaultJSONHandler(result);
        }

        return result;
    }
}