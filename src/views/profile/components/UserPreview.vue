<template>
  <div>
    <h1>{{ $t("keywords.profile") }}</h1>
    <v-card class="rounded-t-xl" rounded="0" color="v_card_background">
      <div class="img-w-100">
        <v-avatar size="100">
          <v-img
            :src="
              _isViewImagePath
                ? $store.getters.currentUser.image_path
                : require('@/assets/vendor/img/null_profile.png')
            "
            :alt="$store.getters.currentUser.username"
          ></v-img>
        </v-avatar>
      </div>
      <v-row>
        <v-col cols="12" sm="8" md="8" lg="8" xl="10"> </v-col>
        <v-col align="right" cols="12" sm="4" md="4" lg="4" xl="2"> </v-col>
      </v-row>
      <div class="profile-user-info">
        <v-card-title v-if="_isViewFirstName || _isViewLastName">
          <div v-if="_isViewFirstName && _isViewLastName && _isReveseFullName">
            {{ _isViewLastName ? $store.getters.currentUser.last_name : "" }},
            {{ _isViewFirstName ? $store.getters.currentUser.first_name : "" }}
          </div>
          <div v-else>
            {{ _isViewFirstName ? $store.getters.currentUser.first_name : "" }}
            {{ _isViewLastName ? $store.getters.currentUser.last_name : "" }}
          </div>
        </v-card-title>
        <h2 v-if="_isViewUserName">
          @{{ $store.getters.currentUser.username }}
        </h2>
        <v-card-subtitle v-if="_isViewEmail">{{
          $store.getters.currentUser.email
        }}</v-card-subtitle>
        <v-card-text v-if="_isViewDescription">
          {{ $store.getters.currentUser.description }}
        </v-card-text>
      </div>
    </v-card>
    <h1>{{ $t("keywords.content") }}</h1>
    <v-card class="content">
      <div class="user-image">
        <v-avatar size="150">
          <v-img
            :lazy-src="
              _isViewImagePath && $store.getters.currentUser.image_path
                ? $store.getters.currentUser.image_path
                : require('@/assets/vendor/img/null_profile.png')
            "
            :src="
              _isViewImagePath && $store.getters.currentUser.image_path
                ? $store.getters.currentUser.image_path
                : require('@/assets/vendor/img/null_profile.png')
            "
            width="10%"
          ></v-img>
        </v-avatar>
      </div>
      <div class="user-info">
        <v-card-title v-if="_isViewFirstName || _isViewLastName">
          <div v-if="_isViewFirstName && _isViewLastName && _isReveseFullName">
            {{ _isViewLastName ? $store.getters.currentUser.last_name : "" }},
            {{ _isViewFirstName ? $store.getters.currentUser.first_name : "" }}
          </div>
          <div v-else>
            {{ _isViewFirstName ? $store.getters.currentUser.first_name : "" }}
            {{ _isViewLastName ? $store.getters.currentUser.last_name : "" }}
          </div>
        </v-card-title>
        <v-card-title v-if="_isViewUserName">
          @{{ $store.getters.currentUser.username }}
        </v-card-title>
        <v-card-title v-if="_isViewEmail">
          {{ $store.getters.currentUser.email }}
        </v-card-title>
        <v-card-subtitle v-if="_isViewTitle">
          {{ $store.getters.currentUser.title }}
        </v-card-subtitle>
      </div>
    </v-card>
    <h1>{{ $t("keywords.forum") }}</h1>
    <!-- ------------FORUM-------------- -->
    <v-card>
      <v-row>
        <v-col align="center" cols="12" sm="2" md="2" lg="2">
          <v-avatar size="100">
            <v-img
              :src="
                _isViewImagePath && $store.getters.currentUser.image_path
                  ? $store.getters.currentUser.image_path
                  : `@/assets/vendor/img/null_profile.png`
              "
              width="100%"
            ></v-img>
          </v-avatar>
          <div class="user-info">
            <v-card-subtitle v-if="_isViewFirstName || _isViewLastName">
              <div
                v-if="_isViewFirstName && _isViewLastName && _isReveseFullName"
              >
                {{
                  _isViewLastName ? $store.getters.currentUser.last_name : ""
                }},
                {{
                  _isViewFirstName ? $store.getters.currentUser.first_name : ""
                }}
              </div>
              <div v-else>
                {{
                  _isViewFirstName ? $store.getters.currentUser.first_name : ""
                }}
                {{
                  _isViewLastName ? $store.getters.currentUser.last_name : ""
                }}
              </div>
            </v-card-subtitle>
            <v-card-subtitle v-if="_isViewUserName">
              @{{ $store.getters.currentUser.username }}
            </v-card-subtitle>
            <v-card-subtitle v-if="_isViewTitle">
              {{ $store.getters.currentUser.title }}
            </v-card-subtitle>
          </div>
        </v-col>
        <v-col cols="12" sm="10" md="10" lg="10">
          <v-card-actions>
            <v-list-item class="grow">
              {{ new Date() | moment("DD MMMM YYYY HH:mm") }}

              <v-row align="center" justify="end">
                <i class="mr-2">
                  <a
                    v-if="_isViewEmail"
                    :href="`mailTo:${$store.getters.currentUser.email}`"
                    target="_blank"
                    >{{ $store.getters.currentUser.email }}</a
                  ></i
                >
                <div>
                  <span class="mr-1">·</span>
                  <span class="mr-1">·</span>
                  <span class="mr-1">·</span>
                  <v-btn icon>
                    <v-icon class="mr-1"> mdi-share-variant </v-icon>
                  </v-btn>
                  <span class="mr-1">·</span>
                  <v-btn icon>
                    <v-icon class="mr-1"> mdi-cogs </v-icon>
                  </v-btn>
                </div>
              </v-row>
            </v-list-item>
          </v-card-actions>
          <v-card-text> </v-card-text>
        </v-col>
      </v-row>
    </v-card>
    <h1>{{ $t("keywords.timeline") }}</h1>
    <v-card>
      <v-timeline align-top dense>
        <v-timeline-item color="white" small>
          <v-row class="pt-1">
            <v-col sm="2" md="2">
              <strong>{{ new Date() | moment("from", "now") }}</strong>
            </v-col>
            <v-col>
              <div class="click">
                <strong>{{ $t("keywords.content") }}</strong>
              </div>
              <div class="caption">
                <ul>
                  <li>
                    <v-tooltip color="green" bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on"> mdi-twitter </v-icon>
                      </template>
                      <span>Twitter</span>
                    </v-tooltip>
                  </li>
                </ul>
                <br />
                <div>
                  <v-avatar size="60">
                    <img :src="$store.getters.currentUser.image_path" alt="" />
                  </v-avatar>
                  <div class="timeline-user-info">
                    <v-card-subtitle v-if="_isViewFirstName || _isViewLastName">
                      <div
                        v-if="
                          _isViewFirstName &&
                          _isViewLastName &&
                          _isReveseFullName
                        "
                      >
                        {{
                          _isViewLastName
                            ? $store.getters.currentUser.last_name
                            : ""
                        }},
                        {{
                          _isViewFirstName
                            ? $store.getters.currentUser.first_name
                            : ""
                        }}
                      </div>
                      <div v-else>
                        {{
                          _isViewFirstName
                            ? $store.getters.currentUser.first_name
                            : ""
                        }}
                        {{
                          _isViewLastName
                            ? $store.getters.currentUser.last_name
                            : ""
                        }}
                      </div>
                    </v-card-subtitle>
                    <v-card-subtitle v-if="_isViewUserName">
                      @{{ $store.getters.currentUser.username }}
                    </v-card-subtitle>
                    <v-card-subtitle v-if="_isViewEmail">
                      {{ $store.getters.currentUser.email }}
                    </v-card-subtitle>
                    <v-card-subtitle v-if="_isViewTitle">
                      {{ $store.getters.currentUser.title }}
                    </v-card-subtitle>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    _isViewImagePath: {
      type: Boolean,
      default: false,
    },
    _isViewFirstName: {
      type: Boolean,
      default: false,
    },
    _isViewLastName: {
      type: Boolean,
      default: false,
    },
    _isReveseFullName: {
      type: Boolean,
      default: false,
    },
    _isViewUserName: {
      type: Boolean,
      default: false,
    },
    _isViewEmail: {
      type: Boolean,
      default: false,
    },
    _isViewDescription: {
      type: Boolean,
      default: false,
    },
    _isViewTitle: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.img-w-100 {
  width: 100%;
  text-align: center;
  position: absolute;
  margin-top: -50px;
}
.v-card {
  top: 10px;
  margin-bottom: 20px;
  color: var(--v-v_card_title_color-base);
}
.profile-user-info {
  margin-top: 50px;
}
.v-card__title {
  padding: 0 0 0 0;
  justify-content: center !important;
}
.v-card__subtitle {
  padding: 10px 0 10px 0;
  text-align: center !important;
}
h2 {
  text-align: center;
}
.v-card__text {
  text-align: justify;
  padding: 10px 100px;
}
.content {
  padding: 20px 0 0 0;
}
.user-image {
  width: 100%;
  text-align: center;
}
.user-info {
  padding: 0 0 20px 0;
  width: 100%;
  text-align: center;
}
.user-info .v-card__title,
.user-info .v-card__subtitle {
  padding: 10px 0 0 0;
}

.timeline-user-info .v-card__subtitle {
  text-align: left !important;
}
</style>