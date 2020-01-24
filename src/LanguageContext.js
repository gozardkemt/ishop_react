import React from 'react';

export const translation = {
	en: {
		"show filters": "Show Filters",
		"hide filters": "Hide Filters",
		"switch lang": "Prelož do slovenčiny",
		"istore slovakia": "iStore Slovakia w/React",
		"clear filters": "Clear Filters",
		"text filter": "Text Filter",
		"price filter": "Price Filter",
		"from": "From",
		"to": "To",
		"all": "All",
		"products categories": "Product Categories",
		"iphones": "iPhones",
		"macs": "Macs",
		"apple watch": "Apple Watch",
		"other": "Others",
	},
	sk: {
		"hide filters": "Skry filtre",
		"show filters": "Zobraz filtre",
		"switch lang": "Translate to English",
		"istore slovakia": "iStore Slovensko s Reactom",
		"clear filters": "Vymaž filtre",
		"text filter": "Textový filter",
		"price filter": "Cenový filter",
		"from": "Od",
		"to": "Do",
		"all": "Všetky",
		"products categories": "Kategórie produktov",
		"iphones": "iPhones",
		"macs": "Mac počítače",
		"apple watch": "Apple hodinky",
		"other": "Ostatné"
	}
};

export const LanguageContext = React.createContext( translation.sk )
