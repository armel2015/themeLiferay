<footer>
    <div class="footer-blue-block reset">
        <div class="content-wrapper">
            <div class="info-block">
                <@liferay_portlet["runtime"]
                instanceId="FOOTER_INFO_WC"
                portletName="com_liferay_journal_content_web_portlet_JournalContentPortlet"/>
            </div>
            <div class="newsletter-block">
                <@liferay_portlet["runtime"]
                instanceId="FOOTER_NEWSLETTER_WC"
                portletName="com_liferay_journal_content_web_portlet_JournalContentPortlet"/>
            </div>
        </div>
    </div>

    <div class="footer-block content-wrapper without-all-padding white clearfix first-level">
        <div class="links">


		<#list nav_items as nav_item>
			<#if nav_item?index < 4 >
                <div class="col">
                    <p class="title">${nav_item.getName()}</p>
					<#if nav_item.hasChildren()>
						<#list nav_item.getChildren() as nav_child>
                            <#assign link = nav_child.getURL()>
                            <#if !nav_child.isBrowsable() && nav_child.hasBrowsableChildren()>
                                <#assign link = (nav_child.getBrowsableChildren()?first).getURL()>
                            </#if>
                            <a href="${link}">${nav_child.getName()}</a>
						</#list>
					</#if>
                </div>
			</#if>
		</#list>
            <div class="col">
                <div class="blue-links">
				<#list nav_items as nav_item>
					<#if (nav_item?index>3)>
                        <!-- Ajout de cette cette specificite car la page Zen au Travail est un ensemble de page, donc non clicable
                        par défaut et on ne veux pas forcement ajouter un nouveau bloc après Espace Entrepreneurs dans le footer-->
                        <#if nav_item.getName()== languageUtil.get(themeDisplay.getLocale(), "agipi.theme.footer.info.link12.label")>
                            <a href="${themeDisplay.getPortalURL()}/zen-au-travail">${nav_item.getName()}</a>
                        <#else>
                        <a href="${nav_item.getURL()}">${nav_item.getName()}</a>
                        </#if>
					</#if>
				</#list>
                    <a href="${themeDisplay.getPortalURL()}/recrutement"><@liferay.language key="agipi.theme.footer.info.link8.label" /></a>
                    <a href="${themeDisplay.getPortalURL()}/presse"><@liferay.language key="agipi.theme.footer.info.link9.label" /></a>
                    <#-- <a href="${themeDisplay.getPortalURL()}/revue-de-presse"><@liferay.language key="agipi.theme.footer.info.link12.label" /></a> -->
                    <a href="${themeDisplay.getPortalURL()}/plan-du-site"><@liferay.language key="agipi.theme.footer.info.link10.label" /></a>
                    <a href="${themeDisplay.getPortalURL()}/mentions-legales"><@liferay.language key="agipi.theme.footer.info.link11.label" /></a>
                    <a href="${themeDisplay.getPortalURL()}/protections-des-donnees-personnelles"><@liferay.language key="agipi.theme.footer.info.link13.label" /></a>
                </div>
            </div>
        </div>
        <div class="footer-block content-wrapper without-all-padding white clearfix two-level">
            <div class="links clearfix">
                <div class="col social-network">

                    <p class="title"><@liferay.language key="agipi.theme.footer.social.link.label" /></p>

                    <a href="https://www.linkedin.com/company/agipi"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
                    <a href="https://www.youtube.com/channel/UC8qOfnbR2LLlaHcsa-HT4nA"><i class="fa fa-youtube" aria-hidden="true"></i></a>
                </div>
            </div>
        </div>

        <div class="copyright"><@liferay.language key="agipi.theme.footer.copiright" />&nbsp;${.now?string('yyyy')}</div>
        <div id="back-to-top"><a href=""><@liferay.language key="agipi.theme.footer.hautDePage" /></a></div>
    </div>
</footer>