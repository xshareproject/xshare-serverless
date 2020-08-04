import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import TransactionList from '../components/transactions/TransactionList';
import {TransactionDetailSchema, PaymentStatus} from '../schema/Schema';
import {TransactionDataContext} from '../data_store/Context';
import harold from '../assets/images/profile_test.webp';


//TODO: TransactionProps should be extending from a Props with navigation object
interface TransactionsProps {
  //user info
}

interface TransactionsState {
  transactions : TransactionDetailSchema[]
}

// class Transactions extends React.Component<TransactionsProps, TransactionsState> {

const transactionList = [
  {
    "id": "122a5aa3-e4aa-4a57-a420-818fed3060f0",
    "name": "User 1",
    "amount": 12.20,
    "description": "SkipTheDishes",
    "createdDate": "July 20th",
    "paymentDate": "August 20th",
    "image": harold,
    "status": PaymentStatus.Pending,
    "recurring": false
},
{
    "id": "ef0a0809-e563-49eb-a1ac-303a404d83cc",
    "name": "User 2",
    "amount": 45.30,
    "description": "Water Bill",
    "createdDate": "July 10th",
    "paymentDate": "July 31st",
    "image": harold,
    "status": PaymentStatus.Unpaid,
    "recurring": true
},
{
    "id": "8558845a-919f-4487-a5e4-19353ab944b4",
    "name": "User 3",
    "amount": 20.00,
    "description": "Bday giftcard",
    "createdDate": "July 18",
    "paymentDate": "August 18th",
    "image": harold,
    "status": PaymentStatus.Pending,
    "recurring": false
  }
]

export default class TransactionsOverviewScreen extends React.Component<TransactionsProps, TransactionsState>{
  constructor(props : any){
    super(props);
    this.state = {
      transactions: []
    }
  }

  componentDidMount(){
    this.setState({
      transactions: transactionList
    });
  }

  navigateToDetailCallback = (detailScreenProps : TransactionDetailSchema) => {
    this.props.navigation.navigate('Details', detailScreenProps);
  }

  updateTransaction = (transaction : TransactionDetailSchema, transactionId : string) => {
    console.log(transaction);
  }
  

  render(){
    const transactionContext = {
      transactions: this.state.transactions,
      updateTransaction: this.updateTransaction, 
    }
    return (
      <TransactionDataContext.Provider value={transactionContext}>
      <View style={styles.container}>
        <View style = {styles.topBar}>
          <Text style={styles.welcomeText}>
            <Text>Welcome </Text>
            <Text style={{ fontWeight: 'bold' }}>Florence!</Text>
          </Text>
          <Text>THIS MONTH'S OWINGS</Text>
          <Text style={{fontSize: 50}}>$150.00</Text> 
        </View>
        <View style = {styles.transactionView}>
          <TransactionList style={styles.transactionList} navigationCallback={this.navigateToDetailCallback}></TransactionList>
        </View>
      </View> 
      </TransactionDataContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#61daaa'
  },
  topBar: {
    flex: .7,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'transparent'
  },
  welcomeText: {
    flexDirection: 'row',
    fontSize: 25,
    paddingBottom: 10,
  },
  transactionView: {
    flex: 2,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ffffff'
  },
  transactionList: {
    flex: 1,
  }
});
