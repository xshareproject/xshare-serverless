import { AppActions, ADD_CONTACT_TO_TRANSACTION, REMOVE_CONTACT_FROM_TRANSACTION, EDIT_AMOUNT} from "../types/types.actions"
import { Contact } from "../types/types.contact"
<<<<<<< HEAD

export const addContactToTransaction = (contact : Contact): AppActions => ({
    type: ADD_CONTACT_TO_TRANSACTION,
    contact
=======
import {Transaction} from '../types/types.transaction';
export const addContactToTransaction = (contact : Contact, transaction: Transaction): AppActions => ({
    type: "ADD_CONTACT_TO_TRANSACTION",
    contact,
    transaction
>>>>>>> 2f1d50d291636a28120da91c747dd277bc1436a1
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