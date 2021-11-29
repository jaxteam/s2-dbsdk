import { ResultSet } from 'any-db'
import {addConnection, initSqlite3, listConnection} from '../sqlite3'
describe('TEST SQLITE3', () => {
  beforeEach(async function(){
    await initSqlite3()
  })
  it('connect sqlite3', (done) => {
    addConnection(["mysql","localhost","port"]).then((result:ResultSet)=>{
      // expect(result).toHaveProperty("row")
      expect(result.rowCount).toEqual(1)
    }).finally(done)
  })
  

  it('list connections',async ()=>{
    await addConnection(["mysql","localhost","3306","root","password"]) 
    await addConnection(["oracle","localhost","1521","root","root"]) 
    const rs:ResultSet = await listConnection()
    expect(rs.rowCount).toEqual(2)
    // done()
  })
})