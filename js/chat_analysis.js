var chatBotObject = {
	chatBotInitURL:'https://dcsf--sit1.my.salesforce.com',
	chatBotPublicSites:'https://sit1-dellicm-dell-na174.cs34.force.com/liveAgentSetupFlow',
	organizationId:'00D2f0000008esE',
	baseLiveAgentContentURL:'https://c.la3-c1cs-ph2.salesforceliveagent.com/content',
	deploymentId:'5722f0000004Czy',
	buttonId :'5732f0000004DDg',
	baseLiveAgentURL:'https://d.la3-c1cs-ph2.salesforceliveagent.com/chat',
	eswLiveAgentDevName:'EmbeddedServiceLiveAgent_Parent04I2f00000000AGEAY_179601c8497',
	serviceForceURL:'https://service.force.com',
	snapInJs:'https://dcsf--sit1.my.salesforce.com/embeddedservice/5.0/esw.min.js',
	componentName:'DELL_CONNECT_DEFAULT'
};


function triggerSnapin(snapInObject) {

	try {
		snapInObject.chatBotInitURL = chatBotObject.chatBotInitURL;
		snapInObject.chatBotPublicSites = chatBotObject.chatBotPublicSites;
		snapInObject.organizationId = chatBotObject.organizationId;
		snapInObject.baseLiveAgentContentURL = chatBotObject.baseLiveAgentContentURL;
		snapInObject.deploymentId = chatBotObject.deploymentId;
		snapInObject.buttonId = chatBotObject.buttonId;
		snapInObject.baseLiveAgentURL = chatBotObject.baseLiveAgentURL;
		snapInObject.eswLiveAgentDevName = chatBotObject.eswLiveAgentDevName;
		snapInObject.serviceForceURL = chatBotObject.serviceForceURL;
		snapInObject.snapInJs = chatBotObject.snapInJs;
		snapInObject.componentName = chatBotObject.componentName;

		initiateChatBot(snapInObject);
	}
	catch (e) {
		console.log("Error in: " + e);
	}
}

function languageMapping(lang, countryCode){
	let language = lang.toLowerCase();
	switch (language){
		case 'zh':
			if (countryCode == 'cn'){
				language = 'zh-CN';
			}
			break;
		default:
			break;
	}
	return language;

}

function initiateChatBot(snapInObject) {
	try{
		console.log(snapInObject);
		var initESW = function (gslbBaseURL) {

			var css = '.embeddedServiceHelpButton .helpButton .uiButton {'+
			'background-color: #0063B8;'+
			'font-family: "Arial", sans-serif;}'+

			'.embeddedServiceHelpButton .helpButton .uiButton:focus {'+
			'outline: 1px solid #0063B8;}'+

			'.embeddedServiceSidebar.layout-docked .dockableContainer,'+
			' .embeddedServiceSidebar.layout-float .dockableContainer '+
			'{z-index: 100002 !important;}' +

			'.embeddedServiceLiveAgentStateChatItem .nameAndTimeContent {'+
			'color: #7E7E7E !important;}'+

			'.embeddedServiceLiveAgentStateChatInputFooter.chasitorInputWrapper {'+
			'background-color: #f5f6f7 !important;}'+

			'.embeddedServiceLiveAgentStateChatPlaintextMessageDefaultUI.agent.plaintextContent{'+
				'background: #f0f0f0 !important;}';

			style = document.createElement('style');
			style.type = 'text/css';
			if (style.styleSheet) {
				style.styleSheet.cssText = css;
			} else {
				style.appendChild(document.createTextNode(css));
			}

			body = document.body || document.getElementsByTagName('body')[0],
			body.appendChild(style);

			if ("languageCode" in snapInObject){
				languageAfterMapping = languageMapping(snapInObject.languageCode, snapInObject.countryCode);
				console.log(languageAfterMapping);
			}
			else{
				languageAfterMapping = "en";
			}

			embedded_svc.settings.displayHelpButton = true;
			embedded_svc.settings.enabledFeatures = ['LiveAgent'];
			embedded_svc.settings.entryFeature = 'LiveAgent';

			embedded_svc.settings.language = languageAfterMapping;
			embedded_svc.settings.extraPrechatFormDetails = [
			{
				"label":"First Name",
				"value":snapInObject.firstName,
				"transcriptFields": ["FirstName__c"]
			},{
				"label":"Last Name",
				"value":snapInObject.lastName,
				"transcriptFields": ["LastName__c"]
			},{
				"label":"Email",
				"value":snapInObject.emailAddress,
				"transcriptFields": ["Email__c"]
			},{
				"label":"Language Code",
				"value":snapInObject.languageCode,
				"transcriptFields": ["Language_Code__c"]
			},{
				"label":"Selection Type",
				"value":snapInObject.seletionType,
				"transcriptFields": ["Selection_Type__c"]
			},{
				"label":"Channel",
				"value":snapInObject.channel,
				"transcriptFields": ["Channel__c"]
			},{
				"label":"Origin",
				"value":snapInObject.origin,
				"transcriptFields": ["Origin__c"]
			},{
				"label":"Country", 
				"value":snapInObject.countryCode,
				"transcriptFields": ["Country__c"]
			}];
			embedded_svc.init(
				snapInObject.chatBotInitURL,
				snapInObject.chatBotPublicSites, 
				gslbBaseURL, 
				snapInObject.organizationId, 
				snapInObject.componentName, 
				{
					baseLiveAgentContentURL: snapInObject.baseLiveAgentContentURL,
					deploymentId: snapInObject.deploymentId,
					buttonId: snapInObject.buttonId,
					baseLiveAgentURL: snapInObject.baseLiveAgentURL,
					eswLiveAgentDevName: snapInObject.LiveAgentDevName,
					isOfflineSupportEnabled: false
			});
			console.log(embedded_svc);
		};
		if (!window.embedded_svc) {
			var s = document.createElement('script');
			s.setAttribute('src', snapInObject.snapInJs);
			s.onload = function () {
				initESW(null);
				console.log('window.embedded_svc');
		};
		document.body.appendChild(s);
		} else {
			console.log('window.embedded_svc.else');
			initESW(snapInObject.serviceForceURL);    
		}

	}
	catch (e) {
	console.log("Error in: " + e);
	}
}