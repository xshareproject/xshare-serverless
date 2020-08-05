import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import TransactionList from '../components/transactions/TransactionList';
import {TransactionDetailSchema} from '../schema/Schema';
import harold from '../assets/images/profile_test.webp';
import { TransactionsContext} from '../data_store/Context';


//TODO: TransactionProps should be extending from a Props with navigation object
interface TransactionsOverviewProps {
}

interface TransactionsOverviewState {
}

export default class TransactionsOverviewScreen extends React.Component<TransactionsOverviewProps, TransactionsOverviewState>{
  constructor(props : any){
    super(props);
  }  

  render(){
    return (
      <TransactionsContext.Consumer>
        {({transactions, updateTransactions}) => (
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
              <TransactionList style={styles.transactionList} transactions={transactions} navigationCallback={this.navigateToDetailCallback}></TransactionList>
            </View>
          </View> 
        )}
      </TransactionsContext.Consumer>
    );
  }

  navigateToDetailCallback = (transaction : TransactionDetailSchema) => {
    this.props.navigation.navigate('Details', transaction);
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
