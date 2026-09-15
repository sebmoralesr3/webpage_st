import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import SolventechLogo from '../assets/logo_blanco.svg'

export default function InitialLoader() {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timeout = setTimeout(() => setIsVisible(false), 2000)
        return () => clearTimeout(timeout)
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed top-0 left-0 w-full h-full bg-black text-white z-50 flex items-center justify-center"
                    initial={{ y: 0 }}
                    animate={{ y: '100%' }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 1 }}
                >
                    <motion.img 
                        src={SolventechLogo} 
                        alt="Solventech Logo" 
                        className="w-48 md:w-64" 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}
