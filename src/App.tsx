import { useState, useEffect, useMemo } from 'react'
import './App.css'
import { getUsers } from './services/getUsers'
import { User } from './props/User'
import Searchbar from './components/Searchbar'
import UsersGrid from './ui/usersGrid' 
import GetNewUsersForm from './components/GetNewUsersForm'

function App() {

  const [users, setUsers] = useState<User[] | undefined>();
  const [searchInput, setSearchInput] = useState('');
  const [getNextUsers, setGetNextUsers] = useState(0);
  const [message, setMessage] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(false);

  //store the users in a memorized state to allow us to filter on the users first or last name, 

  const filteredUsers = useMemo(() => {
    if (searchInput.length > 2) {
       return users?.filter((user : User) => {
        const firstName = user.name.first.toLowerCase()
        const lastName = user.name.last.toLowerCase()
        return firstName.includes(searchInput.toLocaleLowerCase())  || lastName.includes(searchInput.toLocaleLowerCase())
       }
      )
    }
    // if no search has been made, return all users.
    return users;
  }
 ,[users, searchInput])

  useEffect( () => {
    //when the script initially renders, call get users and set 'setUsers' to the list of users.
    const userData = async() => {
        const data = await getUsers(10)
        setUsers(data)
    }
      userData();
  },[])

  const handleMoreUsers = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setMessage('');
    if(!getNextUsers) return;
    if (getNextUsers <= 1 || getNextUsers >= 100) {
      setMessage('Please enter a number between 1 and 99');
      setGetNextUsers(10);
      return;
    }

    const data = await getUsers(getNextUsers)
    setLoadingUsers(true);

     setTimeout( () => {
        setUsers(data)
        setLoadingUsers(false);
      },2000) 
  }

  return (
    <main>
      <p className='text-red-500 font-bold m-2'>{message}</p>
      <section className='flex flex-col gap-2 sticky top-0 left-0 bg-[#c5dffa] md:flex-row'>
        <Searchbar setSearchInput={setSearchInput} searchInput={searchInput}/>
        <GetNewUsersForm 
          setGetNextUsers={setGetNextUsers} 
          getNextUsers={getNextUsers} 
          handleMoreUsers={handleMoreUsers}
          />
      </section>
      {!loadingUsers ?
        <UsersGrid filteredUsers={filteredUsers}/>
        :
        <div className='flex justify-evenly items-center mt-8'><p>loading...</p><span className='loader'></span></div>
      }
    </main>
  )
}

export default App
