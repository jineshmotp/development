export const isArray = (data: [] | undefined | null) => {
  return Array.isArray(data) && data?.length > 0;
};
