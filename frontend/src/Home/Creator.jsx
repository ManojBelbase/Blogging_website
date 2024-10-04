import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Creator = () => {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/users/admins"
        );
        setAdmin(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdmin();
  }, []);
  return (
    <div className="md:pl-6">
      <h1 className="text-lg font-semibold mb-4">Creators</h1>
      <div className="flex gap-2 md:gap-10 items-center">
        {admin && admin.length > 0
          ? admin.map((creator) => {
              return (
                <div
                  className="flex flex-col items-center justify-between"
                  key={creator._id}
                >
                  <div className="h-16 w-16 md:h-28 md:w-28 rounded-full border p-3 border-black">
                    <img
                      src={creator.photo.url}
                      alt=""
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <div>
                    <p className="capitalized">{creator.name}</p>
                    <p className="text-sm">{creator.education}</p>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Creator;
