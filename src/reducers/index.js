import ACTION_TYPES from '../actions/action_types';

const defaultUser = {
    name: 'anonymous',
    email: 'empty email',
};

const initialState = {
    links: {
        home: {
            label: 'Home',
            href: '/',
        },
        login: {
            label: 'Login',
            href: '/login',
        },
        signup: {
            label: 'Signup',
            href: '/signup',
        }
    },
    isLogin: false,
    activeUser: defaultUser,
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_SUCCESS:
            return {
                ...state,
                isLogin: true,
                activeUser: action.payload,
            };

        case ACTION_TYPES.LOGOUT_SUCCESS:
            return {
                ...state,
                isLogin: false,
                activeUser: defaultUser,
            };

        default:
            return state;
    }
};

export default reducer;

