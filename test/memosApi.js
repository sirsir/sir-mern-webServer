var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var axios = require("axios")

describe("Memos API", function() {
  describe("Test by Chai: a BDD / TDD assertion library ", function() {
    it('Chai support promise.', function() {
        return expect(Promise.resolve('woof')).to.eventually.equal('woof');
    })
  })

  describe("Server", function() {

    var url = "http://localhost:3010";

    // it('resolves as promised', function() {
    //     return Promise.resolve("woof")
    //         .then(function(m) { expect(m).to.equal('woof'); })
    //         .catch(function(m) { throw new Error('was not supposed to fail'); })
                
    // });

    // it('resolves as promised', function() {
    //     return expect(Promise.resolve('woof')).to.eventually.equal('woof');
    // });

    it("Base Url returns status 200", function() {
      return expect(axios.get(url)
              .then( resp => {        
                  // console.log(resp.status)
                  return resp.status
                }
              )
            ).to.eventually.equal(200);
        // .catch(
        //   e => {throw new Error('was not supposed to fail')}
        // )
        // done()

      // request(url, function(error, response, body) {
      //   expect(response.statusCode).to.equal(200);
      //   done();
      // });
    });

    it("returns the color in hex", function(done) {
      request(url, function(error, response, body) {
        expect(body).to.equal("ffffff");
        done();
      });
    });

  });

  describe("Hex to RGB conversion", function() {
    var url = "http://localhost:3000/hexToRgb?hex=00ff00";

    it("returns status 200", function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it("returns the color in RGB", function(done) {
      request(url, function(error, response, body) {
        expect(body).to.equal("[0,255,0]");
        done();
      });
    });
  });

});

