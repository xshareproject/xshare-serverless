import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import TransactionList from '../components/TransactionList';

//functional component
interface TransactionsProps {
  //user info
}

interface TransactionsState {
  
}

// class Transactions extends React.Component<TransactionsProps, TransactionsState> {
  export default class Transactions extends React.Component{
  constructor(props){
    super(props);
  }

  navigateToDetailCallback = () => {
    this.props.navigation.navigate('Details');
  }

  render(){
    return (
      <View style={styles.container}>
        <View style = {styles.topBar}>
          <Text style={styles.welcomeText}>
            <Text>Welcome </Text>
            <Text style={{ fontWeight: 'bold' }}>Florence!</Text>
          </Text>
          <Text>THIS MONTH'S OWINGS</Text>
          <Text style={{fontSize: 50}}>$150.00</Text> 
        {/* <Button title="Test" onPress={this.navigateToDetailCallback}></Button> */}
        </View>
        <View style = {styles.transactionView}>
          <TransactionList style={styles.transactionList} navigationCallback={this.navigateToDetailCallback}></TransactionList>
        </View>
      </View> 
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
