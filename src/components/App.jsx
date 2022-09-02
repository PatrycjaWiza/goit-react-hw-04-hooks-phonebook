import { Component } from 'react';
import { Contacts } from './Contacts';
import { Filter } from './Filter';
import { Title } from './Styles';
import { PhoneBookForm } from './PhonebookForm';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  // life cycle mehods
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const storageContacts = JSON.parse(contacts);

    if (storageContacts !== null) {
      this.setState({
        contacts: storageContacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  componentWillUnmount(id) {
    localStorage.removeItem(id);
  }

  // regular methods
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  filterByName = e => {
    const { filter, contacts } = this.state;
    if (filter === '') {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  contactSubmit = values => {
    const { contacts } = this.state;
    const nameArray = contacts.map(contact => {
      return contact.name;
    });
    if (nameArray.includes(values.name)) {
      return alert(`${values.name} is already in contacts.`);
    }
    return this.setState(({ contacts }) => ({
      contacts: [values, ...contacts],
    }));
  };

  toDelete = id => {
    this.componentWillUnmount(id);

    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <PhoneBookForm onSubmit={this.contactSubmit} />
        <Title>Contacts</Title>
        <Filter value={filter} filterByName={this.handleChange} />
        <Contacts filterByName={this.filterByName} toDelete={this.toDelete} />
      </div>
    );
  }
}
