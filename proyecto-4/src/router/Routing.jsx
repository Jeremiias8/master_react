import React from 'react'
import { Routes, Route, BrowserRouter, Navigate, Link } from 'react-router-dom'
import { PrivateLayout } from '../components/layout/private/PrivateLayout';
import { PublicLayout } from '../components/layout/public/PublicLayout';
import { Login } from '../components/user/Login';
import { Register } from '../components/user/Register';
import { Feed } from '../components/publication/Feed';
import { AuthProvider } from '../context/AuthProvider';

export const Routing = () => {

  return (
    <div>
        <code>Routing</code>

        <BrowserRouter>
          <AuthProvider>
            <Routes>

                <Route path="/" element={<PublicLayout />}>
                    <Route index element={<Login />} />
                    <Route path="login" element={<Login />} />
                    <Route path="registro" element={<Register />} />
                </Route>

                <Route path="/social" element={<PrivateLayout />}>
                  <Route index element={<Feed />} /> 
                  <Route path="feed" element={<Feed />} /> 
                </Route>

                <Route path="*" element={
                  <>  
                    <p>
                      <h1>Error 404</h1>

                      <Link to="/">Ir a INICIO</Link>
                    </p>
                  </>
                }>
                </Route>

            </Routes>
          </AuthProvider>
        </BrowserRouter>
    </div>
  );

}
