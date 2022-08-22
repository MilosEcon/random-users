import style from "./navigation.module.css"

interface INavigation {
    onNext: () => void,
    onPrevious: () => void,
    page: number
}

function Navigation(params: INavigation) {
    return (
        <div className={`${style.navigation} navigation`}>
            <button className={params.page > 1 ? style.active : style.dissabled} onClick={params.onPrevious}>Previous</button>
            <button className={style.active} onClick={params.onNext}>Next</button>
        </div>
    );
}

export default Navigation;