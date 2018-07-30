import axios from 'axios';

export const createUser = (newUser) => {
  return axios.post('https://final-project-phase.herokuapp.com/api/users', newUser);
};

export const fetchUserByEmail = (email) => {
  return axios.get(`https://final-project-phase.herokuapp.com/api/users/${email}`);
};

export const createJourney = (journey) => {
  return axios.post('https://final-project-phase.herokuapp.com/api/journeys', journey);
};