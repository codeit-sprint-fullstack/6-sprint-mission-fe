'use client';
import React from 'react'
import H1Title from '../../../components/common/H1Title';
import SignUpForm from '../../../components/auth/SignUpForm'

export default function SignUpPage() {
    return (
        <div className="flex flex-col items-center w-full md:w-160">
            <H1Title logoType={"signup"} />
            <SignUpForm />
        </div>
    )
}
