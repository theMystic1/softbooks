import logo from "@/public/icons/logo.svg";
import Image from "next/image";
function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-8 relative">
        <Image src={logo} alt="Logo icon" fill />
      </div>

      <p className="text-2xl font-bold">SoftBooks</p>
    </div>
  );
}

export default Logo;
