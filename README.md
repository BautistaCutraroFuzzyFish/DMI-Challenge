# DMI Challenge
 
This is a challenge from DMI on backend skills

# Get Started
First, install Node.js, Docker & Postman

- [Click here to download Node.js](https://nodejs.org)
- [Click here to download Docker](https://docs.docker.com/desktop/mac/install/)
- [Click here to download Postman](https://www.postman.com/downloads/)

# Installation
```bash
$ npm i
```

# Start Redis
```
docker-compose up
```

# Running the app

- Create ``.env`` file with these variables
```js
API_URL=<your-api-url>
API_KEY=<your-api-key>
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_CACHE_TTL=600000
```

- Run the proyect
```bash
$ npm start
```

# Running in development mode
```bash
$ npm run dev
```

# Running tests
```bash
$ npm test
```

# Check prettier and eslint
- Check prettier format
```bash
$ npm run prettier
```
<br/>

- Fix prettier format
```bash
$ npm run prettier:format
```
<br/>

- Fix eslint format
```bash
$ npm run eslint
```

# Check swagger docs
Once the project is running you can go to the browser to the path ``http://localhost:3000/docs`` to see swagger documentation.
