import * as React from 'react';
import harold from '../assets/images/profile_test.webp';
const {v4: uuidv4} = require('uuid');
import * as lodash from 'lodash';

export interface ContactSchema {
    id: string,
    ownerId: string,
    userId: string,
    name: string,
    email: string,
    phoneNumber: string,
    createdDate: string,
    profilePicture: any,     
}

export interface TransactionContactPair {
    id: string, 
    transactionId: string,
    contactId: string,
    paymentStatus: PaymentStatus,
    amountOwned: number,
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
]

const contactsByTransactionsDefault : TransactionContactPair[] = [
    {
        id: "88d9966b-751c-4bb5-af3f-5e5c493d9eae",
        transactionId: "122a5aa3-e4aa-4a57-a420-818fed3060f0",
        contactId: "1",
        paymentStatus: PaymentStatus.Unpaid,
        amountOwned: 12.20
    },
    {
        id: "88d9966b-751c-4bb5-af3f-5e5c493d9eab",
        transactionId: "ef0a0809-e563-49eb-a1ac-303a404d83cc",
        contactId: "2",
        paymentStatus: PaymentStatus.Pending,
        amountOwned: 22.65,
    },
    {
        id: "88d9966b-751c-4bb5-af3f-5e5c493d9eac",
        transactionId: "ef0a0809-e563-49eb-a1ac-303a404d83cc",
        contactId: "3",
        paymentStatus: PaymentStatus.Pending,
        amountOwned: 22.65,
    },
    {
        id: "88d9966b-751c-4bb5-af3f-5e5c493d9eff",
        transactionId: "8558845a-919f-4487-a5e4-19353ab944b4",
        contactId: "3",
        paymentStatus: PaymentStatus.Unpaid,
        amountOwned: 20.00,
    }
]

export class Contacts {
    private _contacts : ContactSchema[];
    private _contactTransactionPairs : TransactionContactPair[];

    public constructor(){
        this._contacts = contactsDefault;
        this._contactTransactionPairs = contactsByTransactionsDefault;
    }

    public get contacts(){
        return this._contacts;
    }   

    public getContactsById(id: string){
        return this._contacts.find((contact) => {return contact.id == id});
    }

    public getContactByName(name: string){
        let contact = this.contacts.filter((contact) => {return contact.name.toLowerCase().includes(name.toLowerCase())});
        return lodash.cloneDeep(contact);
    }

    public getContactsByTransaction(transactionId : string){
        let contactsByTransactions : TransactionContactPair[] = this._contactTransactionPairs.filter((contactItem) => {return contactItem.transactionId === transactionId });
        let contactList = contactsByTransactions.map((contactsByTransaction) => {return this.getContactsById(contactsByTransaction.contactId);})
        // console.log("ContactByTransaction: ", contactsByTransactions);
        // console.log("ContactList: ", contactList); 
        return lodash.cloneDeep(contactList);
    }

    public getTransactionContactPairs(transactionId: string){
        let transactionContactPairs = this._contactTransactionPairs.filter((contactItem) => {return contactItem.transactionId === transactionId });
        return lodash.cloneDeep(transactionContactPairs);
    }

    //TODO: Required factoring for performance purpose
    public deleteContactsByTransactions(transactionId : string){
        let filteredContacts : TransactionContactPair[] = this._contactTransactionPairs.filter((contactTransactionPair) => {return contactTransactionPair.transactionId !== transactionId});
        this._contactTransactionPairs = filteredContacts;
        // console.log("DELETED LIST", this._contactTransactionPairs);
    }

    public deleteContactsByTransactionsSingle(transactionId : string, contactId: string){
        let toBeRemoveContactIndex = this._contactTransactionPairs.findIndex(contactItem => 
            contactItem.contactId === contactId && contactItem.transactionId === transactionId);
        this._contactTransactionPairs.splice(toBeRemoveContactIndex, 1);
    }

    public createContactsByTransactions(contactId : string, transactionId: string, amountOwned: number){
        let id = uuidv4();
        let paymentStatus = PaymentStatus.Pending

        let newContactByTransaction : TransactionContactPair = {
            id,
            transactionId,
            contactId,
            amountOwned,
            paymentStatus,
        }       
        this._contactTransactionPairs.push(newContactByTransaction);       
    }

    public updateContactsByTransactions(contactsByTransactionList : TransactionContactPair[]){
        this._contactTransactionPairs = this._contactTransactionPairs.concat(contactsByTransactionList);
    }
}

export const ContactsContext = React.createContext<Contacts>(
    new Contacts
);