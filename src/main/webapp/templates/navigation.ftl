<#if pageUrl == "/home">
	<div id="main-menu" class="homepage">
<#else>
	<div id="main-menu">
</#if>
        
	<div class="content-wrapper reset">	
		<div class="hr"></div>
		<div class="level1">

			<div class="burger-btn not-in-desktop">
				<span></span>
				<span></span>
				<span></span>
            </div>
			<a class="logo" href="/">
           		<img src="${images_folder}/icons/logo_agipi.svg">
           	</a>
			<#list nav_items as nav_item>

				<#assign isSelected = (nav_item.isChildSelected() || nav_item.isSelected()) />
				<#assign isMonEspacePage = (isExtranet && nav_item?is_first) />
				<#if isMonEspacePage && isSelected>
					<#assign monEspaceNavItems = nav_item.getChildren() />
					<#assign monEspaceDataId = nav_item.getName() />
				</#if>

				<#assign hasChildren = nav_item.getChildren()?has_content />
                <div class="menu-link inBurger desktop-only <#if hasChildren> with-arrow </#if>">
            			<a data-id="${nav_item.getName()}"

							<#if !hasChildren>

									href="${nav_item.getURL()}"

						   		<#elseif isMonEspacePage && !nav_item.isChildSelected()>

                           			href="${nav_item.getChildren()[0].getURL()}"

							</#if>

							<#if isSelected>
                           		class="active"
							</#if>
						>
							${nav_item.getName()}
						</a>
            	</div>

			</#list>

            <div class="menu-link inBurger search desktop-only">
				<@liferay_ui["search"] />
                <div class="search-menu-btn">
                </div>
                <div class="search-btn-right">
					OK
                </div>
            </div>

			
            
            <a href="" class="spaces-access-menu not-in-desktop" alt="Accès aux espaces">
            	<img src="${images_folder}/icons/cons.svg">
            </a>

            <#if isExtranetUser>

					<div class="top-header_member">
						 <#include "extranet/member_profil_block.ftl">
					</div>

				<#else>

					<div class="spaces-access-block">
						<div class="menu-link extra member-space">

							<a href="${propsUtil.get('com.agipi.header.link.espace.adherent')}" alt="Mon espace adhérent">
								<span class="text phone-tablet-only">Mon espace adhérent</span>
								<img class="desktop-only" src="${images_folder}/icons/adh_icon.svg">
							</a>
							<span class="icon-scroll-text text-adh desktop-only"><@liferay.language key="com.agipi.header.adherent.icon.title" /></span>
						</div>
						<div class="menu-link extra advisor-space float-right">
							<a class="color-blue" href="${propsUtil.get('com.agipi.header.link.espace.conseiller')}" alt="Devenir adhérent">
								<span class="text phone-tablet-only">Mon espace conseiller</span>
								<img class="desktop-only" src="${images_folder}/icons/cons_icon.svg">
							</a>
							<span class="icon-scroll-text text-cons desktop-only"><@liferay.language key="com.agipi.header.cons.icon.title" /></span>
						</div>
					</div>
			</#if>
		</div>

		<#if monEspaceNavItems?has_content>
			<#include "extranet/mon_espace_menu.ftl">
		</#if>

		<#list nav_items as nav_item>
			<#assign isMonEspacePage = (isExtranet && nav_item?is_first) />
			<#if nav_item.hasChildren() && !(isMonEspacePage)>
				<div class="level2" data-id="${nav_item.getName()}">

                    <div class="left-element">
						<#list nav_item.getChildren() as section>

							<div class="col">
								<div class="title">${section.getName()}</div>

								<#assign expandoBridge = section.getLayout().getExpandoBridge() />
								<#assign sectionIntrdFieldName = "SectionIntroduction" />
								<#if expandoBridge.hasAttribute(sectionIntrdFieldName)
									&& expandoBridge.getAttribute(sectionIntrdFieldName)?has_content>
									<div class="subtitle">
										${expandoBridge.getAttribute(sectionIntrdFieldName)}
									</div>
								</#if>

								<#if section.hasChildren()>
									<div class="links">
										<#list section.getChildren() as sectionLink>
											<a class="arrow-link" href="${sectionLink.getURL()}">
												<span>
													${sectionLink.getName()}
												</span>
											</a>
										</#list>
									</div>
								</#if>
							</div>

						</#list>
					</div>
					<div class="right-element">
						<div class="highlight-block-menu">
							<#assign VOID = freeMarkerPortletPreferences.setValue("displayStyle", "ddmTemplate_HIGHLIGHT_BLOCK") />
							<#assign VOID = freeMarkerPortletPreferences.setValue("selectionStyle", "manual") />
							<#assign VOID = freeMarkerPortletPreferences.setValue("portletSetupShowBorders", "false") />
								<@liferay_portlet["runtime"]
															defaultPreferences="${freeMarkerPortletPreferences}"
															portletProviderAction=portletProviderAction.VIEW
															instanceId="HIGHLIGHT_BLOCK_${nav_item.getLayout().getLayoutId()}"
															portletName="com_liferay_journal_content_web_portlet_JournalContentPortlet" />
							${freeMarkerPortletPreferences.reset()}
						</div>
					</div>
				</div>
			</#if>
		</#list>


	</div>
</div>
<div id="menu-mobile" class="reset"></div>

<#include "extranet/gestion_adhesion_left_menu.ftl">
