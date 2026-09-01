import { Image } from "react-native";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  // Regex: Min 8 chars, 1 upper, 1 lower, 1 number, 1 special char
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const validImage = (urlPoster, setIsValidImage) => {
  if (!urlPoster) {
    setIsValidImage(false);
    return;
  }

  // Check remote dimensions dynamically
  Image.getSize(
    urlPoster,
    (width, height) => {
      // If the URL resolves to a 1x1 white tracking pixel, mark it invalid
      if (width <= 1 && height <= 1) {
        setIsValidImage(false);
      } else {
        setIsValidImage(true);
      }
    },
    () => {
      // Fallback for broken links or network errors
      setIsValidImage(false);
    },
  );
};
