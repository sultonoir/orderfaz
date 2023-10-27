"use client";
import axios from "axios";
import { SearchIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    if (name !== "") {
      const delay = setTimeout(() => {
        setIsLoading(true);
        axios
          .get(`https://restcountries.com/v3.1/name/${name}`)
          .then((response) => {
            if (response.data && response.data.length > 0) {
              // Ambil 5 data teratas jika lebih dari 5
              const top5Data = response.data.slice(0, 5);
              setData(top5Data);
              setError(null); // Reset pesan kesalahan jika data berhasil ditemukan
            } else {
              setData([]);
              setError("Data not found");
            }
          })
          .catch(() => {
            setError("Data not found");
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, 500);
      return () => clearTimeout(delay);
    } else {
      setName("");
      setIsLoading(false);
      setData([]);
      setError(null);
    }
  }, [name]);

  return (
    <div className="h-screen w-full flex flex-col gap-y-5 justify-center items-center">
      <h1 className="text-5xl font-semibold capitalize">Country</h1>
      <div className="relative w-full max-w-xl">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="peer flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-violet-500 disabled:cursor-not-allowed disabled:opacity-50 pr-10"
          placeholder="Ketik nama negara"
        />
        {isLoading ? (
          <Loader2Icon
            className="absolute right-2 top-2.5 peer-focus-visible:text-violet-500 text-gray-300 animate-spin"
            size={20}
          />
        ) : (
          <SearchIcon
            className="absolute right-2 top-2.5 peer-focus-visible:text-violet-500 text-gray-300"
            size={20}
          />
        )}
      </div>
      {error && (
        <p className="text-red-500 border border-gray-300 p-2 w-[576px] rounded-lg">
          {error}
        </p>
      )}
      {data.length > 0 && (
        <ul className="w-[576px] rounded-lg border border-gray-300">
          {data.map((country: any) => (
            <li
              key={country.area}
              className="w-full hover:bg-gray-300"
            >
              <Link
                href={`/${country.name.common}`}
                className="inline-flex w-full p-2"
              >
                {country.name.common}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
