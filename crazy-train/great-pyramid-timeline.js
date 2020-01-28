
import Moment from 'moment'

// according to this long article about how the great pyramids encode the day that a 12-yo boy met space beings
// ... is hilarious. he gives the idea that the pyramid makes a timeline that encodes the first world war,
// then, cluminates is 2038. the 2038 date caught my eye because of what my future self said (now, I sound crazy)
// so I thought, I might give it a try...

// these are pretty bold claims, and I love this sort of woo-woo stuff, so here we go..

// supposedly, up until the final part, each inch corresponds to a year.
// however, the scale is enlarged to be 30 days per inch starting at August 2, 1909

let begin = new Moment('08-02-1909', 'MMDDYYYY')

let pi = 1 / 1.00106 // with this one, ww1 ends on the correct day
// let pi = 1.00106 // with this one, ww1 starts on the correct day
// let pi = 1 // nothing

console.log('begin: ' + begin.format())

let first_trib_start = 5.05 * 12 * 30
let first_trib_end = (5.05 + 4.37) * 12 * 30

console.log('first_trib_start: ' + begin.clone().add(first_trib_start*pi, 'days').format())
console.log('first_trib_end: ' + begin.clone().add(first_trib_end*pi, 'days').format())

let second_trib_start = 19.19 * 12 * 30
let second_trib_end = (19.19 + 8.34) * 12 * 30

console.log('second_trib_start: ' + begin.clone().add(second_trib_start*pi, 'days').format())
console.log('second_trib_end: ' + begin.clone().add(second_trib_end*pi, 'days').format())

let right_turn_start = 44.70 * 12 * 30
let right_turn_end = (44.70 + 34.33) * 12 * 30 // begin of age of aquarius
let second_right_turn_end = (44.70 + 34.33 + 17.17) * 12 * 30
let third_right_turn_end = (44.70 + 34.33 + 17.17 + 34.33 - (21.5/12)) * 12 * 30

console.log('right_turn_start: ' + begin.clone().add(right_turn_start*pi, 'days').format())
console.log('right_turn_end: ' + begin.clone().add(right_turn_end*pi, 'days').format())
console.log('second_right_turn_end: ' + begin.clone().add(second_right_turn_end*pi, 'days').format())
console.log('third_right_turn_end: ' + begin.clone().add(third_right_turn_end*pi, 'days').format())

// this image gives normal inches:
// https://eduardopiperet.files.wordpress.com/2014/02/9.jpg

// 44.70 total
// from step to first low passage:
// 4.37
// first low passage:
// 9.42 - 4.37 = 5.05
// size of antichamber:
// 9.77
// second low passage:
// 8.34

// ... I conclude, it's a "load of crap" - lol, even trying to massage the numbers
// I can't get it to work -- and nothing, cept for WW1 comes even remotely close,
// even WW2 is way off, which was considerbly more of a 'tribulation' than WW1.
