import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TermsAndConditions from './TACPage/TACPage'
import AdminInfoPage from './AdminInfoPage/AdminInfoPage'

function SignupPage() {
    return (
        <>
            <Routes>
                <Route path='/TAC' element={<TermsAndConditions/>} />
                <Route path='/adminInfo' element={<AdminInfoPage/>} />
            </Routes>
        </>
    )
}

export default SignupPage

