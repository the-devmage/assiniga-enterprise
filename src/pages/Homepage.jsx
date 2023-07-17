import { useAuth } from "../context/AuthContext";
export default function Homepage() {
    const { user } = useAuth();
    const { displayName } = user;

    return(
        <div className="h-[100%] flex flex-col justify-center items-center gap-8 ">
            <h1 className="text-5xl uppercase tracking-widest font-semibold text-center ">
                welcome back
            </h1>
            <p className="uppercase text-4xl font-thin tracking-wide ">
                { displayName }
            </p>
            <p className="text-xl">What are you doing today?</p>
        </div>
    );
}