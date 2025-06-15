import React from 'react'
import { Route, Routes } from 'react-router'
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

//tanstack query is used in place of useState,in useState we have to manually handle the loading state, error state and data state
// whereas in tanstack query it is handled automatically
//use mutation for post,delete,put requests and useQuery for get requests
//axions is like fetch but it is more powerful and has more features

//illustration of how to use tanstack query
// const { data, isLoading, error } = useQuery({
//   queryKey: ['exampleData'],
//   queryFn: async () => {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
//     return response.data
//   }
// })
// console.log(data, isLoading, error);

const App = () => {

  return (
    <div className="h-screen" data-theme="night">

      <Routes >
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App
