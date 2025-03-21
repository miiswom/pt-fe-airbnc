export default function updateOptions(options) {
    const update = { ...options };
    if (localStorage.jsonwebtoken) {
      update.headers = {
        ...update.headers,
        Authorization: `Bearer ${localStorage.jsonwebtoken}`,
      };
    } else {
      alert('You need to sign-up or login.');
      window.location.assign("/signin")
    }
    return update;

}