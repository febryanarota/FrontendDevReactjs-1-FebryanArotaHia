export function Button({ text, className = "", onClick = () => { } }: { text: string, className?: string, onClick?: () => void }) {
    var style = "bg-sky-500 text-white px-5 py-1 rounded-md hover:bg-sky-600 transition-all duration-300 ease-in-out w-fit" + className

    if (className === "var2") {
        style = "border-sky-500 border-[1px] w-full text-sky-400 px-5 py-1 rounded-md hover:bg-sky-500 hover:text-white transition-all duration-300 ease-in-out" + className
    }

    return (
        <button onClick={onClick} className={style}>{text}</button>
    )
}
