import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";

import emailIcon from "@/assets/icons/email.png";
import instagramIcon from "@/assets/icons/instagram.png";
import facebookIcon from "@/assets/icons/facebook.png";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black ">
      <Container>
        <div className="flex flex-col items-center gap-6 py-8 px-8 md:flex-row md:justify-between md:px-12 lg:px-16">
          <p className="text-sm text-[#9FA6B2]">© codeit - {year}</p>

          <nav className="flex items-center gap-6 text-sm text-[#9FA6B2]">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/faq" className="hover:text-white">
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-5">
            <a aria-label="Email" href="mailto:contact@taskify.com">
              <Image
                src={emailIcon}
                alt="email"
                width={20}
                height={20}
                className="opacity-80 hover:opacity-100"
              />
            </a>
            <a
              aria-label="Instagram"
              href="https://www.instagram.com"
              target="_blank"
            >
              <Image
                src={instagramIcon}
                alt="instagram"
                width={20}
                height={20}
                className="opacity-80 hover:opacity-100"
              />
            </a>
            <a
              aria-label="Facebook"
              href="https://www.facebook.com"
              target="_blank"
            >
              <Image
                src={facebookIcon}
                alt="facebook"
                width={20}
                height={20}
                className="opacity-80 hover:opacity-100"
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
