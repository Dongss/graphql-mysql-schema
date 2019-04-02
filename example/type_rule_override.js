const mysqlGQL = require('../lib/schema');

const overrideRules = {
    varchar: 'my-type',
};

async function main() {
    let r = await mysqlGQL({
        host: '10.110.3.218',
        port: 3306,
        user: "root",
        password: 'admin.nio',
        database: 'pulse'
    }, {
        tableName: 't2',
        genRule: overrideRules
    });
    
    console.log(r);
}

main();