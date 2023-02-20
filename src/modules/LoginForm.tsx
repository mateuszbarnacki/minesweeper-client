import React from 'react';
import * as P from "../api/paths";
import {AuthenticationDto} from "../api/apiModels";
import {localStorageAuthToken} from "../api/constants";

/**
 * @author Mateusz Barnacki
 * @version 2.0
 * @since 2023-02-20
 */
const LoginForm: React.FC = () => {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            login: { value: string };
            password: { value: string };
        };
        const login: string = target.login.value;
        const password: string = target.password.value;
        const user: AuthenticationDto = {username: login, password: password};
        fetch(P.base + P.userAuthentication,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            }
        ).then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            const token = json.token;
            window.localStorage.setItem(localStorageAuthToken, token);
            window.location.href = '/game';
        });
    };

    return (
        <div className="login-form">
            <form onSubmit={onSubmit}>
                <input type="text"
                       name="login"
                       placeholder="login"
                       onFocus={(e) => e.target.placeholder = ""}
                       onBlur={(e) => e.target.placeholder = "username"}/>
                <input type="password"
                       name="password"
                       placeholder="password"
                       onFocus={(e) => e.target.placeholder = ""}
                       onBlur={(e) => e.target.placeholder = "password"}/>
                <input type="submit" value="Sign in"/>
            </form>
        </div>
    )
}

export default LoginForm;