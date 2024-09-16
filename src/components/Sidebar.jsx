import React, { useState } from "react";
import logo from "../images/logo.png";
import sun from "../images/icon-sun.svg";
import moon from "../images/icon-moon.svg";
import avatar from "../images/image-avatar.jpg";
import useDarkMode from "../hooks/useDarkMode";
import { motion } from "framer-motion";

export default function Sidebar() {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = () => {
    setTheme(colorTheme);
    setDarkSide((state) => !state);
  };

  const transition = {
    type: "spring",
    stiffness: 200,
    damping: 10,
  };
  return (
    <div className="bg-[#1f2139] h-[100vh] rounded-r-3xl flex  flex-col justify-between z-[9999]">
      <img src={logo} alt="" />
      <div className="flex flex-col items-center">
        {colorTheme === "light" ? (
          <motion.img
            onClick={toggleDarkMode}
            initial={{ scale: 0.6, rotate: 90 }}
            animate={{ scale: 1, rotate: 360, transition }}
            whileTap={{ scale: 0.9, rotate: 15 }}
            src={moon}
            className="h-6 mb-7"
          />
        ) : (
          <motion.img
            className=" h-7 mb-7"
            onClick={toggleDarkMode}
            whileTap={{ scale: 0.9, rotate: 15 }}
            initial={{ rotate: 45 }}
            animate={{ rotate: 360, transition }}
            src={sun}
          />
        )}
        <img src={avatar} alt="" className="rounded-full h-14 mb-3" />
      </div>
    </div>
  );
}
