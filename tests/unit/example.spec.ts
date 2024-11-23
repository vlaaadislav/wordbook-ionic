import HomePage from '@/views/WordsList.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('homePage.vue', () => {
  it('renders home vue', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.text()).toMatch('Words List')
  })
})
