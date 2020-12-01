let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../app')
let expect = chai.expect

chai.use(chaiHttp)

describe('Homepage Server', () => {
    it('returns 200 ok', done => {
        chai.request(server)
          .get('/')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            //console.log(res.);
            expect(res.text.includes('Cineverse')).to.equal(true);
            expect(res.text.includes('Create New\n')).to.equal(true);
            done()
          })
      })
})