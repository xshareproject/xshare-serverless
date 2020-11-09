import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import TransactionList from '../components/transactions/TransactionList';
import { TransactionsContext, TransactionSchema} from '../data_store/Transactions';
import { NavigationProp } from '@react-navigation/native';


//TODO: TransactionProps should be extending from a Props with navigation object
interface TransactionsOverviewProps {
  navigation : NavigationProp<any>
}

interface TransactionsOverviewState {
}

export default class TransactionsOverviewScreen extends React.Component<TransactionsOverviewProps, TransactionsOverviewState>{
  constructor(props : any){
    super(props);
  }  

  componentDidMount(){
    this.props.navigation.addListener('focus', () => {
      console.log("Overview Screen Mounted ");
    });
  }

  render(){
    //getTransactionByLender should take in a value from data store and not hard-coded string
    //change in context here (or to be exact, the transactions object) does not trigger re-rendering of component
    return (
      <TransactionsContext.Consumer>
        {(transactions) => (
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
              <TransactionList style={styles.transactionList} transactions={transactions.getTransactionByLender('0wn3r1e-1578-4be5-87eb-e9211fedd90f')} navigationCallback={this.navigateToDetailCallback}></TransactionList>
            </View>
          </View> 
        )}
      </TransactionsContext.Consumer>
    );
  }

  navigateToDetailCallback = (transaction : TransactionSchema) => {
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
