import style from "./sort.module.css"
import dropDown from "../../svgs/chevron-down.svg"
import { useState } from "react";

export interface ISort{
    sortNames: string[],
    onSetSort: (sortNum: number) => void
}

function Sort(params: ISort) {
    const [displayList, setDisplayList] = useState<boolean>(false);

    return (
        <div className={style.sort} onMouseLeave={() => {setDisplayList(false)}} onMouseEnter={() => {setDisplayList(true)}}>
            <button className={style.toggleBtn}>
                <span>Sort By</span>
                <img src={dropDown} alt="" className={displayList ? style.sortOpened : style.sortClosed} />
            </button>

            <div className={`${style.list} ${displayList ? style.display : style.hide}`}>
                {
                    params.sortNames.map((name, index) => {
                        return <button key={index} onClick={() => params.onSetSort(index)}>{name}</button>
                    })
                }
            </div>

        </div>
    );
}

export default Sort;