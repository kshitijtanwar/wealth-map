const colorMap: Record<string, { bg: string; fg: string }> = {
    purple: { bg: "bg-purple-100", fg: "bg-purple-500" },
    blue: { bg: "bg-blue-100", fg: "bg-blue-500" },
    green: { bg: "bg-emerald-100", fg: "bg-emerald-500" },
    amber: { bg: "bg-amber-100", fg: "bg-amber-500" },
};

const CircleHighlight = ({
    percent,
    color,
    title,
}: {
    percent: number;
    color: "purple" | "blue" | "green" | "amber";
    title: string;
}) => {
    const { bg, fg } = colorMap[color] || colorMap.purple;

    return (
        <div className="text-center">
            <div
                className={`h-16 w-16 mx-auto rounded-full ${bg} flex items-center justify-center`}
            >
                <div
                    className={`h-12 w-12 rounded-full ${fg} flex items-center justify-center text-white font-medium text-sm`}
                >
                    {percent}%
                </div>
            </div>
            <p className="text-xs mt-2">{title}</p>
        </div>
    );
};
export default CircleHighlight;
