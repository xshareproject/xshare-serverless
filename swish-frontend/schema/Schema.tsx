export interface TransactionDetailSchema {
    id: string,
    name: string,
    description: string,
    amount: number,
    createdDate: string,
    paymentDate: string,
    image: any,
    status: PaymentStatus, 
    recurring: boolean
}

export enum PaymentStatus {
    Pending,
    Unpaid,
    Paid,
}