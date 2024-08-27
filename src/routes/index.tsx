import React from 'react';
import { Routes, Route } from 'react-router-dom';


//routes
import { authProtectedRoutes, publicRoutes } from './allRoutes';
// import AuthProtected from './AuthProtected';
import DefaultLayout from '../layout/DefaultLayout.tsx';

const Index = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route>
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <DefaultLayout>
                  {route.component}
                </DefaultLayout>
              }
              key={idx}
            />
          ))}
        </Route>

        {/*<Route>*/}
        {/*  {authProtectedRoutes.map((route, idx) => (*/}
        {/*    <Route*/}
        {/*      path={route.path}*/}
        {/*      element={*/}
        {/*        <AuthProtected>*/}
        {/*          <DefaultLayout path={route.path}>{route.component}</DefaultLayout>*/}
        {/*        </AuthProtected>}*/}
        {/*      key={idx}*/}
        {/*    />*/}
        {/*  ))}*/}
        {/*</Route>*/}
      </Routes>
    </React.Fragment>
  );
};

export default Index;