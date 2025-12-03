CREATE TABLE søk_statistikk (
    id INT AUTO_INCREMENT PRIMARY KEY,
    By_navn VARCHAR(255),
    Land_navn VARCHAR(255),
    Antall_ganger_søkt INT NOT NULL DEFAULT 0,
    UNIQUE KEY unik_by_land (By_navn, Land_navn) 
);