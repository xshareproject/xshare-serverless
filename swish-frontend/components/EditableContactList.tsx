import * as React from 'react';
import { SearchBar, ListItem } from 'react-native-elements';
import {View} from './Themed';
import { ContactSchema, Contacts, ContactsContext } from '../data_store/Contacts';

interface SearchState{
    search: string,
    contactList: ContactSchema[]
    editable: boolean
}

interface SearchProps{
    contactList: ContactSchema[],
    editable: boolean,
    onSubmitCallback: () => void
}

export class EditableContactList extends React.Component<SearchProps, SearchState>{
    constructor(props : SearchProps){
        super(props);
        this.state = {
          search: "",
          contactList: props.contactList,
          editable: this.props.editable
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
        console.log("STATEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE: ", this.state.editable)
        const search = this.state.search;
        const contactList : ContactSchema[] = this.state.contactList;
        let searchBar;
        if(this.state.editable)
            searchBar = <SearchBar placeholder="Search for contact"
                                    onChangeText={this.updateSearch}
                                    value={search} />
        return(
            <View>
                {searchBar}
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

EditableContactList.contextType = ContactsContext;