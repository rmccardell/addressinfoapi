# Address Info API

## Simple API that returns helpful information about a domain name or ip address

### Currently supported services are

- [ipStack](https://ipstack.com)
- [rdap](https://www.rdap.net)
- [whoapi](https://whoapi.com)
- [virustotal](https://www.virustotal.com)

### What this repo contains

- Api built with [Node Express](https://expressjs.com/)
- Mocha Chai for testing
- Logging provided by [Pino](https://github.com/pinojs/pino)
- Provides

## Building

- npm or yarn install

## Running

- You will need to obtain an api key for - [ipStack](https://ipstack.com) - [virustotal](https://www.virustotal.com) [whoapi](https://whoapi.com/)
- Update config with proper api keys
- npm run dist/server.js
