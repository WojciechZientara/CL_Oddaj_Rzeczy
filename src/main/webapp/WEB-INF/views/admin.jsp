<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@include file="/WEB-INF/assets/header.jsp"%>

<header class="header--form-page">
    <%@include file="/WEB-INF/assets/menu.jsp"%>

        <div class="accessDenied">
            <section class="login-page">
                <h2>Brak dostępu.</h2>
            </section>
        </div>

        <div class="accessGranted">
            <section id="loginForm" class="login-page">
                <h2 id="adminHeader">Panel Admina</h2>
                <table>
                    <tr>
                        <td><a id="institutions" class="btn btn--large margins">Zarządzaj instytucjami</a></td>
                        <td><a id="admins" class="btn btn--large margins">Zarządzaj administratorami</a></td>
                        <td><a id="users" class="btn btn--large margins">Zarządzaj użytkownikami</a></td>
                    </tr>
                </table>
            </section>
        </div>

        <div class="panels" id="institutionsDiv">
            <section class="login-page">
                <h2>Instytucje</h2>
                <a id="newInstitution" class="btn btn--large margins newItem">Dodaj</a>
            </section>
        </div>
        <div class="panels" id="adminsDiv">
            <section class="login-page">
                <h2>Admini</h2>
                <a id="newAdmin" class="btn btn--large margins newItem">Dodaj</a>
            </section>
        </div>
        <div class="panels" id="usersDiv">
            <section class="login-page">
                <h2>Userzy</h2>
                <a id="newUser" class="btn btn--large margins newItem">Dodaj</a>
            </section>
        </div>

        <div id="adminContent">
            <div id="addForm">
                <section class="login-page">
                    <form>
                        <table id="objectForm"></table>
                    </form>
                </section>
            </div>
        </div>

        <div id="dbRecords">
            <table>
                <thead id="recordsHead"></thead>
                <tbody id="recordsBody"></tbody>
            </table>
        </div>




<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="<c:url value="resources/js/checkLogin.js"/>"></script>
<script src="<c:url value="resources/js/admin.js"/>"></script>

<script src="<c:url value="resources/js/app.js"/>"></script>
</body>
</html>