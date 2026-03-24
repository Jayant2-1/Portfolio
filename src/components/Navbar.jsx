import React from 'react'

const Nav = ({ showNav }) => {
  const links = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "Contact", id: "contact" },
  ];
  const scroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  };
  return (
    <div className={`fixed top-0 left-0 right-0 px-3 pt-3 transition-all duration-500 ${
      showNav ? 'z-[9000] opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
    }`}>
      <nav className={`mx-auto max-w-7xl flex justify-between items-center px-5 py-3 text-white rounded-2xl border transition-all duration-500 ${
        showNav
          ? 'bg-black/75 border-white/15 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.35)]'
          : 'bg-black/30 border-white/10 backdrop-blur-sm'
      }`}>
        <h1 className='text-xl font-bold'>Jay</h1>
        <ul className='flex gap-6'>
          {links.map((link) => (
            <li
              key={link.id}
              className="cursor-pointer hover:text-red-800 transition"
              onClick={() => scroll(link.id)}
            >
              {link.name}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Nav;