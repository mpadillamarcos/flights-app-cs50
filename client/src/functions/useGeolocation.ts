import { onMounted, ref } from 'vue'

export default function useGeolocation() {
  const location = ref<string | null>(null)
  const getLocation = () => {
    function success(position: { coords: { latitude: any; longitude: any } }) {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      location.value = latitude + ',' + longitude
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(success)
    } else {
      location.value = 'Geolocation is not supported by the browser'
    }
  }

  onMounted(getLocation)

  return { location }
}
