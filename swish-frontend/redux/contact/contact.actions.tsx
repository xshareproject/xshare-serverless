import { AppActions, READ_CONTACT_BY_ID, READ_CONTACT_BY_NAME, CREATE_CONTACT, UPDATE_CONTACT, UPDATE_CONTACT_BY_PROPERTY, DELETE_CONTACT } from "../types/types.actions"
import {Contact} from '../types/types.Contact';

export const createContact = (contact: Contact): AppActions => ({
    type: CREATE_CONTACT,
    contact
});

export const updateContactByProperty = (contactId: string,  propertyName: string, propertyValue: any) : AppActions => ({
    type: UPDATE_CONTACT_BY_PROPERTY,
    contactId,
    propertyName,
    propertyValue
});

export const updateContact = (contactId: string, contact: Contact) : AppActions => ({
    type: UPDATE_CONTACT,
    contactId,
    contact
});

export const deleteContact = (contactId: string) : AppActions => ({
    type: DELETE_CONTACT,
    contactId 
});

