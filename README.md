# Project Name

MiniCRM

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Scripts](#scripts)
- [Brief description](#briefdescription)
- [License](#license)

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:

2. Database uses MongoDB Atlas which is cloud version. To access the current DB, you have to request API key (lharalampiev99@gmail.com) and insert it in the config.env file or create brand new one.

2.1 Create the config.env file so that it contains all required variables.
{DATABASE}
{DATABASE_PASSWORD}
{JWT_EXPIRATION}
{JWT_COOKIE_EXPIRATION}
{JWT_SECRET}
{PORT}
{NODE_ENV}

3. Install dependencies: npm install

4.Run one of the available scripts in the main directory, depending on your needs.

### Scripts

npm start: Start the application.
npm run lint: Runs eslint check.
npm run build: Runs webpack and creates bundles for scripts/css.
npm run dev: Start the app in dev mode with nodemon and eslint

### Brief Description

There are two types of users. Digital Agency Employee and Clients. Clients are tied up with a Company.

1.Every client can submit an Inquiry and see all personal inquiries plus all inquiries from his Company.

- Cant see inquiries from other companies.
- Can delete only his inquiries.

  2.Every digital agency employee can see all existing inquiries from all companies/clients.

- Every digital agency employee can submit an estimation for any inquiry.
- Can see all estimations for certain inquiry
- Can delete only his estimations
- Can see all clients with corresponding company on a different route and do a simple search by client"s name.

### License

This project is licensed under the MIT License.
