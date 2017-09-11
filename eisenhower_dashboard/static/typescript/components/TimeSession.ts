export interface TimeSessionInterface {
    id: number;
    start: Date;
    end?: Date;
    quadrant: string;
}

export class TimeSession implements TimeSessionInterface {
    public id: number;
    public start: Date;
    public end?: Date;
    public quadrant: string;

    constructor(ts: any) {
        this.id = ts.id;
        this.start = new Date(ts.start);
        if (ts.end !== null)
            this.end = new Date(ts.end) 
        else this.end = ts.end;
        this.quadrant = ts.quadrant;
    }

    isActive(): boolean {
        return this.end === null;
    }

    duration(): number {
        if (this.isActive())
            return Number(Date.now()) - Number(this.start);
        else
            return Number(this.end) - Number(this.start);
    }
}