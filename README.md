# Mortgage Calculator

> Mortgage Calculator similar to Zillow's

## Related Projects

  - https://github.com/team-frontend/nearby-homes
  - https://github.com/team-frontend/image-carousel
  - https://github.com/team-frontend/detailed-part

### Installing Dependencies

From within the root directory:
npm install

1. mysql -u root -p <database/schema.sql
2. npm run fake (to generate fakedata)
3. npm run seed (to seed fakedata)


### Public End Points (CRUD)
| Description                                    | Endpoint                     |
| ---------------------------------------------- | ---------------------------- |
| Create new info of home's Mortgage information | POST /api/homes/prices       |
| Get info of home's Mortgage information        | GET /api/homes/:id/prices    |
| Update info of home's Mortgage information     | PUT /api/homes/:id/prices    |
| Delete info of home's Mortgage information     | DELETE /api/homes/:id/prices |


### POST /api/homes/prices
Input:
{"home_price":1031260,"property_tax":1628,"home_insurance":525,"hoa_dues":167}

Output:
[{"id":1,"home_price":1031260,"property_tax":1628,"home_insurance":525,"hoa_dues":167}]

### GET /api/homes/:id/prices
Input:
id = 1

Output:
[{"id":1,"home_price":1031260,"property_tax":1628,"home_insurance":525,"hoa_dues":167}]

### PUT /api/homes/:id/prices
Input:
id = 1
[{"id":1,"home_price":1031260,"property_tax":1628,"home_insurance":525,"hoa_dues":167}]

Output:
[{"id":1,"home_price":1031260,"property_tax":1628,"home_insurance":525,"hoa_dues":167}]

### DELETE /api/homes/:id/prices
Input:
id = 1

Output:
success