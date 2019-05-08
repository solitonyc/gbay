const baseUrl = "http://localhost:3001";

export const showClub = () => {
  return fetch(`${baseUrl}/clubs`)
    .then(resp => resp.json())
    .catch(e => e)
}

// export const showFlavors = () => {
//   return fetch(`${baseUrl}/flavors`)
//     .then(resp => resp.json())
//     .catch(e => e)
// }

export const showClubItem = (id) => {
  return fetch(`${baseUrl}/clubs/${id}`)
    .then(resp => resp.json())
    .catch(e => e)
}

export const postClub = (item) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  };

  return fetch(`${baseUrl}/clubs/`, opts)
    .then(resp => resp.json())
    .catch(e => e)
}

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

// export const putClubFlavor = (food_id, id) => {
//   const opts = {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${localStorage.getItem('jwt')}`
//     }
//   }

  return fetch(`${baseUrl}/clubs/${club_id}`, opts)
    .then(resp => resp.json())
    .catch(e => e)
}

export const loginUser = (loginData) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify({ auth: loginData }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return fetch(`${baseUrl}/user_token`, opts)
    .then(resp => resp.json())
    .catch(e => e)
}

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






