require('readline')
    .createInterface({input: process.stdin})
    .on('line', line => console.log(line + ' => ' + toBerlinClock(line)));

const toBerlinClock = (line) => {
    const berlinClock = new BerlinClock(line.split(':'));
    return berlinClock.getConvertedTime();
}

Number.prototype.mod = function (number) {
    return this % number;
};

Number.prototype.inc = function (number) {
    return this + number;
}

Number.prototype.isEven = function () {
    return this % 2 === 0;
}
Number.prototype.isDividableByNumber = function (number) {
    return this % number === 0;
}

class BerlinClock {
    constructor([hours, minutes, seconds]) {
        [this.hours, this.minutes, this.seconds] = [hours, minutes, seconds];
        [this.fiveHours, this.oneHours] = this.calculateOnesAndFives(this.hours);
        [this.fiveMinutes, this.oneMinutes] = this.calculateOnesAndFives(this.minutes);
    }

    getConvertedTime() {
        return [this.getSeconds(), this.getHours(this.fiveHours), this.getHours(this.oneHours), this.getMinutes(this.fiveMinutes), this.getHours(this.oneMinutes)].join(' ');
    }

    calculateOnesAndFives = (time) => {
        return [parseInt(time / 5), parseInt(time).mod(5)];
    }

    getHours = (input) => {
        return 'X'.repeat(input) + '.'.repeat(4 - input);
    }

    getMinutes = () => {
        const minArray = Array.from(Array(this.fiveMinutes).keys());
        const mins = minArray.map(min => (min.inc(1)).isDividableByNumber(3) ? '|' : 'X');
        return mins.join('') + '.'.repeat(11 - this.fiveMinutes);
    }

    getSeconds() {
        return parseInt(this.seconds).isEven() ? '.' : 'X';
    }
}