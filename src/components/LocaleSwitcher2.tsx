import { routing, usePathname } from '@/libs/i18nNavigation';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

const LocaleSwitcher = ({ isScrolled }) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (event) => {
    router.push(`/${event.target.value}${pathname}`);
    router.refresh();
  };

  return (
    <select
      defaultValue={locale}
      onChange={handleChange}
      className={`relative text-green-600 dark:text-green-400 border-green-300 dark:border-green-600 
        hover:bg-green-100 dark:hover:bg-green-900/20 transition-all duration-300 rounded-md 
        before:content-[''] before:absolute before:inset-0 before:-z-10 
        before:bg-green-500/20 dark:before:bg-green-400/20 before:blur-md before:opacity-0 
        hover:before:opacity-100 before:transition-opacity font-medium focus:outline-none 
        focus-visible:ring-2 focus-visible:ring-green-500 dark:focus-visible:ring-green-400 
        ${isScrolled ? 'px-2 py-1 text-sm' : 'px-3 py-2'}`}
      aria-label="lang-switcher"
    >
      {routing.locales.map(elt => (
        <option key={elt} value={elt} className="text-slate-700 dark:text-slate-300 bg-green-50 dark:bg-green-950">
          {elt.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default LocaleSwitcher;
