import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

//login
import Login from "./components/Auth/Login/login.jsx";
import Signup from "./components/Auth/signup/signup.jsx";
import { auth } from "./components/Auth/firebase";

import Home from './pages/Home';
import History from './pages/History';
import EditorPage from './pages/EditorPage';

function App() {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUserName(user.displayName);
            } else setUserName("");
        });
    }, []);


    return (
        <>
            <div>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        success: {
                            theme: {
                                primary: '#4aed88',
                            },
                        },
                    }}
                ></Toaster>
            </div>
            <BrowserRouter>
                <Routes>

                    <Route path="/" element={<Login />} ></Route>
                    <Route path="/signup" element={<Signup />} ></Route>
                    <Route path="/home" element={<Home name={userName} />} ></Route>
                    <Route path="/history" element={<History />}></Route>
                    <Route
                        path="/editor/:roomId"
                        element={<EditorPage />}
                    ></Route>
                </Routes>
            </BrowserRouter>

        </>
    );
}

export default App;
