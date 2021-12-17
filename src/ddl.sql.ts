
/**
 *  创建新模式
 * @param schemaName 
 * @param roles 
 * @returns 
 */

function createSchema(schemaName:string,roles?:string[]){
    if(roles?.length==0){
        return `CREATE SCHEMA ${schemaName} ; `
    }else{
        return `CREATE SCHEMA ${schemaName} AUTHORIZATION "${roles.join(",")}"; ` 
    }
}

/**
 * 删除指定模式
 * @param schemaName 
 * @returns 
 */
function dropSchema(schemaName:string){
    return `DROP SCHEMA ${schemaName}`
}

type ObjectType = 'SCHMEA' | 'TABLE' |'INDEX'| 'TRIGGER'

function createDDL(type:ObjectType,name:string){
    return `CREATE ${type} ${name}`
}


