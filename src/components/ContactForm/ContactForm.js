import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE = {
  id: '',
  name: '',
  number: '',
};

class ContactForm extends Component {
  state = INITIAL_STATE;

  handleInputsChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;
    const { onAdd } = this.props;

    const isValidatedForm = this.validatedForm();
    if (!isValidatedForm) return;
    onAdd({ id: uuidv4(), name, number });
    this.resetForm();
  };

  validatedForm = () => {
    const { name, number } = this.state;
    const { onCheckUniqueContact } = this.props;
    if (!name || !number) {
      alert('Please enter name and phone number');
      return false;
    }
    return onCheckUniqueContact(number);
  };

  resetForm = () => {
    this.setState(INITIAL_STATE);
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter name"
            onChange={this.handleInputsChange}
          ></input>
        </label>
        <label>
          Phone number
          <input
            type="tel"
            name="number"
            value={number}
            placeholder="Enter phone number"
            onChange={this.handleInputsChange}
          ></input>
        </label>

        <button type="submit">Add contact</button>
      </form>
    );
  }
}

export default ContactForm;
