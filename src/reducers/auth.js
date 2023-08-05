import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducers = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('Profile',JSON.stringify({...action?.data, googleId: action.data.result.id}))
            return {...state, authData: action?.data}
        case LOGOUT:
            localStorage.clear()
            return {...state, authData: null}
        default:
            return state
    }
}

export default authReducers