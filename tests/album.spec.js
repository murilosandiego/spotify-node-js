/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import SpotifyWrapper from '../src/index';

global.fetch = require('node-fetch');

chai.use(sinonChai);

describe('Album', () => {
  let spotify;
  let fetchedStub;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'bar',
    });

    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke tests', () => {
    it('should have getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist;
    });

    it('should have getAlbum method', () => {
      expect(spotify.album.getTracks).to.exist;
    });

    it('should have getAlbums method', () => {
      expect(spotify.album.getAlbums).to.exist;
    });
  });

  describe('getAlBum', () => {
    it('should call fetch method', () => {
      // eslint-disable-next-line no-unused-vars
      const album = spotify.album.getAlbum();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      // eslint-disable-next-line no-unused-vars
      const album = spotify.album.getAlbum('2i6nd4FV6y7K9fln6eelmR');
      expect(fetchedStub).to.have.calledWith('https://api.spotify.com/v1/albums/2i6nd4FV6y7K9fln6eelmR');

      // eslint-disable-next-line no-unused-vars
      const album2 = spotify.album.getAlbum('4OCJTpOLqSgysGY4yBCGhn');
      expect(fetchedStub).to.have.calledWith('https://api.spotify.com/v1/albums/4OCJTpOLqSgysGY4yBCGhn');
    });

    it('should JSON Data from de Promisse', () => {
      const album = spotify.album.getAlbum('4OCJTpOLqSgysGY4yBCGhn');
      album.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      }).catch();
    });
  });

  describe('getTracks', () => {
    it('should call fetch method', () => {
      // eslint-disable-next-line no-unused-vars
      const album = spotify.album.getTracks();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      // eslint-disable-next-line no-unused-vars
      const album = spotify.album.getTracks('2i6nd4FV6y7K9fln6eelmR');
      expect(fetchedStub).to.have.calledWith('https://api.spotify.com/v1/albums/2i6nd4FV6y7K9fln6eelmR/tracks');

      // eslint-disable-next-line no-unused-vars
      const album2 = spotify.album.getTracks('4OCJTpOLqSgysGY4yBCGhn');
      expect(fetchedStub).to.have.calledWith('https://api.spotify.com/v1/albums/4OCJTpOLqSgysGY4yBCGhn/tracks');
    });

    it('should JSON Data from de Promisse', () => {
      const album = spotify.album.getTracks('4OCJTpOLqSgysGY4yBCGhn');

      album.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      }).catch(err => console.log(err));
    });
  });

  describe('getAlBums', () => {
    it('should call fetch method', () => {
      // eslint-disable-next-line no-unused-vars
      const album = spotify.album.getAlbums();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      // eslint-disable-next-line no-unused-vars
      const album = spotify.album.getAlbums('2i6nd4FV6y7K9fln6eelmR');
      expect(fetchedStub).to.have.calledWith('https://api.spotify.com/v1/albums?ids=2i6nd4FV6y7K9fln6eelmR');

      // eslint-disable-next-line no-unused-vars
      const album2 = spotify.album.getAlbums(['2i6nd4FV6y7K9fln6eelmR', '4OCJTpOLqSgysGY4yBCGhn']);
      expect(fetchedStub).to.have
        .calledWith('https://api.spotify.com/v1/albums?ids=2i6nd4FV6y7K9fln6eelmR,4OCJTpOLqSgysGY4yBCGhn');
    });

    it('should JSON Data from de Promisse', () => {
      const album = spotify.album.getAlbums(['4OCJTpOLqSgysGY4yBCGhn', '2i6nd4FV6y7K9fln6eelmR']);
      album.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      }).catch(err => console.log(err));
    });
  });
});
