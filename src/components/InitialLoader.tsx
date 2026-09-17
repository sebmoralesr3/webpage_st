import { useState, useEffect } from 'react'
import SolventechLogo from '../assets/logo_blanco.svg'

export default function InitialLoader() {
    const [isMobile] = useState(() => window.matchMedia('(max-width: 850px)').matches)
    const [isVisible, setIsVisible] = useState(() => !isMobile)

    useEffect(() => {
        if (isMobile) return
        const timeout = window.setTimeout(() => setIsVisible(false), 2300)
        return () => window.clearTimeout(timeout)
    }, [isMobile])

    if (!isVisible) return null

    return <div className="initial-loader" aria-hidden="true">
        <img src={SolventechLogo} alt="" width="273" height="31" className="initial-loader-logo" />
    </div>
}
