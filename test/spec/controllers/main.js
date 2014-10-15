'use strict';

describe('Test to print out jasmine version', function () {
    it('prints jasmine version', function () {
        console.log('jasmine-version:' + jasmine.getEnv().versionString());
    });
});

describe('Controller: MainCtrl', function () {

    // load the controller's module
    //beforeEach(module('elevationContestApp'));
    beforeEach(module('elevationContestApp'));

    var MainCtrl,
        scope,
        $httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;

        $httpBackend.expectGET('data/topten.json').
         respond([{ name: 'user1', elevation: '123' }, { name: 'user2', elevation: '223' }]);

        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', { $scope: scope });

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

});


describe('Service: mainService', function () {
    // load the controller's module
    beforeEach(module('elevationContestApp'));

    var service;

    beforeEach(inject(function (mainService) {
       //var MainService = mainService;
        // service = new MainService();
        service = mainService;

        spyOn(service, 'getTopTenList');

    }));


    it('should not be undefined', function () {

        expect(service).not.toBeUndefined();

    });

    it('should call getTopTenList', function () {
        service.getTopTenList();
        expect(service.getTopTenList).toHaveBeenCalled();
    });

    //xit('should return promise when called getTopTenList', function () {
    //    var promise = service.getTopTenList();

    //    expect(promise).not.toBeUndefined();
    //});


    it('should have one item after saving', function () {
        var newItem = {
            'position': '2',
            'name': 'user2',
            'elevation': '200',
            'coords': {
                'latitude': '40',
                'longitude': '-53'
            }
        };
        var items = service.updateTopTenList(newItem);
        expect(items.length).toEqual(1);
    });

});