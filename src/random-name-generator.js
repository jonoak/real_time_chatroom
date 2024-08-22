const adjectives = ['Brave', 'Calm', 'Eager', 'Fancy', 'Gentle', 'Happy', 'Jolly', 'Kind', 'Lively', 'Merry', 'Nice', 'Proud', 'Quick', 'Silly', 'Witty'];
const nouns = ['Ant', 'Bear', 'Cat', 'Dog', 'Eagle', 'Fox', 'Goat', 'Hawk', 'Iguana', 'Jaguar', 'Koala', 'Lion', 'Monkey', 'Newt', 'Owl'];

const generate = () => {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adjective}${noun}${Math.floor(Math.random() * 1000)}`;
};

export default { generate };