# graphql-mysql-schema

[![Build Status](https://travis-ci.org/Dongss/graphql-mysql-schema.svg?branch=master)](https://travis-ci.org/Dongss/graphql-mysql-schema)
[![Coverage Status](https://coveralls.io/repos/github/Dongss/graphql-mysql-schema/badge.svg?branch=master)](https://coveralls.io/github/Dongss/graphql-mysql-schema?branch=master)
[![Dependency Status](https://dependencyci.com/github/Dongss/graphql-mysql-schema/badge)](https://dependencyci.com/github/Dongssgraphql-mysql-schema)

Generate mysql table schema to graphql defination

## Require

* Node 7.6 or greater for async/await support

## Usage

`npm install graphql-mysql-schema --save`

```
const mysqlGQL = require('graphql-mysql-schema');

let r = await mysqlGQL({
    host: '127.0.0.1',
    port: 3306,
    user: "myuser",
    password: 'mypwd',
    database: 'db1'
}, {
    tableName: 't1'
});

console.log(r);
```

output:

```
type t2 {
    # comment of c1
    c1: String,
    # comment of c2
    c2: Int,
    c3: String,
    # comment of c4
    c4: Float,
    # comment of c5
    c5: Int,
}
```
default generate rules:

| mysql type | graphql tpye |
| -- | -- |
| varchar | String |
| char | String |
| tinytext | String |
| mediumtext | String |
| longtext | String |
| int | Int |
| tinyint | Int |
| smallint | Int |
| mediumint | Int |
| bigint | Int |
| float | Float |
| double | Float |
| real | Float |
| decimal | Float |
| date | String |
| time | String |
| datetime | String |
| timestamp | String |
| year | String |
| `Others` | UNKOWN |

### Options

`mysqlGQL(mysqlOpt, options)`

mysqlOpt: [reference](https://github.com/mysqljs/mysql#connection-options)

options:

* tableName: `string`, name of mysql table. required
* genFn: `function`, rule of generating columns, user-defined rule. optional

genFn example:

```
const TypeMap = {
    varchar: 'String',
    char: 'String',
    tinytext: 'String',
    text: 'String',
    // ...
};

// input: string, column type in mysql
function genType(input) {
    let gType = TypeMap.hasOwnProperty(input) ? TypeMap[input] : 'UNKOWN';
    return gType;
}

mysqlGQL({
    host: '127.0.0.1',
    port: 3306,
    user: "myuser",
    password: 'mypwd',
    database: 'db1'
}, {
    tableName: 't2',
    genFn: genType
});
```

## CLI

`npm install graphql-mysql-schema --g`

`mygql -H 127.0.0.1 -P 3306 -U root -p admin.nio -D pulse t2`

output:

```
type t2 {
    # comment of c1
    c1: String,
    # comment of c2
    c2: Int,
    c3: String,
    # comment of c4
    c4: Float,
    # comment of c5
    c5: Int,
}
```

options:

```
Usage: mygql [options] <tablename ...>

Options:
  -V, --version           output the version number
  -H, --host [value]      Mysql host
  -P, --port [value]      Mysql port
  -U, --user [value]      Mysql user
  -p, --pwd [value]       Mysql password
  -D, --database [value]  Mysql database
  -h, --help              output usage information
```


## Test

`npm test`