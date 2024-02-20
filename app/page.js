import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-7xl">Next.Js Tutorial</h1>
      <Link href="/client" className="btn btn-accent">
        client page
      </Link>
    </div>
  );
};

export default HomePage;
