const mysqlGQL = require('../lib/schema');

const overrideRules = {
    varchar: 'my-type',
};

async function main() {
    let r = await mysqlGQL({
        host: '127.0.0.1',
        port: 3306,
        user: "root",
        password: 'pwd',
        database: 'db'
    }, {
        tableName: 't2',
        genRule: overrideRules
    });
    
    console.log(r);
}

main();