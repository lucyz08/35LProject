import { combineReducers } from "redux";

import songs from './songsRedx';
import prompts from './promptsRedx';

export const reducers = combineReducers({
    songs: songs,
    prompts: prompts
});