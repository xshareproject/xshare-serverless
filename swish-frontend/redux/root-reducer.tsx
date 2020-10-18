import { combineReducers } from 'redux';
//import {persistReducer} from 'redux-persist';
//import contactReducer from './contact/contact.reducer';
//import {transactionReducer} from './transaction/transaction.reducer';
//import userReducer from './user/user.reducer';
//import navigationReducer from './navigation/navigation.reducer';
//import storage from 'redux-persist/lib/storage';
import {contactTransactionPairReducer} from './contactTransactionPair/contactTransactionPair.reducer';



export const rootReducer = combineReducers({
    contactTransactionPair: contactTransactionPairReducer,
});

export type AppState = ReturnType<typeof rootReducer>