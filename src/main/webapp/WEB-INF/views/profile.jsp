<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@include file="/WEB-INF/assets/header.jsp"%>

<header class="header--form-page">
    <%@include file="/WEB-INF/assets/menu.jsp"%>

        <div class="accessDenied">
            <section class="login-page">
                <h2>Brak dostępu.</h2>
            </section>
        </div>

        <div id="myData">
                <section class="login-page">
                    <form>
                        <table id="myDataForm">
                            <tr><td>Imię: </td><td><input data-propertynumber="1" type="text"></td></tr><br>
                            <tr><td>Nazwisko: </td><td><input data-propertynumber="2" type="text"></td></tr><br>
                            <tr><td>Email: </td><td><input data-propertynumber="3" type="text"></td></tr><br>
                            <tr><td>Hasło: </td><td><input data-propertynumber="4" type="password"></td></tr><br>
                            <tr><td>Powtórz Hasło: </td><td><input data-propertynumber="5" type="password"></td></tr><br>
                            <tr id="sendObject"><td></td><td><button id="submit" style="float: right;">Zapisz</button></td></tr>
                        </table>
                    </form>
                </section>
        </div>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="<c:url value="resources/js/profile.js"/>"></script>
<%@include file="/WEB-INF/assets/footer.jsp"%>