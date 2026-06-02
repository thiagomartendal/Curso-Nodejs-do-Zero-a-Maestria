import { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'
import Message from './components/layout/Message'

import Index from './pages/Index'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Profile from './pages/User/Profile'
import MyPet from './pages/Pet/MyPet'
import AddPet from './pages/Pet/AddPet'
import EditPet from './pages/Pet/EditPet'
import PetDetail from './pages/Pet/PetDetail'
import MyAdoption from './pages/Pet/MyAdoptions'

import Context from './context/Context'
import UserProvider from './context/UserContext'

import './App.css'

function AppRoute({children}) {
  const {authenticated} = useContext(Context)

  if (authenticated.auth === undefined)
    return (
      <div id="loading">
        <h1>Carregando...</h1>
      </div>
    )

  if (authenticated.auth === false)
    return <Navigate to="/" />

  return children
}

function App() {
  return (
    <div className='app'>
      <Router>
        <UserProvider>
          <Navbar />
          <Message />
          <Container>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user/profile" element={
                <AppRoute>
                  <Profile />
                </AppRoute>
              } />
              <Route path="/pet/mypets" element={
                <AppRoute>
                  <MyPet />
                </AppRoute>
              } />
              <Route path="/pet/add" element={
                <AppRoute>
                  <AddPet />
                </AppRoute>
              } />
              <Route path="/pet/edit/:id" element={
                <AppRoute>
                  <EditPet />
                </AppRoute>
              } />
              <Route path="/pet/myadoptions" element={
                <AppRoute>
                  <MyAdoption />
                </AppRoute>
              } />
              <Route path="/pet/:id" element={
                <AppRoute>
                  <PetDetail />
                </AppRoute>
              } />
            </Routes>
          </Container>
          <Footer />
        </UserProvider>
      </Router>
    </div>
  )
}

export default App