import Link from "next/link";
import Button from "../Widgets/Button";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const navOpenRef = useRef(null);
  const changeNavState = () => {
    navOpenRef.current.classList.toggle("nav-open");
  };
  return (
    <header className="main text-center py-4">
      <h1>
        {" "}
        <Link href="/">Yassine Zaanouni</Link>
      </h1>
      {/* <div ref={navOpenRef} className="main f-ai-c justify-between gap-36">
        <nav className="f-ai-c  flex-1 gap-4 text-center lg:justify-between">
          <ul className="f-ai-c gap-7">
            <li>Products</li>
            <li>Applications</li>
            <li>
              <Link href="#">Projects</Link>
            </li>
            <li>
              <Link href="#">Contact</Link>
            </li>
            <li>
              <Link href="#">About</Link>
            </li>
          </ul>
        </nav>
        <button className="nav-btn " onClick={changeNavState}>
          <div className="menu-outline">
            <Image src="/icons/header/menu-outline.svg" alt="" name="menu-outline" width={25} height={22} />
          </div>
          <div className="close-outline">
            <Image src="/icons/header/close-outline.svg" alt="" name="close-outline" width={35} height={35} />
          </div>
        </button>
      </div>

      <style jsx>
        {`
          nav {
            @apply fixed inset-0 z-20 translate-x-full transition-all duration-200 lg:static lg:translate-x-0;
          }
          @media (max-width: 1023px) {
            .nav-open nav {
              @apply translate-x-0 flex-col-reverse items-start justify-center bg-bg-400 px-10 text-start text-white;
              backdrop-filter: blur(6px);
            }
            .nav-open ul {
              @apply mt-11 flex-col items-start;
            }
            .nav-open .menu-outline {
              opacity: 0;
              position: absolute;
              pointer-events: none;
              transition: opacity 0.3s ease-in-out;
            }
            .nav-open .close-outline {
              opacity: 1;
              position: static;
              display: block;
              transform: rotate(45deg);
            }
          }

          .nav-btn {
            @apply z-30 flex items-center lg:hidden;
          }
          .menu-outline {
            opacity: 1;
            position: static;
            transition: opacity 0.3s ease-in-out;
          }

          .close-outline {
            opacity: 0;
            position: absolute;
            pointer-events: none;
            transition: all 0.2s ease-in-out;
            transform: rotate(0deg);
          }
        `}
      </style> */}
    </header>
  );
};

export default Header;
