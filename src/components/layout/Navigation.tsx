import { Box, FormControlLabel, Switch, Tab, Tabs, useTheme } from "@mui/material"
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setIsAppLoading, setSelectedTab } from "../../store/slices/appState";
import { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useEffect, useState } from "react";

export const Navigation: React.FC = () => {
    const { selectedTab, currentLocale } = useAppSelector((state: RootState) => state.appState);
    const navigate = useNavigate();
    const theme = useTheme();
    const { light, main } = theme.palette.primary;
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const [checked, setChecked] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(prevVal => {
            !prevVal ? i18n.changeLanguage(currentLocale) : i18n.changeLanguage('en');
            return event.target.checked;
        });
    };

    const handleTabState = () => {
        if (selectedTab === 'today') {
            navigate('weekly');
            dispatch(setSelectedTab('week'));

        } else {
            navigate('..');
            dispatch(setSelectedTab('today'));
        }
        dispatch(setIsAppLoading(true));
    }

    useEffect(() => {
        setChecked(false);
        i18n.changeLanguage('en');
    }, [currentLocale]);


    return (
        <Box display="flex" alignItems="center" gap={2}>
            <Box>
                <Tabs value={selectedTab} onChange={handleTabState}>
                    <Tab
                        sx={{ color: selectedTab == 'today' ? main : light }}
                        value="today"
                        label={t('Today')}
                    />
                    <Tab
                        sx={{ color: selectedTab == 'week' ? main : light }}
                        value="week"
                        label={t('Week')}
                    />
                </Tabs>
            </Box>
            {(currentLocale === 'de' || currentLocale === 'fr') &&
                (<FormControlLabel
                    control={
                        <Switch
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />}
                    label={currentLocale.toUpperCase()}
                />)
            }
        </Box>
    )
}