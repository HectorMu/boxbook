import React from "react";
import FriendList from "../../containers/User/Social/FriendList";

const Friends = () => {
  return (
    <div className="container py-5 ">
      <h5 className="mb-5">
        Your friends
        <FriendList />
      </h5>
    </div>
  );
};

export default Friends;
