#ARCADE CLAW#

Arcade Claw was a hybrid hardware-software web app.  We built Arcade Claw as a school project, with a Raspberry Pi, an eight-channel DC router, a hacked toy arcade claw game, webcams and MEAN stack web technology. The goal is simple -- manuever a real claw from your web browser to win a prize.

##Video / blog##
Check out how we built Arcade Claw
+ [game video] (https://vimeo.com/106074654)
+ [making-of blog] (http://adambarcan.tumblr.com/post/97500046068/hacking-the-claw)

##Screenshots##
*Game Page*

![game page](https://farm4.staticflickr.com/3948/15581653340_4b370771cb.jpg)

*Stripe Payment*

![Stripe payment](https://farm4.staticflickr.com/3955/15768021372_742b9e6887.jpg)

*Player Profile*

![profile](https://farm8.staticflickr.com/7564/15581653090_8f1b24094a.jpg)

##RELATED REPO##
[Web Socket](https://github.com/roaringsheep/piSocket/) for connecting Raspberry Pi.

##CONTRIBUTORS##

- [Adam Barcan](https://github.com/Adam262), co-lead developer
- [Alp Sarilar](https://github.com/asarilar), co-lead developer
- [Minseon Song](https://github.com/roaringsheep), co-lead developer
- [Eddie Ng](https://github.com/wardsng), web streaming


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
