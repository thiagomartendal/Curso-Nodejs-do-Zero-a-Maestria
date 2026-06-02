import style from './RoundedImage.module.css'

function RoundedImage({src, alt, width}) {
    return (
        <img
            src={src}
            alt={alt}
            className={`${style.rounded_image} ${style[width]}`}
        />
    )
}

export default RoundedImage