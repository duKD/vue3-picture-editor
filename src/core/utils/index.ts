export const callWithErrorHandling = (fn: Function, ...args: unknown[]) => {
  try {
    fn(...(args ?? []));
  } catch (err) {
    console.error(err);
  }
};
