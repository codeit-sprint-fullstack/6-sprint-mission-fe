'use client';
import React from 'react'
import H1Title from '../../../components/common/H1Title';
import LoginForm from '../../../components/auth/LoginForm'

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center w-full md:w-160">
            <H1Title logoType={"login"} />
            <LoginForm />
        </div>
    )
}
