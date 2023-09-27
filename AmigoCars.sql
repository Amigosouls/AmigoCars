
  drop table Address;
  select * from Address;
  create table Address(
  id int primary key,
   circlename nvarchar(50),
   regionname nvarchar(50),
   divisionname nvarchar(50),
   officename nvarchar(50),
   pincode int ,
   officetype nvarchar(10),
   delivery nvarchar(50),
   district nvarchar(50),
   statename nvarchar(50)
  )

  create Table Roles(
  roleId int primary key identity(1,1),
  roleName varchar(10)
  );

  insert into Roles values('User'),('Admin'),('SuperAdmin');


  create Table Users(
  userId int primary key identity(1,1),
  userName nvarchar(30),
  userEmail nvarchar(50),
  password varchar(max),
  roleId int default 1 references Roles(roleId) on update set default on delete set default,
  userAddress int default 1 references Address(id) on update set default on delete set default ,
  isDeleted bit default 0,
  lastLogin datetime default getDate(),
  img nvarchar(max)
  );
  drop table users;
  select * from Users;
  delete from Users;

 select * from Rto;

 alter table Rto add rtoId int primary key identity(1,1);

 create table CarsData (
 carId int primary key,
 make varchar(50),
 model varchar(50),
 variant varchar(50),
 price float,
 fuelType nvarchar(20)
 )

 drop table CarsData;
