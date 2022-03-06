CREATE DATABASE ankasa_app;

USE DATABASE ankasa_app;

SET GLOBAL time_zone = '+7:00';

CREATE TABLE roles (
    id VARCHAR(64) NOT NULL PRIMARY KEY, 
    role_name VARCHAR(64) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL
);

CREATE TABLE users (
    id VARCHAR(64) NOT NULL PRIMARY KEY, 
    id_role VARCHAR(64) NOT NULL DEFAULT 'user',
    fullname VARCHAR(64) NOT NULL, 
    email VARCHAR(64) NOT NULL, 
    password VARCHAR(100) NOT NULL,
    phone_number VARCHAR(64) NOT NULL DEFAULT '0',
    city VARCHAR(64) NOT NULL DEFAULT 'City',
    address TEXT NOT NULL,
    post_code VARCHAR(64) NOT NULL DEFAULT '000',
    profile_picture VARCHAR(128) NULL,
    status TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (id_role) REFERENCES roles(id)
    ON DELETE RESTRICT
);



