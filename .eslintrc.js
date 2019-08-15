module.exports = {
	"env": {
			"es6": true,
			"node": true
	},
	"extends": [
		"airbnb-base",
		"plugin:@typescript-eslint/recommended"
	],
	"globals": {
			"Atomics": "readonly",
			"SharedArrayBuffer": "readonly"
	},
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
			"ecmaVersion": 2018,
			"sourceType": "module"
	},
	"rules": {
		"indent": [2, "tab"],
		"no-tabs": ["error", { allowIndentationTabs: true }],
		"import/no-unresolved": [2, { ignore: ['\.'] }],
	}
};