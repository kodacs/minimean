# Minimean

A mean framework that aims(and fails) to be minimal. Angular 2 + material included.

So, I decided to build a framework for my projects, as it would be useful in the process learning NodeJS. 
(and yeah, it is) Mostly because I like to know things, how they build up, so when it breaks I can fix it. 
(at least that worked out until now) If you looking into build your own, or just clone this feel free; but 
building your own is a huge opportunity to learn. As I said I'm learning NodeJS right now, so I won't use 
any fancy-pants syntax that would warp the mind of the other beginners. Also I'll use basic english. 

### What the fsck is this?

REST/CRUD API built with mongoose and express. Custom jsonwebtoken authentication, and password storing 
ispired by @vladotesanovic's [angular2-express-starter](https://github.com/vladotesanovic/angular2-express-starter). 
Also I have to admit I used an ng generator for the Angular2+Material2 scaffolding because I don't know much about 
how Angular2 works. For now, it's magic. Maybe in the next version I'll can cut down from Angular2's ~~flustercuck~~ 
dependency hell.



## TESTing the API

    #loginroute
    curl -i -XPOST http://localhost:8080/api/auth -H "Content-Type:application/json" -d '{"name":"defaultuser","password":"reparetekmogyoro"}'
    #test protected route
    curl -i -XGET http://localhost:8080/api/user -H "Content-Type:application/json" -H "x-access-token: <token>"

### Thanks and learning material

 - https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication
 - https://scotch.io/tutorials/the-anatomy-of-a-json-web-token
 - https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4
 - https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
 - https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
 - https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 - https://github.com/vladotesanovic/angular2-express-starter
 - https://scotch.io/tutorials/route-middleware-to-check-if-a-user-is-authenticated-in-node-js
 - http://blog.thoughtram.io/angular/2016/06/14/routing-in-angular-2-revisited.html
 - https://medium.com/@blacksonic86/angular-2-authentication-revisited-611bf7373bf9
 - https://medium.com/front-end-hacking/getting-started-using-angular-material-2-in-an-angular-2-angular-cli-application-bbeecdf6bfe2
 - https://github.com/blacksonic/angular2-esnext-starter
 - http://embed.plnkr.co/SF8gsYN1SvmUbkosHjqQ/
