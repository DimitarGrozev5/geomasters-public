export function assertDefined<T>(
  value: T | null,
  message = 'Value is undefined.'
): asserts value is T {
  if (value === null) {
    throw new Error(message);
  }
}
