const assert = require('assert');

require('readline')
    .createInterface({input: process.stdin})
    .on('line', line => console.log(line + ' => ' + toBerlinClock(line)));

const toBerlinClock = (line) => {
    const [hours, minutes, seconds] = splitTime(line);
    const [fiveHours, oneHours] = calculateTime(hours);
    const [fiveMinutes, oneMinutes] = calculateTime(minutes);

    return `${toSeconds(seconds)} ${getHours(fiveHours)} ${getHours(oneHours)} ${getMinutes(fiveMinutes)} ${getHours(oneMinutes)}`;
}

const splitTime = (time) => {
    return [...time.split(':')];
}
const toSeconds = (seconds) => {
    return seconds % 2 === 0 ? '.' : 'X';
}

const calculateTime = (time) => {
    return [parseInt(time / 5), time % 5];
}

const getHours = (hours) => {
    const diff = 4 - hours;
    return 'X'.repeat(hours) + '.'.repeat(diff);
}

const getMinutes = (minutes) => {
    const minArray = Array.from(Array(minutes).keys());
    const mins = minArray.map(min => (min + 1) % 3 === 0 ? '|' : 'X');
    const diff = 11 - minutes;
    return mins.join('') + '.'.repeat(diff);
}

assert.equal(toBerlinClock('00:00:00'), '. .... .... ........... ....');
assert.equal(toBerlinClock('22:23:18'), '. XXXX XX.. XX|X....... XXX.');
assert.equal(toBerlinClock('00:00:01'), 'X .... .... ........... ....');