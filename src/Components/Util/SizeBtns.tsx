interface SizeBtnsProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    text: string;
  }
export const SizeBtns = ({text, onClick}:SizeBtnsProps) => {
  return (
    <button className="bg-gray-200  w-12 h-10 focus:border-2 border-red-500" onClick={onClick}>{text}</button>
  )
}
