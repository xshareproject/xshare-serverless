import * as React from 'react';
import { StyleSheet} from 'react-native';
import { Text, View } from '../components/Themed';
import { Button, Icon, Overlay } from 'react-native-elements';
import NewTransaction from '../components/transactions/NewTransaction';

interface HomeScreenState {
  transactionViewVisible: boolean
}
interface HomeScreenProps {

}

export default class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState>{
    constructor(props){
      super(props);
      this.state = {
        transactionViewVisible: false
      }
    }

    toggleNewTransaction(){
      this.setState({
        transactionViewVisible: !this.state.transactionViewVisible    
      });   
    }
    
    render(){
        console.log('Transaction Visible', this.state.transactionViewVisible);
        return (
            <View style={styles.container}>
              <Button
              icon={
                <Icon
                  name='plus'
                  type='entypo'
                  size={40}
                  color="black"
                />
              }
              type="clear"
              onPress={() => this.toggleNewTransaction()}
              />
              <Overlay isVisible={this.state.transactionViewVisible} onBackdropPress={() => this.toggleNewTransaction()}>
                <NewTransaction></NewTransaction>
              </Overlay>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

});

