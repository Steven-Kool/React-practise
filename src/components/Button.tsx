interface Props {
   innerText: string;
   click: () => void;
   size: string;
}

const Button = ({innerText, click, size}: Props) => {
   return (
      <button className={`${size} whitespace-nowarp font-medium flex justify-center items-center`} onClick={click}>
         {innerText}
      </button>
   )
};

export default Button;
