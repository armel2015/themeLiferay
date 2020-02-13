<#assign VOID = freeMarkerPortletPreferences.setValue("portletSetupShowBorders", "false") />

<@liferay_portlet["runtime"]
							defaultPreferences="${freeMarkerPortletPreferences}"
							portletProviderAction=portletProviderAction.VIEW
							instanceId="NON_DISTRIBUTABLE"
							portletName="memberprofile_WAR_comagipiportlet"
							queryString="action=nonDistributable"/>

${freeMarkerPortletPreferences.reset()}
