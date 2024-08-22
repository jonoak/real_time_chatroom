import randomName from './random-name-generator';

test('should generate a random name', () => {
    const name = randomName.generate();
    expect(name).toMatch(/^[A-Za-z]+[A-Za-z]+\d{1,3}$/);
});

