import greetWorld from './greetWorld';

describe('greetWorld', () => {
  it('should log "Hello, World!"', () => {
    // Arrange
    const log = jest.spyOn(console, 'log');

    // Act
    greetWorld();

    // Assert
    expect(log).toHaveBeenCalledWith('Hello, World!');

    // Teardown
    log.mockReset();
  });
});
