import { AppActions } from "../types/types.actions";
import {Transaction, TRANSACTION_TYPE} from '../types/types.transaction';

export const updateTransactionType = (transactionType: TRANSACTION_TYPE, transactionId: Transaction) : AppActions => ({
    type: "UPDATE_TRANSACTION_TYPE",
    transactionType,
    transactionId
})

export const updateTransaction = (transaction: Transaction) : AppActions => ({
    type: "UPDATE_TRANSACTION",
    transaction
})

export const updateTransactionByProperty = (id: string, propertyName: string, value: any) => ({
    type: "UPDATE_TRANSACTION_BY_PROPERTY",
    id,
    propertyName,
    value
})