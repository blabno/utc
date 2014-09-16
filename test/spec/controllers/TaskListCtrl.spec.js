describe('TaskListCtrl', function ()
{
    'use strict';
/* global  successfulPromise*/
    var controller;
    var TaskDAOMock;
    var queryResponseA;
    var queryResponseB;

    function createControler($controller)
    {
        controller = $controller('TaskListCtrl', {TaskDAO: TaskDAOMock});
    }

    beforeEach(module('utcApp'));

    beforeEach(function ()
    {
        TaskDAOMock = jasmine.createSpyObj('TaskDAO', ['query', 'remove']);
        queryResponseA = {
            results: [
                {id: 1},
                {id: 2}
            ]
        };
        queryResponseB = {
            results: [
                {id: 3},
                {id: 4}
            ],
            total: 40
        };
        TaskDAOMock.query.andReturn(successfulPromise(queryResponseA));
    });
    describe('constructor', function ()
    {
        beforeEach(inject(function ($controller)
        {
            createControler($controller);
        }));
        it('should load tasks', function ()
        {
            expect(controller.tasks.list).toEqual(queryResponseA.results);
        });
        it('should make isPaginationNeeded return false', function ()
        {
            expect(controller.tasks.isPaginationNeeded()).toBe(false);
        });
        describe('when search query is typed', function ()
        {
            beforeEach(inject(function ($rootScope)
            {
                TaskDAOMock.query.andReturn(successfulPromise(queryResponseB));
                $rootScope.$digest();
                controller.tasks.filter.query = 'abc';
                $rootScope.$digest();
            }));
            it('should reload the results', function ()
            {
                expect(controller.tasks.list).toEqual(queryResponseB.results);
            });
            it('should call DAO with proper filters', function ()
            {
                expect(TaskDAOMock.query).toHaveBeenCalledWith({query: 'abc', size: 5, from: 0 });
            });
        });
        describe('when moving to next page', function ()
        {
            beforeEach(inject(function ($rootScope)
            {
                TaskDAOMock.query.andReturn(successfulPromise(queryResponseB));
                $rootScope.$digest();
                controller.tasks.currentPage = 2;
                $rootScope.$digest();
            }));
            it('should load next results', function ()
            {
                expect(TaskDAOMock.query).toHaveBeenCalledWith({query : null, size : 5, from : 5});
            });
        });

    });
    describe('constructor', function ()
    {
        beforeEach(inject(function ($controller)
        {
            TaskDAOMock.query.andReturn(successfulPromise(queryResponseB));
            createControler($controller);
        }));
        it('should load tasks', function ()
        {
            expect(controller.tasks.list).toEqual(queryResponseB.results);
        });
        it('should make isPaginationNeeded return true', function ()
        {
            expect(controller.tasks.isPaginationNeeded()).toBe(true);
        });
    });
});
