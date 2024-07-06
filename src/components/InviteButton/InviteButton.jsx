import { useEffect } from "react"
import "./InviteButton.css"
const InviteButton = () => {

    useEffect(() => {
        // Create script element
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.async = true;
        script.setAttribute('data-telegram-share-url', 'https://t.me/TapswapAbhiwan_bot?start=');
        script.setAttribute('data-comment', 'Invite Friends');
        script.setAttribute('data-size', 'large');
        // Append the script to the document body
        document.classnm.appendChild(script);

    }, [])
    return (
        <></>
    )
}

export default InviteButton