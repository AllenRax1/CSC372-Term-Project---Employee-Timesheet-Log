//this is the base URL for the API endpoints.
const BASE = 'http://localhost:3000';
const ENTRIES_URL = `${BASE}/api/entries`;
const AUTH_URL = `${BASE}/api/auth`;
const QUOTES_URL = `${BASE}/api/quotes`;

// Authentication functions
export async function register(username, password) {
  const res = await fetch(`${AUTH_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Registration failed');
  }
  return res.json();
}

export async function login(username, password) {
  const res = await fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Login failed');
  }
  return res.json();
}

export async function logout() {
  const res = await fetch(`${AUTH_URL}/logout`, {
    method: 'POST',
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Logout failed');
  return res.json();
}

export async function getCurrentUser() {
  const res = await fetch(`${AUTH_URL}/user`, {
    credentials: 'include'
  });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchQuote() {
  const res = await fetch(QUOTES_URL);
  if (!res.ok) throw new Error('Failed to fetch quote');
  return res.json();
}

//This is the function that fetches all the available entries.
export async function fetchEntries() {
  const res = await fetch(ENTRIES_URL, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Failed to fetch entries');
  return res.json();
}


//this function creates a new entry with a POST request to the server.
export async function createEntry(entry) {
  const res = await fetch(ENTRIES_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
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

//this function updates an existing entry with a PUT request
export async function updateEntry(id, entry) {
  const res = await fetch(`${ENTRIES_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(entry),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to update entry');
  }

  return res.json();
}

//this function deletes an entry with a DELETE request
export async function deleteEntry(id) {
  const res = await fetch(`${ENTRIES_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to delete entry');
  }

  return res.json();
}