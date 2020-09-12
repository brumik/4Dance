/* eslint-disable camelcase */
let token = null;
let url = null;

const headers = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
});

const headersNoAuth = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const setToken = newToken => {
  token = newToken;
};

const setURL = newURL => {
  url = newURL;
};

const getRegistrations = (userId) => {
  const endpoint = `/wp-json/esr-api/v1/students/${userId}/registrations`;

  return fetch(url + endpoint, { headers: headers() });
};

const getAvaiableOffers = (userId) => {
  const endpoint = `/wp-json/esr-api/v1/offers/?user_id=${userId}`;

  return fetch(url + endpoint, { headers: headers() }).then(response => response.json());
};

const getMyTakenOffers = (userId) => {
  const endpoint = `/wp-json/esr-api/v1/students/${userId}/offers/taken`;

  return fetch(url + endpoint, { headers: headers() });
};

const getMyOffers = (userId) => {
  const endpoint = `/wp-json/esr-api/v1/students/${userId}/offers`;

  return fetch(url + endpoint, { headers: headers() });
};

const createOffer = (registration_id, user_id, lesson_date, note) => {
  const endpoint = '/wp-json/esr-api/v1/offers';

  return fetch(url + endpoint, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ registration_id, user_id, lesson_date, note })
  });
};

const deleteOffer = (offerId, user_id) => {
  const endpoint = `/wp-json/esr-api/v1/offers/${offerId}`;

  return fetch(url + endpoint, {
    method: 'DELETE',
    headers: headers(),
    body: JSON.stringify({ user_id })
  });
};

const acceptOffer = (offerId, user_id) => {
  const endpoint = `/wp-json/esr-api/v1/offers/${offerId}/accept`;

  return fetch(url + endpoint, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ user_id })
  });
};

// Undo acceptOffer
const rejectOffer = (offerId, user_id) => {
  const endpoint = `/wp-json/esr-api/v1/offers/${offerId}/reject`;

  return fetch(url + endpoint, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ user_id })
  });
};

const signIn = ({ email, password }) => {
  const endpoint = '/wp-json/esr-api/v1/authentication/token';

  return fetch(url + endpoint, {
    method: 'POST',
    headers: headersNoAuth,
    body: JSON.stringify({
      username: email,
      password
    })
  })
  .then(response => response.json());
};

export default ({
  setToken,
  setURL,
  signIn,
  getAvaiableOffers,
  getMyTakenOffers,
  getRegistrations,
  createOffer,
  deleteOffer,
  getMyOffers,
  acceptOffer,
  rejectOffer
});
