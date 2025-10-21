export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');

  if (digits.length !== 11 || digits[0] !== '7') {
    throw new Error('Неверный формат номера');
  }

  const match = digits.match(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (!match) return phone;

  return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
}
