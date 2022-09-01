import { useNavigate } from 'react-router-dom';
import { BsHouseDoorFill } from 'react-icons/bs';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

export const Header = ({ open, title }) => {
  const navigate = useNavigate();

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
          <MdOutlineArrowForwardIos className="text-blue-center_border mx-2" />
          <span className="text-base">{title}</span>
        </div>
      </div>
    </header>
  );
};
