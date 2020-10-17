import TransactionActionTypes from './transaction.types';
import {TransactionSchema} from '../../data_store/Transactions';

const INITIAL_STATE = [{
    transactionName : "",
    note : "",
    totalAmount : 0,
    paymentDate : "",
    recurring: false,
    archived: false
}];

export const transactionReducer = (state = INITIAL_STATE, action: any) => {
    switch(action.type) {

    }
}

