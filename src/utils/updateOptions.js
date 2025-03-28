export default function updateOptions(options) {
    const update = { ...options };
    if (localStorage.jsonwebtoken) {
      update.headers = {
        ...update.headers,
        Authorization: `Bearer ${localStorage.jsonwebtoken}`,
      };
    } else if(location.href === "/protected") {
      history.back(-1)
    } else {
      // alert('You need to sign-up or login.');
      location.assign("/signin")
      // return
      // location.assign("/signin")
    }
    return update;

}