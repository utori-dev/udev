import createGreeting from './createGreeting';

describe('createGreeting', () => {
  it('should log "Hello, World!"', () => {
    // Act
    const result = createGreeting('foo');

    // Assert
    expect(result).toBe('Hello, foo!');
  });
});
