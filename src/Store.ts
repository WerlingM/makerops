import { combineReducers, Store, createStore} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { authReducer, AuthState } from "./state/Auth";

export interface AppState {
    auth: AuthState;
}

const rootReducer = combineReducers<AppState>({
    auth: authReducer
});

export default function configureStore(): Store<AppState> {
    const store = createStore(rootReducer, undefined, composeWithDevTools());
    return store;
}