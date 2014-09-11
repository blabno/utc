/**
 * Created by piniu on 11.09.14.
 */
(function () {
    'use strict';

    function ConfirmAction($modal, $scope) {
        return {
            open: function (headerText, confirmText) {
                $scope.header = headerText;
                $scope.text = confirmText;
                var modalInstance = $modal.open({
                    templateUrl: 'views/dialogConfirm.html'
                });
                return modalInstance;

            }
        };
    }

    angular.module('utcApp').factory('ConfirmAction', ['$modal', '$rootScope', ConfirmAction]);
})();
