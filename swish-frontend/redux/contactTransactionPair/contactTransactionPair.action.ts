import { AppActions, ADD_CONTACT_TO_TRANSACTION, REMOVE_CONTACT_FROM_TRANSACTION, EDIT_AMOUNT} from "../types/types.actions"
import { Contact } from "../types/types.Contact";
import {Transaction} from '../types/types.Transaction';


export const addContactToTransaction = (contact : Contact, transaction: Transaction): AppActions => ({
    type: ADD_CONTACT_TO_TRANSACTION,
    contact,
    transaction
})

export const removeContactFromTransaction = (contactId: string) : AppActions => ({
    type: REMOVE_CONTACT_FROM_TRANSACTION,
    contactId
})

export const editAmount = (contactId: string, amount: number) : AppActions => ({
    type: EDIT_AMOUNT,
    contactId,
    amount
})