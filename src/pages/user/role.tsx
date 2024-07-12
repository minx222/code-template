import type { FC } from 'react';
import { Link } from 'react-router-dom';

const HomePage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p>用户角色</p>
      <Link to="/about" />
    </div>
  );
};

export default HomePage;

/**
 * 路由配置
 */
export const options = {
  name: 'user-role',
  isPage: false,
};
