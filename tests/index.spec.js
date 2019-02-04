/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* global describe global it */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Spotify from '../src/index';

global.fetch = require('node-fetch');

chai.use(sinonChai);

describe('Spotify Library', () => {
  it('should create on instace of Spotify', () => {
    const spotify = new Spotify({});
    expect(spotify).to.be.an.instanceof(Spotify);
  });

  it('should receive apiURL as on option', () => {
    const spotify = new Spotify({
      apiURL: 'foo',
    });

    expect(spotify.apiURL).to.be.equal('foo');
  });

  it('should use the default apiURL ir not provided', () => {
    const spotify = new Spotify({});
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('should receive token as on option', () => {
    const spotify = new Spotify({
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
      const spotify = new Spotify({});
      expect(spotify.request).to.exist;
      expect(spotify.request).to.be.a('function');
    });

    it('should call fetch when request', () => {
      const spotify = new Spotify({});
      spotify.request();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with right url passed', () => {
      const spotify = new Spotify({
        token: 'bar',
      });

      spotify.request('url');
      expect(fetchedStub).to.have.been.calledWith('url');
    });

    it('should call fetch with right headers passed', () => {
      const spotify = new Spotify({
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
