create database if not exists db_authentication;

use db_authentication;

create table if not exists user(
    id int not null,
    username varchar(16) not null,
    password varchar(60) not null,
    fullname varchar(100) not null
);

alter table users add primary key (id);
alter table users modify column id int auto_increment;



create table if not exists tasks(id_task int not null, id_user int not null, nombre varchar(60) not null, descripcion varchar(100) not null, estado boolean not null);


alter table tasks add constraint foreign key (id_user) references users (id);