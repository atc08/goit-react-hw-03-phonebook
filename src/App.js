import { Component } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = addedContact => {
    this.setState(({ contacts }) => ({
      contacts: [addedContact, ...contacts],
    }));
  };

  handleCheckUniqueContact = number => {
    const { contacts } = this.state;
    const isExistContact = !!contacts.find(
      contact => contact.number === number,
    );
    isExistContact && alert('You have such contact');
    return !isExistContact;
  };

  handleDeleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContact = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const { filter } = this.state;
    const filterContacts = this.getFilteredContact();

    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactForm
          onAdd={this.handleAddContact}
          onCheckUniqueContact={this.handleCheckUniqueContact}
        />

        <h2>Contacts</h2>
        <Filter filter={filter} onchangeFilter={this.handleChangeFilter} />
        <ContactList
          contacts={filterContacts}
          ondeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

export default App;
