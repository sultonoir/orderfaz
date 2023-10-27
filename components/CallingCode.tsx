"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
type Props = {
  code: string;
  title: string;
  desc: string;
  api: string;
  currency?: boolean;
};

const CallingCode = ({ code, title, desc, api, currency }: Props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${api}/${code}`)
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {
        return null;
      });
  }, [code, api]);
  return (
    <>
      {data.length > 0 &&
        data.map((item: any) => (
          <div
            key={item.numericCode}
            className="flex w-full p-5 flex-col gap-y-5 border border-gray-300 shadow-sm rounded-lg"
          >
            <p>{title}</p>
            <p className="text-3xl text-violet-500 font font-semibold ">
              {currency ? item.currencies[0].code : item.callingCodes}
            </p>
            <div className="inline-flex gap-x-2">
              <div className="group cursor-pointer relative">
                <p className="text-violet-500 underline">
                  {data.length} Countries
                </p>
                <div className="absolute hidden group-hover:flex bottom-[-45px] w-[150px] rounded-lg transition-all duration-500">
                  <p className="bg-gray-800 text-white w-full p-2 rounded-lg truncate transition-all duration-500">
                    {item.name}
                  </p>
                </div>
              </div>
              <p>{desc}</p>
            </div>
          </div>
        ))}
    </>
  );
};

export default CallingCode;
