import axios from "axios";
import React, { useEffect, useState } from "react";

const Creater = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/users/admins"
        );
        setCreators(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-4">
        {creators.map((elem) => {
          return (
            <div
              key={elem._id}
              className="relative h-60 w-52 border rounded-md hover:shadow-lg hover:translate-x-1"
            >
              <div className="relative h-24 w-full">
                <img
                  src={elem.photo.url}
                  className="w-full h-full rounded-t-md object-cover"
                  alt=""
                />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 h-14 w-14 rounded-full border-2 border-black">
                  <img
                    src={elem.photo.url}
                    alt=""
                    className="w-full h-full border-2 border-white rounded-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col mt-6 items-center justify-center">
                <p className="text-xl font-medium capitalize">{elem.name}</p>
                <p className="text-gray-600 text-sm">{elem.email}</p>
                <p className="text-gray-600 text-sm">{elem.role}</p>
                <p className="text-gray-600 text-sm">{elem.education}</p>
                <p className="text-gray-600 text-sm">{elem.phone}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Creater;
