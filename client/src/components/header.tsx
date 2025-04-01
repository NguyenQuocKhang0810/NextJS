import Link from "next/link";
import { ThemeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href={"/login"}>Login</Link>
        </li>
        <li>
          <Link href={"/register"}>Register</Link>
        </li>
      </ul>

      <ThemeToggle />
    </div>
  );
};

export default Header;
