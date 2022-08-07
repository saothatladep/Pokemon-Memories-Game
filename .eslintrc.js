module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ["plugin:vue/vue3-essential", "eslint:recommended", "plugin:prettier/recommended"],
	parserOptions: {
		parser: "@babel/eslint-parser",
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"prettier/prettier": [
			"error",
			{
				arrowParens: "always",
				bracketSpacing: true,
				embeddedLanguageFormatting: "auto",
				htmlWhitespaceSensitivity: "css",
				insertPragma: false,
				jsxBracketSameLine: false,
				jsxSingleQuote: false,
				printWidth: 120,
				proseWrap: "preserve",
				quoteProps: "as-needed",
				requirePragma: false,
				semi: true,
				singleQuote: false,
				tabWidth: 2,
				trailingComma: "es5",
				useTabs: true,
				vueIndentScriptAndStyle: false,
			},
		],
	},
};
