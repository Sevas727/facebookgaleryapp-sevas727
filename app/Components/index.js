/**
 * Created by User on 07.02.2017.
 */
import angular from 'angular';
import auth from './auth/auth';
import albums from './albums/albums';
import album from './album/album';
import photo from './photo/photo';
import upload from './upload/upload';
import menu from './menu/menu';

export default angular.module('myApp.components', [
    auth.name,
    albums.name,
    album.name,
    photo.name,
    upload.name,
    menu.name
]);