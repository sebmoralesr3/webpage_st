import KreaLogo from '../assets/krea_logo.svg';
import ZonedInLogo from '../assets/zonedin_logo.svg';
import StratosLogo from '../assets/stratos_logo.svg';
import GrupoComercialLogo from '../assets/grupocomercial_logo.svg';
import ElectrosumigLogo from '../assets/electrosumig_logo.svg';


const Clientes = () => {
    return (
        <section className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                <li>
                        <img src={KreaLogo} alt="Krea Logo" />
                </li>
                <li>
                        <img src={ZonedInLogo} alt="ZonedIn Logo" />
                </li>
                <li>
                        <img src={StratosLogo} alt="Stratos Logo" />
                </li>
                <li>
                        <img src={GrupoComercialLogo} alt="Grupo Comercial Logo" />
                </li>
                <li>
                        <img src={ElectrosumigLogo} alt="Electrosumig Logo" />
                </li>
            </ul>
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
                    <li>
                        <img src={KreaLogo} alt="Krea Logo" />
                    </li>
                    <li>
                        <img src={ZonedInLogo} alt="ZonedIn Logo" />
                    </li>
                    <li>
                        <img src={StratosLogo} alt="Stratos Logo" />
                    </li>
                    <li>
                        <img src={GrupoComercialLogo} alt="Grupo Comercial Logo" />
                    </li>
                    <li>
                        <img src={ElectrosumigLogo} alt="Electrosumig Logo" />
                    </li>
            </ul>
        </section>
    );
}

export default Clientes;