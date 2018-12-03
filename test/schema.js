const mysqlGQL = require('../lib/schema').__test__;
const test = require('ava');

const TableSchema = [{
    Field: 'c1',
    Type: 'tinyint(1)',
    Collation: null,
    Null: 'YES',
    Key: '',
    Default: null,
    Extra: '',
    Privileges: 'select,insert,update,references',
    Comment: 'comment c1' 
}, {
    Field: 'c2',
    Type: 'varchar(255)',
    Collation: null,
    Null: 'YES',
    Key: '',
    Default: null,
    Extra: '',
    Privileges: 'select,insert,update,references',
    Comment: 'comment c2' 
}];

const gqlStr = `
type t1 {
    # comment c1
    c1: Int,
    # comment c2
    c2: String,
}
`;

test('genType', t => {
    let r = mysqlGQL.genType('varchar');
    t.is(r, 'String');
});

test('genGQL with default function', t => {
    let r = mysqlGQL.genGQL('t1', TableSchema, mysqlGQL.genType);
    t.is(r, gqlStr);
});

test('genGQL with user define function', t => {
    function genType(input) {
        return input + '_';
    }
    let r = mysqlGQL.genGQL('t1', TableSchema, genType);
    let s = `
type t1 {
    # comment c1
    c1: tinyint_,
    # comment c2
    c2: varchar_,
}
`;
    t.is(r, s);
});