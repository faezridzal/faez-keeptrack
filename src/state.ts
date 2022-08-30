import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";
import { initialProjectState, projectReducer } from "./projects/state/projectReducer";
import { ProjectState } from "./projects/state/projectTypes";

const reducer = combineReducers({
    projectState: projectReducer
});

export default function configureStore(preloadedState: any) {
    const middlewares = [ReduxThunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancer = composeWithDevTools(middlewareEnhancer);

    return createStore(reducer, preloadedState, enhancer);
}

export interface AppState {
    projectState: ProjectState
}

export const initialAppState: AppState = {
    projectState: initialProjectState
};

export const store = configureStore(initialAppState);