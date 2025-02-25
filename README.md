# Light Knight Animator
Light Knight (**_LK_** for short) is a LED Strip Animator. You can load any music and start animating your LED strips by placing keyframes at specific position. to actually see the animation on strips you must have a [Arduino Board](https://www.arduino.cc/).

**WARNING**: This project is still under development. codes for Arduino will be committed soon. and some video tutorials will be posted on youtube too ;-).

**WARNING**: this app only produces some project file and does not interact with _Arduino Boards_ directly. To be able to play your animations on LED strips, there is another app called [LightKnight Player](https://github.com/arg1998/LightKnightPlayer) that reads the generated project files, process them and then connect to your arduino to play the animations.

Built With [ReactJs](https://reactjs.org/), [Redux](https://redux.js.org/), [ElectronJs](https://electronjs.org/), [WaveSurfer](https://wavesurfer-js.org/), [TinyColor](https://bgrins.github.io/TinyColor/) and ...

### Demo
[This video](https://www.youtube.com/watch?v=njnCorMyLxw) is the first test of the application, Using 2 RGB LED strips and 3 White LED strips.  

### How To Run? 
+ Clone this repository 
+ Go into the project directory
+ Open terminal and type `yarn install`
+ For development environment, run `yarn electron-dev`
+ To build and package with default configurations, run `yarn package`


### Keyboard Shortcuts : 
| key          | Action                                                 |
| ------------ | ------------------------------------------------------ |
| W            | Select Upper Channel (Change Current Selected Channel) |
| S            | Select Lower Channel (Change Current Selected Channel) |
| 1            | Move Curser Backward By 1 Frame                        |
| 3            | Move Curser Forward By 1 Frame                         |
| 4            | Move Curser Backward By 5 Frame                        |
| 6            | Move Curser Forward By 5 Frame                         |
| 7            | Move Curser Backward By 25 Frame                       |
| 9            | Move Curser Forward By 25 Frame                        |
| [            | Decrease Playback Speed                                |
| ]            | Increase Playback Speed                                |
| Enter        | Place A New Keyframe                                   |
| Space        | Remove A Keyframe                                      |
| Ctrl + Wheel | Interface Zoom                                         |
| LMB click on waveform | Sets the **start** position (for gradient, copy and remove) |
| Ctrl + LMB click on waveform | Sets the **end** position |

<hr/>

### Screenshots 
<img src="/screenshots/0001.png"/>
<img src="/screenshots/0002.png"/>
<img src="/screenshots/0003.png"/>
<img src="/screenshots/0004.png"/>
