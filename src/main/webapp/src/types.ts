export interface Ticket {
    id: number;
    numbers: string;
    created: Date;
}

export interface TicketPage {
    content: Ticket[];
    empty: boolean;
    totalPages: number;
    totalElements: number;
    number: number;
}