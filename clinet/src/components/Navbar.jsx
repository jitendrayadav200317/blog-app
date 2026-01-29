import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@mantine/core";
// import {Button } from "@mui/material"
import { useSelector } from "react-redux";
import { signOut } from "../redux/slice/authSlice.js";
import { getCookies } from "../utils/utils.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Navbar() {
  const { authenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelSingOut = () => {
    dispatch(signOut());
    navigate("/login");
  };

  return (
    <nav className="h-16 px-6">
      <div className="flex h-full items-center justify-between">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold"
        >
          BLOGE
        </motion.h1>

        <div className="flex items-center gap-4">
          {authenticated ? (
            <>
              <span className="text-sm text-pink-500">
                {getCookies("name")}
              </span>

              <Link to="/create-post">
                <Button variant="subtle" color="pink">
                  Create Post
                </Button>
              </Link>

              <Link to="/author">
                <Button variant="subtle" color="pink">
                  Author
                </Button>
              </Link>

              <Button variant="subtle" color="red" onClick={handelSingOut}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="subtle" color="pink">
                  Login
                </Button>
              </Link>

              <Link to="/register">
                <Button variant="subtle" color="pink">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
