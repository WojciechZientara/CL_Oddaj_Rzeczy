<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@include file="/WEB-INF/assets/header.jsp"%>

<header class="header--form-page">
    <%@include file="/WEB-INF/assets/menu.jsp"%>

        <div class="accessDenied">
            <section class="login-page">
                <h2>Brak dostępu.</h2>
            </section>
        </div>

        <div>
            <section class="login-page">
                <h2>Moje zbiórki</h2>
            </section>
        </div>

        <div id="dbRecords">
            <table>
                <thead id="recordsHead">
                    <td>Fundacja</td>
                    <td>Kategorie</td>
                    <td>Worki</td>
                    <td>Adres Odbioru</td>
                    <td>Czas Odbioru</td>
                    <td>Komentarz</td>
                    <td>Status</td>
                </thead>
                <tbody id="recordsBody"></tbody>
            </table>
        </div>





<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="<c:url value="resources/js/checkLogin.js"/>"></script>
<script src="<c:url value="resources/js/myDonations.js"/>"></script>
<%@include file="/WEB-INF/assets/footer.jsp"%>