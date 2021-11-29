//@ts-ignore
import { Connection } from 'any-db';
//@ts-ignore
import * as  anyDBJDBC from 'any-db-jdbc'
import { DriverConfig, getCatalogs, getConnection, getMetadata, getSchema, getTables } from "../jdbc";
import { registerDriver } from "../jdbc"
import path from 'path'

describe('jdbc test', () => {
  var config: DriverConfig = {
    libpath: path.resolve(__dirname, './drivers/Dm7JdbcDriver18-7.6.0.jar'),
    drivername: 'dm.jdbc.driver.DmDriver',
    url: 'jdbc:dm://192.168.3.128:5237',
    user: 'SYSAUDITOR',
    password: 'SYSAUDITOR',
    properties: {
      user: 'SYSAUDITOR',
      password: 'SYSAUDITOR'
    }
  };

  beforeAll(function(){
    registerDriver(config)
  })
  it('jdbc registerDriver', () => {

   
    expect(anyDBJDBC.configs).toHaveProperty("jdbcmysqllocalhost3306mysql", config)
  })

  it('jdbc geConnection', async () => {
    const conn = await getConnection(config.url)
    expect(conn).toHaveProperty("config",config)
  })

  it('jdbc get Metadata',async ()=>{
    const conn = await getConnection(config.url)
    const dbmd = await getMetadata(conn)
    expect(dbmd).toBeDefined()
  })

  it('jdbc getSchema',async function(){
    const conn = await getConnection(config.url)
    const dbmd = await getMetadata(conn)
    const schema = await getSchema(dbmd)
    expect(schema.length).toBe(5)
  })
  it('jdbc getSchema with params',async function(){
    const conn = await getConnection(config.url)
    const dbmd = await getMetadata(conn)
    const schema = await getSchema(dbmd,"","SYSDBA")
    console.log(schema) 
    expect(schema.length).toBe(1)
  })

  it('jdbc get Catalogs',async function(){
    const conn = await getConnection(config.url)
    const dbmd = await getMetadata(conn)
    const catalogs = await getCatalogs(dbmd) 
    expect(catalogs).toEqual([])
  })

  it('jdbc get Tables',async function(){
    const conn = await getConnection(config.url)
    const dbmd = await getMetadata(conn)
    const tables = await getTables(dbmd,'','SYSDBA','%','') 
    expect(tables).toBeTruthy() 
  })


  it('jdbc get columns',async function() {
    const conn = await getConnection(config.url)
    const dbmd = await getMetadata(conn)
    const columns = await getTables(dbmd,'','SYSDBA','DDD','%')  
    expect(columns).toBeTruthy()
  })
})