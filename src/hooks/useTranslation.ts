import { useUserStore } from '../store/useUserStore';
import { translations, TranslationKey } from '../i18n/translations';

export function useTranslation() {
  const { language } = useUserStore();

  const t = (key: TranslationKey): string => {
    // Fallback to Spanish if the key doesn't exist in the selected language
    return translations[language][key] || translations['es'][key] || key;
  };

  return { t, language };
}
