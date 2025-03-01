// Copyright 2016 The Oppia Authors. All Rights Reserved.
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
 * @fileoverview Controllers for the error page.
 */

require('domain/utilities/UrlInterpolationService.ts');
require('services/PageTitleService.ts');

oppia.directive('errorPage', ['UrlInterpolationService', function(
    UrlInterpolationService) {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {},
    templateUrl: UrlInterpolationService.getDirectiveTemplateUrl(
      '/pages/error-pages/error-page.directive.html'),
    controllerAs: '$ctrl',
    controller: [
      'PageTitleService', 'UrlInterpolationService',
      function(
          PageTitleService, UrlInterpolationService) {
        var ctrl = this;
        ctrl.oopsMintImgUrl = UrlInterpolationService.getStaticImageUrl(
          '/general/oops_mint.png');

        ctrl.statusCode = GLOBALS.status_code;

        PageTitleService.setPageTitle('Error ' + ctrl.statusCode + ' - Oppia');
      }
    ]};
}]);
