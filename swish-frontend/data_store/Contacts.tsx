import * as React from 'react';
import harold from '../assets/images/profile_test.webp';
const {v4: uuidv4} = require('uuid');

export interface ContactSchema {
    id: string,
    ownerId: string,
    name: string,
    email: string,
    phoneNumber: string,
    createdDate: string,
    image: any,     
}

interface ContactsByTransaction {
    id: string,
    transactionId: string,
    contactId: string,
    paymentStatus: PaymentStatus
}

export enum PaymentStatus {
    Pending,
    Unpaid,
    Paid,
}

const contactsDefault : ContactSchema[] = [
    {
        id: "1",
        ownerId: "0755850f-79a1-46f8-a06b-d169de9a23e4",
        name: "Ken",
        email: "kentest@gmail.com",
        phoneNumber: "",
        createdDate: "Jan 20th",
        image: harold
    },
    {
        id: "2",
        ownerId: "0755850f-79a1-46f8-a06b-d169de9a23e4",
        name: "Matthew",
        email: "matthew@gmail.com",
        phoneNumber: "",
        createdDate: "Jan 20th",
        image: harold
    },
    {
        id: "3",
        ownerId: "0755850f-79a1-46f8-a06b-d169de9a23e4",
        name: "Krystal",
        email: "krystal@gmail.com",
        phoneNumber: "",
        createdDate: "Jan 20th",
        image: harold
    }
]

const contactsByTransactionsDefault : ContactsByTransaction[] = [
    {
        id: "88d9966b-751c-4bb5-af3f-5e5c493d9eae",
        transactionId: "122a5aa3-e4aa-4a57-a420-818fed3060f0",
        contactId: "1",
        paymentStatus: PaymentStatus.Unpaid,
    },
    {
        id: "88d9966b-751c-4bb5-af3f-5e5c493d9eab",
        transactionId: "ef0a0809-e563-49eb-a1ac-303a404d83cc",
        contactId: "2",
        paymentStatus: PaymentStatus.Pending,
    },
    {
        id: "88d9966b-751c-4bb5-af3f-5e5c493d9eac",
        transactionId: "ef0a0809-e563-49eb-a1ac-303a404d83cc",
        contactId: "3",
        paymentStatus: PaymentStatus.Pending,
    },
    {
        id: "88d9966b-751c-4bb5-af3f-5e5c493d9eff",
        transactionId: "8558845a-919f-4487-a5e4-19353ab944b4",
        contactId: "3",
        paymentStatus: PaymentStatus.Unpaid,
    }
]

export class Contacts {
    private _contacts : ContactSchema[];
    private _contactsByTransaction : ContactsByTransaction[];

    public constructor(){
        this._contacts = contactsDefault;
        this._contactsByTransaction = contactsByTransactionsDefault;
    }

    public get contacts(){
        return this._contacts;
    }   

    public getContactsById(id: string){
        return this._contacts.find((contact) => {return contact.id == id});
    }

    public getContactsByTransactions(transactionId : string){
        let contactsByTransactions : ContactsByTransaction[] = this._contactsByTransaction.filter((contactItem) => {return contactItem.transactionId === transactionId });
        let contactList = contactsByTransactions.map((contactsByTransaction) => {return this.getContactsById(contactsByTransaction.contactId);})
        // console.log("ContactByTransaction: ", contactsByTransactions);
        // console.log("ContactList: ", contactList); 
        return contactList;
    }

    public deleteContactsByTransactions(transactionId : string){
        let filteredContacts : ContactsByTransaction[] = this._contactsByTransaction.filter((contactItem) => {return contactItem.transactionId !== transactionId});
        this._contactsByTransaction = filteredContacts;
    }

    public deleteContactsByTransactionsSingle(transactionId : string, contactId: string){
        let toBeRemoveContactIndex = this._contactsByTransaction.findIndex(contactItem => 
            contactItem.contactId === contactId && contactItem.transactionId === transactionId);
        this._contactsByTransaction.splice(toBeRemoveContactIndex, 1);
    }

    public createContactsByTransactions(contactId : string, transactionId: string){
        let id = uuidv4();
        let paymentStatus = PaymentStatus.Pending

        let newContactByTransaction : ContactsByTransaction = {
            id,
            transactionId,
            contactId,
            paymentStatus
        }       
        this._contactsByTransaction.push(newContactByTransaction);       
    }

    public updateContactsByTransactions(contactsByTransactionList : ContactsByTransaction[]){
        this._contactsByTransaction.concat(contactsByTransactionList); 
    }
}

export const ContactsContext = React.createContext<Contacts>(
    new Contacts
);