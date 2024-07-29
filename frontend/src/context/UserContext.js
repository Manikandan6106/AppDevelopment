// // src/context/UserContext.js
// import React, { createContext, useState } from 'react';

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [userRole, setUserRole] = useState(null); // 'user', 'admin', or null

//   return (
//     <UserContext.Provider value={{ userRole, setUserRole }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
