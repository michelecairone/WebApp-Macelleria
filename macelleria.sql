CREATE DATABASE macelleria;

USE macelleria;

CREATE TABLE clients (
id int auto_increment,
name varchar(10) not null,
surname varchar(10) not null,
email varchar(60) unique,
password varchar(80) not null,
address varchar(50) not null,
city varchar(10) not null,
telephone int(10) not null,
admin boolean not null,

PRIMARY KEY (id)
);

INSERT INTO `clients` (`id`, `name`, `surname`, `email`, `password`, `address`, `city`, `telephone`, `admin`) VALUES
(0, 'admin', 'admin', 'admin', 'sha1$61f90645$1$38d4c4dfdac724e0ecbab26da30dccdc0f398f3c', '', '', '', 1);

CREATE TABLE category (
id int auto_increment,
name varchar(20) not null,
PRIMARY KEY (id)
);

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Carne bianca'),
(2, 'Carne rossa'),
(3, 'Preparati');

CREATE TABLE products (
id int auto_increment,
name varchar(50) not null,
price float(10,2) not null,
description varchar(100),
image varchar(30),
id_category int,
PRIMARY KEY (id),
FOREIGN KEY (id_category) REFERENCES category (id)
);

INSERT INTO `products` (`id`, `name`, `price`, `description`, `image`, `id_category`) VALUES
(0, 'Spiedini con Pistacchi', 12.00, 'Ingedienti: maiale, formaggio spalmabile e pistacchi', 'spied_pistacchi.jpg', 3),
(0, 'Cosce di Pollo', 5.50, '', 'cos_pollo.jpg', 1),
(0, 'Hamburger classici', 11.00, '', 'hamburger.jpg', 3),
(0, 'Costata di Vitello', 15.00, '', 'costata_vit.jpg', 2),
(0, 'Hamburger di pollo', 11.00, '', 'hamburger_pollo.jpg', 3),
(0, 'Salsiccia fresca', 7.50, 'Ingredienti: maiale, sale, pepe e finocchietto.', 'salsiccia.jpg', 3),
(0, 'Salsiccia grossa', 7.50, 'Ingredienti: maiale, sale, pepe e finocchietto.', 'salsiccia_grossa.jpg', 3),
(0, 'Salsiccia pasqualora', 9.00, 'Salsiccia essiccata', 'salsiccia_pasq.jpg', 3),
(0, 'Rolle', 12.00, 'Ingredienti: vitello, prosciutto, mozzarella, uova, impasto di spinaci.', 'rolle.jpg', 3),
(0, 'Fette di pollo', 8.00, NULL, 'fet_pollo.jpg', 1),
(0, 'Spiedini al Limone', 12.00, 'Ingedienti: pollo, limone e mollica al limone', 'spied_limone.jpg', 3),
(0, 'Tomahawk', 17.00, NULL, 'tomahawk.jpg', 2),
(0, 'Filetto di manzo', 14.00, NULL, 'filetto_manzo.jpg', 2),
(0, 'Fesa di tacchino', 10.00, NULL, 'fesa.jpg', 1),
(0, 'Pancetta di maiale', 8.00, NULL, 'pancetta.jpg', 2),
(0, 'Fegato', 6.00, NULL, 'fegato.jpg', 2),
(0, 'Tritato', 6.00, NULL, 'tritato.jpg', 2);



CREATE TABLE orders (
id int auto_increment,
id_client int(11),
date_ord datetime not null,
state varchar(30) not null,
total float(10,2) not null,

PRIMARY KEY (id, id_client),
FOREIGN KEY (id_client) references clients(id)
);

CREATE TABLE order_detail (
id_order int,
id_product int,
amount float(10,2) not null,
total float(10,2) not null,
PRIMARY KEY (id_order, id_product),
FOREIGN KEY (id_order) REFERENCES orders (id) ON DELETE CASCADE,
FOREIGN KEY (id_product) REFERENCES products (id) ON DELETE CASCADE
);
