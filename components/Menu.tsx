import Link from "next/link";

type MenuProps = {
  /** @defaultValue 'flex flex-1 justify-evenly' */
  styles?: string;
};

export const Menu = ({
  styles = "hidden md:flex gap-4 flex flex-1 justify-end mr-4 md:mr-0 md:justify-center text-sm lg:text-base whitespace-nowrap",
}: MenuProps) => {
  return (
    <ul className={styles}>
      <li>
        <Link href="/boarding">Boarding</Link>
      </li>
      <li>
        <Link href="/training">Training</Link>
      </li>
      <li>
        <Link href="/policies">Policies</Link>
      </li>
      <li>
        <Link href="/rates">Rates</Link>
      </li>
      <li>
        <Link href="/contact">Contact</Link>
      </li>
      <li>
        <Link href="/create-reservation">Create Reservation</Link>
      </li>
    </ul>
  );
};
