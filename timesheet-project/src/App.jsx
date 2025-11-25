//These are all the necessary imports to link everything to the app component.

import { useState, useEffect } from 'react';
import TimeSheetTable from './TimesheetTable.jsx';
import UserTimesheet from './UserTimesheet.jsx';
import {fetchEntries, createEntry } from './api';

function App() {

//these are the states for entries, and any entries that will be edited (future plan)
const [entries, setEntries] = useState([]);
const [entryToEdit, setEntryToEdit] = useState(null);


//this is the use effect that fetches all entries.
useEffect(() => {
  fetchEntries()
  .then((data) => setEntries(data))
  .catch((err) => {
    console.error('Error fetching entries:', err);
    setEntries([]);
  });
}, []);


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
const updateEntry = (updatedEntry) => {
  setEntries(entries.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry)));
  setEntryToEdit(null);
};

//this will be a future implementation for deleting entries.
const deleteEntry = (id) => {
  setEntries(entries.filter((entry) => entry.id !== id));
};

//this will be a future implementation for editing an entry.
const editEntry = (entry) => {
  setEntryToEdit(entry);
};

  return (
    <div className = "container">
      <h1> Your Personal Timesheet</h1>

      <UserTimesheet onAdd = {addEntry} onUpdate = {updateEntry} entryToEdit = {entryToEdit} />
      <TimeSheetTable entries = {entries} onEdit = {editEntry} onDelete = {deleteEntry} />
    </div>
  )

}

export default App;