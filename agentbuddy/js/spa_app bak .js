'use strict';


var agentApp = angular.module('agentApp', [
    'ui.bootstrap',
    'ui.utils',
    'agentDirectives',
    'agentControllers',
    'agentTemplateFilters',
    'agentServices'
]);

var agentDirectives = angular.module('agentDirectives', []).
    directive('ngEmailSection', function($compile) {
        return {
            restrict: 'C',
            require: '^ngModel',
            replace: true,
            scope: {
                ngModel: '='
            },
            link: function(scope, element, attrs) {
                element.html('<pre>' + scope.ngModel.template.Body__c + '</pre>').show();
                var templateFields = scope.ngModel.templateFields;
                var inputs = element.find('input');
                for (var i = 0; i < inputs.length; i++) {
                    var code = templateFields[i].Code__c;
                    var value = scope.$parent.skills[scope.$parent.activeSkill].parametersMap[code].value;
                    if (value == undefined || value == '') {
                        $(inputs[i]).focus();
                        break;
                    }
                }
                $compile(element.contents())(scope);
            }
        }
    });

angular.module('agentTemplateFilters', []).
    filter('emailFilter', function() {
        return function(templates) {
            var filtered = [];
            angular.forEach(templates, function(template) {
                if(template.template.IsEmailSection__c) {
                    filtered.push(template);
                }
            });
            return filtered;
        };
    })
    .filter('resolutionFilter', function() {
        return function(templates) {
            var filtered = [];
            angular.forEach(templates, function(template) {
                if(!template.template.IsEmailSection__c) {
                        filtered.push(template);
                }
            });
            return filtered;
        };
    });

angular.module('agentServices', [])
    .factory('Skills', function() {
        return getSkills();

    function getSkills() {
        //var js = '{"PSM":[{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SKtIAM"},"Name":"Sample Template","SkillGroup__c":"a3iL00000008W2AIAU","IsEmailSection__c":false,"Id":"a3kL00000004SKtIAM","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W2AIAU"},"Name":"PSM","Id":"a3iL00000008W2AIAU"},"Body__c":"Blah blah blah"}}],"Red Care":[{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJTIA2"},"Name":"Call Barring Activated","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJTIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Your call barring will be activated in the next 30 days. Please make sure you agree to the terms and conditions of your contract."}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJQIA2"},"Name":"Call Barring Deactivated","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJQIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Your call barring will be deactivated at the end of this month. Please ensure all relevant accounts are also closed."}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJPIA2"},"Name":"International Roaming","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJPIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Your service for international roaming will be added to your existing account"}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJNIA2"},"Name":"4G Service Outage","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJNIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"We are experiencing a service outage with our 4G network. Please be patient while we resolve this."}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJOIA2"},"Name":"Upgrade Your Number","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJOIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"The customer wishes to upgrade their number from Optus. Make sure to ask for their PIN to unlock."}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJVIA2"},"Name":"Hot Offers","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJVIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Inform customer of our recent campaigns and hot offers"}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJUIA2"},"Name":"Transfer Contacts","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJUIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Transfer the customers address phone contacts over from another carrier."}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJRIA2"},"Name":"Identify Internet Issues","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJRIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Identify with customer their internet usage and bandwidth issues"}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJSIA2"},"Name":"Inform Flagfall","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJSIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Inform the customer of our flagfall pricing and charges"}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJMIA2"},"Name":"Resolve Customer Complaint","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJMIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Resolve the customer complaint with our service"}},{"templateFields":[{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JjvIAE"},"Name":"Number","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SQVIA2"},"Name":"Header","Id":"a3kL00000004SQVIA2"},"RecordType__c":"Number","Template__c":"a3kL00000004SQVIA2","Id":"a3mL00000004JjvIAE","Code__c":"Number"},{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JbkIAE"},"Name":"Name","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SQVIA2"},"Name":"Header","Id":"a3kL00000004SQVIA2"},"RecordType__c":"Text","Template__c":"a3kL00000004SQVIA2","Id":"a3mL00000004JbkIAE","Code__c":"Name"},{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JbfIAE"},"Name":"BillingAccountNumber","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SQVIA2"},"Name":"Header","Id":"a3kL00000004SQVIA2"},"RecordType__c":"Number","Template__c":"a3kL00000004SQVIA2","Id":"a3mL00000004JbfIAE","Code__c":"BillingAccountNumber"}],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SQVIA2"},"Name":"Header","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":true,"Id":"a3kL00000004SQVIA2","Emails__c":"Send Invoice","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Here’s the invoice you requested\\r\\n\\r\\nHi {!Name}\\r\\n\\r\\nInvoice Attached\\r\\nI have attached the invoice(s) you’ve requested. \\r\\n\\r\\nPlease find attached Invoice {!Number} for account {!BillingAccountNumber}"}},{"templateFields":[{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JbaIAE"},"Name":"Name","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SQaIAM"},"Name":"Footer","Id":"a3kL00000004SQaIAM"},"RecordType__c":"Text","Template__c":"a3kL00000004SQaIAM","Id":"a3mL00000004JbaIAE","Code__c":"Name"}],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SQaIAM"},"Name":"Footer","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":true,"Id":"a3kL00000004SQaIAM","Emails__c":"Send Invoice;Terminate Customer","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Thanks for your time {!Name}. \\r\\n\\r\\nAll the best,\\r\\n\\r\\nGavin"}},{"templateFields":[{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JkIIAU"},"Name":"BillingAccountNumber","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWdIAM"},"Name":"Credit Applied To Your Account","Id":"a3kL00000004SWdIAM"},"RecordType__c":"Number","Template__c":"a3kL00000004SWdIAM","Id":"a3mL00000004JkIIAU","Code__c":"BillingAccountNumber"},{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JkNIAU"},"Name":"CreditAmount","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWdIAM"},"Name":"Credit Applied To Your Account","Id":"a3kL00000004SWdIAM"},"RecordType__c":"Currency","Template__c":"a3kL00000004SWdIAM","Id":"a3mL00000004JkNIAU","Code__c":"CreditAmount"}],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWdIAM"},"Name":"Credit Applied To Your Account","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":true,"Id":"a3kL00000004SWdIAM","Emails__c":"Send Invoice;Send Contract Email","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Credit applied to your account \\r\\nAs discussed I have applied a credit of {!CreditAmount} to your account {!BillingAccountNumber}. The credit will appear on your next invoice."}},{"templateFields":[{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JkSIAU"},"Name":"BillingAccountNumber","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWiIAM"},"Name":"Payment Taken","Id":"a3kL00000004SWiIAM"},"RecordType__c":"Number","Template__c":"a3kL00000004SWiIAM","Id":"a3mL00000004JkSIAU","Code__c":"BillingAccountNumber"},{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JkXIAU"},"Name":"Amount","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWiIAM"},"Name":"Payment Taken","Id":"a3kL00000004SWiIAM"},"RecordType__c":"Currency","Template__c":"a3kL00000004SWiIAM","Id":"a3mL00000004JkXIAU","Code__c":"Amount"}],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWiIAM"},"Name":"Payment Taken","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":true,"Id":"a3kL00000004SWiIAM","Emails__c":"Send Contract Email","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Payment Taken \\r\\nThis is confirmation that i have processed a payment of {!Amount} on your account {!BillingAccountNumber}. This payment will appear on your next invoice."}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWnIAM"},"Name":"Accessing your bills is easy","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":true,"Id":"a3kL00000004SWnIAM","Emails__c":"Send Invoice;Send Contract Email","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Accessing your bills is easy\\r\\nIf you jump onto the Vodafone website you’ll find our online billing service. This has great self-serve options, including your payment history. If you’re already registered, just click on www.myvodafone.com.au\\r\\n\\r\\nIf you\'re not signed up for online billing yet, you can do it easily using this link: http://support.vodafone.com.au/articles/FAQ/Register-for-My-Vodafone \\r\\n\\r\\nOnce you’ve logged in, look for the \'Bill and payment\' section and select \'View your bills\'.\\r\\n\\r\\nIf you’d like some more detail about how to view your payment history online, this article tells you everything you need to know: http://support.vodafone.com.au/articles/FAQ/How-to-view-your-payment-history-online"}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWsIAM"},"Name":"The My Vodafone app","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":true,"Id":"a3kL00000004SWsIAM","Emails__c":"Send Invoice","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"The My Vodafone app\\r\\nThis clever app lets you check your use and details on the go. It will also help you find your nearest Vodafone store, check for network updates in your area, view your recent bills if you\'re on a plan, or recharge if you\'re on prepaid. To view your use or recharge, you just need to register with My Vodafone first. \\r\\n\\r\\nThe good news is that Vodafone Android™ phones come with the app preloaded – keep an eye out for it in the Updates icon on your homescreen."}}]}';
        //var js = '[{"templateWrappers":[{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJTIA2"},"Name":"Call Barring Activated","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJTIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Your call barring will be activated in the next 30 days. Please make sure you agree to the terms and conditions of your contract."}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJQIA2"},"Name":"Call Barring Deactivated","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJQIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Your call barring will be deactivated at the end of this month. Please ensure all relevant accounts are also closed."}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJPIA2"},"Name":"International Roaming","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJPIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Your service for international roaming will be added to your existing account"}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJNIA2"},"Name":"4G Service Outage","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJNIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"We are experiencing a service outage with our 4G network. Please be patient while we resolve this."}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJOIA2"},"Name":"Upgrade Your Number","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJOIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"The customer wishes to upgrade their number from Optus. Make sure to ask for their PIN to unlock."}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJVIA2"},"Name":"Hot Offers","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJVIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Inform customer of our recent campaigns and hot offers"}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJUIA2"},"Name":"Transfer Contacts","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJUIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Transfer the customers address phone contacts over from another carrier."}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJRIA2"},"Name":"Identify Internet Issues","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJRIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Identify with customer their internet usage and bandwidth issues"}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJSIA2"},"Name":"Inform Flagfall","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJSIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Inform the customer of our flagfall pricing and charges"}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJMIA2"},"Name":"Resolve Customer Complaint","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJMIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Resolve the customer complaint with our service"}},{"templateFields":[{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JjvIAE"},"Name":"Number","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SQVIA2"},"Name":"Header","Id":"a3kL00000004SQVIA2"},"RecordType__c":"Number","Template__c":"a3kL00000004SQVIA2","Id":"a3mL00000004JjvIAE","Code__c":"Number"},{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JbkIAE"},"Name":"Name","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SQVIA2"},"Name":"Header","Id":"a3kL00000004SQVIA2"},"RecordType__c":"Text","Template__c":"a3kL00000004SQVIA2","Id":"a3mL00000004JbkIAE","Code__c":"Name"},{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JbfIAE"},"Name":"BillingAccountNumber","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SQVIA2"},"Name":"Header","Id":"a3kL00000004SQVIA2"},"RecordType__c":"Number","Template__c":"a3kL00000004SQVIA2","Id":"a3mL00000004JbfIAE","Code__c":"BillingAccountNumber"}],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SQVIA2"},"Name":"Header","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":true,"Id":"a3kL00000004SQVIA2","Emails__c":"Send Invoice","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Here’s the invoice you requested\\r\\n\\r\\nHi {!Name}\\r\\n\\r\\nInvoice Attached\\r\\nI have attached the invoice(s) you’ve requested. \\r\\n\\r\\nPlease find attached Invoice {!Number} for account {!BillingAccountNumber}"}},{"templateFields":[{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JbaIAE"},"Name":"Name","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SQaIAM"},"Name":"Footer","Id":"a3kL00000004SQaIAM"},"RecordType__c":"Text","Template__c":"a3kL00000004SQaIAM","Id":"a3mL00000004JbaIAE","Code__c":"Name"}],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SQaIAM"},"Name":"Footer","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":true,"Id":"a3kL00000004SQaIAM","Emails__c":"Send Invoice;Terminate Customer","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Thanks for your time {!Name}. \\r\\n\\r\\nAll the best,\\r\\n\\r\\nGavin"}},{"templateFields":[{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JkIIAU"},"Name":"BillingAccountNumber","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWdIAM"},"Name":"Credit Applied To Your Account","Id":"a3kL00000004SWdIAM"},"RecordType__c":"Number","Template__c":"a3kL00000004SWdIAM","Id":"a3mL00000004JkIIAU","Code__c":"BillingAccountNumber"},{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JkNIAU"},"Name":"CreditAmount","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWdIAM"},"Name":"Credit Applied To Your Account","Id":"a3kL00000004SWdIAM"},"RecordType__c":"Currency","Template__c":"a3kL00000004SWdIAM","Id":"a3mL00000004JkNIAU","Code__c":"CreditAmount"}],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWdIAM"},"Name":"Credit Applied To Your Account","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":true,"Id":"a3kL00000004SWdIAM","Emails__c":"Send Invoice;Send Contract Email","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Credit applied to your account \\r\\nAs discussed I have applied a credit of {!CreditAmount} to your account {!BillingAccountNumber}. The credit will appear on your next invoice."}},{"templateFields":[{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JkSIAU"},"Name":"BillingAccountNumber","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWiIAM"},"Name":"Payment Taken","Id":"a3kL00000004SWiIAM"},"RecordType__c":"Number","Template__c":"a3kL00000004SWiIAM","Id":"a3mL00000004JkSIAU","Code__c":"BillingAccountNumber"},{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JkXIAU"},"Name":"Amount","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWiIAM"},"Name":"Payment Taken","Id":"a3kL00000004SWiIAM"},"RecordType__c":"Currency","Template__c":"a3kL00000004SWiIAM","Id":"a3mL00000004JkXIAU","Code__c":"Amount"}],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWiIAM"},"Name":"Payment Taken","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":true,"Id":"a3kL00000004SWiIAM","Emails__c":"Send Contract Email","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Payment Taken \\r\\nThis is confirmation that i have processed a payment of {!Amount} on your account {!BillingAccountNumber}. This payment will appear on your next invoice."}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWnIAM"},"Name":"Accessing your bills is easy","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":true,"Id":"a3kL00000004SWnIAM","Emails__c":"Send Invoice;Send Contract Email","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Accessing your bills is easy\\r\\nIf you jump onto the Vodafone website you’ll find our online billing service. This has great self-serve options, including your payment history. If you’re already registered, just click on www.myvodafone.com.au\\r\\n\\r\\nIf you\'re not signed up for online billing yet, you can do it easily using this link: http://support.vodafone.com.au/articles/FAQ/Register-for-My-Vodafone \\r\\n\\r\\nOnce you’ve logged in, look for the \'Bill and payment\' section and select \'View your bills\'.\\r\\n\\r\\nIf you’d like some more detail about how to view your payment history online, this article tells you everything you need to know: http://support.vodafone.com.au/articles/FAQ/How-to-view-your-payment-history-online"}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWsIAM"},"Name":"The My Vodafone app","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":true,"Id":"a3kL00000004SWsIAM","Emails__c":"Send Invoice","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"The My Vodafone app\\r\\nThis clever app lets you check your use and details on the go. It will also help you find your nearest Vodafone store, check for network updates in your area, view your recent bills if you\'re on a plan, or recharge if you\'re on prepaid. To view your use or recharge, you just need to register with My Vodafone first. \\r\\n\\r\\nThe good news is that Vodafone Android™ phones come with the app preloaded – keep an eye out for it in the Updates icon on your homescreen."}}],"skillGroupName":"Red Care","emailFrom":"support@vodafone.com.au"},{"templateWrappers":[{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SKtIAM"},"Name":"Sample Template","SkillGroup__c":"a3iL00000008W2AIAU","IsEmailSection__c":false,"Id":"a3kL00000004SKtIAM","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W2AIAU"},"Name":"PSM","Id":"a3iL00000008W2AIAU"},"Body__c":"Blah blah blah"}}],"skillGroupName":"PSM","emailFrom":"psm@vodafone.com.au"}]';
        var js = '[{"templateWrappers":[{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004Si5IAE"},"Name":"How to be a guru","SkillGroup__c":"a3iL00000008WacIAE","IsEmailSection__c":false,"Id":"a3kL00000004Si5IAE","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008WacIAE"},"Name":"TestSKillGroup","Id":"a3iL00000008WacIAE"},"Body__c":"There is no spoon."}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SiAIAU"},"Name":"We are the champions","SkillGroup__c":"a3iL00000008WacIAE","IsEmailSection__c":false,"Id":"a3kL00000004SiAIAU","Emails__c":"Send Contract Email","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008WacIAE"},"Name":"TestSKillGroup","Id":"a3iL00000008WacIAE"},"Body__c":"Once upon a time blah blah"}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SiFIAU"},"Name":"Header Promotion Email","SkillGroup__c":"a3iL00000008WacIAE","IsEmailSection__c":true,"Id":"a3kL00000004SiFIAU","Emails__c":"Send Invoice","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008WacIAE"},"Name":"TestSKillGroup","Id":"a3iL00000008WacIAE"},"Body__c":"Your Promotion has been approved."}},{"templateFields":[{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JzkIAE"},"Name":"Name","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SiKIAU"},"Name":"Get your player stats","Id":"a3kL00000004SiKIAU"},"RecordType__c":"Text","Template__c":"a3kL00000004SiKIAU","Id":"a3mL00000004JzkIAE","Code__c":"Name"},{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JzpIAE"},"Name":"TotalAmount","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SiKIAU"},"Name":"Get your player stats","Id":"a3kL00000004SiKIAU"},"RecordType__c":"Currency","Template__c":"a3kL00000004SiKIAU","Id":"a3mL00000004JzpIAE","Code__c":"TotalAmount"},{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JzfIAE"},"Name":"PlayerNumber","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SiKIAU"},"Name":"Get your player stats","Id":"a3kL00000004SiKIAU"},"RecordType__c":"Number","Template__c":"a3kL00000004SiKIAU","Id":"a3mL00000004JzfIAE","Code__c":"PlayerNumber"},{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JzaIAE"},"Name":"PlayerName","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SiKIAU"},"Name":"Get your player stats","Id":"a3kL00000004SiKIAU"},"RecordType__c":"Text","Template__c":"a3kL00000004SiKIAU","Id":"a3mL00000004JzaIAE","Code__c":"PlayerName"}],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SiKIAU"},"Name":"Get your player stats","SkillGroup__c":"a3iL00000008WacIAE","IsEmailSection__c":true,"Id":"a3kL00000004SiKIAU","Emails__c":"Send Contract Email;Test Promotion Email","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008WacIAE"},"Name":"TestSKillGroup","Id":"a3iL00000008WacIAE"},"Body__c":"Log in to the website for {!PlayerName} and join the clan. Your playernumber is {!PlayerNumber} and Name is {!Name}\\r\\n\\r\\nEnter for a total dollar amount of : {!TotalAmount}"}}],"skillGroupName":"TestSKillGroup","emailFrom":"test@test.com"},{"templateWrappers":[{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJTIA2"},"Name":"Call Barring Activated","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJTIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Your call barring will be activated in the next 30 days. Please make sure you agree to the terms and conditions of your contract."}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJQIA2"},"Name":"Call Barring Deactivated","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJQIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Your call barring will be deactivated at the end of this month. Please ensure all relevant accounts are also closed."}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJPIA2"},"Name":"International Roaming","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJPIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Your service for international roaming will be added to your existing account"}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJNIA2"},"Name":"4G Service Outage","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJNIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"We are experiencing a service outage with our 4G network. Please be patient while we resolve this."}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJOIA2"},"Name":"Upgrade Your Number","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJOIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"The customer wishes to upgrade their number from Optus. Make sure to ask for their PIN to unlock."}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJVIA2"},"Name":"Hot Offers","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJVIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Inform customer of our recent campaigns and hot offers"}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJUIA2"},"Name":"Transfer Contacts","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJUIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Transfer the customers address phone contacts over from another carrier."}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJRIA2"},"Name":"Identify Internet Issues","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJRIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Identify with customer their internet usage and bandwidth issues"}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJSIA2"},"Name":"Inform Flagfall","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJSIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Inform the customer of our flagfall pricing and charges"}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SJMIA2"},"Name":"Resolve Customer Complaint","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":false,"Id":"a3kL00000004SJMIA2","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Resolve the customer complaint with our service"}},{"templateFields":[{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JjvIAE"},"Name":"Number","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SQVIA2"},"Name":"Header","Id":"a3kL00000004SQVIA2"},"RecordType__c":"Number","Template__c":"a3kL00000004SQVIA2","Id":"a3mL00000004JjvIAE","Code__c":"Number"},{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JbkIAE"},"Name":"Name","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SQVIA2"},"Name":"Header","Id":"a3kL00000004SQVIA2"},"RecordType__c":"Text","Template__c":"a3kL00000004SQVIA2","Id":"a3mL00000004JbkIAE","Code__c":"Name"},{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JbfIAE"},"Name":"BillingAccountNumber","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SQVIA2"},"Name":"Header","Id":"a3kL00000004SQVIA2"},"RecordType__c":"Number","Template__c":"a3kL00000004SQVIA2","Id":"a3mL00000004JbfIAE","Code__c":"BillingAccountNumber"}],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SQVIA2"},"Name":"Header","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":true,"Id":"a3kL00000004SQVIA2","Emails__c":"Send Invoice","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Here’s the invoice you requested\\r\\n\\r\\nHi {!Name}\\r\\n\\r\\nInvoice Attached\\r\\nI have attached the invoice(s) you’ve requested. \\r\\n\\r\\nPlease find attached Invoice {!Number} for account {!BillingAccountNumber}"}},{"templateFields":[{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JbaIAE"},"Name":"Name","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SQaIAM"},"Name":"Footer","Id":"a3kL00000004SQaIAM"},"RecordType__c":"Text","Template__c":"a3kL00000004SQaIAM","Id":"a3mL00000004JbaIAE","Code__c":"Name"}],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SQaIAM"},"Name":"Footer","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":true,"Id":"a3kL00000004SQaIAM","Emails__c":"Send Invoice;Terminate Customer","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Thanks for your time {!Name}. \\r\\n\\r\\nAll the best,\\r\\n\\r\\nGavin"}},{"templateFields":[{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JkIIAU"},"Name":"BillingAccountNumber","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWdIAM"},"Name":"Credit Applied To Your Account","Id":"a3kL00000004SWdIAM"},"RecordType__c":"Number","Template__c":"a3kL00000004SWdIAM","Id":"a3mL00000004JkIIAU","Code__c":"BillingAccountNumber"},{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JkNIAU"},"Name":"CreditAmount","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWdIAM"},"Name":"Credit Applied To Your Account","Id":"a3kL00000004SWdIAM"},"RecordType__c":"Currency","Template__c":"a3kL00000004SWdIAM","Id":"a3mL00000004JkNIAU","Code__c":"CreditAmount"}],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWdIAM"},"Name":"Credit Applied To Your Account","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":true,"Id":"a3kL00000004SWdIAM","Emails__c":"Send Invoice;Send Contract Email","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Credit applied to your account \\r\\nAs discussed I have applied a credit of {!CreditAmount} to your account {!BillingAccountNumber}. The credit will appear on your next invoice."}},{"templateFields":[{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JkSIAU"},"Name":"BillingAccountNumber","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWiIAM"},"Name":"Payment Taken","Id":"a3kL00000004SWiIAM"},"RecordType__c":"Number","Template__c":"a3kL00000004SWiIAM","Id":"a3mL00000004JkSIAU","Code__c":"BillingAccountNumber"},{"attributes":{"type":"AgentTemplateField__c","url":"/services/data/v29.0/sobjects/AgentTemplateField__c/a3mL00000004JkXIAU"},"Name":"Amount","Template__r":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWiIAM"},"Name":"Payment Taken","Id":"a3kL00000004SWiIAM"},"RecordType__c":"Currency","Template__c":"a3kL00000004SWiIAM","Id":"a3mL00000004JkXIAU","Code__c":"Amount"}],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWiIAM"},"Name":"Payment Taken","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":true,"Id":"a3kL00000004SWiIAM","Emails__c":"Send Contract Email","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Payment Taken \\r\\nThis is confirmation that i have processed a payment of {!Amount} on your account {!BillingAccountNumber}. This payment will appear on your next invoice."}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWnIAM"},"Name":"Accessing your bills is easy","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":true,"Id":"a3kL00000004SWnIAM","Emails__c":"Send Invoice;Send Contract Email","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"Accessing your bills is easy\\r\\nIf you jump onto the Vodafone website you’ll find our online billing service. This has great self-serve options, including your payment history. If you’re already registered, just click on www.myvodafone.com.au\\r\\n\\r\\nIf you\'re not signed up for online billing yet, you can do it easily using this link: http://support.vodafone.com.au/articles/FAQ/Register-for-My-Vodafone \\r\\n\\r\\nOnce you’ve logged in, look for the \'Bill and payment\' section and select \'View your bills\'.\\r\\n\\r\\nIf you’d like some more detail about how to view your payment history online, this article tells you everything you need to know: http://support.vodafone.com.au/articles/FAQ/How-to-view-your-payment-history-online"}},{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SWsIAM"},"Name":"The My Vodafone app","SkillGroup__c":"a3iL00000008W25IAE","IsEmailSection__c":true,"Id":"a3kL00000004SWsIAM","Emails__c":"Send Invoice","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W25IAE"},"Name":"Red Care","Id":"a3iL00000008W25IAE"},"Body__c":"The My Vodafone app\\r\\nThis clever app lets you check your use and details on the go. It will also help you find your nearest Vodafone store, check for network updates in your area, view your recent bills if you\'re on a plan, or recharge if you\'re on prepaid. To view your use or recharge, you just need to register with My Vodafone first. \\r\\n\\r\\nThe good news is that Vodafone Android™ phones come with the app preloaded – keep an eye out for it in the Updates icon on your homescreen."}}],"skillGroupName":"Red Care","emailFrom":"support@vodafone.com.au"},{"templateWrappers":[{"templateFields":[],"template":{"attributes":{"type":"AgentTemplate__c","url":"/services/data/v29.0/sobjects/AgentTemplate__c/a3kL00000004SKtIAM"},"Name":"Sample Template","SkillGroup__c":"a3iL00000008W2AIAU","IsEmailSection__c":false,"Id":"a3kL00000004SKtIAM","SkillGroup__r":{"attributes":{"type":"SkillGroup__c","url":"/services/data/v29.0/sobjects/SkillGroup__c/a3iL00000008W2AIAU"},"Name":"PSM","Id":"a3iL00000008W2AIAU"},"Body__c":"Blah blah blah"}}],"skillGroupName":"PSM","emailFrom":"psm@vodafone.com.au"}]';

/*
        function addslashes( str ) {
            return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
        }
        js = addslashes(js);
*/
        var skillGroupWrappers = JSON.parse(js);
        var skills = [ ];
        skillGroupWrappers.forEach(function(group) {
            var skill = {
                    name: group.skillGroupName,
                    email: group.emailFrom,
                    templates: group.templateWrappers,
                    cols: []
            };
            var resolutionTemplates = [],
                emailTemplates = [];
            for (var i = 0; i < group.templateWrappers.length; i++) {
                var templateWrapper = group.templateWrappers[i];
                if (templateWrapper.template.IsEmailSection__c) {
                    emailTemplates.push(templateWrapper.template);
                } else {
                    resolutionTemplates.push(templateWrapper.template);
                }
            }
            group.resolutionTemplates = resolutionTemplates;
            group.emailTemplates = emailTemplates;
            group.resolutionTemplatesCols = splitCols(resolutionTemplates);
            group.emailTemplatesCols = splitCols(emailTemplates);
            skills[skills.length] = group;

            function splitCols(templates) {
                var cols = [];
                var split = (templates.length / 2) + (templates.length % 2 == 0 ? 0 : 1);
                cols[0] = templates.slice(0, split);
                cols[1] = templates.slice(split);
                return cols;
            }
        });

        return skills;
    }
});

angular.module('agentControllers', [])
    .controller('TemplatesListCtrl', ['$scope', 'Skills',
        function($scope, Skills) {
            $scope.skills = Skills;
            $scope.activeSkill = 0;

            $scope.skills.forEach(function(skill) {

                skill.addedEmailSections = [];
                skill.templateEmails = [];
                skill.parametersMap = {};
                skill.bodytxt = '';
                skill.mode = 'resolution';
                skill.toggleMode = function(mode) {
                    skill.mode = mode;
                }
                skill.templates.forEach(function(template) {
                    var templateFields = template.templateFields;
                    orderTemplateFields(template);
                    templateFields.forEach(function(field) {
                        if (!(field.Code__c in skill.parametersMap)) {
                            skill.parametersMap[field.Code__c] = field;
                        }
                        var fieldVal, code;
                        fieldVal = '<input type="text" ng-model="$parent.skills[$parent.activeSkill].parametersMap[\'' +
                            field.Code__c + '\'].value" placeholder="' +
                            field.Code__c + '" ' +
                            'ui-keypress="{13:\'$parent.skills[$parent.activeSkill].enterKeyCallback($event)\'}" ' +
                            'ng-keyup="$parent.skills[$parent.activeSkill].resizeInput($event)" size="' + field.Code__c.length + '"/>';
                        code = '{!' + field.Code__c + '}';
                        template.template.Body__c = template.template.Body__c.replaceAll(code, fieldVal);
                    }); // forEach templateFields
                    if (template.template.IsEmailSection__c) {
                        var templateEmails = template.template.Emails__c.split(";");
                        templateEmails.forEach(function(email) {
                            skill.templateEmails.push(email);
                        }); // forEach templateEmails
                        skill.templateEmails = $.unique(skill.templateEmails);
                    }
                }); // forEach template


                skill.enterKeyCallback = function ($event) {
                    var target = $event.target;
                    var focusable = $(".bodyHtml").find('input').filter(':visible');
                    var next = focusable.eq(focusable.index(target)+1);
                    if (next.length) {
                        next.focus();
                    } else {
                        next = focusable.eq(focusable.index(0));
                        next.focus();
                    }
                    $event.preventDefault();
                };

                skill.updateFocus = function(template) {
                    var templateFields = template.templateFields;
                    var id = template.template.Id;
                    var inputs = $('#' + id).find('input');
                    for (var i = 0; i < inputs.length; i++) {
                        var code = templateFields[i].Code__c;
                        var value = skill.parametersMap[code].value;
                        if (value == undefined || value == '') {
                            $(inputs[i]).focus();
                            break;
                        }
                    }
                }
                skill.resizeInput = function($event) {
                    var target = $event.target;
                    var code=$(target).attr('placeholder');
                    if ($(target).val().length > 0) {
                        $(".bodyHtml input[placeholder='"+code+"'").attr('size', $(target).val().length);
                    }
                }
                skill.selectEmailTemplate = function(template) {
                    template.selected = !template.selected;
                    if (template.selected) {
                        skill.addedEmailSections.push(template);
                    } else {
                        for(var i = skill.addedEmailSections.length; i--;) {
                            if(skill.addedEmailSections[i] === template) {
                                skill.addedEmailSections.splice(i, 1);
                            }

                            if (skill.addedEmailSections[i-1] != undefined) {
                                skill.updateFocus(skill.addedEmailSections[i-1]);
                            }
                        }

                    }
                };
                skill.selectResolutionTemplate = function(template) {
                    template.selected = !template.selected;
                    if (template.selected) {
                        var range = $('#bodytxt').textrange();
                        var startPos = range.position;
                        $('#bodytxt').textrange('insert', template.template.Body__c + '\n\n');
                        $('#bodytxt').textrange('setcursor', startPos + template.template.Body__c.length + 2); // Unselect the text
                    } else {
                        $('#bodytxt').val($('#bodytxt').val()
                            .replace(template.template.Body__c + '\n\n', '')
                            .replace(template.template.Body__c + '\n', '')
                            .replace(template.template.Body__c, ''));
                    }
                    skill.bodytxt = $('#bodytxt').val();
                };
                skill.resetResolutionTemplates = function() {
                    skill.templates.forEach(function(template) {
                        if (!template.template.IsEmailSection__c) {
                            template.selected = false;
                        }
                    });
                    $('#bodytxt').val('');
                    skill.bodytxt = $('#bodytxt').val();
                    $('#bodytxt').focus();
                }
                skill.resetEmailTemplates = function() {
                    skill.templates.forEach(function(template) {
                        if (template.template.IsEmailSection__c) {
                            template.selected = false;
                        }
                    });
                    skill.addedEmailSections = [];
                    $("#messages").removeClass('msgSuccess').html('');
                }
                skill.allFieldsEntered = function() {
                    var allEntered = true;
                    var focusable = $(".bodyHtml").find('input').filter(':visible');
                    if (focusable.length == 0) {
                        return false;
                    }
                    focusable.each(function (){
                        var value = $(this).val();
                        allEntered = allEntered && (value != undefined && value != '');
                    });
                    return allEntered;
                }
                skill.sendEmail = function() {

                    var focusable = $(".bodyHtml").find('input').filter(':visible');
                    if (skill.addedEmailSections.length == 0) {
                        $("#messages").removeClass("msgSuccess").addClass('msgError').html("Please select atleast one email template!");
                        return;
                    }
                    var allEntered = true;
                    focusable.each(function (){
                        var value = $(this).val();
                        allEntered = allEntered && (value != undefined && value != '');
                    });
                    if (!allEntered) {
                        $("#messages").removeClass("msgSuccess").addClass('msgError').html("Please enter value for all fields!");
                        return;
                    }

                    focusable.each(function (){
                        var value = $(this).val();
                        if (value != undefined && value != '') {
                            $(this).replaceWith(value);
                        }
                    });
                    var msgBody = '';
                    $('.bodyHtml pre').each(function (){
                        msgBody += $(this).html() + '\n\r\n\r';
                    });

                    if (skill.emailSubject == undefined) {
                        $("#messages").removeClass("msgSuccess").addClass('msgError').html("Please select an email subject from the list!");
                        return;
                    }
                    var fromAddress = skill.email;
                    /*
                     Visualforce.remoting.Manager.invokeAction(
                     '{!$RemoteAction.PR_AHTR_Agent.sendEmail}',
                     'from@abc.com', 'gavinmach@gmail.com', 'Test Subject', msgBody,
                     function(result, event) {
                     var check = result === true;
                     },
                     { buffer: true, escape: true, timeout: 30000 }
                     );
                     */
                    skill.resetEmailTemplates();
                    $("#messages").removeClass("msgError").addClass('msgSuccess').html("Email Sent Successfully!");
                }

            }); // forEach skill


            function orderTemplateFields(template) {
                var newTxt = template.template.Body__c.split('{!');
                var tf = [];
                for (var i = 1; i < newTxt.length; i++) {
                    var code = newTxt[i].split('}')[0];
                    template.templateFields.forEach(function(field) {
                        if (field.Code__c == code) {
                            tf.push(field);
                        }
                    })
                }
                template.templateFields = tf;
            }

            $scope.nextSkill = function() {
                if (++$scope.activeSkill >= $scope.skills.length)
                    $scope.activeSkill = 0;
                if (!$('.menu').hasClass('on'))
                    $scope.flashTitle($scope.skills[$scope.activeSkill].name);
                $scope.$apply();
            }
            $scope.prevSkill = function() {
                if (--$scope.activeSkill < 0)
                    $scope.activeSkill = $scope.skills.length - 1;
                if (!$('.menu').hasClass('on'))
                    $scope.flashTitle($scope.skills[$scope.activeSkill].name);
                $scope.$apply();
            }
            var title = $('#title').html();
            var flashHandle = null;
            $scope.flashTitle = function(text) {
                $('#title').html('<b>' + text + '</b>');
                if (flashHandle) {
                    clearTimeout(flashHandle);
                }
                flashHandle = window.setTimeout(function() { $('#title').html(title); }, 1000);
            }


            $(function() {
                var ctrl = 0;
                $(document).keydown(function(event) {
                    //console.log(event.which);
                    if (event.which == 17) {
                        ctrl = 1;
                        return;
                    } else if (ctrl == 1) {
                        return;
                    } else if (event.which == 9) {
                        $scope.nextSkill();
                    } else if (event.which == 192) {
                        $('.menu').click();
                    } else if (event.which >= 112 && event.which <= 121) {
                        $('#t-' + (event.which - 111)).click();
                    } else {
                        return;
                    }
                    event.preventDefault();
                });
                $(document).keyup(function(event) {
                    if (event.which == 17)
                        ctrl = 0;
                });
                $('.menu').on('click', function() {
                    var m = $(this);
                    m.removeClass('go');
                    if (m.hasClass('on')) {
                        m.removeClass('on');
                        $('#templateChoicesPanel').slideUp(200, function() { m.addClass('go1'); } );
                    } else {
                        m.addClass('on');
                        $('#templateChoicesPanel').slideDown(200, function() { m.addClass('go1'); } );
                    }
                }).on('mouseout', function() {
                        var m = $(this);
                        window.setTimeout(function() {
                            m.addClass('go');
                        }, 100);
                    });

                var clipBoardClient = new ZeroClipboard(document.getElementById("copybtn"), {
                    moviePath: "{!URLFOR($Resource.AHTR_Resources, 'Agent/lib/zeroclipboard/ZeroClipboard.swf')}"
                });
                clipBoardClient.on('dataRequested', function (clipBoardClient, args) {
                    var txt = $("#bodytxt").val();
                    //to make Notepad honour line breaks, we have to do some magic
                    var windowsText = txt.replace(/\n/g, '\r\n');
                    //replace html break with line breaks
                    windowsText = windowsText.replace(/<br\s*\/?>/g, "\r\n");
                    clipBoardClient.setText(windowsText);
                }).on('complete', function (clipBoardClient, args) {
                        var templateIds = new Array();
                        $(".template.highlighted .abbrev").each(function() {
                            templateIds.push($(this).data("template"));
                        });
                        Visualforce.remoting.Manager.invokeAction(
                            '{!$RemoteAction.PR_AHTR_Agent.incrementUsageCount}',
                            templateIds,
                            function(result, event) {
                                // Do nothing
                            },
                            { buffer: true, escape: true, timeout: 30000 }
                        );
                });


            }); //$(function() {

        }
    ]);

String.prototype.replaceAll = function( token, newToken, ignoreCase ) {
    var _token;
    var str = this + "";
    var i = -1;

    if ( typeof token === "string" ) {

        if ( ignoreCase ) {

            _token = token.toLowerCase();

            while( (
                i = str.toLowerCase().indexOf(
                    token, i >= 0 ? i + newToken.length : 0
                ) ) !== -1
                ) {
                str = str.substring( 0, i ) +
                    newToken +
                    str.substring( i + token.length );
            }

        } else {
            return this.split( token ).join( newToken );
        }

    }
    return str;
};


