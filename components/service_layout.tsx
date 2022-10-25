import Head from 'next/head';
import GNB from './GNB';

interface Props {
  title: string;
  children: React.ReactNode;
}

export const ServiceLayout = function ({ title = 'blah x2', children }: Props) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <GNB />
      {children}
    </div>
  );
};
