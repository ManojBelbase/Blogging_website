import React from "react";

const MyProfile = ({ profile }) => {
  console.log(profile);
  return (
    <div className="pt-8 pl-3 md:pl-0 md:ml-60 ">
      <div>
        <img src={profile?.data?.photo?.url} alt="" />
      </div>
    </div>
  );
};

export default MyProfile;
