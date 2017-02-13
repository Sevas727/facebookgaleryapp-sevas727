/**
 * Created by Seva on 13.08.2016.
 */
import Dropzone from "dropzone";

export default angular.module('dropzoneDrct', [])

    .directive('dropzone', function () {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                var config = {
                    url: 'http://facebookgaleryapp-sevas727.rhcloud.com/upload',
                    paramName: "files",
                    maxFilesize: 3.0,
                    maxFiles: 10,
                    parallelUploads: 10,
                    uploadMultiple: true,
                    autoProcessQueue: true,
                    dictDefaultMessage: "Drop files here or <span class='browse'>browse</span> to upload"
                };

                var eventHandlers = {
                    'sending': function(file, xhr, formData) {
                        
                        if(!scope.currentAlbum) {

                            document.getElementById('album-select').style.border = "1px solid red";
                            setTimeout(function(){
                                document.getElementById('album-select').style.border = "1px solid #ccc";
                            }, 2000);

                            dropzone.disable();
                            dropzone.enable();

                        } else {

                            //     dropzone.enable();


                            formData.append("albumID", scope.currentAlbum); // Append all the additional input data of your form here!
                            formData.append("access_token", sessionStorage.access_token); // Append all the additional input data of your form here!

                        }
                    }
                };

                dropzone = new Dropzone(element[0], config);

                angular.forEach(eventHandlers, function(handler, event) {
                    dropzone.on(event, handler);
                });
            }
        };
    });
