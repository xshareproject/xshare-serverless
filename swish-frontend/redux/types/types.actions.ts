
import { removeContactFromTransaction } from '../contactTransactionPair/contactTransactionPair.action'
import { addContactToTransaction } from '../transaction/transaction.actions'
import {Contact} from './types.contact'
import { ContactSchema } from '../../data_store/Contacts';

export const ADD_CONTACT_TO_TRANSACTION = "ADD_CONTACT_TO_TRANSACTION";
export const REMOVE_CONTACT_FROM_TRANSACTION = "REMOVE_CONTACT_FROM_TRANSACTION";
export const EDIT_AMOUNT = "EDIT_AMOUNT";

export const READ_CONTACT_BY_ID = "READ_CONTACT_BY_ID";
export const READ_CONTACT_BY_NAME = "READ_CONTACT_BY_NAME";
export const READ_ALL_CONTACT = "READ_ALL_CONTACT";
export const LOAD_CONTACT = "LOAD_CONTACT";
export const CREATE_CONTACT = "CREATE_CONTACT";
export const UPDATE_CONTACT = "UPDATE_CONTACT";
export const UPDATE_CONTACT_BY_PROPERTY = "UPDATE_CONTACT_BY_PROPERTY";
export const DELETE_CONTACT = "DELETE_CONTACT";

export interface addContactToTransactionAction {
    type: typeof ADD_CONTACT_TO_TRANSACTION,
    contact: Contact
}

export interface removeContactFromTransactionAction {
    type: typeof REMOVE_CONTACT_FROM_TRANSACTION,
    contactId: string
}

export interface editAmountAction {
    type: typeof EDIT_AMOUNT,
    contactId: string,
    amount: number
}

export interface loadContact {
    type: typeof LOAD_CONTACT
}

export interface readAllContact {
    type: typeof READ_ALL_CONTACT
}

export interface createContactAction {
    type: typeof CREATE_CONTACT,
    contact: Contact
}

export interface updateContactByPropertyAction {
    type: typeof UPDATE_CONTACT_BY_PROPERTY, 
    contactId: string
    propertyName: string
    propertyValue: any
}

export interface updateContactAction {
    type: typeof UPDATE_CONTACT, 
    contactId: string
    contact: Contact
}

export interface deleteContactAction {
    type: typeof DELETE_CONTACT,
    contactId: string
}



export type ContactTransactionPairActionTypes = 
addContactToTransactionAction | removeContactFromTransactionAction | editAmountAction 

export type ContactActionTypes = loadContact | readAllContact | createContactAction | updateContactAction | updateContactByPropertyAction | deleteContactAction;

//Add more as we expand our redux
export type AppActions = ContactTransactionPairActionTypes | ContactActionTypes;