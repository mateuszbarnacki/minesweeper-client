import React from 'react';

const Form: React.FC = () => {
    return (
        <div className="login-form">
            <form>
                <input type="text"
                       placeholder="login"
                       onFocus={(e) => e.target.placeholder = ""}
                       onBlur={(e) => e.target.placeholder = "login"}/>
                <input type="password"
                       placeholder="password"
                       onFocus={(e) => e.target.placeholder = ""}
                       onBlur={(e) => e.target.placeholder = "password"}/>
                <input type="submit" value="Sign in"/>
            </form>
        </div>
    )
}

export default Form;