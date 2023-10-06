import React from 'react'
import { useRouter } from 'next/router'
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs'

function removeLanguageSuffix(url: string) {
  // 正则表达式匹配 .es, .ja, .ko 等后缀
  const regex = /\.(es|ja|ko|de|en|zh)(?=[^\.]+$)*/;
  return url.replace(regex, '');
}

const localeText = {
  zh: '最后更新时间',
  en: 'Last update on',
  ja: '最後の更新',
  de: 'Letztes Update am',
  ko: '마지막 업데이트',
  es: 'Última actualización el',
}

const config: DocsThemeConfig = {
  logo: <div className="-m-1.5 p-1.5 flex items-center justify-center space-x-2">
    <img
      className="h-7"
      src="/logo.png"
      alt={'Jex Coder'}
    />
    <p className='text-xl font-bold text-[#004CA3]'>{'Jex Coder'}</p>
  </div>,
  logoLink: 'https://www.jexcoder.com',
  i18n: [
    { locale: 'en', text: 'English' },
    { locale: 'zh', text: '中文' },
    // { locale: 'ja', text: '日本語' },  // Japanese
    // { locale: 'de', text: 'Deutsch' }, // German
    // { locale: 'ko', text: '한국어' },   // Korean
    // { locale: 'es', text: 'Español' }, // Spanish
  ],
  footer: {
    text: <div className='w-full text-center'>© 2023-PRESENT JexCoder. All rights Reserved</div>,
  },
  feedback: {
    useLink: () => {
      return `https://github.com/JexLau/blog/issues/new?labels=feedback&title=Feedback:`
    },
  },
  editLink: {
    text: null,
  },
  search: {
    placeholder: 'Search...',
  },
  gitTimestamp: () => {
    const { locale } = useRouter()
    const date = new Date()
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return <>{`${localeText[locale]} ${year}/${month}/${day}`}</>;
  },
  // head: () => {
  //   const { asPath, defaultLocale, locale } = useRouter()
  //   const { frontMatter } = useConfig()
  //   const baseurl = 'https://www.jexcoder.com'
  //   const url = removeLanguageSuffix(baseurl + (defaultLocale === locale ? asPath : `/${locale}${asPath}`))
  //   const getHrefLang = (lang: string) => {
  //     const href = removeLanguageSuffix(baseurl + (defaultLocale === lang ? asPath : `/${lang}${asPath}`))
  //     // console.log('href', href);

  //     return href
  //   }
  //   const title = `${frontMatter.title} - Jex Coder`
  //   return (
  //     <>
  //       <title>{title}</title>
  //       <meta name="keywords" content={frontMatter.keywords} />
  //       <meta name="description" content={frontMatter.description} />
  //       <meta property="og:type" content="website" />
  //       <meta property="twitter:type" content="website" />
  //       <meta property="og:site_name" content={title} />
  //       <meta property="twitter:site" content={title} />
  //       <meta name="og:image" content={frontMatter.image} />
  //       <meta name="twitter:image" content={frontMatter.image} />
  //       <meta property="og:url" content={url} />
  //       <meta property="twitter:url" content={url} />
  //       <meta property="og:title" content={title} />
  //       <meta property="twitter:title" content={title} />
  //       <meta property="og:description" content={frontMatter.description} />
  //       <meta property="twitter:description" content={frontMatter.description} />
  //       <link rel="canonical" href={url} />
  //       <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
  //       <link rel="icon" href="/favicon.ico" type="image/x-icon" />
  //       <link rel="alternate" hrefLang="x-default" href={getHrefLang('en')} />
  //       <link rel="alternate" hrefLang="en" href={getHrefLang('en')} />
  //       <link rel="alternate" hrefLang="ja" href={getHrefLang('ja')} />
  //       <link rel="alternate" hrefLang="de" href={getHrefLang('de')} />
  //       <link rel="alternate" hrefLang="ko" href={getHrefLang('ko')} />
  //       <link rel="alternate" hrefLang="es" href={getHrefLang('es')} />
  //     </>
  //   )
  // }
}

export default config
