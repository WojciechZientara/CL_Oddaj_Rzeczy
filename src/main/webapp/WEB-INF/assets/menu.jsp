<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<nav class="container container--70">
    <ul id="notLogged" class="nav--actions">
        <li><a href="<c:url value="/login"/>" class="btn btn--small btn--without-border">Zaloguj</a></li>
        <li><a href="<c:url value="/registerUser"/>" class="btn btn--small btn--highlighted">Załóż konto</a></li>
    </ul>

    <ul id="logged" class="nav--actions">
        <li class="logged-user">
            <span id="userFullName"></span>
            <ul class="dropdown">
                <li><a href="<c:url value="/profile"/>">Profil</a></li>
                <li><a href="#">Ustawienia</a></li>
                <li><a href="<c:url value="/myDonations"/>">Moje zbiórki</a></li>
                <li><a id="logout" href="#">Wyloguj</a></li>
            </ul>
        </li>
    </ul>

    <ul>
        <li><a href="<c:url value="/"/>" class="btn btn--without-border active">Start</a></li>
        <li><a href="#" class="btn btn--without-border">O co chodzi?</a></li>
        <li><a href="#" class="btn btn--without-border">O nas</a></li>
        <li><a href="#" class="btn btn--without-border">Fundacje i organizacje</a></li>
        <li><a href="#" class="btn btn--without-border">Kontakt</a></li>
    </ul>
</nav>
