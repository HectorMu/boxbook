
CREATE DATABASE boxbook;

use boxbook;

create table users (
    id int primary key auto_increment,
    username varchar(100),
    fullname varchar(100),
    email varchar(100),
    password varchar (255),
    country varchar (50),
    city varchar (50),
    yearlyGoal int
);

create table friendship (
	user_first_id int,
    user_second_id int,
    primary key(user_first_id, user_second_id),
    foreign key (user_first_id) references users (id),
    foreign key (user_second_id) references users (id)
);

 create table userBooks(
     id int primary key auto_increment,
     fk_user int,
     isbn varchar (100),
     author varchar(100),
     title varchar (100),
     pages double,
     thumbnail varchar (500),
     publisher varchar (100),
     publishedDate varchar (50),
     status varchar(50),
     score int,
     review varchar (255),
     foreign key (fk_user) references users (id)
 );

 create table UserBooksAdvance(
     id int primary key auto_increment,
     fk_user int,
     fk_book int,
     pagesReaded int,
     commentary varchar(250),
     foreign key (fk_user) references users (id),
     foreign key (fk_book) references userBooks (id)
 );

 create table UsersCatalogCommentaries(
     id int primary key auto_increment,
     fk_visitor int,
     fk_usercatalog int,
     commentary varchar(500),
     foreign key (fk_visitor) references users (id),
     foreign key (fk_usercatalog) references userBooks (id)
 );