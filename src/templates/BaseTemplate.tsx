import Header from '@/components/Header/Header';

export const BaseTemplate = (props: {
  children: React.ReactNode;
}) => {
  // const t = useTranslations('BaseTemplate');

  return (
    <>
      <Header />
      <div>
        {props.children}
      </div>
    </>
  );
};
