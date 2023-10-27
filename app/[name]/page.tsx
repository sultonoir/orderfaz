import Link from "next/link";
import React from "react";
import { ArrowLeftIcon } from "lucide-react";
import axios from "axios";
import Image from "next/image";
import CallingCode from "@/components/CallingCode";

const Page = async ({ params }: { params: { name: string } }) => {
  const name = decodeURI(params.name);
  const country = await axios
    .get(`https://restcountries.com/v3.1/name/${name}`)
    .then((data) => {
      return data;
    });
  const [data] = country.data;
  const latlng = data.latlng[0] + ", " + data.latlng[1];
  const capital = data.capital;
  const root = data.idd.root.replace("+", "");
  const [suffixes] = data.idd.suffixes;
  const call = root + suffixes;

  return (
    <section className="mx-auto container mt-5">
      <div className="w-full">
        <Link
          href={"/"}
          className="px-2 py-1 rounded-lg bg-violet-500 text-white inline-flex gap-x-2"
        >
          <ArrowLeftIcon />
          Back to home
        </Link>
      </div>

      <div className="inline-flex gap-x-1 mt-10">
        <p className="text-5xl font-semibold">{data.name.common}</p>
        <Image
          src={data.flags.svg}
          alt={data.name}
          width={50}
          height={30}
          className="shadow-sm"
        />
      </div>
      <div className="flex w-full gap-x-1 mb-5 mt-2">
        {data.altSpellings.map((spell: string) => (
          <p
            key={spell}
            className="px-2 py-1 rounded-full bg-[#8DD4CC] text-white truncate"
          >
            {spell}
          </p>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div className="border border-gray-300 shadow-sm rounded-lg">
          <div className="flex w-full p-5 flex-col gap-y-5">
            <p>LatLong</p>
            <p className="text-3xl text-violet-500 font font-semibold ">
              {latlng}
            </p>
          </div>
        </div>
        <div className="border border-gray-300 shadow-sm rounded-lg">
          <div className="flex w-full p-5 flex-col gap-y-2">
            <p>Capital : {capital}</p>
            <p>region : {data.region}</p>
            <p>subregion : {data.subregion}</p>
          </div>
        </div>
        <CallingCode
          code={call}
          title="Calling code"
          desc="with this calling code"
          api="https://restcountries.com/v2/callingcode"
        />
        <CallingCode
          code={call}
          title="Currency"
          desc="with this currency"
          currency
          api="GET  https://restcountries.com/v2/currency"
        />
      </div>
    </section>
  );
};

export default Page;
