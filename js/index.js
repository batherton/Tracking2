/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
            window.navigator.geolocation.getCurrentPosition(function(location) {
		        console.log('Location from Phonegap');
		    });
    		var bgGeo = window.plugins.backgroundGeoLocation;

     		var PostLocationToServer = function(response) {
				//alert('PLTS' + response);
	        ////
	        // IMPORTANT:  You must execute the #finish method here to inform the native plugin that you're finished,
	        //  and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
	        // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
	        //
	        //
	        bgGeo.finish();
     		};

     		var callbackFn = function(location) {
				//alert('cbfn'+location);
			    //console.log('[js] BackgroundGeoLocation callback:  ' + location.latitude + ',' + location.longitude);
			        // Do your HTTP request here to POST location to your server.
			        //
			        //
			        	 var http = new XMLHttpRequest();
						 var url = "http://www.loadstatus.com/Tracking/";
						 var params = "DeviceID=1";
						 //var params = params+"&UserName="+document.getElementById('UserName').value;
						 //var params = params+"&Password="+document.getElementById('Password').value;
						 var params = params+"&Longitude="+location.latitude;
						 var params = params+"&Latitude="+location.longitude;
						 http.open("POST", url, true);
						 http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						 http.setRequestHeader("Content-length", params.length);
						 http.setRequestHeader("Connection", "close");
						 http.onreadystatechange = function() {
						    if(http.readyState == 4) {

			        	    }
						 }
						 http.send(params);







			    PostLocationToServer.call(this);
			    };

			    var failureFn = function(error) {
			        console.log('BackgroundGeoLocation error');
   				}


    			// BackgroundGeoLocation is highly configurable.
    			bgGeo.configure(callbackFn, failureFn, {
      			  url: 'http://www.loadstatus.com/Tracking/', // <-- Android ONLY:  your server url to send locations to
      			  params: {
       			     auth_token: 'user_secret_auth_token',    //  <-- Android ONLY:  HTTP POST params sent to your server when persisting locations.
       			     foo: 'bar'                              //  <-- Android ONLY:  HTTP POST params sent to your server when persisting locations.
        		 },
        		headers: {                                   // <-- Android ONLY:  Optional HTTP headers sent to your configured #url when persisting locations
       		     "X-Foo": "BAR"
       			 },
        		 desiredAccuracy: 10,
       			 stationaryRadius: 20,
       			 distanceFilter: 30,
       			 notificationTitle: 'Background tracking', // <-- android only, customize the title of the notification
       			 notificationText: 'ENABLED', // <-- android only, customize the text of the notification
       			 activityType: 'AutomotiveNavigation',
       			 debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
       			 stopOnTerminate: false // <-- enable this to clear background location settings when the app terminates
    			});

    			// Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
    			bgGeo.start();

    			// If you wish to turn OFF background-tracking, call the #stop method.
    			// bgGeo.stop()



    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
