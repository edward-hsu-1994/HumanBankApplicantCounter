interface IBank{
    getApplicantCount(url: string, min: number, max: number):Promise<number>;
    init():Promise<void>;
}