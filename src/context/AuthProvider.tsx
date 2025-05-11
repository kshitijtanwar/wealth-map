import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import supabase from "@/db/supabase";
import type { AuthProviderProps } from "@/types";
import type { Session } from "@supabase/supabase-js"; // adjust import if needed

interface AuthContextType {
    session: Session | null;
    loading: boolean;
    companyLogo: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [companyLogo, setCompanyLogo] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        const initAuth = async () => {
            const { data } = await supabase.auth.getSession();
            if (mounted) {
                setSession(data?.session ?? null);
                setLoading(false);
            }
        };

        initAuth();

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (mounted) {
                    setSession(session);
                }
            }
        );

        return () => {
            mounted = false;
            listener.subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ session, loading, companyLogo }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
