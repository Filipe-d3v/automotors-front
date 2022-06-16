import Styles from './squareImage.module.css'

function SquareImage({src, alt, width}) {
    return(
        <img 
            className={`${Styles.rounded_image} ${Styles[width]}`}
            src={src}
            alt={alt}
        />
    )
}

export default SquareImage