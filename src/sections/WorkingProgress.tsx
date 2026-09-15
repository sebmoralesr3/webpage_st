import WorkingProgressBox from "../components/WorkingProgressBox";

const WorkingProgress = () => {
    return (
        <section className="w-full flex flex-col gap-10 mb-30">
            <div className="w-full flex flex-col md:flex-row px-10 md:px-0 items-center justify-start gap-5 my-10">
                <h2 className="text-4xl font-medium px-1.5 bg-blue rounded-md w-fit text-center sm:text-left">Nuestro proceso</h2>
                <p className="mt-2">Paso a paso de lo necesario para cumplir tus metas</p>
            </div>
            <div className="flex flex-col items-start justify-start gap-10">
                <WorkingProgressBox id={1} title="Consulta Inicial" description="Durante la consulta inicial, hablaremos de sus metas y objetivos empresariales, su público objetivo y sus esfuerzos de marketing actuales. Esto nos permitirá comprender sus necesidades y adaptar nuestros servicios a sus requisitos."/>
                <WorkingProgressBox id={2} title="Investigación y estrategia" description="Realizamos estudios de mercado, análisis de la competencia y análisis de la audiencia para elaborar una estrategia a medida."/>
                <WorkingProgressBox id={3} title="Implementación" description="Ponemos el plan en marcha, ya sea lanzando campañas, mejorando las operaciones o ejecutando iniciativas clave."/>
                <WorkingProgressBox id={4} title="Optimización y monitoreo" description="Hacemos un seguimiento del rendimiento en tiempo real, analizamos los KPI y realizamos ajustes ágiles para mejorar los resultados."/>
                <WorkingProgressBox id={5} title="Comunicación y actualizaciones" description="Le mantenemos informado con informes claros y transparentes y comprobaciones periódicas."/>
                <WorkingProgressBox id={6} title="Mejora Continua" description="Creemos en crecer con usted. La información obtenida en cada fase nos permite seguir perfeccionando y planificando a largo plazo."/>
            </div>
        </section>
    );
};

export default WorkingProgress;