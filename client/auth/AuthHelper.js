const auth = {
  isAuthenticated() {
    if (typeof window == "undefined") return false;

    if (sessionStorage.getItem("userInfo"))
      return JSON.parse(sessionStorage.getItem("userInfo"));
    else return false;
  },
};

export default auth;
