import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { faCode } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Stack, Tooltip, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

export const Footer: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Stack alignItems="center">
            <Box display="flex" fontSize="2rem" gap={3}>
                <Tooltip title="LinkedIn" placement="top">
                    <a href="https://www.linkedin.com/in/kanishkbadola/" target="_blank">
                        <FontAwesomeIcon style={{ color: "#3a506b" }} icon={faLinkedinIn} />
                    </a>
                </Tooltip>
                <Tooltip title="GitHub" placement="top">
                    <a href="https://github.com/kanishkbadola12" target="_blank">
                        <FontAwesomeIcon style={{ color: "#3a506b" }} icon={faGithub} />
                    </a>
                </Tooltip>
                <Tooltip title="LeetCode" placement="top">
                    <a href="https://leetcode.com/u/kanishkbadola12/" target="_blank">
                        <FontAwesomeIcon style={{ color: "#3a506b" }} icon={faCode} />
                    </a>
                </Tooltip>
            </Box>
            <Typography variant="overline">{t('Made by')} Kanishk Badola</Typography>
        </Stack>
    )
}