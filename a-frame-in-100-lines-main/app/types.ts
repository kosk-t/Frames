export class Row {
    constructor(public id: number, public fid: number | null, public userName: string | null, public displayName:string | null, public avatar:string | null) {}
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