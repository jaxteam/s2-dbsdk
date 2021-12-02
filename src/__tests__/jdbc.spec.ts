//@ts-ignore
import { Connection } from 'any-db';
//@ts-ignore
import * as  anyDBJDBC from 'any-db-jdbc'
import { DriverConfig, getCatalogsJdbc, getConnectionJdbc, getMetadataJdbc, getSchemaJdbc, getTablesJdbc, getTableTypesJdbc } from "../jdbc";
import { registerDriverJdbc } from "../jdbc"
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
    registerDriverJdbc(config)
  })
  it.skip('jdbc registerDriver111', () => {
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
})