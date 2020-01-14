<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@include file="/WEB-INF/assets/header.jsp"%>

<header class="header--form-page">
    <%@include file="/WEB-INF/assets/menu.jsp"%>

        <section id="loginForm" class="login-page">
            <h2>Panel Admina</h2>
        </section>


<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="<c:url value="resources/js/checkLogin.js"/>"></script>
<script src="<c:url value="resources/js/login.js"/>"></script>
<%@include file="/WEB-INF/assets/footer.jsp"%>