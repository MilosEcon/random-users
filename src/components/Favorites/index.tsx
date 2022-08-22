import { useState } from "react";
import { IUserData } from "../../App";
import disslike from "../../svgs/disslike.svg"
import style from "./favorites.module.css"

interface IFavorites {
    users: IUserData[],
    onToggleFavorite: (id: string) => void
}

function MiniUser(params: {user: IUserData, onToggleFavorite: (id: string) => void }) {
    return (
        <div className={style.miniUser}>
            <img src={params.user.image} alt="user" className={style.image} />
            <div className={style.description}>
                <span className={style.fullName} >{`${params.user.firstName} ${params.user.lastName}`}</span>
                <span className={style.email} >{params.user.email}</span>
            </div>
            <button className={style.removeElementBtn} onClick={(e) => {
                params.onToggleFavorite(params.user.id);
                e.stopPropagation();
            }} >X</button>
        </div>
    )
}

function Favorites(params: IFavorites) {
    const [displayList, setDisplayList] = useState<boolean>(false);

    return (
        <div className={style.favorites} onMouseLeave={() => {setDisplayList(false)}} onMouseEnter={() => {setDisplayList(true)}}>
            <button className={style.toggleBtn}>
                <span>Favorites</span>
                <img src={disslike} alt="*" />
            </button>

            <div className={`${style.list} ${displayList ? style.display: style.hide}`}>
                {
                    params.users.map(user => <MiniUser key={user.id} user={user} onToggleFavorite={params.onToggleFavorite} />)
                }
            </div>
        </div>
    );
}

export default Favorites;