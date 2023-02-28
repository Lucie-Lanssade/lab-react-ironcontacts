import './App.css';
import contactDB from './contacts.json';
import React, { useState } from 'react';

function App() {
  const [contacts, setContacts] = useState(contactDB.slice(0, 5));

  const handleAddContact = () => {
    const contactsIds = contacts.map((contact) => {
      return contact.id;
    });

    const filteredContacts = contactDB.filter(
      (contact) => !contactsIds.includes(contact.id)
    );
    if (filteredContacts.length === 0) {
      return;
    }
    const randomContact =
      filteredContacts[Math.floor(Math.random() * filteredContacts.length)];
    const copy = [...contacts];

    copy.push(randomContact);
    setContacts(copy);
  };

  const sortByPop = () => {
    const copy = [...contacts];
    copy.sort((a, b) => b.popularity - a.popularity);
    setContacts(copy);
  };

  const sortByName = () => {
    const copy = [...contacts];
    copy.sort((a, b) => a.name.localeCompare(b.name));
    setContacts(copy);
  };

  const deleteById = (contactId) => {
    const newList = contacts.filter((contact) => contact.id !== contactId);
    setContacts(newList);
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <div class="allBtns">
        <button class="btn" onClick={handleAddContact}>
          Add random contact
        </button>
        <button class="btn" onClick={sortByPop}>
          Sort by popularity
        </button>
        <button class="btn" onClick={sortByName}>
          Sort by name
        </button>
      </div>
      <table>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th>Actions</th>
        </tr>

        {contacts.map((contact) => {
          return (
            <tr>
              <td>
                <div class="portaits-container">
                  <img
                    class="portraits"
                    src={contact.pictureUrl}
                    alt={contact.name}
                  ></img>
                </div>
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar && '🏆'}</td>
              <td>{contact.wonEmmy && '🏆'}</td>
              <td>
                <button class="delete" onClick={() => deleteById(contact.id)}>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
