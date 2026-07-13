export type Language = { code: string; label: string; flag: string }

export const LANGUAGES: Language[] = [
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'nl', label: 'Dutch', flag: '🇳🇱' },
  { code: 'en-US', label: 'English', flag: '🇺🇸' },
  { code: 'en-GB', label: 'English (UK)', flag: '🇬🇧' },
  { code: 'es-MX', label: 'Español (México)', flag: '🇲🇽' },
  { code: 'es-ES', label: 'Español (Spanish)', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'pt-BR', label: 'Português (Brazil)', flag: '🇧🇷' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'th', label: 'ไทย', flag: '🇹🇭' },
  { code: 'zh', label: '简体中文', flag: '🇨🇳' },
]

export type Notification = {
  id: number
  text: string
  age: string
  read: boolean
}

export const NOTIFICATIONS: Notification[] = [
  { id: 1, text: 'Your data is prepared, click here to download.', age: '8 seconds ago', read: false },
  { id: 2, text: 'Your data is prepared, click here to download.', age: '13 days ago', read: true },
  { id: 3, text: 'Your data is prepared, click here to download.', age: '25 days ago', read: true },
]

export const ACCOUNT = { name: 'Lorem Ipsum', email: 'lorem@lpsum.com' }

export const ACCOUNT_LINKS = ['General Settings', 'Communications', 'Login Attempts']
