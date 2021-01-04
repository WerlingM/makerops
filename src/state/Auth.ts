import { ActionCreator, Reducer } from "redux";

export enum ActionTypes {
    login="AUTH/LOGIN",
    logout="AUTH/LOGOUT"
}

export interface LoginAction {
    type: ActionTypes.login;
}

export const login: ActionCreator<LoginAction> = () => 
({type: ActionTypes.login});

export interface LogoutAction {
    type: ActionTypes.logout;
}

export const logout: ActionCreator<LogoutAction> = () => 
({type: ActionTypes.logout});

export type Actions = LoginAction | LogoutAction;

export interface AuthState {
    loggedIn: boolean;
    token: string;
    username: string;
}

const InitialState: AuthState = {
    loggedIn: false,
    token: "",
    username: ""
}

export const authReducer: Reducer<AuthState, Actions> = (state=InitialState, action: Actions) => {
    let newState = Object.assign({}, state);
    switch(action.type) {
        case(ActionTypes.login):
            newState = {...state, loggedIn: true};
            break;
        case(ActionTypes.logout):
            newState = {...state, loggedIn: false};
            break;
    }
    return newState;
};