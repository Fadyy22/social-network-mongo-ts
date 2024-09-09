function normalizeEmail(email) {
  const [local, domain] = email.split('@');

  // For Gmail addresses, remove dots in the local part
  let normalizedLocal = local.toLowerCase();
  if (domain.toLowerCase() === 'gmail.com') {
    normalizedLocal = normalizedLocal.replace(/\./g, '');
  }

  return `${normalizedLocal}@${domain.toLowerCase()}`;
}

console.log(normalizeEmail('Fady.alaa@yahoo.com'));
