export type TTask = {
    id: number;
    title: string;
    desc: string;
    date?: Date;
};

export interface ITasks {
    [name: string]: TTask[];
}
