import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'vue/no-deprecated-slot-attribute': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: 3,
      multiline: 1,
    }],
  },
})
