import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";

// action types
export const VERIFY_AUTH = "verifyAuth";
export const CURRENT_USER = "currentUser";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_USER = "updateUser";

// mutation types
export const SET_CURRENT_USER = "setCurrentUser";
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setUser";
export const SET_ERROR = "setError";

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken()
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
      ApiService.post("users/login", user)
        .then(({ data }) => {
          context.commit(SET_AUTH, data);
          resolve(data);
          context.commit(CURRENT_USER)
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data);
          resolve(response)
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("users", { user: credentials })
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
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("users/verify")
        .then((x) => {
          if (!x.data)
            context.commit(PURGE_AUTH);
          else {
            context.dispatch(CURRENT_USER)
          }
        })
        .catch(() => {
          //context.commit(SET_ERROR, response.data.errors);
          context.commit(PURGE_AUTH);
        });
    } else {
      context.commit(PURGE_AUTH);
    }
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
  async [CURRENT_USER](context) {
    if (JwtService.getToken()) {
      return await new Promise((resolve, reject) => {
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
  }
};

const mutations = {
  [SET_CURRENT_USER](state, data) {
    state.user = data;
  },
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, data) {
    state.isAuthenticated = true;
    JwtService.saveToken(data.token);
    localStorage.setItem("USER_INFO", JSON.stringify(data.user))
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    JwtService.destroyToken();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
