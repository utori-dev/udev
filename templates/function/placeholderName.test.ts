import placeholderName from './placeholderName';

describe('placeholderName', () => {
  it('should throw error', () => {
    // Arrange
    expect.assertions(1);

    try {
      // Act
      placeholderName({});
    } catch (error) {
      // Assert
      expect(error).toEqual(new Error('placeholderName is not implemented'));
    }
  });
});
