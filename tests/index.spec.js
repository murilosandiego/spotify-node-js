/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* global describe global it */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import SpotifyWrapper from '../src/index';

global.fetch = require('node-fetch');

chai.use(sinonChai);

describe('SpotifyWrapper Library', () => {
  it('should create on instace of SpotifyWrapper', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceof(SpotifyWrapper);
  });

  it('should receive apiURL as on option', () => {
    const spotify = new SpotifyWrapper({
      apiURL: 'foo',
    });

    expect(spotify.apiURL).to.be.equal('foo');
  });

  it('should use the default apiURL ir not provided', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('should receive token as on option', () => {
    const spotify = new SpotifyWrapper({
      token: 'bar',
    });

    expect(spotify.token).to.be.equal('bar');
  });

  describe('request method', () => {
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.resolves({ json: () => {} });
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('should have request method', () => {
      const spotify = new SpotifyWrapper({});
      expect(spotify.request).to.exist;
      expect(spotify.request).to.be.a('function');
    });

    it('should call fetch when request', () => {
      const spotify = new SpotifyWrapper({});
      spotify.request();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with right url passed', () => {
      const spotify = new SpotifyWrapper({
        token: 'bar',
      });

      spotify.request('url');
      expect(fetchedStub).to.have.been.calledWith('url');
    });

    it('should call fetch with right headers passed', () => {
      const spotify = new SpotifyWrapper({
        token: 'bar',
      });

      const headers = {
        headers: {
          Authorization: `Bearer ${spotify.token}`,
        },
      };

      spotify.request('url');
      expect(fetchedStub).to.have.been.calledWith('url', headers);
    });
  });
});
