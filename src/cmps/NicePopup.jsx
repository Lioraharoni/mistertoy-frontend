import { useEffect, useRef } from 'react';

export function NicePopup({ heading, children, footing, onClosePopup }) {
    const mainRef = useRef(null)

    useEffect(() => {
        const closeOnEsc = (e) => {
            console.log("close modal", e);
            if (e.key === 'Escape' && mainRef.current && mainRef.current.contains(document.activeElement)) {
                console.log("close modal", e);
                onClosePopup()
                //props.onCloseModal()
            }
        }
        console.log("NicePopup useEffect");
        if (mainRef.current) {
            window.addEventListener('keydown', closeOnEsc)
        }

        return () => {
            if (mainRef.current) {
                window.removeEventListener('keydown', closeOnEsc)
            }
        }
    }, [])

    return (
        <section className="nice-popup">
            <header >
                Hello{heading}
            </header>
            <main ref={mainRef}>
                {children}
            </main>
            <footer>
                Bye{footing}
            </footer>
        </section>
    )
}