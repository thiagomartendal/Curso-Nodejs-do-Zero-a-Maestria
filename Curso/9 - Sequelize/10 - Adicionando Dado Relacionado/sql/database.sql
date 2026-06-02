create database nodemysql;

use nodemysql;

create table books(
    id integer primary key not null auto_increment,
    title varchar(255),
    pageqty integer
);