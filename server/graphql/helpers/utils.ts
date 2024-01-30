export const toGlobalId = (type: string, id: string) => {
  return Buffer.from(`${type}:${id}`).toString('base64');
};

export const fromGlobalId = (globalId: string) => {
  const decoded = Buffer.from(globalId, 'base64').toString('ascii');
  const [type, id] = decoded.split(':');
  return { type, id };
};
