import platform from "platform";

export const GlobalSearchPlaceholder = {
	IE: "ALT + K",
	Chrome: "ALT + K",
	Safari: "ALT + K",
	Opera: "ALT + K",
	Firefox: "ALT + CTRL + K",
}[platform.name ?? "Chrome"];
