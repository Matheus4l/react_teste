import axios from 'axios';

const apiStarWars = axios.create({baseURL:'https://swapi.co/api/'});

export default apiStarWars;