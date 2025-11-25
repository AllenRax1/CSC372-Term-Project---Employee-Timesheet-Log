import {useState, useEffect} from 'react';

//this is the function that allows users to add, or edit(future implementation) entries.
export default function UserTimesheet({onAdd, onUpdate, entryToEdit}) {

    //these are the states for the form inputs.
    const [date, setDate] = useState('');
    const [clockIn, setClockIn] = useState('');
    const [clockOut, setClockOut] = useState('');
    const [title, setTitle] = useState(''); // --- IGNORE ---

    useEffect(() => {
        if (entryToEdit) {
            setDate(entryToEdit.date);
            setClockIn(entryToEdit.clockIn);
            setClockOut(entryToEdit.clockOut);
            setTitle(entryToEdit.title); // --- IGNORE ---
        }
    }, [entryToEdit]);

    //this function handles form submission for adding or updating entries.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const entryData = {date, clockIn, clockOut, title};

        try {
        if (entryToEdit && typeof onUpdate === 'function') {
            await onUpdate({...entryData, id: entryToEdit.id});
        } else {
            await onAdd(entryData);
        }

        setDate('');
        setClockIn('');
        setClockOut('');
        setTitle(''); // --- IGNORE ---
    } catch (err) {
        console.error('Error submitting entry:', err);
    }
    };


    //this return statement is the HTML code for the actual form.
    return (
        <form className = "form" onSubmit = {handleSubmit}>
            <h2>{entryToEdit ? 'Edit your timesheet Entry' : 'Add a Timesheet Entry'}</h2>

            <label>
                Date:
                <input type = "date" value = {date} onChange = {(e) => setDate(e.target.value)} />
            </label>

            <label>
                Clock in:
                <input type = "time" value={clockIn} onChange = {(e) => setClockIn(e.target.value)} />

            </label>

            <label>
                Clock out:
                <input type = "time" value={clockOut} onChange = {(e) => setClockOut(e.target.value)} />


            </label>

            <button type = "submit">{entryToEdit ? 'Update Entry' : 'Add Entry'}</button>

        </form>
    );


}