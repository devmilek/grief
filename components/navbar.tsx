import { ChefHat } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link href="/">
          <ChefHat />
          grien
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
