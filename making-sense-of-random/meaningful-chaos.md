
### input

if I think of the random values as points on an infinite grid, similar to the way that wildberger demonstrates in his algebraic calculus, then each node can be represented as a curve though that space.

in the future, those curves and most likely should represent a paraboloid similar to the mathologer video on the coin hologram. the reason why they are curves is because later these two curves will be equidistant from the input and the output such that they are like the dish is at 1/4 always that circle (or line in 2d) is equidistant to the focal point in the paraboloid (parabola in 2d).

so all I have to do is to make an array of inputs, each one representing a curve on in this grid. each of these inputs applies some sort of transformation to the values along the curve and outputs a n-dimensional vector. the n-dimensional vector value is like the "hash"

each of these vectors can be thought of now as a point that is being stimulated in n-dimensional space

---
```js
var ctx = canvas.getContext('2d')
// outputs a Uint8ClampedArray() // RGBA 0-255 bytes
var img = ctx.getImageData(x, y, w, h)

function pixel (img, x, y, d, w, h) {
	// small optimisation: pass the data, width, hight values directly
	d = d || img.data
	w = w || img.width
	h = h || img.height

	var n = (y * h + x) * 4
	var r = d[n+0]
	var g = d[n+1]
	var b = d[n+2]
	var a = d[n+3]

	return ((r + g + b) / (3 * 255)) * (a / 255)
}

var w = img.width
var h = img.height
var d = img.data
var out = new Uint8ClampedArray(w * h * 4)
for (var x = 0; x <= w; x++) {
	for (var y = 0; y <= w; y++) {
		var i = x * y * 4
		var v = pixel(img, x, y, d, w, h)
		out[i+0] = v
		out[i+1] = v
		out[i+2] = v
		out[i+3] = 255
	}
}

var out_data = new ImageData(out)
ctx.putImageData(out_data, 0, 0)
```

### formation of the grid

one of the things that I think may be prudent to take a look at would be to normalise the grid into a series of values that are from -1.0 to 1.0. if I were to take a section of the grid, then perform some sort of calculation on it (similar to taking the average, but maybe something that isn't very human recognisable), it should show up as all around 0.0 with occasional "anomalies" that tend toward -1.0 or 1.0.

### output

some channels should be defined as outputs? not sure how to represent it... (TODO)

the easiest would be to simply have an array of outputs that give -1.0 to 1.0 outputs. then, transform that into something usable like mouse or keyboard signals

### grid space

using the idea that a point is a relative thing and a line can be represented as a ratio, now I need a way of extracting values along the line from the 2d image.

for generalisation of the idea, I'd like to have the coordinates have 4 quadrants:
-1,-1 | +1,-1 | -1,+1 | +1,+1

the origin point is located right in the middle of the centermost 4 pixels. in all cases, a point resolves to the product of the distance the point has to the midpoints of its nearest 4 pixel neighbours.

each line will extend out from the origin enumerating values into the dimensions as they go along. conditions can make for branches.

I see it kind of like lightning coming out of the origin. depending on the random values below the paths that are taken, it will arrive to a different coordinate.

the values of the random pixels below serve as motivators to the path, deciding the branch to take, the trajectory change (curve), or the velocity or distance to travel.

---

maybe two versions to think about:
1. all possible paths are determined ahead of time. this means that all possibilities are calculatable
2. only the logic is determined ahead of time, so it's ideally pretty humanly inconcievable to anticipate all the different types of paths a logic

```js
const {width, height, data} = image_data

```

### transformation

from the origin, four rays are cast going out in the diagonal directions. if they only meet black pixels, they will continue on and resolve to be their initial direction and velocity.

each sequence gives a starting ray angle and velocity. the ray travels the distance determined by the velocity and then the next step in the sequence.




### output

### code bits

```js
function put_cam_in_video_element (video, cb) {
	navigator.mediaDevices.getUserMedia({
		audio: false,
		video: {
			facingMode: 'user',
			width: {min: 128},
			height: {min: 128}
		}
	}).then((stream) => {
		video.srcObject = stream
		cb && cb(stream)
	})
}

function capture_img (video) {
	var width = video.width
	var height = video.height
	var canvas = cE('canvas', {width, height})
	canvas.getContext('2d').drawImage(video, 0, 0, width, height)

	return canvas
}

function random_img_test (cnnvas, magnitude = 0.1) {
	var w = canvas.width
	var h = canvas.height
	var out = new Uint8ClampedArray(w * h * 4)
	for (var x = 0; x <= w; x++) {
		for (var y = 0; y <= w; y++) {
			var i = x * y * 4
			out[i+0] = Math.floor(Math.random() * magnitude * 255)
			out[i+1] = Math.floor(Math.random() * magnitude * 255)
			out[i+2] = Math.floor(Math.random() * magnitude * 255)
			out[i+3] = 255
		}
	}

	var out_data = new ImageData(out)
	canvas.getContext('2d').putImageData(out_data, 0, 0)
	return canvas
}

```

### the bytecode transformation

I envision these as each an output device. what they do is they take the pixel grid, then they get values from it in some order (defined by the bytecode) and write out new (more significant) values to the output stream.

by default, I will create bytecode streams which get from memory based off of an offset. eg. outputting a horizontal line would be get each byte of memory.

### the training phase

now, I need to make a program which captures every keystroke (use skhd) and have it recording the random values that were happening every keystroke and save them. finally, write a bytecode generator similar to a genetic algorithms (with generations and stuff) that generates the bytecode to detect the keystrokes. finally, make the fitness of the algorithm equal to it generating proper keycodes for the random values.

this should be able to be expanded quite easily into visual feedback as well.


### game plan

first:
pixels -> bytecode -> dimensional position

second:
create different concepts (keycodes) at dimensional positions

third:
train bytecode to convert pixels into the corresponding dimensional positions

rinse and repeat

### maybe sequences?

I was thinking about the bytecode bit of it, and really I don't need a super advanced system that bytecode would represent. instead, it may be optimal to create the generations and stuff from a simpler sequence type of thing.

dna?

### starting position for the sequences

the image never has an odd number of pixels in width or height. therefore, the best place to start is to visualise the 4 centre pixels as the starting positions of the image. then, similar to bf code (but probably 64 bytecodes), you can increment / decrement and move around in the image horizontally or vertically.

### bytecode

the idea of the bytecode is inspired by brainfuck, however with a few modifications. first, the input is 2 dimensional, and the output is 1 dimensional. each memory location of the output represents a spatial dimension in the resolution phase. the input dimensions represent relative pixels and are only

+ | increment output
- | decrement output
(add conditional manipulators)
{ | move output pointer left
} | move output pointer right
u | move input pointer up
d | move input pointer down
l | move input pointer left
r | move input pointer right

for now, loops are not supported, but I think they probably should be. I like the idea of recursion, and if there is a way to easily make non-infinite looping loops, then it should be added.

### thoughts on logic and steps

my intuition suggested that logic is determined by folding. this gives evidence to conditions and loops in the code. however, the video I just watched does not address how the pairs look when they fold. do they lay on one another? it seems there is a kind of landing pad where the two points connect.

[...]

### different ideas on the position resolution

1. goes out in a spiral like manner where the more black it is, the tighter the spiral. then, I still need to somehow convert the values into dimensional positions though

2. the idea that every step in the sequence is either a branch or a turn. in the case of branch, it has variable conditions to see if some value is between, and then the velocity to branch into and the split angle. the other step kind is a turn derived from dimensional values.

---

I think the second one is good for a prototype as it'll allow for quite a few possibilities (nearly infinite) depending on the random values below it. also it provides an interesting look into the difference between a webcam generated random and a much more uniform random pulled from the OS. it'd be interesting to try the same random pulled from my random number generator as well (it pulls bytes, so most of them would be pretty close to 128 instead of the webcam where most are closest to 0)

in the end, there is quite a few things to be done regarding the collection of key/mouse events along with the random values, storage of these values (mongodb?, redis?, protobuff?) then finally there is work on the genetic algorithm needed to find the best sequence to resolve the random event positions to the the concept's position.

lots of work to be done :) kenny: you'll be busy for a while with this, so get these necessary things done so you can mentally masturbate on the resolution curves later.

### ideas on querying the closest concept

I probably want to have and did envision a hierarchal linked list roughly equal to the idea that by comparing to see if it's inside of a sphere, rather than traversing the whole database.

in addition, I would probably want to have an index of the outermost spheres such that a quick lookup can be done (probably use BSP to do this), and then further ensure with the gradual repulsion of these outermost spheres that sphere's don't intersect.

this means that a query on the outermost BSP will return a guaranteed sphere which contains the query. from there, we traverse the contents of the sphere delving deeper into it until the threshold is met.

I think that it would be optimum to have each sphere inside of the sphere contain more spheres which also repel each other. it seems that when two concepts occupy the same space and cannot be repelled, a new fusion concept should be made. I don't really know how that would work though because if concept a is key_up and concept b is key_down, then how do I make a fusion of these two concepts? my instinct says that they should instead repel each other by adding another dimension and separating them.... oh, so now I need to have the ability to dynamically add more dimensions? maybe this didn't solve the problem.

---

lol, until I give this some more thought, I'm just going to partition the number of dimensions in the database and use ZRANGEBYSCORE on each dimension until I run out of answers. it'll reduce the dataset considerably

### the keylogger

due to some issues with corefoundation's event loop running in a different thread than node's, I have decided that I want to run the keylogger in a separate process. there are advantages to this, as keylogging on macOS is different than windows or linux so having a separate keylogger will make it more easily cross platform. so, that's good.

some form of IPC should be built, however, I think the simplest form will be to make it a flexible protocol, where any event can be sent to the system, including keys, mouse, or other things, too. I plan on making it a simple socket at first, but I believe for extensibility, it should be a normal TCP/UDP socket capable of receiving any event that is sent to it.

---

the API should at a minimum have eventname and a value. so KEYPRESS/k should be for normal key presses, then in other situations like playing a game, it is desired to have down/up events so as to give a duration.

for things like the mouse, I think I want to simplify it to essentially what the brain is thinking (and the hand is doing mechanically), which is click on this place on the screen. when recording events, I'd like it to send as well, the hitbox for the thing clicked and also the action that was performed. I don't know how I can get this information for things other than web pages.

so, a future extension to the keylogger is to allow the user to specify what a certain thing is as far as an action in the interface.

for example, I will want to record cmd-tab, then record steam becomes foreground. this saves the micro actions, but also the macro action of activating stem. then, I click on some portion of the screen and again it saves the micro action of the mouse click on the library button, but also the macro action of activating the library. same thing happens again when I press the play button next to dota.

... for now though, I'm just going to work on basic up/down keys to make a simple demonstration of moving a box around.







### next steps

get essentials working:
- get the webcam demo thing running in electron
  - have electron launch a standalone redis server
  - listen to key events from the libkrbn thing and record the grid into redis
  - https://github.com/luin/ioredis

get the resolution working:
- for each desired command (starting with just key_codes), map these to random positions
- build a genetic algo to work out the best sequence to map the momentary chaos to the corresponding event position
  - store these sequences also into redis (and also have a filesystem backup as well)

bonus round:
- fix karabiner wborkman profile so it doesn't suck.
  - disable capslock and make it hyper again
	- cmd-d not working (always hides window)
- install and try out the kbd layout in karabiner: https://github.com/jackrosenthal/threelayout







### future optimisations

maybe later after no need to debug, render offscreen:
https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
