import { CircularProgress, Stack } from "@mui/material";

export const LoadingIndicator: React.FC<{ children: JSX.Element }> = ({ children }) => {
    return (
        <Stack
            style={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                top: "50%",
                left: "50%",
                width: "60vw",
                transform: "translate(-50%, -50%)",
            }}>
            <CircularProgress />
            {children}
        </Stack>
    );
}