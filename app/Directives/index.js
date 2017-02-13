/**
 * Created by User on 09.02.2017.
 */
import angular from 'angular';
import imagePreloaderDrct from "./imagePreloaderDrct"
import dropzoneDrct from "./dropzoneDrct"

export default angular.module('myApp.directives', [
    imagePreloaderDrct.name,
    dropzoneDrct.name
]);