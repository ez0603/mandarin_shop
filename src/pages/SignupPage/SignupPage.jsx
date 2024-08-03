import React from 'react'
import TermsAndConditions from './TACPage/TACPage'
import { Route, Routes } from 'react-router-dom'

function SignupPage() {
    return (
        <>
            <Routes>
                <Route path='/TAC' element={<TermsAndConditions/>} />
            </Routes>
        </>
    )
}

export default SignupPage

