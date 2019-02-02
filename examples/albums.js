import SpotifyWrapper from '../src/index';
// eslint-disable-next-line import/no-extraneous-dependencies
global.fetch = require('node-fetch');

const spotify = new SpotifyWrapper({
  token: 'BQBARlSy2Y5_8o6l28b_j_633L7ZK10_LN4nrrVXrrnyYl0OfvoQk5oGtp_MY1SBvc1qkQAvuNQJ2AUhJBEpVDa7OesaHR-X7ZvIBNP4pCuJot7CpKsSGvmgVmjGMokxlkTRqDTp8ngCX9SweNdzaK_FI6kqykEnVQ',
});

const albums = spotify.search.tracks('Charlie brown jr');

albums.then(data => data.tracks.items.map(item => console.log(item.name)));
