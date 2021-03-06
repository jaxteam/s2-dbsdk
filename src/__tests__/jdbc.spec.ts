//@ts-ignore
import { Connection } from 'any-db';
//@ts-ignore
import * as  anyDBJDBC from 'any-db-jdbc'
import { getCatalogsJdbc, getConnectionJdbc, getMetadataJdbc, getSchemaJdbc, getTablesJdbc, getTableTypesJdbc, queryJdbc, useDatabase  } from "../jdbc";
import { registerDriverJdbc } from "../jdbc"
import { DriverConfig } from '../interface';
import path from 'path'
import { execultSql } from '../dbsdk';

describe('jdbc test', () => {
  var config: DriverConfig = {
    libpath: path.resolve(__dirname, './drivers/Dm7JdbcDriver18-7.6.0.jar'),
    drivername: 'dm.jdbc.driver.DmDriver',
    host:"192.168.3.128",
    port:"5237",
    url: 'jdbc:dm://192.168.3.128:5237/SYSDBA',
    user: 'SYSDBA',
    password: 'SYSDBA',
    properties: {
      user: 'SYSDBA',
      password: 'SYSDBA'
    }
  };

  beforeAll(function(){
    registerDriverJdbc(config)
  })
  it('jdbc registerDriver111', () => {
    // console.log(anyDBJDBC.configs)
    expect(anyDBJDBC.configs).toHaveProperty("jdbcdm192.168.3.1285237", {})
  })

  it('jdbc geConnection', async () => {
    const conn = await getConnectionJdbc(config.url)
    expect(conn).toHaveProperty("config",config)
  })

  it('jdbc get Metadata',async ()=>{
    const conn = await getConnectionJdbc(config.url)
    const dbmd = await getMetadataJdbc(conn)
    expect(dbmd).toBeDefined()
  })

  it('jdbc getSchema',async function(){
    const conn = await getConnectionJdbc(config.url)
    const dbmd = await getMetadataJdbc(conn)
    const schema = await getSchemaJdbc(dbmd)
    expect(schema.length).toBe(5)
  })
  it('jdbc getSchema with params',async function(){
    const conn = await getConnectionJdbc(config.url)
    const dbmd = await getMetadataJdbc(conn)
    const schema = await getSchemaJdbc(dbmd,"","SYSDBA")
    console.log("schema",schema) 
    expect(schema.length).toBe(1)
  })

  it('jdbc get Catalogs',async function(){
    const conn = await getConnectionJdbc(config.url)
    const dbmd = await getMetadataJdbc(conn)
    const catalogs = await getCatalogsJdbc(dbmd) 
    console.log(catalogs,catalogs)
    expect(catalogs).toEqual([])
  })

  it('jdbc get Tables',async function(){
    const conn = await getConnectionJdbc(config.url)
    const dbmd = await getMetadataJdbc(conn)
    const tables = await getTablesJdbc(dbmd,'','SYSDBA','%','') 
    // console.log("tables",tables)
    expect(tables).toBeTruthy() 
  })


  it('jdbc get columns',async function() {
    const conn = await getConnectionJdbc(config.url)
    const dbmd = await getMetadataJdbc(conn)
    const columns = await getTablesJdbc(dbmd,'','SYSDBA','DDD','%')  
    expect(columns).toBeTruthy()
  })

  it('jdbc get table types',async function() {
    const conn = await getConnectionJdbc(config.url)
    const dbmd = await getMetadataJdbc(conn)
    const tableTypes = await getTableTypesJdbc(dbmd)  
    console.log("tableTypes",tableTypes)
    // expect(columns).toBeTruthy()
  })

  it("jdbc execute query",function(done){
    const conn = getConnectionJdbc(config.url).then((conn)=>{
      queryJdbc(conn,'select * from "SYSDBA"."DDD"',[]).then(function(result){
        console.log(result)
        // done()
      }).finally(()=>done())
    })
  })


  class JavaError extends Error{
    getMessage(){
      return this.message
    }
    getName(){
      return this.name
    }
  }

  it("jdbc execute query err",function(done){
    const conn = getConnectionJdbc(config.url).then((conn)=>{
      queryJdbc(conn,'select * from "SYS1DBA"."D1DD"',[]).then(function(result){
        console.log(result)
        // done()
      }).catch((err:JavaError)=>{
        //@ts-ignore
        console.log(err.message)
      }).finally(()=>done())
    })
  })

  it('jdbc use database',function(done){
    const conn = getConnectionJdbc(config.url).then((conn)=>{
      useDatabase(conn,"SYSDBA").then(function(result){
        console.log(result)
        // done()
      }).finally(()=>done())
    })
  })


  it('dbsdk jdbc ',async function(){
    const reuslt=await  execultSql("jdbc:dm://192.168.3.128:5237/SYSDBA",'select * from "SYSDBA"."DDD"',[])
    console.log("reuslt",reuslt)
    // done()
  })
  // it("jdbc test connection",function(done){
  //   const conn = getConnectionJdbc("jdbc:dm://192.168.3.128:5237").then((conn)=>{
  //     connectable(conn).then(function(result){
  //       console.log(result)
  //       // done()
  //     }).finally(()=>done())
  //   }) 
  // })


  
})