// import { getAuth } from 'firebase/auth';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { FC } from 'react';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';


// interface IProtectedRouterProps {}

// const ProtectedRoutes: FC<IProtectedRouterProps> = () => {
//     const auth = getAuth();
//     const [user, loading] = useAuthState(auth);
//     const location = useLocation();

//     if(loading) {
//         return <div>Loading...</div>;
//     }

//     return user ? (
//         <Outlet />
//     ) : (
//         <Navigate to='*' state={{ from: location }} />
//     );
// };

// export default ProtectedRoutes;