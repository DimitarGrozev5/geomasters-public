export const nzEmail = (email: string) => {
  return email.trim().toLowerCase();
};

export const nzPhone = (phone: string) => {
  return phone.trim().replaceAll(' ', '');
};
