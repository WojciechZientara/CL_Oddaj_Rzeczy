<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@include file="/WEB-INF/assets/header.jsp"%>

<header class="header--form-page">
    <%@include file="/WEB-INF/assets/menu.jsp"%>

        <section id="loginForm" class="login-page">
            <h2>Zaloguj się</h2>
            <form>
                <div class="form-group">
                    <input type="email" name="email" placeholder="Email" />
                </div>
                <div class="form-group">
                    <input type="password" name="password" placeholder="Hasło" />
                    <a href="<c:url value="/forgotPassword"/>" class="btn btn--small btn--without-border reset-password">Przypomnij hasło</a>
                </div>

                <div class="form-group form-group--buttons">
                    <a href="<c:url value="/registerUser"/>" class="btn btn--without-border">Załóż konto</a>
                    <button class="btn" type="submit">Zaloguj się</button>
                </div>
            </form>
        </section>


<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="<c:url value="resources/js/checkLogin.js"/>"></script>
<script src="<c:url value="resources/js/login.js"/>"></script>
<%@include file="/WEB-INF/assets/footer.jsp"%>