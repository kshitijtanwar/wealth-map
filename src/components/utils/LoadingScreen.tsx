import { ClimbingBoxLoader } from "react-spinners";
const LoadingScreen = () => {
    return (
        <section className="grid place-content-center h-screen">
            <ClimbingBoxLoader color="oklch(0.645 0.246 16.439)" />
        </section>
    );
};
export default LoadingScreen;
