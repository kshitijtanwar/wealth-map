import { type LoadingState, type LoadingAction } from "@/types";

export const initialLoadingState: LoadingState = {
    fetchingEmployees: false,
    fetchingInvitations: false,
    inviting: false,
    revokingInvitation: false,
    revokingAccess: false,
    removingEmployee: false,
};

export function loadingReducer(
    state: LoadingState,
    action: LoadingAction
): LoadingState {
    switch (action.type) {
        case "FETCH_EMPLOYEES_START":
            return { ...state, fetchingEmployees: true };
        case "FETCH_EMPLOYEES_END":
            return { ...state, fetchingEmployees: false };
        case "FETCH_INVITATIONS_START":
            return { ...state, fetchingInvitations: true };
        case "FETCH_INVITATIONS_END":
            return { ...state, fetchingInvitations: false };
        case "INVITE_START":
            return { ...state, inviting: true };
        case "INVITE_END":
            return { ...state, inviting: false };
        case "REVOKE_INVITATION_START":
            return { ...state, revokingInvitation: true };
        case "REVOKE_INVITATION_END":
            return { ...state, revokingInvitation: false };
        case "REVOKE_ACCESS_START":
            return { ...state, revokingAccess: true };
        case "REVOKE_ACCESS_END":
            return { ...state, revokingAccess: false };
        case "REMOVE_EMPLOYEE_START":
            return { ...state, removingEmployee: true };
        case "REMOVE_EMPLOYEE_END":
            return { ...state, removingEmployee: false };
        default:
            return state;
    }
}

export const getPageTitle = (pageTitles: Record<string, string>) => {
    if (location.pathname.includes("property-detail")) {
        return "Property Detail";
    }
    return pageTitles[location.pathname] || "Dashboard";
};
