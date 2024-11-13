import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="flex items-center">
            <Image
              src="/img/3d.png"
              alt="placeholder image"
              width={30}
              height={30}
              style={{ objectFit: "cover" }}
            />
            <span className="text-2xl font-bold text-gray-800">3D Masters</span>
          </div>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/products"
                className="text-gray-600 hover:text-gray-800"
              >
                Categorias
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-600 hover:text-gray-800">
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-800"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
