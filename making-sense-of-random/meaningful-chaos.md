
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

each line will extend out from the origin enumerating values into the dimensions as they go along. conditions can make for branches.

I see it kind of like lightning coming out of the origin. depending on the random values below the paths that are taken, it will arrive to a different coordinate.

the values of the random pixels below serve as motivators to the path, deciding the branch to take, the trajectory change (curve), or the velocity or distance to travel.



### transformation

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
















### future optimisations

maybe later after no need to debug, render offscreen:
https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
