import React from "react";
import {useSelector} from 'react-redux';

import SongPost from './oneSong/SongPost';

const Songs = () => {
    const allsongs = useSelector((state) => state.songs);

    console.log(allsongs);
    return (
        <>
        <h1>Post</h1>
        <SongPost />
        <SongPost />
        </>
    );
}

export default Songs;