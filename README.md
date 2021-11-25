# SpeedAisle

SpeedAisle is an application that allows you to create a shopping list, which is then categorised into the aisles where those products are found, to make your shopping experience as simple as possible!

![SpeedAisle](https://drive.google.com/uc?export=view&id=16n89fINCrgjmE8QdS9OR7Hd6YZjBdh2g)

```
npm install
>> create a .env file and copy DATABASE_URL from .env.example to it
createdb speedaisle (using psql)
npx prisma db push
```
### Test database

To set up a test database, add TEST_DATABASE_URL to your .env file. Temporarily update `prisma.schema` to find `url = env("TEST_DATABASE_URL")`
```
createdb speedaisle_test
npx prisma db push
```
Revert the changes made to the `prisma.schema` file


## Tech Stack

- Node.js
- Express.js
- PostgreSQL / Prisma
- Handlebars
- CSS
- Cypress
- Heroku

You can find the Trello board to follow along with the build, or log isses and ideas for this application, [at this link here](https://trello.com/b/BLrD4A53)

## User Stories

- [x] As a user, so I can create my shopping list, I would like to add an item to my shopping list
- [x] As a user, so I can adjust my shopping list, I would like to delete an item from my shopping list
- [x] As a user, so I can optimise my shopping trip, I would like to see my shopping list categorised into relevant groups
- [x] As a user, so I can use the app, I would like to register an account/login to SpeedAisle using my Google Account
- [x] As a user, so I can make my trip more efficient, I would like to save the order of aisles in my local store
- [x] As a user, so I can optimise my shopping trip, I would like my shopping list to be arranged based on the aisles in my store
- [x] As a user, so I can track what's already in my basket, I would like to tick item in the list

### Stretch User Stories

- [ ] As a user, so I can keep the system up to date, I would like to save my local store layout
- [x] As a user, so I can get the best route for a new store, I would like my list to be ordered based on that new store
- [ ] As a user, so I can have the most efficient shopping experience, I would like to be told the best route through my local shop (using a Pathfinding algorithm)
