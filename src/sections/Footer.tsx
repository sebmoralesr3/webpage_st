import LinkedinLogo from '../assets/linkedin_logo.svg';
import InstagramLogo from '../assets/instagram_logo.svg';
import Logo from '../assets/logo_blanco.svg';

const Footer = () => {
    return (
        <div className="px-6 sm:px-10 md:px-14 pt-14 pb-12 flex flex-col py-5 bg-blue-dark rounded-tl-[45px] rounded-tr-[45px] text-white font-space">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
                <div>
                    <img src={Logo} alt="Solventech Logo" />
                </div>
                <div className="flex flex-row justify-center items-center gap-4">
                    <a href="#about" className="hover:underline">Nosotros</a>
                    <a href="#services" className="hover:underline">Servicios</a>
                </div>
                <div className="flex justify-center items-center gap-4 md:mr-10">
                    <a href="https://www.instagram.com/solventech.co/"><img src={InstagramLogo} alt="Instagram" /></a>
                    <a href="https://www.linkedin.com/company/solventechco/posts/?feedView=all"><img src={LinkedinLogo} alt="LinkedIn" /></a>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between md:items-start gap-10">
                <div className="flex flex-col gap-3 text-white">
                    <p className="bg-blue px-2 py-1 rounded-md w-fit text-black text-lg font-medium mb-2">Contactanos:</p>
                    <p>Email: <a href="mailto:direccionejecutiva@solventechglobal.com" className="underline">direccionejecutiva@solventechglobal.com</a></p>
                    <p>Phone: <a href="tel:+573156039833" className="underline">+57 315 603 9833</a></p>
                    <p>Address: Cl.93 #43-106<br />Nte. Centro Historico, Barranquilla, Atlántico</p>
                </div>
            </div>

            <hr className="border-t border-white my-10" />

            <div className="flex flex-col sm:flex-row gap-4 justify-start items-center text-sm text-center">
                <p>&copy; 2023 Solventech. All rights reserved.</p>
                <p><a href="#" className="underline">Privacy Policy</a></p>
            </div>
        </div>
    );
};

export default Footer;