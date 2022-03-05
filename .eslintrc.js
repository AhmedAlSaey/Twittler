module.exports = {
	extends: ['plugin:prettier/recommended'],
	parser: '@typescript-eslint/parser',

	parserOptions: {
		ecmaVersion: 2019,
		tsconfigRootDir: __dirname,
		sourceType: 'module',
		project: './tsconfig.json',
	},
	rules: {
		'prettier/prettier': 'warn',
	},
	ignorePatterns: ['.eslintrc.js', 'jest.config.js'],
	env: {
		node: true,
	},
};
