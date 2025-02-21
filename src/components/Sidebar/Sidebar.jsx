import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import './Sidebar.css'

export default function Sidebar() {
    return (
        <div className={`sidebar-dropdown ${open ? 'open' : ''}`}>
            <ul>
                <li className="nav-text">
                    <Link to="/" end className={({ isActive }) => `nav-text ${isActive ? 'active' : ''}`}>
                        <FaIcons.FaRegStar /> <span className="nav-link-text">Most recent mixes</span>
                    </Link>
                </li>
                <li className="nav-text">
                    <Link to="/most-liked" end className={({ isActive }) => `nav-text ${isActive ? 'active' : ''}`}>
                        <FaIcons.FaRegHeart /> <span className="nav-link-text">Most liked mixes</span>
                    </Link>
                </li>
                <li className="nav-text">
                    <Link to="/create-mix" end className={({ isActive }) => `nav-text ${isActive ? 'active' : ''}`}>
                        <BiIcons.BiLeaf /> <span className="nav-link-text">Create Mix</span>
                    </Link>
                </li>
                <li className="nav-text">
                    <Link to="/account" end className={({ isActive }) => `nav-text ${isActive ? 'active' : ''}`}>
                        <AiIcons.AiOutlineInfoCircle /> <span className="nav-link-text">My Mixes</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
