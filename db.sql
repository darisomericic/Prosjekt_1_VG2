create table Lokasjon (
    id int AUTO_INCREMENT PRIMARY KEY,
    Land VARCHAR(100),
    Byen VARCHAR(100)
);

create table Vær_data (
     id int AUTO_INCREMENT PRIMARY KEY,
     lokasjon_id int,
     dato datetime, 
     temperatur decimal(5,2)
     foreign key (lokasjon_id) references lokasjon(id)
);