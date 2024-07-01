import { useRouter } from 'next/router';
import i18nConfig from '@/i18n.json';

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();

  const changeLanguage = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <select onChange={changeLanguage} defaultValue={router.locale}>
      {i18nConfig.locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale === 'en' ? 'English' : 'Türkçe'}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
