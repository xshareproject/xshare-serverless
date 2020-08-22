import * as React from 'react';
import { SearchBar, ListItem } from 'react-native-elements';
import {View} from './Themed';
import {StyleSheet} from 'react-native';
import { ContactSchema, Contacts, ContactsContext } from '../data_store/Contacts';
import { EditableContext } from '../data_store/EditableContext';
interface SearchState{
    search: string,
    contactList: ContactSchema[]
}

interface SearchProps{
    contactList: ContactSchema[],
    onSubmitCallback: () => void
}

export class EditableContactList extends React.Component<SearchProps, SearchState>{
    constructor(props : SearchProps){
        super(props);
        this.state = {
          search: "",
          contactList: props.contactList,
        };
    }

    updateSearch = (search : string) => {
        this.setState({ search }, () => {
            this.setState({
                contactList: this.state.search === "" ? [] : this.context.getContactByName(search)
            })
        });
    }

    render(){
        const search = this.state.search;
        const contactList : ContactSchema[] = this.state.contactList;
        return(
            <View>
                <EditableContext.Consumer>
                { (editable) => (
                    <SearchBar placeholder="Search for contact"
                    onChangeText={this.updateSearch}
                    value={search}
                    containerStyle={editable? styles.displayShow : styles.displayHide }/>
                )}
                </EditableContext.Consumer>
                {contactList.map((contact) => (
                    <ListItem
                        title={contact.name}
                        onPress={ () => console.log("Contact Pressed")}
                        key={contact.id}
                    />    
                ))
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    displayShow: {
        flex: 1,
    },
    displayHide: {
        display: "none"
    }
});

EditableContactList.contextType = ContactsContext;
EditableContactList.contextType = EditableContext;