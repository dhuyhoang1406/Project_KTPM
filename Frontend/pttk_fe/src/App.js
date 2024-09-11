import React, { Fragment, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/routes';
import DefaultLayout from './layouts/DefaultLayout';
import Loader from './components/loader/Loader'
import { useDispatch } from 'react-redux';
import * as UserService from './services/UserService'
import { updateUser } from './redux/slides/userSlide';

function App() {

    const dispatch = useDispatch()

    useEffect(()=> {
        const id = Number(localStorage.getItem('id')) || null
        if(id !== null) {
            const username = localStorage.getItem('Username')
            const password = localStorage.getItem('Password')
            const data = {Username: username, Password: password}
            handleGetDetailsUser(id,data)
        }
    },[])

    const handleGetDetailsUser = async (id, data) => {
        try {
            const infoUser = await UserService.getDetailsUser(id, data)
            if (infoUser && infoUser.data) {
                const {
                    hoTen = '',
                    email = '',
                    diaChi = '',
                    soDienThoai = '',
                    maTK = '',
                    vaiTro = '',
                    ngaySinh = '',
                    gioiTinh = '',
                  } = infoUser.data;
                  dispatch(
                    updateUser({
                      hoTen,
                      email,
                      diaChi,
                      soDienThoai,
                      maTK,
                      vaiTro,
                      ngaySinh,
                      gioiTinh,
                    })
                  );
            } else {
                console.error('No user data found.');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }
    

    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Suspense>
        </Router>
    );
}

export default App;
