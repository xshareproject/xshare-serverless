import { AppActions } from "../types/types.actions"
import { Contact } from "../types/types.contact"

export const addContactToTransaction = (contact : Contact): AppActions => ({
    type: "ADD_CONTACT_TO_TRANSACTION",
    contact
})

export const removeContactFromTransaction = (contactId: string) : AppActions => ({
    type: "REMOVE_CONTACT_FROM_TRANSACTION",
    contactId
})

export const editAmount = (contactId: string, amount: number) : AppActions => ({
    type: "EDIT_AMOUNT",
    contactId,
    amount
})