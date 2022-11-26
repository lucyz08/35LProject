import './friends.css';

export default function Friends() {
  return (
    <>
    <div className="friendPic">
        <h1 className="picText">your friends</h1>
    </div>
    <div className="friendplay">
      <div className="friends">
        <h1 className="friendTitle">Your Friends</h1>
        <div className="friendList" >
          <div>Friend1</div>
          <div>Friend2</div>
          <div>Friend3</div>
        </div>
      </div>
      <div className="playlist">
        <h1 className="friendTitle">Your Daily Playlist</h1>
        <div className="playlistSongs">
          <div>song1</div>
          <div>song2</div>
        </div>
      </div>
    </div>
    <div className="addFriend">
      <h1 className="findTitle">Add Friends</h1>
      <div>Put friend search bar here</div>
    </div>
    
    </>
  )
}
