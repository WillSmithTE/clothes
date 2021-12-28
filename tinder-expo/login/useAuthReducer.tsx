import React from 'react';
import { saveToken } from './token';

export const useAuthReducer = () => React.useReducer((prevState: any, action: any) => {
    switch (action.type) {
        case 'RESTORE_TOKEN':
            return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
            };
        case 'SIGN_IN':
            saveToken(action.token)
            return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
            };
        case 'SIGN_OUT':
            saveToken(null)
            return {
                ...prevState,
                isSignout: true,
                userToken: null,
            };
    }
},
    {
        isLoading: true,
        isSignout: false,
        userToken: '1234', //null,
    }
)
