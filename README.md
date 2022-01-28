# Prolog RESTful Service

This is a prototype RESTful service that wraps a
Prolog knowledge base. The server starts by loading
clauses and facts from the `database.pl` into the
in-memory Prolog knowledge base. Once initialized,
the server is prepared to handle HTTP method calls
to modify or retrieve information from Prolog.

The client should not need to have understanding of
prolog to use most of the supported routes. This
project tries to follow conventions around proper
HTTP Get, Post, Put, and Delete calls, but there
may be cases when we use Post for Get requests since
you can include larger chucks of formatted data in
the body and receive a response in return.

## How to run

If you do not have NodeJs installed, you will need to
install the latest LTS version from its [site](https://nodejs.org).

Once installed, run the following commands to clone
the repo, install dependencies, and run the server.

```bash
git clone https://github.com/ShiJBey/prolog-server

cd prolog-server

npm install

npm start
```

Then if you navigate in your web browser to localhost:3000,
you should see a "Hello, World" message.
