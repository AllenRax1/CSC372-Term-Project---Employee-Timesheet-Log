
//This function displays a list of timesheet entries passed as props from App.jsx.
export default function TimesheetTable({ entries, onEdit, onDelete }) {

    //this if statement displays a message if there are no entries seen.
    if (!entries || entries.length === 0) {
        return <p>No timesheet entries available.</p>;

    }

    //this return statement is the HTML code for the timesheet table.
    return (
        <div>
            <h2> My saved entries</h2>
            <ul className = "log-list">
            
            {entries.map((entry) => (
                <li key = {entry.id} className = "log-entry">
                    <div>
                        <h3>{entry.title}</h3>

                        <p>
                            Date of clock-in: {entry.date}
                        </p>
                        <p>
                        Clock in time: {entry.clockIn}
                        </p>
                        <p>
                        Clock out time: {entry.clockOut}
                        </p>
                        
                    </div>
                    
                    <div>
                        <button onClick = {() => onEdit(entry)}>Edit</button>
                        <button onClick = {() => onDelete(entry.id)}>Delete</button>
                    </div>
                </li>

            ))}
            </ul>
        </div>
    );
}