<template>
  <div class="root">
    <md-whiteframe class="map-wrapper" md-elevation="5">

      <gmap-map :center="center" :zoom="zoom" style="width: 100%; height: 100%">
        <gmap-marker :icon="iconItem" :key="index" v-for="(m, index) in getMarkers" :position="m" :clickable="true" @click="showWindow(m)">
        </gmap-marker>
        <gmap-marker :icon="iconCurrent" :draggable="true" v-if="showCurrentLocation" @drag="dragSelfLocation" :position="currentLocation"></gmap-marker>

        <gmap-info-window :options="infoOptions" :position="info.marker" @closeclick="info.show = false" :opened="info.show">
          <md-card class="info-card">
            <md-card-media>
              <img class="photo" :src="info.marker.imgLink" alt="People">
            </md-card-media>

            <md-card-header>
              <div class="md-title">{{info.marker.name}}</div>
              <div class="md-subhead">
                <md-icon>location_on</md-icon>
                <span>{{info.marker.address}}</span>
              </div>
            </md-card-header>
            <md-card-content>
              <div class="desc">
                <h3 class="md-subheading">Стан роботи:</h3>
                <div class="card-description">
                  {{info.marker.statusText}}
                </div>
              </div>
              <div class="desc">

                <h3 class="md-subheading">Проба води:</h3>
                <a :href="info.marker.documentLink" class="md-icon-button">
                  <md-icon>description</md-icon>
                   
                </a>
              </div>
            </md-card-content>
            <md-card-actions>
              <md-button @click.native="like" class="md-icon-button">
                <md-icon>favorite</md-icon>
                <md-tooltip md-direction="bottom">Мені подобаэться</md-tooltip>
              </md-button>
              <span class="like">{{info.marker.like}}</span>
            </md-card-actions>
          </md-card>
        </gmap-info-window>
      </gmap-map>

    </md-whiteframe>
    <div class="tools" md-elevation="5">
      <div class="switch-wrapper">
        <md-switch v-model="showOnlyWork" class="md-primary">Тількі працюючі</md-switch>
      </div>
      <md-button @click.native="getCurrentLocation">Моє місце розташування</md-button>
      <div class="switch-wrapper">
        <md-switch v-if="showCurrentLocation" v-model="showNearest" class="md-primary">Найближчий бювет</md-switch>
      </div>
    </div>
  </div>
</template>

<script src="./main.js"></script>

<style lang="less" scoped src="./main.less"></style>