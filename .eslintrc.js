module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "env": {
        "browser": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [2, 4, { "SwitchCase": 1 }],
        "default-case": 0,
        "jsx-quotes": [2, "prefer-single"],
        "quotes": [2, "single"],
        "semi": [2, "always"],
        "no-unused-vars": [1, {"vars": "all", "args": "none"}],
        "no-console": 0,
        "import/no-unresolved": 0,
        "import/extensions": 0,
        "space-before-function-paren": [2, { "anonymous": "always", "named": "never" }],
        "react/jsx-indent": [2, 4],
        "react/jsx-indent-props": [2, 4],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/prefer-stateless-function": 0,
        "react/prop-types": [2, { "ignore": ["dispatch"] }],
        "react/jsx-boolean-value": 0,
    },
    "ecmaFeatures": {
        "experimentalObjectRestSpread": true
    }
};

