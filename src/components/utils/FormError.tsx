const FormError = ({ text }: { text?: string }) => {
    return <p className="text-red-500 text-xs text-right p-0 m-0">{text}</p>;
};
export default FormError;
