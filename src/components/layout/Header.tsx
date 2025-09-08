import Link from "next/link";
import Image from "next/image";
import Container from "@/components/common/Container";
import logo from "@/assets/icons/logo.png";

export default function Header() {
  return (
    <header className="10 bg-black/70 backdrop-blur">
      <Container>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center ">
            <Image
              src={logo}
              alt="Taskify"
              width={28}
              height={30}
              className="gap-0"
            />
            <span className="text-lg font-semibold text-white">Taskify</span>
          </Link>

          <nav className="flex items-center gap-5 text-sm">
            <Link href="/login" className="text-gray-300 hover:text-white">
              로그인
            </Link>
            <Link href="/signup" className="text-gray-300 hover:text-white">
              회원가입
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
