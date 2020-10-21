export enum TRANSACTION_TYPE{
    STANDARD, MEAL, RECURRING
}

export interface Transaction {
    id: string,
    lenderId: string,
    transactionName: string,
    note: string,
    totalAmount: number,
    createdDate: string,
    paymentDate: string,
    recurring: boolean,
    recurringId: string,
    groupId: string,
    transactionType: TRANSACTION_TYPE 
}