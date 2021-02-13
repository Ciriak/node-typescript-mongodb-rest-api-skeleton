# Node.js Typescript MongoDB REST API - Basic Project Skeleton

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/Ciriak/node-typescript-mongodb-rest-api-skeleton/blob/master/LICENSE)
[![Tag](https://img.shields.io/github/tag/Ciriak/node-typescript-mongodb-rest-api-skeleton.svg?style=flat-square)](https://github.com/Ciriak/node-typescript-mongodb-rest-api-skeleton/tags)
[![Travis](https://img.shields.io/travis/com/Ciriak/node-typescript-mongodb-rest-api-skeleton.svg?style=flat-square)]()
[![npm downloads](https://img.shields.io/npm/dt/node-express-mongodb-jwt-rest-api-skeleton.svg?style=flat-square&label=npm%20downloads)]()
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fb6f20533c0f41b6b00da95ba634cd5e)](https://www.codacy.com/app/Ciriak/node-typescript-mongodb-rest-api-skeleton?utm_source=github.com&utm_medium=referral&utm_content=Ciriak/node-typescript-mongodb-rest-api-skeleton&utm_campaign=Badge_Grade)

## Getting started

This is a basic API REST skeleton written on Typescript.

Great for building a starter web API for your front-end (Android, iOS, Vue, react, angular, or anything that can consume an API)

This project is created to help other developers create a **basic REST API in an easy way with Node.js**. This basic example shows how powerful and simple JavaScript can be. Do you want to contribute? Pull requests are always welcome to show more features.

## Origins

This project is a fork of the original [node-express-mongodb-jwt-rest-api-skeleton](https://github.com/davellanedam/node-express-mongodb-jwt-rest-api-skeleton) Version **v7.1.2** created by **Daniel Avellaneda**

## Features

- Multiple environment ready (development, production)
- Custom email/password user system with basic security and blocking for preventing brute force attacks.
- Compressed responses.
- Secured HTTP headers.
- CORS ready.
- Cache ready (Redis).
- HTTP request logger in development mode.
- i18n ready (for sending emails in multiple languages).
- User roles.
- Pagination ready.
- User profile.
- Users list for admin area.
- Cities model and controller example.
- Login access log with IP, browser and country location (for country it looks for the header `cf-ipcountry` that CloudFlare creates when protecting your website).
- API autogenerated documentation by Postman.
- API collection example for Postman.
- Testing with mocha/chai for API endpoints.
- NPM scripts for cleaning and seeding the MongoDB database.
- NPM script for keeping good source code formatting using prettier
- Use of ESLint for good coding practices.
- Mailer example with Nodemailer and Mailgun.
- Ability to refresh token
- JWT Tokens, make requests with a token after login with `Authorization` header with value `Bearer yourToken` where `yourToken` is the **signed and encrypted token** given in the response from the login process.

## Requirements

- Node.js **10+**
- MongoDB **3.6+**
- Redis **5.0+**

### Login credentials

email: `admin@admin.com`\
password: `12345`

[API documentation](###api-documentation)

## How to install

### Using Git (recommended)

1.  Clone the project from github. Change "myproject" to your project name.

```bash
git clone https://github.com/Ciriak/node-typescript-mongodb-rest-api-skeleton.git ./myproject
```

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd myproject
npm install
npm update
```

### Setting up environments (development or production)

1.  In the root this repository you will find a file named `.env.example`
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
3.  The file `.env` is already ignored, so you never commit your credentials.
4.  Change the values of the file to your environment (development or production)
5.  Upload the `.env` to your environment server(development or production)
6.  If you use the postman collection to try the endpoints, change value of the variable `server` on your environment to the url of your server, for development mode use <http://localhost:3000>

**IMPORTANT:** By default token expires in 3 days (4320 minutes set in .env.example). You can refresh token at endpoint GET /token. If everything it´s ok you will get a new token.

### Mailer

To ensure the deliverability of emails sent by this API, `Mailgun` is used for mailing users when they sign up, so if you want to use that feature go sign up at their website <https://www.mailgun.com>

If you want to try a different method it´s ok, I used <https://nodemailer.com> for this API and they have different transport methods like: smtp.

### i18n

Language is automatically detected from `Accept-Language` header on the request. So either you send locale manually on the request or your browser will send its default, if `Accept-Language` header is not sent then it will use `en` locale as default.

## How to run

### Database cleaning and seeding samples

There are 3 available commands for this: `fresh`, `clean` and `seed`.

```bash
npm run command
```

- `fresh` cleans and then seeds the database with dynamic data.
- `db:clean` cleans the database.
- `db:seed` seeds the database with dynamic data.

### Running in development mode (lifting API server)

```bash
npm run dev
```

You will know server is running by checking the output of the command `npm run dev`

```bash
****************************
*    Starting Server
*    Port: 3000
*    NODE_ENV: development
*    Database: MongoDB
*    DB Connection: OK
****************************
```

### Running tests

It´s a good practice to do tests at your code, so a sample of how to do that in `mocha/chai` is also included in the `/test` directory

```bash
npm run test
```

### Formatting code

Format your code with prettier by typing:

```bash
npm run format
```

### Formatting markdown files

Format all your markdown files with remark by typing:

```bash
npm run remark
```

### Linting code

Lint your code with ESLint by typing:

```bash
npm run lint
```

## Usage

Once everything is set up to test API routes either use Postman or any other api testing application. Default username/password combination for login is `admin@admin.com/12345`.

### API documentation

<https://documenter.getpostman.com/view/487539/RWaHwoLV>

### Postman API example collection

You can import the example collection to Postman. To import, click the import button located and select `postman-example.json` located within the root directory.

Go to `manage environments` to create environments for development, production, etc. On each of the environments you create you will need to:

1.  Create a new key `authToken` and within the `/login` request this value is automatically updated after a successfull login through a script located in the `tests` tab. Each time you make a request to the API it will send `Authorization` header with the `token` value in the request, you can check this on the headers of users or cities endpoints in the Postman example.

2.  Create a second key `server` with the url of your server, for development mode use <http://localhost:3000>

This is a REST API, so it works using the following HTTP methods:

- GET (Read): Gets a list of items, or a single item
- POST (Create): Creates an item
- PATCH (Update): Updates an item
- DELETE: Deletes an item

### Creating new models

If you need to add more models to the project just create a new file in `/app/models/` and it will be loaded dynamically.

### Creating new routes

If you need to add more routes to the project just create a new file in `/app/routes/`

Then add the following lines in the file `app/routes/index.ts` :

```js
import myRoute from "./myRoute";
(...)
router.use("/myRoute", myRoute);
```

### Creating new controllers

When you create a new controller, try to also create another folder with validations and helpers. Ex. `/countries`, `/countries/validators` and `/countries/helpers`. An example of this is included in the repository.

## Bugs or improvements

Feel free to report any bugs or improvements. Pull requests are always welcome.

## License

This project is open-sourced software licensed under the MIT License. See the LICENSE file for more information.
