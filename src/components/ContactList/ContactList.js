import React from 'react';
import s from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactListItem = ({ id, name, number, ondeleteContact }) => {
  return (
    <li className={s.ContactListItem}>
      <p className={s.ContactListItemText}>
        {name}: {number}
      </p>
      <button type="button" onClick={() => ondeleteContact(id)}>
        Delete
      </button>
    </li>
  );
};
const ContactList = ({ contacts, ondeleteContact }) => {
  if (contacts.length === 0) return null;
  return (
    <ul className={s.ContactList}>
      {contacts.map(contact => (
        <ContactListItem
          key={contact.id}
          {...contact}
          ondeleteContact={ondeleteContact}
        />
      ))}
    </ul>
  );
};

ContactListItem.propTypes = {
  ondeleteContact: PropTypes.func,
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  ondeleteContact: PropTypes.func,
};

export default ContactList;
