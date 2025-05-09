const FormError = ({ text }: { text?: string }) => {
    return <p className="text-red-500 text-xs text-right">{text}</p>;
};
export default FormError;
