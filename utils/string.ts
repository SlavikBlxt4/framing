export const formatUsernameFromEmail = (email: string): string => {
    const namePart = email.split("@")[0]; // "admin.jefe"
    
    return namePart
      .split(".")                            // ["admin", "jefe"]
      .map(part => part.charAt(0).toUpperCase() + part.slice(1)) // ["Admin", "Jefe"]
      .join(" ");                            // "Admin Jefe"
};
  