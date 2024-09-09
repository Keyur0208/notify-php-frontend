"use client"
import { Button, Image } from "@nextui-org/react";
import { Metadata } from "next";
import Cookies from "js-cookie";
import { Link } from "@nextui-org/react";
// ----------------------------------------------------------------------

export const metadata: Metadata = {
   title: "404 Page Not Found"
};

export default function not_found() {
   return (
      <div className="h-dvh w-full flex justify-center items-center">
         <div>
            <div className="flex justify-center mb-2" >
               <Image
                  src="/logo2.svg"
                  alt="logo"
               />
            </div>
            <h1 className="text-xl mb-3" >404 -  Not Found Page</h1>
            <div className="text-center" >
               <Button
                  color="primary"
                  href="/"
                  as={Link}
                  className="text-white"
                  onClick={()=>{Cookies.remove("token")}}
               >
                  Home
               </Button>
            </div>
         </div>
      </div>
   )
}