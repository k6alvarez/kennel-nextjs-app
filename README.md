# Boomers Studio Web App Template

This repository is the boilerplate setup for a fullstack web app with authentication.
App is built with Next.js, Prisma, PostgreSQL, and deployed to Vercel.

Technologies used:

- Next.js as the React framework
- Next.js API routes for server-side API routes as the backend
- Prisma as the ORM for migrations and database access
- PostgreSQL as the database
- NextAuth.js for authentication via GitHub (OAuth)
- TypeScript as the programming language
- Vercel for deployment

To successfully setup this app, you'll need:

- Node.js
- A PostgreSQL Database
- A GitHub Account (to create an OAuth app for login)
- A Google Developer Accoount (to create an OAuth app for login)
- A Mailtrap Account for testing emails sent by the application
- A Vercel Account (to deploy the app)

First lets setup our database using Heroku's Postgres SQL service. We will then use Prisma as our object–relational mapper (ORM) to access the database in our Node.js and TypeScript application.

- Login to Heroku and create a new app and navigate to the Resources tab.
- Add Heroku Postgres using the Add-ons section. The free hobby version will work just fine.
- Lets go ahead and create our .env file now so that we can add our database environment variables set up. Create a new .env in the root of you app directory or rename the provided .env.example file. It contains all of the values we will need to get set up.
- Next navigate to the settings tab and in the Config Vars section, copy the value for DATABASE_URL into the .env file we created.

Next lets set up our configurations for the remaining environment variables. At bare minimum you will need to set up a mailtrap accoount to enable email signin. You may remove or add any signin provider supported by NextAuth.js

Lets install dependencies and seed our db.

- `npm i`
- `npx prisma db push`
- `npm run dev`
- In a new tab run `npx prisma studio` for viewing your database tables.

You can now beging to create your web application!
