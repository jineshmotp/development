export const combineSearchedIn = (data: Array<{ searched_in?: string[] }>): string[] => {
  return data.reduce((acc, item) => {
    if (item.searched_in) {
      return acc.concat(item.searched_in);
    }
    return acc;
  }, [] as string[]);
};

export const getUniqueSearchedText = (
  data: Array<{ searched_text: string }>,
  limit: number = 10
): Array<{ label: string }> => {
  // Extract searched_text and capitalize the first character
  const texts = data?.map(item => {
    const text = item?.searched_text;
    return text?.charAt(0)?.toUpperCase() + text?.slice(1)?.toLowerCase();
  });

  // Remove duplicates
  const uniqueTexts = Array.from(new Set(texts));

  // Slice the array to get the desired number of items
  const limitedUniqueTexts = uniqueTexts?.slice(0, limit);

  // Transform into an array of objects with the label property
  return limitedUniqueTexts.map(text => ({ label: text, img: require('@/assets/images/global-search/pm.png') }));
};
