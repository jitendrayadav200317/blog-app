import React from "react";
import { Button } from "@mantine/core";
import { motion } from "motion/react";

function Footer() {
  return (
    <footer className="bg-fuchsia-950 mt-12 px-6 py-10">
      <div className="flex flex-wrap justify-center gap-3 md:gap-5">
        <Button variant="filled" color="#6a1e55" size="xs" radius="lg">
          Agriculture
        </Button>
        <Button variant="filled" color="#6a1e55" size="xs" radius="lg">
          Business
        </Button>
        <Button variant="filled" color="#6a1e55" size="xs" radius="lg">
          Education
        </Button>
        <Button variant="filled" color="#6a1e55" size="xs" radius="lg">
          Entertainment
        </Button>
        <Button variant="filled" color="#6a1e55" size="xs" radius="lg">
          Art
        </Button>
        <Button variant="filled" color="#6a1e55" size="xs" radius="lg">
          Investment
        </Button>
        <Button variant="filled" color="#6a1e55" size="xs" radius="lg">
          Uncategorized
        </Button>
        <Button variant="filled" color="#6a1e55" size="xs" radius="lg">
          Weather
        </Button>
      </div>
      <motion.div
        className="mt-10 text-center text-sm text-gray-400 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        © {new Date().getFullYear()} All Rights Reserved — Jitendra Yadav
      </motion.div>
    </footer>
  );
}

export default Footer;
