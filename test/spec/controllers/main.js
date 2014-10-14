'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('elevationContestApp'));

    var MainCtrl,
        MainService,
      scope,
        $httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller, _mainService) {
        $httpBackend = _$httpBackend_;

        $httpBackend.expectGET('data/topten.json').
         respond([{ name: 'user1', elevation: '123' }, { name: 'user2', elevation: '223' }]);

        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', { $scope: scope });
        MainService = _mainService;
    }));

    it('should attach a list of top ten evevations to the scope', function () {
        expect(scope.topten).toBeUndefined();
        $httpBackend.flush();

        expect(scope.topten).toEqual([{ name: 'user1', elevation: '123' },
                                      { name: 'user2', elevation: '223' }]);
    });
    it('should have two items', function () {
        expect(scope.topten).toBeUndefined();
        $httpBackend.flush();

        expect(scope.topten.length).toEqual(2);
    });

    it('should return rank 2', function () {
        


    });
});
