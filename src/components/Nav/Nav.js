import { useState, Fragment } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';
import { BsHouseDoorFill } from 'react-icons/bs';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import musma_logo from '../../assets/images/musma_logo.svg';
import home_icon from '../../assets/images/home_icon.svg';
import equipment_icon from '../../assets/images/equipment_icon.svg';
import progress_icon from '../../assets/images/progress_icon.svg';
import area_icon from '../../assets/images/area_icon.svg';

export default function SideBar() {
  const [open, setOpen] = useState(true);
  const [currMenu, setCurrMenu] = useState('');
  const [title, setTitle] = useState('Home');
  const location = useLocation();

  const MENU_DATA = [
    {
      menu_id: 1,
      title: 'Home',
      iconURL: home_icon,
      URL: '/',
    },
    {
      menu_id: 2,
      title: 'Equipment',
      iconURL: equipment_icon,
      sub_categories: [
        {
          menu_id: 3,
          title: 'Analysis ',
          URL: '/equipment/analysis',
        },
        {
          menu_id: 4,
          title: 'List',
          URL: '/equipment/list',
        },
      ],
    },
    {
      menu_id: 5,
      title: 'Progress',
      iconURL: progress_icon,
      URL: '/progress',
    },
    {
      menu_id: 6,
      title: 'Area',
      iconURL: area_icon,
      sub_categories: [
        {
          menu_id: 7,
          title: 'List',
          URL: '/area/list',
        },
      ],
    },
  ];

  return (
    <Fragment>
      <header
        className={`${
          open ? 'pl-56' : 'pl-24 '
        } box-border fixed w-full bg-achromatic-bg_paper z-10 duration-300 border-b-2 border-blue-center_border`}
      >
        <div className="px-8">
          <div className="flex items-center h-16">
            <BsHouseDoorFill className="text-blue text-2xl" />
            <MdOutlineArrowForwardIos className="text-blue-center_border mx-2" />
            <span className="text-base">{title}</span>
          </div>
        </div>
      </header>

      <div className="flex">
        <div
          className={`${
            open ? ' min-w-57' : 'min-w-25'
          } bg-blue z-20 h-screen duration-300 sticky top-0`}
        >
          <MdOutlineArrowBackIosNew
            className={`${open ? 'top-6 right-4' : 'top-6 right-9 rotate-180'}
          absolute text-achromatic-bg_paper w-7 duration-300`}
            onClick={() => setOpen(!open)}
            alt="collapseButton"
          />
          <div className="flex items-center w-full p-4 border-b-2 border-blue-center_border">
            <img
              src={musma_logo}
              className={`{text-achromatic-bg_paper h-8 w-20 origin-left duration-300 ${
                !open && 'scale-0'
              }`}
              alt="area_icon"
            />
          </div>
          <ul className="p-4">
            {MENU_DATA.map((Menu, index) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <Fragment>
                  <li
                    key={Menu.menu_id}
                    className={`flex items-center relative hover:bg-blue-blue90 h-10 gap-x-2 rounded-sm cursor-pointer ${
                      !open && 'justify-center'
                    }`}
                    onClick={() =>
                      currMenu === index ? setCurrMenu('') : setCurrMenu(index)
                    }
                  >
                    <img
                      src={Menu.iconURL}
                      className="w-5"
                      alt={`${Menu.title}_icon`}
                    />
                    {!!Menu.URL ? (
                      <Link
                        to={`${Menu.URL}`}
                        className={`origin-left text-achromatic-bg_paper text-base ${
                          !open && 'hidden scale-0'
                        } ${location.pathname === Menu.URL && 'font-bold'}`}
                        onClick={() => setTitle(Menu.title)}
                      >
                        {Menu.title}
                      </Link>
                    ) : (
                      <Fragment>
                        <span
                          className={`origin-left text-achromatic-bg_paper text-base ${
                            !open && 'hidden scale-0'
                          } ${location.pathname === Menu.URL && 'font-bold'}`}
                        >
                          {Menu.title}
                        </span>
                        <IoIosArrowDown
                          className={`${
                            currMenu === index
                              ? 'top-6 right-9 rotate-180'
                              : 'top-6 right-4'
                          } ${
                            !open && 'hidden'
                          } absolute text-achromatic-bg_paper text-xl right-2 top-3 duration-300`}
                        />
                      </Fragment>
                    )}
                  </li>
                  <ul
                    className={`origin-top-left h-0 scale-0 duration-300 ${
                      currMenu === index && 'h-fit scale-100'
                    }`}
                    index={index}
                  >
                    {!!Menu.sub_categories &&
                      Menu.sub_categories.map(Sub => {
                        return (
                          <li
                            key={Sub.menu_id}
                            className={`flex items-center relative hover:bg-blue-blue90 h-10 pl-7 gap-x-2 rounded-sm cursor-pointer ${
                              !open && 'justify-center'
                            }`}
                          >
                            <Link
                              to={`${Sub.URL}`}
                              className={`origin-left text-achromatic-bg_paper text-base ${
                                !open && 'hidden scale-0'
                              } ${
                                location.pathname === Sub.URL && 'font-bold'
                              }`}
                              onClick={() => setTitle(Sub.title)}
                            >
                              {Sub.title}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </Fragment>
              );
            })}
          </ul>
        </div>
        <div className="bg-achromatic-bg_default h-auto flex-1 mt-16 p-7">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
}
