export function formatDescription(descriptionText: string) {
  const descriptionArray = descriptionText.split('\n');
  // Join the array back into a single string with periods and spaces
  return descriptionArray.join('. ') + '.';
}
