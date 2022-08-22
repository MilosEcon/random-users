import moment from "moment";
import { IUserData } from "../../App";
import Like, { ILike } from "../Like";
import style from "./modal.module.css"

interface IModal extends IUserData, ILike {
    onCloseModal: () => void
}

function Modal(props: IModal) {
    const onEmail = ()=> {
        window.location.href = `mailto:${props.email}&subject=${encodeURIComponent("Hello :)")}`;
    }

    const getDaysToBirthday = () => {
        const birthday = moment(props.birth).set("year", moment().year()).utc()
        const nextBday = moment(props.birth).set("year", moment().year() + 1).utc()

        if (moment().isBefore(birthday)) return moment(birthday).diff(moment(), "days")
        return moment(nextBday).diff(moment(), "days")
    }

    return (
        <div className={style.modal} onClick={(e)=> {
            if (e.target === e.currentTarget) props.onCloseModal()
        }}>
            <div className={style.card}>
                <Like {... props} className={style.favorite} />
                <button className={style.closeBtn} onClick={(e)=> {
                    if (e.target === e.currentTarget) props.onCloseModal()
                }}>X</button>

                <div className={`${style.leftPannel} ${props.gender === "male" ? style.maleLeft : style.femaleLeft}`}>
                    <span className={style.userName}>{props.userName}</span>
                    <img className={style.image} src={props.image} alt={`${props.firstName} ${props.lastName}`} />
                    <button className={style.email} onClick={onEmail} >Send email</button>
                </div>

                <div className={`${style.rightPannel} ${props.gender === "male" ? style.maleRight : style.femaleRight}`}>
                    <div className={style.detail}>
                        <span>Address</span>
                        <span>{props.city}</span>
                    </div>
                    
                    <div className={style.detail}>
                        <span>Birth</span>
                        <span>{moment(props.birth).utc().format("DD.MM.YYYY")}</span>
                    </div>
                    
                    <div className={style.detail}>
                        <span>Registration date</span>
                        <span>{moment(props.regDate).utc().format("DD.MM.YYYY")}</span>
                    </div>

                    <div className={style.detail}>
                        <span>ID</span>
                        <span>{props.id}</span>
                    </div>

                    <div className={style.detail}>
                        <span>Age</span>
                        <span>{props.age.toString()}</span>
                    </div>

                    <div className={style.stats}>
                        <div className={style.daysUntill}>
                            <span className={style.day}>{getDaysToBirthday()}</span>
                            <span>Days to next birthday</span>
                        </div>
                        <div className={style.daysSince}>
                            <span className={style.day}>{moment().diff(moment(props.regDate), "days")}</span>
                            <span>Days since registration</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;