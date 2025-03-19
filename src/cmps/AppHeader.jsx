import { NavLink } from 'react-router-dom'

export function AppHeader() {
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <div className='home-nav'>
                    <NavLink to="/" >
                        <img src='/src/assets/img/logo.png' alt="toy-img" />
                    </NavLink>

                </div>
                <nav className="app-nav">
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    {/* <NavLink to="/dashboard" >Dashboard</NavLink>
                    <NavLink to="/survey" >Survey</NavLink> */}
                </nav>
            </section>

        </header>
    )
}
