import type { FC } from 'react';
import { Link } from 'react-router-dom';

const HomePage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p>about</p>
      <Link to="/about" />
    </div>
  );
};

export default HomePage;
