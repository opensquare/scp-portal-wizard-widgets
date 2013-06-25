<%@ page import="com.osl.security.OslPrinciple" %>
<%@ page import="org.apache.shiro.SecurityUtils" %>
<%@ page import="org.apache.shiro.subject.Subject" %>

<%Subject user = SecurityUtils.getSubject();%>
<%OslPrinciple oslPrinciple = user.getPrincipals().oneByType(OslPrinciple.class);%>
<h1><%=oslPrinciple.getDisplayName()%></h1>
<div>
	<details open>
		<summary><h3>User Information</h3></summary>
		<div>
			<div class="property-group">
				<span class="property-label">User Name</span>
				<span class="property-value"><%=oslPrinciple.getUsername()%></span>
			</div>
			<div class="property-group">
				<span class="property-label">Display Name</span>
				<span class="property-value"><%=oslPrinciple.getDisplayName()%></span>
			</div>
		</div>
	</details>
	<details>
		<summary><h3>User Settings</h3></summary>
		<div class="user-settings">
			<div>
				<span><a href="#internal/change-password?id=<%=String.valueOf(oslPrinciple.getUserId())%>" class="popup" onclick="return false;">Change Password</a></span>
			</div>
			<div>
				<span><a href="#" class="popup" onclick="return false;">Default Login Pages</a></span>
			</div>
		</div>
	</details>
</div>