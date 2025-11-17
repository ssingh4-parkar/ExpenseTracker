export interface Expense {
    travel: number;
    food: number;
    hotel: number;
    activities: number;
    sightseeing: number;
}

export interface Trip {
    id: string;
    name: string;
    members: Member[];
}
export interface Member {
    name: string;
    total: number;
    expenses: Expense;
}
