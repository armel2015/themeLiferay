
<#assign agipiTemplateService = serviceLocator.findService("com.agipi.servicebuilder.svc.service.AgipiTemplateLocalService")>

<#assign pageUrl = page.getFriendlyURL(locale) />
<#assign isExtranet = agipiTemplateService.isExtranet(themeDisplay.scopeGroupId) />
<#assign isExtranetUser = is_signed_in && isExtranet && hasAdherentRole />


<#assign chatbotEnabled = getterUtil.getBoolean(propsUtil.get('com.agipi.facebook.chatbot.enabled')) && !isExtranet />