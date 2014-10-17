#ARCADE CLAW#

Arcade Claw is a hybrid hardware-software web app.  We built Arcade Claw with a Raspberry Pi, an eight-channel DC router, a hacked toy arcade claw game, webcams and MEAN stack web technology. The goal is simple -- manuever a real claw from your web browser to grab a prize. 

##HOW TO PLAY##
Visit our live deployed app [here](https://dummyurl.herokuapp.com). 
##RELATED REPO##
[Web Socket](https://github.com/roaringsheep/piSocket/) for connecting Raspberry Pi.

##CONTRIBUTORS##

- [Adam Barcan](https://github.com/Adam262), co-lead developer
- [Alp Sarilar](https://github.com/asarilar), co-lead developer
- [Minseon Song](https://github.com/roaringsheep), co-lead developer
- [Eddie Ng](https://github.com/wardsng), web streaming
- [Harris Robin Kalash](https://github.com/HarrisRobin), front-end consulting

##SCREENSHOTS / WEBCAST##
Check it out:
+ [game video] (https://vimeo.com/106074654)
+ [making-of blog] (http://adambarcan.tumblr.com/post/97500046068/hacking-the-claw)


##TECHNOLOGIES USED##
+ Raspberry Pi; 
+ basic electrical engineering (Eight-channel DC relay, H bridge)
+ WebSockets
+ WebRTC
+ Twitch.tv //=> note we originally used this technology but were blocked from Twitch.tv! 
+ Stripe API
+ And of course....Node.js, MongoDB, Angular.js

##CHALLENGES##
+ H bridge set up.  An H bridge is an electrical circuit built to allow voltage to be applied to a load in either direction. A H bridge is useful for reversing the direction of motors. One polarity causes the motor to run forward, the other makes the motor run in the opposite direction.  We built two H bridges that allow us to reverse the direction of the claw motor safely -- each occupies three relay switches.
+ cross domain routing. 
+ learning EE
+ real-time video streaming with toggle between webcams. See below - we could do this in MJPEG format.  However we switched to WebRTC in order to improve video quality.  This technology had a tradeof of difficulty in controlling two webcams from a single getUserMedia().
+ setting up payments and a custom interface for Stripe API. 

##IMPROVEMENTS##
+ improve webcam functionality. We have had two issues with our webRTC:
      + controlling two web cams via getUserMedia(). right now, we have a single web cam trained on claw, due to difficulties controlling a second web cam. This setup results in poor depth of field.
      + locking of peer to peer connection. We have an occasional bug in which master fails to disconnect from peer session, tying up webcam for next user

##ISSUES?##
Any issues playing the game? Please create a new issue in issues section of this repo.  

