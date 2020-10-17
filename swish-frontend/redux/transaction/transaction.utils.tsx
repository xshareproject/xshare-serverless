import * as lodash from 'lodash';
import { TransactionSchema } from '../../data_store/Transactions';

export const getTransactionById = (_transactions: TransactionSchema[], transactionId: string) => {
    let index = _transactions.findIndex(element => element.id === transactionId);
    return lodash.cloneDeep(_transactions[index]);   
}

export const getTransactionByName = (_transactions: TransactionSchema[], nameToSearch: string) => {
    let transactionByName : TransactionSchema[] = _transactions.filter(element => element.transactionName.includes(nameToSearch));
    return lodash.cloneDeep(transactionByName);
}

export const getTransactionByLender = (_transactions: TransactionSchema[],lenderId: string) => {
    let transactionByLender : TransactionSchema[] = _transactions.filter(element => element.lenderId == lenderId);
    return lodash.cloneDeep(transactionByLender); 
}

export const updateTransaction = (_transactions: TransactionSchema[], transaction : TransactionSchema) => {
    let index = _transactions.findIndex(element => element.id === transaction.id);
    _transactions[index] = transaction;
}

//Error from your code
// export const updateTransactionByProperty = (_transactions: TransactionSchema[],id: string, propertyName: string, value: any ) => {
//     let index = _transactions.findIndex(element => element.id === id);
//     _transactions[index][propertyName] = value;    
// }

export const createNewTransaction = (_transactions: TransactionSchema[],transaction : TransactionSchema) => {
    _transactions.push(transaction);
}
