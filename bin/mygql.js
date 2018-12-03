#!/usr/bin/env node

const program = require('commander');
const mysqlGQL = require('../lib/schema')

program
    .version('0.1.5')
    .usage('[option s] <tablename ...>')
    .option('-H, --host [value]', 'Mysql host')
    .option('-P, --port [value]', 'Mysql port')
    .option('-U, --user [value]', 'Mysql user')
    .option('-p, --pwd [value]', 'Mysql password')
    .option('-D, --database [value]', 'Mysql database')
    .parse(process.argv);

function main(params) {
    mysqlGQL({
        host: program.host,
        port: program.port,
        user: program.user,
        password: program.pwd,
        database: program.database
    }, {
        tableName: program.args[0]
    }).then(v => {
        console.log(v);
    })
}

if (!program.args.length) {
    program.help();
} else {
    main();
}