import Like, { ILike } from "../Like";
import style from "./user.module.css"

export interface IUser{
    firstName: string,
    lastName: string,
    gender: "male" | "female",
    email: string,
    age: number,
    image: string,
    isFavorite: boolean,
    city: string,
    hadnleUserClick: (id: string) => void
}

function User(user: IUser & ILike) {
    return (
        <div className={`${style.user} ${user.gender === "male" ? style.male : style.female }`}
            onClick={()=> {user.hadnleUserClick(user.id)}}
        >
            <Like {... user} className={style.favorite} />

            <img className={style.image} src={user.image} alt={`${user.firstName} ${user.lastName}`} />
            <p className={style.fullName}>{`${user.firstName} ${user.lastName}`}</p>
            
            <div className={style.detail}>
                <span>City</span>
                <span>{user.city}</span>
            </div>
            
            <div className={style.detail}>
                <span>E-mail</span>
                <span>{user.email}</span>
            </div>
            
            <div className={style.detail}>
                <span>Age</span>
                <span>{user.age.toString()}</span>
            </div>
        </div>
    );
}

export default User;