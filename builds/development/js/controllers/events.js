myApp.controller('EventsController',
  ['$scope', '$rootScope','$firebaseAuth', '$firebaseArray',
  function($scope, $rootScope, $firebaseAuth, $firebaseArray) {
    //var i;

    var ref = firebase.database().ref();
    var auth = $firebaseAuth();

    auth.$onAuthStateChanged(function(authUser) {
      if(authUser) {
        var eventsRef = ref.child('users').child(authUser.uid).child('events');
        var eventsInfo = $firebaseArray(eventsRef);

        //console.log(authUser);

        $scope.events = eventsInfo;

        eventsInfo.$loaded().then(function(data) {
          $rootScope.howManyEvents = eventsInfo.length;
         //console.log($rootScope.howManyEvents);
        }); // make sure event data is loaded

        eventsInfo.$watch(function(data) {
          $rootScope.howManyEvents = eventsInfo.length;
        });

        $scope.addEvent = function() {

    //for (i = 0; i < 5000; i++) {
         //
      // console.log(i);

          eventsInfo.$add({
            name: $scope.eventname,
            date: firebase.database.ServerValue.TIMESTAMP

          }).then(function() {
           // $scope.eventname='';
          }); //promise
        } //addEvent
       // }
        $scope.deleteEvent = function(key) {
          eventsInfo.$remove(key);
        } //deleteEvent

      } //authUser
    }); //onAuthStateChanged
}]); //myApp.controller