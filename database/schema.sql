DROP DATABASE IF EXISTS zillower;
CREATE DATABASE IF NOT EXISTS zillower;

USE zillower;

CREATE TABLE IF NOT EXISTS mortgage(
    id INT NOT NULL AUTO_INCREMENT,
    home_price INT NOT NULL,
    property_tax INT NOT NULL,
    home_insurance INT NOT NULL,
    hoa_dues INT NOT NULL,
    PRIMARY KEY (id)
)

-- mysql -u root -p <database/schema.sql
