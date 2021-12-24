// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// function ProtectedRoutes({ component: Component, ...rest }) {
//   const auth = localStorage.getItem('token');

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (auth) return <Component {...props} />;
//         else return <Navigate to={{ path: '/' }} />;
//       }}
//     />
//   );
// }

// export default ProtectedRoutes;
