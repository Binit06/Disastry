import Link from 'next/link';

// ... (other imports and code)

interface NavBarProps {
    children: React.ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {
  return (
    <>
      <div className="NavBar flex justify-between w-full px-[40px] items-center">
        <div className="font-bold text-[20px]">
          <span>Disast</span>
          <span className="text-[#6D7076]">ry</span>
        </div>
        <div className="items p-[10px] flex flex-row gap-[33px] items-center justify-between font-semibold">
          <Link href="/">
            Home
          </Link>
          <Link href="/simulation">
            Simulation
          </Link>
        </div>
        <div>
          <button className="px-[13px] py-[7px] bg-[#E0D7D7] bg-opacity-50 rounded-md text-black flex items-center font-bold border-[#E0D7D7] border-opacity-80 border-2">
            Contribute
          </button>
        </div>
      </div>
      <main>
        {children}
      </main>
    </>
  );
};

export default NavBar;
