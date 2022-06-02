import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className='main-header'>
            <h1 className='main-header-title'><Link to="/">📚 Library App 📚</Link></h1>
        </header>

    );
};

export default Header;
