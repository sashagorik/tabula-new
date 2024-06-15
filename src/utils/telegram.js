export const isTelegramWebApp = () => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams)
    const tgInitData = urlParams.get('tgWebAppData');
    return (
        typeof window !== 'undefined' &&
        window.Telegram &&
        window.Telegram.WebApp &&
        typeof window.Telegram.WebApp.initData !== 'undefined' &&
        typeof window.Telegram.WebApp.expand === 'function' &&
        tgInitData !== null
    );
};