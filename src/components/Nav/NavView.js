import { useState, Fragment } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { Header, Nav } from '.';
import musma_logo from '../../assets/images/musma_logo.svg';

export const NavView = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <Fragment>
      <Header open={open} />
      <div className="flex">
        <div
          className={`${
            open ? ' min-w-57' : 'min-w-25'
          } bg-blue z-20 h-screen duration-300 sticky top-0`}
        >
          <MdOutlineArrowBackIosNew
            className={`${open ? 'top-6 right-4' : 'top-6 right-9 rotate-180'}
          absolute text-achromatic-bg_paper w-7 duration-300 cursor-pointer`}
            onClick={() => setOpen(!open)}
            alt="collapseButton"
          />
          <div className="flex items-center w-full p-4 border-b-2 border-blue-center_border">
            <img
              src={musma_logo}
              className={`{text-achromatic-bg_paper h-8 w-20 origin-left duration-300 cursor-pointer ${
                !open && 'scale-0'
              }`}
              onClick={() => navigate('/')}
              alt="area_icon"
            />
          </div>
          <Nav open={open} setOpen={setOpen} />
        </div>
        <div className="bg-achromatic-bg_default h-auto flex-1 mt-16 p-7">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};
