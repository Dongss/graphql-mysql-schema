const mysql = require('mysql');
const TypeMap = require('./type_map');

module.exports = main;

let override = {};

/**
 * Main
 *
 * @param {*} conOpt Mysql connection options: https://github.com/mysqljs/mysql#connection-options
 * @param {*} options
 */
async function main(conOpt, options) {
    let columns = await getColumns(conOpt, options.tableName);

    if (options.hasOwnProperty('genRule')) {
        if (typeof options.genRule === 'function') {
            return genGQL(options.tableName, columns, options.genRule)
        } else if (typeof options.genRule === 'object') {
            override = options.genRule;
        } else {
            throw new Error('genRule must be a function or object');
        }
    }
    return genGQL(options.tableName, columns, genType);
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
    if (override.hasOwnProperty(input)) {
        gType = override[input] || 'UNKOWN'
    }
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