
<div class="level2 extra-net-first"
        <#if monEspaceDataId??>
            data-id="${monEspaceDataId}"
        </#if>
>
    <div class="reset extranet-header">
        <div class="content-wrapper">
            <ul class="extranet-header__thin-menu">

				<#list monEspaceNavItems as nav_item>

					<#assign isSelected = (nav_item.isChildSelected() || nav_item.isSelected()) />

                    <li <#if nav_item?is_last>class="mon-axa"</#if>
                        <#if nav_item.getName()=="Ma messagerie">
                            class="ma-messagerie-count"
                        </#if>>
						<a href="${nav_item.getURL()}" <#if isSelected>class="active"</#if>
                                                       <#if nav_item.layout.typeURL>target="_blank"</#if>
                        >
                            <#if nav_item?is_last>
                                <div class="axa-icon">
                                    <img src="${images_folder}/icons/axa.fr.svg"/>
                                </div>
                                <@liferay.language key="agipi.theme.header.mon.axa.title" />
                            <#else>
							    ${nav_item.getName()}
                            </#if>
						</a>
                        <#if nav_item.getName()=="Ma messagerie">
                            <@liferay_portlet["runtime"]
                            defaultPreferences="${freeMarkerPortletPreferences}"
                            portletProviderAction=portletProviderAction.VIEW
                            portletName="mamessagerie_WAR_comagipiportlet" />
                            ${freeMarkerPortletPreferences.reset()}
                        </#if>
					</li>

				</#list>

            </ul>
        </div>
    </div>
</div>