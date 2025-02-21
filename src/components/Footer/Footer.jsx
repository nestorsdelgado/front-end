import * as FaIcons from 'react-icons/fa'

export default function Footer() {

    return (
        <>
            <div className='footer'>
                <a href="https://github.com/nestorsdelgado/my-kanban-board.git" target="_blank" rel="noopener noreferrer" className='footer-link'>
                    <FaIcons.FaGithub className='footer-icon' />
                    <span>GitHub</span>
                </a>
            </div>
        </>
    );
}