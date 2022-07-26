import { Link, NavLink } from "react-router-dom";

function Nav() {

    return (
        <>
            <div className="container header">
                <div className="row">
                    <div className="col-12">
                        <nav className="nav">
                            <NavLink to="/admin/" className="nav-link" style={
                                ({ isActive }) =>
                                    isActive ? {
                                        color: 'blue'
                                    } : null
                            }>Admin</NavLink>
                            <NavLink to="/admin/municipalities" className="nav-link" style={
                                ({ isActive }) =>
                                    isActive ? {
                                        color: 'blue'
                                    } : null
                            }>Municipalities</NavLink>
                            <NavLink to="/admin/sectors" className="nav-link" style={
                                ({ isActive }) =>
                                    isActive ? {
                                        color: 'blue'
                                    } : null
                            }>Sectors</NavLink>
                            <NavLink to="/" className="nav-link" style={
                                ({ isActive }) =>
                                    isActive ? {
                                        color: 'blue'
                                    } : null
                            }>Main Page</NavLink>
                            <Link to="/logout">Logout</Link>
                              
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav;