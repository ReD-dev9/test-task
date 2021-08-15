import {ApiAuth} from '../services';

export const login = (item) => {
    return async dispatch => {
        await ApiAuth.login(item).then(res => {
            const data = res.data;
            dispatch({type: 'LOGIN', payload: data});
            localStorage.setItem("token", data);
        }).catch(error => console.log(error))
    }
}
export const auth = (token) => {
    return async dispatch => {
         await dispatch({type: 'LOGIN', payload: token});
         await localStorage.setItem("token", token);
    }
}

export const getProfile = () => {
    return async dispatch => {
        await ApiAuth.profile().then(res => {
            const data = res.data;
            dispatch({type: 'GET_PROFILE', payload: data});
        }).catch(error => {
            console.log(error);
        });
    }
}

export const logout = () => {
    return async dispatch => {
        await localStorage.removeItem("token");
        await dispatch({type: 'LOGIN', payload: null});
    }
};



