import { SetStateAction, Dispatch } from 'react'

interface GetNewUsersFormProps {
    setGetNextUsers: (Dispatch<SetStateAction<number>>);
    getNextUsers: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleMoreUsers: (e: any) => void;
}

const GetNewUsersForm = ({setGetNextUsers, getNextUsers, handleMoreUsers}: GetNewUsersFormProps) => {
  return (
    <form onSubmit={handleMoreUsers} className='flex flex-col flex-1 items-start'>
      <label htmlFor='getMoreUsers' className='text-left'>Number of Users to Show</label>
      <div>
        <input 
          id='getMoreUsers'
          className='border-blue-500 border-2 rounded-sm m-3 p-2 w-12'
          value={getNextUsers} 
          onChange={(e) => setGetNextUsers(Number(e.target.value))}
          />
        <button>Get New Users</button>
      </div>
    </form>
  )
}

export default GetNewUsersForm