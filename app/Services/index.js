/**
 * Created by User on 07.02.2017.

import angular from 'angular';
import facebookApiSvc from './facebookApiSvc';

export default angular.module('myApp.services', [
    facebookApiSvc.name
]);
 */
import angular from 'angular';
import facebookApiSvc from "./facebookApiSvc"
export default angular.module('myApp.services', [
    facebookApiSvc.name
]);