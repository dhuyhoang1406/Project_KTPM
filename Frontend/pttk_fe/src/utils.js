export const convertPrice = (price) => {
    try {
        const result  = price?.toLocaleString().replaceAll(',', '.')
        return `${result} VND`
    } catch (error) {
        return null
    }
}

export const isValidPhoneNumber = (phoneNumber) => {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

    const isValidLength = cleanedPhoneNumber.length === 10;

    const isValidPrefix = /^(0)(3|5|7|8|9)/.test(cleanedPhoneNumber);

    return isValidLength && isValidPrefix;
  };

  