//this is the base URL for the API endpoints.
const BASE = 'http://localhost:3000/api/entries';


//This is the function that fetches all the available entries.
export async function fetchEntries() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Failed to fetch entries');
  return res.json();
}


//this function creates a new entry with a POST request to the server.
export async function createEntry(entry) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });

  //this checks if the response was successful and then returns the json data.
  if (res.ok) {
    return res.json();
  }

  try {
    const payload = await res.json().catch(() => ({}));
    throw new Error (payload?.error || JSON.stringify(payload));
  } catch (e) {
    //This was used for catching an error, i ended up realizing that line 16, i had it inverted
    //with a !res.ok which made it go into the catch block even on successful requests.
    const txt = await res.text().catch(() => null)
    throw new Error(txt || `Failed to create entry with status ${res.status} ${res.statusText}`);
  }
}