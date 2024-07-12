import type { FC } from 'react';

const HomePage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-slate-500 text-3xl">Rsbuild with React</h1>
    </div>
  );
};

export default HomePage;

/**
 * 路由配置
 */
export const options = {
  name: 'user',
};
