export enum PaymentStatus {
    Pending,
    Unpaid,
    Paid,
}

export interface ContactTransactionPairs {
    id: string,
    transactionId: string,
    contactId: string,
    paymentStatus: PaymentStatus,
    amountOwned: number
}