// Copyright 2019 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Controller for landing page.
 */

require(
  'components/common-layout-directives/common-elements/' +
  'background-banner.directive.ts');

require('domain/utilities/UrlInterpolationService.ts');
require(
  'pages/landing-pages/topic-landing-page/topic-landing-page.controller.ts');
require('services/PageTitleService.ts');
require('services/SiteAnalyticsService.ts');

require(
  'pages/landing-pages/topic-landing-page/topic-landing-page.constants.ts');

oppia.directive('topicLandingPage', ['UrlInterpolationService', function(
    UrlInterpolationService) {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {},
    templateUrl: UrlInterpolationService.getDirectiveTemplateUrl(
      '/pages/landing-pages/topic-landing-page/' +
      'topic-landing-page.directive.html'),
    controllerAs: '$ctrl',
    controller: [
      '$filter', '$timeout', '$window', 'PageTitleService',
      'SiteAnalyticsService', 'UrlInterpolationService',
      'TOPIC_LANDING_PAGE_DATA',
      function(
          $filter, $timeout, $window, PageTitleService,
          SiteAnalyticsService, UrlInterpolationService,
          TOPIC_LANDING_PAGE_DATA) {
        var ctrl = this;
        var pathArray = $window.location.pathname.split('/');
        ctrl.subject = pathArray[2];
        var topic = pathArray[3];
        var topicData = TOPIC_LANDING_PAGE_DATA[ctrl.subject][topic];
        var landingPageData = topicData.page_data;
        var assetsPathFormat = '/landing/<subject>/<topic>/<file_name>';
        ctrl.topicTitle = topicData.topic_title;
        ctrl.lessons = landingPageData.lessons;
        var pageTitle = 'Learn ' + ctrl.topicTitle + ' - Oppia';
        PageTitleService.setPageTitle(pageTitle);
        ctrl.bookImageUrl = UrlInterpolationService.getStaticImageUrl(
          '/splash/books.svg');

        var getImageData = function(index) {
          var imageKey = 'image_' + index;
          if (landingPageData[imageKey]) {
            var imagePath = UrlInterpolationService.interpolateUrl(
              angular.copy(assetsPathFormat), {
                subject: ctrl.subject,
                topic: topic,
                file_name: landingPageData[imageKey].file_name
              });
            return {
              src: UrlInterpolationService.getStaticImageUrl(imagePath),
              alt: landingPageData[imageKey].alt
            };
          }
        };

        ctrl.image1 = getImageData(1);
        ctrl.image2 = getImageData(2);

        ctrl.getVideoUrl = function() {
          if (landingPageData.video) {
            var videoPath = UrlInterpolationService.interpolateUrl(
              angular.copy(assetsPathFormat), {
                subject: ctrl.subject,
                topic: topic,
                file_name: landingPageData.video
              });
            return UrlInterpolationService.getStaticVideoUrl(videoPath);
          } else {
            throw Error(
              'There is no video data available for this landing page.');
          }
        };

        ctrl.onClickGetStartedButton = function() {
          var collectionId = topicData.collection_id;
          SiteAnalyticsService.registerOpenCollectionFromLandingPageEvent(
            collectionId);
          $timeout(function() {
            $window.location = UrlInterpolationService.interpolateUrl(
              '/collection/<collection_id>', {
                collection_id: collectionId
              });
          }, 150);
        };

        ctrl.onClickLearnMoreButton = function() {
          $timeout(function() {
            $window.location = '/splash';
          }, 150);
        };

        ctrl.onClickExploreLessonsButton = function() {
          $timeout(function() {
            $window.location = '/library';
          }, 150);
        };
      }
    ]};
}]);
