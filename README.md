# IAST-Sample

This is a sample app with a Server Side Request Forgery vulnerability for use in an IAST demo lab environment.

This requires NodeJS.  Most versions should work.  It was tested with NodeJS 20.9.0.

To run:

1. Clone the repo into a directory.
2. Change into that directory and run `npm install`
3. Run the app with `node iast-sample.js`.

The app will listen on port 8081.  Use your favorite browser to go to `localhost:8081`.  You should see a message `Nodetron is in good health`.

Then go to `localhost:8081/about`.  That should post some content from `example.com`.

Now install New Relic's APM agent for NodeJS, enable IAST, and configure it to talk to an account with IAST enabled.  Then repeat the above and see how fuzz testing happens and an SSRF is found.
