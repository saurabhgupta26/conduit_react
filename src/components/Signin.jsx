import React from 'react';

function Signin(props) {
    return (
        <>
        <div className="signup_card">
            <h1>
                Sign In
            </h1>
            <a className='primary_color' href="/signup">Need an account?</a>
            <form action="" className='flex flex2'>                
                <input className='form_field' type="email" name="email" placeholder='Email'/>
                <input className='form_field' type="password" name="password" placeholder='*****'/>
                <input type="submit" value="Sign in" className='primary primary_btn'/>
            </form>

        </div>
        </>
    )
}

export default Signin;