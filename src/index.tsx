import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";

/**
 * @author Mateusz Barnacki
 * @version 1.0
 * @since 2022-08-23
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);