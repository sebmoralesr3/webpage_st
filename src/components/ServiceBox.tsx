import ArrowIcon from '../assets/icon_white.svg';
import Icon from '../assets/Icon.svg';

const ServiceBox = ({ title, link, icon, bg_color, bg_title, arrow }: { title: string; link: string; icon: string; bg_color: string; bg_title: string; arrow?: boolean }) => {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className={`w-full p-12 rounded-[45px] shadow-[0px_5px_0px_0px_rgba(25,26,35,1.00)] outline-1 outline-offset-[-1px] hover:shadow-[0px_10px_0px_0px_rgba(25,26,35,1.00)] outline-zinc-900 flex flex-col md:flex-row justify-between items-center ${bg_color} transition-all duration-300 ease-in-out`}>
            <div className="w-full sm:w-1/2 flex flex-col justify-between items-start gap-10">
                <h3 className={`text-3xl ${bg_title} font-medium text-black rounded-md px-1.5`}>{title}</h3>
                <div className="w-full inline-flex justify-start items-center gap-3.5 ">
                    {arrow ? 
                        <img src={ArrowIcon} alt={`arrow icon`} /> 
                        : <img src={Icon} alt={`icon`}/> 
                    }
                    <p className={`justify-start ${arrow ? "text-white" : "text-black"} text-xl leading-7`}>Ver mas</p>
                </div>
            </div>
            <div className="w-1/2 hidden lg:flex">
                <img src={icon} alt={`${title} icon`} className="w-full" />
            </div>
        </a>
    );
}

export default ServiceBox;