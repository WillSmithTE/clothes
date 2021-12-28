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
        userToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDbG90aGVzU2VydmVyIiwiaWF0IjoxNjM5NzQ3NTA2LCJleHAiOjE2NzEyODM1MDYsImF1ZCI6ImNsb3RoZXMiLCJzdWIiOiIiLCJ1c2VyX2lkIjoiMDk4MDk4NDIxLW9maTEyMzQzMSJ9.Pu1JM2mKMG0N-pi5NBGIVIA7idEAn_MxOwky-2-o_2M', //null,
    }
)
