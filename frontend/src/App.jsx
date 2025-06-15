import React from 'react'
import { Route, Routes,Navigate } from 'react-router'
import Homepage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import CallPage from './pages/CallPage.jsx'
import ChatPage from './pages/ChatPage.jsx'


import { useEffect,useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import  { Toaster } from 'react-hot-toast'
import { axiosInstance } from './lib/axios.js'

//tanstack query is used in place of useState,in useState we have to manually handle the loading state, error state and data state
// whereas in tanstack query it is handled automatically
//use mutation for post,delete,put requests and useQuery for get requests
//axions is like fetch but it is more powerful and has more features


const App = () => {

  //auth check
  const {data:authData,isLoading,error} = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const response = await axiosInstance.get('/auth/me');
      return response.data;
    },
    retry: false, // Disable automatic retries on failure
  });

  const authUser=authData?.user

  return (
    <div className="h-screen" data-theme="night">

      <Routes >
        <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/login"/>} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/"/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/"/>} />
        <Route path="/onboarding" element={authUser ? <OnboardingPage /> : <Navigate to="/login"/>} />
        <Route path="/notifications" element={authUser ? <NotificationsPage /> : <Navigate to="/login"/>} />
        <Route path="/call" element={authUser ? <CallPage /> : <Navigate to="/login"/>} />
        <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="/login"/>} />
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App
