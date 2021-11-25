# SpeedAisle

SpeedAisle is an application that allows you to create a shopping list, which SpeedAisle will then categorise into the aisles where those products are found, to make your shopping experience as simple as possible!

_Stretch goal is to have automatic pathfinding to map out the most efficient route around your store_

![SpeedAisle](https://drive.google.com/uc?export=view&id=16n89fINCrgjmE8QdS9OR7Hd6YZjBdh2g)

## Tech Stack

- Node.js
- Express.js
- PostgreSQL / Prisma
- Handlebars
- CSS
- Cypress
- Heroku

You can find the Trello board to follow along with the build, or log isses and ideas for this application, [at this link here](https://trello.com/b/BLrD4A53)

## How to get database working

1. make sure you `npm install` to have everything (like the Prisma CLI)
2. create a `.env` file in the root directory
3. copy the content inside of `.env.example` into `.env`
4. replace the `YOURNAME` placeholders with your computer's username. For example: `DATABASE_URL="postgresql://parsa:parsa@localhost:5432/speedaisle?schema=public"`. If it doesn't work then message on Slack.
5. create the actual `speedaisle` database. This can be done easily by running `createdb speedaisle` in your terminal. `createdb` should be available if you have `psql` installed. Alternatively, you can just do `create database speedaisle;`. Again, if you have any problems just message.
6. run `npx prisma db push` to have whats in `schema.prisma` to sync with the database you just made.

### Test database

Since Prisma doesn't really support multiple databases out of the box, I had to find some janky way to do it.

1. copy the new `TEST_DATABASE_URL` line from `.env.example` into your `.env` file
2. repeat step 4
3. repeat step 5 but with `speedaisle_test` as the database name
4. now, go into the `schema.prisma` file and change line 10 from `url = env("DATABASE_URL")` to `url = env("TEST_DATABASE_URL")` temporarily so that you can populate the necessary tables in the next step
5. repeat step 6
6. dont forget to undo step 4 after your test database has been populated

thats it hopefully, if you have any issues just message on Slack

also, if you want to use the prisma client for operations, first call `getDBType` at the top level of your file (see models/list.js)

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
- [ ] As a user, so I can have the most efficient shopping experience, I would like to be told the best route through my local shop
