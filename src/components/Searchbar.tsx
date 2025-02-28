import { SetStateAction, Dispatch } from 'react'

interface searchProps {
    setSearchInput: (Dispatch<SetStateAction<string>>);
    searchInput: string;
}

const Searchbar = ({setSearchInput, searchInput}: searchProps) => {

  return (
    <div className='w-full flex flex-1 flex-col items-start'>
      <label htmlFor='searchBar' className='text-left'>Search by User Name</label>
      <input 
        id='searchBar'
        type='text'
        placeholder='search user name..' 
        value={searchInput} 
        onChange={(e) => setSearchInput(e.target.value)}
        className='border-blue-500 border-2 rounded-sm m-3 p-2 '
      />
    </div>
  )
}

export default Searchbar