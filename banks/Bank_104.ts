class Bank_104 implements IBank {
    public static api = "https://www.104.com.tw/jb/104i/applyAnalysisToJob/sex?job_no=";
    public async getApplicantCount(url: string, min: number, max: number): Promise<number> {
        return (await new HttpClient().getAsync(url)).toJSON().total;
    }

    public scrollFunction: any;
    public async initList(): Promise<void> {
        this.scrollFunction = async () => {
            let jobList: NodeListOf<Element> = document.querySelectorAll(".j_cont");
            for (let i = 0; i < jobList.length; i++) {
                let job = jobList[i].querySelector(".apply_job");
                if (job && job['HumanBankApplicantCounter'] == true) continue;
                job['HumanBankApplicantCounter'] = true;
                let id = job.getAttribute("id");
                let countInfo = jobList[i].querySelector(".candidates_summary>a");

                let count = await this.getApplicantCount(Bank_104.api + id, 0, 0);
                try {
                    countInfo.innerHTML = `${count} 人應徵`;
                } catch (e) { }
            }
        }
        window.onscroll = this.scrollFunction;
        this.scrollFunction();
    }

    public async initPage(): Promise<void> {
        let id = (<HTMLInputElement>document.getElementsByName("jobno")[0]).value;
        let count = await this.getApplicantCount(Bank_104.api + id, 0, 0);
        let countInfo = document.querySelector(".function>.sub>a");
        countInfo.innerHTML = `${count} 人應徵`;
    }
}
App.counter = new Bank_104();