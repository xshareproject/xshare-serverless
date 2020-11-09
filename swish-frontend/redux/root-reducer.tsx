import { combineReducers } from 'redux';
//import {persistReducer} from 'redux-persist';
//import userReducer from './user/user.reducer';
//import navigationReducer from './navigation/navigation.reducer';
//import storage from 'redux-persist/lib/storage';
import {contactTransactionPairReducer} from './contactTransactionPair/contactTransactionPair.reducer';
import {transactionReducer} from './transaction/transaction.reducer';
import {contactReducer} from './contact/contact.reducer';

export const rootReducer = combineReducers({
    contactTransactionPairReducer,
    transactionReducer,
    contactReducer
});

export type AppState = ReturnType<typeof rootReducer>