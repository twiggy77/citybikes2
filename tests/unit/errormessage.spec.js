import { shallowMount } from '@vue/test-utils'
import CityBikesList from '@/components/CityBikesList'

describe('CityBikesList.vue', () => {
  it('renders errormessage', () => {
    const wrapper = shallowMount(CityBikesList)

    const expectedErrorMessage = 'Kunne dessverre ikke laste informasjon om stasjonene';
    expect(wrapper.text()).toEqual(expect.stringMatching(expectedErrorMessage));
  })
});