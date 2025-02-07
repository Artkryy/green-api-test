export const cleanPhoneNumber = (phone: string) => {
  return phone.replace(/\D/g, "");
};
