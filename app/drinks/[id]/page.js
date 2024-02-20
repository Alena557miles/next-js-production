import React from "react";
import Link from "next/link";
import Image from "next/image";

const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const getSingleDrink = async (id) => {
  const response = await fetch(url + id);
  if (!response.ok) {
    throw new Error("Failed to fetch a drink");
  }
  const data = await response.json();
  return data;
};

const SingleDrinkPage = async ({ params }) => {
  const data = await getSingleDrink(params.id);
  const title = data?.drinks[0]?.strDrink;
  const imgSrc = data?.drinks[0]?.strDrinkThumb;
  console.log(data);
  return (
    <div>
      <Link href="/drinks" className="btn btn-primary mt-8 mb-12">
        Back to drinks list
      </Link>
      <h1 className="text-4xl mb-8">{title}</h1>
      <Image
        src={imgSrc}
        width={400}
        height={400}
        className="w-48 h-48 rounded-lg shadow-lg mb-4"
      />
    </div>
  );
};

export default SingleDrinkPage;
