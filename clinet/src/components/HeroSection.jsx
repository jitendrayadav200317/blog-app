import { motion } from "motion/react";
import img from "../assets/hero.png";
import { Button } from "@mantine/core";
import { Slide } from "react-awesome-reveal";

export default function HeroSection() {
  return (
    <Slide>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col-reverse md:flex-row items-center justify-between px-10 py-20 gap-10"
      >
        <div className="max-w-xl space-y-4 text-center md:text-left">
          <p className="text-4xl md:text-5xl font-bold text-orange-950">
            CREATE <span className="text-pink-400">A BLOGE</span>
          </p>

          <p className="text-pink-400 text-lg leading-relaxed">
            Share your story with the world. Create a beautiful, personalized
            blog that fits your brand.
          </p>

          <button className="inline-block mt-4 px-6 py-2 rounded-full text-pink-500 border border-pink-400 hover:bg-pink-400 hover:text-white transition-all duration-300 hover:scale-105">
            Explore Now
          </button>
        </div>

        <div className="flex justify-center items-center">
          <img src={img} alt="Hero" className="w-72 md:w-96 object-contain" />
        </div>
      </motion.div>
    </Slide>
  );
}
