import ServiceBox from "../components/ServiceBox";
import WebDevelopmentIcon from "../assets/webdevelopment_icon.svg";
import VideoGameIcon from "../assets/videogame_icon.svg";
import BrandIcon from "../assets/brand_icon.svg";


const Services = () => {
    const base = "https://archivos.solventechglobal.com/pdf-webpage"
    return (
        <section className="w-full" id="services">
            <div className="w-full flex flex-col md:flex-row items-center justify-start gap-5 my-10">
                <h2 className="text-4xl font-medium px-1.5 bg-blue rounded-md w-fit">Servicios</h2>
                <p className="mt-2 text-center md:text-left">Ofrecemos una amplia gama de servicios para contribuir al éxito de tu empresa.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <ServiceBox
                    title="Desarrollo web y movil"
                    link={`${base}/SOLVENTECH-Web Development.pdf`}
                    icon={WebDevelopmentIcon}
                    bg_color="bg-light-gray"
                    bg_title="bg-blue"
                />
                <ServiceBox
                    title="Desarrollo de videojuegos"
                    link={`${base}/SOLVENTECH-Game Development.pdf`}
                    icon={VideoGameIcon}
                    bg_color="bg-blue"
                    bg_title="bg-light-gray"
                />
                <ServiceBox
                    title="Diseño de marca y marketing digital"
                    link={`${base}/SOLVENTECH-Brand Design.pdf`}
                    icon={BrandIcon}
                    bg_color="bg-blue-dark"
                    bg_title="bg-white"
                    arrow={true}
                />

            </div>
        </section>
    );
}

export default Services;
