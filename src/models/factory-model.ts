export interface Factory {
    _id?: string,
    name: string,
    randomNumCount: number | null,
    randomNumInBound: number | null,
    randomNumOutBound: number | null,
    randomNums?: Array<number>
}