Compiled app code (JS, maybe CSS) will go here so that it can be referenced via the actual static content.
Unfortunately restify is a bit crap about serving static files, so rather than being able to dump whatever we want
in this directory and serve it via /compiled or somesuch, we have to have a specific directory structure.  In this
case we're mapping /js to be served from /app-compiled/js.