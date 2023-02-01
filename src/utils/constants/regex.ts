const regName = /^(?=.{3,40}$)[a-zA-Z]+(?:[-'. ][a-zA-Z]+)*$/;

export const isNameValid = (name: string) => {
  return regName.test(name);
};
