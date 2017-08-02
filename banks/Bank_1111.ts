class Bank_1111 implements IBank {
    public async getApplicantCount(url: string): Promise<number> {
        var httpClient = new HttpClient();
        var webSource = App.parseHTML((await httpClient.getAsync(url)).result);
        var scripts = webSource.getElementsByTagName("script");
        var targetScript : HTMLScriptElement = null;
        for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].innerHTML.indexOf("CreatePie($('#testBox'),") > -1) {
                targetScript = scripts[i];
                break;
            }
            continue;
        }

        let finalMin = 100;
        function CreatePie(a,b,c){
            var list = JSON.parse("[" + c.replace(/\'/g,'"') + "]");
            var min = 100;
            var notSet = false;
            for(let j = 0 ; j < list.length ; j++){
                if(list[j][0] == "不拘" || list[j][1] == 1)continue;
                min = Math.min(min, list[j][1]);
                notSet = true;
            }
            if(!notSet)min = 1;
            finalMin = Math.min(finalMin,min);            
        }

        var scriptString = targetScript.innerHTML.innerString("$(document).ready(function () {","$(\"#comCollect1\")");
        eval(scriptString);
        return Math.floor((1/finalMin) * 100);
    }

    public async init(): Promise<void>{
        
    }
}