export const promiseError = {
  render: ({ data }) => data.statusText || data.message,
};
