class Bank_1111 implements IBank {
    public async getApplicantCount(url: string, min: number, max: number): Promise<number> {
        let minP = 1 / max;//每人最小占比

        let httpClient = new HttpClient();
        let webSource = App.parseHTML((await httpClient.getAsync(url)).result);
        let scripts = webSource.getElementsByTagName("script");
        let targetScript: HTMLScriptElement = null;
        for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].innerHTML.indexOf("CreatePie($('#testBox'),") > -1) {
                targetScript = scripts[i];
                break;
            }
            continue;
        }

        if (targetScript == null) {
            return 0;
        }

        let finalMin = 100;
        function CreatePie(a, b, c) {
            let list = JSON.parse("[" + c.replace(/\'/g, '"') + "]");
            let temp_min = 100;
            let notSet = false;

            for (let j = 0; j < list.length; j++) {
                console.log(list[j][1] + "   " + minP);
                if (list[j][1] / 100 < minP) continue;
                temp_min = Math.min(temp_min, list[j][1]);
                notSet = true;
            }
            if (!notSet) temp_min = 1;
            finalMin = Math.min(finalMin, temp_min);
        }
        function $() { }//Fix not found JQuery
        let scriptString = targetScript.innerHTML.innerString("{", "\n\n");
        eval(scriptString);
        return Math.floor((1 / finalMin) * 100);
    }

    public async initList(): Promise<void> {
        let jobList: NodeListOf<Element> = document.querySelectorAll(".recruit > a");
        if (jobList.length > 0) {
            for (let i = 0; i < jobList.length; i++) {
                let a = (<any>jobList.item(i));
                let range, count;
                try {
                    range = a.title.match(/\d+\s*~\s*\d+/)[0].split("~").map(x => parseInt(x));
                    count = await this.getApplicantCount(a.href, range[0], range[1]);
                } catch (e) {
                    try {
                        count = await this.getApplicantCount(a.href, 50, 100);
                    } catch (e) {

                    }
                }
                jobList.item(i).innerHTML = `${count} 人應徵`;
            }
        }else{//COM
            await App.waitLoading();
            do{
                jobList = document.querySelectorAll("#showResultList > .digest");
                await App.sleep(1000);
            }while(jobList.length == 0)
            for (let i = 0; i < jobList.length; i++) {//HumanBankApplicantCounter
                let a = (<any>jobList.item(i).querySelector(".DetRight > p > a"));
                let range, count;
                try {
                    range = a.title.match(/\d+\s*~\s*\d+/)[0].split("~").map(x => parseInt(x));
                    count = await this.getApplicantCount(a.href, range[0], range[1]);
                } catch (e) {
                    try {
                        count = await this.getApplicantCount(a.href, 50, 100);
                    } catch (e) {

                    }
                }
                a.innerHTML = `${count} 人應徵`;
            }

            var navButton = document.querySelectorAll(".pagination > li > a");
            for(let i = 0 ; i < navButton.length ; i++){
                var THIS = this;
                navButton.item(i).addEventListener('click',async()=>{
                    await App.sleep(1000);
                    THIS.initList();                    
                });
            }
        }
    }

    public async initPage(): Promise<void> {
        var countInfo = <any>document.querySelector(".control>div>a");
        var countInfo2 = <any>document.querySelector(".initiative>a:last-child");
        let range, count;
        try {
            range = countInfo.innerHTML.match(/\d+ ~ \d+/)[0].split("~").map(x => parseInt(x));
            count = await this.getApplicantCount(countInfo.href, range[0], range[1]);
        } catch (e) {
            count = await this.getApplicantCount(countInfo.href, 50, 100);
        }
        countInfo.innerHTML = `${count} 人應徵`;
        countInfo2.innerHTML = `${count} 人應徵`;
    }
}
App.counter = new Bank_1111();