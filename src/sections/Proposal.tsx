import Esfera from '../assets/Esfera.svg';
import Estrellas from '../assets/Estrellas.svg';

const Proposal = () => {
    return (
        <section className="w-full px-10 sm:px-14 py-8 bg-light-gray rounded-3xl flex flex-row justify-between gap-5" id="proposal">
            <div className="w-full sm:w-1/2 self-center flex flex-col items-center sm:items-start justify-center h-full gap-6">
                <h2 className="text-3xl font-medium rounded-md w-fit text-center sm:text-left">¡Hagámoslo realidad!</h2>
                <p className="text-xl font-normal rounded-md w-fit"> Agenda una reunión con nosotros y descubre cómo podemos impulsar el crecimiento de tu empresa en línea.</p>
                <a href="https://calendly.com/dptotecnologico-solventechglobal/solventech" target="_blank" rel="noopener noreferrer" className="bg-gray-900 text-white font-semibold p-4 rounded-lg hover:bg-gray-700">
                    Contactanos
                </a>
            </div>
            <div className="hidden lg:flex w-1/2 h-64 relative">
                    <img src={Esfera} alt="" width="125" height="125" className="absolute top-18 left-1/3 w-24 h-24 animate-bounce"/>
                    <img src={Estrellas} alt="" width="359" height="395" className="absolute w-full h-full"/>
            </div>
        </section>
    )
}

export default Proposal;
