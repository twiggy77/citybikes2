import { shallowMount } from '@vue/test-utils'
import CityBikesList from '@/components/CityBikesList'

describe('CityBikesList.vue', () => {
  it('renders bike list', () => {
    const wrapper = shallowMount(CityBikesList,{
      data() {
        return {
          StationsStore: {stations: [{"station_id": "787", "name": "Kirkegata 15", "address": "Kirkegata 15, Oslo", "lat": 59.91015615055511, "lon": 10.743456971511705, "capacity": 12, "num_bikes_available": 0, "num_docks_available": 11}]}
        }
      }
    })

    const expectedName = 'Id: 787 Navn: Kirkegata 15 Tilgjengelig: 0 sykler og 11 låser';
    expect(wrapper.text()).toEqual(expect.stringMatching(expectedName));
  })
});