import { Link } from "react-router-dom";

const Links = () => {
    return (
        <>
        <h1>Links:</h1>
        <ul>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/register">Register</Link></li>
        </ul>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/admin">Admin Page</Link></li>
            <li><Link to="/user">User</Link></li>
        </ul>
        </>
    )
}

export default Links;