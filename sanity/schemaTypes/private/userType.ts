export const userType = {
   name: "user",
   title: "User",
   type: "document",
   fields: [
      { name: "name", type: "string" },
      { name: "email", type: "string" },
      { name: "password", type: "string", hidden: true },
      { name: "image", type: "string" },
      { name: "emailVerified", type: "boolean" },
   ],
};
