export const isEmail = (val: string) => /\S+@\S+\.\S+/.test(val);

export const isPartialEmail = (val: string) => /\S+@/.test(val);
