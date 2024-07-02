import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { faCode } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Stack, Typography } from "@mui/material"

export const Footer: React.FC = () => (
    <Stack alignItems="center">
        <Box display="flex" fontSize="2rem" gap={3}>
            <a href="https://www.linkedin.com/in/kanishkbadola/" target="_blank">
                <FontAwesomeIcon style={{ color: "#3a506b" }} icon={faLinkedinIn} />
            </a>
            <a href="https://github.com/kanishkbadola12" target="_blank">
                <FontAwesomeIcon style={{ color: "#3a506b" }} icon={faGithub} />
            </a>
            <a href="https://leetcode.com/u/kanishkbadola12/" target="_blank">
                <FontAwesomeIcon style={{ color: "#3a506b" }} icon={faCode} />
            </a>
        </Box>
        <Typography variant="overline">Made by Kanishk Badola</Typography>
    </Stack>

)