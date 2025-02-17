export const categoryIcons = {
    "divination": "OnlinePrediction",
    "energy": "Bolt",
    "life": "EmojiNature",
    "mind": "Psychology",
    "planar": "Compare",
    "melee": "SportsKabaddi",
    "thrown": "SportsHandball",
    "projectile": "ArrowOutward",
    "athletics": "FitnessCenter",
    "interaction": "TheaterComedy",
    "lore_nature": "Nature",
    "lore_arcana": "AutoFixHigh",
    "lore_technology": "SettingsSuggest",
    "lore_social": "ConnectWithoutContact",
    "observation": "Radar"
};

export const getRequirement = (cost: number = 0) => Math.max(((cost - 1)*25)+1, 1)
