export const nameInitials = (name) =>
  name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
