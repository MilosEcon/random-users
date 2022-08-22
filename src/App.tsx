import "./App.css"
import Sort from './components/Sort';
import Navigation from './components/Navigation';
import Favorites from './components/Favorites';
import User from './components/User';
import Modal from './components/Modal';
import { useEffect, useState } from 'react';

export interface IUserData {
    userName: string,
    birth: string,
    regDate: string,
    id: string,
    firstName: string,
    lastName: string,
    gender: "male" | "female",
    email: string,
    age: number,
    image: string,
    isFavorite: boolean,
    city: string,
}

function App() {
  const [users, setUsers] = useState<IUserData[]>([])
  const [page, setPage] = useState<number>(1)
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const [selectedSort, setSelectedSort] = useState<number | undefined>(undefined);

  const sortFns = [
    {
      sortName: "Name",
      sortFn: (usr1: IUserData, usr2: IUserData): number => {
        return usr1.firstName.localeCompare(usr2.firstName);
      }
    },
    {
      sortName: "Age",
      sortFn: (usr1: IUserData, usr2: IUserData): number => {
        return usr1.age - usr2.age;
      } 
    },
    {
      sortName: "Favorites",
      sortFn: (usr1: IUserData, usr2: IUserData): number => {
        if (usr1.isFavorite === usr2.isFavorite) return 0;
        if (usr1.isFavorite) return -1;
        return 1;
      }
    }
  ]

  useEffect(()=> {
        async function getUsers(){
      try {
        let res= await fetch(`https://randomuser.me/api?seed=00000&page=1&results=10&page=${page}`);
        if(!res.ok) throw res

        let newUsers= await res.json()

        const formatedUsers: IUserData[] = newUsers.results.map((user: any) => {
          return {
            firstName: user.name.first,
            lastName: user.name.last,
            gender: user.gender,
            email: user.email,
            age: user.dob.age,
            image: user.picture.large,
            isFavorite: localStorage.getItem(user.login.uuid) !== null,
            city: user.location.city,
            userName: user.login.username,
            birth: user.dob.date,
            regDate: user.registered.date,
            id: user.login.uuid
          } as IUserData
        })
        if (selectedSort !== undefined) formatedUsers.sort(sortFns[selectedSort].sortFn)

        setUsers(formatedUsers)
      } catch (error) {
        console.error(error)
      }
    }
    getUsers()
  }, [page])

  useEffect(() => {
    if (selectedSort !== undefined) setUsers([...users].sort(sortFns[selectedSort].sortFn))
  }, [selectedSort])

  const onNext = ()=> {
    setPage(page + 1);
  }
  
  const onPrevious = ()=> {
    if (page > 1) setPage(page - 1);    
  }

  const onSetSort = (sortNum: number) => {
    if(sortNum < sortFns.length) setSelectedSort(sortNum)
  }

  const hadnleUserClick = (id: string) => {
    const userId = users.findIndex(user => user.id === id)
    if (userId !== -1) setSelectedId(userId);
  }

  const onToggleFavorite = (id: string) => {
    if (localStorage.getItem(id)) localStorage.removeItem(id)
    else localStorage.setItem(id, id)

    setUsers(users.map(user => {
      if (user.id === id) user.isFavorite = !user.isFavorite;
      return user
    }))
  }

  const onCloseModal = () => {
    setSelectedId(undefined);
  }

  return (
    <div className="app">
      <header className="header">
        <Sort sortNames={sortFns.map(sort => sort.sortName)} onSetSort={onSetSort} />
        <Navigation onPrevious={onPrevious} onNext={onNext} page={page} />
        <Favorites onToggleFavorite={onToggleFavorite} users={users.filter(user => user.isFavorite)}/>
      </header>

      <div className="users">
        {users.map(user => {
          return <User key={user.id} {...{...user, hadnleUserClick, onToggleFavorite}}/>
        })}
      </div>

      {selectedId !== undefined && <Modal {...{...users[selectedId], onCloseModal, onToggleFavorite}} />}
    </div>
  );
}

export default App;
