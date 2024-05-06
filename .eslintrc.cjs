module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended",
    ],
    overrides: [],
    parser: "vue-eslint-parser",
    parserOptions: {
        ecmaVersion: "latest",
        parser: "@typescript-eslint/parser",
        sourceType: "module",
        // jsx 语法时 需要开启
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ["vue", "@typescript-eslint"],
    rules: {
        // 关闭名称校验
        "vue/multi-word-component-names": "off",
        "no-unused-vars": "off",
        "prefer-const": "off",
        "vue/no-unused-vars": "off",
        "no-useless-escape": "off",
        "@typescript-eslint/no-explicit-any": "off", //关闭any类型警告
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "no-debugger": "off",
        "@typescript-eslint/no-unsafe-declaration-merging": "off"
    },
};

