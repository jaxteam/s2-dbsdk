
import { Connection } from 'any-db'
import {getCatalogsJdbc, getColumnsJdbc, getConnectionJdbc, getDatabaseOrJdbcInfoJdbc, getMaxInfoJdbc, getMetadataJdbc, getSchemaJdbc, getTablesJdbc, getTableTypesJdbc, queryJdbc} from './jdbc'


export async function execultSql(url:string,sql:string,params:any){
    const conn = await getConnectionJdbc(url)
    return queryJdbc(conn,sql,params)
}

export async function databaseOrJdbcInfo(url:string){
    const conn =await getConnectionJdbc(url)
    const metadata = await getMetadataJdbc(conn)
    return getDatabaseOrJdbcInfoJdbc(metadata)
}

export async function getCatalogs(url:string, catalogs: string = ""){
    const conn =await getConnectionJdbc(url)
    const metadata = await getMetadataJdbc(conn)
    return getCatalogsJdbc(metadata)
}

export async function getSchema(url:string, catalogs: string = "", schemaPattern: string = "%"){
    const conn =await getConnectionJdbc(url)
    const metadata = await getMetadataJdbc(conn)
    return getSchemaJdbc(metadata,catalogs,schemaPattern)
}

export async function getTables(url: string, catalog: string = '', schemaPattern: string = "%", tableNamePattern: string = "%", types: string = ""){
    const conn =await getConnectionJdbc(url)
    const metadata = await getMetadataJdbc(conn)
    return getTablesJdbc(metadata,catalog,schemaPattern,tableNamePattern,types)
}

export async function getColumns(url: string, catalog: string = '', schemaPattern: string = "%", tableNamePattern: string = "%", columnNamePattern: string = "%"){
    const conn =await getConnectionJdbc(url)
    const metadata = await getMetadataJdbc(conn)
    return getColumnsJdbc(metadata,catalog,schemaPattern,tableNamePattern,columnNamePattern)
}

export async function getTableTypes(url:string){
    const conn =await getConnectionJdbc(url)
    const metadata = await getMetadataJdbc(conn)
    return getTableTypesJdbc(metadata)
}


export async function getMaxInfo(url:string){
    const conn =await getConnectionJdbc(url)
    const metadata = await getMetadataJdbc(conn)
    return getMaxInfoJdbc(metadata)
}


export async function getDatabaseOrJdbcInfo(url:string){
    const conn =await getConnectionJdbc(url)
    const metadata = await getMetadataJdbc(conn)
    return getDatabaseOrJdbcInfoJdbc(metadata)
}


// export async function 

