
import Cookies from "js-cookie";

export const getToken = () =>{
    if(typeof window != "undefined")
    {
        const token = Cookies.get('token');
        return token;
    }
}

export const setToken = (token_value:string) => {
    Cookies.set('token', token_value);
    trackUserActivity(15); 
}

const removeToken = () => {
    Cookies.remove('token');
    window.location.reload();
}

const trackUserActivity = (timeoutMinutes:any) => {
    let inactivityTimeout:any;
    const resetInactivityTimeout = () => {
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(() => {
            removeToken();
        }, timeoutMinutes * 60 * 1000); 
    }

    ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach(event => {
        window.addEventListener(event, resetInactivityTimeout);
    });

    resetInactivityTimeout(); 
}

