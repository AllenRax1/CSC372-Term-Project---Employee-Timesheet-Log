//These are all the necessary imports to link everything to the app component.

import { useState, useEffect } from 'react';
import TimeSheetTable from './TimesheetTable.jsx';
import UserTimesheet from './UserTimesheet.jsx';
import {fetchEntries, createEntry, updateEntry, deleteEntry, getCurrentUser, login, register, logout, fetchQuote } from './api';
import './App.css';

function App() {

//these are the states for entries, and any entries that will be edited (future plan)
const [entries, setEntries] = useState([]);
const [entryToEdit, setEntryToEdit] = useState(null);
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [isRegistering, setIsRegistering] = useState(false);
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [quote, setQuote] = useState(null);

// Check authentication status on load
useEffect(() => {
  getCurrentUser()
    .then((userData) => {
      setUser(userData);
      setLoading(false);
    })
    .catch(() => {
      setUser(null);
      setLoading(false);
    });
}, []);

//this is the use effect that fetches all entries when user is logged in.
useEffect(() => {
  if (user) {
    fetchEntries()
      .then((data) => setEntries(data))
      .catch((err) => {
        console.error('Error fetching entries:', err);
        setEntries([]);
      });
  }
}, [user]);

useEffect(() => {
  if (user) {
    fetchQuote()
      .then((data) => setQuote(data))
      .catch((err) => {
        console.error('Error fetching quote:', err);
        setQuote({ 
          quote: 'Have a great day at work!', 
          author: 'Employee Timesheet',
          category: 'motivational'
        });
      });
  }
}, [user])

const handleLogin = async (e) => {
  e.preventDefault();
  setError('');
  try {
    const userData = await login(username, password);
    setUser(userData);
    setUsername('');
    setPassword('');
  } catch (err) {
    setError(err.message);
  }
};

const handleRegister = async (e) => {
  e.preventDefault();
  setError('');
  try {
    const userData = await register(username, password);
    setUser(userData);
    setUsername('');
    setPassword('');
    setIsRegistering(false);
  } catch (err) {
    setError(err.message);
  }
};

const handleLogout = async () => {
  try {
    await logout();
    setUser(null);
    setEntries([]);
    setQuote(null);
  } catch (err) {
    console.error('Logout error:', err);
  }
};

//this async function adds an entry with the createEntry function from the api.js file.
const addEntry = async (entry) => {
  try {
    const created = await createEntry(entry);
    setEntries((prev) => [created, ...prev]);
    return created;
  } catch (err) {
    console.error('failed to create an entry.', err);
    throw err;

  }
};

//This will be a future implementation for updating entries.
const updateEntryHandler = async (updatedEntry) => {
  try {
    const updated = await updateEntry(updatedEntry.id, {
      date: updatedEntry.date,
      clockIn: updatedEntry.clockIn,
      clockOut: updatedEntry.clockOut
    });
    setEntries(entries.map((entry) => (entry.id === updated.id ? updated : entry)));
    setEntryToEdit(null);
  } catch (err) {
    console.error('Failed to update entry:', err);
    alert('Failed to update entry: ' + err.message);
  }
};

//this will be a future implementation for deleting entries.
const deleteEntryHandler = async (id) => {
  try {
    await deleteEntry(id);
    setEntries(entries.filter((entry) => entry.id !== id));
  } catch (err) {
    console.error('Failed to delete entry:', err);
    alert('Failed to delete entry: ' + err.message);
  }
};

//this will be a future implementation for editing an entry.
const editEntry = (entry) => {
  setEntryToEdit(entry);
};

  if (loading) {
    return (
      <div className="container">
        <h2>Loading...</h2>
      </div>
    );
  }

  // Show login form if not logged in
  if (!user) {
    return (
      <div className="container">
        <h1>Employee Timesheet</h1>
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">
            {isRegistering ? 'Register' : 'Login'}
          </button>
          <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Switch to Login' : 'Switch to Register'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className = "container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Your Personal Timesheet</h1>
        <div>
          <span style={{ marginRight: '1rem' }}>Welcome, {user.username}!</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/*Here is the Quote of the Day Section*/}
      {quote && (
        <div style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
          <blockquote>"{quote.quote}"</blockquote>
          <p>- {quote.author}</p>
        </div>
      )}

      <UserTimesheet onAdd = {addEntry} onUpdate = {updateEntryHandler} entryToEdit = {entryToEdit} />
      <TimeSheetTable entries = {entries} onEdit = {editEntry} onDelete = {deleteEntryHandler} />
    </div>
  )

}

export default App;