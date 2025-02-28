import {createContext, useState, useContext, useMemo, useEffect} from "react";
import { getUsers } from "../services/getUsers";

const UserContext = createContext();

function UserProvider({ children }) {
  const [users, setUsers] = useState<User[] | undefined>();
  const [searchInput, setSearchInput] = useState('');
  const [getNextUsers, setGetNextUsers] = useState(0);
  const [message, setMessage] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect( () => {
    //when the script initially renders, call get users and set 'setUsers' to the list of users.
    const userData = async() => {
        const data = await getUsers(10)
        setUsers(data)
    }
      userData();
  },[])

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



    return (
        <UserContext.Provider 
            value={
                {
                    users, setUsers, 
                    searchInput, setSearchInput,
                    getNextUsers, setGetNextUsers,
                    message, setMessage,
                    loadingUsers, setLoadingUsers,
                    filteredUsers

                }
            }
        >
          {children}
      </UserContext.Provider>
    )
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("ProductContext was used outside the UserProvider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { UserProvider, useUser };