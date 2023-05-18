export const validateInput = (value: string) => {
    if (value.trim() === "") {
      return "emptyInputMessage";
    }
    return undefined;
  };