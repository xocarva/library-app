import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import './Footer.css';

const Footer = () => {
    return (
        <footer className='footer'>
            <span><a href="https://xoancarneiro.com" target="_blank" rel="noreferrer noopener" title="xoancarneiro.com">Xoán Carneiro</a> 2022</span>
            <div className="links">
                <a href="https://www.linkedin.com/in/xoancarneiro/" target="_blank" rel="noreferrer noopener" title="Linkedin"><AiFillLinkedin /></a>
                <a href="https://github.com/xocarva/" target="_blank" rel="noreferrer noopener" title="Github"><AiFillGithub /></a>
            </div>
        </footer>
    );
}

export default Footer;
