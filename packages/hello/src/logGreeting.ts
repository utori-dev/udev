import createGreeting from './createGreeting';

/**
 * Logs a greeting that says 'Hello, `name`!'
 *
 * @param name Name of individual or group to greet
 */
function logGreeting(name: string): void {
  console.log(createGreeting(name));
}

export default logGreeting;
