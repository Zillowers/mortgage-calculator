# Mortgage Calculator

> Mortgage calculator based on selected real estate value

### Installing Dependencies & Starting the Project
From within the root directory:
`npm install` to install all dependencies.
Run `npm run ssr` to build and start project. The build artifacts will be stored in the `dist/` directory.
Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.


### Public End Points (CRUD)
| Description                                    | Endpoint                     |
| ---------------------------------------------- | ---------------------------- |
| Create new info of home's Mortgage information | POST /api/homes/prices       |
| Get info of home's Mortgage information        | GET /homes/:id/prices    |
| Update info of home's Mortgage information     | PATCH /api/homes/:id/prices    |
| Delete info of home's Mortgage information     | DELETE /api/homes/:id/prices |
