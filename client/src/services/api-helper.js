// const baseUrl = "http://gbay-site.herokuapp.com/";
const baseUrl = "http://localhost:3000";


// ----------------- Club Functions -------------
// ----------------- show user clubs ---------------
export const showUserClubs = (id) => {
  return fetch(`${baseUrl}/users/${id}/clubs`)
    .then(resp => resp.json())
    .catch(e => e)
}

// -------------- show user one club --------------
export const showUserClubItem = (user_id, id) => {
  return fetch(`${baseUrl}/users/${user_id}/clubs/${id}`)
  .then(resp => resp.json())
  .catch(e => e)
} 

//---------------- show all clubs --------------
export const showClub = () => {
  return fetch(`${baseUrl}/clubs`)
    .then(resp => resp.json())
    .catch(e => e)
}

// ------------ show one club -------------
export const showClubItem = (id) => {
  return fetch(`${baseUrl}/clubs/${id}`)
    .then(resp => resp.json())
    .catch(e => e)
}

// ------------ give use new club --------------
export const postClub = (user_id, id) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify(id),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  };

  return fetch(`${baseUrl}/users/${user_id}/clubs/${id}`, opts)
    .then(resp => resp.json())
    .catch(e => e)
}
//------------- update existing club -------------------
export const putClub = (item, id) => {
  const opts = {
    method: 'PUT',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  };

  return fetch(`${baseUrl}/clubs/${id}`, opts)
    .then(resp => resp.json())
    .catch(e => e)
}
// ----------------- delete club -----------------------
export const destroyClub = (id) => {
  const opts = {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  }

  return fetch(`${baseUrl}/clubs/${id}`, opts)
    .catch(e => e)
}


// ------------- User Functions --------------------
export const loginUser = (loginData) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return fetch(`${baseUrl}/auth/login`, opts)
    .then(resp => resp.json())
    .catch(e => e)
}

// ----------------- create user --------------
export const registerUser = (registerData) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify({ user: registerData }),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return fetch(`${baseUrl}/users`, opts)
    .then(resp => resp.json())
    .catch(e => e)
}

// -------- Update User  -----------
export const putUser = (id, item) => {
  const opts = {
    method: 'PUT',
    body: JSON.stringify({ user: item}),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  }
  console.log("putopts", opts)
  return fetch(`${baseUrl}/users/${id}`, opts)
    .then(resp => resp.json())
    .then(resp => console.log("resp", resp))
    .catch(e => e)
}

// -------- Delete user ------------
export const destroyUser = (id) => {
  	const opts = {
  		method: 'DELETE',
  		headers: {
  			'Authorization': `Bearer ${localStorage.getItem('jwt')}`
  		}
  	}
  	return fetch(`${baseUrl}/users/${id}`, opts)
  		.catch(e => e)
  }









