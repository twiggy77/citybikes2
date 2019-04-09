import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('renders App with map', () => {

    const wrapper = shallowMount(App, {
      methods: {
        getBikeImg(availability) {
          return 'red'
        },
        requestStationsData(url) {
          if (url === 'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json') {
            return [{"station_id": "787", "name": "Kirkegata 15", "address": "Kirkegata 15, Oslo", "lat": 59.91015615055511, "lon": 10.743456971511705, "capacity": 12}]
          } else {
            return [{"station_id": "787", "is_installed": 1, "is_renting": 1, "is_returning": 1, "last_reported": 1554766554, "num_bikes_available": 0, "num_docks_available": 11}]
          }
        },
      },
    });

    const expectedH1Text = /Bysykler i Oslo/;
    expect(wrapper.text()).toEqual(expect.stringMatching(expectedH1Text));

    const expectedLeaflet = /Leaflet/;
    expect(wrapper.text()).toEqual(expect.stringMatching(expectedLeaflet));

    const expectedMarker = '.leaflet-marker-icon'
    expect(wrapper.find(expectedMarker).exists()).toBeTruthy()

    wrapper.find(expectedMarker).trigger('click');

    const expectedPopUp = /Kirkegata 15/;
    expect(wrapper.text()).toEqual(expect.stringMatching(expectedPopUp));
  })
});