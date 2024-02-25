export class Row {
    constructor(public id: number, public fid: number | undefined, public userName: string | undefined, public displayName:string | undefined, public avatar:string | undefined) {}
}
export interface Giveaway{
    title: string;
    link: string;
    linkLabel: string;
}
export interface User {
    id: number;
    name: string;
    email: string;
    }