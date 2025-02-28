
import { User } from '../props/User'
import { UserCard } from '../components/UserCard'

interface UsersGridProps {
    filteredUsers: User[] | undefined
    //userKey: string | undefined
}

const UsersGrid = ({filteredUsers }: UsersGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {filteredUsers?.length !== 0 ?
        filteredUsers?.map((user: User) =>
          <UserCard name={user?.name} email={user?.email}  picture={user?.picture}/>
      ) :
      <p className='font-bold text-lg'>no users found</p>
    }
    </div>
  )
}

export default UsersGrid