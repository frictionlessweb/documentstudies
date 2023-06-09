# Document Studies

A tool for running studies involving documents.

## Getting Started

You will need to have:

- A Unix-like operating system.
- Postgresql
- Ruby 3
- Node 18+

From there, you can download this repository and run:

```sh
bundle install
ADOBE_PRODUCTION_PASSWORD=test123 ./bin/rails db:setup
npm install
```

After that, open two terminal windows. In one terminal window, run:

```sh
./bin/rails s
```

In another terminal window, run:

```sh
npm start
```

You should then be able to navigate to `http://localhost:3000` and see all changes reflected with live reloading.

Alternatively, if you have `foreman` installed, you can run:

```sh
foreman start -f Procfile.dev
```

To get things going.

## Playing with the App

First, visit `http://localhost:3000/admins` and log in with:

```
username: test@test.com
password: test123
```

From there, you can upload a study JSON and the documents associated with it as necessary.
