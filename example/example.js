const mysqlGQL = require('../lib/schema');

const TypeMap = {
    varchar: 'String',
    char: 'String',
    tinytext: 'String',
    text: 'String',
    mediumtext: 'String',
    longtext: 'String',
    int: 'Int',
    tinyint: 'Int',
    smallint: 'Int',
    mediumint: 'Int',
    bigint: 'Int',
    float: 'Float',
    double: 'Float',
    real: 'Float',
    decimal: 'Float',
    date: 'String',
    time: 'String',
    datetime: 'String',
    timestamp: 'String',
    year: 'String',
};

function genType(input) {
    let gType = TypeMap.hasOwnProperty(input) ? TypeMap[input] : 'UNKNOWN';
    return gType;
}

async function main() {
    let r = await mysqlGQL({
        host: '127.0.0.1',
        port: 3306,
        user: "root",
        password: 'pwd',
        database: 'db'
    }, {
        tableName: 't2',
        genFn: genType
    });
    
    console.log(r);
}

main();