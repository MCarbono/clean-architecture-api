<h1 align="center"> Mailing List API </h1>

## Summary
- [About](#-Abount)
- [Technologies](#-Technologies)
- [Setup](#-Setup)
- [Environment Configuration](#-Environment-Configuration)
- [Run tests](#-Run-tests)

---

## About

This is a api created to practice clean architecture concepts. The api has only one endpoint. The user registers itself in the mailing list and an image is sent to him by email. It's a simple api and it was not needed to make it with that structure, but it was just to practice the architecure.

---

## Technologies

- Express
- MongoDB
- Jest
- Nodemailer
- Typescript

---


## 📁 Setup

```bash
    #clone the repository
    $ git clone https://github.com/MCarbono/clean-architecture-api

    #Access the project folder
    $ cd clean-architecture-api

    #install dependencies
    $ npm i

    #build to js
    $ npm run build

    #start the server
    $ npm run start
```
---

## 📜 Environment Configuration

- Rename .env.example file to .env
- Set values to .env file variables

---

## 🧪 Run Tests

```bash
    #run unit test 
    $ npm run test-unit

    #run integration test
    $ npm run test-integration

    #run all tests
    $ npm run test
```