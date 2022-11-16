import React from "react";
import {useSelector} from 'react-redux';

import SongPost from './Post/SongPost';

const Posts = () => {
    const posts = useSelector((state) => state.posts);

    console.log(posts);
    return (
        <>
        <h1>Post</h1>
        <SongPost />
        <SongPost />
        </>
    );
}

export default Posts;