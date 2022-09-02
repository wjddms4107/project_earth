import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsHouseDoorFill } from 'react-icons/bs';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

export const Header = ({ open, title }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [headerTitle, setHeaderTitle] = useState([]);

  const capitalizer = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const makeHeaderTitle = headerTitle => {
    if (headerTitle[0] === '') {
      headerTitle[0] = 'home';
    }

    return headerTitle.map((item, index) => {
      return (
        <Fragment key={index}>
          <MdOutlineArrowForwardIos className="text-blue-center_border mx-2" />
          <span>{`${capitalizer(item)}`}</span>
        </Fragment>
      );
    });
  };

  useEffect(() => {
    let headerArray = location.pathname.split('/');
    headerArray.shift();
    setHeaderTitle(headerArray);
  }, [location]);

  return (
    <header
      className={`${
        open ? 'pl-56' : 'pl-24 '
      } box-border fixed w-full bg-achromatic-bg_paper z-10 duration-300 border-b-2 border-blue-center_border`}
    >
      <div className="px-8">
        <div className="flex items-center h-16">
          <BsHouseDoorFill
            className="text-blue text-2xl cursor-pointer"
            onClick={() => navigate('/')}
          />
          {makeHeaderTitle(headerTitle)}
        </div>
      </div>
    </header>
  );
};
