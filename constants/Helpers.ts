export function getTextColorForBackground(hexColor: string) {
    // Convert hex color to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Helper function to get the RGB components adjusted
    const getRGBComponentLuminance = (color: number) => {
        const colorValue = color / 255.0;
        return colorValue <= 0.03928
            ? colorValue / 12.92
            : Math.pow((colorValue + 0.055) / 1.055, 2.4);
    };

    // Calculate the relative luminance
    const luminance =
        0.2126 * getRGBComponentLuminance(r) +
        0.7152 * getRGBComponentLuminance(g) +
        0.0722 * getRGBComponentLuminance(b);

    // Adjust threshold to better accommodate a wider range of colors
    const threshold = 0.5; // Higher threshold for lighter colors

    // Return black for light colors and white for dark colors based on luminance
    return luminance > threshold ? "black" : "white";
}

export const stateOptions = [
    { title: "Open", value: "open" },
    { title: "Closed", value: "closed" },
    { title: "All", value: "" },
];
