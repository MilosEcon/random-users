import style from "./like.module.css"
import like from "../../svgs/like.svg"
import disslike from "../../svgs/disslike.svg"

export interface ILike{
    isFavorite: boolean,
    onToggleFavorite: (id: string) => void,
    id: string
}

function Like(params: ILike & {className: string}) {
    return (
        <button className={`${style.likeBtn} ${params.className}`}
            onClick={(e) => {
                params.onToggleFavorite(params.id)
                e.stopPropagation()
            } } >
            <img src={params.isFavorite ? like : disslike} alt="Favorite" />
        </button>
    )
}

export default Like;