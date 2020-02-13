
<#assign leftMenuNavItems = agipiTemplateService.getDetailAdhesionLeftMenuItems(nav_items)!"">

<#if leftMenuNavItems?has_content >

    <div id="left-menu">
        <div class="left-menu-extranet clearfix">
            <div class="documents-nav reset">
                <span class="documents-nav-fixed-bth"></span>

                <#list leftMenuNavItems as nav_item>

                    <a class="documents-nav__item ${agipiTemplateService.isSelected(nav_item)?then('documents-nav__item_active', '')}"

                       data-page-alias="${agipiTemplateService.getPageAlias(nav_item)}"

                       href="${agipiTemplateService.createAdhesionDetailPageURL(nav_item.getRegularURL(), request)}"

                    >
                        ${nav_item.getName()}
                    </a>

                </#list>

            </div>
        </div>
    </div>

</#if>