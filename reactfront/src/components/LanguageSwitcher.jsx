
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Menu, MenuItem, ListItemIcon, ListItemText, styled } from "@mui/material";
import Flag from "react-world-flags";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

// Styled components for better appearance in the purple layout
const LanguageButton = styled(Button)(() => ({
    color: '#fff', // White text for contrast on the purple background
    borderColor: '#fff', // White border to match the text
    '&:hover': {
        backgroundColor: '#9c27b0', // Darker purple background on hover
        borderColor: '#fff',
    },
    textTransform: 'none', // Prevents uppercase transformation
}));

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null); // To control the menu
    const [open, setOpen] = useState(false); // To track menu open state

    // Toggle menu visibility
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
    };

    // Close the menu
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    // Change language
    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
        handleClose(); // Close the menu after selecting a language
    };

    return (
        <div>
            <LanguageButton
                variant="outlined"
                onClick={handleClick}
                endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            >
                Language
            </LanguageButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                sx={{
                    '& .MuiMenuItem-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slight background for items
                        color: '#fff', // White text for better contrast on dark menu
                        '&:hover': {
                            backgroundColor: '#9c27b0', // Highlight menu items on hover
                        },
                    },
                }}
            >
                {/* English */}
                <MenuItem onClick={() => handleLanguageChange("en")}>
                    <ListItemIcon>
                        <Flag code="GB" style={{ width: 20, height: 15 }} />
                    </ListItemIcon>
                    <ListItemText
                        primary="English"
                        sx={{ color: 'black' }} // Change text color to black
                    />
                </MenuItem>

                {/* French */}
                <MenuItem onClick={() => handleLanguageChange("fr")}>
                    <ListItemIcon>
                        <Flag code="FR" style={{ width: 20, height: 15 }} />
                    </ListItemIcon>
                    <ListItemText
                        primary="French"
                        sx={{ color: 'black' }} // Change text color to black
                    />
                </MenuItem>
            </Menu>
        </div>
    );
};

export default LanguageSwitcher;
