import { Link } from "react-router-dom";
import { useState } from 'react';

interface Props {
	headerContent: string;
	headerBg: string;
	bodyContent: string;
	destination: string;
}

const Card = ({ headerContent, headerBg, bodyContent, destination }: Props) => {
	const [isHovered, setHovered] = useState(false);

	const handleMouseEnter = () => {
		setHovered(true);
	};
	const handleMouseLeave = () => {
		setHovered(false);
	};

	return (
		<Link to={destination}
			className="text-decoration-none"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className="h-full flex flex-col border-2 border-stone-400 rounded overflow-hidden ring ring-gray-300 hover:ring-2">
				<div className={`basis-1/3 flex justify-center items-center p-2 ${!isHovered ? headerBg : ''} transition ease-in-out duration-250`}>
					<p className={`${isHovered ? 'text-black' : 'text-slate-100'} transition ease-in-out duration-250 text-3xl  font-semibold`}>{headerContent}</p>
				</div>
				<div className={`flex-1 flex ${isHovered ? headerBg : ''} transition ease-in-out duration-250 justify-center items-center break-words p-2`}>
					<p className={`text-xl ${isHovered ? 'text-white' : 'text-stone-900'} transition ease-in-out duration-250 font-semibold text-center`}>{bodyContent}</p>
				</div>
			</div>
		</Link>
	);
};

export default Card;
