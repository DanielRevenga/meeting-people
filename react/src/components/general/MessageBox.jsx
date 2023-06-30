//

export const MessageBox = ({ content, color, side, createdAt, name }) => {
	const colorStyle = color === "blue" ? "bg-blue-600" : "bg-green-600"
	const sideCardStyle = side === "right" ? "justify-end" : "justify-start"
	const sideTextStyle = side === "right" ? "text-right" : "text-left"

	return (
		<div className={`border-gray-400 flex mb-2 ${sideCardStyle}`}>
			<div
				className={`border border-gray-400 rounded-[6px] p-2 px-4 ${colorStyle} font-bold text-[1.1rem] flex flex-col`}
			>
				<header className={`text-[0.85rem] opacity-[0.75] mb-2 ${sideTextStyle}`}>
					{name} ({createdAt})
				</header>
				<main>{content}</main>
			</div>
		</div>
	)
}
