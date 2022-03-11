import logGreeting from './logGreeting';

describe('logGreeting', () => {
  it('should log "Hello, World!"', () => {
    // Arrange
    const log = jest.spyOn(console, 'log');

    // Act
    logGreeting('foo');

    // Assert
    expect(log).toHaveBeenCalledWith('Hello, foo!');

    // Teardown
    log.mockReset();
  });
});
