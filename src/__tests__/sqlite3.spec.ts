import { ResultSet } from 'any-db'
import {addDatasource, deleteDatasource, initSqlite3, listDatasource,updateDatasource} from '../sqlite3'
describe('TEST SQLITE3', () => {
  beforeEach(async function(){
    await initSqlite3('sqlite3:///tmp/sino.db')
  })

  // it('init sqlite3 struct',async function(){
  //   await initSqlite3('sqlite3:///tmp/aa')
  // })

  it('connect sqlite3 add Datasource', (done) => {
    const connect={
      "name":"mysql",
      "comment":"mysql for local",
      "kind":"1",
      "driver":"jdbc:mysql.cy.driver",
      "url":"jdbc:mysql://root@127.0.0.1/mysql",
      "user":"root",
      "password":"root",
      "host":"127.0.0.1",
      "port":"3306",
      "database":"mysql",
      "chartset":"utf-8"
    }
    addDatasource(connect).then((result:ResultSet)=>{
      expect(result.rowCount).toEqual(1)
    }).finally(done)
  })
  

  it('list Datasources',async ()=>{
    
    const rs:ResultSet = await listDatasource()
    console.log(rs)
    expect(rs.rowCount).toEqual(2)
  })

  it("update Datasources with id 1 ",async ()=>{
    const connect={
      "name":"mysql1",
      "comment":"mysql for local1",
      "kind":"1",
      "driver":"jdbc:mysql.cy.driver",
      "url":"jdbc:mysql://root@127.0.0.1/mysql",
      "user":"root",
      "password":"root",
      "host":"127.0.0.1",
      "port":"3306",
      "database":"mysql",
      "chartset":"utf-8"
    }
    const rs:ResultSet = await updateDatasource(connect,1)
    console.log(rs.fields)
    expect(rs.affectedRows).toEqual(1)
  })


  it("delete Datasource id 1",async()=>{
    const rs:ResultSet = await deleteDatasource(1)
    console.log(rs)
    expect(rs.rowCount).toEqual(1)
  })
})