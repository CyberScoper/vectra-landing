/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'
import en from '../locales/en'
import ru from '../locales/ru'

const locales = { en, ru }
const LocaleContext = createContext()

export function LocaleProvider({ children }) {
    const [locale, setLocale] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('locale')
            if (saved && locales[saved]) return saved
            const browserLang = navigator.language.split('-')[0]
            return locales[browserLang] ? browserLang : 'en'
        }
        return 'en'
    })

    useEffect(() => {
        localStorage.setItem('locale', locale)
    }, [locale])

    const toggleLocale = () => {
        setLocale(prev => prev === 'en' ? 'ru' : 'en')
    }

    return (
        <LocaleContext.Provider value={{ locale, setLocale, toggleLocale, t: locales[locale] }}>
            {children}
        </LocaleContext.Provider>
    )
}

export function useLocale() {
    const context = useContext(LocaleContext)
    if (!context) {
        throw new Error('useLocale must be used within LocaleProvider')
    }
    return context
}
