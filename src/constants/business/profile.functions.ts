export function generateBusinessId(number: number): string {
  let businessid = "";
  for (let i = 0; i < number; i++) {
    businessid += Math.floor(Math.random() * 10);
  }
  return businessid;
}

export function validateCIN(cin: string): boolean {
  const cinRegex = /^([A-Z])(\d{5})([A-Z]{2})(\d{4})([A-Z]{3})(\d{6})$/;
  if (cinRegex.test(cin)) {
    return true;
  } else {
    return false;
  }
}
