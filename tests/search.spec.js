/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import SpotifyWrapper from '../src/index';

global.fetch = require('node-fetch');

chai.use(sinonChai);

describe('Search', () => {
  let spotify;
  let fetchedStub;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });

    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => ({ body: 'json' }) });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  // Smoke tests
  describe('Smoke tests', () => {
    it('should exist the spotify.search.albums method', () => {
      expect(spotify.search.albums).to.exist;
    });
    it('should exist the spotify.search.artists method', () => {
      expect(spotify.search.artists).to.exist;
    });
    it('should exist the spotify.search.tracks method', () => {
      expect(spotify.search.tracks).to.exist;
    });
    it('should exist the spotify.search.playlists method', () => {
      expect(spotify.search.playlists).to.exist;
    });
  });

  describe('spotify.search.artists', () => {
    it('should call fetch function', () => {
      // eslint-disable-next-line no-unused-vars
      const artists = spotify.search.artists('Muse');
      expect(fetchedStub).to.have.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      // eslint-disable-next-line no-unused-vars
      const artists = spotify.search.artists('Muse');
      expect(fetchedStub).to.have.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');

      // eslint-disable-next-line no-unused-vars
      const artists2 = spotify.search.artists('Incubus');
      expect(fetchedStub).to.have.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');
    });
  });

  describe('spotify.search.albums', () => {
    it('should call fetch function', () => {
      // eslint-disable-next-line no-unused-vars
      const albums = spotify.search.albums('Muse');
      expect(fetchedStub).to.have.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      // eslint-disable-next-line no-unused-vars
      const albums = spotify.search.albums('Muse');
      expect(fetchedStub).to.have.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');

      // eslint-disable-next-line no-unused-vars
      const albums2 = spotify.search.albums('Incubus');
      expect(fetchedStub).to.have.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
    });
  });

  describe('spotify.search.tracks', () => {
    it('should call fetch function', () => {
      // eslint-disable-next-line no-unused-vars
      const tracks = spotify.search.tracks('Muse');
      expect(fetchedStub).to.have.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      // eslint-disable-next-line no-unused-vars
      const tracks = spotify.search.tracks('Muse');
      expect(fetchedStub).to.have.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');

      // eslint-disable-next-line no-unused-vars
      const tracks2 = spotify.search.tracks('Incubus');
      expect(fetchedStub).to.have.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track');
    });
  });

  describe('spotify.search.playlists', () => {
    it('should call fetch function', () => {
      // eslint-disable-next-line no-unused-vars
      const playlists = spotify.search.playlists('Muse');
      expect(fetchedStub).to.have.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      // eslint-disable-next-line no-unused-vars
      const playlists = spotify.search.playlists('Muse');
      expect(fetchedStub).to.have.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');

      // eslint-disable-next-line no-unused-vars
      const playlists2 = spotify.search.playlists('Incubus');
      expect(fetchedStub).to.have.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');
    });
  });
});
