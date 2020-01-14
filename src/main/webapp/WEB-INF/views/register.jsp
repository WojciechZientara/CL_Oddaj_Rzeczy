<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@include file="/WEB-INF/assets/header.jsp"%>

<header class="header--form-page">
    <%@include file="/WEB-INF/assets/menu.jsp"%>

    <section id="registerForm" class="login-page">
        <h2>Załóż konto</h2>
        <form>
            <div class="form-group">
                <input type="text" name="firstName" placeholder="Imię" />
            </div>
            <div class="form-group">
                <input type="text" name="lastName" placeholder="Nazwisko" />
            </div>

            <div class="form-group">
                <input type="email" name="email" placeholder="Email" />
            </div>
            <div class="form-group">
                <input type="password" name="password" placeholder="Hasło" />
            </div>
            <div class="form-group">
                <input type="password" name="password2" placeholder="Powtórz hasło" />
                <span id="passwordMatchError" class="formError">
                   <br>Podane hasła nie są takie same.
                </span>
            </div>

            <div class="form-group form-group--buttons">
                <a href="<c:url value="/login"/>" class="btn btn--without-border">Zaloguj się</a>
                <button class="btn" type="submit">Załóż konto</button>
            </div>
        </form>

    </section>

    <section id="registerConfirmation" class="login-page">
        <h2>Użytkownik został zarejestrowany!</h2>
    </section>


<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="<c:url value="resources/js/checkLogin.js"/>"></script>
<script src="<c:url value="resources/js/register.js"/>"></script>
<%@include file="/WEB-INF/assets/footer.jsp"%>