-- *********************************************
-- * SQL MySQL generation                      
-- *--------------------------------------------
-- * DB-MAIN version: 11.0.2              
-- * Generator date: Sep 20 2021              
-- * Generation date: Tue Feb 13 17:39:20 2024 
-- * LUN file: /home/ale/uni/ucr/Software Engineering/project/db/CS180.lun 
-- * Schema: Database/SQL 
-- ********************************************* 


-- Database Section
-- ________________ 

create database Database;
use Database;


-- Tables Section
-- _____________ 

create table EXCERCISE (
     id int not null,
     name varchar(256) not null,
     constraint ID_EXCERCISE_ID primary key (id),
     constraint SID_EXCERCISE_ID unique (name));

create table PLAN (
     id int not null,
     start_date date not null,
     end_date date not null,
     user_id int not null,
     constraint ID_PLAN_ID primary key (id));

create table ROUTINE (
     id int not null,
     name varchar(256) not null,
     plan_id int not null,
     constraint ID_ROUTINE_ID primary key (id));

create table ROUTINE_EXCERCISE (
     excercise_id int not null,
     routine_id int not null,
     constraint ID_ROUTINE_EXCERCISE_ID primary key (excercise_id, routine_id));

create table USER (
     id int not null,
     name varchar(64) not null,
     email varchar(64) not null,
     password varchar(64) not null,
     constraint ID_USER_ID primary key (id));

create table WORKOUT (
     id int not null,
     date date not null,
     RTN_id int not null,
     constraint ID_WORKOUT_ID primary key (id));

create table WORKOUT_EXCERCISE (
     excercise_id int not null,
     routine_id int not null,
     workout_id int not null,
     sets int not null,
     reps int not null,
     weight decimal(8,2) not null,
     rest decimal(8,2) not null,
     constraint ID_WORKOUT_EXCERCISE_ID primary key (excercise_id, routine_id, workout_id));


-- Constraints Section
-- ___________________ 

alter table PLAN add constraint FKCREATE_FK
     foreign key (user_id)
     references USER (id);

alter table ROUTINE add constraint FKPLN_RTN_FK
     foreign key (plan_id)
     references PLAN (id);

alter table ROUTINE_EXCERCISE add constraint FKROU_ROU_FK
     foreign key (routine_id)
     references ROUTINE (id);

alter table ROUTINE_EXCERCISE add constraint FKROU_EXC
     foreign key (excercise_id)
     references EXCERCISE (id);

alter table WORKOUT add constraint FKRTN_WOR_FK
     foreign key (RTN_id)
     references ROUTINE (id);

alter table WORKOUT_EXCERCISE add constraint FKWOR_WOR_FK
     foreign key (workout_id)
     references WORKOUT (id);

alter table WORKOUT_EXCERCISE add constraint FKWOR_ROU
     foreign key (excercise_id, routine_id)
     references ROUTINE_EXCERCISE (excercise_id, routine_id);


-- Index Section
-- _____________ 

create unique index ID_EXCERCISE_IND
     on EXCERCISE (id);

create unique index SID_EXCERCISE_IND
     on EXCERCISE (name);

create unique index ID_PLAN_IND
     on PLAN (id);

create index FKCREATE_IND
     on PLAN (user_id);

create unique index ID_ROUTINE_IND
     on ROUTINE (id);

create index FKPLN_RTN_IND
     on ROUTINE (plan_id);

create unique index ID_ROUTINE_EXCERCISE_IND
     on ROUTINE_EXCERCISE (excercise_id, routine_id);

create index FKROU_ROU_IND
     on ROUTINE_EXCERCISE (routine_id);

create unique index ID_USER_IND
     on USER (id);

create unique index ID_WORKOUT_IND
     on WORKOUT (id);

create index FKRTN_WOR_IND
     on WORKOUT (RTN_id);

create unique index ID_WORKOUT_EXCERCISE_IND
     on WORKOUT_EXCERCISE (excercise_id, routine_id, workout_id);

create index FKWOR_WOR_IND
     on WORKOUT_EXCERCISE (workout_id);

