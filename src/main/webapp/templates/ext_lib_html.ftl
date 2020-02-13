<#if chatbotEnabled>

<div class="fb-customerchat"
  page_id="${getterUtil.getString(propsUtil.get('com.agipi.facebook.chatbot.pageid'))}"
  greeting_dialog_display="hide"
  logged_in_greeting="${getterUtil.getString(propsUtil.get('com.agipi.facebook.chatbot.logged.in.greeting'))}"
  logged_out_greeting="${getterUtil.getString(propsUtil.get('com.agipi.facebook.chatbot.logged.out.greeting'))}"
>
</div>

</#if>