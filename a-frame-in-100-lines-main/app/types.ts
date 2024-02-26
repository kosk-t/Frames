export class Row {
    constructor(public id: number, public fid: number | undefined, public userName: string | undefined, public displayName:string | undefined, public avatar:string | undefined, public guid:string | undefined) {}
}
export interface Giveaway{
    id: number;
    guid: string;
    title: string;
    link: string;
    linkLabel: string;
    startImage: string;
    finishImage: string;
    childCount: number;
    giveawayurl: string;
}
export interface User {
    id: number;
    name: string;
    email: string;
    }