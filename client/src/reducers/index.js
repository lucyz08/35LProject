import { combineReducers } from "redux";

import songs from './songsRedx';
import prompts from './promptsRedx';
import auth from  './authRedx';
import users from './userRedx'

export const reducers = combineReducers({
    songs: songs,
    prompts: prompts,
    auth: auth,
    users: users
});