interface String {
    innerString(start: string, end: string): string;
}

String.prototype.innerString = function (start: string, end: string): string {
    let index = this.indexOf(start);
    if (index < 0) return null;
    let result:string = this.substring(index + start.length);
    index = result.indexOf(end);
    if (index < 0) return null;
    return result.substring(0, index);
}

class App{
    public static counter: IBank;

    public static parseHTML(htmlString:string) :HTMLDocument {
        return new DOMParser().parseFromString(htmlString, "text/html");
    }
}