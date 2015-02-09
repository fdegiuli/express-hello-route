# Express-hello

This module is a proof-of-concept standalone express.js route. 

## Usage

Plug it in to any express application thusly:

```javascript
var hello = require('express-hello');

app.use('/hello', hello);
```

Now, connect to your server (eg: localhost:3000/hello/index)
and watch it serve some beautiful, beautiful html.

## How does it work?

The package exposes an express router with a baked-in middleware function which replaces res.render
with the render function defined in lib/renderer.js.

The reason for this is that express uses a renderer that is defined in the app itself.
This makes it impossible to specify a view directory in a router. The only (practical) way around this
is to use a separate renderer.

### The Renderer

The renderer is the backbone of this project. uses the [consolidate](https://www.npmjs.com/package/consolidate) package for its rendering engines. 

It allows you to specify separate rendering engines and view directories for different routes, and attempts to detect which engine to use when none are specified.

## Caveats

If you're developing a web app based on this concept, be aware that you will have to use
relative paths for all static files (css, js, images, etc...), unless you are mounting the router on '/'.


