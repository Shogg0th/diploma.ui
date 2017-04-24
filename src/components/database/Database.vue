<template>
    <div class="root">
        <md-table-card class="table-container">
            <div class="navigation">
                <div class="new">
                    <md-button @click.native="openDialog()">Добавить новую запись</md-button>
                </div>
                <md-input-container>
                    <label>Search</label>
                    <md-input v-model="filter"></md-input>
                </md-input-container>
                <div class="filter-icon">
                    <md-button class="md-icon-button">
                        <md-icon>search</md-icon>
                    </md-button>
                </div>
            </div>
            <md-table md-sort="calories">
                <md-table-header>
                    <md-table-row>
                        <md-table-head md-sort-by="name">Ім'я</md-table-head>
                        <md-table-head md-sort-by="address">Адреса</md-table-head>
                        <md-table-head md-sort-by="lat">Долгота</md-table-head>
                        <md-table-head md-sort-by="lng">Широта</md-table-head>
                        <md-table-head>
                            <span>Статус</span>
                        </md-table-head>
                        <md-table-head width="100px"></md-table-head>
                    </md-table-row>
                </md-table-header>

                <md-table-body>
                    <md-table-row v-for="(item,index) in filteredData" :key="index"
                        :md-item="item">
                        <md-table-cell>{{item.name}}</md-table-cell>
                        <md-table-cell>{{item.address}}</md-table-cell>
                        <md-table-cell>{{item.lat}}</md-table-cell>
                        <md-table-cell>{{item.lng}}</md-table-cell>
                        <md-table-cell>{{item.status}}</md-table-cell>
                        <md-table-cell>

                            <md-button @click.native="openDialog(index)" class="md-icon-button">
                                <md-icon>edit</md-icon>
                            </md-button>
                            <md-button @click.native="deleteOne(item._id)" class="md-icon-button">
                                <md-icon>delete</md-icon>
                            </md-button>

                        </md-table-cell>
                    </md-table-row>
                </md-table-body>
            </md-table>
        </md-table-card>

        <md-dialog ref="editDialog">
            <form novalidate @submit.stop.prevent="save" class="dialog">
                <md-dialog-title>
                    Редактировать запись
                </md-dialog-title>

                <md-dialog-content class="dialog-content">

                    <md-input-container>
                        <label>Ім'я</label>
                        <md-input maxlength="50" required v-model.trim="pumproom.name"></md-input>
                    </md-input-container>

                    <md-input-container>
                        <label>Адреса</label>
                        <md-input maxlength="50" required v-model.trim="pumproom.address"></md-input>
                    </md-input-container>

                    <md-input-container>
                        <label>Довгота</label>
                        <md-input type="number" required v-model.number="pumproom.lat"></md-input>
                    </md-input-container>

                    <md-input-container>
                        <label>Широта</label>
                        <md-input type="number" required v-model.number="pumproom.lng"></md-input>
                    </md-input-container>


                    <md-checkbox maxlength="50" required v-model.trim="pumproom.status">Статус</md-checkbox>


                    <!--<md-input-container>
                        <label>Описание</label>
                        <md-textarea maxlength="200" required v-model.trim="pumproom.description"></md-textarea>
                    </md-input-container>-->

                    <md-input-container>
                        <label>Посилання на зображення (url)</label>
                        <md-input required v-model.trim="pumproom.imgLink"></md-input>
                    </md-input-container>

                    <!--<div class="time-container">
                        <md-input-container>
                            <label>Начало работы</label>
                            <md-input type="time" required v-model="pumproom.startTime"></md-input>
                        </md-input-container>
                        <md-input-container>
                            <label>Конец работы</label>
                            <md-input type="time" required v-model="pumproom.endTime"></md-input>
                        </md-input-container>

                    </div>-->

                    <div class="error" v-show="message">
                        <md-icon>
                            warning
                        </md-icon>
                        <span class="message">{{message}}</span>
                    </div>

                </md-dialog-content>

                <md-dialog-actions>
                    <md-button class="md-primary" @click.native="closeDialog">Скасувати</md-button>
                    <md-button :disabled="!formValidation" class="md-primary" type="submit">Зберегти</md-button>
                </md-dialog-actions>
            </form>
        </md-dialog>


        <md-dialog-confirm :md-content="confirm.content" :md-ok-text="confirm.ok"
            :md-cancel-text="confirm.cancel" @close="onRemoveClose"
            ref="dialogConfirm">
        </md-dialog-confirm>
    </div>
</template>



<script src="./database.js"></script>
<style lang="less" scoped src="./database.less"></style>