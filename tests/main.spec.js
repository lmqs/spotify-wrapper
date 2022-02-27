import { search, searchAlbums, searchPlaylists, searchTracks } from '../src/main'
import sinon from 'sinon'
import fetch from 'node-fetch'
import chai, { expect } from 'chai';


global.fetch = fetch;

describe('Spotify Wrapper', () => {

  let fetchStub;
  let promise;
  beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch')
    promise = fetchStub.resolves()
  })
  afterEach(() => {
    fetchStub.restore()
  })

  describe('smoke tests', () => {
    it('should exist the search method', () => {
      expect(search).to.exist
    })
    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist
    })
    it('should exist the searchAlbums method', () => {
      expect(searchPlaylists).to.exist
    })
    it('should exist the searchAlbums method', () => {
      expect(searchTracks).to.exist
    })
  })

  describe('Generic Search', () => {
    it('should call fetch function ', () => {
      search();
      sinon.assert.calledOnce(fetchStub);
    })

    it('should recived the correct url ', () => {
      context('one param', () => {
        search('Incubus', 'artist');
        sinon.assert.calledWith(fetchStub, 'https://api.spotify.com/v1/search?q=Incubus&type=artist');
        search('Incubus', 'album');
        sinon.assert.calledWith(fetchStub, 'https://api.spotify.com/v1/search?q=Incubus&type=album');

      })
      context('two param', () => {
        search('Incubus', ['artist', 'album']);
        sinon.assert.calledWith(fetchStub, 'https://api.spotify.com/v1/search?q=Incubus&type=artist,album');

      })
    })

  })
})
