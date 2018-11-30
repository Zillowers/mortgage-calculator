USE zillower;

DROP TABLE MORTGAGES;

CREATE TABLE MORTGAGES (
  id INT PRIMARY KEY,
  street VARCHAR,
  home_price INT,
  property_tax INT,
  home_insurance INT,
  hoa_dues INT,
);

COPY MORTGAGES (id,street,home_price,property_tax,home_insurance,hoa_dues) FROM '/Users/htlin2/Documents/hackReactor/zillowers/idStreetPriceData.tsv' WITH DELIMITER='\t' AND HEADER=FALSE;
-- cqlsh -f cassandraSchema.sql

-- CREATE MATERIALIZED VIEW create_index AS
--        SELECT id,street,home_price,property_tax,home_insurance,hoa_dues FROM MORTGAGES
--        WHERE id IS NOT NULL AND street IS NOT NULL
--        PRIMARY KEY (street, id);

-- nodetool compactionstats