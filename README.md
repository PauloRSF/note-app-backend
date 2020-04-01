# Note App (Back End)

<p align="center">
  <img src="assets/note-app-banner.png" alt="Note app banner"/>
</p>

[![Build Status](https://travis-ci.com/PauloRSF/note-app-backend.svg?branch=master)](https://travis-ci.com/PauloRSF/note-app-backend)
[![Coverage Status](https://coveralls.io/repos/github/PauloRSF/note-app-backend/badge.svg?branch=master)](https://coveralls.io/github/PauloRSF/note-app-backend?branch=master)
[![GitHub license](https://img.shields.io/github/license/PauloRSF/note-app-backend)](https://img.shields.io/github/license/PauloRSF/note-app-backend)
[![Code Style](https://badgen.net/badge/code%20style/Airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

Rest API for a simple note taking app. The goal of this project is to improve my web development skills with JavaScript.
***

## Description
The API was developed using Node.js and the web framework [Express](https://github.com/expressjs/express). It uses MongoDB as database with [Mongoose](https://github.com/Automattic/mongoose) for connection. [Mocha](https://github.com/mochajs/mocha) and [Chai](https://github.com/chaijs/chai) are used for the automated tests, together with the tools [Factory girl](https://github.com/simonexmachina/factory-girl), [Faker](https://github.com/marak/Faker.js) and [Supertest](https://github.com/visionmedia/supertest). [Airbnb's code style](https://github.com/airbnb/javascript) was adopted and [ESLint](https://github.com/eslint/eslint) is used for code analysis.

## How to use

First, you will need to clone the repo: `git clone https://github.com/PauloRSF/note-app-backend.git`. Then, you can [install everything manually](#run-manual) or [use the dockerfile](#use-docker) provided.
<a name="run-manual"></a>
### Running manually:

#### Dependencies:
You will need:
* [Node.js](https://nodejs.org)
* [Yarn](https://yarnpkg.com)
* [MongoDB](https://www.mongodb.com)

After you install everything, enter the project's directory and run:
```console
$ yarn install
$ yarn dev
```

This should run nodemon which will run the app and keep watching for changes you make in any file. If you don't have a 'PORT' environment variable set, it will run on port 2100.
<a name="use-docker"></a>
### Using dockerfile:
To use the dockerfile attached:

(Optional) If you don't have MongoDB running on your machine:
```console
$ docker run -d -p 27017:27017 mongo
```
Then, run the commands:
```console
$ docker build -t note-app .
$ docker run -d --net=host note-app
```

### Running tests:
To run the tests, execute: `yarn test`
