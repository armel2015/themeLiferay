<#assign VOID = freeMarkerPortletPreferences.setValue("portletSetupShowBorders", "false") />

<@liferay_portlet["runtime"]
							defaultPreferences="${freeMarkerPortletPreferences}"
							portletProviderAction=portletProviderAction.VIEW
							instanceId="MOMFIL_HEAsDER2"
							portletName="memberprofile_WAR_comagipiportlet"
							queryString="action=headerBlock"/>

${freeMarkerPortletPreferences.reset()}
