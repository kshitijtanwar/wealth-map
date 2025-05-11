const DataSourceCardItem = ({
    icon: Icon,
    title = "Property Records",
    updatedAt = new Date(),
}: {
    icon: React.FC;
    title: string;
    updatedAt: Date;
}) => {
    return (
        <div className="flex items-center space-x-4 rounded-md border p-4">
            <Icon />
            <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                    {title}
                </p>
                <p className="text-xs text-muted-foreground">
                    Updated at{" "}
                    {updatedAt.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                    })}
                </p>
            </div>
        </div>
    );
};
export default DataSourceCardItem;
