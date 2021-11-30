import { Connection, createConnection } from 'any-db';
//@ts-ignore
import * as  anyDBJDBC from 'any-db-jdbc'
//@ts-ignore
import ResultSet from 'jdbc/lib/resultset';


export interface DriverConfig {
  libpath: string
  url: string
  user: string
  password?: string
  drivername: string
  minpoolsize?: number
  maxpoolsize?: number
  properties: any
}

/**
 * 注册数据源类型驱动信息
 * @param config DriverConfig
 */

export function registerDriver(config: DriverConfig) {
  anyDBJDBC.registerConfig(config)
}

/**
 * 获取连接metadata信息
 * @param {*} connection 
 * @returns Promise
 */

export function getMetadata(connection: any) {
  return new Promise(function (resolve, reject) {
    const conn = connection.connection
    // const metadata = conn.getMetaDataSync()
    // resolve(metadata)
    conn.getMetaData(function (err: Error, metadata: any) {
      if (err) reject(err)
      resolve(metadata)
    })
  })
}

/**
 * 同步方法获取metadata
 * @param {*} connection 
 * @returns metadata
 */

export function getMetadataSync(connection: any) {
  const conn = connection.connection
  return conn.getMetaDataSync()
}

/**
 * 创建新连接信息
 * @param {*} anyDb 
 * @param {*} url 
 * @returns Promise
 */

export function getConnection(url: string) {
  return new Promise(function (resolve, reject) {
    createConnection(url, function (err: Error, connection: Connection) {
      if (err) reject(err)
      resolve(connection)
    })
  })
}


/**
 * 获取表信息
 * @param metadata 
 * @returns 
 */

export function getMaxInfo(metadata: any) {
  const maxConfig = {
    "getMaxTablesInSelect": metadata.getMaxTablesInSelectSync(),
    "getMaxUserNameLength": metadata.getMaxUserNameLengthSync(),
    "getMaxTableNameLength": metadata.getMaxTableNameLengthSync(),
    "getMaxStatements": metadata.getMaxStatementsSync(),
    "getMaxStatementLength": metadata.getMaxStatementLengthSync(),
    "getMaxSchemaNameLength": metadata.getMaxSchemaNameLengthSync(),
    "getMaxRowSize": metadata.getMaxRowSizeSync(),
    "getMaxProcedureNameLength": metadata.getMaxProcedureNameLengthSync(),
    "getMaxCursorNameLength": metadata.getMaxCursorNameLengthSync(),
    "getMaxConnections": metadata.getMaxConnectionsSync(),
    "getMaxColumnsInTable": metadata.getMaxColumnsInTableSync(),
    "getMaxColumnsInSelect": metadata.getMaxColumnsInSelectSync(),
    "getMaxColumnsInOrderBy": metadata.getMaxColumnsInOrderBySync(),
    "getMaxColumnsInIndex": metadata.getMaxColumnsInIndexSync(),
    "getMaxColumnsInGroupBy": metadata.getMaxColumnsInGroupBySync(),
    "getMaxColumnNameLength": metadata.getMaxColumnNameLengthSync(),
    "getMaxCharLiteralLength": metadata.getMaxCharLiteralLengthSync(),
    "getMaxCatalogNameLength": metadata.getMaxCatalogNameLengthSync(),
    "getMaxBinaryLiteralLength": metadata.getMaxBinaryLiteralLengthSync(), 
    "getExtraNameCharacters": metadata.getExtraNameCharactersSync(),
    "getDefaultTransactionIsolation": metadata.getDefaultTransactionIsolationSync(),
    "allTablesAreSelectable": metadata.allTablesAreSelectableSync(),
    "allProceduresAreCallable": metadata.allProceduresAreCallableSync(),
    "autoCommitFailureClosesAllResultSets": metadata.autoCommitFailureClosesAllResultSetsSync(),
    "dataDefinitionCausesTransactionCommit": metadata.dataDefinitionCausesTransactionCommitSync(),
    "dataDefinitionIgnoredInTransactions": metadata.dataDefinitionIgnoredInTransactionsSync(),
    "doesMaxRowSizeIncludeBlobs": metadata.doesMaxRowSizeIncludeBlobsSync(),
  }
  return maxConfig
}

/**
 * 获取JDBC信息和数据库信息
 * @param metadata 
 * @returns 
 */

export function getDatabaseOrJdbcInfo(metadata: any){
  return {
    "getJDBCMinorVersion": metadata.getJDBCMinorVersionSync(),
    "getJDBCMajorVersion": metadata.getJDBCMajorVersionSync(),
    "getDriverVersion": metadata.getDriverVersionSync(),
    "getDriverName": metadata.getDriverNameSync(),
    "getDriverMinorVersion": metadata.getDriverMinorVersionSync(),
    "getDriverMajorVersion": metadata.getDriverMajorVersionSync(),
    "getDatabaseProductVersion": metadata.getDatabaseProductVersionSync(),
    "getDatabaseProductName": metadata.getDatabaseProductNameSync(),
    "getDatabaseMinorVersion": metadata.getDatabaseMinorVersionSync(),
    "getDatabaseMajorVersion": metadata.getDatabaseMajorVersionSync()
  }
}


export function resultSetToArray(err: Error, resultset: any): Promise<[]> {
  return new Promise(function (resolve, reject) {
    if (err) reject(err)
    const rs = new ResultSet(resultset)
    rs.toObjArray(function (err: Error, array: any) {
      if (err) reject(err)
      resolve(array)
    })
  })
}

/**
 * 获取 schema 信息
 * 
 * @param metadata 
 * @param catalogs 
 * @param schemaPattern 
 * @returns 
 * [ { TABLE_SCHEM: 'SYSDBA', TABLE_CATALOG: '' } ]
 */

export function getSchema<T>(metadata: any, catalogs: string = "", schemaPattern: string = "%"): Promise<T[]> {
  return new Promise(function (resolve, reject) {
    metadata.getSchemas(catalogs, schemaPattern, function (err: Error, resultSet: any) {
      if (err) reject(err)
      resultSetToArray(err, resultSet).then(function (array) {
        resolve(array)
      }).catch(function (err) {
        reject(err)
      })
    })
  })
}

/**
 * 获取 catalogs
 * @param metadata 
 * @returns 
 * 
 *   []
 */

export function getCatalogs<T>(metadata: any): Promise<T[]> {
  return new Promise(function (resolve, reject) {
    metadata.getCatalogs(function (err: Error, resultSet: any) {
      if (err) reject(err)
      resultSetToArray(err, resultSet).then(function (array) {
        resolve(array)
      }).catch(function (err) {
        reject(err)
      })
    })
  })
}


/**
 * 获取表类型数据
 * @param metadata 
 * @returns 
 * 
 * [
      { TABLE_TYPE: 'SYSTEM TABLE' },
      { TABLE_TYPE: 'TABLE' },
      { TABLE_TYPE: 'VIEW' }
    ]
 */

export function getTableTypes(metadata:any){
  return new Promise((resolve,reject)=>{
    metadata.getTableTypes(function (err:Error,resultset:ResultSet) {
      if(err) reject(err)
      resultSetToArray(err, resultset).then(function (array) {
        resolve(array)
      }).catch(function (err) {
        reject(err)
      })
    })
  })
}

export function getTablesSync(metadata: any, schema: string) {
  const reusltset = metadata.getTablesSync('', schema, '%', null)
  const rs = new ResultSet(reusltset)
  return rs
}

/**
 * 获取 指定表
 * @param metadata 
 * @param catalog 指定 catalog 
 * @param schemaPattern 匹配schema名称
 * @param tableNamePattern 匹配table名称
 * @param types 指定表类型
 * @returns 
 * 
 * [
      {
        TABLE_CAT: null,
        TABLE_SCHEM: 'SYSDBA',
        TABLE_NAME: 'INDEX33555436',
        TABLE_TYPE: null,
        REMARKS: null,
        TYPE_CAT: null,
        TYPE_SCHEM: null,
        TYPE_NAME: null,
        SELF_REFERENCING_COL_NAME: null,
        REF_GENERATION: null
      },
      {
        TABLE_CAT: null,
        TABLE_SCHEM: 'SYSDBA',
        TABLE_NAME: 'INDEX33555437',
        TABLE_TYPE: null,
        REMARKS: null,
        TYPE_CAT: null,
        TYPE_SCHEM: null,
        TYPE_NAME: null,
        SELF_REFERENCING_COL_NAME: null,
        REF_GENERATION: null
      }
    ]
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

export function getTables<T>(metadata: any, catalog: string = '', schemaPattern: string = "%", tableNamePattern: string = "%", types: string = ""): Promise<T[]> {
  return new Promise(function (resolve, reject) {
    metadata.getTables(catalog, schemaPattern, tableNamePattern, undefined, function (err: Error, resultSet: any) {
      if (err) reject(err)
      resultSetToArray(err, resultSet).then(function (array) {
        resolve(array)
      }).catch(function (err) {
        reject(err)
      })
    })
  })
}

/**
 * 
 * @param metadata 
 * @param catalog 指定 catalog 
 * @param schemaPattern 匹配schema名称 
 * @param tableNamePattern 匹配table名称 
 * @param columnNamePattern  匹配column名称
 * @returns 
 */

export function getColumns<T>(metadata: any, catalog: string = '', schemaPattern: string = "%", tableNamePattern: string = "%", columnNamePattern: string = "%"): Promise<T[]> {
  return new Promise(function (resolve, reject) {
    metadata.getTables(catalog, schemaPattern, tableNamePattern, columnNamePattern, function (err: Error, resultSet: any) {
      if (err) reject(err)
      resultSetToArray(err, resultSet).then(function (array) {
        resolve(array)
      }).catch(function (err) {
        reject(err)
      })
    })
  })
}
