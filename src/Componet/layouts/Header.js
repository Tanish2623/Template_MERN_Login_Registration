import React from 'react';
import {Link} from 'react-router-dom'
import AuthOption from '../auth/AuthOption'
export default function Header() {
    return (
        <header id="header">
            <Link to="/" ><h1 className="title">Authenticate</h1></Link>
            <AuthOption></AuthOption>
        </header>
    )
}