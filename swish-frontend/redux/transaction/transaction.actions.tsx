import TransactionActionTypes from './transaction.types';

export const getTransaction = () => ({
    type: TransactionActionTypes.GET_TRANSACTION
})

//item : ContactSchema 
export const addContactToTransaction = (item:any) => ({
    type: TransactionActionTypes.ADD_CONTACT_TO_TRANSACTION,
    payload: item
})

export const removeContactToTransaction = (item:any) => ({
    type: TransactionActionTypes.REMOVE_CONTACT_FROM_TRANSACTION,
    payload: item
})

