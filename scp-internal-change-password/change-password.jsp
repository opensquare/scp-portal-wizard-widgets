<%@ page import="com.osl.security.OslPrinciple" %>
<%@ page import="org.apache.shiro.SecurityUtils" %>
<%@ page import="org.apache.shiro.subject.Subject" %>

<%Subject user = SecurityUtils.getSubject();%>
<%OslPrinciple oslPrinciple = user.getPrincipals().oneByType(OslPrinciple.class);%>
<%String userId = request.getParameter("userId"); %>

<% if(userId.equals(String.valueOf(oslPrinciple.getUserId()))){%>
	<h1>Change Password</h1>
	<div class="rhinoforms-container"></div>
	<script>
		rf.loadFlow('widgets/scp-internal-change-password/change-password-flow.js',
		 $('.scp-internal-change-password .rhinoforms-container'),
		 '<root><user><%=userId%></user></root>');
	</script>
<% } else { %>
	<h3>Invalid Request</h3>
<% } %>