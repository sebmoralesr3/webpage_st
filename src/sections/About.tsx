const About = () => {
    return (
        <section className="w-full flex flex-col gap-10">
            <div className="w-full flex flex-col md:flex-row px-10 md:px-0 items-center justify-start gap-5 my-10">
                <h2 className="text-4xl font-medium px-1.5 bg-blue rounded-md w-fit text-center sm:text-left">Nosotros</h2>
                <p className="mt-2">Aprende mas de nuestra misión, visión y nuestros valores</p>
            </div>
            <div className="w-full h-fit px-14 py-16 bg-blue-dark rounded-[50px] flex flex-col md:flex-row items-center justify-between gap-15">
                <div className="flex flex-col gap-5 px-5 items-center sm:items-start">
                    <h3 className="text-blue text-xl font-bold">Misión</h3>
                    <p className="text-base text-white text-center sm:text-left">Capacitar a las empresas con soluciones innovadoras que impulsen el crecimiento y el éxito.</p>
                </div>
                <div className="flex flex-col gap-5 px-5 items-center sm:items-start">
                    <h3 className="text-blue text-xl font-bold">Visión</h3>
                    <p className="text-base text-white text-center sm:text-left">Ser un líder mundial en el suministro de soluciones tecnológicas de vanguardia.</p>
                </div>
                <div className="flex flex-col gap-5 px-5 items-center sm:items-start">
                    <h3 className="text-blue text-xl font-bold">Valores</h3>
                    <p className="text-base text-white text-center sm:text-left">Integridad, la innovación y el éxito de nuestros clientes son la base de todo lo que hacemos.</p>
                </div>
            </div>
        </section>
    )
}

export default About;