export async function getUserLocation() {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const coordsUser = [position.coords.longitude, position.coords.latitude];
      resolve(coordsUser);
    });
  });
}
