#ARCADE CLAW#

Arcade Claw is a hybrid hardware-software web app.  We built Arcade Claw with a Raspberry Pi, an eight-channel DC router, a hacked toy arcade claw game and MEAN stack web technology. The goal is simple -- manuever a real claw from your web browser to win a prize. 

##HOW TO PLAY##
Visit our live deployed app [here](https://dummyurl.herokuapp.com). You can watch for free, or pay 99 cents to play. 

##RELATED REPO##
[Web Socket](https://github.com/roaringsheep/piSocket/) for connecting Raspberry Pi.

##CONTRIBUTORS##

- [Adam Barcan](https://github.com/Adam262), co-lead developer
- [Alp Sarilar](https://github.com/asarilar), co-lead developer
- [Minseon Song](https://github.com/roaringsheep), co-lead developer
- [Eddie Ng](https://github.com/wardsng), web streaming
- [Harris Robin Kalash](https://github.com/HarrisRobin), front-end design

##SCREENSHOTS / WEBCAST##

##TECHNOLOGIES USED##
+ Raspberry Pi; 
+ basic electrical engineering (Eight-channel DC relay, H bridge)
+ WebSockets
+ WebRTC
+ Twitch.tv
+ Stripe API
+ And of course....Node.js, MongoDB, Angular.js

##CHALLENGES##
+ H bridge set up.  An H bridge is an electrical circuit built to allow voltage to be applied to a load in either direction. A H bridge is useful for reversing the direction of motors. One polarity causes the motor to run forward, the other makes the motor run in the opposite direction.  We built two H bridges that allow us to reverse the direction of the claw motor safely -- each occupies three relay switches.
+ cross domain routing. 
+ learning EE
+ real-time video streaming with toggle between webcams
+ setting up payments and a custom interface for Stripe API 

##IMPROVEMENTS##
+ build a full-size version. Our current version is tabletop.

##ISSUES?##
Any issues playing the game? Please create a new issue in issues section of this repo.  At this time, we do not accept pull requests or other code contributions.  

