import ApiService from "@/core/services/api.service";

// action types
export const VERIFY_AUTH = "verifyAuth";
export const CURRENT_USER = "currentUser";
export const LOGIN = "login";
export const GOOGLE_AUTH = "googleAuth"
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_USER = "updateUser";

// mutation types
const SET_CURRENT_USER = "setCurrentUser";
const PURGE_AUTH = "logOut";
const SET_AUTH = "setAuth";
const SET_ERROR = "setError";

const state = {
  errors: null,
  user: {},
  isAuthenticated: false
};

const getters = {
  currentUser(state) {
    return state.user
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  isError(state) {
    return state.error
  }
};

const actions = {
  [LOGIN](context, credentials) {
    const user = {
      email: credentials.email,
      password: credentials.password
    }
    return new Promise(resolve => {
      ApiService.post("auth/dologin", user)
        .then((x) => {
          if (x.status == 200) {
            context.commit(SET_AUTH);
            context.dispatch(CURRENT_USER);
            resolve(x);
          }
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data);
          resolve(response)
        });
    });
  },
  [GOOGLE_AUTH]: (context, data) => {
    return new Promise((resolve, reject) => {
      ApiService.post(`users/google_token/`, data)
        .then(({ data }) => {
          context.commit(SET_AUTH);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [LOGOUT](context) {
    return new Promise((resolve, reject) => {
      ApiService.post("auth/destroysession").then(({ data }) => {
        context.commit(PURGE_AUTH);
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("users/register", { user: credentials })
        .then(({ data }) => {
          context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [VERIFY_AUTH](context) {
    return new Promise((resolve) => {
      ApiService.get("auth/verify")
        .then((x) => {
          if (x.data) {
            context.commit(SET_CURRENT_USER, x.data)
            context.commit(SET_AUTH)
            resolve(x.data)
          }
        })
        .catch(() => {
          context.commit(PURGE_AUTH);
          resolve(false)
        });
    })
  },
  [UPDATE_USER](context, payload) {
    const { email, username, password, image, bio } = payload;
    const user = { email, username, bio, image };
    if (password) {
      user.password = password;
    }

    return ApiService.put("user", user).then(({ data }) => {
      context.commit(SET_AUTH, data);
      return data;
    });
  },
  [CURRENT_USER](context) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.get("users/whoami")
        .then(({ data }) => {
          context.commit(SET_CURRENT_USER, data);
          resolve(data);
        })
        .catch((response) => {
          context.commit(PURGE_AUTH);
          reject(response);
        });
    })
  }
};

const mutations = {
  [SET_CURRENT_USER](state, data) {
    state.user = data;
  },
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state) {
    state.isAuthenticated = true;
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
