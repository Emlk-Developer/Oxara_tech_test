import { User } from "../props/User";

export const UserCard = ({name, email, picture}: User) => {
  const {title, first, last} = name;

  return (
    <div key={email} className="border-2 p-2 flex flex-col bg-blue-400 justify-center gap-2 hover:bg-blue-300">
      <h3 className="font-bold">{title} {first} {last}</h3>
      <p>{email}</p>
      <img src={picture.large}/>
    </div>
  )
}