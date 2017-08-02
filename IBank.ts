interface IBank{
    getApplicantCount(url: string):Promise<number>;
    init():Promise<void>;
}