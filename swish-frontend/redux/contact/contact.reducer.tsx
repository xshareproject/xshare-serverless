import { ContactSchema } from "../../data_store/Contacts";
import harold from '../../assets/images/profile_test.webp';

import {ContactActionTypes} from '../types/types.actions';
import {Contact} from '../types/types.Contact';
import { update } from "lodash";

const contact_INITIAL_STATE : Contact[] = [];

export const contactReducer = 
(state = contact_INITIAL_STATE, action: ContactActionTypes)  : Contact[] => {
    switch (action.type){
        case "LOAD_CONTACT":
            //TODO: Integrate with backend
            const contactsDefault : Contact[] = [
                {
                    id: "1",
                    ownerId: "0755850f-79a1-46f8-a06b-d169de9a23e4",
                    userId: "",
                    name: "Ken",
                    email: "kentest@gmail.com",
                    phoneNumber: "",
                    createdDate: "Jan 20th",
                    profilePicture: harold
                },
                {
                    id: "2",
                    ownerId: "0755850f-79a1-46f8-a06b-d169de9a23e4",
                    userId: "",
                    name: "Matthew",
                    email: "matthew@gmail.com",
                    phoneNumber: "",
                    createdDate: "Jan 20th",
                    profilePicture: harold
                },
                {
                    id: "3",
                    ownerId: "0755850f-79a1-46f8-a06b-d169de9a23e4",
                    userId: "",
                    name: "Krystal",
                    email: "krystal@gmail.com",
                    phoneNumber: "",
                    createdDate: "Jan 20th",
                    profilePicture: harold
                }
            ];
            return contactsDefault;
        case "READ_ALL_CONTACT":
            return state;
        case "CREATE_CONTACT":
            let newContact = action.contact;
            state.concat([newContact]);
            return state;
        case "UPDATE_CONTACT":
            var updatedContact : Contact = action.contact;
            var indexToModify = state.findIndex((contact) => {return contact?.id === updatedContact.id});
            state[indexToModify] = updatedContact;
            return state;
        case "UPDATE_CONTACT_BY_PROPERTY":
            var contactId = action.contactId;
            var propertyName = action.propertyName;
            var propertyValue = action.propertyValue;
            var indexToModify = state.findIndex((contact) => {return contact?.id === contactId});
            state[indexToModify][propertyName] = propertyValue;
            return state;
        case "DELETE_CONTACT":
            var contactId = action.contactId;
            var indexToRemove = state.findIndex((contact) => {return contact?.id === contactId});
            state.splice(indexToRemove, 1);
        default: 
            return state;
    }

}




