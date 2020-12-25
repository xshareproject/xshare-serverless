import { Transaction, TRANSACTION_TYPE } from "../types/types.Transaction";

export var transactionData : Transaction[] = [
    {
        id: "122a5aa3-e4aa-4a57-a420-818fed3060f0",
        lenderId: "0wn3r1e-1578-4be5-87eb-e9211fedd90f",
        transactionName: "SkipTheDishes",
        totalAmount: 12.20,
        note: "SkipTheDishes for fried chicken",
        createdDate: "July 20, 2021",
        paymentDate: "August 20, 2021",
        recurring: false,
        recurringId: "",
        groupId: "",
        transactionType: TRANSACTION_TYPE.MEAL
    },
    {
        id: "ef0a0809-e563-49eb-a1ac-303a404d83cc",
        lenderId: "0wn3r1e-1578-4be5-87eb-e9211fedd90f",
        transactionName: "Water Bill",
        totalAmount: 45.30,
        note: "July water bill",
        createdDate: "July 10, 2021",
        paymentDate: "July 31, 2021",
        recurring: true,
        recurringId: "",
        groupId: "",
        transactionType: TRANSACTION_TYPE.RECURRING
    },
    {
        id: "8558845a-919f-4487-a5e4-19353ab944b4",
        lenderId: "0wn3r1e-1578-4be5-87eb-e9211fedd90f",
        transactionName: "Bday giftcard",
        totalAmount: 20.00,
        note: "Gift card for Tracy's birthday",
        createdDate: "July 18, 2021",
        paymentDate: "August 18, 2021",
        recurring: false,
        recurringId: "",
        groupId: "",
        transactionType: TRANSACTION_TYPE.STANDARD
    },
];