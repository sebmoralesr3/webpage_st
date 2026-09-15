import Logo from '../assets/logo.svg';

const Header = () => {
    return (
        <div className="bg-white shadow-md mt-5 font-space text-black ">
            <nav className="flex flex-col sm:flex-row justify-between items-center py-5 px-5 md:px-14 gap-4">
                <div className="h-[100px] sm:h-fit flex items-center">
                    <a href="/">
                        <img src={Logo} alt="Solventech Logo" className="w-[286px]" />
                    </a>
                </div>
                <ul className="hidden sm:flex flex-row justify-center items-center gap-10 text-center">
                    <li className="hover:underline"><a href="#about">Nosotros</a></li>
                    <li className="hover:underline"><a href="#services">Servicios</a></li>
                    <li className="px-6 py-2 rounded-2xl outline-1 outline-zinc-900 sm:flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-colors duration-300">
                        <a className="text-sm sm:text-base" href="https://calendly.com/dptotecnologico-solventechglobal/solventech" target="_blank" rel="noopener noreferrer">Conozcámonos</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
