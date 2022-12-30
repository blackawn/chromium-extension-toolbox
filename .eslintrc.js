module.exports = {
  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    // typescript
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // vue
    'vue/custom-event-name-casing': 'off',
    'vue/multi-word-component-names': 'off',
    // grammar
    'space-before-function-paren': 'off', // 函数定义时，函数名与()之间不允许有空格
    'quotes': ['error', 'single'], // 引号类型
    'comma-dangle': ['warn', 'never'], // 警告对象字面量项尾不能有逗号
    'indent': ['error', 2, { SwitchCase: 1 }], // 缩进必须为2格
    'semi': ['warn', 'always'], // 警告末尾有分号
    'no-console': 'warn', // 禁止使用console
    'no-var': 'warn', // 禁用var，用let和const代替
    'arrow-parens': ['error', 'always'], // 箭头函数用小括号括起来
    'arrow-spacing': 'error', // 箭头函数前后空格
    'array-bracket-spacing': ['error', 'never'], // 数组方括号内的项前不允许有空格，否则报错
    'brace-style': 'error', // 大括号风格
    'camelcase': 'warn', // 变量名驼峰命名
    'computed-property-spacing': ['error', 'never'], // 计算属性名前后不允许有空格
    'curly': ['error', 'multi-line'], // if while for do等的大括号风格
    'eol-last': ['error', 'always'], // 文件以单一的换行符结束
    'eqeqeq': ['error', 'smart'], // 必须使用全等
    'max-depth': ['error', 3], // 嵌套块深度不能超过3层
    'max-len': ['warn', 150], // 一行最多150字符
    'max-statements': ['warn', 15], // 一个function最多15个statement
    'new-cap': ['warn', { 'capIsNew': false }], // 构造函数首字母大写
    'no-extend-native': 'error', // 禁止扩展native对象
    'no-mixed-spaces-and-tabs': 'error', // 禁止混用tab和空格
    'no-trailing-spaces': 'error', // 一行结束后面不允许有空格
    'no-unused-vars': 'warn', // 一个function中未使用的变量不报错
    'no-use-before-define': ['error', 'nofunc'], // 非function未定义前不能使用
    'object-curly-spacing': ['error', 'always'], // 大括号内的项前后不允许有空格
    'keyword-spacing': ['error', { 'before': true, 'after': true }], // 关键字前后不允许有空格
    'space-unary-ops': 'error', // 一元运算符前后不允许有空格
    'no-multi-spaces': 'error', // 不允许多个空格
    'comma-spacing': ['error', { 'before': false, 'after': true }] // 逗号前面不允许有空格
  }
};
