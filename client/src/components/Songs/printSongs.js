import React from "react";
import {useSelector} from 'react-redux';

import SongPost from './oneSong/SongPost';
import './printsongs.css'

const Songs = () => {
    const allsongs = useSelector((state) => state.songs);

    console.log(allsongs);
    return (
        <>
            <SongPost />
        </>
    );
}

export default Songs;