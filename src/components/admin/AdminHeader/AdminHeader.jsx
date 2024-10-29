import React from 'react'
import './AdminHeader.css'

const AdminHeader = () => {
    const handleToggleSidebar = () => {
        document.body.classList.toggle('toggle-sidebar');
    };

  return (
    <header id='header' className='header fixed-top d-flex align-items-center'>
        <div className='d-flex align-items-center justify-content-between'>
            <a href="/" className='logo d-flex align-items-center'>
                <img src='./assets/company.png' alt="" />
            </a>
            <i className='bi bi-list toggle-sidebar-btn' onClick={handleToggleSidebar}>
            </i>        
        </div>

        <div className="search-bar">
            <form className='search-form d-flex align-items-center' method="POST" action='#'>
                <input type="text" name='query' placeholder='Search' title='Enter search keyword'/>
                <button type='submit' title='Search'>
                    <i className='bi bi-search'></i>
                </button>
            </form>
        </div>
    </header>
  )
}

export default AdminHeader
