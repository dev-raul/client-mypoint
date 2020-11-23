export const stringFilterNumber = (v: string): string => {
  return v.replace(/[^0-9]/g, "");
};
