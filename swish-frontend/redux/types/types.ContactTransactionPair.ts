export enum PaymentStatus {
    Pending,
    Unpaid,
    Paid,
}

export interface ContactTransactionPair {
    id: string,
    transactionId: string,
    contactId: string,
    paymentStatus: PaymentStatus,
    amountOwned: number
}