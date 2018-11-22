DROP DATABASE zillower;
CREATE DATABASE zillower;

\c zillower;

CREATE TABLE IF NOT EXISTS mortgage(
  id SERIAL PRIMARY KEY,
  street CHAR(80) CONSTRAINT unique_name UNIQUE,
  home_price INT NOT NULL,
  property_tax INT NOT NULL,
  home_insurance INT NOT NULL,
  hoa_dues INT NOT NULL
)

\COPY mortgage FROM 'database/postgreSQL/idStreetPriceData.tsv' DELIMITER '\t';

-- psql postgres <database/postgreSQL/postgreSchema.sql
-- CREATE INDEX id ON mortgage (id);