const mysql = require('mysql');
const TypeMap = require('./type_map');

module.exports = main;

/**
 * Main
 *
 * @param {*} conOpt Mysql connection options: https://github.com/mysqljs/mysql#connection-options
 * @param {*} options
 */
async function main(conOpt, options) {
    let columns = await getColumns(conOpt, options.tableName);
    let f = options.hasOwnProperty('genFn') ? options.genFn : genType;
    if (typeof f !== 'function') {
        throw new Error('genFn must be a function');
    }
    let result = genGQL(options.tableName, columns, f);
    return result;
}
/**
 * Get table columns from mysql 
 *
 * @param {*} conOpt
 * @param {string} tableName
 * @returns
 */
async function getColumns(conOpt, tableName) {
    let connection = mysql.createConnection(conOpt)
    return new Promise((resolve, reject) => {
        connection.query(`SHOW FULL FIELDS FROM ${tableName}`, function (error, results, fields) {
            if (error) {
                connection.end();
                return reject(error);
            }
            connection.end();
            return resolve(results);
        })
    });
}

/**
 * Generate graphql type from mysql type
 *
 * @param {*} input
 * @returns {string} gType
 */
function genType(input) {
    let gType = TypeMap.hasOwnProperty(input) ? TypeMap[input] : 'UNKOWN';
    return gType;
}

function genGQL(tableName, inputs, fn) {
    let gql = `
type ${tableName} {`
    for (let c of inputs) {
        let oType = c.Type.split('(')[0];
        let g = fn(oType);
        if (c.Comment) {
            gql += `
    # ${c.Comment}`
        }
        gql += `
    ${c.Field}: ${g},`
    }
    gql += `
}
`
    return gql;
}

module.exports.__test__ = {
    genType: genType,
    genGQL: genGQL,
    main: main
};